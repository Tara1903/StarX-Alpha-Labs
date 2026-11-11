// STARX ALPHA LABS — CENTRAL DEMO CATALOGUE (AUTHORITATIVE 160 DEMOS)
// Replaced generic placeholder strings with the 160 production-grade business demo engine models.

import {
  ALL_160_DEMOS,
  ALL_DEMOS_COMPAT,
  getDemoProductBySlug,
  getDemoProductById,
  toDemoModel,
} from "@/modules/demo-center/registry";
import { DemoModel } from "@/types/demo";

export const ALL_DEMOS: DemoModel[] = ALL_DEMOS_COMPAT;

export function getDemoBySlug(slug: string): DemoModel | undefined {
  const prod = getDemoProductBySlug(slug);
  if (prod) return toDemoModel(prod);

  // Normalization & fallback matching for hyphen variants
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  return ALL_DEMOS_COMPAT.find(
    (d) =>
      d.slug === slug ||
      d.slug.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized ||
      d.slug.includes(slug) ||
      slug.includes(d.slug)
  );
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

