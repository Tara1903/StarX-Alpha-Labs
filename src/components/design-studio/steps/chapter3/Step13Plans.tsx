"use client";

import React, { useState, useEffect } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import { CanonicalPlan } from "../../types";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
  HelpCircle,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Award,
} from "lucide-react";

export function Step13Plans() {
  const { state, setSelectedPlan, evaluateRecommendation, nextStep } = useDesignStudio();
  const [plans, setPlans] = useState<CanonicalPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const selectedPlanId = state.selectedPlanId;
  const recResult = state.recommendationResult;

  // Fetch published canonical plans from API
  const loadPlans = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const division = state.primaryDivision || "starx-web";
      const res = await fetch(`/api/design-studio/plans?division=${division}`);
      if (!res.ok) {
        throw new Error(`Failed to load plans: HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.plans && Array.isArray(data.plans)) {
        setPlans(data.plans);
        // If no plan selected yet and recommendation exists, default to recommended
        if (!selectedPlanId && recResult?.recommendedPlanId) {
          const rec = data.plans.find((p: CanonicalPlan) => p.id === recResult.recommendedPlanId);
          if (rec) {
            setSelectedPlan(rec.id, rec.name, rec.priceUSD || rec.priceINR);
          }
        }
      }
    } catch (err: any) {
      setFetchError(err?.message || "Failed to load canonical plans");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, [state.primaryDivision]);

  const handleSelectPlan = (plan: CanonicalPlan) => {
    setSelectedPlan(plan.id, plan.name, plan.priceUSD || plan.priceINR);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 3 • Step 13 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          We've Understood Your Idea. Let's Find the Right Plan.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Our recommendation engine evaluated your {state.featureRequirements.length} required features and {state.platforms.length} platforms against our published catalogue.
        </p>
      </div>

      {/* AI Recommendation Banner */}
      {recResult && (
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/30 p-5 backdrop-blur-xl space-y-3 shadow-[0_0_30px_rgba(0,217,255,0.15)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 text-black flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  Top Recommended Plan Match
                </span>
                <h3 className="text-lg font-bold text-white">
                  {recResult.recommendedPlanName || "Standard Engineering"}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <span>{Math.round(recResult.matchScore * 100)}% Match Confidence</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-zinc-300">
            <p className="font-semibold text-white">Why this plan fits your requirements:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recResult.reasoning.map((reason: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading & Error States */}
      {isLoading && (
        <div className="py-16 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-zinc-400">Retrieving published canonical plans from database...</p>
        </div>
      )}

      {fetchError && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6 text-center space-y-3">
          <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">Failed to Retrieve Plan Catalogue</h4>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">{fetchError}</p>
          <button
            type="button"
            onClick={loadPlans}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Catalogue Retrieval</span>
          </button>
        </div>
      )}

      {/* Plan Cards Grid */}
      {!isLoading && plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const isRecommended = recResult?.recommendedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan)}
                className={`group relative rounded-2xl p-5 transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-400 shadow-[0_0_30px_rgba(0,217,255,0.25)] ring-1 ring-cyan-400 scale-[1.02]"
                    : isRecommended
                    ? "bg-cyan-950/20 border-cyan-500/40 hover:border-cyan-400"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isRecommended
                          ? "bg-cyan-500 text-black font-extrabold shadow-[0_0_10px_rgba(0,217,255,0.4)]"
                          : "bg-white/5 text-zinc-400 border border-white/10"
                      }`}
                    >
                      {isRecommended ? "Recommended" : plan.tier.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {plan.code || "v2.0"}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {plan.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <div className="text-2xl font-mono font-extrabold text-white">
                      {plan.isCustomPrice ? (
                        "Custom Quotation"
                      ) : (
                        <>
                          ${(plan.priceUSD || plan.priceINR).toLocaleString()}
                          <span className="text-xs font-sans text-zinc-500 font-normal">
                            {" "}/ milestone
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                      Included Architecture:
                    </span>
                    <div className="space-y-1.5">
                      {(plan.includedFeatures || []).slice(0, 5).map((feat: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat.name || String(feat)}</span>
                        </div>
                      ))}
                      {(plan.includedFeatures?.length || 0) > 5 && (
                        <span className="text-[11px] text-cyan-400/80 font-medium block pt-0.5">
                          + {(plan.includedFeatures?.length || 0) - 5} more capabilities included
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Selection Action */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300">
                    {isSelected ? "Active Plan" : "Select Plan"}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      isSelected
                        ? "bg-cyan-400 text-black font-bold shadow-[0_0_10px_rgba(0,217,255,0.5)]"
                        : "border border-zinc-600 group-hover:border-zinc-400"
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Selected Plan:{" "}
            <strong className="text-white">
              {plans.find((p) => p.id === selectedPlanId)?.name || selectedPlanId || "None"}
            </strong>
          </span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          disabled={!selectedPlanId}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          <span>Continue to Configure Features</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
