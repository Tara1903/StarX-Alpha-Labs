import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEMO_CATEGORIES } from "@/data/categories";
import { getDemosByCategory } from "@/data/demos";
import { listPublishedCustomForgeDemoModels } from "@/lib/forge/runtimeResolver";
import { mergeUniqueDemos } from "@/lib/forge/demoMerge";
import { CategoryClient } from "./CategoryClient";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return DEMO_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = DEMO_CATEGORIES.find((c) => c.slug === resolvedParams.category);
  if (!category) {
    return { title: "Category Not Found — StarX Alpha Labs" };
  }

  return {
    title: `${category.name} Demos (${category.count} Models) — StarX Alpha Labs`,
    description: category.description,
    openGraph: {
      title: `${category.name} Software Systems — StarX Alpha Labs`,
      description: category.tagline,
      url: `${SITE_CONFIG.url}/demos/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = DEMO_CATEGORIES.find((c) => c.slug === resolvedParams.category);

  if (!category) {
    notFound();
  }

  const baseDemos = getDemosByCategory(category.slug);
  const customDemos = await listPublishedCustomForgeDemoModels(category.slug);
  const demos = mergeUniqueDemos(baseDemos, customDemos);

  return <CategoryClient category={category} demos={demos} />;
}
