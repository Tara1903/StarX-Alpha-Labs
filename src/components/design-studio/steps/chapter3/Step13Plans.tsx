"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Globe,
  Settings,
  HardDrive,
  Cpu,
  CheckCircle2,
  X,
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

  const division = state.primaryDivision || "starx-web";
  const isSubscriptionEligible = division === "starx-web" || division === "starx-apps";
  const [planTypeFilter, setPlanTypeFilter] = useState<"subscription" | "bespoke_project">(
    isSubscriptionEligible ? "subscription" : "bespoke_project"
  );

  const selectedPlanId = state.selectedPlanId;

  // Fetch published canonical plans filtered by division and solution
  const loadPlans = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const solution = state.solutionSlug || "";
      const complexity = (state as any).complexityScore || (state.recommendationResult as any)?.complexityScore || 4;
      const featureList = (state.featureRequirements || []).join(",");
      const desc = encodeURIComponent(state.rawDescription || "");

      const url = `/api/design-studio/plans?division=${encodeURIComponent(division)}&solution=${encodeURIComponent(solution)}&complexity=${complexity}&planType=${planTypeFilter}&features=${encodeURIComponent(featureList)}&description=${desc}`;
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
  }, [division, state.solutionSlug, planTypeFilter]);

  const handleSelectPlan = (plan: CanonicalPlan) => {
    const price = currency === "INR" ? plan.priceINR : plan.priceUSD;
    setSelectedPlan(plan.id, plan.name, price);
  };

  const formatPrice = (plan: CanonicalPlan) => {
    if (plan.isCustomQuote || plan.isCustomPrice) {
      return "Custom Quote";
    }
    const isSub = plan.planType === "subscription";
    if (currency === "INR") {
      return `₹${plan.priceINR.toLocaleString("en-IN")}${isSub ? "/mo" : ""}`;
    }
    return `$${plan.priceUSD.toLocaleString("en-US")}${isSub ? "/mo" : ""}`;
  };

  // Filter plans based on the active tab
  const displayedPlans = useMemo(() => {
    if (!isSubscriptionEligible) return plans;
    const filtered = plans.filter((p) => {
      if (planTypeFilter === "subscription") {
        return p.planType === "subscription";
      }
      return p.planType === "bespoke_project" || !p.planType;
    });
    return filtered.length > 0 ? filtered : plans;
  }, [plans, planTypeFilter, isSubscriptionEligible]);

  // Web Subscription Feature Matrix definition matching authoritative infographic
  const webMatrixRows = [
    {
      label: "Pages / Screens",
      getter: (p: CanonicalPlan) => p.screenOrPageScope || "1–3 Pages",
    },
    {
      label: "Template & Design",
      getter: (p: CanonicalPlan) => {
        if (p.tier === "basic") return "Basic Template";
        if (p.tier === "starter") return "Customizable";
        if (p.tier === "plus") return "Premium Design";
        if (p.tier === "pro") return "Advanced UI/UX";
        if (p.tier === "elite") return "Liquid Glass UI";
        if (p.tier === "ultra") return "AI-Enhanced Design";
        if (p.tier === "ultra_max") return "Fully Custom Design";
        return "Tailored";
      },
    },
    {
      label: "Responsive Design (Mobile/Tablet/Desktop)",
      getter: () => "Yes",
    },
    {
      label: "Custom Branding (Logo, Colors, Typography)",
      getter: (p: CanonicalPlan) => (p.tier === "basic" ? "No" : "Yes"),
    },
    {
      label: "Content Management (CMS)",
      getter: (p: CanonicalPlan) => {
        if (p.tier === "basic") return "No";
        if (p.tier === "starter") return "Basic";
        if (p.tier === "plus" || p.tier === "pro") return "Yes";
        if (p.tier === "elite") return "Advanced";
        if (p.tier === "ultra") return "Advanced + AI";
        if (p.tier === "ultra_max") return "Enterprise CMS";
        return "Yes";
      },
    },
    {
      label: "Contact Forms & Lead Capture",
      getter: () => "Yes",
    },
    {
      label: "SEO Setup & Optimization",
      getter: (p: CanonicalPlan) => {
        if (p.tier === "basic" || p.tier === "starter") return "Basic";
        if (p.tier === "plus" || p.tier === "pro" || p.tier === "elite") return "Yes";
        if (p.tier === "ultra") return "Advanced";
        if (p.tier === "ultra_max") return "Advanced + AI";
        return "Standard";
      },
    },
    {
      label: "Blog / News / Content Sections",
      getter: (p: CanonicalPlan) => (p.tier === "basic" ? "No" : "Yes"),
    },
    {
      label: "Authentication (Login / Signup)",
      getter: (p: CanonicalPlan) =>
        ["basic", "starter", "plus"].includes(p.tier) ? "No" : "Yes",
    },
    {
      label: "E-commerce / Payments",
      getter: (p: CanonicalPlan) => {
        if (["basic", "starter"].includes(p.tier)) return "No";
        if (p.tier === "plus") return "Basic";
        return "Yes";
      },
    },
    {
      label: "Admin Dashboard",
      getter: (p: CanonicalPlan) => {
        if (["basic", "starter"].includes(p.tier)) return "No";
        if (p.tier === "plus") return "Basic";
        if (p.tier === "pro") return "Yes";
        if (p.tier === "elite") return "Advanced";
        if (p.tier === "ultra") return "Advanced + Analytics";
        if (p.tier === "ultra_max") return "Enterprise";
        return "Included";
      },
    },
    {
      label: "Database & Dynamic Features",
      getter: (p: CanonicalPlan) =>
        ["basic", "starter"].includes(p.tier) ? "No" : "Yes",
    },
    {
      label: "Integrations (WhatsApp, Maps, Email)",
      getter: (p: CanonicalPlan) =>
        ["basic", "starter"].includes(p.tier) ? "Basic" : "Yes",
    },
    {
      label: "AI Features (Chatbot, Content, Search)",
      getter: (p: CanonicalPlan) => {
        if (["basic", "starter", "plus", "pro"].includes(p.tier)) return "No";
        if (p.tier === "elite") return "Basic AI";
        if (p.tier === "ultra") return "AI Features";
        if (p.tier === "ultra_max") return "Advanced AI";
        return "Optional";
      },
    },
    {
      label: "Performance & Speed Optimization",
      getter: (p: CanonicalPlan) =>
        ["basic", "starter"].includes(p.tier) ? "Basic" : "Yes",
    },
    {
      label: "Security & SSL (HTTPS)",
      getter: () => "Yes",
    },
    {
      label: "Priority Support & Maintenance",
      getter: (p: CanonicalPlan) => p.slaLevel || "Standard",
    },
  ];

  // Apps Subscription Feature Matrix definition matching authoritative infographic
  const appMatrixRows = [
    {
      label: "Core App & Branding (Your Name, Logo, Theme)",
      getter: () => "Yes",
    },
    {
      label: "Industry-Specific Features (Menu / Booking / Courses)",
      getter: () => "Yes",
    },
    {
      label: "Orders / Bookings / Enquiries",
      getter: () => "Yes",
    },
    {
      label: "Payments Integration (UPI, Cards, Wallets)",
      getter: (p: CanonicalPlan) => (p.tier === "basic" ? "No" : "Yes"),
    },
    {
      label: "Business Dashboard (Manage content, orders)",
      getter: (p: CanonicalPlan) => (p.tier === "basic" ? "No" : "Yes"),
    },
    {
      label: "Reports & Analytics",
      getter: (p: CanonicalPlan) =>
        ["basic", "starter"].includes(p.tier) ? "No" : "Yes",
    },
    {
      label: "Advanced Customization (Homescreen, Layouts)",
      getter: (p: CanonicalPlan) =>
        ["basic", "starter", "plus"].includes(p.tier) ? "No" : "Yes",
    },
    {
      label: "Liquid Glass UI & Premium Design",
      getter: (p: CanonicalPlan) =>
        ["basic", "starter", "plus", "pro"].includes(p.tier) ? "No" : "Yes",
    },
    {
      label: "Customer AI Assistant (Shopping AI, Food AI)",
      getter: (p: CanonicalPlan) =>
        ["ultra", "ultra_max"].includes(p.tier) ? "Yes" : "No",
    },
    {
      label: "Business AI & Automation (Sales insights, marketing)",
      getter: (p: CanonicalPlan) =>
        ["ultra", "ultra_max"].includes(p.tier) ? "Yes" : "No",
    },
    {
      label: "Priority Support",
      getter: (p: CanonicalPlan) => p.slaLevel || "Standard",
    },
  ];

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
          Our recommendation engine evaluated your {state.featureRequirements.length} required capabilities, {state.platforms.length} platforms, and operational scope against our master commercial catalogue.
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

        {/* Commercial Model Switcher for Web & Apps */}
        {isSubscriptionEligible && (
          <div className="flex justify-center pt-2">
            <div className="inline-flex p-1 bg-zinc-900/90 border border-white/10 rounded-xl shadow-lg">
              <button
                type="button"
                onClick={() => setPlanTypeFilter("subscription")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                  planTypeFilter === "subscription"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md shadow-cyan-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Monthly Subscription Plans (From ₹499/mo)</span>
              </button>
              <button
                type="button"
                onClick={() => setPlanTypeFilter("bespoke_project")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                  planTypeFilter === "bespoke_project"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md shadow-cyan-500/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Bespoke Development Projects</span>
              </button>
            </div>
          </div>
        )}
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
      {!isLoading && displayedPlans.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              {planTypeFilter === "subscription" ? "Select Your Subscription Plan" : "Select Your Development Plan"}
            </h3>
            <span className="text-xs text-zinc-400">
              Showing {displayedPlans.length} plans
            </span>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${displayedPlans.length > 4 ? "xl:grid-cols-7" : ""} gap-3.5`}>
            {displayedPlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const isRecommended = recommendedPlan?.id === plan.id;
              const isSub = plan.planType === "subscription";

              return (
                <div
                  key={plan.id}
                  onClick={() => handleSelectPlan(plan)}
                  className={`group relative rounded-2xl p-4 transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? "bg-gradient-to-b from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-400 shadow-[0_0_30px_rgba(0,217,255,0.25)] ring-1 ring-cyan-400 scale-[1.02]"
                      : isRecommended
                      ? "bg-cyan-950/20 border-cyan-500/40 hover:border-cyan-400"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Badges */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-cyan-400">{plan.code}</span>
                      {isRecommended ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Recommended
                        </span>
                      ) : plan.badge ? (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-white/10 text-zinc-300 truncate max-w-[100px]">
                          {plan.badge}
                        </span>
                      ) : null}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                        {plan.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="pt-2 border-t border-white/10">
                      <div className="text-xl font-black text-white font-mono tracking-tight">
                        {formatPrice(plan)}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">
                        {isSub ? "+ ₹1,499 one-time setup" : (plan.isCustomQuote ? "Based on architecture scope" : "One-time project fee")}
                      </div>
                    </div>

                    {/* Limits */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px] text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{plan.screenOrPageScope}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{plan.timelineWeeks}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{plan.slaLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10">
                    <button
                      type="button"
                      className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/25"
                          : "bg-white/5 text-zinc-300 group-hover:bg-white/10 group-hover:text-white"
                      }`}
                    >
                      {isSelected ? "Selected Plan" : "Choose Plan"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Authoritative Feature Comparison Table */}
      {!isLoading && displayedPlans.length > 1 && (
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-cyan-400" />
              {division === "starx-apps"
                ? "Apps Subscription Plans & Feature Offerings"
                : "Website Plans & Feature Comparison Matrix"}
            </h3>
            <span className="text-xs text-cyan-400 font-mono">Authoritative Commercial Truth</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/60 shadow-2xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 font-semibold text-zinc-300">
                  <th className="p-3.5 sticky left-0 bg-zinc-900 z-10 min-w-[200px]">Features</th>
                  {displayedPlans.map((p) => (
                    <th key={p.id} className="p-3.5 font-mono text-center min-w-[130px]">
                      <div className="font-bold text-white text-sm">{p.name.replace("StarX Web ", "").replace("StarX App ", "")}</div>
                      <div className="text-cyan-400 font-bold mt-0.5">{formatPrice(p)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {(division === "starx-apps" && planTypeFilter === "subscription"
                  ? appMatrixRows
                  : webMatrixRows
                ).map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 font-semibold text-white sticky left-0 bg-zinc-900/90 backdrop-blur-md">
                      {row.label}
                    </td>
                    {displayedPlans.map((p) => {
                      const val = row.getter(p);
                      const isYes = val === "Yes";
                      const isNo = val === "No";

                      return (
                        <td key={p.id} className="p-3.5 text-center font-mono">
                          {isYes ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          ) : isNo ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-zinc-600">
                              —
                            </span>
                          ) : (
                            <span className="text-cyan-300 font-medium text-[11px]">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Infographic Key Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <Settings className="w-4 h-4" />
                <span>One-Time Initial Setup</span>
              </div>
              <p className="text-xs text-zinc-300 font-semibold">Starts from ₹1,499</p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Complete branding configuration, content staging, testing, and dedicated technical onboarding.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <Globe className="w-4 h-4" />
                <span>{division === "starx-apps" ? "Google Play Publishing" : "Domain & Hosting"}</span>
              </div>
              <p className="text-xs text-zinc-300 font-semibold">
                {division === "starx-apps" ? "₹2,999 per app" : "Generic Vercel domain included"}
              </p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {division === "starx-apps"
                  ? "StarX deploys directly to Google Play Store (Google's $25 console registration fee paid separately)."
                  : "Connect your custom .com/.in domain on Plus and higher plans (domain registration cost separate)."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Ongoing Support & Security</span>
              </div>
              <p className="text-xs text-zinc-300 font-semibold">Included in All Plans</p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Regular software updates, active bug fixes, performance monitoring, and security SSL maintenance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Optional Modular Add-ons</span>
              </div>
              <p className="text-xs text-zinc-300 font-semibold">Flexible Customization</p>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Expand limits, add WhatsApp automated bots, SEO schema graph, or custom payment gateways at any time.
              </p>
            </div>
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
