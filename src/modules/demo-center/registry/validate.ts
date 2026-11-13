import type { DemoCategoryDefinition, DemoProductDefinition } from "../types";

export const EXPECTED_CATEGORY_COUNTS: Record<string, number> = {
  "food-hospitality": 14,
  "retail-ecommerce": 14,
  healthcare: 14,
  "real-estate": 14,
  education: 13,
  automotive: 13,
  "beauty-wellness": 13,
  "logistics-transport": 13,
  "professional-services": 13,
  manufacturing: 13,
  "travel-events": 13,
  "technology-saas": 13,
};

export interface CatalogueValidationResult {
  valid: boolean;
  totalDemos: number;
  totalCategories: number;
  categoryCounts: Record<string, number>;
  errors: string[];
}

export function validateMasterCatalogue(
  demos: DemoProductDefinition[],
  categories: DemoCategoryDefinition[]
): CatalogueValidationResult {
  const errors: string[] = [];

  if (categories.length < 12 || categories.length > 13) {
    errors.push(`Expected 12 to 13 categories, found ${categories.length}.`);
  }

  if (demos.length !== 160) {
    errors.push(`Expected 160 catalogue demos, found ${demos.length}.`);
  }

  const categoryMap = new Map<string, DemoCategoryDefinition>();
  for (const cat of categories) {
    if (categoryMap.has(cat.slug)) {
      errors.push(`Duplicate category slug detected: ${cat.slug}`);
    }
    categoryMap.set(cat.slug, cat);
  }

  const seenIds = new Set<number>();
  const seenSlugs = new Set<string>();
  const actualCounts: Record<string, number> = {};

  for (const cat of categories) {
    actualCounts[cat.slug] = 0;
  }

  for (const demo of demos) {
    if (!Number.isInteger(demo.id) || demo.id < 1 || demo.id > 160) {
      errors.push(`Invalid demo ID ${demo.id} for "${demo.name}". Expected 1..160.`);
    } else if (seenIds.has(demo.id)) {
      errors.push(`Duplicate demo ID detected: ${demo.id}`);
    }
    seenIds.add(demo.id);

    if (!demo.slug || !/^[a-z0-9-]+$/.test(demo.slug)) {
      errors.push(`Invalid slug "${demo.slug}" on demo #${demo.id}.`);
    } else if (seenSlugs.has(demo.slug)) {
      errors.push(`Duplicate demo slug detected: ${demo.slug}`);
    }
    seenSlugs.add(demo.slug);

    if (demo.slug === "restaurant-management-pilot") {
      errors.push("Internal pilot 'restaurant-management-pilot' must not appear inside the 160-demo public catalogue.");
    }

    if (!categoryMap.has(demo.categorySlug)) {
      errors.push(`Demo #${demo.id} (${demo.name}) references unknown category "${demo.categorySlug}".`);
    } else {
      actualCounts[demo.categorySlug] = (actualCounts[demo.categorySlug] || 0) + 1;
    }

    if (!demo.shortDescription?.trim() || !demo.suitableFor?.trim() || !demo.productType?.trim()) {
      errors.push(`Demo #${demo.id} (${demo.name}) is missing description, target audience, or product type.`);
    }
    if (!demo.features?.length || !demo.searchKeywords?.length) {
      errors.push(`Demo #${demo.id} (${demo.name}) is missing key features or search keywords.`);
    }
    if (!demo.seoTitle?.trim() || !demo.seoDescription?.trim() || !demo.thumbnail?.trim()) {
      errors.push(`Demo #${demo.id} (${demo.name}) is missing SEO metadata or thumbnail reference.`);
    }
    if (!demo.previewRoute?.trim() || !demo.publicRoute?.trim()) {
      errors.push(`Demo #${demo.id} (${demo.name}) is missing previewRoute or publicRoute.`);
    }
  }

  for (const [slug, expected] of Object.entries(EXPECTED_CATEGORY_COUNTS)) {
    const actual = actualCounts[slug] ?? 0;
    if (actual !== expected) {
      errors.push(`Category "${slug}" count mismatch: expected ${expected}, found ${actual}.`);
    }
    const cat = categoryMap.get(slug);
    if (cat && cat.count !== expected) {
      errors.push(`Category "${slug}" metadata.count (${cat.count}) does not equal ${expected}.`);
    }
  }

  return {
    valid: errors.length === 0,
    totalDemos: demos.length,
    totalCategories: categories.length,
    categoryCounts: actualCounts,
    errors,
  };
}
