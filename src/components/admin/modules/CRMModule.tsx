"use client";

import React, { useState, useMemo } from "react";
import {
  UnifiedLead,
  LeadStatus,
  ContactHistoryEntry,
  TechnicalAssessment,
} from "../types";
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
  Copy,
  ChevronRight,
  Eye,
  ShieldAlert,
  Layers,
  Cpu,
  Palette,
  Check,
  AlertTriangle,
  X,
  Phone,
  Bookmark,
  CalendarDays,
  Tag,
  ArrowRight,
  History,
  FileCode,
} from "lucide-react";

interface CRMModuleProps {
  leads: UnifiedLead[];
  onUpdateLeadStatus: (leadId: string, status: LeadStatus, lostReason?: string) => Promise<void> | void;
  onAddInternalNote: (leadId: string, noteText: string) => Promise<void> | void;
  onUpdateFollowUp: (leadId: string, date: string) => Promise<void> | void;
  onAssignLead: (leadId: string, assignee: string) => Promise<void> | void;
  onRecordContactOutcome: (
    leadId: string,
    outcome: {
      method: "phone" | "whatsapp" | "email" | "in_person";
      outcome: ContactHistoryEntry["outcome"];
      notes: string;
      nextFollowUpDate?: string;
    }
  ) => Promise<void> | void;
  onSaveTechnicalAssessment: (
    leadId: string,
    assessment: TechnicalAssessment
  ) => Promise<void> | void;
  onShowToast: (msg: string) => void;
}

