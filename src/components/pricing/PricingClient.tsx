"use client";

import React, { useState, useMemo } from "react";
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
  Zap,
  Check,
  Settings,
  Store,
  UtensilsCrossed,
  CalendarCheck,
  Dumbbell,
  GraduationCap,
  Building2,
  Truck,
  LayoutGrid,
} from "lucide-react";
import { CANONICAL_PLANS, GLOBAL_PLAN_ADDONS } from "@/data/plans";
import { CanonicalPlan, PlanDivisionSlug } from "@/types/plans";

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
  const isSubscriptionEligible = activeDivision === "starx-web" || activeDivision === "starx-apps";
  const [pricingMode, setPricingMode] = useState<"subscription" | "bespoke">(
    isSubscriptionEligible ? "subscription" : "bespoke"
  );

  const currentTab = DIVISION_TABS.find((t) => t.slug === activeDivision) || DIVISION_TABS[0];

  const plans = useMemo(() => {
    const divPlans = CANONICAL_PLANS.filter((p) => p.divisionSlug === activeDivision);
    if (!isSubscriptionEligible) return divPlans;
    if (pricingMode === "subscription") {
      const subPlans = divPlans.filter((p) => p.planType === "subscription");
      return subPlans.length > 0 ? subPlans : divPlans;
    }
    const bespokePlans = divPlans.filter((p) => p.planType === "bespoke_project" || !p.planType);
    return bespokePlans.length > 0 ? bespokePlans : divPlans;
  }, [activeDivision, pricingMode, isSubscriptionEligible]);

  // Web Subscription Feature Matrix definition matching authoritative infographic
  const webMatrixRows = [
    { label: "Pages / Screens", getter: (p: CanonicalPlan) => p.screenOrPageScope || "1–3 Pages" },
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
    { label: "Responsive (Mobile/Tablet/Desktop)", getter: () => "Yes" },
    { label: "Custom Branding (Logo, Colors, Typography)", getter: (p: CanonicalPlan) => p.tier === "basic" ? "No" : "Yes" },
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
    { label: "Contact Forms & Lead Capture", getter: () => "Yes" },
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
    { label: "Blog / News / Content Sections", getter: (p: CanonicalPlan) => p.tier === "basic" ? "No" : "Yes" },
    { label: "Authentication (Login / Signup)", getter: (p: CanonicalPlan) => ["basic", "starter", "plus"].includes(p.tier) ? "No" : "Yes" },
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
    { label: "Database & Dynamic Features", getter: (p: CanonicalPlan) => ["basic", "starter"].includes(p.tier) ? "No" : "Yes" },
    { label: "Integrations (WhatsApp, Maps, Email, etc.)", getter: (p: CanonicalPlan) => ["basic", "starter"].includes(p.tier) ? "Basic" : "Yes" },
    {
      label: "AI Features (Chatbot, Content, Search, Recommendations)",
      getter: (p: CanonicalPlan) => {
        if (["basic", "starter", "plus", "pro"].includes(p.tier)) return "No";
        if (p.tier === "elite") return "Basic AI";
        if (p.tier === "ultra") return "AI";
        if (p.tier === "ultra_max") return "Advanced AI";
        return "Optional";
      },
    },
    { label: "Performance & Speed Optimization", getter: (p: CanonicalPlan) => ["basic", "starter"].includes(p.tier) ? "Basic" : "Yes" },
    { label: "Security & SSL (HTTPS)", getter: () => "Yes" },
    { label: "Priority Support & Maintenance", getter: (p: CanonicalPlan) => p.slaLevel || "Standard" },
  ];

  // Apps Subscription Feature Matrix definition matching authoritative infographic
  const appMatrixRows = [
    { label: "Core App & Branding (Your Name, Logo, Theme)", getter: () => "Yes" },
    { label: "Industry-Specific Features (Products / Menu / Bookings / Courses, etc.)", getter: () => "Yes" },
    { label: "Orders / Bookings / Enquiries (As per app type)", getter: () => "Yes" },
    { label: "Payments Integration (UPI, Cards, Wallets, etc.)", getter: (p: CanonicalPlan) => p.tier === "basic" ? "No" : "Yes" },
    { label: "Business Dashboard (Manage content, orders, customers, etc.)", getter: (p: CanonicalPlan) => p.tier === "basic" ? "No" : "Yes" },
    { label: "Reports & Analytics", getter: (p: CanonicalPlan) => ["basic", "starter"].includes(p.tier) ? "No" : "Yes" },
    { label: "Advanced Customization (Homescreen, layouts, sections, etc.)", getter: (p: CanonicalPlan) => ["basic", "starter", "plus"].includes(p.tier) ? "No" : "Yes" },
    { label: "Liquid Glass UI & Premium Design", getter: (p: CanonicalPlan) => ["basic", "starter", "plus", "pro"].includes(p.tier) ? "No" : "Yes" },
    { label: "AI Assistant (Customer-facing, e.g. Shopping AI, Food AI, etc.)", getter: (p: CanonicalPlan) => ["ultra", "ultra_max"].includes(p.tier) ? "Yes" : "No" },
    { label: "Business AI & Automation (Sales insights, recommendations, marketing, etc.)", getter: (p: CanonicalPlan) => ["ultra", "ultra_max"].includes(p.tier) ? "Yes" : "No" },
    { label: "Priority Support", getter: (p: CanonicalPlan) => p.slaLevel || "Standard" },
  ];

  return (
    <div className="space-y-16">
      {/* Currency Switcher & Global Guarantees */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0A1940]/60 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#00D9FF] shrink-0" />
          <span className="text-xs text-slate-300 font-medium">
            All plans include <strong>Transparent Tiering</strong>, production-ready cloud deployment, and continuous security maintenance.
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
              onClick={() => {
                setActiveDivision(tab.slug);
                if (tab.slug === "starx-web" || tab.slug === "starx-apps") {
                  setPricingMode("subscription");
                } else {
                  setPricingMode("bespoke");
                }
              }}
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

      {/* Division Sub-Banner & Mode Switcher */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
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

        {/* Dual Mode Switcher for Web & Apps */}
        {isSubscriptionEligible && (
          <div className="flex justify-center pt-2">
            <div className="inline-flex p-1 bg-[#0A1940] border border-white/10 rounded-2xl shadow-xl">
              <button
                type="button"
                onClick={() => setPricingMode("subscription")}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  pricingMode === "subscription"
                    ? "bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black shadow-lg shadow-[#00D9FF]/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Monthly Subscription Plans (From ₹499/mo)</span>
              </button>
              <button
                type="button"
                onClick={() => setPricingMode("bespoke")}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  pricingMode === "bespoke"
                    ? "bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-black shadow-lg shadow-[#00D9FF]/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Bespoke Development Projects</span>
              </button>
            </div>
          </div>
        )}

        {/* Sub-strip of supported offerings */}
        {pricingMode === "subscription" && activeDivision === "starx-web" && (
          <div className="p-4 rounded-2xl bg-[#0A1940]/60 border border-white/10 max-w-5xl mx-auto space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00D9FF]">
              Website Types We Build & Host
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10">Business Websites</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10">E-commerce Stores</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10">Web Portals</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10">Dashboards & Tools</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10">Booking Platforms</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10">Membership Sites</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10">AI-Powered Web Platforms</span>
            </div>
          </div>
        )}

        {pricingMode === "subscription" && activeDivision === "starx-apps" && (
          <div className="p-4 rounded-2xl bg-[#0A1940]/60 border border-white/10 max-w-5xl mx-auto space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#E52BFF]">
              Supported App Types (Same Universal Pricing Across All Industries)
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10 flex items-center gap-1.5"><Store className="w-3.5 h-3.5 text-[#E52BFF]" /> E-commerce & Retail</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10 flex items-center gap-1.5"><UtensilsCrossed className="w-3.5 h-3.5 text-[#E52BFF]" /> Restaurant & Food</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10 flex items-center gap-1.5"><CalendarCheck className="w-3.5 h-3.5 text-[#E52BFF]" /> Booking & Appointments</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10 flex items-center gap-1.5"><Dumbbell className="w-3.5 h-3.5 text-[#E52BFF]" /> Fitness & Gym</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-[#E52BFF]" /> Education & Learning</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-[#E52BFF]" /> Real Estate & Property</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10 flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-[#E52BFF]" /> Logistics & Delivery</span>
              <span className="px-3 py-1 rounded-full bg-[#071638] border border-white/10 flex items-center gap-1.5"><LayoutGrid className="w-3.5 h-3.5 text-[#E52BFF]" /> Business & More</span>
            </div>
          </div>
        )}
      </div>

      {/* Plan Cards Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${plans.length > 4 ? "xl:grid-cols-7" : ""} gap-4`}>
        {plans.map((plan) => {
          const isHighlight = plan.popular || plan.bestValue;
          const isSub = plan.planType === "subscription";

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-5 bg-[#0A1940] border transition-all duration-300 flex flex-col justify-between relative group ${
                isHighlight
                  ? "border-[#00D9FF] shadow-[0_0_35px_rgba(0,217,255,0.22)] ring-1 ring-[#00D9FF]/40"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              {plan.badge && (
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[9px] font-mono font-bold uppercase tracking-wider py-0.5 px-2.5 rounded-full shadow-md whitespace-nowrap"
                  style={{
                    backgroundColor: isHighlight ? currentTab.accent : "#071638",
                    border: `1px solid ${currentTab.accent}60`,
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                {/* Header Code & Timeline */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#071638] text-white border border-white/10">
                    {plan.code}
                  </span>
                  <span className="text-[10px] font-mono text-[#C8D5EF] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#00D9FF]" />
                    {plan.timelineWeeks}
                  </span>
                </div>

                {/* Name & Tagline */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#00D9FF] transition-colors leading-tight">
                    {plan.name}
                  </h3>
                  <p className="text-[11px] text-[#C8D5EF] mt-1 line-clamp-2 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-3.5 rounded-xl bg-[#071638] border border-white/5 space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                    {isSub ? "Monthly Subscription" : (plan.billingType === "managed_monthly" ? "Managed Monthly SLA" : "Fixed Milestone Price")}
                  </span>
                  <div className="text-xl font-black text-white">
                    {plan.isCustomPrice && plan.priceINR === 0 ? (
                      "Custom Scope"
                    ) : (
                      currency === "INR" 
                        ? `${formatINR(plan.priceINR)}${isSub ? "/mo" : ""}`
                        : `${formatUSD(plan.priceUSD)}${isSub ? "/mo" : ""}`
                    )}
                  </div>
                  <span className="text-[11px] font-semibold block" style={{ color: currentTab.accent }}>
                    {isSub ? "+ ₹1,499 setup" : plan.screenOrPageScope}
                  </span>
                </div>

                {/* Scope Allowance */}
                <div className="text-[11px] text-slate-300 font-medium">
                  Scope: <strong className="text-white">{plan.screenOrPageScope}</strong>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white block">
                    Included Highlights:
                  </span>
                  {plan.includedFeatures.slice(0, 3).map((feat) => (
                    <div key={feat.id} className="flex items-start gap-1.5 text-[11px] text-[#C8D5EF]">
                      <CheckCircle2 className="w-3 h-3 text-[#00C98B] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat.name}</span>
                    </div>
                  ))}
                </div>

                {/* SLA and Warranty */}
                <div className="text-[9px] font-mono text-slate-400 bg-[#030B24] p-2 rounded-lg border border-white/5 space-y-0.5">
                  <div className="flex justify-between">
                    <span>SLA:</span>
                    <strong className="text-white">{plan.slaLevel}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Warranty:</span>
                    <strong className="text-white">{plan.postLaunchWarrantyDays} Days</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2">
                <Link
                  href={`/design-studio?division=${plan.divisionSlug}&plan=${plan.id}`}
                  className="w-full py-2 px-3 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-1.5 text-white shadow-lg hover:brightness-110 transition-all"
                  style={{
                    background: `linear-gradient(135deg, #087BFF 0%, ${currentTab.accent} 100%)`,
                  }}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>Choose in Studio</span>
                </Link>

                <Link
                  href={`/project-calculator?division=${plan.divisionSlug}&plan=${plan.id}`}
                  className="w-full py-1.5 px-3 rounded-xl font-semibold text-[10px] text-center flex items-center justify-center gap-1 bg-white/5 hover:bg-white/10 text-slate-300 transition-all border border-white/5"
                >
                  <Calculator className="w-3 h-3 text-slate-400" />
                  <span>Configure Scope</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Authoritative Feature Comparison Matrix for Subscriptions */}
      {pricingMode === "subscription" && isSubscriptionEligible && (
        <div className="space-y-6 pt-12 border-t border-white/10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D9FF]">
              Comprehensive Breakdown
            </span>
            <h3 className="text-3xl font-extrabold text-white">
              {activeDivision === "starx-apps" ? "Apps Subscription Plans & Feature Offerings" : "Website Plans & Feature Comparison Matrix"}
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Compare features, technical boundaries, and SLA support levels across all 7 subscription tiers.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0A1940]/90 shadow-2xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#071638] font-semibold text-slate-300">
                  <th className="p-4 sticky left-0 bg-[#071638] z-10 min-w-[220px]">Features</th>
                  {plans.map((p) => (
                    <th key={p.id} className="p-4 font-mono text-center min-w-[130px]">
                      <div className="font-bold text-white text-sm">{p.name.replace("StarX Web ", "").replace("StarX App ", "")}</div>
                      <div className="text-[#00D9FF] font-bold mt-0.5">
                        {currency === "INR" ? `₹${p.priceINR.toLocaleString("en-IN")}/mo` : `$${p.priceUSD.toLocaleString("en-US")}/mo`}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {(activeDivision === "starx-apps" ? appMatrixRows : webMatrixRows).map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-semibold text-white sticky left-0 bg-[#0A1940]/95 backdrop-blur-md">
                      {row.label}
                    </td>
                    {plans.map((p) => {
                      const val = row.getter(p);
                      const isYes = val === "Yes";
                      const isNo = val === "No";

                      return (
                        <td key={p.id} className="p-4 text-center font-mono">
                          {isYes ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          ) : isNo ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-slate-600">
                              —
                            </span>
                          ) : (
                            <span className="text-[#00D9FF] font-medium text-xs">{val}</span>
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
            <div className="p-5 rounded-2xl bg-[#0A1940] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#00D9FF] text-xs font-bold">
                <Settings className="w-4 h-4" />
                <span>One-Time Initial Setup</span>
              </div>
              <p className="text-sm text-white font-bold">Starts from ₹1,499</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Branding configuration, template personalization, initial content staging, testing, and dedicated technical onboarding.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1940] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#00D9FF] text-xs font-bold">
                <Globe className="w-4 h-4" />
                <span>{activeDivision === "starx-apps" ? "Google Play Publishing" : "Domain & Hosting"}</span>
              </div>
              <p className="text-sm text-white font-bold">
                {activeDivision === "starx-apps" ? "₹2,999 per app" : "Generic Vercel domain included"}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeDivision === "starx-apps"
                  ? "StarX handles app bundle signing, store assets, and Play Console submission (Google's $25 developer account fee paid directly to Google)."
                  : "Includes generic Vercel domain (yourapp.vercel.app); Plus and higher plans support custom domains (.com, .in)."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1940] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#00D9FF] text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Ongoing Support & Security</span>
              </div>
              <p className="text-sm text-white font-bold">Included in All Plans</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Regular software updates, active bug fixes, continuous security monitoring, and uptime management included.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A1940] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[#00D9FF] text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Optional Modular Add-ons</span>
              </div>
              <p className="text-sm text-white font-bold">Custom Expandability</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Expand limits, add WhatsApp automated bots, SEO schema graph, or custom payment gateways as your business grows.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shared Modular Add-Ons Section */}
      <div className="space-y-8 pt-8 border-t border-white/10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Modular Enhancements</span>
          <h3 className="text-2xl font-bold text-white">Verified Engineering Add-Ons</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Layer modular architectural capabilities onto any plan to meet specialized regulatory, scale, or integration requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GLOBAL_PLAN_ADDONS.slice(0, 8).map((addon) => (
            <div
              key={addon.id}
              className="p-5 rounded-2xl bg-[#0A1940] border border-white/10 space-y-3 flex flex-col justify-between hover:border-[#00D9FF]/40 transition-all"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#071638] text-[#00D9FF] border border-white/10">
                  {addon.category}
                </span>
                <h4 className="text-sm font-bold text-white leading-tight">{addon.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{addon.description}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">
                  {currency === "INR" ? formatINR(addon.priceINR) : formatUSD(addon.priceUSD)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {addon.billingPeriod === "monthly" ? "/month" : "one-time"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
