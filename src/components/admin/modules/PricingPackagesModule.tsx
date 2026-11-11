"use client";

import React, { useState } from "react";
import {
  WEBSITE_PACKAGES,
  APP_PACKAGES,
  COMBO_PACKAGES,
  DEVELOPMENT_ADDONS,
  formatINR,
  DivisionType,
  DevelopmentPackage,
} from "@/data/developmentPackages";
import { Quotation } from "@/lib/quotationStore";
import { ClientProject, ProjectStage, PROJECT_STAGES } from "@/lib/projectStore";
import { CustomerEstimate } from "@/lib/estimateStore";
import {
  Tag,
  FileText,
  FolderKanban,
  Calculator,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit3,
} from "lucide-react";

interface PricingPackagesModuleProps {
  estimates: CustomerEstimate[];
  quotations: Quotation[];
  projects: ClientProject[];
  onConvertEstimate: (est: CustomerEstimate) => void;
  onAdvanceProjectStage: (projectId: string, newStage: ProjectStage) => void;
  onShowToast: (msg: string) => void;
}

export function PricingPackagesModule({
  estimates,
  quotations,
  projects,
  onConvertEstimate,
  onAdvanceProjectStage,
  onShowToast,
}: PricingPackagesModuleProps) {
  const [subTab, setSubTab] = useState<"packages" | "quotations" | "projects" | "estimates">("packages");
  const [division, setDivision] = useState<DivisionType>("website");

  const currentPackages: DevelopmentPackage[] =
    division === "website"
      ? WEBSITE_PACKAGES
      : division === "app"
      ? APP_PACKAGES
      : COMBO_PACKAGES;

  return (
    <div className="space-y-6 text-left">
      {/* 1. Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        {[
          { id: "packages", label: "Official Tier Packages (W/A/C)", icon: Tag },
          { id: "estimates", label: `Calculator Estimates (${estimates.length})`, icon: Calculator },
          { id: "quotations", label: `Quotations Hub (${quotations.length})`, icon: FileText },
          { id: "projects", label: `Active Projects (${projects.length})`, icon: FolderKanban },
        ].map((t) => {
          const Icon = t.icon;
          const isSelected = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-md shadow-[#087BFF]/30"
                  : "bg-[#071638] text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. SUBTAB: PACKAGES */}
      {subTab === "packages" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            {[
              { id: "website", label: "Website Development (W1–W6)" },
              { id: "mobile", label: "Mobile Apps (A1–A5)" },
              { id: "combo", label: "Website + App Combos (C1–C5)" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDivision(d.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  division === d.id
                    ? "bg-[#00D9FF] text-[#030B24]"
                    : "bg-[#071638] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPackages.map((pkg) => (
              <div
                key={pkg.code}
                className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-extrabold text-[#00D9FF]">
                      {pkg.code}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {pkg.timeline}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{pkg.name}</h3>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {formatINR(pkg.startingPrice)}
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {pkg.idealFor}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs">
                  {pkg.features.slice(0, 4).map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SUBTAB: ESTIMATES */}
      {subTab === "estimates" && (
        <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Estimate #</th>
                <th className="py-3 px-4">Client &amp; Business</th>
                <th className="py-3 px-4">Package &amp; Division</th>
                <th className="py-3 px-4">Subtotal / Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {estimates.map((est) => (
                <tr key={est.id} className="hover:bg-[#0E2248]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    {est.estimateNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{est.clientBusiness}</div>
                    <div className="text-[11px] text-slate-300">{est.clientName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{est.clientPhone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200 font-medium">{est.packageCode} — {est.packageName}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-mono">{est.division}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-bold text-white">{formatINR(est.grandTotal)}</div>
                    <div className="text-[10px] text-slate-400">GST: {formatINR(est.gstAmount)}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[9px] uppercase border border-emerald-500/30">
                      {est.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onConvertEstimate(est)}
                      className="px-3 py-1.5 rounded-xl bg-[#00D9FF] hover:bg-white text-[#030B24] font-bold text-[10px] transition-colors cursor-pointer"
                    >
                      Convert to Quotation →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. SUBTAB: QUOTATIONS */}
      {subTab === "quotations" && (
        <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Quote #</th>
                <th className="py-3 px-4">Client &amp; Solution</th>
                <th className="py-3 px-4">Timeline / Schedule</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {quotations.map((q) => (
                <tr key={q.id} className="hover:bg-[#0E2248]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#087BFF]">
                    {q.quotationNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{q.clientBusiness || q.clientName}</div>
                    <div className="text-[11px] text-slate-300">{q.selectedSolution}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200">{q.deliveryTimeline}</div>
                    <div className="text-[10px] text-slate-400">{q.paymentSchedule}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {formatINR(q.totalAmount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 font-mono text-[9px] uppercase border border-blue-500/30">
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. SUBTAB: PROJECTS */}
      {subTab === "projects" && (
        <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Project #</th>
                <th className="py-3 px-4">Client &amp; Title</th>
                <th className="py-3 px-4">Current Milestone Stage</th>
                <th className="py-3 px-4">Financials</th>
                <th className="py-3 px-4 text-right">Advance Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => {
                const currentIdx = PROJECT_STAGES.indexOf(p.currentStage);
                const nextStage = PROJECT_STAGES[currentIdx + 1];

                return (
                  <tr key={p.id} className="hover:bg-[#0E2248]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                      {p.projectCode}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{p.projectName}</div>
                      <div className="text-[11px] text-slate-400">{p.clientBusiness} ({p.clientName})</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00D9FF]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{p.currentStage}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Stage {currentIdx + 1} of {PROJECT_STAGES.length} • {p.progressPercent}%
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-white">{formatINR(p.totalBudget)}</div>
                      <div className="text-[10px] text-emerald-400">Status: {p.status}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {nextStage ? (
                        <button
                          onClick={() => {
                            onAdvanceProjectStage(p.id, nextStage);
                            onShowToast(`Advanced ${p.projectCode} to ${nextStage}`);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#087BFF] hover:bg-[#00D9FF] hover:text-[#030B24] text-white font-bold text-[10px] transition-colors cursor-pointer"
                        >
                          → {nextStage}
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-emerald-400">Completed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
