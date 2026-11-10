"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Globe, 
  Smartphone, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  Tag,
  Zap
} from "lucide-react";
import { 
  WEBSITE_PACKAGES, 
  APP_PACKAGES, 
  COMBO_PACKAGES, 
  DEVELOPMENT_ADDONS,
  RECURRING_SERVICES,
  formatINR,
  DivisionType
} from "@/data/developmentPackages";

export function PricingClient() {
  const [activeTab, setActiveTab] = useState<DivisionType>("website");

  const packages = activeTab === "website" 
    ? WEBSITE_PACKAGES 
    : activeTab === "app" 
    ? APP_PACKAGES 
    : COMBO_PACKAGES;

  const tabConfig = {
    website: {
      label: "Website Development",
      code: "Division A",
      accent: "from-[#087BFF] to-[#00D9FF]",
      borderActive: "border-[#00D9FF] bg-[#071638] text-white shadow-[0_0_25px_rgba(0,217,255,0.25)]",
      badgeText: "W1–W6 Packages (₹7,999 – ₹99,999+)",
      icon: Globe,
      highlightColor: "#00D9FF"
    },
    app: {
      label: "Mobile App Development",
      code: "Division B",
      accent: "from-[#873BFF] to-[#E52BFF]",
      borderActive: "border-[#E52BFF] bg-[#071638] text-white shadow-[0_0_25px_rgba(229,43,255,0.25)]",
      badgeText: "A1–A5 Packages (₹19,999 – ₹1,49,999+)",
      icon: Smartphone,
      highlightColor: "#E52BFF"
    },
    combo: {
      label: "Website + App Combo",
      code: "Division C",
      accent: "from-[#FF941F] to-[#FF35B8]",
      borderActive: "border-[#FF941F] bg-[#071638] text-white shadow-[0_0_25px_rgba(255,148,31,0.25)]",
      badgeText: "C1–C5 Suites (₹24,999 – ₹1,99,999+)",
      icon: Layers,
      highlightColor: "#FF941F"
    }
  };

  const currentTab = tabConfig[activeTab];

  return (
    <div className="space-y-16">
      {/* Interactive 3-Tab Selector Bar */}
      <div className="max-w-3xl mx-auto p-2 rounded-2xl bg-[#0A1940] border border-white/10 flex flex-col sm:flex-row gap-2">
        {(["website", "app", "combo"] as DivisionType[]).map((tabKey) => {
          const conf = tabConfig[tabKey];
          const Icon = conf.icon;
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              type="button"
              onClick={() => setActiveTab(tabKey)}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                isActive
                  ? conf.borderActive
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? conf.highlightColor : undefined }} />
              <div className="text-left">
                <span className="block leading-tight">{conf.label}</span>
                <span className="text-[10px] font-mono text-slate-400 hidden sm:block">{conf.code}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Division Sub-Banner */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#071638] border border-white/10 inline-block text-white">
          {currentTab.badgeText}
        </span>
        <p className="text-xs sm:text-sm text-[#C8D5EF] max-w-xl mx-auto">
          All packages include source code ownership, milestone staging approvals, and post-launch technical warranty.
        </p>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => {
          const isHighlight = pkg.popular || pkg.bestValue;
          return (
            <div
              key={pkg.code}
              className={`rounded-3xl p-8 bg-[#0A1940] border transition-all duration-300 flex flex-col justify-between relative group ${
                isHighlight
                  ? "border-[#00D9FF] shadow-[0_0_35px_rgba(0,217,255,0.22)] ring-1 ring-[#00D9FF]/40"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              {isHighlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-[11px] font-mono font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                  {pkg.bestValue ? "Best Value Suite" : "Most Popular Choice"}
                </div>
              )}

              <div className="space-y-6">
                {/* Header Code & Timeline */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#071638] text-white border border-white/10">
                    {pkg.code}
                  </span>
                  <span className="text-xs font-mono text-[#C8D5EF] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
                    {pkg.timeline}
                  </span>
                </div>

                {/* Name & Tagline */}
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#C8D5EF] mt-1.5 leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Real Savings Badge for Combo */}
                {pkg.savings && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FF941F]/15 border border-[#FF941F]/30 text-xs text-[#FF941F] font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Save {formatINR(pkg.savings)} with Combo!</span>
                  </div>
                )}

                {/* Platforms Badge */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {pkg.platforms.map((plat) => (
                    <span key={plat} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#071638] text-slate-300 border border-white/5">
                      {plat}
                    </span>
                  ))}
                </div>

                {/* Price Box */}
                <div className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8D5EF]">Fixed Scope Starting At</span>
                    {pkg.standaloneValue && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {formatINR(pkg.standaloneValue)}
                      </span>
                    )}
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {formatINR(pkg.startingPrice)}
                  </div>
                  <span className="text-xs text-[#00D9FF] font-medium block">
                    {pkg.pagesOrScreens}
                  </span>
                </div>

                {/* Ideal For */}
                <div className="text-xs text-slate-300 italic border-l-2 border-[#00D9FF]/60 pl-3">
                  Ideal for: {pkg.idealFor}
                </div>

                {/* Deliverables List */}
                <div className="space-y-2.5 pt-2 border-t border-white/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Deliverables Included:</span>
                  {pkg.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-[#C8D5EF]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link
                  href={`/project-calculator?division=${activeTab}&package=${pkg.code}`}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-lg hover:brightness-110 transition-all"
                >
                  <span>Configure {pkg.code} in Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Comparison Matrix Callout */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0A1940] via-[#071638] to-[#0A1940] border border-[#00D9FF]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087BFF]/20 text-xs font-mono text-[#00D9FF]">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Quotation Engine
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            Need Custom Add-ons, Extra Screens or Bespoke APIs?
          </h3>
          <p className="text-xs sm:text-sm text-[#C8D5EF]">
            Calculate the exact cost of your project in 60 seconds with our 7-step builder.
            Add payment gateways, push notifications, multitenancy, and cloud SLAs with real-time totals.
          </p>
        </div>

        <Link
          href="/project-calculator"
          className="shrink-0 px-8 py-4 rounded-xl bg-gradient-to-r from-[#087BFF] via-[#00D9FF] to-[#E52BFF] text-white font-extrabold text-xs sm:text-sm shadow-xl hover:brightness-110"
        >
          Launch Project Calculator ↗
        </Link>
      </div>

      {/* Add-ons & Hosting Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Modular Infrastructure</span>
          <h3 className="text-2xl font-bold text-white">Add-Ons &amp; Ongoing Maintenance SLAs</h3>
          <p className="text-xs text-[#C8D5EF]">Transparent recurring rates and one-time feature additions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECURRING_SERVICES.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl bg-[#0A1940] border flex flex-col justify-between space-y-4 ${
                plan.recommended ? "border-[#00D9FF] ring-1 ring-[#00D9FF]/40" : "border-white/5"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono uppercase text-[#00D9FF] font-bold">{plan.category}</span>
                  {plan.recommended && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00D9FF]/20 text-[#00D9FF]">
                      Recommended
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white">{plan.name}</h4>
                <div className="text-xl font-extrabold text-white">
                  {formatINR(plan.price)}
                  <span className="text-[10px] font-mono text-slate-400 font-normal"> / {plan.billingPeriod}</span>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-[#C8D5EF]">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
