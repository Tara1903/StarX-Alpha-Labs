"use client";

import React, { useState } from "react";
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
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  const filtered = requests.filter((r) => {
    const matchesSearch =
      !search.trim() ||
      r.requestCode.toLowerCase().includes(search.toLowerCase()) ||
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.businessName.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search);

    const matchesIndustry = industryFilter === "all" || r.industry === industryFilter;
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;

    return matchesSearch && matchesIndustry && matchesStatus;
  });

  const uniqueIndustries = Array.from(new Set(requests.map((r) => r.industry).filter(Boolean)));

  return (
    <div className="space-y-6 text-left">
      {/* 1. Filter Bar */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search DEMO-XXXXX code, client, phone..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E52BFF]"
            />
          </div>

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

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#E52BFF]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_review">In Review</option>
            <option value="scheduled">Demo Scheduled</option>
            <option value="presented">Presented</option>
            <option value="quoted">Quoted</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing <strong>{filtered.length}</strong> of {requests.length} Demo Requests
        </div>
      </div>

      {/* 2. Requests Table */}
      <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Request Code</th>
                <th className="py-3 px-4">Client &amp; Business</th>
                <th className="py-3 px-4">Industry &amp; Solution</th>
                <th className="py-3 px-4">Primary Goal</th>
                <th className="py-3 px-4">Budget / Timeline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No demo requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((req) => {
                  const cleanPhone = req.phone?.replace(/[^0-9]/g, "");
                  const waUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                    req.fullName
                  )},%20this%20is%20StarX%20Alpha%20Labs%20regarding%20your%20Personalized%20Demo%20Request%20${encodeURIComponent(
                    req.requestCode
                  )}.`;

                  return (
                    <tr
                      key={req.id}
                      onClick={() => setSelectedRequest(req)}
                      className="hover:bg-[#0E2248]/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-[#E52BFF]">
                        {req.requestCode}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{req.businessName}</div>
                        <div className="text-slate-300 text-[11px]">{req.fullName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{req.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-200 font-medium">{req.solutionType}</div>
                        <div className="text-[10px] text-slate-400">{req.industry}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">
                        {req.primaryGoal}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-slate-300">{req.estimatedBudget}</div>
                        <div className="text-[10px] text-slate-400">{req.targetTimeline}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                            req.status === "pending"
                              ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
                              : req.status === "in_review"
                              ? "bg-amber-400/10 text-amber-300 border-amber-400/40"
                              : req.status === "scheduled"
                              ? "bg-blue-400/10 text-blue-300 border-blue-400/40"
                              : "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {req.phone && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-[#00C98B]/10 text-[#00C98B] hover:bg-[#00C98B]/20 text-[10px] font-mono font-bold transition-colors"
                            >
                              WhatsApp
                            </a>
                          )}
                          <button
                            onClick={() => setSelectedRequest(req)}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold transition-colors cursor-pointer"
                          >
                            View
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

      {/* 3. Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#071638] border border-[#E52BFF]/40 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-xs text-[#E52BFF] font-bold uppercase">
                  {selectedRequest.requestCode}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  {selectedRequest.businessName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#08183A] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Contact</span>
                <div className="text-white font-bold">{selectedRequest.fullName}</div>
                <div className="text-slate-300 font-mono">{selectedRequest.phone}</div>
                <div className="text-slate-300">{selectedRequest.email}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#08183A] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Architecture Scope</span>
                <div className="text-white font-bold">{selectedRequest.solutionType}</div>
                <div className="text-slate-300">{selectedRequest.industry}</div>
                <div className="text-slate-400 font-mono">Budget: {selectedRequest.estimatedBudget}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#08183A] space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400">Primary Transformation Goal</span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {selectedRequest.primaryGoal}
              </p>
            </div>

            {/* Status updates */}
            <div className="p-4 rounded-2xl bg-[#08183A] space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400">Update Request Pipeline Status</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {["pending", "in_review", "scheduled", "presented", "quoted", "closed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onUpdateStatus(selectedRequest.id, st);
                      setSelectedRequest((prev: any) => (prev ? { ...prev, status: st } : null));
                      onShowToast(`Demo status updated to ${st}`);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedRequest.status === st
                        ? "bg-[#E52BFF] text-white shadow-md shadow-[#E52BFF]/40"
                        : "bg-[#071638] text-slate-400 hover:text-white border border-white/10"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <a
                href={`https://wa.me/${selectedRequest.phone?.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#00C98B] hover:bg-[#00D9FF] text-[#030B24] font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>Dispatch WhatsApp Follow-up</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
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
