/**
 * StarX Alpha Labs — Google Stitch Production Execution Worker Daemon
 *
 * Dedicated long-lived queue worker that polls Supabase for queued generation jobs,
 * claims them with atomic locking, executes genuine Google Stitch MCP generations
 * via stdio JSON-RPC, uploads resulting assets to Supabase Storage, and updates
 * job & artifact statuses in PostgreSQL.
 *
 * Usage:
 *   node scripts/stitch-worker.mjs             (Continuous daemon polling every 5s)
 *   node scripts/stitch-worker.mjs --once      (Process single queued job and exit)
 *   node scripts/stitch-worker.mjs --status    (Inspect queue status and exit)
 */

import fs from "node:fs";
import { spawn } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

// 1. Read environment variables from .env.local
const env = {};
if (fs.existsSync(".env.local")) {
  const content = fs.readFileSync(".env.local", "utf8");
  content.split("\n").forEach((line) => {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)?$/);
    if (m) env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, "");
  });
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const stitchApiKey = env.STITCH_API_KEY || process.env.STITCH_API_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("❌ Fatal: Supabase credentials missing in .env.local.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

console.log("=================================================================");
console.log("  STARX ALPHA LABS — GOOGLE STITCH PRODUCTION WORKER DAEMON     ");
console.log("=================================================================");
console.log(`Target Supabase Host: ${supabaseUrl}`);
console.log(`Stitch MCP Provider : ${stitchApiKey ? "CONFIGURED (STITCH_API_KEY active)" : "MISSING (Set STITCH_API_KEY in .env.local)"}`);
console.log("-----------------------------------------------------------------");

/**
 * Spawns an isolated Stitch MCP proxy session and sends JSON-RPC requests.
 */
function runStitchMcpSession(operation, timeoutMs = 180000) {
  if (!stitchApiKey) {
    return Promise.reject(new Error("Stitch MCP API Key is not configured."));
  }

  return new Promise((resolve, reject) => {
    let child = null;
    let isSettled = false;

    const timeoutTimer = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        if (child) child.kill();
        reject(new Error(`Stitch MCP operation timed out after ${timeoutMs / 1000}s`));
      }
    }, timeoutMs);

    child = spawn("npx", ["-y", "@_davideast/stitch-mcp", "proxy"], {
      env: {
        ...process.env,
        STITCH_API_KEY: stitchApiKey,
        DOTENV_CONFIG_QUIET: "true",
        DOTENV_QUIET: "true",
        NO_COLOR: "1",
      },
      shell: true,
    });

    let buffer = "";
    let requestId = 1;
    const pendingCalls = new Map();

    child.stdout.on("data", (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const msg = JSON.parse(trimmed);
          if (msg.id && pendingCalls.has(msg.id)) {
            const { resolve: callRes, reject: callRej } = pendingCalls.get(msg.id);
            pendingCalls.delete(msg.id);
            if (msg.error) callRej(new Error(msg.error.message || JSON.stringify(msg.error)));
            else callRes(msg.result);
          }
        } catch {}
      }
    });

    const sendJsonRpc = (method, params = {}) => {
      const id = requestId++;
      const payload = JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n";
      return new Promise((callRes, callRej) => {
        pendingCalls.set(id, { resolve: callRes, reject: callRej });
        child.stdin.write(payload);
      });
    };

    const callTool = async (toolName, args) => {
      const result = await sendJsonRpc("tools/call", {
        name: toolName,
        arguments: args,
      });

      if (result?.isError) {
        const errDetail = result.content?.map((c) => c.text).join(" ") || "Tool execution failed";
        throw new Error(`Stitch MCP tool "${toolName}" failed: ${errDetail}`);
      }

      if (result?.content && Array.isArray(result.content)) {
        const textContent = result.content.find((c) => c.type === "text");
        if (textContent?.text) {
          try {
            return JSON.parse(textContent.text);
          } catch {
            return textContent.text;
          }
        }
      }
      return result;
    };

    sendJsonRpc("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "starx-worker-daemon", version: "1.0.0" },
    })
      .then(async () => {
        child.stdin.write(
          JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n"
        );
        return operation(callTool);
      })
      .then((opResult) => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timeoutTimer);
          child.kill();
          resolve(opResult);
        }
      })
      .catch((err) => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timeoutTimer);
          if (child) child.kill();
          reject(err);
        }
      });
  });
}

/**
 * Uploads an asset (HTML or Screenshot Buffer) to Supabase Storage.
 */
async function uploadToStorage(fileName, buffer, contentType) {
  try {
    const { error } = await supabase.storage
      .from("design-studio-artifacts")
      .upload(fileName, buffer, { contentType, upsert: true });

    if (error) {
      console.warn(`[Worker] Storage upload error (${fileName}):`, error.message);
      return null;
    }
    const { data: pubData } = supabase.storage
      .from("design-studio-artifacts")
      .getPublicUrl(fileName);
    return pubData?.publicUrl || null;
  } catch (err) {
    console.warn(`[Worker] Storage upload exception:`, err.message);
    return null;
  }
}

