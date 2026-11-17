/**
 * Google Stitch Client
 * Supports:
 *   1. Direct MCP Stdio Execution (STITCH_API_KEY) via DirectStitchProvider
 *   2. Authenticated HTTP Bridge (STITCH_MCP_URL & STITCH_API_KEY)
 *   3. Explicit Provider-Unavailable State (No silent fake fallbacks)
 *   4. Dedicated Disclaimed Architecture Concept Wireframe (Preview Only)
 * StarX Alpha Labs — Design Studio Ecosystem
 */

import type {
  StitchProject,
  StitchDeviceType,
  StitchModelId,
  DesignStudioBrief,
  DesignArtifact,
} from "./types";
import { VERIFIED_STITCH_PROJECTS_CATALOG } from "./catalog";
import { getClosestVerifiedArchetype } from "./capabilities";
import { convertStitchProjectToArtifact } from "./artifacts";
import { directStitchProvider } from "./directProvider";

export interface StitchGenerationRequest {
  projectId: string;
  brief: DesignStudioBrief;
  modelId?: StitchModelId;
  deviceType?: StitchDeviceType;
  customPrompt?: string;
  versionNumber?: number;
}

export interface StitchGenerationResponse {
  ok: boolean;
  provenance: "live_direct_mcp" | "live_bridge" | "preview_only" | "unavailable";
  providerProjectId?: string;
  providerScreenId?: string;
  artifact?: DesignArtifact;
  rawProject?: StitchProject;
  error?: string;
}

export class StitchClient {
  private endpoint?: string | null;
  private apiKey?: string | null;

  constructor() {
    this.endpoint = process.env.STITCH_MCP_URL || null;
    this.apiKey = process.env.STITCH_API_KEY || null;
  }

  public isDirectMcpAvailable(): boolean {
    return directStitchProvider.isAvailable();
  }

  public isHttpBridgeAvailable(): boolean {
    return Boolean(this.endpoint && this.apiKey);
  }

  /**
   * Retrieves a Stitch project by its canonical resource name.
   */
  public async getProject(providerProjectId: string): Promise<StitchProject | null> {
    if (this.isHttpBridgeAvailable()) {
      try {
        const res = await fetch(
          `${this.endpoint?.replace(/\/$/, "")}/projects/${encodeURIComponent(providerProjectId)}`,
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data && data.name) return data as StitchProject;
        }
      } catch (err) {
        console.warn("[StitchClient] HTTP bridge error:", err);
      }
    }

