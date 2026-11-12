import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoRuntimeDispatcher } from "@/modules/demo-center/runtime/DemoRuntimeDispatcher";
import { resolvePublishedForgeProduct } from "@/lib/forge/runtimeResolver";

export const revalidate = 60;

interface LiveDemoPageProps {
  params: Promise<{
    category: string;
    demo: string;
  }>;
}

export async function generateMetadata({ params }: LiveDemoPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await resolvePublishedForgeProduct(resolvedParams.category, resolvedParams.demo);

  if (!product) {
    return { title: "Demo Under Development — StarX Alpha Labs" };
  }

  return {
    title: `Live Interactive Demo: ${product.name} — StarX Alpha Labs`,
    description: `Experience the interactive production sandbox for ${product.name}. Evaluate multi-role permissions, operational workflows, and real-time state in an isolated demo environment.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function LiveDemoPage({ params }: LiveDemoPageProps) {
  const resolvedParams = await params;
  const product = await resolvePublishedForgeProduct(resolvedParams.category, resolvedParams.demo);

  if (!product) {
    notFound();
  }

  return <DemoRuntimeDispatcher product={product} />;
}
