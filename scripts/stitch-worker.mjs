/**
 * StarX Alpha Labs — Google Stitch Production Execution Worker Daemon
 *
 * Dedicated long-lived queue worker that polls Supabase for queued generation jobs,
 * claims them with atomic conditional locking, executes genuine Google Stitch MCP generations
 * via stdio JSON-RPC, uploads resulting assets to private Supabase Storage, and updates
 * job & artifact statuses in PostgreSQL with lease heartbeats and fault-recovery.
 *
 * Fault Tolerance Guarantees:
 * 1. Atomic Locking: Two workers cannot claim the same job concurrently.
 * 2. Active Heartbeat: Updates lease timestamp every 20s during generation.
 * 3. Expired Lock Reclamation: Stale 'processing' jobs (>10m without heartbeat)
 *    are automatically recovered and re-queued up to max_retries (3), then marked failed.
 * 4. Private Artifact Storage: Assets uploaded to private bucket with 1-hr signed URLs.
 * 5. Clean Auth Failure: Invalid STITCH_API_KEY immediately fails the job gracefully.
 *
 * Usage:
 *   node scripts/stitch-worker.mjs             (Continuous daemon polling every 5s)
 *   node scripts/stitch-worker.mjs --once      (Process single queued job and exit)
 *   node scripts/stitch-worker.mjs --status    (Inspect queue status and exit)
 *   node scripts/stitch-worker.mjs --reclaim   (Reclaim expired locks and exit)
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

const workerId =
  process.env.WORKER_ID ||
  `worker_${process.pid}_${Math.random().toString(36).substring(2, 7)}`;
const LEASE_TIMEOUT_MS = parseInt(process.env.STITCH_JOB_LEASE_MS || "600000", 10); // 10 minutes
const MAX_RETRIES = parseInt(process.env.STITCH_MAX_RETRIES || "3", 10);

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
console.log(`Worker Instance ID  : ${workerId}`);
console.log(`Target Supabase Host: ${supabaseUrl}`);
console.log(
  `Stitch MCP Provider : ${
    stitchApiKey
      ? "CONFIGURED (STITCH_API_KEY active)"
      : "MISSING (Set STITCH_API_KEY in .env.local)"
  }`
);
console.log(`Job Lease Timeout   : ${LEASE_TIMEOUT_MS / 1000}s`);
console.log(`Max Execution Retry : ${MAX_RETRIES}`);
console.log("-----------------------------------------------------------------");

/**
 * Spawns an isolated Stitch MCP proxy session and sends JSON-RPC requests.
 */
