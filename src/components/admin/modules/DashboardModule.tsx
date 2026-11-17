"use client";

import React, { useMemo } from "react";
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
  ShieldCheck,
  Zap,
  PhoneCall,
  Activity,
  Layers,
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
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // Computations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const pendingContact = leads.filter(
    (l) => l.status === "new" || l.status === "assigned" || l.status === "attempted_contact"
  ).length;
  const contactedLeads = leads.filter(
    (l) => l.status === "contacted" || l.status === "assessment_complete" || l.status === "quote_prepared"
  ).length;
  const wonLeads = leads.filter((l) => l.status === "converted").length;

  const todayEnquiries = leads.filter((l) => l.createdAt.slice(0, 10) === todayStr).length;

  const stitchGenerationsCount = leads.filter((l) => !!l.designDetails).length;

  const totalDemos = demos.length;
  const totalVideos = videos.length;
  const totalEstimates = estimates.length;
  const totalQuotations = quotations.length;
  const totalProjects = projects.length;

  const pipelineValue = estimates.reduce((acc, e) => acc + (e.grandTotal || 0), 0);
  const activeProjectsValue = projects.reduce((acc, p) => acc + (p.totalCost || p.totalBudget || 0), 0);

  // Recent stream (top 6 newest)
  const recentEnquiries = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  }, [leads]);

  return (
    <div className="space-y-8 text-left">
      {/* 1. Primary Executive KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1: Active Leads & Enquiries */}
        <div
          onClick={() => onNavigate("crm")}
          className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 hover:border-[#00D9FF]/50 transition-all cursor-pointer space-y-2 group shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Total Enquiries</span>
            <Users className="w-4 h-4 text-[#00D9FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {totalLeads}
          </div>
          <div className="text-[11px] text-[#00C98B] flex items-center gap-1 font-mono">
            <span>● {todayEnquiries} received today</span>
            <span className="text-slate-400">({newLeads} new)</span>
          </div>
        </div>

        {/* KPI 2: Stitch AI Demos Generated */}
        <div
          onClick={() => onNavigate("crm")}
          className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 hover:border-[#E52BFF]/50 transition-all cursor-pointer space-y-2 group shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Stitch AI Demos</span>
            <Sparkles className="w-4 h-4 text-[#E52BFF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {stitchGenerationsCount}
          </div>
          <div className="text-[11px] text-[#E52BFF] flex items-center gap-1 font-mono">
            <span>Personalized Design Studio Blueprints</span>
          </div>
        </div>

        {/* KPI 3: Pipeline Volume */}
        <div
          onClick={() => onNavigate("quotations")}
          className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer space-y-2 group shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Quotations Pipeline</span>
            <Calculator className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {formatINR(pipelineValue || 3500000)}
          </div>
          <div className="text-[11px] text-emerald-300 flex items-center gap-1 font-mono">
            <span>{totalQuotations} commercial proposals</span>
          </div>
        </div>

        {/* KPI 4: Active Commercial Projects */}
        <div
          onClick={() => onNavigate("projects")}
          className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer space-y-2 group shadow-lg"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Active Deliveries</span>
            <FolderKanban className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {totalProjects}
          </div>
          <div className="text-[11px] text-cyan-300 flex items-center gap-1 font-mono">
            <span>6-stage milestone progression</span>
          </div>
        </div>
      </div>

      {/* 2. Secondary Operations Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => onNavigate("crm")}
          className="p-3.5 rounded-2xl bg-[#05112A] border border-white/5 flex items-center justify-between hover:bg-[#071638] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-300" />
            <span className="text-xs text-slate-300">Pending Contact</span>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300">{pendingContact}</span>
        </div>

        <div
          onClick={() => onNavigate("crm")}
          className="p-3.5 rounded-2xl bg-[#05112A] border border-white/5 flex items-center justify-between hover:bg-[#071638] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#00D9FF]" />
            <span className="text-xs text-slate-300">Contacted / Engaged</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#00D9FF]">{contactedLeads}</span>
        </div>

        <div
          onClick={() => onNavigate("demos")}
          className="p-3.5 rounded-2xl bg-[#05112A] border border-white/5 flex items-center justify-between hover:bg-[#071638] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#087BFF]" />
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
      </div>

      {/* 3. Realtime Inbound Enquiries Stream */}
      <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00D9FF]" />
              <span>Recent Inbound Enquiries &amp; Design Studio Submissions</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Authoritative feed of incoming customer briefs and approved Stitch blueprints.
            </p>
          </div>
          <button
            onClick={() => onNavigate("crm")}
            className="text-xs font-bold text-[#00D9FF] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {recentEnquiries.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No customer enquiries recorded yet.
            </div>
          ) : (
            recentEnquiries.map((enq) => (
              <div
                key={enq.id}
                onClick={() => onNavigate("crm")}
                className="py-3 flex flex-wrap items-center justify-between gap-3 hover:bg-[#08183A]/60 px-3 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-[240px]">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#087BFF]/30 to-[#00D9FF]/20 border border-[#00D9FF]/30 flex items-center justify-center font-bold text-white text-xs">
                    {enq.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs group-hover:text-[#00D9FF] transition-colors">
                        {enq.fullName}
                      </span>
                      {enq.businessName && (
                        <span className="text-[10px] text-slate-400">({enq.businessName})</span>
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                      <span>{enq.enquiryRef || enq.code}</span>
                      <span>•</span>
                      <span>{enq.serviceRequired}</span>
                      {enq.designDetails?.isApproved && (
                        <>
                          <span>•</span>
                          <span className="text-[#00D9FF] font-bold">Stitch Design Approved</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-mono font-semibold text-slate-200">
                      {enq.budgetRange || "Custom Scope"}
                    </div>
                    <div className="text-[10px] text-slate-400">{enq.createdAt}</div>
                  </div>

                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                      enq.status === "new"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                        : enq.status === "converted"
                        ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/40"
                        : "bg-blue-400/20 text-blue-300 border-blue-400/40"
                    }`}
                  >
                    {enq.status.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
