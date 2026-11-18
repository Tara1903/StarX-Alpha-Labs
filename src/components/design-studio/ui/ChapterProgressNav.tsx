"use client";

import React from "react";
import {
  ONBOARDING_CHAPTERS,
  STEP_DEFINITIONS,
  type OnboardingStep,
  type OnboardingChapter,
} from "../types";
import { useDesignStudio } from "../context/DesignStudioContext";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Save,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export function ChapterProgressNav() {
  const { state, currentChapter, goToStep, nextStep, prevStep, canAdvance } =
    useDesignStudio();
  const currentStep = state.currentStep;
  const currentMeta = STEP_DEFINITIONS[currentStep];

  return (
    <div className="w-full bg-[#030B24]/90 backdrop-blur-xl border-b border-[#0A1940] sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Top Header: Brand & Progress Summary */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#087BFF] p-0.5 shadow-[0_0_15px_rgba(0,217,255,0.4)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#00D9FF]">
                  Design Studio 2.0
                </span>
                <span className="text-[10px] font-mono text-zinc-500">•</span>
                <span className="text-xs font-mono text-zinc-400">
                  Step {currentStep} of 16
                </span>
              </div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                {currentMeta?.heading || "Intelligent Solution Architecture"}
              </h2>
            </div>
          </div>

          {/* Autosave & Auth Status Badge */}
          <div className="flex items-center gap-3">
            {state.account.isAuthenticated ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{state.account.email}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                <span>Account Setup Active</span>
              </div>
            )}

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
              <Save className="w-3 h-3 text-[#00D9FF]" />
              <span>Autosaved</span>
            </div>
          </div>
        </div>

        {/* 4 Chapter Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
          {ONBOARDING_CHAPTERS.map((ch) => {
            const isCurrent = currentChapter === ch.chapter;
            const isCompleted = ch.steps.every((s) => state.completedSteps.includes(s) || currentStep > s);
            const isAccessible = ch.steps.some((s) => s === currentStep || state.completedSteps.includes(s));

            return (
              <button
                key={ch.chapter}
                type="button"
                onClick={() => {
                  if (isAccessible) {
                    const firstStepInChapter = ch.steps[0];
                    goToStep(firstStepInChapter);
                  }
                }}
                disabled={!isAccessible}
                className={`text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  isCurrent
                    ? "bg-[#071638] border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)] text-white"
                    : isCompleted
                    ? "bg-[#05112B] border-emerald-500/30 text-zinc-300 hover:border-emerald-500/60"
                    : isAccessible
                    ? "bg-[#030B24] border-white/10 text-zinc-400 hover:border-white/20"
                    : "bg-[#030B24]/40 border-white/5 text-zinc-600 cursor-not-allowed"
                }`}
              >
                <div className="truncate">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="text-[10px] font-mono text-[#00D9FF]">CH {ch.chapter}</span>
                    <span className="truncate">{ch.title.replace(/Chapter \d: /, "")}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono truncate">{ch.subtitle}</div>
                </div>
                {isCompleted && <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* 16 Step Micro-Progress Bar */}
        <div className="flex items-center gap-1 w-full overflow-x-auto pb-1">
          {Array.from({ length: 16 }, (_, i) => {
            const s = (i + 1) as OnboardingStep;
            const isCurrent = s === currentStep;
            const isCompleted = state.completedSteps.includes(s) || currentStep > s;
            const meta = STEP_DEFINITIONS[s];

            return (
              <button
                key={s}
                type="button"
                onClick={() => goToStep(s)}
                title={`Step ${s}: ${meta.title}`}
                className={`flex-1 min-w-[20px] h-2 rounded-full transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]"
                    : isCompleted
                    ? "bg-emerald-400"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function StepControls() {
  const { state, nextStep, prevStep, canAdvance, currentChapter } = useDesignStudio();
  const currentStep = state.currentStep;

  if (currentStep === 16 && state.activeArtifact) {
    // On Step 16 after demo generation, the demo workspace handles its own controls
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-between gap-4 border-t border-white/10 mt-12">
      <button
        type="button"
        onClick={prevStep}
        disabled={currentStep === 1}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          currentStep === 1
            ? "opacity-30 cursor-not-allowed text-zinc-500"
            : "text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="text-center hidden sm:block">
        <span className="text-xs font-mono text-zinc-400">
          Step {currentStep} of 16
        </span>
      </div>

      <button
        type="button"
        onClick={() => {
          if (canAdvance) nextStep();
        }}
        disabled={!canAdvance}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
          canAdvance
            ? "bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-black shadow-[0_0_20px_rgba(0,217,255,0.4)] cursor-pointer"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
        }`}
      >
        <span>
          {currentStep === 16 ? "Complete Blueprint" : "Continue"}
        </span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
