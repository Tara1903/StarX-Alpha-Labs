"use client";

import React from "react";
import { UnifiedLead } from "../types";
import { CustomerEstimate } from "@/lib/estimateStore";
import { Quotation } from "@/lib/quotationStore";
import { DemoModel } from "@/types/demo";
import { formatINR } from "@/data/developmentPackages";
import {
  FileSpreadsheet,
  Download,
  TrendingUp,
  Users,
  Sparkles,
  PieChart,
  BarChart2,
} from "lucide-react";

interface ReportsModuleProps {
  leads: UnifiedLead[];
  estimates: CustomerEstimate[];
  quotations: Quotation[];
  demos: DemoModel[];
  onShowToast: (msg: string) => void;
}

export function ReportsModule({
  leads,
  estimates,
  quotations,
  demos,
  onShowToast,
}: ReportsModuleProps) {
  // Compute breakdowns
  const sourceBreakdown = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.source] = (acc[l.source] || 0) + 1;
    return acc;
  }, {});

  const statusBreakdown = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});

  const totalQuotedAmount = quotations.reduce((acc, q) => acc + (q.totalAmount || 0), 0);
  const totalPipelineAmount = estimates.reduce((acc, e) => acc + (e.grandTotal || 0), 0);

  const downloadJsonReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      platform: "StarX Alpha Labs Super Admin",
      summary: {
        totalLeads: leads.length,
        totalEstimates: estimates.length,
        totalQuotations: quotations.length,
        totalQuotedAmount,
        totalPipelineAmount,
        demoModelsActive: demos.length,
      },
      sources: sourceBreakdown,
      statuses: statusBreakdown,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `starx_executive_report_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast("Downloaded complete Executive Report (JSON).");
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Header & Download */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-purple-400" />
            <span>Operational &amp; Business Intelligence Reports</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Real data aggregations for executive decision-making and pipeline auditing
          </p>
        </div>

        <button
          onClick={downloadJsonReport}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold shadow-md shadow-[#087BFF]/30 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Executive Report</span>
        </button>
      </div>

      {/* 2. Key Intelligence Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400">Pipeline Inflow</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            {formatINR(totalPipelineAmount)}
          </div>
          <p className="text-xs text-slate-300">
            Generated from {estimates.length} interactive customer calculator submissions
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400">Issued Quotations</span>
          <div className="text-2xl font-extrabold text-[#087BFF] font-mono">
            {formatINR(totalQuotedAmount)}
          </div>
          <p className="text-xs text-slate-300">
            Across {quotations.length} formal commercial contracts with 50/30/20 milestone schedule
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400">Catalog Surface</span>
          <div className="text-2xl font-extrabold text-[#E52BFF] font-mono">
            {demos.length} Demos
          </div>
          <p className="text-xs text-slate-300">
            Across 12 verified industry verticals with 100% functional live stages
          </p>
        </div>
      </div>

      {/* 3. Distribution Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Distribution */}
        <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase font-mono border-b border-white/10 pb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#00D9FF]" />
            <span>Inbound Lead Source Distribution</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(sourceBreakdown).map(([src, count]) => {
              const pct = Math.round((count / (leads.length || 1)) * 100);
              return (
                <div key={src} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 uppercase">{src}</span>
                    <span className="text-white font-bold">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#087BFF] to-[#00D9FF] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Pipeline Distribution */}
        <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase font-mono border-b border-white/10 pb-3 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#E52BFF]" />
            <span>Workflow Status Pipeline</span>
          </h3>

          <div className="space-y-3">
            {Object.entries(statusBreakdown).map(([st, count]) => {
              const pct = Math.round((count / (leads.length || 1)) * 100);
              return (
                <div key={st} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 uppercase">{st.replace("_", " ")}</span>
                    <span className="text-white font-bold">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#873BFF] to-[#E52BFF] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
