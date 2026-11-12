import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_DEMOS, getDemoBySlug, getRelatedDemos } from "@/data/demos";
import { getPublishedCatalogSlugSet } from "@/lib/forge/runtimeResolver";
import { applyPublishedStates } from "@/lib/forge/demoMerge";
import { DemoDetailClient } from "./DemoDetailClient";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 60;

interface DemoDetailPageProps {
  params: Promise<{
    category: string;
    demo: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_DEMOS.map((d) => ({
    category: d.categorySlug,
    demo: d.slug,
  }));
}

export async function generateMetadata({ params }: DemoDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawDemo = getDemoBySlug(resolvedParams.demo);
  if (!rawDemo || rawDemo.categorySlug !== resolvedParams.category) {
    return { title: "Demo Not Found — StarX Alpha Labs" };
  }
  const publishedSlugs = await getPublishedCatalogSlugSet();
  const [demo] = applyPublishedStates([rawDemo], publishedSlugs);

  return {
    title: `${demo.name} (#${demo.id}) — StarX Alpha Labs Demo Showcase`,
    description: demo.shortDescription,
    keywords: demo.seo.keywords,
    openGraph: {
      title: `${demo.name} — Interactive Demo | StarX Alpha Labs`,
      description: demo.shortDescription,
      url: `${SITE_CONFIG.url}/demos/${demo.categorySlug}/${demo.slug}`,
    },
  };
}

export default async function DemoDetailPage({ params }: DemoDetailPageProps) {
  const resolvedParams = await params;
  const rawDemo = getDemoBySlug(resolvedParams.demo);
  if (!rawDemo || rawDemo.categorySlug !== resolvedParams.category) {
    notFound();
  }

  const publishedSlugs = await getPublishedCatalogSlugSet();
  const [demo] = applyPublishedStates([rawDemo], publishedSlugs);
  const related = applyPublishedStates(getRelatedDemos(demo, 4), publishedSlugs);

  return <DemoDetailClient demo={demo} relatedDemos={related} />;
}
