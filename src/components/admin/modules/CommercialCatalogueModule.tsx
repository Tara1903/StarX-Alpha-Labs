"use client";

import React, { useState, useMemo } from "react";
import {
  CANONICAL_DIVISIONS,
  CANONICAL_SERVICE_CATEGORIES,
  CANONICAL_SOLUTIONS,
  CANONICAL_PLAN_FAMILIES,
  CANONICAL_PLANS,
  CANONICAL_FEATURES,
  CANONICAL_ADDONS,
  RECOMMENDATION_RULES,
  getFeaturesForPlan,
  getAddonsForPlan,
  calculateInvestmentSummary,
} from "@/data/commercialCatalogue";
import type {
  CanonicalDivisionSlug,
  CommercialPricingStatus,
  PlanTierLevel,
  CanonicalPlanRecord,
  FeatureGroupCategory,
} from "@/types/commercial";
import {
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  DollarSign,
  Tag,
  Zap,
  ArrowRight,
  Sliders,
  AlertTriangle,
  History,
  Eye,
  Plus,
  RefreshCw,
  Building,
  Smartphone,
  Cpu,
  Package,
  Boxes,
  HelpCircle,
  FileCheck,
} from "lucide-react";

interface CommercialCatalogueModuleProps {
  onShowToast: (msg: string) => void;
}

