import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute -bottom-40 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[140px]" />

      <div className="z-10 max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase">
          <Zap className="w-3.5 h-3.5" />
          <span>Architectural Phase 1 Active &bull; StarX Engine</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white">
          STARX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">LABS</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed">
          {SITE_CONFIG.tagline}. High-caliber digital architecture, bespoke enterprise systems, and cinematic engineering.
        </p>

        {/* System Foundation Health Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-2xl mx-auto">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm mb-1">
              <CheckCircle2 className="w-4 h-4" /> Next.js 16 & React 19
            </div>
            <p className="text-xs text-slate-400">Strict TypeScript, Server Components & Tailwind v4 engine initialized.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm mb-1">
              <ShieldCheck className="w-4 h-4" /> Supabase SSR
            </div>
            <p className="text-xs text-slate-400">Dual client/server context, middleware auth sessions & admin client.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-blue-400 font-medium text-sm mb-1">
              <Zap className="w-4 h-4" /> Three.js & Motion
            </div>
            <p className="text-xs text-slate-400">R3F / Drei and Motion hardware-accelerated stack primed.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            href="/api/health"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/20"
          >
            System Status API <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={SITE_CONFIG.ecosystem.starxFlowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800/80 text-slate-300 font-medium text-sm transition-all"
          >
            STARX FLOW Ecosystem &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
