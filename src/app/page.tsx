import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, CheckCircle2, Layers, ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden bg-[#0A1424]">
      {/* Background radial gradient glow */}
      <div className="absolute -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-[#1769AA]/15 blur-[120px]" />
      <div className="absolute -bottom-40 -z-10 h-[500px] w-[500px] rounded-full bg-[#32A9E8]/15 blur-[140px]" />

      <div className="z-10 max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#32A9E8]/30 bg-[#32A9E8]/10 text-[#32A9E8] text-xs font-semibold tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5" />
          <span>Hybrid Cinematic Corporate &bull; Phase 2 Active</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white">
          STARX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769AA] via-[#32A9E8] to-[#63B8F8]">LABS</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed">
          {SITE_CONFIG.tagline}. High-caliber digital architecture, bespoke enterprise systems, and cinematic engineering.
        </p>

        {/* System & Design System Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-2xl mx-auto">
          <div className="p-4 rounded-xl border border-[#19375E] bg-[#0F2038]/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm mb-1">
              <CheckCircle2 className="w-4 h-4" /> Next.js 16 & React 19
            </div>
            <p className="text-xs text-slate-400">Strict TypeScript, Server Components & Tailwind v4 engine.</p>
          </div>

          <div className="p-4 rounded-xl border border-[#19375E] bg-[#0F2038]/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#32A9E8] font-medium text-sm mb-1">
              <Layers className="w-4 h-4" /> Design System v1.0
            </div>
            <p className="text-xs text-slate-400">Typed UI components, brand color tokens & bilingual typography.</p>
          </div>

          <div className="p-4 rounded-xl border border-[#19375E] bg-[#0F2038]/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm mb-1">
              <ShieldCheck className="w-4 h-4" /> Three.js Boundary
            </div>
            <p className="text-xs text-slate-400">Isolated client canvas, WebGL fallback & Motion primitives.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            href="/design-system"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#32A9E8] hover:bg-[#2595D1] text-white font-medium text-sm transition-all shadow-lg shadow-[#32A9E8]/20"
          >
            <Sparkles className="w-4 h-4" /> Design System Preview &rarr;
          </Link>
          <Link
            href="/api/health"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#19375E] hover:border-[#32A9E8]/60 bg-[#0F2038]/60 hover:bg-[#0F2038] text-slate-300 font-medium text-sm transition-all"
          >
            System Health API <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={SITE_CONFIG.ecosystem.starxFlowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800/80 text-slate-300 font-medium text-sm transition-all"
          >
            STARX FLOW &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