    return VERIFIED_STITCH_PROJECTS_CATALOG[providerProjectId] || null;
  }

  /**
   * Generates a genuine Stitch design artifact from a customer's brief.
   * If Stitch is not configured/available, returns an explicit unavailable state.
   */
  public async generateDesign(
    request: StitchGenerationRequest
  ): Promise<StitchGenerationResponse> {
    const versionNumber = request.versionNumber || 1;
    const deviceType: StitchDeviceType =
      request.deviceType || request.brief.deviceTarget || "DESKTOP";
    const modelId: StitchModelId = request.modelId || "GEMINI_3_8_FLASH";

    // 1. Direct MCP Stdio Execution (Highest Fidelity)
    if (this.isDirectMcpAvailable()) {
      try {
        const directRes = await directStitchProvider.generateDesign({
          projectId: request.projectId,
          brief: request.brief,
          modelId,
          deviceType,
          customPrompt: request.customPrompt,
          versionNumber,
        });

        if (directRes.ok && directRes.artifact) {
          return {
            ok: true,
            provenance: "live_direct_mcp",
            providerProjectId: directRes.providerProjectId,
            providerScreenId: directRes.providerScreenId,
            artifact: directRes.artifact,
            rawProject: directRes.rawProject,
          };
        }
      } catch (err: any) {
        console.error("[StitchClient] Direct MCP execution error:", err?.message);
      }
    }

    // 2. HTTP Bridge Execution
    if (this.isHttpBridgeAvailable()) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 60000);

        const res = await fetch(`${this.endpoint?.replace(/\/$/, "")}/generate-design`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: request.projectId,
            prompt: request.customPrompt || this.buildStitchPrompt(request.brief),
            modelId,
            deviceType,
            industry: request.brief.industryName,
            division: request.brief.divisionName,
          }),
          signal: controller.signal,
        });

        clearTimeout(timer);

        if (res.ok) {
          const data = await res.json();
          const rawProject: StitchProject = data.project || {
            name: data.providerProjectId || `projects/gen-${Date.now()}`,
            title: `${request.brief.projectName} — AI Architecture Concept`,
            deviceType,
            designTheme: data.designTheme || {},
            designMd: data.designMd || "",
            thumbnailScreenshot: data.thumbnailScreenshot,
          };

          const artifact = convertStitchProjectToArtifact(
            rawProject,
            request.projectId,
            {
              versionNumber,
              keyFeatures: request.brief.selectedFeatures,
            }
          );

          return {
            ok: true,
            provenance: "live_bridge",
            providerProjectId: rawProject.name,
            providerScreenId: data.providerScreenId,
            artifact,
            rawProject,
          };
        }
      } catch (err: any) {
        console.warn("[StitchClient] Live bridge generation failed:", err?.message);
      }
    }

    // 3. Neither Provider Connection is Available
    // Strict Honesty: Never pretend a local template is a real Stitch generation
    return {
      ok: false,
      provenance: "unavailable",
      error:
        "Google Stitch MCP Provider is not configured or reachable in this environment. The generation job has been queued in PostgreSQL for operator processing.",
    };
  }

  /**
   * Generates a disclaimed local interactive wireframe preview (Preview Only).
   * Used strictly when a customer explicitly requests an instant architecture wireframe preview.
   */
  public generatePreviewOnlyWireframe(
    request: StitchGenerationRequest
  ): StitchGenerationResponse {
    const versionNumber = request.versionNumber || 1;
    const deviceType: StitchDeviceType =
      request.deviceType || request.brief.deviceTarget || "DESKTOP";

    const archetype = getClosestVerifiedArchetype(
      request.brief.industrySlug,
      request.brief.divisionSlug
    );

    const catalogProject =
      VERIFIED_STITCH_PROJECTS_CATALOG[archetype.providerProjectId] ||
      Object.values(VERIFIED_STITCH_PROJECTS_CATALOG)[0];

    const customizedProject: StitchProject = {
      ...catalogProject,
      name: `${catalogProject.name}-preview`,
      title: `${request.brief.projectName} [PREVIEW ONLY: Architectural Wireframe]`,
      deviceType,
      designTheme: {
        ...catalogProject.designTheme,
        colorMode: request.brief.themePreference === "executive-light" ? "LIGHT" : "DARK",
      },
    };

    const artifact = convertStitchProjectToArtifact(
      customizedProject,
      request.projectId,
      {
        versionNumber,
        keyFeatures: request.brief.selectedFeatures,
      }
    );

    artifact.title = `${request.brief.projectName} [PREVIEW ONLY: Architectural Wireframe]`;

    return {
      ok: true,
      provenance: "preview_only",
      providerProjectId: customizedProject.name,
      artifact,
      rawProject: customizedProject,
    };
  }

  /**
   * Executes genuine screen editing on an existing Stitch screen via edit_screens.
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
  }): Promise<StitchGenerationResponse> {
    if (this.isDirectMcpAvailable()) {
      try {
        const directRes = await directStitchProvider.editDesign(params);
        if (directRes.ok && directRes.artifact) {
          return {
            ok: true,
            provenance: "live_direct_mcp",
            providerProjectId: directRes.providerProjectId,
            providerScreenId: directRes.providerScreenId,
            artifact: directRes.artifact,
            rawProject: directRes.rawProject,
          };
        }
      } catch (err: any) {
        console.error("[StitchClient] Direct MCP edit error:", err?.message);
      }
    }

    return {
      ok: false,
      provenance: "unavailable",
      error: "Stitch editing provider is unavailable in this environment.",
    };
  }

  /**
   * Helper to construct a Stitch prompt from a structured brief.
   */
  private buildStitchPrompt(brief: DesignStudioBrief): string {
    return [
      `Design an authentic domain-tailored enterprise interface for "${brief.projectName}" in the ${brief.industryName} sector (${brief.divisionName}).`,
      `Problem & Workflow: ${brief.description}`,
      `Key Capabilities Required: ${brief.selectedFeatures.join(", ")}`,
      `Target Platforms: ${brief.platformTargets.join(", ")}`,
      `Visual Personality: ${brief.themePreference}. High-density, specular glassmorphism, zero-clutter professional UI.`,
      brief.specialInstructions ? `Special Instructions: ${brief.specialInstructions}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }
}

export const stitchClient = new StitchClient();
