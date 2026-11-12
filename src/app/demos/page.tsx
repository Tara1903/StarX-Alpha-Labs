import { Metadata } from "next";
import { DemosClient } from "./DemosClient";
import { SITE_CONFIG } from "@/lib/constants";
import { listPublishedCustomForgeDemoModels } from "@/lib/forge/runtimeResolver";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "160 Enterprise Demo Models — StarX Alpha Labs",
  description:
    "Explore 160 interactive enterprise demo models across 12 main industries: Restaurant, E-Commerce, Education, Healthcare, Business CRM, Real Estate, Manufacturing, AI Automation, Mobile Apps, and more.",
  keywords: [
    "enterprise software demos",
    "160 demo models",
    "restaurant software demo",
    "ecommerce marketplace demo",
    "cloud erp demo",
    "ai automation demos",
    "mobile app demos",
    "starx alpha labs"
  ],
  openGraph: {
    title: "160 Enterprise Demo Models Showcase — StarX Alpha Labs",
    description: "Explore 160 live interactive software systems across 12 industries.",
    url: `${SITE_CONFIG.url}/demos`,
  }
};

export default async function DemosPage() {
  const publishedCustomDemos = await listPublishedCustomForgeDemoModels();
  return <DemosClient publishedCustomDemos={publishedCustomDemos} />;
}
