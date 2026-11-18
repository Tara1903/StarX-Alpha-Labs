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
  Layers,
  ArrowUpDown,
  Smartphone,
  Clock,
  FileCheck,
} from "lucide-react";

export function Step13Plans() {
  const { state, setSelectedPlan, nextStep } = useDesignStudio();
  const [plans, setPlans] = useState<CanonicalPlan[]>([]);
  const [recommendedPlan, setRecommendedPlan] = useState<CanonicalPlan | null>(null);
  const [recommendationJustification, setRecommendationJustification] = useState<string>("");
  const [matchScore, setMatchScore] = useState<number>(95);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const selectedPlanId = state.selectedPlanId;

  // Fetch published canonical plans filtered by division and solution
  const loadPlans = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const division = state.primaryDivision || "starx-web";
      const solution = state.solutionSlug || "";
      const complexity = (state as any).complexityScore || (state.recommendationResult as any)?.complexityScore || 4;

      const url = `/api/design-studio/plans?division=${encodeURIComponent(division)}&solution=${encodeURIComponent(solution)}&complexity=${complexity}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load plans: HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.plans && Array.isArray(data.plans)) {
        setPlans(data.plans);

        if (data.recommendedPlan) {
          setRecommendedPlan(data.recommendedPlan);
          setRecommendationJustification(data.recommendationData?.justification || data.recommendedPlan.tagline);
          setMatchScore(data.recommendationData?.matchConfidence || 95);

          // If no plan is explicitly chosen yet, select the recommended plan
          if (!selectedPlanId) {
            const rec = data.recommendedPlan;
            setSelectedPlan(rec.id, rec.name, currency === "INR" ? rec.priceINR : rec.priceUSD);
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
  }, [state.primaryDivision, state.solutionSlug]);

  const handleSelectPlan = (plan: CanonicalPlan) => {
    const price = currency === "INR" ? plan.priceINR : plan.priceUSD;
    setSelectedPlan(plan.id, plan.name, price);
  };

  const formatPrice = (plan: CanonicalPlan) => {
    if (plan.isCustomQuote || plan.isCustomPrice) {
      return "Custom Quote";
    }
    if (currency === "INR") {
      return `₹${plan.priceINR.toLocaleString("en-IN")}`;
    }
    return `$${plan.priceUSD.toLocaleString("en-US")}`;
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
          Our recommendation engine evaluated your {state.featureRequirements.length} required capabilities, {state.platforms.length} platforms, and complexity rating against our master commercial catalogue.
        </p>

        {/* Currency Switcher */}
        <div className="inline-flex items-center p-1 bg-black/60 border border-white/10 rounded-xl mt-2">
          <button
            type="button"
            onClick={() => setCurrency("INR")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              currency === "INR"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            INR (₹) India
          </button>
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              currency === "USD"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            USD ($) Global
          </button>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      {recommendedPlan && (
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/30 p-6 backdrop-blur-xl space-y-4 shadow-[0_0_30px_rgba(0,217,255,0.15)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500 text-black flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  Recommended for Your Requirements
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {recommendedPlan.name}
                  <span className="text-sm font-mono font-semibold text-cyan-300">
                    ({formatPrice(recommendedPlan)})
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <span>{matchScore}% Match Score</span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-zinc-300">
            <p className="font-semibold text-white">Why this plan was selected for your project:</p>
            <p className="text-zinc-300 leading-relaxed italic">
              "{recommendationJustification}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-zinc-300">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Scope: <strong>{recommendedPlan.screenOrPageScope}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Delivery: <strong>{recommendedPlan.timelineWeeks}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>SLA: <strong>{recommendedPlan.slaLevel}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading & Error States */}
      {isLoading && (
        <div className="py-16 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-xs text-zinc-400">Retrieving published plans from Master Commercial Catalogue...</p>
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
            <span>Retry Retrieval</span>
          </button>
        </div>
      )}

      {/* Selectable Plans Grid */}
      {!isLoading && plans.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Select Your Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const isRecommended = recommendedPlan?.id === plan.id;

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
                    {/* Badges */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-400">{plan.code}</span>
                      {isRecommended ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Recommended
                        </span>
                      ) : plan.badge ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                          {plan.badge}
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition">
                        {plan.name}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="pt-2 border-t border-white/10">
                      <div className="text-2xl font-black text-white font-mono tracking-tight">
                        {formatPrice(plan)}
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">
                        {plan.isCustomQuote ? "Based on architecture scope" : "One-time development fee"}
                      </div>
                    </div>

                    {/* Limits */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{plan.screenOrPageScope}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{plan.timelineWeeks}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{plan.postLaunchWarrantyDays}-Day Bug Warranty</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10">
                    <button
                      type="button"
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/25"
                          : "bg-white/5 text-zinc-300 group-hover:bg-white/10 group-hover:text-white"
                      }`}
                    >
                      {isSelected ? "Selected Plan" : "Choose This Plan"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Plan Comparison Table */}
      {!isLoading && plans.length > 1 && (
        <div className="space-y-3 pt-6 border-t border-white/10">
          <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-cyan-400" />
            Side-by-Side Commercial Comparison
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/40">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 font-semibold text-zinc-300">
                  <th className="p-3.5">Commercial Attribute</th>
                  {plans.map(p => (
                    <th key={p.id} className="p-3.5 font-mono">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                <tr>
                  <td className="p-3.5 font-semibold text-white">Investment ({currency})</td>
                  {plans.map(p => (
                    <td key={p.id} className="p-3.5 font-mono font-bold text-cyan-400">
                      {formatPrice(p)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Scope Allowance</td>
                  {plans.map(p => (
                    <td key={p.id} className="p-3.5">{p.screenOrPageScope}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Estimated Timeline</td>
                  {plans.map(p => (
                    <td key={p.id} className="p-3.5">{p.timelineWeeks}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">SLA Support Level</td>
                  {plans.map(p => (
                    <td key={p.id} className="p-3.5">{p.slaLevel}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Warranty Coverage</td>
                  {plans.map(p => (
                    <td key={p.id} className="p-3.5">{p.postLaunchWarrantyDays} Calendar Days</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Included Revisions</td>
                  {plans.map(p => (
                    <td key={p.id} className="p-3.5">{p.revisionsIncluded} Rounds</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Code & IP Transfer</td>
                  {plans.map(p => (
                    <td key={p.id} className="p-3.5 text-emerald-400 font-medium">{p.codeOwnership}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <div className="text-xs text-zinc-400">
          Selected Plan: <strong className="text-white">{state.selectedPlanName || "None"}</strong>
        </div>

        <button
          type="button"
          onClick={() => nextStep()}
          disabled={!selectedPlanId}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Continue to Configuration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
