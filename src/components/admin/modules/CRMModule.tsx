"use client";

import React, { useState } from "react";
import { UnifiedLead } from "../types";
import {
  Users,
  Search,
  Filter,
  PhoneCall,
  Mail,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Plus,
  AlertCircle,
  FileText,
  UserCheck,
  Send,
  Download,
} from "lucide-react";

interface CRMModuleProps {
  leads: UnifiedLead[];
  onUpdateLeadStatus: (leadId: string, status: UnifiedLead["status"]) => void;
  onAddInternalNote: (leadId: string, noteText: string) => void;
  onUpdateFollowUp: (leadId: string, date: string) => void;
  onAssignLead: (leadId: string, assignee: string) => void;
  onShowToast: (msg: string) => void;
}

export function CRMModule({
  leads,
  onUpdateLeadStatus,
  onAddInternalNote,
  onUpdateFollowUp,
  onAssignLead,
  onShowToast,
}: CRMModuleProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<UnifiedLead | null>(null);
  const [newNote, setNewNote] = useState("");

  // Filtering
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      !search.trim() ||
      l.fullName.toLowerCase().includes(search.toLowerCase()) ||
      l.businessName.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    const matchesSource = sourceFilter === "all" || l.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;
    onAddInternalNote(selectedLead.id, newNote.trim());
    setNewNote("");
    onShowToast(`Internal note logged for ${selectedLead.code}`);
  };

  const handleExportLeadsCSV = () => {
    const headers = ["Code", "Source", "Name", "Business", "Phone", "Email", "Service", "Budget", "Timeline", "Status", "Created"];
    const rows = filteredLeads.map((l) => [
      l.code,
      l.source,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.businessName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.serviceRequired.replace(/"/g, '""')}"`,
      `"${l.budgetRange || ''}"`,
      `"${l.timeline || ''}"`,
      l.status,
      l.createdAt,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `starx_crm_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Exported ${filteredLeads.length} leads to CSV`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Filter & Action Bar */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Input */}
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, business, phone, code..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D9FF]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
          >
            <option value="all">All Statuses ({leads.length})</option>
            <option value="new">New</option>
            <option value="under_review">Under Review</option>
            <option value="contacted">Contacted</option>
            <option value="followup_required">Follow-up Required</option>
            <option value="demo_scheduled">Demo Scheduled</option>
            <option value="demo_presented">Demo Presented</option>
            <option value="quotation_sent">Quotation Sent</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
          >
            <option value="all">All Inbound Sources</option>
            <option value="demo-request">Personalized Demo</option>
            <option value="calculator">Project Calculator</option>
            <option value="contact">Contact Form</option>
            <option value="quote">Quote Request</option>
            <option value="agency">Agency Partnership</option>
          </select>
        </div>

        {/* Export CSV Button */}
        <button
          onClick={handleExportLeadsCSV}
          className="px-4 py-2 rounded-xl bg-[#08183A] hover:bg-[#0E2248] border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#00D9FF]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* 2. Unified Leads Table */}
      <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Code / Source</th>
                <th className="py-3 px-4">Client &amp; Business</th>
                <th className="py-3 px-4">Contact Channels</th>
                <th className="py-3 px-4">Requirement &amp; Scope</th>
                <th className="py-3 px-4">Timeline / Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No leads found matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                    lead.fullName
                  )},%20this%20is%20StarX%20Alpha%20Labs%20regarding%20your%20enquiry%20${encodeURIComponent(
                    lead.code
                  )}.`;

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#0E2248]/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Code & Source */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-white flex items-center gap-1.5">
                          <span>{lead.code}</span>
                          {lead.isDuplicateFlag && (
                            <span
                              title="Potential duplicate contact detected"
                              className="w-2 h-2 rounded-full bg-amber-400"
                            />
                          )}
                        </div>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300">
                          {lead.source}
                        </span>
                      </td>

                      {/* Client & Business */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{lead.businessName || "Private Enquiry"}</div>
                        <div className="text-[11px] text-slate-300">{lead.fullName}</div>
                        {lead.city && (
                          <div className="text-[10px] text-slate-400">{lead.city}</div>
                        )}
                      </td>

                      {/* Contact Channels */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="text-slate-200 font-mono text-[11px]">{lead.phone}</div>
                        <div className="text-slate-400 text-[10px]">{lead.email}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {lead.phone && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-[#00C98B] hover:underline flex items-center gap-0.5 font-mono"
                            >
                              <span>WhatsApp</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Requirement & Scope */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-medium text-slate-200 truncate">{lead.serviceRequired}</div>
                        {lead.primaryGoal && (
                          <div className="text-[10px] text-slate-400 truncate">{lead.primaryGoal}</div>
                        )}
                      </td>

                      {/* Timeline & Budget */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-slate-300">{lead.budgetRange || "Custom Scope"}</div>
                        <div className="text-[10px] text-slate-400">{lead.timeline || "Flexible"}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                            lead.status === "new"
                              ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
                              : lead.status === "under_review"
                              ? "bg-amber-400/10 text-amber-300 border-amber-400/40"
                              : lead.status === "contacted"
                              ? "bg-blue-400/10 text-blue-300 border-blue-400/40"
                              : lead.status === "converted"
                              ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
                              : "bg-purple-400/10 text-purple-300 border-purple-400/40"
                          }`}
                        >
                          {lead.status.replace("_", " ")}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-3 py-1.5 rounded-xl bg-[#08183A] hover:bg-[#00D9FF] hover:text-[#030B24] border border-white/10 text-[11px] font-bold text-white transition-colors cursor-pointer"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Detailed Lead Workspace Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#00D9FF] font-bold uppercase">
                    {selectedLead.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono uppercase text-slate-300">
                    Source: {selectedLead.source}
                  </span>
                  {selectedLead.isDuplicateFlag && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono">
                      Potential Duplicate
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  {selectedLead.businessName || selectedLead.fullName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Grid 1: Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">Contact Information</span>
                <div className="text-sm font-bold text-white">{selectedLead.fullName}</div>
                <div className="text-xs text-slate-300 font-mono flex items-center gap-2">
                  <span>{selectedLead.phone}</span>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00C98B] hover:underline"
                  >
                    (WhatsApp ↗)
                  </a>
                </div>
                <div className="text-xs text-slate-300">{selectedLead.email}</div>
                {selectedLead.city && (
                  <div className="text-xs text-slate-400">{selectedLead.city}</div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">Project Requirements</span>
                <div className="text-xs text-white font-bold">{selectedLead.serviceRequired}</div>
                {selectedLead.primaryGoal && (
                  <div className="text-xs text-slate-300">{selectedLead.primaryGoal}</div>
                )}
                <div className="text-xs text-slate-400 font-mono">
                  Budget: {selectedLead.budgetRange || "Not specified"}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Timeline: {selectedLead.timeline || "Flexible"}
                </div>
                {selectedLead.referenceUrl && (
                  <div className="text-xs text-[#00D9FF]">
                    <a href={selectedLead.referenceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Ref: {selectedLead.referenceUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Status Transition Bar */}
            <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-2">
              <span className="text-[10px] font-mono uppercase text-slate-400">Update Lead Workflow Status</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "new",
                  "under_review",
                  "contacted",
                  "followup_required",
                  "demo_scheduled",
                  "demo_presented",
                  "quotation_sent",
                  "converted",
                  "closed",
                ].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onUpdateLeadStatus(selectedLead.id, st as any);
                      setSelectedLead((prev) => (prev ? { ...prev, status: st as any } : null));
                      onShowToast(`Status updated to ${st.replace("_", " ")}`);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedLead.status === st
                        ? "bg-[#00D9FF] text-[#030B24] shadow-md shadow-[#00D9FF]/40"
                        : "bg-[#071638] text-slate-400 hover:text-white border border-white/10"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Notes Section (Admin Only) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#00D9FF]" />
                  <span>Private Internal Notes (Admin Confidential)</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedLead.internalNotes.length} notes
                </span>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleNoteSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record call summary, pricing agreement, or client response..."
                  className="flex-1 px-4 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D9FF]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#087BFF] hover:bg-[#00D9FF] hover:text-[#030B24] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Note</span>
                </button>
              </form>

              {/* Notes List */}
              <div className="max-h-40 overflow-y-auto space-y-2">
                {selectedLead.internalNotes.length === 0 ? (
                  <div className="p-3 rounded-xl bg-[#08183A]/50 text-xs text-slate-400 text-center">
                    No internal notes logged yet.
                  </div>
                ) : (
                  selectedLead.internalNotes.map((note) => (
                    <div key={note.id} className="p-3 rounded-xl bg-[#08183A] border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="text-[#00D9FF] font-bold">{note.author}</span>
                        <span>{note.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-200">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Created: {selectedLead.createdAt}</span>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer"
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
