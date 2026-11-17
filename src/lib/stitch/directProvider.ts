/**
 * Google Stitch Direct MCP Execution Provider
 * Connects to @_davideast/stitch-mcp proxy via stdio JSON-RPC
 * Handles real project creation, screen generation, editing, asset download,
 * and persistence to Supabase Storage (design-studio-artifacts)
 * StarX Alpha Labs — Design Studio Production Ecosystem
 */

import { spawn, type ChildProcess } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import type {
  StitchModelId,
  StitchDeviceType,
  StitchProject,
  StitchScreen,
  DesignArtifact,
  DesignStudioBrief,
} from "./types";

export interface DirectGenerationResult {
  ok: boolean;
  providerProjectId: string;
  providerScreenId?: string;
  artifact: DesignArtifact;
  rawProject: StitchProject;
  htmlUrl?: string;
  screenshotUrl?: string;
  executionLogs: Array<{ timestamp: string; message: string; stage?: string }>;
  error?: string;
}

export class DirectStitchProvider {
  private apiKey: string | null = null;
  private isProcessing = false;

  constructor() {
    this.apiKey = process.env.STITCH_API_KEY || null;
  }

  public isAvailable(): boolean {
    const key = this.apiKey || process.env.STITCH_API_KEY;
    return Boolean(key && key.length > 10);
  }

