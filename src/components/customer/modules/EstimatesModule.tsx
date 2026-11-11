"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Download, 
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Filter,
  Search
} from "lucide-react";
import { 
  getEstimates, 
  CustomerEstimate, 
  EstimateStatus, 
  updateEstimateStatus 
} from "@/lib/estimateStore";
import { formatINR } from "@/data/developmentPackages";
import { printEstimatePDF } from "@/lib/pdfGenerator";

interface EstimatesModuleProps {
  onNavigateTab?: (tab: string, contextId?: string) => void;
  filterEstimateId?: string;
}

export function EstimatesModule({ onNavigateTab, filterEstimateId }: EstimatesModuleProps) {
  const [estimates, setEstimates] = useState<CustomerEstimate[]>([]);
  const [selectedEstimate, setSelectedEstimate] = useState<CustomerEstimate | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(filterEstimateId || "");
  const [revisionNotes, setRevisionNotes] = useState<string>("");
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);

  useEffect(() => {
    const list = getEstimates();
    setEstimates(list);
    if (filterEstimateId) {
      const match = list.find((e) => e.estimateNumber === filterEstimateId || e.id === filterEstimateId);
      if (match) setSelectedEstimate(match);
    }
  }, [filterEstimateId]);

  const filteredEstimates = estimates.filter((est) => {
    const matchesSearch = 
      est.estimateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.clientBusiness.toLowerCase().includes(searchQuery.toLowerCase()) ||
      est.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || est.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: EstimateStatus) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Under Review":
      case "Requirement Clarification":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Proposal Prepared":
      case "Proposal Sent":
        return "bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30";
      case "Proposal Accepted":
      case "Agreement Pending":
        return "bg-purple-500/10 text-purple-300 border-purple-500/30";
      case "Awaiting Advance Payment":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Project Confirmed":
        return "bg-[#00C98B]/20 text-[#00C98B] border-[#00C98B]/50 font-bold";
      case "Revision Requested":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30";
      case "Expired":
      case "Cancelled":
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  const handleRequestRevision = (est: CustomerEstimate) => {
    if (!revisionNotes.trim()) {
      alert("Please provide the specific scope adjustments or requirements you would like revised.");
      return;
    }
    const updated = updateEstimateStatus(
      est.id,
      "Revision Requested",
      "Customer",
      `Revision Requested: ${revisionNotes.trim()}`
    );
    if (updated) {
      setEstimates(getEstimates());
      setSelectedEstimate(updated);
      setIsRevisionModalOpen(false);
      setRevisionNotes("");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
            Commercial Acquisition &amp; Scope Snapshots
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1">My Estimates</h2>
          <p className="text-xs text-[#C8D5EF] mt-1">
            Review immutable project estimate snapshots generated via the StarX Alpha Labs Interactive Calculator.
          </p>
        </div>

        <a
          href="/project-calculator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold text-xs shadow-lg shadow-[#087BFF]/30 hover:brightness-110 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Project Calculator +</span>
        </a>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Estimate ID (e.g. STARX-EST-2026-001042), brand, or package..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A1940] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-[#00D9FF] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#0A1940] border border-white/10 text-white text-xs focus:border-[#00D9FF] focus:outline-none"
          >
            <option value="all">All Lifecycle Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Requirement Clarification">Requirement Clarification</option>
            <option value="Proposal Prepared">Proposal Prepared</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Revision Requested">Revision Requested</option>
            <option value="Proposal Accepted">Proposal Accepted</option>
            <option value="Agreement Pending">Agreement Pending</option>
            <option value="Awaiting Advance Payment">Awaiting Advance Payment</option>
            <option value="Project Confirmed">Project Confirmed</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Estimates List + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Estimate Cards */}
        <div className="lg:col-span-2 space-y-4">
          {filteredEstimates.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#0A1940] border border-white/5 space-y-4">
              <FileText className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No Estimates Found</h3>
              <p className="text-xs text-[#C8D5EF] max-w-sm mx-auto">
                No estimate snapshots match your current filter. You can generate a new official project estimate anytime using the calculator.
              </p>
              <a
                href="/project-calculator"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#071638] border border-white/20 text-[#00D9FF] hover:text-white text-xs font-bold"
              >
                Launch Project Calculator →
              </a>
            </div>
          ) : (
            filteredEstimates.map((est) => {
              const isSelected = selectedEstimate?.id === est.id;
              return (
                <div
                  key={est.id}
                  onClick={() => setSelectedEstimate(est)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                    isSelected
                      ? "bg-[#0A1940] border-[#00D9FF] ring-1 ring-[#00D9FF] shadow-xl shadow-[#087BFF]/10"
                      : "bg-[#0A1940]/60 border-white/5 hover:border-white/20 hover:bg-[#0A1940]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-[#00D9FF]">{est.estimateNumber}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border uppercase ${getStatusBadge(est.status)}`}>
                        {est.status}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Locked: {new Date(est.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Package</span>
                      <span className="font-bold text-white">{est.packageCode} — {est.packageName}</span>
                      <span className="text-[10px] text-slate-400 block capitalize">{est.division} Division</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Client / Business</span>
                      <span className="text-white font-medium">{est.clientName}</span>
                      <span className="text-[10px] text-slate-400 block">{est.clientBusiness}</span>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimated Total</span>
                      <span className="font-mono font-extrabold text-base text-[#00D9FF]">{formatINR(est.grandTotal)}</span>
                      <span className="text-[10px] text-slate-400 block">incl. 18% GST</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
                      <span>Valid until: {new Date(est.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => printEstimatePDF(est)}
                        className="px-3 py-1.5 rounded-lg bg-[#071638] hover:bg-[#0c2254] border border-white/10 text-white font-bold text-[11px] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3 h-3 text-[#00D9FF]" />
                        <span>PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedEstimate(est)}
                        className="px-3 py-1.5 rounded-lg bg-[#087BFF]/20 hover:bg-[#087BFF]/30 border border-[#087BFF]/40 text-[#00D9FF] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Details →</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right 1 Col: Selected Estimate Deep Dive & Actions */}
        <div className="space-y-6">
          {selectedEstimate ? (
            <div className="p-6 rounded-3xl bg-[#0A1940] border border-[#00D9FF]/30 shadow-2xl space-y-6 sticky top-28 animate-fade-in">
              <div className="border-b border-white/10 pb-4 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Active Snapshot</span>
                  <h3 className="font-mono font-extrabold text-lg text-[#00D9FF]">{selectedEstimate.estimateNumber}</h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border uppercase ${getStatusBadge(selectedEstimate.status)}`}>
                  {selectedEstimate.status}
                </span>
              </div>

              {/* Preliminary Disclaimer Notice */}
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-[10px] text-purple-200 leading-relaxed font-mono">
                PRELIMINARY PROJECT ESTIMATE — SUBJECT TO REQUIREMENT VERIFICATION AND FINAL APPROVAL.
              </div>

              {/* Status Context Guidance */}
              <div className="p-4 rounded-xl bg-[#071638] border border-white/10 space-y-2 text-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-[#00C98B] block">Current Stage Details</span>
                {selectedEstimate.status === "Submitted" && (
                  <p className="text-slate-300">
                    Your estimate specification is registered. StarX Alpha Labs will contact you via {selectedEstimate.preferredContact || "WhatsApp"} to verify requirements.
                  </p>
                )}
                {selectedEstimate.status === "Under Review" && (
                  <p className="text-slate-300">
                    Assigned Consultant: <strong className="text-white">{selectedEstimate.assignedConsultant || "Aarav Sharma"}</strong>. Requirements are under architectural review.
                  </p>
                )}
                {selectedEstimate.status === "Proposal Sent" && (
                  <p className="text-slate-300">
                    An official technical proposal has been assembled with formal milestone scopes and payment schedules.
                  </p>
                )}
                {selectedEstimate.status === "Revision Requested" && (
                  <p className="text-amber-300">
                    Revision in progress. Our engineering lead is adjusting the scope specification per your notes.
                  </p>
                )}
                {selectedEstimate.status === "Project Confirmed" && (
                  <p className="text-emerald-300">
                    Project officially activated! Milestone 1 (Discovery &amp; Architecture) is in progress.
                  </p>
                )}
              </div>

              {/* Financial Snapshot */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#C8D5EF]">
                  <span>Base Package ({selectedEstimate.packageCode}):</span>
                  <span className="font-mono text-white">{formatINR(selectedEstimate.basePrice)}</span>
                </div>
                {selectedEstimate.selectedAddons.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Add-ons ({selectedEstimate.selectedAddons.length}):</span>
                    {selectedEstimate.selectedAddons.map((a) => (
                      <div key={a.id} className="flex justify-between text-[11px] text-[#C8D5EF] pl-2">
                        <span className="truncate pr-2">• {a.name}</span>
                        <span className="font-mono text-white shrink-0">+{formatINR(a.price)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {selectedEstimate.hostingCost > 0 && (
                  <div className="flex justify-between text-[#C8D5EF] pt-1 border-t border-white/5">
                    <span>Cloud &amp; Hosting:</span>
                    <span className="font-mono text-white">+{formatINR(selectedEstimate.hostingCost)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10">
                  <span className="font-bold">Subtotal:</span>
                  <span className="font-mono font-bold text-[#00D9FF]">{formatINR(selectedEstimate.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>GST (18%):</span>
                  <span className="font-mono">{formatINR(selectedEstimate.gstAmount)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-sm">
                  <span className="font-extrabold text-white">Locked Total:</span>
                  <span className="font-mono font-extrabold text-lg text-[#00D9FF]">
                    {formatINR(selectedEstimate.grandTotal)}
                  </span>
                </div>
              </div>

              {/* Actions Based on Status */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => printEstimatePDF(selectedEstimate)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#087BFF]/20 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Official PDF (A4)</span>
                </button>

                <a
                  href={`https://wa.me/919630937033?text=${encodeURIComponent(
                    `Hi StarX Alpha Labs, regarding Estimate ${selectedEstimate.estimateNumber} (${selectedEstimate.packageName}). I would like to verify technical scope.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#00C98B]/20 hover:bg-[#00C98B]/30 border border-[#00C98B]/40 text-[#00C98B] font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact Consultant (WhatsApp 9630937033)</span>
                </a>

                {selectedEstimate.proposalId && onNavigateTab && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab("proposals", selectedEstimate.proposalId)}
                    className="w-full py-2.5 rounded-xl bg-[#071638] hover:bg-[#0c2254] border border-[#00D9FF]/40 text-[#00D9FF] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Official Proposal →</span>
                  </button>
                )}

                {selectedEstimate.status !== "Proposal Accepted" && selectedEstimate.status !== "Project Confirmed" && (
                  <button
                    type="button"
                    onClick={() => setIsRevisionModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Request Estimate Revision
                  </button>
                )}
              </div>

              {/* Audit History Log */}
              <div className="space-y-2 pt-2 border-t border-white/5 text-[11px]">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Lifecycle Audit Log:</span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {selectedEstimate.history.map((h, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-[#071638] border border-white/5 space-y-0.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-[#00D9FF] font-mono">{h.status}</span>
                        <span className="text-slate-500">{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-300 text-[11px]">{h.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-[#0A1940] border border-white/5 text-center text-xs text-slate-400">
              Select an estimate from the list to view full specifications, download branded A4 PDF, or contact your lead architect.
            </div>
          )}
        </div>
      </div>

      {/* Revision Request Modal */}
      {isRevisionModalOpen && selectedEstimate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1940] border border-[#00D9FF]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#00D9FF]">Estimate Modification</span>
              <h3 className="text-lg font-bold text-white mt-1">Request Scope Revision</h3>
              <p className="text-xs text-[#C8D5EF] mt-1">
                Describe the additional modules, platform adjustments, or timeline modifications you need for {selectedEstimate.estimateNumber}.
              </p>
            </div>

            <textarea
              rows={4}
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              placeholder="e.g. Please add custom WhatsApp notifications and an automated invoicing API..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#071638] border border-white/10 text-white text-xs focus:border-[#00D9FF] focus:outline-none"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRevisionModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRequestRevision(selectedEstimate)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold text-xs cursor-pointer"
              >
                Submit Revision Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
