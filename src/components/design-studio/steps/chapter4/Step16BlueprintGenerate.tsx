"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  FileCode2,
  Layers,
  Palette,
  Loader2,
  RefreshCw,
  AlertCircle,
  Eye,
  CheckCircle2,
  Monitor,
} from "lucide-react";

export function Step16BlueprintGenerate() {
  const { state, generateDemo } = useDesignStudio();
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const job = state.generationJob;
  const isComplete = job?.status === "completed";

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      await generateDemo();
    } catch (err: any) {
      setErrorMsg(err?.message || "Generation encountered an issue. Your answers are saved, please retry.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 4 • Step 16 of 16 (Final Acceptance)
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Everything Is Coming Together.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Review your finalized system blueprint. Generating your demo will invoke Google Stitch MCP to render authentic high-fidelity interactive screens.
        </p>
      </div>

      {/* Blueprint Review Card */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl space-y-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {state.designPreferences.productName || "StarX Product"} Blueprint
              </h3>
              <p className="text-xs text-zinc-400">
                Architectural specification v2.0 • Ready for Stitch multi-screen generation
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            ✓ Validated & Locked
          </span>
        </div>

        {/* Blueprint Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Col 1 */}
          <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              System Architecture
            </span>
            <div className="space-y-1">
              <p className="text-zinc-400">Division:</p>
              <p className="font-bold text-white text-sm">{state.primaryDivision.toUpperCase()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-400">Industry Sector:</p>
              <p className="font-semibold text-cyan-300">{state.industry.toUpperCase()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-400">Solution Archetype:</p>
              <p className="font-medium text-zinc-200">{state.solutionCategory}</p>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Design & Visual Tokens
            </span>
            <div className="space-y-1">
              <p className="text-zinc-400">Atmosphere Style:</p>
              <p className="font-bold text-white text-sm capitalize">
                {state.designPreferences.designStyle || state.designPreferences.visualStyle || "futuristic"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-400">Typography System:</p>
              <p className="font-semibold text-zinc-200">{state.designPreferences.typography}</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-400">Color Signature:</p>
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: state.designPreferences.primaryColor }}
                />
                <span className="font-mono text-zinc-300">{state.designPreferences.primaryColor}</span>
              </div>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Commercial Scope
            </span>
            <div className="space-y-1">
              <p className="text-zinc-400">Selected Plan:</p>
              <p className="font-bold text-white text-sm">{state.selectedPlanName || "Standard Engineering"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-400">Feature Deliverables:</p>
              <p className="font-semibold text-zinc-200">{state.featureRequirements.length} Features Included</p>
            </div>
            <div className="space-y-1">
              <p className="text-zinc-400">Estimated Investment:</p>
              <p className="font-mono text-base font-extrabold text-cyan-400">
                ${typeof state.selectedPlanPrice === "number" ? state.selectedPlanPrice.toLocaleString() : "Custom"}
              </p>
            </div>
          </div>
        </div>

        {/* Screen Inventory to be Generated */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            Target Screen Inventory for Stitch Synthesis:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-zinc-300">
              <span className="font-bold text-white block">1. Executive Command Center</span>
              <span className="text-[11px] text-zinc-400">Operational KPIs, navigation bar & live telemetry</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-zinc-300">
              <span className="font-bold text-white block">2. Primary Workflow Workspace</span>
              <span className="text-[11px] text-zinc-400">Data tables, dynamic filters, and action modals</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-zinc-300">
              <span className="font-bold text-white block">3. Customer / Client Viewport</span>
              <span className="text-[11px] text-zinc-400">Responsive mobile-first client interface</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generation Telemetry / In-Flight Box */}
      {isGenerating && (
        <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-black p-6 backdrop-blur-xl text-center space-y-4 animate-in fade-in">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-blue-500/20 border-b-blue-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              {job?.stage || "Synthesizing High-Fidelity UI Screens..."}
            </h4>
            <p className="text-xs text-cyan-400/90 font-mono">
              Google Stitch MCP Provider Active • Generating authentic production HTML & previews
            </p>
          </div>

          <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-500"
              style={{ width: `${job?.progressPercent || 45}%` }}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5 space-y-2 text-center">
          <AlertCircle className="w-6 h-6 text-rose-400 mx-auto" />
          <p className="text-xs text-rose-300 font-semibold">{errorMsg}</p>
          <p className="text-[11px] text-zinc-400">
            All your choices across Chapters 1–4 are saved. You can retry immediately.
          </p>
        </div>
      )}

      {/* Primary CTA Button */}
      <div className="pt-2 text-center space-y-3">
        <button
          type="button"
          onClick={handleStartGeneration}
          disabled={isGenerating}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-extrabold text-base shadow-[0_0_35px_rgba(0,217,255,0.4)] transition-all cursor-pointer disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Google Stitch Demo ({job?.progressPercent || 45}%)...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>Generate My Demo</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-xs text-zinc-500">
          Takes ~45–60s for full multi-screen rendering and encrypted cloud asset storage.
        </p>
      </div>
    </div>
  );
}