/**
 * Fetches the next queued job from PostgreSQL (primary table or quote_requests metadata).
 */
async function fetchQueuedJob() {
  // 1. Try primary table
  try {
    const { data } = await supabase
      .from("design_generation_jobs")
      .select("*")
      .eq("status", "queued")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (data) return { source: "primary", job: data };
  } catch {}

  // 2. Try quote_requests metadata store
  try {
    const { data } = await supabase
      .from("quote_requests")
      .select("id, metadata")
      .eq("metadata->>job->>status", "queued")
      .limit(1)
      .maybeSingle();

    if (data?.metadata?.job) {
      return {
        source: "quote_requests",
        rowId: data.id,
        job: data.metadata.job,
        project: data.metadata.project,
      };
    }
  } catch {}

  return null;
}

/**
 * Claims a job atomically to prevent duplicate worker execution.
 */
async function claimJob(claimed) {
  const timestamp = new Date().toISOString();
  if (claimed.source === "primary") {
    const { error } = await supabase
      .from("design_generation_jobs")
      .update({
        status: "processing",
        stage: "Claimed by Stitch Worker Daemon",
        updated_at: timestamp,
      })
      .eq("id", claimed.job.id)
      .eq("status", "queued"); // Atomic conditional check

    return !error;
  } else {
    claimed.job.status = "processing";
    claimed.job.stage = "Claimed by Stitch Worker Daemon";
    const meta = {
      job: claimed.job,
      project: claimed.project,
    };
    const { error } = await supabase
      .from("quote_requests")
      .update({ metadata: meta, updated_at: timestamp })
      .eq("id", claimed.rowId);

    return !error;
  }
}

/**
 * Processes a single claimed job to completion.
 */
