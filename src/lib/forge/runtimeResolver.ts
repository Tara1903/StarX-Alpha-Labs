import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { getPublishedCatalogSlugsFast, getPublishedForgeDemoFast } from "./store";
import type { ForgeDemoRecord } from "./types";
import type { DemoArchetype, DemoProductDefinition } from "@/modules/demo-center/types";
import { DEMO_CATEGORIES } from "@/modules/demo-center/registry";
import { getDemoBySlug } from "@/data/demos";
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

const getCachedPublishedForgeDemo = unstable_cache(
  async (categorySlug: string, slug: string) => getPublishedForgeDemoFast(categorySlug, slug),
  ["forge-published-demo-by-slug"],
  { revalidate: 60, tags: ["forge-published"] }
);

/**
 * Resolves a Forge demo for public /live routes ONLY when it has been
 * explicitly published through the QA-gated approval workflow.
 */
export const resolvePublishedForgeProduct = cache(
  async (categorySlug: string, slug: string): Promise<DemoProductDefinition | null> => {
    const demo = await getCachedPublishedForgeDemo(categorySlug, slug);
    if (!demo) return null;
    if (demo.publishingStatus !== "published") return null;
    if (demo.categorySlug !== categorySlug) return null;
    return forgeDemoToProductDefinition(demo);
  }
);

const getCachedPublishedCatalogSlugs = unstable_cache(
  async () => getPublishedCatalogSlugsFast(),
  ["forge-published-catalog-slugs"],
  { revalidate: 60, tags: ["forge-published"] }
);

/**
 * Returns the set of canonical catalogue slugs (catalogId !== null) that have
 * completed StarX Forge generation, passed QA, and reached "published" state.
 * Internal custom pilots (catalogId === null) are excluded from the 160-demo catalogue.
 */
export const getPublishedCatalogSlugSet = cache(async (): Promise<Set<string>> => {
  try {
    const slugs = await getCachedPublishedCatalogSlugs();
    return new Set(slugs);
  } catch (err) {
    console.warn("[Forge] Failed to read published catalog states:", err);
    return new Set();
  }
});

/**
 * Converts a canonical DemoModel from the 240-catalogue into a DemoProductDefinition
 * suitable for the DemoRuntimeDispatcher.
 */
export function canonicalDemoToProductDefinition(demo: DemoModel): DemoProductDefinition {
  const d = demo as any;
  return {
    id: demo.id,
    slug: demo.slug,
    name: demo.name,
    categoryNumber: demo.categoryNumber,
    categoryName: demo.categoryName,
    categorySlug: demo.categorySlug,
    archetype: (d.archetype || "analytics-canvas") as DemoArchetype,
    productType: demo.productType,
    tagline: demo.shortDescription || demo.categoryName,
    shortDescription: demo.shortDescription,
    fullDescription: demo.fullDescription,
    suitableFor: demo.suitableFor,
    generationStatus: (demo.generationStatus as any) || "draft",
    qaStatus: (demo.qaStatus as any) || "not_run",
    publishingStatus: (demo.publishingStatus as any) || "unpublished",
    previewRoute: `/admin/forge/preview/${demo.slug}`,
    publicRoute: `/demos/${demo.categorySlug}/${demo.slug}`,
    brand: {
      primary: "#087BFF",
      secondary: "#0A1940",
      accent: "#00D9FF",
      bg: "#030B24",
      surface: "#0A1940",
      border: "rgba(0,217,255,0.22)",
      text: "#F8FAFC",
      mutedText: "#94A3B8",
      fontHeadline: "sans",
    },
    workflows: (d.workflowSteps || d.modules || []).map((w: any, idx: number) => ({
      id: `wf-${idx + 1}`,
      title: typeof w === "string" ? w : w?.title || w?.name || `Workflow ${idx + 1}`,
      description: typeof w === "string" ? w : w?.description || "",
    })),
    features: demo.mainFeatures || [],
    techStack: demo.techStack || ["Next.js 16", "React 19", "Tailwind CSS v4"],
    indicativePrice: demo.indicativeStartingPrice || "₹95,000",
    indicativePriceUsd: demo.indicativePriceUsd || "$1,150",
    estimatedTime: demo.estimatedDevelopmentTime || "3-4 weeks",
    initialData: {},
  };
}

/**
 * Resolves a product for /live interactive sandbox routes.
 * 1. Checks published forge database records first.
 * 2. If unpublished or draft, falls back to canonical catalogue definition to allow
 *    the DemoRuntimeDispatcher to render bespoke implementations or honest pending views,
 *    without mutating the administrative publishing_status.
 */
export const resolveLiveDemoProduct = cache(
  async (categorySlug: string, slug: string): Promise<DemoProductDefinition | null> => {
    // 1. Published forge record from DB
    const published = await resolvePublishedForgeProduct(categorySlug, slug);
    if (published) return published;

    // 2. Canonical catalog definition
    const canonical = getDemoBySlug(slug);
    if (canonical && canonical.categorySlug === categorySlug) {
      return canonicalDemoToProductDefinition(canonical);
    }

    // 3. Protected Pilot fallback (Maison Ember)
    if (slug === "restaurant-management-pilot" && categorySlug === "food-hospitality") {
      return {
        id: 9999,
        slug: "restaurant-management-pilot",
        name: "Maison Ember Pilot",
        categoryNumber: 1,
        categoryName: "Food & Hospitality",
        categorySlug: "food-hospitality",
        archetype: "analytics-canvas",
        productType: "Pilot Reference Application",
        tagline: "Fine Dining Management System",
        shortDescription: "Restaurant management reference pilot.",
        fullDescription: "Reference implementation for fine dining operations.",
        suitableFor: "Fine Dining Restaurants",
        generationStatus: "published",
        qaStatus: "passed",
        publishingStatus: "published",
        previewRoute: "/admin/forge/preview/restaurant-management-pilot",
        publicRoute: "/demos/food-hospitality/restaurant-management-pilot",
        brand: {
          primary: "#C49A45",
          secondary: "#1A1510",
          accent: "#E2BD68",
          bg: "#0D0A08",
          surface: "#1A1510",
          border: "rgba(196,154,69,0.25)",
          text: "#FAF5EE",
          mutedText: "#A89F91",
          fontHeadline: "serif",
        },
        workflows: [],
        features: [],
        techStack: ["Next.js 16", "React 19"],
        indicativePrice: "₹1,50,000",
        indicativePriceUsd: "$1,800",
        estimatedTime: "4 weeks",
        initialData: {},
      };
    }

    return null;
  }
);
