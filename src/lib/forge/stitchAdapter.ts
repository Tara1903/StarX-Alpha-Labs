import "server-only";

import type { ForgeDemoRecord, ForgeJob } from "./types";
import { runRealIntegrationHealthCheck } from "./health";

export function buildDesignBriefAndStitchPayload(
  demo: ForgeDemoRecord,
  inputConfig: ForgeJob["inputConfig"],
  defaultInstructions: string
): {
  designBrief: string;
  stitchRequestPayload: Record<string, any>;
} {
  const workflowsList = inputConfig.workflows.length
    ? inputConfig.workflows
    : demo.workflows.map((w) => `${w.title}: ${w.description}`);

  const featuresList = inputConfig.functionalRequirements.length
    ? inputConfig.functionalRequirements
    : demo.featureRequirements;

  const designBrief = [
    `STARX FORGE DESIGN BRIEF — ${inputConfig.businessName}`,
    `Industry: ${inputConfig.industry} (${inputConfig.categorySlug})`,
    `Target Customers: ${inputConfig.targetCustomers || demo.targetAudience}`,
    `Product Archetype: ${demo.archetype}`,
    `Overview: ${inputConfig.description || demo.description}`,
    ``,
    `Core Workflows Required:`,
    ...workflowsList.map((w, i) => `  ${i + 1}. ${w}`),
    ``,
    `Functional Modules:`,
    ...featuresList.map((f) => `  - ${f}`),
    ``,
    `Visual Direction: ${inputConfig.designPreferences || demo.designDirection}`,
    `Engineering Standards: ${defaultInstructions}`,
    inputConfig.specialInstructions ? `Special Admin Notes: ${inputConfig.specialInstructions}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const stitchRequestPayload = {
    protocol: "stitch-mcp-design-request/v1",
    demoSlug: demo.slug,
    businessName: inputConfig.businessName,
    industry: inputConfig.industry,
    deviceTargets: ["DESKTOP", "TABLET", "MOBILE"],
    prompt: `Design an authentic, domain-tailored business software interface for "${inputConfig.businessName}" (${inputConfig.industry}).
Do NOT design a generic landing page. Create interactive multi-role screens (Operations Dashboard + Customer / Operator Workflow + Analytics/Settings) covering: ${workflowsList.slice(0, 4).join("; ")}.
Visual personality: ${inputConfig.designPreferences || demo.designDirection}.
Brand palette hint: primary ${demo.brandConfig?.primary || "#087BFF"}, accent ${demo.brandConfig?.accent || "#00D9FF"}, surface ${demo.brandConfig?.surface || "#0A1940"}.`,
    requestedArtifacts: ["projectId", "screenIds", "designTokens", "htmlPreview", "layoutSummary"],
    generatedAt: new Date().toISOString(),
  };

  return { designBrief, stitchRequestPayload };
}

export async function invokeStitchDesignGeneration(
  payload: Record<string, any>,
  stitchEndpoint?: string | null
): Promise<{
  ok: boolean;
  connected: boolean;
  assets?: ForgeJob["stitchResponseAssets"];
  error?: string;
}> {
  const endpoint = process.env.STITCH_MCP_URL || stitchEndpoint;
  const apiKey = process.env.STITCH_API_KEY;

  if (endpoint && apiKey) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 30000);
      const res = await fetch(`${endpoint.replace(/\/$/, "")}/generate-design`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        return {
          ok: false,
          connected: true,
          error: `Stitch MCP Bridge returned HTTP ${res.status}: ${errBody || res.statusText}`,
        };
      }

      const data = await res.json();
      return {
        ok: true,
        connected: true,
        assets: {
          connected: true,
          source: "stitch-mcp",
          projectId: data.projectId,
          screenIds: Array.isArray(data.screenIds) ? data.screenIds : [],
          designTokens: data.designTokens || {},
          screenSummary: data.layoutSummary || "Generated via Stitch MCP Bridge",
          rawArtifact: data,
        },
      };
    } catch (err: any) {
      return {
        ok: false,
        connected: false,
        error: `Failed communicating with Stitch MCP Bridge: ${err?.message || "Network timeout"}`,
      };
    }
  }

  // Real check against local config to give accurate diagnostics
  const health = await runRealIntegrationHealthCheck();
  const stitchHealth = health.find((h) => h.id === "stitch_mcp");

  if (stitchHealth?.status === "connected") {
    // Configured in local IDE mcp_config.json (stdio MCP server) rather than HTTP daemon
    return {
      ok: false,
      connected: true,
      error:
        "Stitch MCP is configured as a local stdio MCP tool in Antigravity IDE (`mcp_config.json`), not an HTTP endpoint. Invoke Stitch MCP tools directly inside Antigravity using the prepared payload and attach the Stitch result to advance Stage 5.",
    };
  }

  return {
    ok: false,
    connected: false,
    error:
      "Stitch MCP is NOT connected. Add `stitch` (`npx -y stitch-mcp` + STITCH_API_KEY) to ~/.gemini/antigravity/mcp_config.json, or configure STITCH_MCP_URL + STITCH_API_KEY in server env.",
  };
}
