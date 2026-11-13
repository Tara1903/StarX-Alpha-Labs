import { DemoProductDefinition } from "../types";
import { DemoModel } from "@/types/demo";
import { DEMO_CATEGORIES } from "./categories";
import { validateMasterCatalogue } from "./validate";
import { CAT01_FOOD_HOSPITALITY } from "./catalogue/cat01_food_hospitality";
import { CAT02_RETAIL_ECOMMERCE } from "./catalogue/cat02_retail_ecommerce";
import { CAT03_HEALTHCARE } from "./catalogue/cat03_healthcare";
import { CAT04_REAL_ESTATE } from "./catalogue/cat04_real_estate";
import { CAT05_EDUCATION } from "./catalogue/cat05_education";
import { CAT06_AUTOMOTIVE } from "./catalogue/cat06_automotive";
import { CAT07_BEAUTY_WELLNESS } from "./catalogue/cat07_beauty_wellness";
import { CAT08_LOGISTICS_TRANSPORT } from "./catalogue/cat08_logistics_transport";
import { CAT09_PROFESSIONAL_SERVICES } from "./catalogue/cat09_professional_services";
import { CAT10_MANUFACTURING } from "./catalogue/cat10_manufacturing";
import { CAT11_TRAVEL_EVENTS } from "./catalogue/cat11_travel_events";
import { CAT12_TECHNOLOGY_SAAS } from "./catalogue/cat12_technology_saas";

export { DEMO_CATEGORIES, validateMasterCatalogue };
export type DemoItem = DemoProductDefinition;

// MASTER DIGITAL PRODUCTS CATALOGUE (EXPANDED PORTFOLIO)
export const ALL_MASTER_DEMOS: DemoProductDefinition[] = [
  ...CAT01_FOOD_HOSPITALITY,
  ...CAT02_RETAIL_ECOMMERCE,
  ...CAT03_HEALTHCARE,
  ...CAT04_REAL_ESTATE,
  ...CAT05_EDUCATION,
  ...CAT06_AUTOMOTIVE,
  ...CAT07_BEAUTY_WELLNESS,
  ...CAT08_LOGISTICS_TRANSPORT,
  ...CAT09_PROFESSIONAL_SERVICES,
  ...CAT10_MANUFACTURING,
  ...CAT11_TRAVEL_EVENTS,
  ...CAT12_TECHNOLOGY_SAAS,
];

// Preserved backward-compatible alias for existing callers
export const ALL_160_DEMOS: DemoProductDefinition[] = ALL_MASTER_DEMOS;

const catalogueValidation = validateMasterCatalogue(ALL_MASTER_DEMOS, DEMO_CATEGORIES);
if (!catalogueValidation.valid) {
  throw new Error(
    `[DemoCenter Registry] Invalid canonical catalogue: ${catalogueValidation.errors.join(" | ")}`
  );
}

/**
 * Converts a DemoProductDefinition into the showcase DemoModel contract.
 * Unpublished catalogue items are explicitly marked "Under Development" so
 * unbuilt entries never masquerade as active live demos.
 */
