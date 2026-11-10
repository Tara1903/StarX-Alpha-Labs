import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEMO_CATEGORIES } from "@/data/categories";
import { getDemosByCategory } from "@/data/demos";
import { CategoryClient } from "./CategoryClient";
import { SITE_CONFIG } from "@/lib/constants";

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

  const demos = getDemosByCategory(category.slug);

  return <CategoryClient category={category} demos={demos} />;
}
