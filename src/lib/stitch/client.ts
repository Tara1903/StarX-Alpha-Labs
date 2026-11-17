/**
 * Google Stitch Client
 * Supports both direct remote HTTP bridge (STITCH_MCP_URL) and verified Stitch MCP catalog
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
  provenance: "live_bridge" | "verified_catalog";
  providerProjectId: string;
  artifact: DesignArtifact;
  rawProject: StitchProject;
  error?: string;
}

export class StitchClient {
  private endpoint?: string | null;
  private apiKey?: string | null;

  constructor() {
    this.endpoint = process.env.STITCH_MCP_URL || null;
    this.apiKey = process.env.STITCH_API_KEY || null;
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
        console.warn("[StitchClient] HTTP bridge error, falling back to verified catalog:", err);
      }
    }

    // Fallback to verified catalog
    return VERIFIED_STITCH_PROJECTS_CATALOG[providerProjectId] || null;
  }

  /**
   * Generates or synthesizes a design artifact from a customer's structured brief.
   */
  public async generateDesign(
    request: StitchGenerationRequest
  ): Promise<StitchGenerationResponse> {
    const versionNumber = request.versionNumber || 1;
    const deviceType: StitchDeviceType =
      request.deviceType || request.brief.deviceTarget || "DESKTOP";

    // 1. If HTTP Bridge is available, invoke it directly
    if (this.isHttpBridgeAvailable()) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 45000);

        const res = await fetch(`${this.endpoint?.replace(/\/$/, "")}/generate-design`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: request.projectId,
            prompt: request.customPrompt || this.buildStitchPrompt(request.brief),
            modelId: request.modelId || "GEMINI_3_8_FLASH",
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
            artifact,
            rawProject,
          };
        }
      } catch (err: any) {
        console.warn("[StitchClient] Live bridge generation failed or timed out:", err?.message);
      }
    }

    // 2. Select closest domain archetype from verified catalog
    const archetype = getClosestVerifiedArchetype(
      request.brief.industrySlug,
      request.brief.divisionSlug
    );

    const catalogProject =
      VERIFIED_STITCH_PROJECTS_CATALOG[archetype.providerProjectId] ||
      Object.values(VERIFIED_STITCH_PROJECTS_CATALOG)[0];

    // Create tailored customized snapshot inheriting authentic Stitch tokens and specs
    const customizedProject: StitchProject = {
      ...catalogProject,
      name: catalogProject.name,
      title: `${request.brief.projectName} (${request.brief.industryName})`,
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

    return {
      ok: true,
      provenance: "verified_catalog",
      providerProjectId: customizedProject.name,
      artifact,
      rawProject: customizedProject,
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
