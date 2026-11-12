import "server-only";

import { getForgeDemoById, listForgeDemos } from "./store";
import type { ForgeDemoRecord } from "./types";
import type { DemoArchetype, DemoProductDefinition } from "@/modules/demo-center/types";
import { DEMO_CATEGORIES, toDemoModel } from "@/modules/demo-center/registry";
import type { DemoModel } from "@/types/demo";

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
    tagline: demo.designDirection || demo.industry,
    shortDescription: demo.description,
    fullDescription: demo.description,
    suitableFor: demo.targetAudience,
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
    indicativePrice: "₹24,999",
    indicativePriceUsd: "$299",
    estimatedTime: "7–14 Days",
    initialData: demo.seedData,
  };
}

/**
 * Resolves a custom Forge demo for public routes ONLY when it has been
 * explicitly published through the approval & QA workflow.
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
 * Lists published custom Forge demos (non-catalog entries) as DemoModels
 * so public showcase hubs display newly published Forge pilots cleanly.
 */
export async function listPublishedCustomForgeDemoModels(categorySlug?: string): Promise<DemoModel[]> {
  try {
    const demos = await listForgeDemos();
    return demos
      .filter(
        (d) =>
          d.catalogId === null &&
          d.publishingStatus === "published" &&
          (!categorySlug || d.categorySlug === categorySlug)
      )
      .map((d, index) => toDemoModel(forgeDemoToProductDefinition(d, 9000 + index)));
  } catch (err) {
    console.warn("[Forge] Failed to load published custom demos for showcase:", err);
    return [];
  }
}
