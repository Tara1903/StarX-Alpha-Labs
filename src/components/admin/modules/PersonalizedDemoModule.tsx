"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Search,
  Filter,
  ExternalLink,
  CheckCircle2,
  Clock,
  PhoneCall,
  Mail,
  Building,
  ArrowRight,
  Download,
  Activity,
  RefreshCw,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Layers,
  Cpu,
} from "lucide-react";

interface PersonalizedDemoModuleProps {
  requests: any[];
  onUpdateStatus: (id: string, status: string) => void;
  onShowToast: (msg: string) => void;
}

export function PersonalizedDemoModule({
  requests,
  onUpdateStatus,
  onShowToast,
}: PersonalizedDemoModuleProps) {
  const [activeSubTab, setActiveSubTab] = useState<"customer-demos" | "generation-jobs">("customer-demos");
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  // Background Forge jobs
  const [forgeJobs, setForgeJobs] = useState<any[]>([]);
  const [healthStatus, setHealthStatus] = useState<any | null>(null);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);

  // Load jobs and health status on mount
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoadingJobs(true);
        const [jobsRes, healthRes] = await Promise.all([
          fetch("/api/admin/forge/jobs").catch(() => null),
          fetch("/api/admin/forge/health").catch(() => null),
        ]);

        if (jobsRes && jobsRes.ok) {
          const jd = await jobsRes.json();
          if (jd.jobs) setForgeJobs(jd.jobs);
        }

        if (healthRes && healthRes.ok) {
          const hd = await healthRes.json();
          if (hd.checks) setHealthStatus(hd.checks);
        }
      } catch {
        // Fallback gracefully
      } finally {
        setIsLoadingJobs(false);
      }
    }
    loadData();
  }, []);

  const handleRetryJob = async (jobId: string) => {
    try {
      onShowToast(`Dispatched retry request for job ${jobId}...`);
      const res = await fetch("/api/admin/forge/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, action: "retry" }),
      });
      if (res.ok) {
        onShowToast(`Job ${jobId} re-queued for execution!`);
        // Refresh jobs list
        const r = await fetch("/api/admin/forge/jobs");
        const d = await r.json();
        if (d.jobs) setForgeJobs(d.jobs);
      } else {
        onShowToast(`Failed to retry job ${jobId}`);
      }
    } catch {
      onShowToast(`Network error attempting to retry job.`);
    }
  };

  const filteredCustomerDemos = requests.filter((r) => {
    const code = r.enquiryRef || r.requestCode || r.code || "";
    const name = r.fullName || "";
    const biz = r.businessName || "";
    const phone = r.phone || "";

    const matchesSearch =
      !search.trim() ||
      code.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      biz.toLowerCase().includes(search.toLowerCase()) ||
      phone.includes(search);

    const matchesIndustry = industryFilter === "all" || r.industry === industryFilter;
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;

    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const uniqueIndustries = Array.from(
    new Set(requests.map((r) => r.industry).filter(Boolean))
  );

  return (
    <div className="space-y-6 text-left">
      {/* 1. Header & System Health Bar */}
      <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E52BFF]" />
              <span>Personalized AI Demo &amp; Stitch Generation Studio</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Monitor customer demo requests, inspect generated Stitch artifacts, verify worker status, and audit unsubmitted drafts.
            </p>
          </div>

          {/* Health Status Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Stitch API: Configured</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Worker: Ready</span>
            </span>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/10">
          <button
            onClick={() => setActiveSubTab("customer-demos")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === "customer-demos"
                ? "bg-[#E52BFF] text-white shadow-md shadow-[#E52BFF]/30"
                : "bg-[#08183A] text-slate-400 hover:text-white border border-white/10"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer AI Demos ({requests.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("generation-jobs")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === "generation-jobs"
                ? "bg-[#00D9FF] text-[#030B24] shadow-md shadow-[#00D9FF]/30"
                : "bg-[#08183A] text-slate-400 hover:text-white border border-white/10"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Generation Worker Jobs ({forgeJobs.length})</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: CUSTOMER AI DEMOS */}
      {activeSubTab === "customer-demos" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="p-4 rounded-3xl bg-[#071638]/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
              <div className="relative min-w-[200px] flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search code, client, phone, business..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E52BFF]"
                />
              </div>

              {uniqueIndustries.length > 0 && (
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#E52BFF]"
                >
                  <option value="all">All Industries ({uniqueIndustries.length})</option>
                  {uniqueIndustries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              )}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#E52BFF]"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Won / Approved</option>
              </select>
            </div>

            <span className="text-xs font-mono text-slate-400">
              Showing {filteredCustomerDemos.length} requests
            </span>
          </div>

          {/* Demos Table */}
          <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                    <th className="py-3 px-4">Demo Reference</th>
                    <th className="py-3 px-4">Client &amp; Business</th>
                    <th className="py-3 px-4">Industry &amp; Platform</th>
                    <th className="py-3 px-4">Stitch Prototype Details</th>
                    <th className="py-3 px-4">Privacy State</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCustomerDemos.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No customer demos matching current criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomerDemos.map((req) => {
                      const cleanPhone = (req.phone || "").replace(/[^0-9]/g, "");
                      const waUrl = `https://wa.me/${cleanPhone}`;
                      const isSubmitted = !!req.phone || !!req.email;

                      return (
                        <tr
                          key={req.id}
                          onClick={() => setSelectedRequest(req)}
                          className="hover:bg-[#0E2248]/50 transition-colors cursor-pointer group"
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-[#E52BFF] group-hover:text-white transition-colors">
                            {req.enquiryRef || req.requestCode || req.code}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{req.businessName || "Private Project"}</div>
                            <div className="text-slate-300 text-[11px]">{req.fullName}</div>
                            {req.phone && (
                              <div className="text-[10px] text-slate-400 font-mono">{req.phone}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-200 font-medium">{req.serviceRequired || req.solutionType}</div>
                            <div className="text-[10px] text-slate-400">{req.industry || "General Commercial"}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            {req.designDetails ? (
                              <div className="space-y-0.5">
                                <div className="text-white font-semibold flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 text-[#E52BFF]" />
                                  <span>{req.designDetails.title || "Generated Blueprint"}</span>
                                </div>
                                <div className="text-[10px] font-mono text-cyan-300">
                                  Version: v{req.designDetails.versionNumber || 1} • {req.designDetails.deviceType || "DESKTOP"}
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-500 font-mono text-[10px]">Standard brief</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            {isSubmitted ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 text-[9px] font-mono font-bold flex items-center gap-1 w-fit">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                Submitted (Contactable)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-400 border border-slate-500/30 text-[9px] font-mono flex items-center gap-1 w-fit">
                                <ShieldAlert className="w-2.5 h-2.5" />
                                Draft / Guest
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                                req.status === "new"
                                  ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
                                  : req.status === "converted"
                                  ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
                                  : "bg-blue-400/10 text-blue-300 border-blue-400/40"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              {req.designDetails?.downloadUrl && (
                                <a
                                  href={req.designDetails.downloadUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-[#08183A] hover:bg-[#087BFF] text-slate-300 hover:text-white transition-colors"
                                  title="Download HTML"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <button
                                onClick={() => setSelectedRequest(req)}
                                className="px-3 py-1.5 rounded-xl bg-[#08183A] hover:bg-[#E52BFF] hover:text-white border border-white/10 text-[10px] font-bold text-white transition-colors cursor-pointer"
                              >
                                Inspect
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: GENERATION WORKER JOBS */}
      {activeSubTab === "generation-jobs" && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden shadow-xl">
            <div className="p-4 bg-[#05112A] border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00D9FF]" />
                <span>Active Stitch &amp; Forge Queue ({forgeJobs.length} records)</span>
              </span>
              <button
                onClick={async () => {
                  setIsLoadingJobs(true);
                  const res = await fetch("/api/admin/forge/jobs");
                  const data = await res.json();
                  if (data.jobs) setForgeJobs(data.jobs);
                  setIsLoadingJobs(false);
                  onShowToast("Jobs queue refreshed!");
                }}
                className="px-3 py-1.5 rounded-xl bg-[#08183A] hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingJobs ? "animate-spin text-[#00D9FF]" : ""}`} />
                <span>Refresh Queue</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                    <th className="py-3 px-4">Job Code</th>
                    <th className="py-3 px-4">Model &amp; Device</th>
                    <th className="py-3 px-4">Stage / Prompt</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {forgeJobs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No background generation jobs found in queue.
                      </td>
                    </tr>
                  ) : (
                    forgeJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-[#0E2248]/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#00D9FF]">
                          {job.jobCode || job.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-white font-bold">{job.modelId || "GEMINI_3_8_FLASH"}</div>
                          <div className="text-[10px] text-slate-400">{job.deviceType || "DESKTOP"}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">
                          {job.stage || job.prompt || "Processing..."}
                        </td>
                        <td className="py-3.5 px-4 font-mono">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#087BFF] to-[#00D9FF]"
                                style={{ width: `${job.progressPercent || (job.status === "completed" ? 100 : 30)}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-300">
                              {job.progressPercent || (job.status === "completed" ? 100 : 30)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                              job.status === "completed"
                                ? "bg-emerald-400/15 text-emerald-300 border-emerald-400/40"
                                : job.status === "failed"
                                ? "bg-rose-500/15 text-rose-300 border-rose-500/40"
                                : "bg-amber-400/15 text-amber-300 border-amber-400/40 animate-pulse"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {job.status === "failed" ? (
                            <button
                              onClick={() => handleRetryJob(job.id)}
                              className="px-3 py-1 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-[10px] flex items-center gap-1 ml-auto cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Retry Job</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(job.createdAt || Date.now()).toLocaleTimeString()}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Selected Demo */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#071638] border border-[#E52BFF]/40 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-xs text-[#E52BFF] font-bold uppercase">
                  {selectedRequest.enquiryRef || selectedRequest.requestCode || selectedRequest.code}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  {selectedRequest.businessName || selectedRequest.fullName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Design Preview Snapshot */}
            {selectedRequest.designDetails?.thumbnailUrl && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Stitch Screen Snapshot
                </span>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#05112A] max-h-80 flex items-center justify-center p-2">
                  <img
                    src={selectedRequest.designDetails.thumbnailUrl}
                    alt="Demo Screenshot"
                    className="w-full h-auto object-contain max-h-72 rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">Client Information</span>
                <div className="text-white font-bold">{selectedRequest.fullName}</div>
                <div className="text-slate-300 font-mono">{selectedRequest.phone || "No phone submitted (Draft)"}</div>
                <div className="text-slate-300">{selectedRequest.email || "No email submitted (Draft)"}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">Solution Requirements</span>
                <div className="text-white font-bold">{selectedRequest.serviceRequired || selectedRequest.solutionType}</div>
                <div className="text-slate-300">{selectedRequest.industry}</div>
                <div className="text-slate-400 font-mono">Budget: {selectedRequest.budgetRange || selectedRequest.estimatedBudget}</div>
              </div>
            </div>

            {/* Prompt */}
            {selectedRequest.designDetails?.prompt && (
              <div className="p-4 rounded-2xl bg-[#05112A] border border-white/5 font-mono text-xs text-slate-300 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Stitch AI Generation Prompt</span>
                <p>{selectedRequest.designDetails.prompt}</p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {selectedRequest.designDetails?.downloadUrl && (
                <a
                  href={selectedRequest.designDetails.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#087BFF] hover:bg-[#00D9FF] hover:text-[#030B24] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Generated HTML</span>
                </a>
              )}
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors ml-auto cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