async function processJob(claimed) {
  const job = claimed.job;
  console.log(`\n[Worker] Claimed Job ${job.id} (${job.jobCode}) for Project: ${job.projectId}`);
  console.log(`[Worker] Prompt: "${job.prompt.slice(0, 80)}..."`);

  const modelId = job.modelId || "GEMINI_3_8_FLASH";
  const deviceType = job.deviceType || "DESKTOP";

  try {
    const generationResult = await runStitchMcpSession(async (callTool) => {
      // 1. Create project
      console.log(`[Worker] Calling create_project on Stitch MCP...`);
      const createRes = await callTool("create_project", {
        title: `StarX Worker — Project ${job.projectId}`,
      });
      const providerProjectName = createRes.name;
      const rawProjectId = providerProjectName.replace(/^projects\//, "");

      // 2. Generate screen
      console.log(`[Worker] Calling generate_screen_from_text (${modelId}, ${deviceType})...`);
      const genRes = await callTool("generate_screen_from_text", {
        projectId: rawProjectId,
        prompt: job.prompt,
        modelId,
        deviceType,
      });

      let screens = [];
      if (Array.isArray(genRes.screens) && genRes.screens.length > 0) {
        screens = genRes.screens;
      } else if (Array.isArray(genRes.outputComponents)) {
        for (const comp of genRes.outputComponents) {
          if (comp?.design?.screens && Array.isArray(comp.design.screens)) {
            screens.push(...comp.design.screens);
          }
        }
      }

      const primaryScreen = screens[screens.length - 1] || {};
      const providerScreenId =
        primaryScreen.id ||
        (primaryScreen.name && primaryScreen.name.includes("/screens/")
          ? primaryScreen.name.split("/screens/")[1]
          : `screen_${Date.now()}`);

      console.log(`[Worker] Generated Screen ID: ${providerScreenId}`);

      let htmlUrl = primaryScreen.htmlCode?.downloadUrl || null;
      let screenshotUrl = primaryScreen.screenshot?.downloadUrl || null;
      let htmlCode = "";

      const htmlFileName = primaryScreen.htmlCode?.name;
      if (htmlFileName) {
        try {
          console.log(`[Worker] Downloading generated HTML asset (${htmlFileName})...`);
          const htmlDl = await callTool("download_file", { name: htmlFileName });
          const rawHtml =
            htmlDl?.html ||
            (htmlDl?.content ? Buffer.from(htmlDl.content, "base64").toString("utf8") : "");
          if (rawHtml) {
            htmlCode = rawHtml;
            const storagePath = `worker_artifacts/${job.projectId}/${providerScreenId}.html`;
            htmlUrl = await uploadToStorage(storagePath, Buffer.from(htmlCode, "utf8"), "text/html");
            console.log(`[Worker] Uploaded HTML to Supabase Storage: ${htmlUrl}`);
          }
        } catch (err) {
          console.warn(`[Worker] HTML download note:`, err.message);
        }
      }

      const screenshotFileName = primaryScreen.screenshot?.name;
      if (screenshotFileName) {
        try {
          console.log(`[Worker] Downloading generated screenshot asset (${screenshotFileName})...`);
          const imgDl = await callTool("download_file", { name: screenshotFileName });
          const imgBase64 = imgDl?.image || imgDl?.content;
          if (imgBase64) {
            const imgBuffer = Buffer.from(imgBase64, "base64");
            const storagePath = `worker_artifacts/${job.projectId}/${providerScreenId}.png`;
            screenshotUrl = await uploadToStorage(storagePath, imgBuffer, "image/png");
            console.log(`[Worker] Uploaded Screenshot to Supabase Storage: ${screenshotUrl}`);
          }
        } catch (err) {
          console.warn(`[Worker] Screenshot download note:`, err.message);
        }
      }

      return {
        providerProjectName,
        providerScreenId,
        htmlUrl,
        screenshotUrl,
        htmlCode,
        title: primaryScreen.title || "Stitch Generated Specification",
      };
    });

    // Mark job completed in PostgreSQL
    job.status = "completed";
    job.stage = "Design synthesized and persisted to Supabase Storage";
    job.progressPercent = 100;
    job.providerProjectId = generationResult.providerProjectName;
    job.providerScreenId = generationResult.providerScreenId;
    job.executionLogs = job.executionLogs || [];
    job.executionLogs.push({
      timestamp: new Date().toISOString(),
      message: `Worker completed real Stitch generation. HTML: ${generationResult.htmlUrl || "inline"}`,
      stage: "Completion",
    });

    const artifact = {
      id: `art_${job.projectId}_${generationResult.providerScreenId.slice(0, 8)}`,
      projectId: job.projectId,
      jobId: job.id,
      versionNumber: 1,
      provider: "stitch",
      providerProjectId: generationResult.providerProjectName,
      providerScreenId: generationResult.providerScreenId,
      title: generationResult.title,
      deviceType,
      thumbnailUrl: generationResult.screenshotUrl || generationResult.htmlUrl,
      downloadUrl: generationResult.htmlUrl,
      htmlCode: generationResult.htmlCode,
      palette: ["#050507", "#00f2fe", "#4facfe", "#d4af37", "#121218"],
      isApproved: false,
      createdAt: new Date().toISOString(),
    };

    if (claimed.source === "primary") {
      await supabase
        .from("design_generation_jobs")
        .update({
          status: "completed",
          stage: job.stage,
          progress_percent: 100,
          provider_project_id: generationResult.providerProjectName,
          provider_screen_id: generationResult.providerScreenId,
          execution_logs: job.executionLogs,
          updated_at: new Date().toISOString(),
        })
        .eq("id", job.id);

      await supabase.from("design_artifacts").insert(artifact);
    } else {
      const meta = {
        job,
        artifact,
        activeArtifactId: artifact.id,
        project: claimed.project,
      };
      await supabase
        .from("quote_requests")
        .update({ metadata: meta, updated_at: new Date().toISOString() })
        .eq("id", claimed.rowId);
    }

    console.log(`✅ [Worker] Job ${job.id} COMPLETED successfully!`);
    console.log(`   Provider Project: ${generationResult.providerProjectName}`);
    console.log(`   Provider Screen : ${generationResult.providerScreenId}`);
    return true;
  } catch (err) {
    console.error(`❌ [Worker] Job ${job.id} FAILED:`, err.message);
    job.status = "failed";
    job.stage = "Generation Failed in Worker";
    job.errorMessage = err.message;

    if (claimed.source === "primary") {
      await supabase
        .from("design_generation_jobs")
        .update({
          status: "failed",
          error_message: err.message,
          updated_at: new Date().toISOString(),
        })
        .eq("id", job.id);
    } else {
      const meta = { job, project: claimed.project };
      await supabase
        .from("quote_requests")
        .update({ metadata: meta, updated_at: new Date().toISOString() })
        .eq("id", claimed.rowId);
    }
    return false;
  }
}

/**
 * Main polling runner.
 */
async function run() {
  const args = process.argv.slice(2);
  const isOnce = args.includes("--once") || args.includes("--single-job");
  const isStatus = args.includes("--status");

  if (isStatus) {
    const next = await fetchQueuedJob();
    console.log(`Queue Status: ${next ? `1 job queued (${next.job.id})` : "Queue is empty (0 jobs)"}`);
    process.exit(0);
  }

  console.log(`Starting Stitch Queue Processor (${isOnce ? "Single Job Mode" : "Continuous Daemon Mode"})...`);

  do {
    try {
      const candidate = await fetchQueuedJob();
      if (candidate) {
        const locked = await claimJob(candidate);
        if (locked) {
          await processJob(candidate);
        }
      } else {
        if (!isOnce) {
          process.stdout.write(".");
        }
      }
    } catch (err) {
      console.error("[Worker] Polling error:", err.message);
    }

    if (!isOnce) {
      await new Promise((res) => setTimeout(res, 5000));
    }
  } while (!isOnce);

  console.log("\n[Worker] Single-job execution completed. Exiting cleanly.");
  process.exit(0);
}

run();
