import { redirect, notFound } from "next/navigation";
import { getOptionalAdmin } from "@/lib/auth/admin";
import { getForgeDemoById } from "@/lib/forge/store";
import { forgeDemoToProductDefinition } from "@/lib/forge/runtimeResolver";
import { DemoRuntimeDispatcher } from "@/modules/demo-center/runtime/DemoRuntimeDispatcher";

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

  const product = forgeDemoToProductDefinition(demo);

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
