import { Metadata } from "next";
import { DemosClient } from "./DemosClient";
import { SITE_CONFIG } from "@/lib/constants";
import { getPublishedCatalogSlugSet } from "@/lib/forge/runtimeResolver";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "240 Enterprise Digital Product Blueprints — StarX Alpha Labs",
  description:
    "Explore the canonical catalogue of 240 enterprise digital products, e-commerce storefronts, mobile apps, and customer platforms across 12 industries: Food & Hospitality, Retail & Ecommerce, Healthcare, Real Estate, Education, Automotive, Beauty & Wellness, Logistics, Professional Services, Manufacturing, Travel & Events, and Technology & SaaS.",
  keywords: [
    "enterprise digital products",
    "240 demo blueprints",
    "ecommerce storefronts",
    "native mobile apps",
    "customer platforms",
    "digital ecosystems",
    "starx alpha labs",
  ],
  openGraph: {
    title: "240 Enterprise Digital Product Blueprints — StarX Alpha Labs",
    description: "Explore 240 customer-facing business software and digital product blueprints across 12 sectors.",
    url: `${SITE_CONFIG.url}/demos`,
  },
};

export default async function DemosPage() {
  const publishedSlugs = Array.from(await getPublishedCatalogSlugSet());
  return <DemosClient publishedSlugs={publishedSlugs} />;
}