export function CRMModule({
  leads,
  onUpdateLeadStatus,
  onAddInternalNote,
  onUpdateFollowUp,
  onAssignLead,
  onRecordContactOutcome,
  onSaveTechnicalAssessment,
  onShowToast,
}: CRMModuleProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [queueTab, setQueueTab] = useState<"all" | "today" | "overdue" | "upcoming" | "closed">("all");
  const [selectedLead, setSelectedLead] = useState<UnifiedLead | null>(null);
  
  // Workspace active tab inside modal
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<
    "overview" | "contact" | "requirements" | "design" | "assessment" | "history"
  >("overview");

  // Form states
  const [newNote, setNewNote] = useState("");
  const [assigneeInput, setAssigneeInput] = useState("");
  const [lostReasonInput, setLostReasonInput] = useState("");
  const [showLostReasonModal, setShowLostReasonModal] = useState(false);
  const [pendingLostStatus, setPendingLostStatus] = useState<LeadStatus | null>(null);

  // Contact outcome logging form state
  const [contactMethod, setContactMethod] = useState<"phone" | "whatsapp" | "email" | "in_person">("phone");
  const [contactOutcomeChoice, setContactOutcomeChoice] = useState<ContactHistoryEntry["outcome"]>(
    "successfully_contacted_interested"
  );
  const [contactNotes, setContactNotes] = useState("");
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");

  // Technical assessment form state
  const [feasibility, setFeasibility] = useState<TechnicalAssessment["feasibility"]>("high");
  const [recArch, setRecArch] = useState("Next.js 15 App Router + Edge SSR + Supabase PostgreSQL");
  const [recStack, setRecStack] = useState("Next.js, TypeScript, Supabase, Tailwind CSS, Vercel Edge");
  const [estWeeks, setEstWeeks] = useState("3–4 Weeks");
  const [riskNotes, setRiskNotes] = useState("Low operational risk. Well-defined schema and Stitch UI blueprint.");
  const [assessmentNotes, setAssessmentNotes] = useState("");

  // Synchronize modal state with props when selectedLead is updated
  React.useEffect(() => {
    if (selectedLead) {
      const refreshed = leads.find((l) => l.id === selectedLead.id);
      if (refreshed) {
        setSelectedLead(refreshed);
      }
    }
  }, [leads]);

  // Synchronize assessment inputs when a lead is opened
  React.useEffect(() => {
    if (selectedLead?.technicalAssessment) {
      setFeasibility(selectedLead.technicalAssessment.feasibility || "high");
      setRecArch(selectedLead.technicalAssessment.recommendedArchitecture || "");
      setRecStack(
        Array.isArray(selectedLead.technicalAssessment.recommendedStack)
          ? selectedLead.technicalAssessment.recommendedStack.join(", ")
          : ""
      );
      setEstWeeks(selectedLead.technicalAssessment.estimatedWeeks || "3–4 Weeks");
      setRiskNotes(selectedLead.technicalAssessment.riskAnalysis || "");
      setAssessmentNotes(selectedLead.technicalAssessment.notes || "");
    } else {
      setFeasibility("high");
      setRecArch("Next.js 15 App Router + Edge SSR + Supabase PostgreSQL");
      setRecStack("Next.js, TypeScript, Supabase, Tailwind CSS, Vercel Edge");
      setEstWeeks("3–4 Weeks");
      setRiskNotes("Low operational risk. Well-defined schema and Stitch UI blueprint.");
      setAssessmentNotes("");
    }
  }, [selectedLead?.id]);

  // SLA Calculation helper
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      // Search
      const matchesSearch =
        !search.trim() ||
        l.fullName.toLowerCase().includes(search.toLowerCase()) ||
        l.businessName.toLowerCase().includes(search.toLowerCase()) ||
        l.code.toLowerCase().includes(search.toLowerCase()) ||
        (l.enquiryRef && l.enquiryRef.toLowerCase().includes(search.toLowerCase())) ||
        l.phone.includes(search) ||
        l.email.toLowerCase().includes(search.toLowerCase());

      // Status
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      // Source
      const matchesSource = sourceFilter === "all" || l.source === sourceFilter;

      // Queue Tabs
      let matchesQueue = true;
      if (queueTab === "today") {
        matchesQueue = !!l.followUpDate && l.followUpDate.slice(0, 10) === todayStr;
      } else if (queueTab === "overdue") {
        matchesQueue =
          !!l.followUpDate &&
          l.followUpDate.slice(0, 10) < todayStr &&
          l.status !== "converted" &&
          l.status !== "closed" &&
          l.status !== "not_interested";
      } else if (queueTab === "upcoming") {
        matchesQueue = !!l.followUpDate && l.followUpDate.slice(0, 10) > todayStr;
      } else if (queueTab === "closed") {
        matchesQueue = l.status === "converted" || l.status === "closed" || l.status === "not_interested";
      }

      return matchesSearch && matchesStatus && matchesSource && matchesQueue;
    });
  }, [leads, search, statusFilter, sourceFilter, queueTab, todayStr]);

  // Queue counts
  const queueCounts = useMemo(() => {
    const today = leads.filter((l) => !!l.followUpDate && l.followUpDate.slice(0, 10) === todayStr).length;
    const overdue = leads.filter(
      (l) =>
        !!l.followUpDate &&
        l.followUpDate.slice(0, 10) < todayStr &&
        l.status !== "converted" &&
        l.status !== "closed" &&
        l.status !== "not_interested"
    ).length;
    const upcoming = leads.filter((l) => !!l.followUpDate && l.followUpDate.slice(0, 10) > todayStr).length;
    const closed = leads.filter((l) => l.status === "converted" || l.status === "closed" || l.status === "not_interested").length;
    return { all: leads.length, today, overdue, upcoming, closed };
  }, [leads, todayStr]);

  // Handlers
  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;
    await onAddInternalNote(selectedLead.id, newNote.trim());
    setNewNote("");
    onShowToast(`Internal note logged for ${selectedLead.code}`);
  };

  const handleSaveAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    const payload: TechnicalAssessment = {
      feasibility,
      recommendedArchitecture: recArch,
      recommendedStack: recStack.split(",").map((s) => s.trim()).filter(Boolean),
      estimatedWeeks: estWeeks,
      riskAnalysis: riskNotes,
      notes: assessmentNotes,
      assessedAt: new Date().toISOString(),
    };
    await onSaveTechnicalAssessment(selectedLead.id, payload);
    onShowToast(`Technical assessment saved for ${selectedLead.code}`);
  };

  const handleLogContactOutcome = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    await onRecordContactOutcome(selectedLead.id, {
      method: contactMethod,
      outcome: contactOutcomeChoice,
      notes: contactNotes,
      nextFollowUpDate: nextFollowUpDate || undefined,
    });
    setContactNotes("");
    setNextFollowUpDate("");
    onShowToast(`Contact outcome recorded for ${selectedLead.code}`);
  };

  const handleCopyContactCard = (lead: UnifiedLead) => {
    const card = [
      `STARX ALPHA LABS CLIENT DOSSIER`,
      `Enquiry Ref: ${lead.enquiryRef || lead.code}`,
      `Client: ${lead.fullName}`,
      `Company: ${lead.businessName || "Individual / Not specified"}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Service: ${lead.serviceRequired}`,
      `Budget: ${lead.budgetRange || "Custom Scope"}`,
      `Timeline: ${lead.timeline || "Flexible"}`,
      `Preferred Contact: ${lead.contactProfile?.preferredMethod || "Phone Call"}`,
      `Best Time: ${lead.contactProfile?.bestTimeToReach || "Business Hours"}`,
    ].join("\n");

    navigator.clipboard.writeText(card);
    onShowToast("Contact card copied to clipboard!");
  };

  const handleExportLeadsCSV = () => {
    const headers = [
      "Code",
      "Enquiry Ref",
      "Source",
      "Name",
      "Business",
      "Phone",
      "Email",
      "Service",
      "Budget",
      "Timeline",
      "Status",
      "Assigned To",
      "Follow-up Date",
      "Created At",
    ];
    const rows = filteredLeads.map((l) => [
      l.code,
      `"${l.enquiryRef || ''}"`,
      l.source,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.businessName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.serviceRequired.replace(/"/g, '""')}"`,
      `"${l.budgetRange || ''}"`,
      `"${l.timeline || ''}"`,
      l.status,
      `"${l.assignedTo || 'Unassigned'}"`,
      `"${l.followUpDate || ''}"`,
      l.createdAt,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `starx_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Exported ${filteredLeads.length} enquiries to CSV`);
  };

  // Status transition handler with lost reason safeguard
  const handleStatusClick = (st: LeadStatus) => {
    if (!selectedLead) return;
    if (st === "not_interested" || st === "closed") {
      setPendingLostStatus(st);
      setShowLostReasonModal(true);
    } else {
      onUpdateLeadStatus(selectedLead.id, st);
      onShowToast(`Status updated to ${st.replace("_", " ")}`);
    }
  };

  const handleConfirmLostReason = () => {
    if (!selectedLead || !pendingLostStatus) return;
    onUpdateLeadStatus(selectedLead.id, pendingLostStatus, lostReasonInput);
    setShowLostReasonModal(false);
    setLostReasonInput("");
    setPendingLostStatus(null);
    onShowToast(`Status updated with recorded reason`);
  };

  const getCleanPhone = (phone: string) => phone.replace(/[^0-9]/g, "");

  return (
    <div className="space-y-6 text-left">
      {/* 1. Header & Queue Filter Navigation */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00D9FF]" />
              <span>Enquiry &amp; Client Relationship Management</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Authoritative CRM pipeline tracking customer briefs, Stitch design blueprints, direct contact logs, and engineering assessments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportLeadsCSV}
              className="px-4 py-2 rounded-xl bg-[#08183A] hover:bg-[#0E2248] border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Follow-up Queue Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setQueueTab("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              queueTab === "all"
                ? "bg-[#00D9FF] text-[#030B24] shadow-md shadow-[#00D9FF]/30"
                : "bg-[#08183A] text-slate-400 hover:text-white border border-white/10"
            }`}
          >
            <span>All Enquiries</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">{queueCounts.all}</span>
          </button>

          <button
            onClick={() => setQueueTab("today")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              queueTab === "today"
                ? "bg-amber-400 text-[#030B24] shadow-md shadow-amber-400/30"
                : "bg-[#08183A] text-amber-300 hover:text-white border border-white/10"
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Follow-up Due Today</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">{queueCounts.today}</span>
          </button>

          <button
            onClick={() => setQueueTab("overdue")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              queueTab === "overdue"
                ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                : "bg-[#08183A] text-rose-300 hover:text-white border border-white/10"
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Overdue Follow-ups</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">{queueCounts.overdue}</span>
          </button>

          <button
            onClick={() => setQueueTab("upcoming")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              queueTab === "upcoming"
                ? "bg-[#087BFF] text-white shadow-md shadow-[#087BFF]/30"
                : "bg-[#08183A] text-blue-300 hover:text-white border border-white/10"
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>Upcoming Scheduled</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">{queueCounts.upcoming}</span>
          </button>

          <button
            onClick={() => setQueueTab("closed")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              queueTab === "closed"
                ? "bg-emerald-500 text-[#030B24] shadow-md shadow-emerald-500/30"
                : "bg-[#08183A] text-slate-400 hover:text-white border border-white/10"
            }`}
          >
            <span>Won / Closed</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">{queueCounts.closed}</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-[#071638]/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Input */}
          <div className="relative min-w-[240px] flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client, business, ref code, phone, email..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D9FF]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
          >
            <option value="all">All 12 Statuses ({leads.length})</option>
            <option value="new">New Enquiry</option>
            <option value="assigned">Assigned</option>
            <option value="attempted_contact">Attempted Contact</option>
            <option value="contacted">Contacted</option>
            <option value="needs_assessment">Needs Assessment</option>
            <option value="assessment_complete">Assessment Complete</option>
            <option value="followup_required">Follow-up Required</option>
            <option value="quote_prepared">Quote Prepared</option>
            <option value="quotation_sent">Quotation Sent</option>
            <option value="negotiation">Negotiation</option>
            <option value="converted">Won / Approved</option>
            <option value="on_hold">On Hold</option>
            <option value="not_interested">Not Interested</option>
            <option value="closed">Closed</option>
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
          >
            <option value="all">All Inbound Sources</option>
            <option value="quote">Build With StarX (Design Studio)</option>
            <option value="demo-request">Personalized Demo</option>
            <option value="calculator">Project Calculator</option>
            <option value="contact">Direct Contact Form</option>
            <option value="agency">Agency Partnership</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing <span className="text-[#00D9FF] font-bold">{filteredLeads.length}</span> of {leads.length} enquiries
        </div>
      </div>

      {/* 3. Authoritative Unified Leads Table */}
      <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3.5 px-4">Enquiry Ref / Source</th>
                <th className="py-3.5 px-4">Client &amp; Organisation</th>
                <th className="py-3.5 px-4">Contact Channels</th>
                <th className="py-3.5 px-4">Scope &amp; Stitch Design</th>
                <th className="py-3.5 px-4">Budget / Timeline</th>
                <th className="py-3.5 px-4">SLA / Follow-up</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-slate-400 space-y-2">
                    <Users className="w-8 h-8 mx-auto text-slate-500 opacity-50" />
                    <p className="text-sm font-semibold text-slate-300">No enquiries found in this view</p>
                    <p className="text-xs text-slate-500">Try adjusting your filters or search terms.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const isOverdue =
                    lead.followUpDate &&
                    lead.followUpDate.slice(0, 10) < todayStr &&
                    lead.status !== "converted" &&
                    lead.status !== "closed";
                  const isDueToday = lead.followUpDate && lead.followUpDate.slice(0, 10) === todayStr;

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-[#08183A]/70 transition-colors cursor-pointer group"
                    >
                      {/* Enquiry Ref / Source */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-white group-hover:text-[#00D9FF] flex items-center gap-1.5">
                          <span>{lead.enquiryRef || lead.code}</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                          <span className="capitalize">{lead.source.replace("-", " ")}</span>
                          {lead.designDetails?.isApproved && (
                            <span className="px-1.5 py-0.2 rounded-full bg-[#00D9FF]/20 text-[#00D9FF] text-[9px] font-bold">
                              Design Approved
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Client & Organisation */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{lead.fullName}</div>
                        <div className="text-slate-400 text-[11px] truncate max-w-[180px]">
                          {lead.businessName || "Private Client"}
                        </div>
                        {lead.city && (
                          <div className="text-[10px] text-slate-500">{lead.city}, {lead.country || "IN"}</div>
                        )}
                      </td>

                      {/* Contact Channels */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${lead.phone}`}
                            title="Call customer via phone"
                            onClick={() => onShowToast("Call initiated. Please log the contact outcome afterward.")}
                            className="p-1.5 rounded-lg bg-[#08183A] hover:bg-[#00D9FF] hover:text-[#030B24] text-slate-300 transition-colors border border-white/10"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={`https://wa.me/${getCleanPhone(lead.phone)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open WhatsApp chat"
                            onClick={() => onShowToast("WhatsApp opened. Please log the contact outcome afterward.")}
                            className="p-1.5 rounded-lg bg-[#08183A] hover:bg-[#00C98B] hover:text-[#030B24] text-slate-300 transition-colors border border-white/10"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-[#00C98B]" />
                          </a>

                          <a
                            href={`mailto:${lead.email}?subject=Regarding Your StarX Alpha Labs Project Enquiry (${lead.enquiryRef || lead.code})`}
                            title="Send email"
                            onClick={() => onShowToast("Email client opened. Please log outcome when sent.")}
                            className="p-1.5 rounded-lg bg-[#08183A] hover:bg-[#087BFF] hover:text-white text-slate-300 transition-colors border border-white/10"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#087BFF]" />
                          </a>

                          <button
                            onClick={() => handleCopyContactCard(lead)}
                            title="Copy client dossier"
                            className="p-1.5 rounded-lg bg-[#08183A] hover:bg-white/20 text-slate-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-1 truncate max-w-[140px]">
                          {lead.phone}
                        </div>
                      </td>

                      {/* Scope & Stitch Design */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white truncate max-w-[200px]">
                          {lead.serviceRequired}
                        </div>
                        {lead.designDetails ? (
                          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-[#00D9FF]">
                            <Sparkles className="w-3 h-3 shrink-0" />
                            <span className="truncate max-w-[160px]">
                              {lead.designDetails.title || "Stitch Demo Generated"}
                            </span>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-500">Standard inquiry brief</div>
                        )}
                      </td>

                      {/* Budget / Timeline */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="text-slate-200 font-semibold">{lead.budgetRange || "Custom Scope"}</div>
                        <div className="text-[10px] text-slate-400">{lead.timeline || "Flexible"}</div>
                      </td>

                      {/* SLA / Follow-up */}
                      <td className="py-3.5 px-4">
                        {lead.followUpDate ? (
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isOverdue
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
                                : isDueToday
                                ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                                : "bg-blue-400/10 text-blue-300 border border-blue-400/20"
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            <span>{lead.followUpDate.slice(0, 10)}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">Not scheduled</span>
                        )}
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {lead.assignedTo ? (
                            <span className="text-slate-300">👤 {lead.assignedTo}</span>
                          ) : (
                            <span className="text-amber-400/80">Unassigned</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                            lead.status === "new"
                              ? "bg-rose-500/15 text-rose-300 border-rose-500/40"
                              : lead.status === "contacted"
                              ? "bg-blue-400/15 text-blue-300 border-blue-400/40"
                              : lead.status === "converted"
                              ? "bg-emerald-400/15 text-emerald-300 border-emerald-400/40"
                              : lead.status === "quotation_sent"
                              ? "bg-purple-400/15 text-purple-300 border-purple-400/40"
                              : lead.status === "assessment_complete"
                              ? "bg-cyan-400/15 text-cyan-300 border-cyan-400/40"
                              : "bg-amber-400/15 text-amber-300 border-amber-400/40"
                          }`}
                        >
                          {lead.status.replace(/_/g, " ")}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-3 py-1.5 rounded-xl bg-[#08183A] hover:bg-[#00D9FF] hover:text-[#030B24] border border-white/10 text-[11px] font-bold text-white transition-colors cursor-pointer"
                        >
                          Workspace
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

      {/* 4. Complete Enterprise Enquiry Workspace Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 bg-[#05112A] flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-[#00D9FF] font-bold uppercase px-2.5 py-0.5 rounded-md bg-[#00D9FF]/10 border border-[#00D9FF]/30">
                    {selectedLead.enquiryRef || selectedLead.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono uppercase text-slate-300">
                    Source: {selectedLead.source}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      selectedLead.status === "new"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                        : selectedLead.status === "converted"
                        ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/50"
                        : "bg-blue-400/20 text-blue-300 border-blue-400/50"
                    }`}
                  >
                    {selectedLead.status.replace(/_/g, " ")}
                  </span>
                  {selectedLead.designDetails?.isApproved && (
                    <span className="px-2 py-0.5 rounded-full bg-[#00D9FF]/20 text-[#00D9FF] text-[9px] font-bold border border-[#00D9FF]/40 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Approved Design
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
                  {selectedLead.businessName || selectedLead.fullName}
                </h2>
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-1">
                  <span>Client: <strong className="text-white">{selectedLead.fullName}</strong></span>
                  <span>•</span>
                  <span>Received: {selectedLead.createdAt}</span>
                  <span>•</span>
                  <span>
                    Assigned:{" "}
                    <strong className="text-[#00D9FF]">
                      {selectedLead.assignedTo || "Unassigned"}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Quick Contact & Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedLead.phone}`}
                  onClick={() => onShowToast("Call initiated. Please log contact outcome.")}
                  className="px-3 py-2 rounded-xl bg-[#08183A] hover:bg-[#00D9FF] hover:text-[#030B24] border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Call</span>
                </a>

                <a
                  href={`https://wa.me/${getCleanPhone(selectedLead.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onShowToast("WhatsApp opened. Please log contact outcome.")}
                  className="px-3 py-2 rounded-xl bg-[#08183A] hover:bg-[#00C98B] hover:text-[#030B24] border border-white/10 text-xs font-bold text-[#00C98B] hover:text-[#030B24] flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>

                <a
                  href={`mailto:${selectedLead.email}?subject=StarX Alpha Labs — Proposal Discussion for ${selectedLead.businessName || selectedLead.fullName}`}
                  onClick={() => onShowToast("Email draft opened. Please log outcome when sent.")}
                  className="px-3 py-2 rounded-xl bg-[#08183A] hover:bg-[#087BFF] hover:text-white border border-white/10 text-xs font-bold text-[#087BFF] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Email</span>
                </a>

                <button
                  onClick={() => handleCopyContactCard(selectedLead)}
                  className="p-2 rounded-xl bg-[#08183A] hover:bg-white/20 border border-white/10 text-slate-300 cursor-pointer"
                  title="Copy full dossier"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Workspace Sub-Tab Navigation */}
            <div className="flex items-center px-6 border-b border-white/10 bg-[#061430] overflow-x-auto text-xs font-bold">
              {[
                { id: "overview", label: "Overview & Dossier", icon: FileText },
                { id: "contact", label: "Direct Contact & Outcomes", icon: PhoneCall },
                { id: "requirements", label: "Client Requirements", icon: Layers },
                { id: "design", label: "Stitch Design Blueprint", icon: Sparkles },
                { id: "assessment", label: "Technical Assessment", icon: Cpu },
                { id: "history", label: "Activity & Notes", icon: History },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeWorkspaceTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveWorkspaceTab(tab.id as any)}
                    className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "border-[#00D9FF] text-[#00D9FF] bg-[#071638]"
                        : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeWorkspaceTab === "overview" && (
                <div className="space-y-6">
                  {/* Lead Lifecycle Status Pipeline Control */}
                  <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                        Enquiry Lifecycle Progression
                      </span>
                      <span className="text-[10px] text-[#00D9FF] font-mono">
                        Current: {selectedLead.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        "new",
                        "assigned",
                        "attempted_contact",
                        "contacted",
                        "needs_assessment",
                        "assessment_complete",
                        "followup_required",
                        "quote_prepared",
                        "quotation_sent",
                        "negotiation",
                        "converted",
                        "not_interested",
                        "closed",
                      ].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleStatusClick(st as LeadStatus)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                            selectedLead.status === st
                              ? "bg-[#00D9FF] text-[#030B24] shadow-md shadow-[#00D9FF]/40 font-extrabold"
                              : "bg-[#071638] text-slate-400 hover:text-white border border-white/10"
                          }`}
                        >
                          {st.replace(/_/g, " ")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Contact Info */}
                    <div className="p-5 rounded-2xl bg-[#08183A] border border-white/5 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#00D9FF]" />
                          <span>Customer Identity &amp; Contact</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Verified Submission</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Full Name</span>
                          <span className="font-bold text-white">{selectedLead.fullName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Company</span>
                          <span className="text-slate-200">{selectedLead.businessName || "Private Client"}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Phone Number</span>
                          <span className="font-mono text-[#00D9FF]">{selectedLead.phone}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Email Address</span>
                          <span className="text-slate-200">{selectedLead.email}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Preferred Method</span>
                          <span className="font-bold text-amber-300 capitalize">
                            {selectedLead.contactProfile?.preferredMethod || "Phone Call"}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-400">Best Time to Reach</span>
                          <span className="text-slate-300">
                            {selectedLead.contactProfile?.bestTimeToReach || "Standard Business Hours"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Commercial Overview */}
                    <div className="p-5 rounded-2xl bg-[#08183A] border border-white/5 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-[#087BFF]" />
                          <span>Commercial Scope</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Inbound Expectation</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Service Category</span>
                          <span className="font-bold text-white">{selectedLead.serviceRequired}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Estimated Budget</span>
                          <span className="font-mono font-bold text-emerald-400">
                            {selectedLead.budgetRange || "To be scoped"}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Target Timeline</span>
                          <span className="text-slate-200">{selectedLead.timeline || "Flexible"}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Follow-up Date</span>
                          <span className="font-mono text-amber-300">
                            {selectedLead.followUpDate || "Not set"}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-400">Assigned Team Member</span>
                          <span className="text-slate-300">
                            {selectedLead.assignedTo || "Unassigned"}
                          </span>
                        </div>
                      </div>

                      {/* Quick Assign Form */}
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={assigneeInput}
                          onChange={(e) => setAssigneeInput(e.target.value)}
                          placeholder="Assign to team member (email)..."
                          className="flex-1 px-3 py-1.5 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                        />
                        <button
                          onClick={async () => {
                            if (!assigneeInput.trim()) return;
                            await onAssignLead(selectedLead.id, assigneeInput.trim());
                            setAssigneeInput("");
                            onShowToast(`Assigned to ${assigneeInput}`);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#087BFF] hover:bg-[#00D9FF] hover:text-[#030B24] text-xs font-bold text-white transition-colors cursor-pointer"
                        >
                          Assign
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary of Customer Request */}
                  {selectedLead.primaryGoal && (
                    <div className="p-5 rounded-2xl bg-[#08183A] border border-white/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                        Client Stated Goals &amp; Problem Statement
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                        {selectedLead.primaryGoal}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: DIRECT CONTACT & OUTCOMES */}
              {activeWorkspaceTab === "contact" && (
                <div className="space-y-6">
                  {/* Warning banner explaining business rule */}
                  <div className="p-4 rounded-2xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <div className="font-bold text-white">Manual Contact Outcome Governance</div>
                      <p className="text-slate-300">
                        Initiating a call or WhatsApp message opens external communication channels. As per StarX Alpha Labs operations policy, an enquiry is <strong>never automatically marked as contacted</strong>. You must manually select and log the discussion outcome below.
                      </p>
                    </div>
                  </div>

                  {/* Form to log outcome */}
                  <form onSubmit={handleLogContactOutcome} className="p-5 rounded-2xl bg-[#08183A] border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-[#00D9FF]" />
                      <span>Record Contact Outcome &amp; Set Follow-up</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                          Communication Channel Used
                        </label>
                        <select
                          value={contactMethod}
                          onChange={(e) => setContactMethod(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                        >
                          <option value="phone">Phone Call</option>
                          <option value="whatsapp">WhatsApp Message</option>
                          <option value="email">Direct Email</option>
                          <option value="in_person">In-Person / Video Conference</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                          Conversation Outcome
                        </label>
                        <select
                          value={contactOutcomeChoice}
                          onChange={(e) => setContactOutcomeChoice(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                        >
                          <option value="successfully_contacted_interested">Successfully contacted — client interested</option>
                          <option value="successfully_contacted_callback">Successfully contacted — callback requested</option>
                          <option value="successfully_contacted_requirements_changed">Successfully contacted — requirements changed</option>
                          <option value="no_answer_voicemail">No answer — left voicemail / SMS</option>
                          <option value="whatsapp_sent_waiting">WhatsApp message sent — waiting response</option>
                          <option value="email_sent_waiting">Email sent — awaiting reply</option>
                          <option value="client_unresponsive">Client unresponsive after multiple attempts</option>
                          <option value="client_not_interested">Client not interested / timing wrong</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                        Summary of Discussion / Response Notes
                      </label>
                      <textarea
                        rows={3}
                        value={contactNotes}
                        onChange={(e) => setContactNotes(e.target.value)}
                        placeholder="Detail the client's reaction, specific feature inquiries, budget confirmations, or scheduling details..."
                        className="w-full p-3 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                          Schedule Next Follow-up (Optional)
                        </label>
                        <input
                          type="date"
                          value={nextFollowUpDate}
                          onChange={(e) => setNextFollowUpDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:opacity-90 text-[#030B24] font-extrabold text-xs transition-opacity shadow-lg shadow-[#087BFF]/30 cursor-pointer"
                      >
                        Log Outcome &amp; Update Status
                      </button>
                    </div>
                  </form>

                  {/* Contact History Log */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <History className="w-4 h-4 text-[#00D9FF]" />
                      <span>Contact Attempts &amp; Outcome History</span>
                    </span>

                    <div className="space-y-2">
                      {!selectedLead.contactHistory || selectedLead.contactHistory.length === 0 ? (
                        <div className="p-4 rounded-xl bg-[#08183A]/50 text-xs text-slate-400 text-center">
                          No previous contact attempts logged yet.
                        </div>
                      ) : (
                        selectedLead.contactHistory.map((entry) => (
                          <div key={entry.id} className="p-4 rounded-xl bg-[#08183A] border border-white/5 space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white capitalize flex items-center gap-1.5">
                                <PhoneCall className="w-3.5 h-3.5 text-[#00D9FF]" />
                                <span>{entry.method}</span>
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {new Date(entry.date).toLocaleString()}
                              </span>
                            </div>

                            <div className="text-xs font-mono text-amber-300">
                              {entry.outcome.replace(/_/g, " ")}
                            </div>

                            {entry.notes && (
                              <p className="text-xs text-slate-300 bg-[#05112A] p-2 rounded-lg mt-1">
                                {entry.notes}
                              </p>
                            )}

                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                              <span>Staff: {entry.staffName}</span>
                              {entry.nextFollowUpDate && (
                                <span className="text-cyan-400">Next Follow-up: {entry.nextFollowUpDate}</span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: REQUIREMENTS */}
              {activeWorkspaceTab === "requirements" && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-[#08183A] border border-white/5 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#00D9FF]" />
                      <span>Structured Discovery &amp; Functional Scope</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-3 rounded-xl bg-[#05112A] border border-white/5">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Product Category</span>
                        <span className="text-xs font-bold text-white mt-1 block">
                          {selectedLead.serviceRequired}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#05112A] border border-white/5">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Industry Sector</span>
                        <span className="text-xs font-bold text-white mt-1 block">
                          {selectedLead.industry || "General Commercial"}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#05112A] border border-white/5">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">Timeline Urgency</span>
                        <span className="text-xs font-bold text-white mt-1 block">
                          {selectedLead.timeline || "Flexible"}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    {selectedLead.featuresList && selectedLead.featuresList.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                          Requested Modules &amp; Feature Capabilities
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedLead.featuresList.map((f, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-[#05112A] border border-white/10 text-xs text-slate-200 flex items-center gap-1.5"
                            >
                              <Check className="w-3 h-3 text-[#00D9FF]" />
                              <span>{f}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Full Raw Details */}
                    {selectedLead.message && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                          Full Client Specification
                        </span>
                        <div className="p-4 rounded-xl bg-[#05112A] border border-white/5 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                          {selectedLead.message}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: STITCH DESIGN BLUEPRINT */}
              {activeWorkspaceTab === "design" && (
                <div className="space-y-6">
                  {selectedLead.designDetails ? (
                    <div className="space-y-6">
                      {/* Design Info Header */}
                      <div className="p-5 rounded-2xl bg-[#08183A] border border-white/5 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase">
                              {selectedLead.designDetails.projectCode || selectedLead.designDetails.projectId || "STITCH-DEMO"}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-slate-300">
                              Version: v{selectedLead.designDetails.versionNumber || 1}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#00D9FF]/20 text-[#00D9FF] text-[10px] font-bold">
                              Provider: {selectedLead.designDetails.provider || "stitch"}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mt-1">
                            {selectedLead.designDetails.title || "Personalized AI Prototype"}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          {selectedLead.designDetails.downloadUrl && (
                            <a
                              href={selectedLead.designDetails.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-xl bg-[#087BFF] hover:bg-[#00D9FF] hover:text-[#030B24] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download HTML</span>
                            </a>
                          )}
                          <a
                            href={`/design-studio?projectId=${selectedLead.designDetails.projectId || ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-[#05112A] hover:bg-white/10 text-white text-xs font-bold transition-colors border border-white/10 flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-[#00D9FF]" />
                            <span>Open in Design Studio</span>
                          </a>
                        </div>
                      </div>

                      {/* Screen Preview Screenshot */}
                      {selectedLead.designDetails.thumbnailUrl && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                            Screen Render Snapshot
                          </span>
                          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#05112A] max-h-96 flex items-center justify-center p-2">
                            <img
                              src={selectedLead.designDetails.thumbnailUrl}
                              alt={selectedLead.designDetails.title || "Design Screenshot"}
                              className="w-full h-auto object-contain max-h-88 rounded-xl"
                            />
                          </div>
                        </div>
                      )}

                      {/* Color Palette */}
                      {selectedLead.designDetails.palette && selectedLead.designDetails.palette.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                            Generated Brand Color Palette
                          </span>
                          <div className="flex flex-wrap gap-3">
                            {selectedLead.designDetails.palette.map((color, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#08183A] border border-white/10 text-xs font-mono"
                              >
                                <span
                                  className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                                  style={{ backgroundColor: color.hex }}
                                />
                                <span className="text-white font-bold">{color.hex}</span>
                                <span className="text-slate-400 text-[10px]">{color.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Stitch Blueprint Prompt */}
                      {selectedLead.designDetails.prompt && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                            Exact Stitch AI Generation Prompt
                          </span>
                          <div className="p-4 rounded-xl bg-[#05112A] border border-white/5 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {selectedLead.designDetails.prompt}
                          </div>
                        </div>
                      )}

                      {/* Design Markdown Documentation */}
                      {selectedLead.designDetails.designMd && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                            Design Artifact Specification (DESIGN.md)
                          </span>
                          <div className="p-4 rounded-xl bg-[#05112A] border border-white/5 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                            {selectedLead.designDetails.designMd}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-[#08183A] text-center space-y-3">
                      <Sparkles className="w-10 h-10 mx-auto text-slate-500 opacity-50" />
                      <h4 className="text-sm font-bold text-white">No Stitch Blueprint Attached</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        This enquiry was submitted directly via website forms without an associated Google Stitch interactive demo session.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: TECHNICAL ASSESSMENT */}
              {activeWorkspaceTab === "assessment" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#087BFF]/10 border border-[#087BFF]/30 flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-[#00D9FF] shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <div className="font-bold text-white">Engineering Feasibility &amp; Pre-Sales Architecture</div>
                      <p className="text-slate-300">
                        Record internal technical feasibility, architectural choices, and delivery risks without altering the client’s original submitted requirements.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveAssessment} className="p-5 rounded-2xl bg-[#08183A] border border-white/10 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                          Technical Feasibility Rating
                        </label>
                        <select
                          value={feasibility}
                          onChange={(e) => setFeasibility(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                        >
                          <option value="high">High Feasibility (Standard Proven Patterns)</option>
                          <option value="medium">Medium Feasibility (Requires Custom Integrations)</option>
                          <option value="complex">Complex Feasibility (Enterprise Scale / High Concurrency)</option>
                          <option value="requires_custom_rnd">Requires Custom R&amp;D (Frontier AI / Novel Arch)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                          Estimated Delivery Timeline
                        </label>
                        <input
                          type="text"
                          value={estWeeks}
                          onChange={(e) => setEstWeeks(e.target.value)}
                          placeholder="e.g. 3–4 Weeks"
                          className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                        Recommended System Architecture
                      </label>
                      <input
                        type="text"
                        value={recArch}
                        onChange={(e) => setRecArch(e.target.value)}
                        placeholder="e.g. Next.js 15 App Router + Edge SSR + Supabase PostgreSQL"
                        className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                        Recommended Technology Stack (Comma-Separated)
                      </label>
                      <input
                        type="text"
                        value={recStack}
                        onChange={(e) => setRecStack(e.target.value)}
                        placeholder="Next.js, TypeScript, Supabase, Tailwind CSS, Vercel Edge"
                        className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                        Engineering Risk Analysis &amp; Mitigations
                      </label>
                      <textarea
                        rows={2}
                        value={riskNotes}
                        onChange={(e) => setRiskNotes(e.target.value)}
                        placeholder="Identify third-party API dependencies, rate limits, regulatory constraints, or data migration risks..."
                        className="w-full p-3 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                        Internal Technical Notes (Confidential)
                      </label>
                      <textarea
                        rows={3}
                        value={assessmentNotes}
                        onChange={(e) => setAssessmentNotes(e.target.value)}
                        placeholder="Record internal engineering guidance for the team assembling the quotation..."
                        className="w-full p-3 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00D9FF]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#087BFF] hover:bg-[#00D9FF] hover:text-[#030B24] font-bold text-xs text-white transition-colors cursor-pointer shadow-lg shadow-[#087BFF]/30"
                    >
                      Save Technical Assessment
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 6: ACTIVITY & NOTES */}
              {activeWorkspaceTab === "history" && (
                <div className="space-y-6">
                  {/* Private Internal Notes */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-[#00D9FF]" />
                        <span>Private Administrative Discussion Thread</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {selectedLead.internalNotes?.length || 0} notes
                      </span>
                    </div>

                    {/* Add Note Form */}
                    <form onSubmit={handleNoteSubmit} className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Log internal note, quotation discussion, or client feedback..."
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
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {!selectedLead.internalNotes || selectedLead.internalNotes.length === 0 ? (
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
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-[#05112A] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Last Active: {selectedLead.lastActivityAt || selectedLead.createdAt}</span>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer"
              >
                Close Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lost Reason Dialog Modal */}
      {showLostReasonModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-60 flex items-center justify-center p-4">
          <div className="bg-[#071638] border border-rose-500/40 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-bold text-white">Record Lost / Closed Reason</h3>
            </div>
            <p className="text-xs text-slate-300">
              To maintain accurate business intelligence, please specify why this enquiry is being marked as {pendingLostStatus?.replace(/_/g, " ")}.
            </p>

            <textarea
              rows={3}
              value={lostReasonInput}
              onChange={(e) => setLostReasonInput(e.target.value)}
              placeholder="e.g. Budget mismatch, timing postponed to Q2, selected internal builder, unresponsive after 5 attempts..."
              className="w-full p-3 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowLostReasonModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLostReason}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-colors"
              >
                Confirm Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
