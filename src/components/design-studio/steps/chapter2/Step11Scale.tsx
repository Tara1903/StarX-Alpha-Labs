"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Users,
  Activity,
  ShieldAlert,
  Server,
  Zap,
} from "lucide-react";

const USER_SCALE_TIERS = [
  { id: "starter", label: "< 10,000 MAU", desc: "Early-stage startup, local retail, or MVP validation" },
  { id: "growth", label: "10,000 – 100,000 MAU", desc: "Rapidly expanding commercial business or SaaS" },
  { id: "scale", label: "100,000 – 1,000,000 MAU", desc: "Regional enterprise with heavy daily user concurrency" },
  { id: "hyper", label: "1,000,000+ MAU", desc: "Global consumer app or high-throughput platform" },
];

const CONCURRENCY_TIERS = [
  { id: "standard", label: "Standard Web Traffic", desc: "Predictable HTTP requests with caching" },
  { id: "burst", label: "Burst Traffic & Flash Sales", desc: "Auto-scaling serverless queues for traffic spikes" },
  { id: "realtime", label: "High-Frequency Real-Time", desc: "Sub-millisecond WebSocket streaming & telemetry" },
];

const COMPLIANCE_TIERS = [
  { id: "standard", label: "Standard Commercial", desc: "GDPR, CCPA, and standard SOC-2 certified cloud" },
  { id: "pci", label: "PCI-DSS Level 1 Financial", desc: "Encrypted payment vaulting & tokenization" },
  { id: "hipaa", label: "HIPAA Clinical Healthcare", desc: "Encrypted PHI at rest, audit trails & BAA" },
  { id: "sovereign", label: "Sovereign & Dedicated VPC", desc: "Isolated single-tenant cloud or on-premise VPC" },
];

const UPTIME_TIERS = [
  { id: "99.9", label: "99.9% Business Hours SLA", desc: "Standard cloud automated backup and recovery" },
  { id: "99.99", label: "99.99% High Availability", desc: "Multi-Availability Zone automated instant failover" },
  { id: "99.999", label: "99.999% Mission Critical", desc: "Multi-region active-active zero-downtime clustering" },
];

export function Step11Scale() {
  const { state, setScaleRequirements, nextStep } = useDesignStudio();
  const scale = state.scaleRequirements || {
    expectedUsers: "growth",
    concurrency: "standard",
    dataSensitivity: "standard",
    availabilitySla: "99.99",
  };

  const updateScale = (key: string, value: string) => {
    setScaleRequirements({
      ...scale,
      [key]: value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 2 • Step 11 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Let's Understand the Scale of Your Project.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Technical architecture parameters define database provisioning, compute concurrency, and regulatory safeguards. No arbitrary budget sliders.
        </p>
      </div>

      {/* Grid of 4 Scale Dimensions */}
      <div className="space-y-6">
        {/* Dimension 1: Monthly Active Users */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Expected Active Monthly Users (MAU)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {USER_SCALE_TIERS.map((tier) => {
              const isSelected = scale.expectedUsers === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => updateScale("expectedUsers", tier.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                      : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{tier.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">{tier.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension 2: Concurrency */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Traffic Concurrency & Peak Demand</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {CONCURRENCY_TIERS.map((tier) => {
              const isSelected = scale.concurrency === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => updateScale("concurrency", tier.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                      : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{tier.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">{tier.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension 3: Compliance & Sensitivity */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Data Sensitivity & Regulatory Compliance</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {COMPLIANCE_TIERS.map((tier) => {
              const isSelected = scale.dataSensitivity === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => updateScale("dataSensitivity", tier.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                      : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{tier.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">{tier.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dimension 4: Availability SLA */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>High-Availability Target & Uptime SLA</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {UPTIME_TIERS.map((tier) => {
              const isSelected = scale.availabilitySla === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => updateScale("availabilitySla", tier.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,217,255,0.2)]"
                      : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{tier.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">{tier.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Scale parameters will be compiled into the architectural blueprint.</span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
        >
          <span>Continue to AI Requirement Confirmation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
