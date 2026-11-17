"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Globe, 
  Smartphone, 
  Briefcase, 
  Cloud, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  Clock, 
  Palette,
  Layers,
  Zap
} from "lucide-react";
import { CANONICAL_PLANS, GLOBAL_PLAN_ADDONS } from "@/data/plans";
import { PlanDivisionSlug } from "@/types/plans";

export function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatUSD(val: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
}

interface DivisionTabConfig {
  slug: PlanDivisionSlug;
  name: string;
  badge: string;
  icon: React.ElementType;
  accent: string;
  tagline: string;
}

const DIVISION_TABS: DivisionTabConfig[] = [
  {
    slug: "starx-web",
    name: "StarX Web",
    badge: "Websites & Portals",
    icon: Globe,
    accent: "#00D9FF",
    tagline: "High-performance corporate portals, headless storefronts & digital architecture",
  },
  {
    slug: "starx-apps",
    name: "StarX Apps",
    badge: "Mobile Engineering",
    icon: Smartphone,
    accent: "#E52BFF",
    tagline: "Branded native & cross-platform iOS & Android mobile applications",
  },
  {
    slug: "starx-business",
    name: "StarX Business",
    badge: "POS, ERP & CRM",
    icon: Briefcase,
    accent: "#FF941F",
    tagline: "Point of Sale, multi-warehouse ERP, and operational business management systems",
  },
  {
    slug: "starx-saas",
    name: "StarX SaaS",
    badge: "Subscription Products",
    icon: Cloud,
    accent: "#087BFF",
    tagline: "Multi-tenant subscription software, Stripe customer billing & workspace platforms",
  },
  {
    slug: "starx-ai",
    name: "StarX AI",
    badge: "Agents & Automation",
    icon: Sparkles,
    accent: "#873BFF",
    tagline: "Domain-grounded RAG pipelines, autonomous agentic workflows & local models",
  },
  {
    slug: "starx-custom",
    name: "StarX Custom",
    badge: "Enterprise Engineering",
    icon: Cpu,
    accent: "#FF35B8",
    tagline: "Tailored enterprise solutions, legacy system modernization & dedicated pods",
  },
];

