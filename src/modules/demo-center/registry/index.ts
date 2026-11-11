import { DemoProductDefinition } from "../types";
import { DemoModel } from "@/types/demo";
import { DEMO_CATEGORIES } from "./categories";
import { CAT01_FOOD_DEMOS } from "./cat01_food";
import { CAT02_RETAIL_DEMOS } from "./cat02_retail";
import { CAT03_HEALTHCARE_DEMOS } from "./cat03_healthcare";
import { CAT04_REALESTATE_DEMOS } from "./cat04_realestate";
import { CAT05_EDUCATION_DEMOS } from "./cat05_education";
import { CAT06_AUTOMOTIVE_DEMOS } from "./cat06_automotive";
import { CAT07_BEAUTY_DEMOS } from "./cat07_beauty";
import { CAT08_LOGISTICS_DEMOS } from "./cat08_logistics";
import { CAT09_SERVICES_DEMOS } from "./cat09_services";
import { CAT10_MANUFACTURING_DEMOS } from "./cat10_manufacturing";
import { CAT11_TRAVEL_DEMOS } from "./cat11_travel";
import { CAT12_SAAS_DEMOS } from "./cat12_saas";

export { DEMO_CATEGORIES };

// MASTER 160 PRODUCTION-QUALITY DEMO PRODUCTS
export const ALL_160_DEMOS: DemoProductDefinition[] = [
  ...CAT01_FOOD_DEMOS,
  ...CAT02_RETAIL_DEMOS,
  ...CAT03_HEALTHCARE_DEMOS,
  ...CAT04_REALESTATE_DEMOS,
  ...CAT05_EDUCATION_DEMOS,
  ...CAT06_AUTOMOTIVE_DEMOS,
  ...CAT07_BEAUTY_DEMOS,
  ...CAT08_LOGISTICS_DEMOS,
  ...CAT09_SERVICES_DEMOS,
  ...CAT10_MANUFACTURING_DEMOS,
  ...CAT11_TRAVEL_DEMOS,
  ...CAT12_SAAS_DEMOS,
];

// Verify exact 160 count
if (ALL_160_DEMOS.length !== 160) {
  console.warn(`[DemoCenter Registry] Expected 160 demos, found ${ALL_160_DEMOS.length}`);
}

// Convert DemoProductDefinition to backward-compatible DemoModel
export function toDemoModel(prod: DemoProductDefinition): DemoModel {
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
    developmentType: "Web App",
    platform: "Web App",
    estimatedDevelopmentTime: prod.estimatedTime,
    indicativeStartingPrice: prod.indicativePrice,
    indicativePriceUsd: prod.indicativePriceUsd,
    availabilityStatus: "Live Demo",
    isAiEnabled: prod.features.some((f) => f.toLowerCase().includes("ai")),
    isEcommerce: prod.categorySlug.includes("retail") || prod.archetype === "ecommerce-storefront" || prod.archetype === "ordering-kiosk",
    isErpCrm: prod.archetype === "crm-pipeline" || prod.archetype === "manufacturing-console" || prod.archetype === "warehouse-wms",
    isFreeDemoAvailable: true,
    isFeatured: prod.isFeatured ?? false,
    isPopular: prod.isPopular ?? false,
    viewsCount: 1200 + (prod.id * 37) % 800,
    rating: 4.8 + ((prod.id % 3) * 0.1),
    offlineReady: true,
    sampleRoles: [
      {
        role: "admin",
        label: "Operations Lead",
        email: `lead@${prod.slug.slice(0, 12)}.demo`,
        passwordHint: "Instant Demo Access (No Auth Required)",
        permissions: ["full_access", "dispatch", "reports"],
      },
      {
        role: "customer",
        label: "Client / Visitor",
        email: `guest@${prod.slug.slice(0, 12)}.demo`,
        passwordHint: "Guest Experience",
        permissions: ["view", "order", "book"],
      },
    ],
    screenshots: [
      `/images/demos/${prod.categorySlug}/${prod.slug}-1.webp`,
      `/images/demos/${prod.categorySlug}/${prod.slug}-2.webp`,
    ],
    videoThumbnail: `/images/demos/${prod.categorySlug}/${prod.slug}-thumb.webp`,
    videoDuration: "2m 45s",
    seo: {
      title: `${prod.name} | Interactive Live Demo | StarX Alpha Labs`,
      description: prod.shortDescription,
      keywords: [
        prod.name,
        prod.categoryName,
        prod.archetype,
        "live demo",
        "custom software",
        "StarX Alpha Labs",
      ],
    },
  };
}

// Map of all 160 converted to DemoModel
export const ALL_DEMOS_COMPAT: DemoModel[] = ALL_160_DEMOS.map(toDemoModel);

// Lookup helpers
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

export function getAllDemoSlugs(): { category: string; demo: string }[] {
  return ALL_160_DEMOS.map((d) => ({
    category: d.categorySlug,
    demo: d.slug,
  }));
}
