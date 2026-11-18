"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Lock,
  Layers,
  Wrench,
  HelpCircle,
  CreditCard,
} from "lucide-react";

interface AddonOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

const MODULAR_ADDONS: AddonOption[] = [
  {
    id: "addon-staging-env",
    name: "Isolated Preview & Staging Environment",
    description: "Dedicated preview URLs for stakeholder testing with branch preview CI/CD pipelines.",
    price: 450,
  },
  {
    id: "addon-i18n-localization",
    name: "Multi-Language & i18n Localization",
    description: "Dynamic localized string catalogs supporting English, Spanish, German, and Arabic RTL.",
    price: 600,
  },
  {
    id: "addon-ai-voice-copilot",
    name: "AI Voice Copilot & Audio Streaming",
    description: "WebSocket bidirectional audio streaming using Gemini Live API and ElevenLabs.",
    price: 850,
  },
  {
    id: "addon-advanced-audit-compliance",
    name: "Enterprise Audit Vault & SOC-2 Exporter",
    description: "Cryptographically verifiable ledger of all administrative data mutations and access.",
    price: 750,
  },
];

export function Step14Config() {
  const { state, setConfiguredFeatures, nextStep } = useDesignStudio();
  const selectedPlanName = state.selectedPlanName || "Selected Engineering Plan";
  const basePrice = typeof state.selectedPlanPrice === "number" ? state.selectedPlanPrice : 2900;

  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    state.configuredFeatures.addons || []
  );

  const toggleAddon = (addonId: string) => {
    let nextAddons: string[];
    if (selectedAddons.includes(addonId)) {
      nextAddons = selectedAddons.filter((id) => id !== addonId);
    } else {
      nextAddons = [...selectedAddons, addonId];
    }
    setSelectedAddons(nextAddons);

    setConfiguredFeatures({
      included: state.featureRequirements.map((f: any) => f.featureId || f.id),
      addons: nextAddons,
      upgrades: [],
      custom: [],
    });
  };

  const addonTotal = selectedAddons.reduce((sum, id) => {
    const item = MODULAR_ADDONS.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const grandTotal = basePrice + addonTotal;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 3 • Step 14 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Make Your Plan Your Own.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Review what is included in <strong className="text-white">{selectedPlanName}</strong> and customize optional add-ons with authoritative pricing.
        </p>
      </div>

      {/* 2-Column: Features and Live Commercial Calculation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 4 Feature Groups (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Group 1: Included Base Features */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>1. Included in Your Plan</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active In Scope
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {state.featureRequirements.slice(0, 8).map((feat: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-zinc-300"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="line-clamp-1">{feat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Optional Modular Add-ons */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>2. Optional Modular Add-ons</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Self-Service Add
              </span>
            </div>

            <div className="space-y-3">
              {MODULAR_ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? "bg-cyan-500/10 border-cyan-400/50 shadow-[0_0_15px_rgba(0,217,255,0.15)]"
                        : "bg-white/[0.02] border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {addon.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          +${addon.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        {addon.description}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs transition-colors shrink-0 mt-0.5 ${
                        isChecked
                          ? "bg-cyan-400 text-black font-bold"
                          : "border border-zinc-600"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 3: Enterprise Upgrades Available */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-300">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>3. Available Through Enterprise Tier</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Upgrade Path
              </span>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/15 border border-purple-500/20 text-xs text-zinc-400 flex items-center justify-between">
              <span>Multi-Region Active-Active Database Clustering & Zero-Trust Mesh</span>
              <span className="text-purple-300 font-semibold text-[11px]">Enterprise Tier Only</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Milestone Commercial Summary (1 col wide) */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 p-6 backdrop-blur-xl sticky top-24 space-y-5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <span>Investment Summary</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-zinc-300">
                <span>{selectedPlanName} Base:</span>
                <span className="font-mono text-white font-bold">
                  ${basePrice.toLocaleString()}
                </span>
              </div>

              {selectedAddons.map((id) => {
                const add = MODULAR_ADDONS.find((a) => a.id === id);
                if (!add) return null;
                return (
                  <div key={id} className="flex justify-between items-center text-zinc-400 pl-2">
                    <span className="line-clamp-1">+ {add.name}:</span>
                    <span className="font-mono text-cyan-300">${add.price}</span>
                  </div>
                );
              })}

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm font-bold text-white">
                <span>Total Scope Investment:</span>
                <span className="font-mono text-lg text-cyan-400 font-extrabold">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-[11px] text-zinc-400">
              <p className="font-semibold text-zinc-300">Commercial Guarantees:</p>
              <p>• Fixed milestone delivery pricing with zero hidden surcharges.</p>
              <p>• Verified design preview in Google Stitch included before code implementation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Chapter 3 Complete • Entering Chapter 4 (Create Your Design)</span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
        >
          <span>Continue to Personalise Your Design</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