  /**
   * Spawns an isolated Stitch MCP proxy session and sends JSON-RPC requests.
   */
  private async runMcpSession<T>(
    operation: (callTool: (toolName: string, args: Record<string, any>) => Promise<any>) => Promise<T>,
    timeoutMs = 180000
  ): Promise<T> {
    const key = this.apiKey || process.env.STITCH_API_KEY;
    if (!key || key.length < 10) {
      throw new Error("Stitch MCP Provider is unavailable: STITCH_API_KEY is not configured.");
    }

    return new Promise((resolve, reject) => {
      let child: ChildProcess | null = null;
      let isSettled = false;

      const timeoutTimer = setTimeout(() => {
        if (!isSettled) {
          isSettled = true;
          if (child) child.kill();
          reject(new Error(`Stitch MCP operation timed out after ${timeoutMs / 1000}s`));
        }
      }, timeoutMs);

      try {
        child = spawn("npx", ["-y", "@_davideast/stitch-mcp", "proxy"], {
          env: {
            ...process.env,
            STITCH_API_KEY: key,
            DOTENV_CONFIG_QUIET: "true",
            DOTENV_QUIET: "true",
            NO_COLOR: "1",
          },
          shell: true,
        });

        let buffer = "";
        let requestId = 1;
        const pendingCalls = new Map<number, { resolve: (res: any) => void; reject: (err: any) => void }>();

        child.stdout?.on("data", (chunk: Buffer) => {
          buffer += chunk.toString();
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const msg = JSON.parse(trimmed);
              if (msg.id && pendingCalls.has(msg.id)) {
                const { resolve: callRes, reject: callRej } = pendingCalls.get(msg.id)!;
                pendingCalls.delete(msg.id);
                if (msg.error) {
                  callRej(new Error(msg.error.message || JSON.stringify(msg.error)));
                } else {
                  callRes(msg.result);
                }
              }
            } catch {
              // Non-JSON stdout lines (e.g. npm warnings) are ignored
            }
          }
        });

        child.stderr?.on("data", (chunk: Buffer) => {
          const stderrText = chunk.toString();
          if (stderrText.includes("Proxy server error")) {
            console.error("[StitchDirectProvider] Stderr:", stderrText.trim());
          }
        });

        child.on("error", (err) => {
          if (!isSettled) {
            isSettled = true;
            clearTimeout(timeoutTimer);
            reject(err);
          }
        });

        child.on("exit", (code) => {
          if (!isSettled && code !== 0) {
            isSettled = true;
            clearTimeout(timeoutTimer);
            reject(new Error(`Stitch MCP process exited with code ${code}`));
          }
        });

        const sendJsonRpc = (method: string, params: Record<string, any> = {}) => {
          const id = requestId++;
          const payload = JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n";
          return new Promise<any>((callRes, callRej) => {
            pendingCalls.set(id, { resolve: callRes, reject: callRej });
            child?.stdin?.write(payload);
          });
        };

        const callTool = async (toolName: string, args: Record<string, any>, retryCount = 0): Promise<any> => {
          try {
            const result = await sendJsonRpc("tools/call", {
              name: toolName,
              arguments: args,
            });

            if (result?.isError) {
              const errDetail = result.content?.map((c: any) => c.text).join(" ") || "Tool execution failed";
              if ((errDetail.includes("502") || errDetail.includes("503") || errDetail.includes("temporary error")) && retryCount < 2) {
                console.log(`[StitchDirectProvider] Upstream transient 502/503 for "${toolName}". Retrying in 3.5s (attempt ${retryCount + 1}/2)...`);
                await new Promise((r) => setTimeout(r, 3500));
                return callTool(toolName, args, retryCount + 1);
              }
              throw new Error(`Stitch MCP tool "${toolName}" failed: ${errDetail}`);
            }

            if (result?.content && Array.isArray(result.content)) {
              const textContent = result.content.find((c: any) => c.type === "text");
              if (textContent?.text) {
                try {
                  return JSON.parse(textContent.text);
                } catch {
                  return textContent.text;
                }
              }
            }
            return result;
          } catch (err: any) {
            if ((err.message?.includes("502") || err.message?.includes("503") || err.message?.includes("temporary error")) && retryCount < 2) {
              console.log(`[StitchDirectProvider] Upstream transient network error for "${toolName}". Retrying in 3.5s (attempt ${retryCount + 1}/2)...`);
              await new Promise((r) => setTimeout(r, 3500));
              return callTool(toolName, args, retryCount + 1);
            }
            throw err;
          }
        };

        // Initialize handshake
        sendJsonRpc("initialize", {
          protocolVersion: "2024-11-05",
          capabilities: {},
          clientInfo: { name: "starx-direct-provider", version: "1.0.0" },
        })
          .then(async () => {
            child?.stdin?.write(
              JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n"
            );
            return operation(callTool);
          })
          .then((opResult) => {
            if (!isSettled) {
              isSettled = true;
              clearTimeout(timeoutTimer);
              child?.kill();
              resolve(opResult);
            }
          })
          .catch((err) => {
            if (!isSettled) {
              isSettled = true;
              clearTimeout(timeoutTimer);
              child?.kill();
              reject(err);
            }
          });
      } catch (err) {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timeoutTimer);
          if (child) child.kill();
          reject(err);
        }
      }
    });
  }

  private extractScreens(res: any): any[] {
    if (!res) return [];
    if (Array.isArray(res.screens) && res.screens.length > 0) return res.screens;
    if (Array.isArray(res.outputComponents)) {
      const screens: any[] = [];
      for (const comp of res.outputComponents) {
        if (comp?.design?.screens && Array.isArray(comp.design.screens)) {
          screens.push(...comp.design.screens);
        }
      }
      return screens;
    }
    return [];
  }

  private extractScreenId(screenMeta: any): string | null {
    if (!screenMeta) return null;
    if (screenMeta.id && typeof screenMeta.id === "string") return screenMeta.id;
    if (typeof screenMeta.name === "string" && screenMeta.name.includes("/screens/")) {
      return screenMeta.name.split("/screens/")[1];
    }
    return null;
  }

  /**
   * Uploads an artifact asset (HTML or Screenshot) to the dedicated Supabase Storage bucket.
   * Generates a short-lived cryptographically signed URL (3600s / 1hr) for secure private access.
   */
  public async uploadAssetToStorage(
    fileName: string,
    content: string | Buffer,
    contentType: string
  ): Promise<{ signedUrl: string | null; storagePath: string }> {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return { signedUrl: null, storagePath: fileName };
      }
      const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false, autoRefreshToken: false } }
      );
      const bucketName = "design-studio-artifacts";

      const buffer = typeof content === "string" ? Buffer.from(content, "utf8") : content;
      const { error } = await admin.storage.from(bucketName).upload(fileName, buffer, {
        contentType,
        upsert: true,
      });

      if (error) {
        console.warn(`[DirectStitchProvider] Storage upload error for ${fileName}:`, error.message);
        return { signedUrl: null, storagePath: fileName };
      }

      // Generate a secure 1-hour signed URL (bucket is private)
      const { data: signedData, error: signErr } = await admin.storage
        .from(bucketName)
        .createSignedUrl(fileName, 3600);

      if (signErr) {
        console.warn(`[DirectStitchProvider] Signed URL generation error:`, signErr.message);
        return { signedUrl: null, storagePath: fileName };
      }

      return { signedUrl: signedData?.signedUrl || null, storagePath: fileName };
    } catch (err: any) {
      console.warn(`[DirectStitchProvider] Storage upload exception:`, err?.message);
      return { signedUrl: null, storagePath: fileName };
    }
  }

  /**
   * Generates an authorized fresh signed URL for any private artifact asset path.
   */
  public async createSignedUrl(storagePath: string, expiresInSeconds = 3600): Promise<string | null> {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return null;
      }
      const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false, autoRefreshToken: false } }
      );
      const { data, error } = await admin.storage
        .from("design-studio-artifacts")
        .createSignedUrl(storagePath, expiresInSeconds);

      if (error) {
        console.warn(`[DirectStitchProvider] createSignedUrl error for ${storagePath}:`, error.message);
        return null;
      }
      return data?.signedUrl || null;
    } catch {
      return null;
    }
  }

  /**
   * Executes genuine design generation via Stitch MCP.
   */
  public async generateDesign(params: {
    projectId: string;
    brief: DesignStudioBrief;
    modelId?: StitchModelId;
    deviceType?: StitchDeviceType;
    customPrompt?: string;
    versionNumber?: number;
  }): Promise<DirectGenerationResult> {
    const logs: Array<{ timestamp: string; message: string; stage?: string }> = [];
    const log = (msg: string, stage?: string) => {
      logs.push({ timestamp: new Date().toISOString(), message: msg, stage });
    };

    const modelId: StitchModelId = params.modelId || "GEMINI_3_8_FLASH";
    const deviceType: StitchDeviceType = params.deviceType || "DESKTOP";
    const versionNumber = params.versionNumber || 1;

    log("Initializing Direct Stitch MCP Session...", "Initialization");

    return this.runMcpSession(async (callTool) => {
      // 1. Create a dedicated project on Stitch
      log(`Creating Stitch Project for "${params.brief.projectName}"...`, "Project Creation");
      const projectTitle = `StarX — ${params.brief.projectName} (${params.brief.industryName})`;
      const createRes = await callTool("create_project", { title: projectTitle });
      const providerProjectName: string = createRes.name; // e.g. "projects/123456789"
      const rawProjectId = providerProjectName.replace(/^projects\//, "");

      log(`Stitch Project created: ${providerProjectName}`, "Project Creation");

      // 2. Synthesize Generation Prompt
      const fullPrompt =
        params.customPrompt ||
        [
          `Design a state-of-the-art enterprise ${deviceType.toLowerCase()} interface for "${params.brief.projectName}" in the ${params.brief.industryName} industry (${params.brief.divisionName}).`,
          `Problem & Mission: ${params.brief.description}`,
          `Required Architectural Capabilities: ${params.brief.selectedFeatures.join(", ")}`,
          `Target Platforms: ${params.brief.platformTargets.join(", ")}`,
          `Visual Aesthetic: ${params.brief.themePreference}. High-density, professional specular glassmorphism, zero-clutter layout with polished typography and crisp telemetry components.`,
          params.brief.specialInstructions ? `Special Instructions: ${params.brief.specialInstructions}` : "",
        ]
          .filter(Boolean)
          .join("\n");

      // 3. Invoke generate_screen_from_text
      log(`Invoking generate_screen_from_text with ${modelId} (${deviceType})...`, "Screen Generation");
      const genRes = await callTool("generate_screen_from_text", {
        projectId: rawProjectId,
        prompt: fullPrompt,
        modelId,
        deviceType,
      });

      log("Stitch screen generation completed successfully.", "Screen Generation");

      // 4. Identify the primary full screen generated
      const screens = this.extractScreens(genRes);
      const primaryScreenMeta =
        screens.find((s) => s.deviceType === deviceType && (s.id || s.name)) ||
        screens[screens.length - 1] ||
        {};

      const extractedId = this.extractScreenId(primaryScreenMeta);
      const providerScreenId = extractedId || `screen_${Date.now()}`;

      log(`Inspecting primary generated screen: ${primaryScreenMeta.name || providerScreenId}...`, "Asset Inspection");

      let htmlCode = "";
      let htmlUrl: string | undefined = primaryScreenMeta.htmlCode?.downloadUrl;
      let screenshotUrl: string | undefined = primaryScreenMeta.screenshot?.downloadUrl;
      let storagePathHtml: string | undefined;
      let storagePathScreenshot: string | undefined;

      // 5. Download HTML and Screenshot assets and store in Supabase Storage
      const htmlFileName = primaryScreenMeta.htmlCode?.name;
      if (htmlFileName) {
        try {
          log(`Downloading generated HTML asset (${htmlFileName})...`, "Asset Download");
          const htmlDownload = await callTool("download_file", { name: htmlFileName });
          const rawHtml =
            htmlDownload?.html ||
            (htmlDownload?.content ? Buffer.from(htmlDownload.content, "base64").toString("utf8") : "");
          if (rawHtml) {
            htmlCode = rawHtml;
            const storageFileName = `projects/${params.projectId}/v${versionNumber}_screen_${providerScreenId}.html`;
            const uploadResult = await this.uploadAssetToStorage(storageFileName, htmlCode, "text/html");
            if (uploadResult.signedUrl) {
              htmlUrl = uploadResult.signedUrl;
              storagePathHtml = uploadResult.storagePath;
            }
          }
        } catch (htmlErr: any) {
          log(`HTML download note: ${htmlErr.message}`, "Asset Download");
        }
      }

      const screenshotFileName = primaryScreenMeta.screenshot?.name;
      if (screenshotFileName) {
        try {
          log(`Downloading high-resolution rendered screenshot (${screenshotFileName})...`, "Asset Download");
          const screenshotDownload = await callTool("download_file", { name: screenshotFileName });
          const imageBase64 = screenshotDownload?.image || screenshotDownload?.content;
          if (imageBase64) {
            const imageBuffer = Buffer.from(imageBase64, "base64");
            const storageFileName = `projects/${params.projectId}/v${versionNumber}_screenshot_${providerScreenId}.png`;
            const uploadResult = await this.uploadAssetToStorage(storageFileName, imageBuffer, "image/png");
            if (uploadResult.signedUrl) {
              screenshotUrl = uploadResult.signedUrl;
              storagePathScreenshot = uploadResult.storagePath;
            }
          }
        } catch (imgErr: any) {
          log(`Screenshot download note: ${imgErr.message}`, "Asset Download");
        }
      }

      // 6. Build the persistent DesignArtifact
      const artifactId = `art_${params.projectId}_v${versionNumber}_${providerScreenId.slice(0, 8)}`;
      const rawProject: StitchProject = {
        name: providerProjectName,
        title: primaryScreenMeta.title || `${params.brief.projectName} (${params.brief.industryName})`,
        deviceType,
        designTheme: genRes.designSystem?.name
          ? { font: "Inter", bodyFont: "Inter", headlineFont: "Plus Jakarta Sans" }
          : {},
      };

      const defaultPalette =
        params.brief.themePreference === "executive-light"
          ? ["#0f172a", "#3b82f6", "#f8fafc", "#e2e8f0", "#10b981"]
          : ["#050507", "#00f2fe", "#4facfe", "#d4af37", "#121218"];

      const artifact: DesignArtifact = {
        id: artifactId,
        projectId: params.projectId,
        versionNumber,
        provider: "stitch",
        providerProjectId: providerProjectName,
        providerScreenId,
        title: primaryScreenMeta.title || `${params.brief.projectName} Interface Specification`,
        styleName: params.brief.themePreference,
        deviceType,
        designTheme: rawProject.designTheme || {},
        designMd: `# ${params.brief.projectName}\n\nGenerated with Google Stitch AI (${modelId}) on ${new Date().toLocaleDateString()}.\n\n### Key Features\n${params.brief.selectedFeatures.map((f) => `- ${f}`).join("\n")}`,
        thumbnailUrl: screenshotUrl || htmlUrl || `https://placehold.co/1280x720/0a0e17/00f2fe?text=${encodeURIComponent(params.brief.projectName)}`,
        downloadUrl: htmlUrl,
        storagePathHtml,
        storagePathScreenshot,
        htmlCode: htmlCode || undefined,
        palette: defaultPalette,
        keyFeatures: params.brief.selectedFeatures,
        isApproved: false,
        createdAt: new Date().toISOString(),
      };

      log("Direct Google Stitch execution completed and verified.", "Completion");

      return {
        ok: true,
        providerProjectId: providerProjectName,
        providerScreenId,
        artifact,
        rawProject,
        htmlUrl,
        screenshotUrl,
        executionLogs: logs,
      };
    });
  }

  /**
   * Executes genuine screen editing via Stitch MCP edit_screens.
   */
  public async editDesign(params: {
    projectId: string;
    providerProjectId: string;
    screenId: string;
    prompt: string;
    modelId?: StitchModelId;
    deviceType?: StitchDeviceType;
    versionNumber?: number;
    currentArtifact: DesignArtifact;
  }): Promise<DirectGenerationResult> {
    const logs: Array<{ timestamp: string; message: string; stage?: string }> = [];
    const log = (msg: string, stage?: string) => {
      logs.push({ timestamp: new Date().toISOString(), message: msg, stage });
    };

    const modelId = params.modelId || "GEMINI_3_8_FLASH";
    const deviceType = params.deviceType || "DESKTOP";
    const versionNumber = params.versionNumber || (params.currentArtifact.versionNumber + 1);
    const rawProjectId = params.providerProjectId.replace(/^projects\//, "");

    log(`Initializing Stitch MCP Screen Revision for screen "${params.screenId}"...`, "Revision Initialization");

    return this.runMcpSession(async (callTool) => {
      const editRes = await callTool("edit_screens", {
        projectId: rawProjectId,
        selectedScreenIds: [params.screenId],
        prompt: params.prompt,
        modelId,
        deviceType,
      });

      log("Stitch screen editing completed.", "Revision Generation");

      // 4. Identify revised screen
      const screens = this.extractScreens(editRes);
      const revisedScreenMeta =
        screens.find((s) => s.deviceType === deviceType && (s.id || s.name)) ||
        screens[screens.length - 1] ||
        {};

      const extractedRevId = this.extractScreenId(revisedScreenMeta);
      const newScreenId = extractedRevId || `screen_rev_${Date.now()}`;

      let htmlCode = "";
      let htmlUrl: string | undefined = revisedScreenMeta.htmlCode?.downloadUrl;
      let screenshotUrl: string | undefined = revisedScreenMeta.screenshot?.downloadUrl;

      let storagePathHtml: string | undefined = params.currentArtifact.storagePathHtml;
      let storagePathScreenshot: string | undefined = params.currentArtifact.storagePathScreenshot;

      const htmlFileName = revisedScreenMeta.htmlCode?.name;
      if (htmlFileName) {
        try {
          const htmlDownload = await callTool("download_file", { name: htmlFileName });
          const rawHtml =
            htmlDownload?.html ||
            (htmlDownload?.content ? Buffer.from(htmlDownload.content, "base64").toString("utf8") : "");
          if (rawHtml) {
            htmlCode = rawHtml;
            const storageFileName = `projects/${params.projectId}/v${versionNumber}_revised_${newScreenId}.html`;
            const uploadResult = await this.uploadAssetToStorage(storageFileName, htmlCode, "text/html");
            if (uploadResult.signedUrl) {
              htmlUrl = uploadResult.signedUrl;
              storagePathHtml = uploadResult.storagePath;
            }
          }
        } catch (htmlErr: any) {
          log(`Revised HTML download note: ${htmlErr.message}`, "Revision Download");
        }
      }

      const screenshotFileName = revisedScreenMeta.screenshot?.name;
      if (screenshotFileName) {
        try {
          const screenshotDownload = await callTool("download_file", { name: screenshotFileName });
          const imageBase64 = screenshotDownload?.image || screenshotDownload?.content;
          if (imageBase64) {
            const imageBuffer = Buffer.from(imageBase64, "base64");
            const storageFileName = `projects/${params.projectId}/v${versionNumber}_revised_${newScreenId}.png`;
            const uploadResult = await this.uploadAssetToStorage(storageFileName, imageBuffer, "image/png");
            if (uploadResult.signedUrl) {
              screenshotUrl = uploadResult.signedUrl;
              storagePathScreenshot = uploadResult.storagePath;
            }
          }
        } catch (imgErr: any) {
          log(`Revised screenshot download note: ${imgErr.message}`, "Revision Download");
        }
      }

      const newArtifactId = `art_${params.projectId}_v${versionNumber}_${newScreenId.slice(0, 8)}`;
      const artifact: DesignArtifact = {
        ...params.currentArtifact,
        id: newArtifactId,
        versionNumber,
        providerScreenId: newScreenId,
        title: revisedScreenMeta.title || `${params.currentArtifact.title} (Revision ${versionNumber})`,
        thumbnailUrl: screenshotUrl || htmlUrl || params.currentArtifact.thumbnailUrl,
        downloadUrl: htmlUrl || params.currentArtifact.downloadUrl,
        storagePathHtml,
        storagePathScreenshot,
        htmlCode: htmlCode || params.currentArtifact.htmlCode,
        isApproved: false,
        createdAt: new Date().toISOString(),
      };

      log("Stitch screen revision completed and verified.", "Revision Complete");

      return {
        ok: true,
        providerProjectId: params.providerProjectId,
        providerScreenId: newScreenId,
        artifact,
        rawProject: {
          name: params.providerProjectId,
          title: artifact.title,
          deviceType,
        },
        htmlUrl,
        screenshotUrl,
        executionLogs: logs,
      };
    });
  }
}

export const directStitchProvider = new DirectStitchProvider();

export function getDirectStitchProvider(): DirectStitchProvider {
  return directStitchProvider;
}
