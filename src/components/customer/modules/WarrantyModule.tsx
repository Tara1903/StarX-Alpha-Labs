"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  LifeBuoy, 
  ArrowRight,
  Zap,
  PhoneCall
} from "lucide-react";
import { formatINR } from "@/data/developmentPackages";

interface WarrantyModuleProps {
  onNavigateTab?: (tab: string, contextId?: string) => void;
}

export function WarrantyModule({ onNavigateTab }: WarrantyModuleProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("essential");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
            Hypercare, SLA Protection &amp; Long-Term Care
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1">Warranty &amp; Maintenance</h2>
          <p className="text-xs text-[#C8D5EF] mt-1">
            Track your 30-Day Post-Launch Hypercare Warranty scope and explore continuous maintenance SLA tiers.
          </p>
        </div>

        {onNavigateTab && (
          <button
            type="button"
            onClick={() => onNavigateTab("support")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-extrabold text-xs shadow-lg shadow-[#087BFF]/30 hover:brightness-110 shrink-0 cursor-pointer"
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Open Warranty Support Ticket ↗</span>
          </button>
        )}
      </div>

      {/* 30-Day Warranty Tracker Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-[#00D9FF]/30 shadow-2xl space-y-6">
        <div className="flex flex-wrap justify-between items-start gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-[#00D9FF] uppercase">Standard Kickoff Commitment</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00C98B]/20 text-[#00C98B] border border-[#00C98B]/40 font-mono text-[10px] font-bold uppercase">
                Active Guarantee Coverage
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">30-Day Post-Launch Hypercare Warranty</h3>
            <p className="text-xs text-slate-400">
              Project: <strong className="text-white">STARX-PRJ-2026-000101</strong> (Nexus Logistics Hub)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071638] border border-white/10 text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Warranty Period</span>
            <span className="font-mono font-extrabold text-lg text-[#00C98B]">30 Calendar Days</span>
            <span className="text-[10px] text-slate-400 block">Commences upon Final Handover</span>
          </div>
        </div>

        {/* Coverage Scope Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          {/* Included in Warranty */}
          <div className="p-5 rounded-2xl bg-[#071638] border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Included in 30-Day Warranty (Free)</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C98B] mt-1.5 shrink-0" />
                <span>Fixing code defects and regression bugs in approved specification features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C98B] mt-1.5 shrink-0" />
                <span>Server runtime configuration errors and environment variable mismatches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C98B] mt-1.5 shrink-0" />
                <span>Payment gateway webhook signature discrepancies or callback drops</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C98B] mt-1.5 shrink-0" />
                <span>Mobile responsive rendering glitches on verified browsers and screen sizes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C98B] mt-1.5 shrink-0" />
                <span>Emergency patch deployments within 4-12 hours during business operations</span>
              </li>
            </ul>
          </div>

          {/* Excluded from Warranty */}
          <div className="p-5 rounded-2xl bg-[#071638] border border-rose-500/20 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Excluded (Covered via CR or Ongoing SLA)</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>Brand-new feature additions or new screens not in the approved proposal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>Third-party upstream service outages (e.g. AWS/Supabase regional outages, SMS gateway downtime)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>Modifications or deletions performed by external third-party developers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span>Design system revamps or aesthetic overhauls requested post-handover</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ongoing Maintenance SLA Tiers */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
            Continuous Operation
          </span>
          <h3 className="text-xl font-extrabold text-white mt-1">Ongoing Maintenance &amp; SLA Support Plans</h3>
          <p className="text-xs text-[#C8D5EF] mt-0.5">
            Maintain high availability, automated security patching, database optimization, and priority emergency engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: "essential",
              name: "Essential Care SLA",
              price: 2999,
              desc: "Ideal for stable business websites and corporate portals needing routine patching and backups.",
              features: [
                "Daily automated database backups & restore tests",
                "Next.js & Supabase security vulnerability updates",
                "12-hour ticket response time SLA",
                "Uptime monitoring & SSL renewal management"
              ]
            },
            {
              id: "growth",
              name: "Growth & Scaling SLA",
              price: 7999,
              popular: true,
              desc: "For transactional web & mobile platforms requiring rapid response and monthly feature iterations.",
              features: [
                "Up to 10 hours monthly feature tweaks or additions",
                "4-hour critical incident response time SLA",
                "Continuous performance & query latency audits",
                "Dedicated WhatsApp engineering support group"
              ]
            },
            {
              id: "enterprise",
              name: "Enterprise 24/7 Dedicated SLA",
              price: 19999,
              desc: "Mission-critical infrastructure requiring 1-hour emergency escalation and continuous architectural oversight.",
              features: [
                "1-hour round-the-clock emergency response",
                "Dedicated Named Lead Architect",
                "Weekly agile sprint cycles & capacity planning",
                "Multi-region failover testing & zero-downtime deploys"
              ]
            }
          ].map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all ${
                plan.popular
                  ? "bg-[#0A1940] border-[#00D9FF] ring-1 ring-[#00D9FF] shadow-xl shadow-[#087BFF]/20"
                  : "bg-[#0A1940]/60 border-white/5 hover:border-white/20"
              }`}
            >
              <div className="space-y-3">
                {plan.popular && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-mono text-[10px] font-extrabold uppercase tracking-wider inline-block">
                    Recommended SLA
                  </span>
                )}
                <div>
                  <h4 className="text-base font-extrabold text-white">{plan.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{plan.desc}</p>
                </div>
                <div className="pt-2">
                  <span className="text-2xl font-extrabold text-[#00D9FF] font-mono">{formatINR(plan.price)}</span>
                  <span className="text-xs text-slate-400 font-mono"> / month</span>
                </div>
                <ul className="space-y-2 pt-3 border-t border-white/5 text-xs text-slate-300">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/919630937033?text=${encodeURIComponent(
                  `Hi StarX Alpha Labs, I would like to activate the ${plan.name} (${formatINR(plan.price)}/mo) for my project.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#087BFF] via-[#00D9FF] to-[#E52BFF] text-white shadow-lg shadow-[#087BFF]/30 hover:brightness-110"
                    : "bg-[#071638] hover:bg-[#0c2254] text-white border border-white/10"
                }`}
              >
                <span>Activate SLA via Consultant →</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
