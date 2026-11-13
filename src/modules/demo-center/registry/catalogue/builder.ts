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

export function deriveStandardProductType(
  spec: CanonicalCatalogSpec,
  meta: CategoryBuildMeta
): DemoProductType {
  if (spec.standardProductType) return spec.standardProductType;
  const pt = (spec.productType || "").toLowerCase();
  const at = (spec.archetype || meta.defaultArchetype || "").toLowerCase();
  const nm = (spec.name || "").toLowerCase();

  if (pt.includes("marketplace") || nm.includes("marketplace") || pt.includes("exchange")) {
    return "marketplace";
  }
  if (pt.includes("ecommerce") || pt.includes("storefront") || pt.includes("boutique") || at === "ecommerce-storefront") {
    return "ecommerce_website";
  }
  if (pt.includes("subscription") || at === "subscription-hub") {
    return "subscription_platform";
  }
  if (pt.includes("membership") || nm.includes("membership")) {
    return "membership_platform";
  }
  if (pt.includes("ios") || nm.includes("ios")) {
    return "native_ios_app";
  }
  if (pt.includes("android") || nm.includes("android")) {
    return "native_android_app";
  }
  if (pt.includes("mobile app") || at === "mobile-app-showcase") {
    return "native_android_app";
  }
  if (pt.includes("configurator") || pt.includes("3d") || pt.includes("ar") || at === "product-configurator" || at === "interactive-3d-experience") {
    return "interactive_experience";
  }
  if (pt.includes("creator") || at === "creator-showcase") {
    return "creator_platform";
  }
  if (pt.includes("corporate") || pt.includes("brand storytelling") || at === "brand-storytelling") {
    return "brand_experience";
  }
  if (pt.includes("website") || nm.includes("website")) {
    return "business_website";
  }
  if (pt.includes("ecosystem") || at === "ecosystem-suite") {
    return "digital_ecosystem";
  }
  if (pt.includes("finance") || nm.includes("finance") || pt.includes("budgeting") || pt.includes("investment")) {
    return "fintech_application";
  }
  return "web_application";
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
      standardProductType: spec.standardProductType || deriveStandardProductType(spec, meta),
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
