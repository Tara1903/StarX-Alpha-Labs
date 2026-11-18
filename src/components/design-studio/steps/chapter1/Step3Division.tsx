"use client";

import React from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import { DivisionSlug } from "../../types";
import {
  Globe,
  Smartphone,
  Briefcase,
  Layers,
  Cpu,
  Terminal,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface DivisionCard {
  id: DivisionSlug;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  examples: string[];
  gradient: string;
  accentBorder: string;
}

const DIVISIONS: DivisionCard[] = [
  {
    id: "starx-web",
    title: "StarX Web",
    badge: "Fastest Growth",
    tagline: "High-Performance Web Platforms",
    description: "Next.js applications, responsive customer portals, dynamic marketing engines, and enterprise web apps.",
    icon: Globe,
    examples: ["SaaS Landing & Portals", "E-Commerce Engines", "Client Portals", "Interactive Web Apps"],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentBorder: "border-cyan-500/40 hover:border-cyan-400",
  },
  {
    id: "starx-apps",
    title: "StarX Apps",
    badge: "iOS & Android",
    tagline: "Native & Cross-Platform Mobile",
    description: "Fluid React Native and Flutter mobile applications with offline-first persistence, push notifications, and biometric auth.",
    icon: Smartphone,
    examples: ["Customer Mobile Apps", "Service & Delivery Apps", "Marketplace Apps", "B2B Field Apps"],
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accentBorder: "border-blue-500/40 hover:border-blue-400",
  },
  {
    id: "starx-business",
    title: "StarX Business",
    badge: "Mission Critical",
    tagline: "Point of Sale & Business Operations",
    description: "Real-time billing, offline POS terminals, warehouse inventory tracking, CRM, and end-to-end operational software.",
    icon: Briefcase,
    examples: ["Cloud & Offline POS", "Inventory Management", "Multi-Store Retail", "Restaurant Systems"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentBorder: "border-emerald-500/40 hover:border-emerald-400",
  },
  {
    id: "starx-saas",
    title: "StarX SaaS",
    badge: "Scalable Cloud",
    tagline: "Multi-Tenant Cloud Platforms",
    description: "Subscription billing architectures, multi-tenant database isolation, usage metering, and developer API backends.",
    icon: Layers,
    examples: ["Workflow Automation", "Analytics Dashboards", "Team Productivity Tools", "Subscription Billing"],
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    accentBorder: "border-purple-500/40 hover:border-purple-400",
  },
  {
    id: "starx-ai",
    title: "StarX AI",
    badge: "Next-Gen Intelligence",
    tagline: "Autonomous Agents & LLM Systems",
    description: "Fine-tuned models, autonomous multi-agent swarms, RAG document search engines, voice agents, and predictive automation.",
    icon: Cpu,
    examples: ["Autonomous Agents", "Enterprise RAG Search", "Voice & Chat Copilots", "Vision & OCR Pipelines"],
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    accentBorder: "border-pink-500/40 hover:border-pink-400",
  },
  {
    id: "starx-custom",
    title: "StarX Custom",
    badge: "Enterprise Bespoke",
    tagline: "Tailored Architecture & Engineering",
    description: "Low-level system integrations, hardware IoT gateways, custom cryptographic protocols, and large-scale legacy modernization.",
    icon: Terminal,
    examples: ["High-Frequency Systems", "IoT & Hardware Gateways", "Bespoke Protocols", "Custom Migrations"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentBorder: "border-amber-500/40 hover:border-amber-400",
  },
];

export function Step3Division() {
  const { state, setDivision, nextStep } = useDesignStudio();
  const selectedPrimary = state.primaryDivision;
  const supporting = state.supportingDivisions || [];

  const handleSelectPrimary = (divisionId: DivisionSlug) => {
    setDivision(divisionId, supporting.filter((id) => id !== divisionId));
  };

  const handleToggleSupporting = (divisionId: DivisionSlug, e: React.MouseEvent) => {
    e.stopPropagation();
    if (divisionId === selectedPrimary) return;

    if (supporting.includes(divisionId)) {
      setDivision(selectedPrimary, supporting.filter((id) => id !== divisionId));
    } else {
      setDivision(selectedPrimary, [...supporting, divisionId]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 1 • Step 3 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          What Would You Like to Build?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Choose your primary StarX division to configure the engineering architecture, plan catalogue, and Google Stitch design system for your project.
        </p>
      </div>

      {/* 6 Division Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DIVISIONS.map((division) => {
          const isPrimary = selectedPrimary === division.id;
          const isSupporting = supporting.includes(division.id);
          const Icon = division.icon;

          return (
            <div
              key={division.id}
              onClick={() => handleSelectPrimary(division.id)}
              className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border backdrop-blur-xl ${
                isPrimary
                  ? `bg-gradient-to-b ${division.gradient} border-cyan-400 shadow-[0_0_30px_rgba(0,217,255,0.25)] ring-1 ring-cyan-400`
                  : isSupporting
                  ? "bg-white/[0.04] border-cyan-500/40 ring-1 ring-cyan-500/20"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              {/* Header inside card */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isPrimary
                        ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,217,255,0.5)]"
                        : "bg-white/5 text-zinc-300 border border-white/10"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isPrimary
                        ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30"
                        : "bg-white/5 text-zinc-400 border border-white/10"
                    }`}
                  >
                    {division.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {division.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400/80 mt-0.5">
                    {division.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {division.description}
                  </p>
                </div>

                {/* Examples */}
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Popular Solutions:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {division.examples.map((ex, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-zinc-300"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selection indicator & Supporting toggle */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                      isPrimary
                        ? "bg-cyan-400 text-black font-bold"
                        : "border border-zinc-600 group-hover:border-zinc-400"
                    }`}
                  >
                    {isPrimary && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-semibold text-zinc-300">
                    {isPrimary ? "Primary Division" : "Select Primary"}
                  </span>
                </div>

                {isPrimary ? (
                  <span className="text-[11px] text-cyan-400 font-mono">Active</span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleToggleSupporting(division.id, e)}
                    className={`text-[11px] px-2 py-1 rounded transition-colors ${
                      isSupporting
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isSupporting ? "+ Supporting Active" : "+ Add Supporting"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Selected: <strong className="text-white">{DIVISIONS.find((d) => d.id === selectedPrimary)?.title}</strong>
            {supporting.length > 0 && ` + ${supporting.length} Supporting`}
          </span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
        >
          <span>Continue to Industry Selection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