export function PricingClient() {
  const [activeDivision, setActiveDivision] = useState<PlanDivisionSlug>("starx-web");
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const currentTab = DIVISION_TABS.find((t) => t.slug === activeDivision) || DIVISION_TABS[0];
  const plans = CANONICAL_PLANS.filter((p) => p.divisionSlug === activeDivision);

  return (
    <div className="space-y-16">
      {/* Currency Switcher & Global Guarantees */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0A1940]/60 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#00D9FF] shrink-0" />
          <span className="text-xs text-slate-300 font-medium">
            All plans include <strong>100% Code &amp; IP Ownership</strong>, milestone sign-offs, and guaranteed warranty.
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#030B24] p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setCurrency("INR")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currency === "INR"
                ? "bg-[#087BFF] text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            INR (₹) Domestic
          </button>
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currency === "USD"
                ? "bg-[#087BFF] text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            USD ($) Global
          </button>
        </div>
      </div>

      {/* 6-Division Interactive Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-2 rounded-2xl bg-[#0A1940] border border-white/10">
        {DIVISION_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeDivision === tab.slug;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActiveDivision(tab.slug)}
              className={`p-3 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? "bg-[#071638] text-white border shadow-[0_0_20px_rgba(0,217,255,0.2)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
              style={{
                borderColor: isActive ? tab.accent : undefined,
              }}
            >
              <Icon 
                className="w-5 h-5 shrink-0" 
                style={{ color: isActive ? tab.accent : undefined }} 
              />
              <span className="leading-tight text-center whitespace-nowrap">{tab.name}</span>
              <span className="text-[9px] font-mono opacity-60 hidden md:block">{tab.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Division Sub-Banner */}
      <div className="text-center space-y-2">
        <span 
          className="text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border inline-block"
          style={{
            borderColor: `${currentTab.accent}60`,
            color: currentTab.accent,
            backgroundColor: `${currentTab.accent}15`,
          }}
        >
          {currentTab.name} • {currentTab.badge}
        </span>
        <p className="text-sm text-[#C8D5EF] max-w-2xl mx-auto">
          {currentTab.tagline}
        </p>
      </div>

      {/* 4 Canonical Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isHighlight = plan.popular || plan.bestValue;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 bg-[#0A1940] border transition-all duration-300 flex flex-col justify-between relative group ${
                isHighlight
                  ? "border-[#00D9FF] shadow-[0_0_35px_rgba(0,217,255,0.22)] ring-1 ring-[#00D9FF]/40"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              {plan.badge && (
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-mono font-bold uppercase tracking-wider py-0.5 px-3 rounded-full shadow-md whitespace-nowrap"
                  style={{
                    backgroundColor: isHighlight ? currentTab.accent : "#071638",
                    border: `1px solid ${currentTab.accent}60`,
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="space-y-5">
                {/* Header Code & Timeline */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#071638] text-white border border-white/10">
                    {plan.code}
                  </span>
                  <span className="text-[11px] font-mono text-[#C8D5EF] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
                    {plan.timelineWeeks}
                  </span>
                </div>

                {/* Name & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#C8D5EF] mt-1 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    {plan.billingType === "managed_monthly" ? "Managed Monthly SLA" : "Fixed Milestone Price"}
                  </span>
                  <div className="text-2xl font-black text-white">
                    {plan.isCustomPrice && plan.priceINR === 0 ? (
                      "Custom Scope"
                    ) : (
                      currency === "INR" ? formatINR(plan.priceINR) : formatUSD(plan.priceUSD)
                    )}
                  </div>
                  <span className="text-xs font-semibold block" style={{ color: currentTab.accent }}>
                    {plan.screenOrPageScope}
                  </span>
                </div>

                {/* Platforms Badge */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {plan.supportedPlatforms.map((plat) => (
                    <span key={plat} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#030B24] text-slate-300 border border-white/5">
                      {plat}
                    </span>
                  ))}
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white block">
                    Key Deliverables:
                  </span>
                  {plan.includedFeatures.slice(0, 4).map((feat) => (
                    <div key={feat.id} className="flex items-start gap-2 text-xs text-[#C8D5EF]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0 mt-0.5" />
                      <span>{feat.name}</span>
                    </div>
                  ))}
                </div>

                {/* SLA and Warranty */}
                <div className="text-[10px] font-mono text-slate-400 bg-[#030B24] p-2.5 rounded-lg border border-white/5 space-y-1">
                  <div className="flex justify-between">
                    <span>SLA Response:</span>
                    <strong className="text-white">{plan.slaLevel}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Bug Warranty:</span>
                    <strong className="text-white">{plan.postLaunchWarrantyDays} Days Included</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-2">
                <Link
                  href={`/design-studio?division=${plan.divisionSlug}&plan=${plan.id}`}
                  className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 text-white shadow-lg hover:brightness-110 transition-all"
                  style={{
                    background: `linear-gradient(135deg, #087BFF 0%, ${currentTab.accent} 100%)`,
                  }}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Explore in Design Studio</span>
                </Link>

                <Link
                  href={`/project-calculator?division=${plan.divisionSlug}&plan=${plan.id}`}
                  className="w-full py-2 px-3 rounded-xl font-semibold text-[11px] text-center flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 transition-all border border-white/5"
                >
                  <Calculator className="w-3.5 h-3.5 text-slate-400" />
                  <span>Configure Scope</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shared Modular Add-Ons Section */}
      <div className="space-y-8 pt-8 border-t border-white/10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Modular Enhancements</span>
          <h3 className="text-2xl font-bold text-white">Verified Engineering Add-Ons</h3>
          <p className="text-xs text-[#C8D5EF]">Transparent, fixed-scope modules available across all division plans.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GLOBAL_PLAN_ADDONS.map((addon) => (
            <div
              key={addon.id}
              className="p-6 rounded-2xl bg-[#0A1940] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase text-[#00D9FF] font-bold px-2 py-0.5 rounded bg-[#00D9FF]/10">
                    {addon.category}
                  </span>
                  <div className="text-base font-extrabold text-white">
                    {currency === "INR" ? formatINR(addon.priceINR) : formatUSD(addon.priceUSD)}
                    {addon.billingPeriod === "monthly" && (
                      <span className="text-[10px] font-mono text-slate-400 font-normal"> / mo</span>
                    )}
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white">{addon.name}</h4>
                <p className="text-xs text-[#C8D5EF] leading-relaxed">{addon.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
