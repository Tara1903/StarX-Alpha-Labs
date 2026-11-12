import { Metadata } from "next";
import { DemosClient } from "./DemosClient";
import { SITE_CONFIG } from "@/lib/constants";
import { getPublishedCatalogSlugSet } from "@/lib/forge/runtimeResolver";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "160 Enterprise Demo Models — StarX Alpha Labs",
  description:
    "Explore the canonical catalogue of 160 enterprise software solutions across 12 industries: Food & Hospitality, Retail & Ecommerce, Healthcare, Real Estate, Education, Automotive, Beauty & Wellness, Logistics, Professional Services, Manufacturing, Travel & Events, and Technology & SaaS.",
  keywords: [
    "enterprise software catalogue",
    "160 demo models",
    "restaurant management system",
    "ecommerce storefront",
    "hospital management system",
    "manufacturing erp",
    "saas subscription management",
    "starx alpha labs",
  ],
  openGraph: {
    title: "160 Enterprise Demo Models Catalogue — StarX Alpha Labs",
    description: "Explore 160 industry-specific business software blueprints across 12 sectors.",
    url: `${SITE_CONFIG.url}/demos`,
  },
};

export default async function DemosPage() {
  const publishedSlugs = Array.from(await getPublishedCatalogSlugSet());
  return <DemosClient publishedSlugs={publishedSlugs} />;
}
