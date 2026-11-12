import { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { StarXForgeWorkspace } from "@/components/admin/forge/StarXForgeWorkspace";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "StarX Forge — AI Demo Creation & Orchestration Platform",
  description: "Design. Build. Test. Launch. Internal StarX Alpha Labs AI demo creation & batch orchestration workspace.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminForgePage() {
  return (
    <div className="min-h-screen bg-[#030B24] text-slate-100 flex flex-col">
      <header className="sticky top-0 z-30 bg-[#05112A]/95 backdrop-blur-md border-b border-[#00D9FF]/20 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>Admin Portal</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <BrandLogo size="sm" />
            <div>
              <div className="text-xs font-extrabold tracking-wider text-white uppercase">
                STARX FORGE
              </div>
              <div className="text-[10px] font-mono text-[#00D9FF] uppercase tracking-wider">
                Design. Build. Test. Launch.
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/demos"
          target="_blank"
          className="text-xs font-mono text-slate-300 hover:text-[#00D9FF] transition-colors"
        >
          Public Demo Center ↗
        </Link>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <StarXForgeWorkspace />
      </main>
    </div>
  );
}
