"use client";

import React, { useState, useMemo } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  getPlanById,
  getFeaturesForPlan,
  getAddonsForPlan,
  calculateInvestmentSummary,
  CANONICAL_PLANS,
} from "@/data/plans";
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
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Zap,
} from "lucide-react";

export function Step14Config() {
  const { state, setConfiguredFeatures, nextStep } = useDesignStudio();

  // Retrieve exact selected plan
  const selectedPlan = useMemo(() => {
    return getPlanById(state.selectedPlanId || "") || CANONICAL_PLANS[0];
  }, [state.selectedPlanId]);

  // Selected add-ons state
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    state.configuredFeatures?.addons || ["addon-seo-mastery"]
  );

  // Available add-ons for this plan
  const availableAddons = useMemo(() => {
    return getAddonsForPlan(selectedPlan.id);
  }, [selectedPlan.id]);

  // Feature categorizations
  const featuresList = useMemo(() => {
    return getFeaturesForPlan(selectedPlan.id);
  }, [selectedPlan.id]);

  const includedFeatures = useMemo(() => {
    return featuresList.filter(f => f.classification === "INCLUDED");
  }, [featuresList]);

  const optionalFeatures = useMemo(() => {
    return featuresList.filter(f => f.classification === "OPTIONAL_ADDON");
  }, [featuresList]);

  const higherTierFeatures = useMemo(() => {
    return featuresList.filter(f => f.classification === "HIGHER_TIER_ONLY");
  }, [featuresList]);

  // Toggle add-on selection
  const toggleAddon = (addonId: string) => {
    let nextAddons: string[];
    if (selectedAddons.includes(addonId)) {
      nextAddons = selectedAddons.filter((id) => id !== addonId);
    } else {
      nextAddons = [...selectedAddons, addonId];
    }
    setSelectedAddons(nextAddons);

    setConfiguredFeatures({
      included: includedFeatures.map(f => f.feature.id),
      addons: nextAddons,
      upgrades: higherTierFeatures.map(f => f.feature.id),
      custom: [],
    });
  };

  // Authoritative Investment Summary Calculation
  const investment = useMemo(() => {
    return calculateInvestmentSummary({
      planId: selectedPlan.id,
      selectedAddonIds: selectedAddons,
      currency: "INR",
    });
  }, [selectedPlan.id, selectedAddons]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 3 • Step 14 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Configure Your Scope & Add-ons
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Review included architectural capabilities for <strong className="text-white">{selectedPlan.name}</strong> and customize optional add-ons with transparent investment calculation.
        </p>
      </div>

      {/* 2-Column: Features Breakdown & Investment Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Categorized Features & Add-ons (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section A: Included Base Features */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Included Capabilities ({includedFeatures.length})
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% In Plan Scope
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              These capabilities are guaranteed in your base plan delivery with zero additional charges.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {includedFeatures.map(item => (
                <div key={item.feature.id} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-white leading-tight">{item.feature.name}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.feature.customerExplanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Modular Add-ons Selection */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Optional Modular Add-ons ({availableAddons.length})
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">Select to Expand Scope</span>
            </div>
            <p className="text-xs text-zinc-400">
              Enhance your platform with specialized modules, multilingual catalogs, or enterprise SLA support.
            </p>

            <div className="space-y-2.5 pt-2">
              {availableAddons.map(addon => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-cyan-500/10 border-cyan-500/40 shadow-sm"
                        : "bg-black/30 border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition-all ${
                          isSelected ? "bg-cyan-500 text-black" : "border border-zinc-600 bg-black/50"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          {addon.name}
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-zinc-400">
                            {addon.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">{addon.tagline}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-cyan-400">
                        ₹{addon.priceINR.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        {addon.billingModel === "MONTHLY" ? "/mo recurring" : "one-time"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section C: Higher-Tier Roadmap Features */}
          {higherTierFeatures.length > 0 && (
            <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                <Lock className="w-3.5 h-3.5 text-zinc-500" />
                Higher-Tier Features (Available in Scale & Enterprise Tiers)
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {higherTierFeatures.map(item => (
                  <span
                    key={item.feature.id}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] text-zinc-400 flex items-center gap-1.5"
                  >
                    <Lock className="w-3 h-3 text-zinc-500" />
                    {item.feature.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Authoritative Commercial Ledger (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl space-y-5 sticky top-24 shadow-2xl shadow-black/60">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Authoritative Investment
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedPlan.name}</h3>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {selectedPlan.code}
              </span>
            </div>

            {/* Itemized Commercial Ledger */}
            <div className="space-y-2 text-xs">
              {investment.breakdownItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-300 truncate max-w-[220px]">{item.label}</span>
                  <span className="font-mono font-bold text-white shrink-0">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Investment Totals */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              {selectedPlan.planType === "subscription" ? (
                <>
                  <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                      <span>Monthly Cloud Subscription:</span>
                      <span className="text-base font-mono font-black text-cyan-400">
                        ₹{investment.monthlyOperationsRetainer.toLocaleString("en-IN")}/mo
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400">
                      Includes cloud hosting, regular updates, active bug fixes, and security monitoring.
                    </p>
                  </div>

                  <div className="space-y-1 pt-1 text-xs text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span>One-Time Initial Setup & Add-ons:</span>
                      <span className="font-mono text-white">
                        ₹{investment.totalOneTimeDevelopment.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Statutory GST (18%):</span>
                      <span className="font-mono text-white">
                        ₹{investment.taxAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-white/10 font-semibold text-white">
                      <span>Total Initial Setup (One-Time):</span>
                      <span className="font-mono text-cyan-300">
                        ₹{investment.totalGrossOneTime.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Subtotal (Net Investment):</span>
                    <span className="font-mono text-white">
                      ₹{investment.totalOneTimeDevelopment.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Statutory GST (18%):</span>
                    <span className="font-mono text-white">
                      ₹{investment.taxAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-base font-bold text-white">
                    <span>Total Investment (Gross):</span>
                    <span className="text-xl font-mono text-cyan-400">
                      {selectedPlan.isCustomQuote
                        ? "Custom Quote"
                        : `₹${investment.totalGrossOneTime.toLocaleString("en-IN")}`}
                    </span>
                  </div>

                  {investment.monthlyOperationsRetainer > 0 && (
                    <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold text-cyan-300">
                        <span>Recurring SLA Operations:</span>
                        <span className="font-mono">
                          ₹{investment.monthlyOperationsRetainer.toLocaleString("en-IN")} / mo
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400">
                        Billed monthly following 30-day post-launch warranty period.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Commercial Guarantees */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{selectedPlan.limits?.warrantyPeriodDays || selectedPlan.postLaunchWarrantyDays || 30}-Day Post-Launch Bug Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>100% Intellectual Property & Source Code Transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Delivery SLA: {selectedPlan.limits?.slaResponseTime || selectedPlan.slaLevel}</span>
              </div>
            </div>

            {/* Action Continue */}
            <button
              type="button"
              onClick={() => nextStep()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer mt-4"
            >
              <span>Confirm Scope & Personalise</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
