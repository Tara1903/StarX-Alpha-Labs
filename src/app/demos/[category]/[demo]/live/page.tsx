import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_DEMOS, getDemoBySlug } from "@/data/demos";
import { LiveDemoSimulator } from "@/components/demos/LiveDemoSimulator";
import { SITE_CONFIG } from "@/lib/constants";

interface LiveDemoPageProps {
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

export async function generateMetadata({ params }: LiveDemoPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const demo = getDemoBySlug(resolvedParams.demo);

  if (!demo) {
    return { title: "Demo Not Found — StarX Alpha Labs" };
  }

  return {
    title: `Live Interactive Demo: ${demo.name} — StarX Alpha Labs`,
    description: `Experience the interactive sandbox for ${demo.name}. Evaluate multi-role permissions, operational dashboards, and test data in an isolated demo environment.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function LiveDemoPage({ params }: LiveDemoPageProps) {
  const resolvedParams = await params;
  const demo = getDemoBySlug(resolvedParams.demo);

  if (!demo) {
    notFound();
  }

  return <LiveDemoSimulator demo={demo} />;
}
