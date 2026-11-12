// STARX ALPHA LABS — CENTRAL DEMO CATALOGUE (CANONICAL 160 DEMOS)
// Phase 3A authoritative business software catalogue across 12 industry sectors.

import {
  ALL_DEMOS_COMPAT,
  getDemoProductBySlug,
  getDemoProductById,
  toDemoModel,
} from "@/modules/demo-center/registry";
import { DemoModel } from "@/types/demo";

export const ALL_DEMOS: DemoModel[] = ALL_DEMOS_COMPAT;

/**
 * Exact canonical slug lookup. Removed legacy placeholder slugs intentionally
 * resolve to undefined (HTTP 404) instead of fuzzy-matching unrelated demos.
 */
export function getDemoBySlug(slug: string): DemoModel | undefined {
  const exact = getDemoProductBySlug(slug);
  if (exact) return toDemoModel(exact);

  const lower = slug.trim().toLowerCase();
  return ALL_DEMOS_COMPAT.find((d) => d.slug === lower);
}

export function getDemoById(id: number): DemoModel | undefined {
  const prod = getDemoProductById(id);
  return prod ? toDemoModel(prod) : undefined;
}

export function getDemosByCategory(categorySlug: string): DemoModel[] {
  return ALL_DEMOS_COMPAT.filter((d) => d.categorySlug === categorySlug);
}

export function getFeaturedDemos(): DemoModel[] {
  return ALL_DEMOS_COMPAT.filter((d) => d.isFeatured);
}

export function getPopularDemos(): DemoModel[] {
  return ALL_DEMOS_COMPAT.filter((d) => d.isPopular);
}

export function getRelatedDemos(currentDemo: DemoModel, limit: number = 4): DemoModel[] {
  const sameCategory = ALL_DEMOS_COMPAT.filter(
    (d) => d.categorySlug === currentDemo.categorySlug && d.id !== currentDemo.id
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = ALL_DEMOS_COMPAT.filter(
    (d) => d.categorySlug !== currentDemo.categorySlug && d.id !== currentDemo.id
  );
  return [...sameCategory, ...others].slice(0, limit);
}
