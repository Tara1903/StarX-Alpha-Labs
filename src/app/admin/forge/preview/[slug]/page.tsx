import { redirect, notFound } from "next/navigation";
import { getOptionalAdmin } from "@/lib/auth/admin";
import { getForgeDemoById } from "@/lib/forge/store";
import { DemoRuntimeDispatcher } from "@/modules/demo-center/runtime/DemoRuntimeDispatcher";
import type { DemoArchetype, DemoProductDefinition } from "@/modules/demo-center/types";

export const dynamic = "force-dynamic";

export default async function ForgeAdminPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const admin = await getOptionalAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const { slug } = await params;
  const demo = await getForgeDemoById(slug);
  if (!demo) {
    notFound();
  }

  const product: DemoProductDefinition = {
    id: demo.catalogId || 9000,
    slug: demo.slug,
    name: demo.businessName,
    categoryNumber: 12,
    categoryName: demo.industry,
    categorySlug: demo.categorySlug,
    archetype: (demo.archetype || "analytics-canvas") as DemoArchetype,
    tagline: demo.designDirection || demo.industry,
    shortDescription: demo.description,
    fullDescription: demo.description,
    suitableFor: demo.targetAudience,
    brand: {
      primary: demo.brandConfig?.primary || "#087BFF",
      secondary: demo.brandConfig?.secondary || "#0A1940",
      accent: demo.brandConfig?.accent || "#00D9FF",
      bg: demo.brandConfig?.bg || "#030B24",
      surface: demo.brandConfig?.surface || "#0A1940",
      border: demo.brandConfig?.border || "rgba(0,217,255,0.22)",
      text: demo.brandConfig?.text || "#F8FAFC",
      mutedText: demo.brandConfig?.mutedText || "#94A3B8",
      fontHeadline: (demo.brandConfig?.fontHeadline as any) || "sans",
    },
    workflows: demo.workflows,
    features: demo.featureRequirements,
    techStack: ["Next.js 16", "React 19", "Supabase Sandbox", "Tailwind CSS v4"],
    indicativePrice: "₹24,999",
    indicativePriceUsd: "$299",
    estimatedTime: "7–14 Days",
    initialData: demo.seedData,
  };

  return (
    <div className="min-h-screen bg-[#030B24]">
      <div className="bg-[#071638] border-b border-amber-400/30 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-amber-300">
        <span>
          STARX FORGE SECURE SANDBOX PREVIEW — {demo.businessName} ({demo.generationStatus.toUpperCase()} /{" "}
          {demo.publishingStatus.toUpperCase()})
        </span>
        <span>Admin: {admin.email} • Unpublished Access Restricted</span>
      </div>
      <DemoRuntimeDispatcher product={product} />
    </div>
  );
}