export function toDemoModel(prod: DemoProductDefinition, isPublishedOverride = false): DemoModel {
  const isPublished = isPublishedOverride || prod.publishingStatus === "published";
  const keywords =
    prod.searchKeywords && prod.searchKeywords.length > 0
      ? prod.searchKeywords
      : [prod.name.toLowerCase(), prod.categoryName.toLowerCase(), prod.productType || prod.archetype];

  return {
    id: prod.id,
    name: prod.name,
    slug: prod.slug,
    categoryNumber: prod.categoryNumber,
    categoryName: prod.categoryName,
    categorySlug: prod.categorySlug,
    shortDescription: prod.shortDescription,
    fullDescription: prod.fullDescription,
    suitableFor: prod.suitableFor,
    mainFeatures: prod.features,
    modules: prod.workflows.map((wf) => ({
      name: wf.title,
      description: wf.description,
      roles: ["admin", "staff", "customer"],
      keyFeatures: [wf.title, wf.description],
    })),
    techStack: prod.techStack,
    developmentType:
      prod.archetype === "crm-pipeline" || prod.archetype === "manufacturing-console"
        ? "Cloud ERP"
        : prod.categorySlug === "technology-saas"
        ? "SaaS Platform"
        : "Web App",
    platform: "Web App",
    estimatedDevelopmentTime: prod.estimatedTime,
    indicativeStartingPrice: prod.indicativePrice,
    indicativePriceUsd: prod.indicativePriceUsd,
    availabilityStatus: isPublished ? "Live Demo" : "Under Development",
    isAiEnabled:
      prod.categorySlug === "technology-saas" ||
      prod.slug.includes("ai") ||
      prod.features.some((f) => f.toLowerCase().includes("ai")),
    isEcommerce:
      prod.categorySlug.includes("retail") ||
      prod.archetype === "ecommerce-storefront" ||
      prod.archetype === "ordering-kiosk",
    isErpCrm:
      prod.archetype === "crm-pipeline" ||
      prod.archetype === "manufacturing-console" ||
      prod.archetype === "warehouse-wms",
    isFreeDemoAvailable: isPublished,
    isFeatured: prod.isFeatured,
    isPopular: prod.isPopular,
    viewsCount: 0,
    rating: 0,
    offlineReady: isPublished,
    sampleRoles: [
      {
        role: "admin",
        label: "Administrator",
        email: `admin@${prod.slug}.demo`,
        passwordHint: "Available upon Forge build publication",
        permissions: ["Full Module Control", "Configuration & Settings", "Analytics & Exports"],
      },
      {
        role: "staff",
        label: "Staff / Operator",
        email: `operator@${prod.slug}.demo`,
        passwordHint: "Available upon Forge build publication",
        permissions: ["Daily Workflow Execution", "Queue & Task Updates"],
      },
      {
        role: "customer",
        label: "Customer / Client",
        email: `client@${prod.slug}.demo`,
        passwordHint: "Available upon Forge build publication",
        permissions: ["Self-Service Bookings & Orders", "Invoice & Status History"],
      },
    ],
    screenshots: [
      `/images/demos/${prod.categorySlug}/${prod.slug}-1.webp`,
      `/images/demos/${prod.categorySlug}/${prod.slug}-2.webp`,
    ],
    videoThumbnail: prod.thumbnail || `/images/demos/${prod.categorySlug}/${prod.slug}-thumb.webp`,
    videoDuration: "Planned Walkthrough",
    productType: prod.productType || "Web Application",
    standardProductType: prod.standardProductType,
    searchKeywords: keywords,
    thumbnail: prod.thumbnail || `/images/demos/${prod.categorySlug}/${prod.slug}-thumb.webp`,
    generationStatus: prod.generationStatus || "draft",
    qaStatus: prod.qaStatus || "not_run",
    publishingStatus: isPublished ? "published" : prod.publishingStatus || "unpublished",
    previewRoute: prod.previewRoute || `/admin/forge/preview/${prod.slug}`,
    publicRoute: prod.publicRoute || `/demos/${prod.categorySlug}/${prod.slug}`,
    seo: {
      title: prod.seoTitle || `${prod.name} | ${prod.categoryName} Software — StarX Alpha Labs`,
      description: prod.seoDescription || prod.shortDescription,
      keywords,
    },
  };
}

export const ALL_DEMOS_COMPAT: DemoModel[] = ALL_160_DEMOS.map((p) => toDemoModel(p, false));

export function getDemoProductBySlug(slug: string): DemoProductDefinition | undefined {
  return ALL_160_DEMOS.find((d) => d.slug === slug);
}

export function getDemoProductById(id: number): DemoProductDefinition | undefined {
  return ALL_160_DEMOS.find((d) => d.id === id);
}

export function getDemoProductsByCategory(categorySlug: string): DemoProductDefinition[] {
  return ALL_160_DEMOS.filter((d) => d.categorySlug === categorySlug);
}

export function getFeaturedDemoProducts(): DemoProductDefinition[] {
  return ALL_160_DEMOS.filter((d) => d.isFeatured);
}

export function getPopularDemoProducts(): DemoProductDefinition[] {
  return ALL_160_DEMOS.filter((d) => d.isPopular);
}

export function getAllDemoStaticParams(): { category: string; demo: string }[] {
  return ALL_160_DEMOS.map((d) => ({
    category: d.categorySlug,
    demo: d.slug,
  }));
}
