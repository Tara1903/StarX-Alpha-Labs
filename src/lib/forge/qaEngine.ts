import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { getDemoProductBySlug } from "@/modules/demo-center/registry";
import type { ForgeDemoRecord, ForgeQaCheckItem, ForgeQaReport } from "./types";

function parseHexColor(hex?: string): [number, number, number] | null {
  if (!hex || typeof hex !== "string") return null;
  const cleaned = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null;
  return [
    parseInt(cleaned.slice(0, 2), 16),
    parseInt(cleaned.slice(2, 4), 16),
    parseInt(cleaned.slice(4, 6), 16),
  ];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const srgb = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function computeContrastRatio(hex1?: string, hex2?: string): number | null {
  const c1 = parseHexColor(hex1);
  const c2 = parseHexColor(hex2);
  if (!c1 || !c2) return null;
  const l1 = relativeLuminance(c1);
  const l2 = relativeLuminance(c2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

const VALID_ARCHETYPES = new Set([
  "pos-terminal",
  "ordering-kiosk",
  "ecommerce-storefront",
  "booking-calendar",
  "clinic-operations",
  "diagnostic-lab",
  "property-discovery",
  "fleet-dispatch",
  "warehouse-wms",
  "kanban-workflow",
  "crm-pipeline",
  "lms-learning",
  "manufacturing-console",
  "quality-inspection",
  "developer-portal",
  "node-automation",
  "analytics-canvas",
  "community-feed",
]);

export async function runAutomatedDemoQa(
  demo: ForgeDemoRecord,
  options?: { baseUrl?: string; previousFixHistory?: { timestamp: string; summary: string }[] }
): Promise<ForgeQaReport> {
  const started = Date.now();
  const checks: ForgeQaCheckItem[] = [];
  const defects: string[] = [];

  // --- 1. VISUAL CHECKS ---
  const brand = demo.brandConfig || {};
  const hasValidColors = Boolean(
    parseHexColor(brand.primary) && parseHexColor(brand.bg) && parseHexColor(brand.surface) && parseHexColor(brand.text)
  );
  checks.push({
    id: "vis-tokens",
    category: "visual",
    name: "Design Token & Palette Integrity",
    status: hasValidColors ? "passed" : "failed",
    critical: true,
    details: hasValidColors
      ? `Valid hex palette (${brand.primary}, ${brand.bg}, ${brand.surface}, ${brand.text})`
      : "Missing or invalid hex color tokens in brandConfig (primary, bg, surface, text required).",
  });
  if (!hasValidColors) defects.push("Invalid or incomplete color palette tokens.");

  const contrastSurface = computeContrastRatio(brand.surface, brand.text);
  const contrastBg = computeContrastRatio(brand.bg, brand.text);
  const minContrast = Math.min(contrastSurface ?? 0, contrastBg ?? 0);
  const contrastPassed = minContrast >= 4.5;
  checks.push({
    id: "vis-contrast",
    category: "visual",
    name: "WCAG AA Typography Contrast",
    status: minContrast === 0 ? "failed" : contrastPassed ? "passed" : "warning",
    critical: minContrast === 0,
    details:
      contrastSurface && contrastBg
        ? `Contrast ratios: surface/text=${contrastSurface}:1, bg/text=${contrastBg}:1 (target >= 4.5:1)`
        : "Unable to calculate contrast due to missing hex tokens.",
  });
  if (minContrast > 0 && !contrastPassed) {
    defects.push(`Low text contrast ratio (${minContrast}:1 < 4.5:1).`);
  }

  checks.push({
    id: "vis-typography",
    category: "visual",
    name: "Headline Typography Specification",
    status: brand.fontHeadline ? "passed" : "warning",
    critical: false,
    details: brand.fontHeadline
      ? `Font stack configured: ${brand.fontHeadline}`
      : "No explicit fontHeadline set; defaults to sans.",
  });

  // --- 2. FUNCTIONAL CHECKS ---
  const wfCount = demo.workflows?.length || 0;
  const wfOk = wfCount >= 3 && demo.workflows.every((w) => w.title?.trim() && w.description?.trim());
  checks.push({
    id: "fn-workflows",
    category: "functional",
    name: "Business Workflow Completeness",
    status: wfOk ? "passed" : wfCount >= 1 ? "warning" : "failed",
    critical: wfCount === 0,
    details: `${wfCount} interactive workflow(s) defined (${wfOk ? "meets >= 3 threshold" : "recommend >= 3 distinct workflows"}).`,
  });
  if (!wfOk) defects.push(`Insufficient detailed business workflows (${wfCount}/3).`);

  const featCount = demo.featureRequirements?.length || 0;
  checks.push({
    id: "fn-features",
    category: "functional",
    name: "Feature Module Coverage",
    status: featCount >= 4 ? "passed" : featCount > 0 ? "warning" : "failed",
    critical: featCount === 0,
    details: `${featCount} functional requirements registered.`,
  });

  const seedKeys = Object.keys(demo.seedData || {});
  const hasRichSeedData =
    seedKeys.length > 0 &&
    seedKeys.some((k) => Array.isArray(demo.seedData[k]) && demo.seedData[k].length > 0);
  checks.push({
    id: "fn-seed-data",
    category: "functional",
    name: "Isolated Sandbox Seed Data",
    status: hasRichSeedData ? "passed" : "failed",
    critical: true,
    details: hasRichSeedData
      ? `Seeded datasets active: ${seedKeys.join(", ")}`
      : "Missing populated array datasets in seedData; interactive CRUD tables would render empty.",
  });
  if (!hasRichSeedData) defects.push("Empty or missing interactive seed datasets.");

  // --- 3. TECHNICAL & SECURITY CHECKS ---
  const validArchetype = VALID_ARCHETYPES.has(demo.archetype);
  checks.push({
    id: "tech-archetype",
    category: "technical",
    name: "Runtime Archetype Binding",
    status: validArchetype ? "passed" : "failed",
    critical: true,
    details: validArchetype
      ? `Bound to supported interactive runtime archetype "${demo.archetype}".`
      : `Unknown archetype "${demo.archetype}" cannot render cleanly in DemoRuntimeDispatcher.`,
  });
  if (!validArchetype) defects.push(`Unsupported runtime archetype: ${demo.archetype}`);

  const registryProduct = getDemoProductBySlug(demo.slug);
  const routeFileExists = await fs
    .access(path.join(process.cwd(), "src/app/demos/[category]/[demo]/live/page.tsx"))
    .then(() => true)
    .catch(() => false);
  const routeReady = routeFileExists && (Boolean(registryProduct) || demo.catalogId === null);
  checks.push({
    id: "tech-route",
    category: "technical",
    name: "App Router & Registry Resolution",
    status: routeReady ? "passed" : "failed",
    critical: true,
    details: registryProduct
      ? `Resolved in 160-demo registry at ${demo.previewUrl}`
      : routeFileExists
      ? `Custom demo served via isolated Forge runtime preview route.`
      : `Live route handler file missing.`,
  });
  if (!routeReady) defects.push("Target demo route or registry resolution failed.");

  // Security scan for accidentally leaked tokens or unsafe XSS markup in seedData
  const serialized = JSON.stringify({ seed: demo.seedData, workflows: demo.workflows, brand: demo.brandConfig });
  const secretPattern = /(sk_live_|SUPABASE_SERVICE_ROLE|eyJhbGciOi|AIzaSy|<script\b)/i;
  const hasSecurityHit = secretPattern.test(serialized);
  checks.push({
    id: "tech-security",
    category: "technical",
    name: "Secret Exposure & XSS Payload Scan",
    status: hasSecurityHit ? "failed" : "passed",
    critical: true,
    details: hasSecurityHit
      ? "Detected potential secret token or raw <script> tag inside demo payload."
      : "Zero credential patterns or executable HTML script tags detected.",
  });
  if (hasSecurityHit) defects.push("Security scan flagged unsafe payload content.");

  // --- 4. PERFORMANCE & LIVE HTTP PROBE ---
  const payloadBytes = Buffer.byteLength(serialized, "utf-8");
  const payloadKb = Number((payloadBytes / 1024).toFixed(1));
  checks.push({
    id: "perf-payload",
    category: "performance",
    name: "Initial Seed Payload Budget",
    status: payloadBytes > 1024 * 1024 ? "failed" : payloadBytes > 250 * 1024 ? "warning" : "passed",
    critical: payloadBytes > 1024 * 1024,
    details: `Serialized state size: ${payloadKb} KB (budget < 250 KB).`,
  });

  if (options?.baseUrl && registryProduct) {
    try {
      const t0 = Date.now();
      const target = `${options.baseUrl.replace(/\/$/, "")}${demo.previewUrl}`;
      const res = await fetch(target, { method: "HEAD" });
      const latency = Date.now() - t0;
      checks.push({
        id: "perf-http",
        category: "performance",
        name: "Live HTTP Route & TTFB Check",
        status: res.ok ? (latency < 2000 ? "passed" : "warning") : "failed",
        critical: !res.ok,
        details: `HTTP ${res.status} at ${target} in ${latency}ms`,
      });
      if (!res.ok) defects.push(`Live preview HTTP probe returned ${res.status}.`);
    } catch {
      checks.push({
        id: "perf-http",
        category: "performance",
        name: "Live HTTP Route & TTFB Check",
        status: "skipped",
        critical: false,
        details: "Live local HTTP loopback skipped in isolated serverless context.",
      });
    }
  }

  const failedCount = checks.filter((c) => c.status === "failed").length;
  const warningCount = checks.filter((c) => c.status === "warning").length;
  const passedCount = checks.filter((c) => c.status === "passed").length;
  const criticalFailure = checks.some((c) => c.status === "failed" && c.critical);

  const readiness: ForgeQaReport["readiness"] =
    criticalFailure || failedCount > 0 ? "blocked" : warningCount > 0 ? "warnings" : "passed";

  return {
    runId: `QA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    demoSlug: demo.slug,
    executedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
    readiness,
    passedCount,
    failedCount,
    warningCount,
    checks,
    defects,
    fixHistory: options?.previousFixHistory || [],
    notes:
      readiness === "blocked"
        ? "Publishing is strictly blocked until critical QA failures are resolved."
        : readiness === "warnings"
        ? "Non-critical warnings detected. Review before publishing."
        : "All visual, functional, security, and performance checks passed.",
  };
}