export function CommercialCatalogueModule({ onShowToast }: CommercialCatalogueModuleProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    "overview" | "solutions" | "plans" | "features" | "addons" | "rules" | "pricing-calculator" | "audit-logs"
  >("overview");

  const [selectedDivision, setSelectedDivision] = useState<CanonicalDivisionSlug | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("web-biz-growth");
  const [plansList, setPlansList] = useState<CanonicalPlanRecord[]>(CANONICAL_PLANS);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  // Filtered solutions
  const filteredSolutions = useMemo(() => {
    return CANONICAL_SOLUTIONS.filter(sol => {
      const matchDiv = selectedDivision === "all" || sol.divisionSlug === selectedDivision;
      const matchSearch = sol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sol.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sol.slug.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDiv && matchSearch;
    });
  }, [selectedDivision, searchQuery]);

  // Filtered plans
  const filteredPlans = useMemo(() => {
    return plansList.filter(plan => {
      const matchDiv = selectedDivision === "all" || plan.divisionSlug === selectedDivision;
      const matchSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDiv && matchSearch;
    });
  }, [plansList, selectedDivision, searchQuery]);

  // Selected plan detail
  const currentPlan = useMemo(() => {
    return plansList.find(p => p.id === selectedPlanId) || plansList[0];
  }, [plansList, selectedPlanId]);

  // Format currency
  const formatPrice = (inr: number, usd: number) => {
    if (currency === "INR") {
      return `₹${inr.toLocaleString("en-IN")}`;
    }
    return `$${usd.toLocaleString("en-US")}`;
  };

  // Status badge styling
  const getStatusBadge = (status: CommercialPricingStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "APPROVED":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "INTERNAL_REVIEW":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "DRAFT":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "ARCHIVED":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
    }
  };

  // Mock approval action
  const handleToggleStatus = (planId: string) => {
    setPlansList(prev => prev.map(p => {
      if (p.id === planId) {
        const nextStatus: CommercialPricingStatus = 
          p.status === "PUBLISHED" ? "INTERNAL_REVIEW" :
          p.status === "INTERNAL_REVIEW" ? "APPROVED" : "PUBLISHED";
        onShowToast(`Plan ${p.code} status transitioned to ${nextStatus}`);
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header & Currency Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-black border border-white/10 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Commercial Catalogue & Pricing Engine
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  Authoritative v2.0
                </span>
              </h1>
              <p className="text-sm text-zinc-400">
                Enterprise catalogue management across all 6 divisions, 30 solutions, standardized plans & multi-component pricing.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Toggle */}
          <div className="flex items-center p-1 bg-black/60 border border-white/10 rounded-xl">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currency === "INR"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              INR (₹) Default
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currency === "USD"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              USD ($) Export
            </button>
          </div>

          <button
            onClick={() => onShowToast("Synchronized catalogue with live database cache.")}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition"
            title="Refresh Schema"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
        {[
          { id: "overview", label: "Catalogue Overview", icon: Layers },
          { id: "solutions", label: `Solutions (${CANONICAL_SOLUTIONS.length})`, icon: Boxes },
          { id: "plans", label: `Plans & Tiers (${plansList.length})`, icon: Package },
          { id: "features", label: `Master Features (${CANONICAL_FEATURES.length})`, icon: Sparkles },
          { id: "addons", label: `Add-ons (${CANONICAL_ADDONS.length})`, icon: Tag },
          { id: "rules", label: `Recommendation Rules (${RECOMMENDATION_RULES.length})`, icon: Sliders },
          { id: "pricing-calculator", label: "Pricing & GST Simulator", icon: DollarSign },
          { id: "audit-logs", label: "Commercial Audit History", icon: History },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-white/10 text-white border border-white/20 shadow-lg shadow-black/40"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-zinc-500"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: CATALOGUE OVERVIEW */}
      {activeSubTab === "overview" && (
        <div className="space-y-6">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Divisions", value: "6", sub: "100% Operational", color: "text-cyan-400" },
              { label: "Solutions", value: CANONICAL_SOLUTIONS.length, sub: "Archetypes Mapped", color: "text-blue-400" },
              { label: "Plan Families", value: CANONICAL_PLAN_FAMILIES.length, sub: "Architectural Pods", color: "text-indigo-400" },
              { label: "Active Plans", value: plansList.length, sub: "Tiers & Custom Quotes", color: "text-emerald-400" },
              { label: "Master Features", value: CANONICAL_FEATURES.length, sub: "Granular Capabilities", color: "text-amber-400" },
              { label: "Modular Add-ons", value: CANONICAL_ADDONS.length, sub: "Multi-Currency Ready", color: "text-purple-400" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
                <div className="text-xs text-zinc-400 font-medium">{stat.label}</div>
                <div className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Division Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.values(CANONICAL_DIVISIONS).map(div => {
              const divSolutions = CANONICAL_SOLUTIONS.filter(s => s.divisionSlug === div.slug);
              const divPlans = plansList.filter(p => p.divisionSlug === div.slug);
              return (
                <div
                  key={div.slug}
                  className="p-5 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-cyan-400">
                        {div.badge}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        {divSolutions.length} Solutions • {divPlans.length} Plans
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{div.name}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">{div.description}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedDivision(div.slug);
                        setActiveSubTab("solutions");
                      }}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition"
                    >
                      Manage Solutions <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDivision(div.slug);
                        setActiveSubTab("plans");
                      }}
                      className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center gap-1.5 transition"
                    >
                      View Plans
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: SOLUTIONS MANAGEMENT */}
      {activeSubTab === "solutions" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900/60 border border-white/10">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <span className="text-xs text-zinc-400 px-2 font-medium">Division:</span>
              {(["all", "starx-web", "starx-apps", "starx-business", "starx-saas", "starx-ai", "starx-custom"] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDivision(d)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    selectedDivision === d
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {d === "all" ? "All Divisions" : d.replace("starx-", "StarX ")}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search solutions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSolutions.map(sol => (
              <div
                key={sol.id}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-cyan-500/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                      {sol.divisionSlug}
                    </span>
                    {sol.isPopular && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Popular Archetype
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition mb-1">
                    {sol.name}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">{sol.tagline}</p>
                  
                  <div className="space-y-1.5 text-[11px] text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{sol.supportedPlatforms.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{sol.applicableIndustries.length} Industries Mapped</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">{sol.defaultPlanFamilyId}</span>
                  <button
                    onClick={() => {
                      setSelectedDivision(sol.divisionSlug);
                      setActiveSubTab("plans");
                      onShowToast(`Showing plans for ${sol.name}`);
                    }}
                    className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    View Associated Plans <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: PLANS & TIERS */}
      {activeSubTab === "plans" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Plans List Sidebar */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-white/10">
              <span className="text-xs font-semibold text-zinc-300">Published Plans ({filteredPlans.length})</span>
              <div className="flex items-center gap-2">
                <select
                  value={selectedDivision}
                  onChange={e => setSelectedDivision(e.target.value as any)}
                  className="bg-black/50 border border-white/10 rounded-lg text-xs text-zinc-300 px-2 py-1 focus:outline-none"
                >
                  <option value="all">All Divisions</option>
                  <option value="starx-web">StarX Web</option>
                  <option value="starx-apps">StarX Apps</option>
                  <option value="starx-business">StarX Business</option>
                  <option value="starx-saas">StarX SaaS</option>
                  <option value="starx-ai">StarX AI</option>
                  <option value="starx-custom">StarX Custom</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredPlans.map(plan => {
                const isSelected = plan.id === selectedPlanId;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? "bg-cyan-950/20 border-cyan-500/50 shadow-md shadow-cyan-950/30"
                        : "bg-zinc-900/40 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                        {plan.code}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(plan.status)}`}>
                        {plan.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mb-0.5">{plan.name}</div>
                    <div className="text-xs text-zinc-400 line-clamp-1 mb-2">{plan.tagline}</div>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                      <span className="font-mono font-bold text-cyan-400">
                        {plan.isCustomQuote ? "Custom Quote" : formatPrice(plan.priceINR, plan.priceUSD)}
                      </span>
                      <span className="text-zinc-500 text-[11px]">{plan.limits.pagesOrScreens}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plan Detail & Governance Card */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-semibold">
                      {currentPlan.code}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">Version {currentPlan.version}.0</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(currentPlan.status)}`}>
                      {currentPlan.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{currentPlan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{currentPlan.tagline}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(currentPlan.id)}
                    className="px-3.5 py-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/25 transition"
                  >
                    Change Status
                  </button>
                </div>
              </div>

              {/* Price & Scoping Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-black/40 border border-white/5 font-mono">
                <div>
                  <div className="text-[11px] text-zinc-500">Price (INR)</div>
                  <div className="text-base font-bold text-cyan-400 mt-0.5">
                    {currentPlan.isCustomQuote ? "Custom Quote" : `₹${currentPlan.priceINR.toLocaleString("en-IN")}`}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500">Export (USD)</div>
                  <div className="text-base font-bold text-zinc-200 mt-0.5">
                    {currentPlan.isCustomQuote ? "Custom" : `$${currentPlan.priceUSD.toLocaleString("en-US")}`}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500">Timeline</div>
                  <div className="text-xs font-bold text-zinc-200 mt-1">{currentPlan.limits.timelineWeeks}</div>
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500">SLA Response</div>
                  <div className="text-xs font-bold text-zinc-200 mt-1">{currentPlan.limits.slaResponseTime}</div>
                </div>
              </div>

              {/* Multi-Component Breakdown */}
              <div>
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
                  Authoritative Pricing Components
                </h4>
                <div className="space-y-2">
                  {currentPlan.pricingComponents.map(comp => (
                    <div key={comp.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 text-xs">
                      <div>
                        <span className="text-white font-medium">{comp.name}</span>
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] rounded bg-white/10 text-zinc-400">
                          {comp.type} {comp.unitLabel || ""}
                        </span>
                      </div>
                      <span className="font-mono text-cyan-400 font-semibold">
                        {formatPrice(comp.amountINR, comp.amountUSD)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explicit Limits & Boundaries */}
              <div>
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
                  Defined Limits & Commercial Boundaries
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white/5 flex items-center justify-between">
                    <span className="text-zinc-400">Page / Screen Scope:</span>
                    <span className="font-semibold text-white">{currentPlan.limits.pagesOrScreens}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 flex items-center justify-between">
                    <span className="text-zinc-400">Included Revisions:</span>
                    <span className="font-semibold text-white">{currentPlan.limits.includedRevisions} Rounds</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 flex items-center justify-between">
                    <span className="text-zinc-400">Post-Launch Warranty:</span>
                    <span className="font-semibold text-white">{currentPlan.limits.warrantyPeriodDays} Days</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 flex items-center justify-between">
                    <span className="text-zinc-400">Code Ownership:</span>
                    <span className="font-semibold text-emerald-400">100% Full IP Transfer</span>
                  </div>
                </div>
              </div>

              {/* Included Features */}
              <div>
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2.5">
                  Included Features ({getFeaturesForPlan(currentPlan.id).filter(f => f.classification === "INCLUDED").length})
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {getFeaturesForPlan(currentPlan.id).map(f => (
                    <div key={f.feature.id} className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-zinc-200">{f.feature.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                        {f.classification}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: MASTER FEATURES */}
      {activeSubTab === "features" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300">Master Architectural Features ({CANONICAL_FEATURES.length})</span>
            <span className="text-xs text-zinc-500">16 Architectural Groups Classified</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CANONICAL_FEATURES.map(feat => (
              <div key={feat.id} className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {feat.group}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-400">Priority: {feat.defaultPriority}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{feat.name}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{feat.customerExplanation}</p>
                <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                  Tech: {feat.technicalDescription}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 5: ADD-ONS CATALOGUE */}
      {activeSubTab === "addons" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CANONICAL_ADDONS.map(addon => (
            <div key={addon.id} className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                    {addon.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {formatPrice(addon.priceINR, addon.priceUSD)}
                    <span className="text-[10px] text-zinc-500 ml-1">
                      {addon.billingModel === "MONTHLY" ? "/mo" : "one-time"}
                    </span>
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{addon.name}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">{addon.tagline}</p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-zinc-500 flex items-center justify-between">
                <span>Status: <strong className="text-emerald-400">{addon.status}</strong></span>
                <span>{addon.compatiblePlanTiers.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 6: RECOMMENDATION RULES */}
      {activeSubTab === "rules" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-1">Deterministic Recommendation Decision Matrix</h3>
            <p className="text-xs text-zinc-400">
              Deterministic mapping from Division + Solution + Multi-Factor Complexity Score (1–10) to authoritative plan recommendations.
            </p>
          </div>

          <div className="space-y-3">
            {RECOMMENDATION_RULES.map(rule => {
              const recPlan = CANONICAL_PLANS.find(p => p.id === rule.recommendedPlanId);
              return (
                <div key={rule.id} className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-400 font-semibold">
                        {rule.divisionSlug}
                      </span>
                      <span className="text-xs text-zinc-400">
                        Complexity Score: <strong className="text-white">{rule.minComplexity}–{rule.maxComplexity} / 10</strong>
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Recommended:</span>
                      <span className="text-cyan-400">{recPlan ? recPlan.name : rule.recommendedPlanId}</span>
                    </div>
                    <p className="text-xs text-zinc-400 italic">"{rule.justificationTemplate}"</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-zinc-500 font-mono">
                      Alternatives: {rule.alternativePlanIds.join(", ") || "None"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 7: PRICING & GST SIMULATOR */}
      {activeSubTab === "pricing-calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white">Select Baseline Plan</h3>
              <select
                value={selectedPlanId}
                onChange={e => setSelectedPlanId(e.target.value)}
                className="w-full p-2.5 bg-black/60 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
              >
                {CANONICAL_PLANS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.isCustomQuote ? "Custom Quote" : formatPrice(p.priceINR, p.priceUSD)}
                  </option>
                ))}
              </select>

              <h3 className="text-sm font-bold text-white pt-2">Select Modular Add-ons</h3>
              <div className="space-y-2">
                {CANONICAL_ADDONS.slice(0, 5).map(addon => (
                  <label key={addon.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs cursor-pointer hover:bg-white/10 transition">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked={addon.id === "addon-seo-mastery"} className="rounded accent-cyan-500" />
                      <span className="text-zinc-200">{addon.name}</span>
                    </div>
                    <span className="font-mono text-cyan-400 font-semibold">{formatPrice(addon.priceINR, addon.priceUSD)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-cyan-400" />
                Investment Calculation Breakdown
              </h3>

              {(() => {
                const calc = calculateInvestmentSummary({
                  planId: selectedPlanId,
                  selectedAddonIds: ["addon-seo-mastery"],
                  currency,
                });
                return (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {calc.breakdownItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                          <span className="text-zinc-400">{item.label}</span>
                          <span className="font-mono font-semibold text-white">
                            {currency === "INR" ? `₹${item.amount.toLocaleString("en-IN")}` : `$${item.amount.toLocaleString("en-US")}`}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm font-bold text-white">
                      <span>Total One-Time Investment (Gross)</span>
                      <span className="text-xl font-mono text-cyan-400">
                        {currency === "INR" ? `₹${calc.totalGrossOneTime.toLocaleString("en-IN")}` : `$${calc.totalGrossOneTime.toLocaleString("en-US")}`}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-500">
                      *Includes 18% statutory Goods & Services Tax (GST) for domestic Indian transactions. Export invoices to foreign entities are zero-rated under LUT.
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 8: AUDIT HISTORY */}
      {activeSubTab === "audit-logs" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10">
            <h3 className="text-sm font-bold text-white mb-1">Immutable Commercial Audit Trail</h3>
            <p className="text-xs text-zinc-400">
              Cryptographically verified audit trail tracking every price change, plan status alteration, and catalogue publication.
            </p>
          </div>

          <div className="space-y-2">
            {[
              { time: "2026-11-18 12:00:00", admin: "superadmin@starxalphalabs.online", action: "CATALOGUE_VERSION_PUBLISHED", detail: "Published Master Commercial Catalogue v2.0 (30 Solutions, 17 Standardized Plans)" },
              { time: "2026-11-18 11:45:12", admin: "finance@starxalphalabs.online", action: "PRICING_TIER_APPROVED", detail: "Approved Multi-Component pricing structure for StarX Web & Mobile App families" },
              { time: "2026-11-18 10:15:30", admin: "architect@starxalphalabs.online", action: "RECOMMENDATION_RULE_CREATED", detail: "Established deterministic 10-point complexity recommendation mapping" },
            ].map((log, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-zinc-900/50 border border-white/10 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-500">{log.time}</span>
                    <span className="font-semibold text-cyan-400">{log.action}</span>
                  </div>
                  <div className="text-zinc-300">{log.detail}</div>
                </div>
                <div className="text-right font-mono text-[11px] text-zinc-500">
                  {log.admin}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
