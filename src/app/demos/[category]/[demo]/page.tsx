import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_DEMOS, getDemoBySlug, getRelatedDemos } from "@/data/demos";
import { DemoDetailClient } from "./DemoDetailClient";
import { SITE_CONFIG } from "@/lib/constants";

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
  const demo = getDemoBySlug(resolvedParams.demo);

  if (!demo) {
    return { title: "Demo Not Found — StarX Alpha Labs" };
  }

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
  const demo = getDemoBySlug(resolvedParams.demo);

  if (!demo) {
    notFound();
  }

  const related = getRelatedDemos(demo, 4);

  return <DemoDetailClient demo={demo} relatedDemos={related} />;
}