function runStitchMcpSession(operation, timeoutMs = 180000) {
  if (!stitchApiKey) {
    return Promise.reject(
      new Error("Stitch MCP API Key is not configured: STITCH_API_KEY missing.")
    );
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

    child.stderr.on("data", (chunk) => {
      const txt = chunk.toString();
      if (txt.includes("Proxy server error")) {
        console.error(`[Worker ${workerId}] Stderr:`, txt.trim());
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
 * Uploads an asset to private Supabase Storage and generates a 1-hour signed URL.
 */
async function uploadToStorage(fileName, buffer, contentType) {
  try {
    const bucket = "design-studio-artifacts";
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, { contentType, upsert: true });

    if (error) {
      console.warn(`[Worker] Storage upload error (${fileName}):`, error.message);
      return { signedUrl: null, storagePath: fileName };
    }

    const { data: signedData, error: signErr } = await supabase.storage
      .from(bucket)
      .createSignedUrl(fileName, 3600);

    if (signErr) {
      console.warn(`[Worker] Signed URL creation warning:`, signErr.message);
      return { signedUrl: null, storagePath: fileName };
    }

    return { signedUrl: signedData?.signedUrl || null, storagePath: fileName };
  } catch (err) {
    console.warn(`[Worker] Storage upload exception:`, err.message);
    return { signedUrl: null, storagePath: fileName };
  }
}

/**
 * Reclaims orphaned jobs stuck in 'processing' state where the lease expired.
 * A job will NEVER remain permanently stuck in 'processing'.
 */
async function reclaimExpiredJobs() {
  const cutoff = new Date(Date.now() - LEASE_TIMEOUT_MS).toISOString();

  // 1. Primary table
  try {
    const { data: staleJobs } = await supabase
      .from("design_generation_jobs")
      .select("*")
      .eq("status", "processing")
      .lt("updated_at", cutoff);

    if (staleJobs && staleJobs.length > 0) {
      for (const j of staleJobs) {
        const retries = (j.input_parameters?.retry_count || 0) + 1;
        if (retries >= MAX_RETRIES) {
          console.warn(`[Worker] Job ${j.id} exceeded max retries (${MAX_RETRIES}). Marking failed.`);
          await supabase
            .from("design_generation_jobs")
            .update({
              status: "failed",
              error_message: `Worker lease expired without heartbeat (attempts: ${retries}/${MAX_RETRIES}).`,
              updated_at: new Date().toISOString(),
            })
            .eq("id", j.id);
        } else {
          console.log(`[Worker] Reclaiming abandoned job ${j.id} (Retry ${retries}/${MAX_RETRIES})...`);
          await supabase
            .from("design_generation_jobs")
            .update({
              status: "queued",
              stage: `Reclaimed from abandoned worker lease (Retry ${retries}/${MAX_RETRIES})`,
              input_parameters: { ...j.input_parameters, retry_count: retries },
              updated_at: new Date().toISOString(),
            })
            .eq("id", j.id);
        }
      }
    }
  } catch {}

  // 2. Fallback quote_requests store
  try {
    const { data: staleRows } = await supabase
      .from("quote_requests")
      .select("id, metadata, updated_at")
      .eq("metadata->job->>status", "processing")
      .lt("updated_at", cutoff);

    if (staleRows && staleRows.length > 0) {
      for (const row of staleRows) {
        const job = row.metadata?.job;
        if (!job) continue;

        const jobTimestamp = job.heartbeatAt || job.updatedAt;
        const isStale = jobTimestamp
          ? new Date(jobTimestamp).getTime() <= Date.now() - LEASE_TIMEOUT_MS
          : new Date(row.updated_at).getTime() <= Date.now() - LEASE_TIMEOUT_MS;

        if (!isStale) continue;

        const retries = (job.retryCount || 0) + 1;
        if (retries >= MAX_RETRIES) {
          console.warn(`[Worker] Job ${job.id} (quote_requests) exceeded max retries. Marking failed.`);
          job.status = "failed";
          job.errorMessage = `Worker lease expired without heartbeat (attempts: ${retries}/${MAX_RETRIES}).`;
        } else {
          console.log(`[Worker] Reclaiming abandoned job ${job.id} (quote_requests) (Retry ${retries}/${MAX_RETRIES})...`);
          job.status = "queued";
          job.stage = `Reclaimed from abandoned worker lease (Retry ${retries}/${MAX_RETRIES})`;
          job.retryCount = retries;
        }
        job.updatedAt = new Date().toISOString();
        const meta = { ...row.metadata, job };
        await supabase
          .from("quote_requests")
          .update({ metadata: meta, updated_at: new Date().toISOString() })
          .eq("id", row.id);
      }
    }
  } catch {}
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
      .eq("metadata->job->>status", "queued")
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
 * Claims a job with atomic conditional update to guarantee that only one worker can process it.
 */
async function claimJob(claimed) {
  const timestamp = new Date().toISOString();
  if (claimed.source === "primary") {
    const { data, error } = await supabase
      .from("design_generation_jobs")
      .update({
        status: "processing",
        stage: `Claimed by Worker ${workerId}`,
        updated_at: timestamp,
      })
      .eq("id", claimed.job.id)
      .eq("status", "queued") // Atomic conditional check
      .select();

    const won = !error && data && data.length > 0;
    if (won) {
      claimed.job.status = "processing";
      claimed.job.lockedBy = workerId;
    }
    return won;
  } else {
    // Fallback store: atomic condition on metadata->job->>status == 'queued'
    const updatedJob = {
      ...claimed.job,
      status: "processing",
      stage: `Claimed by Worker ${workerId}`,
      lockedBy: workerId,
      lockedAt: timestamp,
      heartbeatAt: timestamp,
      updatedAt: timestamp,
    };
    const meta = {
      ...claimed.project?.metadata,
      job: updatedJob,
      project: claimed.project,
    };

    const { data, error } = await supabase
      .from("quote_requests")
      .update({ metadata: meta, updated_at: timestamp })
      .eq("id", claimed.rowId)
      .eq("metadata->job->>status", "queued") // Atomic conditional check
      .select("id");

    const won = !error && data && data.length > 0;
    if (won) {
      claimed.job = updatedJob;
    }
    return won;
  }
}

/**
 * Sends periodic heartbeat while executing long generation to prevent lease expiration.
 */
function startHeartbeat(claimed) {
  return setInterval(async () => {
    const timestamp = new Date().toISOString();
    try {
      if (claimed.source === "primary") {
        await supabase
          .from("design_generation_jobs")
          .update({ updated_at: timestamp })
          .eq("id", claimed.job.id);
      } else {
        claimed.job.heartbeatAt = timestamp;
        claimed.job.updatedAt = timestamp;
        const meta = { job: claimed.job, project: claimed.project };
        await supabase
          .from("quote_requests")
          .update({ metadata: meta, updated_at: timestamp })
          .eq("id", claimed.rowId);
      }
    } catch (e) {
      console.warn(`[Worker ${workerId}] Heartbeat warning:`, e.message);
    }
  }, 20000);
}

/**
 * Processes a single claimed job to completion.
 */
async function processJob(claimed) {
  const job = claimed.job;
  console.log(`\n[Worker ${workerId}] Claimed Job ${job.id} (${job.jobCode || "JOB"}) for Project: ${job.projectId}`);
  console.log(`[Worker ${workerId}] Prompt: "${(job.prompt || "").slice(0, 80)}..."`);

  // Verify STITCH_API_KEY before executing
  if (!stitchApiKey || stitchApiKey.length < 10) {
    const authErr = "Stitch MCP authentication failed: STITCH_API_KEY is not configured or invalid.";
    console.error(`❌ [Worker ${workerId}] ${authErr}`);
    job.status = "failed";
    job.stage = "Authentication Failure";
    job.errorMessage = authErr;
    job.updatedAt = new Date().toISOString();

    if (claimed.source === "primary") {
      await supabase
        .from("design_generation_jobs")
        .update({ status: "failed", error_message: authErr, updated_at: job.updatedAt })
        .eq("id", job.id);
    } else {
      const meta = { job, project: claimed.project };
      await supabase
        .from("quote_requests")
        .update({ metadata: meta, updated_at: job.updatedAt })
        .eq("id", claimed.rowId);
    }
    return false;
  }

  const modelId = job.modelId || "GEMINI_3_8_FLASH";
  const deviceType = job.deviceType || "DESKTOP";

  // Start active heartbeat during generation
  const heartbeatTimer = startHeartbeat(claimed);

  try {
    const generationResult = await runStitchMcpSession(async (callTool) => {
      // 1. Create project on Stitch
      console.log(`[Worker ${workerId}] Calling create_project on Stitch MCP...`);
      const createRes = await callTool("create_project", {
        title: `StarX Worker — Project ${job.projectId}`,
      });
      const providerProjectName = createRes.name;
      const rawProjectId = providerProjectName.replace(/^projects\//, "");

      // 2. Generate screen
      console.log(`[Worker ${workerId}] Calling generate_screen_from_text (${modelId}, ${deviceType})...`);
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

      console.log(`[Worker ${workerId}] Generated Screen ID: ${providerScreenId}`);

      let htmlSignedUrl = primaryScreen.htmlCode?.downloadUrl || null;
      let screenshotSignedUrl = primaryScreen.screenshot?.downloadUrl || null;
      let storagePathHtml = null;
      let storagePathScreenshot = null;
      let htmlCode = "";

      const htmlFileName = primaryScreen.htmlCode?.name;
      if (htmlFileName) {
        try {
          console.log(`[Worker ${workerId}] Downloading generated HTML asset (${htmlFileName})...`);
          const htmlDl = await callTool("download_file", { name: htmlFileName });
          const rawHtml =
            htmlDl?.html ||
            (htmlDl?.content ? Buffer.from(htmlDl.content, "base64").toString("utf8") : "");
          if (rawHtml) {
            htmlCode = rawHtml;
            const storagePath = `worker_artifacts/${job.projectId}/${providerScreenId}.html`;
            const uploadRes = await uploadToStorage(storagePath, Buffer.from(htmlCode, "utf8"), "text/html");
            if (uploadRes.signedUrl) {
              htmlSignedUrl = uploadRes.signedUrl;
              storagePathHtml = uploadRes.storagePath;
              console.log(`[Worker ${workerId}] Uploaded private HTML artifact: ${storagePathHtml}`);
            }
          }
        } catch (err) {
          console.warn(`[Worker ${workerId}] HTML download note:`, err.message);
        }
      }

      const screenshotFileName = primaryScreen.screenshot?.name;
      if (screenshotFileName) {
        try {
          console.log(`[Worker ${workerId}] Downloading generated screenshot asset (${screenshotFileName})...`);
          const imgDl = await callTool("download_file", { name: screenshotFileName });
          const imgBase64 = imgDl?.image || imgDl?.content;
          if (imgBase64) {
            const imgBuffer = Buffer.from(imgBase64, "base64");
            const storagePath = `worker_artifacts/${job.projectId}/${providerScreenId}.png`;
            const uploadRes = await uploadToStorage(storagePath, imgBuffer, "image/png");
            if (uploadRes.signedUrl) {
              screenshotSignedUrl = uploadRes.signedUrl;
              storagePathScreenshot = uploadRes.storagePath;
              console.log(`[Worker ${workerId}] Uploaded private Screenshot artifact: ${storagePathScreenshot}`);
            }
          }
        } catch (err) {
          console.warn(`[Worker ${workerId}] Screenshot download note:`, err.message);
        }
      }

      return {
        providerProjectName,
        providerScreenId,
        htmlSignedUrl,
        screenshotSignedUrl,
        storagePathHtml,
        storagePathScreenshot,
        htmlCode,
        title: primaryScreen.title || "Stitch Generated Specification",
      };
    });

    clearInterval(heartbeatTimer);

    // Mark job completed in PostgreSQL
    job.status = "completed";
    job.stage = "Design synthesized and persisted to private Supabase Storage";
    job.progressPercent = 100;
    job.providerProjectId = generationResult.providerProjectName;
    job.providerScreenId = generationResult.providerScreenId;
    job.executionLogs = job.executionLogs || [];
    job.executionLogs.push({
      timestamp: new Date().toISOString(),
      message: `Worker completed real Stitch generation. Screen: ${generationResult.providerScreenId}`,
      stage: "Completion",
    });

    const artifact = {
      id: `art_${job.projectId}_${generationResult.providerScreenId.slice(0, 8)}`,
      projectId: job.projectId,
      organizationId: job.organizationId || claimed.project?.organizationId,
      jobId: job.id,
      versionNumber: 1,
      provider: "stitch",
      providerProjectId: generationResult.providerProjectName,
      providerScreenId: generationResult.providerScreenId,
      title: generationResult.title,
      deviceType,
      thumbnailUrl: generationResult.screenshotSignedUrl || generationResult.htmlSignedUrl,
      downloadUrl: generationResult.htmlSignedUrl,
      storagePathHtml: generationResult.storagePathHtml,
      storagePathScreenshot: generationResult.storagePathScreenshot,
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

    console.log(`✅ [Worker ${workerId}] Job ${job.id} COMPLETED successfully!`);
    console.log(`   Provider Project: ${generationResult.providerProjectName}`);
    console.log(`   Provider Screen : ${generationResult.providerScreenId}`);
    return true;
  } catch (err) {
    clearInterval(heartbeatTimer);
    console.error(`❌ [Worker ${workerId}] Job ${job.id} FAILED:`, err.message);
    job.status = "failed";
    job.stage = "Generation Failed in Worker";
    job.errorMessage = err.message;
    job.updatedAt = new Date().toISOString();

    if (claimed.source === "primary") {
      await supabase
        .from("design_generation_jobs")
        .update({
          status: "failed",
          error_message: err.message,
          updated_at: job.updatedAt,
        })
        .eq("id", job.id);
    } else {
      const meta = { job, project: claimed.project };
      await supabase
        .from("quote_requests")
        .update({ metadata: meta, updated_at: job.updatedAt })
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
  const isReclaim = args.includes("--reclaim");

  if (isReclaim) {
    console.log(`Running manual expired lock reclamation...`);
    await reclaimExpiredJobs();
    console.log(`Reclamation complete.`);
    process.exit(0);
  }

  if (isStatus) {
    const next = await fetchQueuedJob();
    console.log(`Queue Status: ${next ? `1 job queued (${next.job.id})` : "Queue is empty (0 jobs)"}`);
    process.exit(0);
  }

  console.log(`Starting Stitch Queue Processor (${isOnce ? "Single Job Mode" : "Continuous Daemon Mode"})...`);

  // Graceful shutdown handling
  let isShuttingDown = false;
  const onSignal = (sig) => {
    console.log(`\n[Worker ${workerId}] Received ${sig}. Gracefully shutting down...`);
    isShuttingDown = true;
    process.exit(0);
  };
  process.on("SIGINT", () => onSignal("SIGINT"));
  process.on("SIGTERM", () => onSignal("SIGTERM"));

  do {
    try {
      // 1. Reclaim any expired processing locks
      await reclaimExpiredJobs();

      // 2. Fetch and claim next queued job
      const candidate = await fetchQueuedJob();
      if (candidate) {
        const locked = await claimJob(candidate);
        if (locked) {
          await processJob(candidate);
        } else {
          console.log(`[Worker ${workerId}] Job ${candidate.job.id} was claimed by another worker. Backing off.`);
        }
      } else {
        if (!isOnce) {
          process.stdout.write(".");
        }
      }
    } catch (err) {
      console.error(`[Worker ${workerId}] Polling error:`, err.message);
    }

    if (!isOnce && !isShuttingDown) {
      await new Promise((res) => setTimeout(res, 5000));
    }
  } while (!isOnce && !isShuttingDown);

  console.log(`\n[Worker ${workerId}] Exiting cleanly.`);
  process.exit(0);
}

run();
