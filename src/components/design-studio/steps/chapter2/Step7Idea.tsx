"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lightbulb,
  FileText,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const STARTERS = [
  "I want to create an omnichannel e-commerce platform with live inventory sync, multi-currency checkout, and customer loyalty rewards.",
  "I need an intelligent cloud POS and restaurant kitchen management system with real-time table floor mapping and digital QR menus.",
  "I want to launch an on-demand service mobile app connecting vetted home contractors with homeowners, featuring live GPS tracking and escrow payments.",
  "I need a multi-tenant B2B SaaS analytics platform allowing enterprise teams to track operational KPIs, run cohort analyses, and generate PDF executive digests.",
  "I want an autonomous AI customer support copilot that ingests our knowledge base and handles Tier-1 support queries via chat and voice.",
  "I want to build a healthcare patient portal for scheduling telehealth consultations, viewing lab diagnostics, and syncing EHR records securely.",
];

export function Step7Idea() {
  const { state, setIdeaDescription, nextStep } = useDesignStudio();
  const [description, setDescription] = useState(state.ideaDescription || "");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const charCount = description.trim().length;
  const isSufficient = charCount >= 20;

  const handleApplyStarter = (starter: string) => {
    setDescription(starter);
    setIdeaDescription(starter);
    setErrorMsg(null);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDescription(val);
    setIdeaDescription(val);
    if (val.trim().length >= 20) {
      setErrorMsg(null);
    }
  };

  const handleContinue = () => {
    if (!isSufficient) {
      setErrorMsg("Please provide at least 20 characters describing your idea so our AI can generate an accurate design blueprint.");
      return;
    }
    setIdeaDescription(description.trim());
    nextStep();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 2 • Step 7 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Tell Us What You Have in Mind.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Describe the solution you want to build in plain English. What problem does it solve, who is it for, and what makes your vision special?
        </p>
      </div>

      {/* Main Textarea Surface */}
      <div className="relative rounded-2xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] space-y-4">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 font-semibold text-zinc-300">
            <FileText className="w-4 h-4 text-cyan-400" />
            Your Product Vision & Core Workflow
          </span>
          <span
            className={`font-mono text-xs ${
              isSufficient ? "text-emerald-400 font-bold" : "text-zinc-500"
            }`}
          >
            {charCount} characters (20 min)
          </span>
        </div>

        <textarea
          rows={6}
          value={description}
          onChange={handleTextChange}
          placeholder="e.g. We are building a multi-tenant client portal for luxury real estate agencies. Buyers should be able to browse verified property listings with immersive 3D walkthroughs, schedule private viewings, and submit offers directly with digital contract signing..."
          className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all resize-y min-h-[140px]"
        />

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSufficient && (
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Sufficient context captured for AI requirement synthesis and Stitch screen prompts.</span>
          </div>
        )}
      </div>

      {/* Quick Idea Starters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Need Inspiration? Click Any Concept Starter:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {STARTERS.map((starter, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleApplyStarter(starter)}
              className="text-left p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/[0.03] transition-all text-xs text-zinc-300 group flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[10px] text-zinc-400 shrink-0 mt-0.5 group-hover:text-cyan-400 group-hover:bg-cyan-500/10">
                {i + 1}
              </span>
              <span className="leading-relaxed line-clamp-2">{starter}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Customer context will be preserved verbatim into the final blueprint.</span>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!isSufficient}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          <span>Continue to Define Users & Roles</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
