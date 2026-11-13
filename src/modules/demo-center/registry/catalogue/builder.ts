import type { DemoArchetype, DemoBrandConfig, DemoProductDefinition, DemoProductType } from "../../types";

export interface CanonicalCatalogSpec {
  id: number;
  name: string;
  slug?: string;
  productType: string;
  standardProductType?: DemoProductType;
  archetype?: DemoArchetype;
  shortDescription: string;
  fullDescription: string;
  suitableFor: string;
  features: string[];
  searchKeywords: string[];
  workflows: [string, string, string];
  techStack?: string[];
  indicativePrice?: string;
  indicativePriceUsd?: string;
  estimatedTime?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
}

export interface CategoryBuildMeta {
  categoryNumber: number;
  categoryName: string;
  categorySlug: string;
  defaultArchetype: DemoArchetype;
  defaultTechStack: string[];
  brand: DemoBrandConfig;
}

export function toCanonicalSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildCategoryCatalogue(
  meta: CategoryBuildMeta,
  specs: CanonicalCatalogSpec[]
): DemoProductDefinition[] {
  return specs.map((spec) => {
    const slug = spec.slug || toCanonicalSlug(spec.name);
    const publicRoute = `/demos/${meta.categorySlug}/${slug}`;
    const previewRoute = `/admin/forge/preview/${slug}`;
    const thumbnail = `/images/demos/${meta.categorySlug}/${slug}-thumb.webp`;

    return {
      id: spec.id,
      slug,
      name: spec.name,
      categoryNumber: meta.categoryNumber,
      categoryName: meta.categoryName,
      categorySlug: meta.categorySlug,
      archetype: spec.archetype || meta.defaultArchetype,
      productType: spec.productType,
      standardProductType: spec.standardProductType,
      tagline: spec.shortDescription,
      shortDescription: spec.shortDescription,
      fullDescription: spec.fullDescription,
      suitableFor: spec.suitableFor,
      searchKeywords: spec.searchKeywords,
      thumbnail,
      seoTitle: `${spec.name} | ${meta.categoryName} Software — StarX Alpha Labs`,
      seoDescription: spec.shortDescription,
      generationStatus: "draft",
      qaStatus: "not_run",
      publishingStatus: "unpublished",
      previewRoute,
      publicRoute,
      brand: meta.brand,
      workflows: spec.workflows.map((title, idx) => ({
        id: `wf${idx + 1}`,
        title,
        description: `Planned operational workflow for ${spec.name}: ${title.toLowerCase()}.`,
      })),
      features: spec.features,
      techStack: spec.techStack || meta.defaultTechStack,
      indicativePrice: spec.indicativePrice || "₹95,000",
      indicativePriceUsd: spec.indicativePriceUsd || "$1,150",
      estimatedTime: spec.estimatedTime || "3-4 weeks",
      isFeatured: spec.isFeatured ?? spec.id % 12 === 1,
      isPopular: spec.isPopular ?? spec.id % 5 === 1,
      initialData: {},
    };
  });
}
