"use client";

import React from "react";
import { AdminTabId, UnifiedLead } from "../types";
import { DemoModel } from "@/types/demo";
import { Quotation } from "@/lib/quotationStore";
import { ClientProject } from "@/lib/projectStore";
import { CustomerEstimate } from "@/lib/estimateStore";
import { VideoItem } from "@/data/videos";
import { formatINR } from "@/data/developmentPackages";
import {
  Users,
  Sparkles,
  Calculator,
  FileText,
  FolderKanban,
  Globe,
  Tv,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface DashboardModuleProps {
  onNavigate: (tab: AdminTabId) => void;
  leads: UnifiedLead[];
  demoRequests: any[];
  estimates: CustomerEstimate[];
  quotations: Quotation[];
  projects: ClientProject[];
  demos: DemoModel[];
  videos: VideoItem[];
}

export function DashboardModule({
  onNavigate,
  leads,
  demoRequests,
  estimates,
  quotations,
  projects,
  demos,
  videos,
}: DashboardModuleProps) {
  // Real calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new" || l.status === "under_review").length;
  const totalDemos = demos.length;
  const totalVideos = videos.length;
  const totalEstimates = estimates.length;
  const totalQuotations = quotations.length;
  const totalProjects = projects.length;

  const pipelineValue = estimates.reduce((acc, e) => acc + (e.grandTotal || 0), 0);
  const activeProjectsValue = projects.reduce((acc, p) => acc + (p.totalCost || p.totalBudget || 0), 0);

  // Status breakdown
  const statusCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8 text-left">
      {/* 1. Top KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1: Active Leads & Enquiries */}
        <div
          onClick={() => onNavigate("crm")}
          className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 hover:border-[#00D9FF]/50 transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Leads</span>
            <Users className="w-4 h-4 text-[#00D9FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {totalLeads}
          </div>
          <div className="text-[11px] text-[#00C98B] flex items-center gap-1">
            <span>● {newLeads} awaiting review</span>
          </div>
        </div>

        {/* KPI 2: Personalized Demo Requests */}
        <div
          onClick={() => onNavigate("demo-requests")}
          className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 hover:border-[#E52BFF]/50 transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Demo Requests</span>
            <Sparkles className="w-4 h-4 text-[#E52BFF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {demoRequests.length}
          </div>
          <div className="text-[11px] text-[#E52BFF] flex items-center gap-1">
            <span>100% verified WhatsApp leads</span>
          </div>
        </div>

        {/* KPI 3: Pipeline Volume (Calculator) */}
        <div
          onClick={() => onNavigate("estimates")}
          className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Estimates Pipeline</span>
            <Calculator className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {formatINR(pipelineValue)}
          </div>
          <div className="text-[11px] text-emerald-300 flex items-center gap-1">
            <span>{totalEstimates} dynamic cost configurations</span>
          </div>
        </div>

        {/* KPI 4: Active Projects Underway */}
        <div
          onClick={() => onNavigate("projects")}
          className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Active Projects</span>
            <FolderKanban className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {totalProjects}
          </div>
          <div className="text-[11px] text-cyan-300 flex items-center gap-1">
            <span>13-stage milestone delivery</span>
          </div>
        </div>
      </div>

      {/* 2. Secondary Quick Inventory Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => onNavigate("demos")}
          className="p-3.5 rounded-2xl bg-[#05112A] border border-white/5 flex items-center justify-between hover:bg-[#071638] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#00D9FF]" />
            <span className="text-xs text-slate-300">Demo Catalog</span>
          </div>
          <span className="text-xs font-mono font-bold text-white">{totalDemos} Models</span>
        </div>

        <div
          onClick={() => onNavigate("video-station")}
          className="p-3.5 rounded-2xl bg-[#05112A] border border-white/5 flex items-center justify-between hover:bg-[#071638] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Tv className="w-4 h-4 text-[#E52BFF]" />
            <span className="text-xs text-slate-300">Video Station</span>
          </div>
          <span className="text-xs font-mono font-bold text-white">{totalVideos} Videos</span>
        </div>

        <div
          onClick={() => onNavigate("quotations")}
          className="p-3.5 rounded-2xl bg-[#05112A] border border-white/5 flex items-center justify-between hover:bg-[#071638] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#087BFF]" />
            <span className="text-xs text-slate-300">Quotations</span>
          </div>
          <span className="text-xs font-mono font-bold text-white">{totalQuotations} Formal</span>
        </div>

        <div
          onClick={() => onNavigate("pricing-packages")}
          className="p-3.5 rounded-2xl bg-[#05112A] border border-white/5 flex items-center justify-between hover:bg-[#071638] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300">Service Tiers</span>
          </div>
          <span className="text-xs font-mono font-bold text-white">16 Packages</span>
        </div>
      </div>

      {/* 3. Middle Section: Recent Leads Stream & Quick Conversion Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Recent Leads Table */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-sm font-bold text-white">Recent Enquiries &amp; Pipeline Activity</h2>
              <p className="text-[11px] text-slate-400">Incoming inquiries from Contact, Demo, and Calculator</p>
            </div>
            <button
              onClick={() => onNavigate("crm")}
              className="text-xs font-mono font-bold text-[#00D9FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-mono uppercase text-slate-400">
                  <th className="py-2.5 px-3">Lead / Request</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Requirement</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.slice(0, 5).map((l) => (
                  <tr key={l.id} className="hover:bg-[#0E2248]/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{l.businessName || l.fullName}</div>
                      <div className="text-[10px] font-mono text-slate-400">{l.code}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-200">{l.fullName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{l.phone || l.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-300 font-medium">{l.serviceRequired}</div>
                      {l.budgetRange && (
                        <div className="text-[10px] text-slate-400 font-mono">{l.budgetRange}</div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                          l.status === "new"
                            ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
                            : l.status === "under_review"
                            ? "bg-amber-400/10 text-amber-300 border-amber-400/40"
                            : l.status === "contacted"
                            ? "bg-blue-400/10 text-blue-300 border-blue-400/40"
                            : "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
                        }`}
                      >
                        {l.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onNavigate("crm")}
                        className="px-2.5 py-1 rounded-lg bg-[#00D9FF]/10 text-[#00D9FF] hover:bg-[#00D9FF]/20 font-mono text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 cols): Quick Operational Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-white border-b border-white/10 pb-3">
              Executive Shortcuts
            </h2>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate("quotations")}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#08183A] hover:bg-[#0E2248] border border-white/5 hover:border-[#00D9FF]/30 transition-all text-xs font-semibold text-white cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#00D9FF]" />
                  <span>Generate Quotation</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate("demo-requests")}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#08183A] hover:bg-[#0E2248] border border-white/5 hover:border-[#E52BFF]/30 transition-all text-xs font-semibold text-white cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#E52BFF]" />
                  <span>Review Demos ({demoRequests.length})</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate("agency-enquiries")}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#08183A] hover:bg-[#0E2248] border border-white/5 hover:border-amber-400/30 transition-all text-xs font-semibold text-white cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Agency Enquiries</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate("settings")}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#08183A] hover:bg-[#0E2248] border border-white/5 hover:border-slate-400/30 transition-all text-xs font-semibold text-white cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Business Profile Settings</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Decoupled Product Status */}
          <div className="p-5 rounded-3xl bg-[#05112A] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">STARX FLOW AI OS</span>
              <span className="px-2 py-0.5 rounded-full bg-[#00C98B]/10 text-[#00C98B] border border-[#00C98B]/30 text-[9px] font-mono">
                ONLINE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Decoupled SaaS operating system hosted at <code>starx-flow.runs-on.dev</code>. Zero shared infrastructure.
            </p>
            <a
              href="https://starx-flow.runs-on.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#00D9FF] hover:underline font-mono"
            >
              <span>Visit Target</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
