import "server-only";

import { getForgeDemoById, listForgeDemos } from "./store";
import type { ForgeDemoRecord } from "./types";
import type { DemoArchetype, DemoProductDefinition } from "@/modules/demo-center/types";
import { DEMO_CATEGORIES } from "@/modules/demo-center/registry";

/**
 * Converts a Forge demo record into a DemoProductDefinition compatible
 * with DemoRuntimeDispatcher and public showcase metadata.
 */
export function forgeDemoToProductDefinition(
  demo: ForgeDemoRecord,
  fallbackId = 9000
): DemoProductDefinition {
  const category = DEMO_CATEGORIES.find((c) => c.slug === demo.categorySlug);
  return {
    id: demo.catalogId || fallbackId,
    slug: demo.slug,
    name: demo.businessName,
    categoryNumber: category?.number || 1,
    categoryName: category?.name || demo.industry,
    categorySlug: demo.categorySlug,
    archetype: (demo.archetype || "analytics-canvas") as DemoArchetype,
    productType: demo.catalogId ? "Enterprise Web App" : "Pilot Reference Application",
    tagline: demo.designDirection || demo.industry,
    shortDescription: demo.description,
    fullDescription: demo.description,
    suitableFor: demo.targetAudience,
    generationStatus: demo.generationStatus,
    qaStatus: demo.qaStatus,
    publishingStatus: demo.publishingStatus,
    previewRoute: `/admin/forge/preview/${demo.slug}`,
    publicRoute: `/demos/${demo.categorySlug}/${demo.slug}`,
    brand: {
      primary: demo.brandConfig?.primary || "#087BFF",
      secondary: demo.brandConfig?.secondary || "#0A1940",
      accent: demo.brandConfig?.accent || "#00D9FF",
      bg: demo.brandConfig?.bg || "#030B24",
      surface: demo.brandConfig?.surface || "#0A1940",
      border: demo.brandConfig?.border || "rgba(0,217,255,0.22)",
      text: demo.brandConfig?.text || "#F8FAFC",
      mutedText: demo.brandConfig?.mutedText || "#94A3B8",
      fontHeadline: (demo.brandConfig?.fontHeadline as "sans" | "serif" | "mono") || "sans",
    },
    workflows: demo.workflows,
    features: demo.featureRequirements,
    techStack: ["Next.js 16", "React 19", "Supabase Sandbox", "Tailwind CSS v4"],
    indicativePrice: "₹95,000",
    indicativePriceUsd: "$1,150",
    estimatedTime: "3-4 weeks",
    initialData: demo.seedData,
  };
}

/**
 * Resolves a Forge demo for public /live routes ONLY when it has been
 * explicitly published through the QA-gated approval workflow.
 */
export async function resolvePublishedForgeProduct(
  categorySlug: string,
  slug: string
): Promise<DemoProductDefinition | null> {
  const demo = await getForgeDemoById(slug);
  if (!demo) return null;
  if (demo.publishingStatus !== "published") return null;
  if (demo.categorySlug !== categorySlug) return null;
  return forgeDemoToProductDefinition(demo);
}

/**
 * Returns the set of canonical catalogue slugs (catalogId !== null) that have
 * completed StarX Forge generation, passed QA, and reached "published" state.
 * Internal custom pilots (catalogId === null) are excluded from the 160-demo catalogue.
 */
export async function getPublishedCatalogSlugSet(): Promise<Set<string>> {
  try {
    const demos = await listForgeDemos();
    return new Set(
      demos
        .filter((d) => d.catalogId !== null && d.publishingStatus === "published")
        .map((d) => d.slug)
    );
  } catch (err) {
    console.warn("[Forge] Failed to read published catalog states:", err);
    return new Set();
  }
}
