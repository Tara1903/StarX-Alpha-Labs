"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getQuotations, updateQuotationStatus, Quotation } from "@/lib/quotationStore";
import { getClientProjects, ClientProject, PROJECT_STAGES } from "@/lib/projectStore";
import { getEnquiries, DemoEnquiry } from "@/lib/leadStore";
import { useLanguage } from "@/context/LanguageContext";
import { 
  FileText, 
  Layers, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Download, 
  Sparkles, 
  ArrowRight, 
  Building, 
  User, 
  ShieldCheck, 
  LogOut,
  LogIn,
  Send,
  MessageSquare,
  AlertTriangle
} from "lucide-react";

export function CustomerPortalClient() {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<"quotations" | "projects" | "enquiries">("quotations");
  const [quotations, setQuotations] = useState<Quotation[]>(() =>
    typeof window !== "undefined" ? getQuotations() : []
  );
  const [projects, setProjects] = useState<ClientProject[]>(() =>
    typeof window !== "undefined" ? getClientProjects() : []
  );
  const [enquiries, setEnquiries] = useState<DemoEnquiry[]>(() =>
    typeof window !== "undefined" ? getEnquiries() : []
  );
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Modification request modal state
  const [modifyingQuoteId, setModifyingQuoteId] = useState<string | null>(null);
  const [modText, setModText] = useState("");

  const refreshData = () => {
    setQuotations(getQuotations());
    setProjects(getClientProjects());
    setEnquiries(getEnquiries());
  };

  const handleApprove = (id: string) => {
    if (confirm("Are you sure you want to approve this quotation? This will automatically initiate your project into Requirement Gathering & Sprint 1.")) {
      updateQuotationStatus(id, "Approved");
      setActionNotice("Quotation Approved! Project initialized in 'Requirement Gathering' stage.");
      refreshData();
      setActiveTab("projects");
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  const handleReject = (id: string) => {
    const reason = prompt("Optional: Provide a reason for declining this quotation");
    updateQuotationStatus(id, "Rejected", reason || "Declined by customer");
    setActionNotice("Quotation status marked as Declined.");
    refreshData();
    setTimeout(() => setActionNotice(null), 3000);
  };

  const submitModification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modifyingQuoteId) return;
    updateQuotationStatus(modifyingQuoteId, "Modification Requested", modText);
    setActionNotice("Modification request sent to engineering leads!");
    setModifyingQuoteId(null);
    setModText("");
    refreshData();
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#143054] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#102D50] text-[#73D8FF] border border-[#1769AA]/40">
                Customer Workspace
              </span>
              <span className="text-xs text-slate-400 font-mono">Client ID: CLT-7489</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Customer Acquisition & Project Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/demos"
              className="px-4 py-2 rounded-xl bg-[#1769AA] text-white text-xs font-semibold hover:bg-[#1E7ECA] flex items-center gap-1.5 shadow-md shadow-[#1769AA]/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Browse 160 Demos</span>
            </Link>
          </div>
        </div>

        {/* Action Notice Alert */}
        {actionNotice && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-sm flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Quick Tabs: Quotations, Active Projects, Enquiries */}
        <div className="flex items-center gap-2 border-b border-[#143054] pb-2 overflow-x-auto">
          {[
            { id: "quotations", label: `Commercial Quotations (${quotations.length})`, icon: FileText },
            { id: "projects", label: `Active Projects (${projects.length})`, icon: Layers },
            { id: "enquiries", label: `Demo Enquiries (${enquiries.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-[#1769AA] text-white shadow-lg shadow-[#1769AA]/30"
                    : "bg-[#091527] text-slate-400 hover:text-white border border-[#143054]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: QUOTATIONS */}
        {activeTab === "quotations" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Your Technical & Commercial Quotations</h2>
              <span className="text-xs text-slate-400">Review line items, milestones, and approve projects</span>
            </div>

            {quotations.length === 0 ? (
              <div className="p-12 text-center bg-[#091527] rounded-3xl border border-[#163359] space-y-3">
                <FileText className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Quotations Generated Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Select any demo model from the catalog and click &ldquo;Get Quotation&rdquo; or &ldquo;Customize&rdquo; to receive an architecture proposal.
                </p>
                <Link
                  href="/demos"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1769AA] text-white text-xs font-semibold mt-2"
                >
                  Explore 160 Models
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {quotations.map((qt) => {
                  const isApproved = qt.status === "Approved";
                  const isRejected = qt.status === "Rejected";

                  return (
                    <div
                      key={qt.id}
                      className="p-6 sm:p-8 rounded-3xl bg-[#091527] border border-[#1E4373] space-y-6 shadow-xl"
                    >
                      {/* Quotation Header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#143054] pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#73D8FF]">{qt.quotationNumber}</span>
                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                              isApproved
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                : isRejected
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                                : "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
                            }`}>
                              {qt.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mt-1">{qt.selectedSolution}</h3>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Client: {qt.clientName} &bull; {qt.clientBusiness}
                          </div>
                        </div>

                        <div className="text-right sm:border-l sm:border-[#143054] sm:pl-6">
                          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Total Investment</span>
                          <div className="text-2xl font-extrabold text-[#73D8FF]">
                            ₹{qt.totalAmount.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">Incl. 18% GST (₹{qt.taxAmount.toLocaleString()})</div>
                        </div>
                      </div>

                      {/* Project Scope & Timeline */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#050D1A] border border-[#143054] space-y-1">
                          <span className="font-semibold text-slate-300">Project Scope Summary:</span>
                          <p className="text-slate-300 leading-relaxed">{qt.projectScope}</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#050D1A] border border-[#143054] space-y-2">
                          <div>
                            <span className="font-semibold text-slate-300">Target Delivery Timeline: </span>
                            <span className="text-emerald-400 font-mono">{qt.deliveryTimeline}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-300">Payment Milestones: </span>
                            <span className="text-slate-300">{qt.paymentSchedule}</span>
                          </div>
                        </div>
                      </div>

                      {/* Line Items Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border border-[#143054] rounded-xl overflow-hidden">
                          <thead className="bg-[#050D1A] text-slate-400 uppercase font-mono text-[10px]">
                            <tr>
                              <th className="p-3">Category</th>
                              <th className="p-3">Deliverable Scope</th>
                              <th className="p-3 text-right">Amount (INR)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#143054]">
                            {qt.items.map((it) => (
                              <tr key={it.id} className="hover:bg-[#0E203B]/50">
                                <td className="p-3 font-semibold text-slate-300">{it.category}</td>
                                <td className="p-3">
                                  <div className="font-bold text-white">{it.title}</div>
                                  <div className="text-slate-400 text-[11px]">{it.description}</div>
                                </td>
                                <td className="p-3 text-right font-mono text-[#73D8FF] font-semibold">
                                  ₹{it.amount.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Terms & Conditions */}
                      <div className="p-3.5 rounded-xl bg-[#050D1A] border border-[#143054] space-y-1.5 text-xs">
                        <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
                          Key Terms & Engineering Commitments:
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                          {qt.termsAndConditions.map((term, tIdx) => (
                            <li key={tIdx}>{term}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Customer Actions */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#143054]">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.print()}
                            className="px-3.5 py-2 rounded-xl bg-[#050D1A] hover:bg-[#10243E] text-slate-300 border border-[#143054] text-xs font-medium flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download / Print Quotation</span>
                          </button>
                        </div>

                        {!isApproved && !isRejected && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setModifyingQuoteId(qt.id);
                                setModText("");
                              }}
                              className="px-4 py-2 rounded-xl bg-[#091527] hover:bg-[#132B4C] text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Request Changes</span>
                            </button>
                            <button
                              onClick={() => handleReject(qt.id)}
                              className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs font-semibold"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => handleApprove(qt.id)}
                              className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Approve & Launch Project</span>
                            </button>
                          </div>
                        )}

                        {isApproved && (
                          <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Quotation Approved &bell; Project active in workspace</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Your Development Projects</h2>
              <span className="text-xs text-slate-400">8-Stage transparent software engineering progression</span>
            </div>

            {projects.length === 0 ? (
              <div className="p-12 text-center bg-[#091527] rounded-3xl border border-[#163359] space-y-3">
                <Layers className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Projects in Progress</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  When you approve a quotation, a dedicated project pipeline is spun up automatically here.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-6 sm:p-8 rounded-3xl bg-[#091527] border border-[#163359] space-y-6 shadow-xl"
                  >
                    {/* Project Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#143054] pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#102D50] text-[#73D8FF]">
                            {proj.projectCode}
                          </span>
                          <span className="text-xs font-semibold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                            {proj.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mt-1">{proj.projectName}</h3>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-400">Current Phase</span>
                        <div className="text-sm font-bold text-[#73D8FF]">{proj.currentStage}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Handover Target: {proj.targetHandoverDate}
                        </div>
                      </div>
                    </div>

                    {/* 8-Stage Visual Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">Lifecycle Progress</span>
                        <span className="font-mono text-[#73D8FF] font-bold">{proj.progressPercent}% Completed</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#050D1A] overflow-hidden border border-[#143054]">
                        <div
                          className="h-full bg-gradient-to-r from-[#1769AA] via-[#32A9E8] to-emerald-400 transition-all duration-500"
                          style={{ width: `${proj.progressPercent}%` }}
                        />
                      </div>

                      {/* 8 Stages Pills */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 pt-2">
                        {PROJECT_STAGES.map((stg, sIdx) => {
                          const currentIdx = PROJECT_STAGES.indexOf(proj.currentStage);
                          const isPast = sIdx < currentIdx;
                          const isCurrent = sIdx === currentIdx;

                          return (
                            <div
                              key={stg}
                              className={`p-2 rounded-xl text-center border text-[10px] font-medium transition-all ${
                                isPast
                                  ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/40"
                                  : isCurrent
                                  ? "bg-[#1769AA] text-white border-[#32A9E8] shadow-md shadow-[#1769AA]/40 font-bold"
                                  : "bg-[#050D1A] text-slate-500 border-[#143054]"
                              }`}
                            >
                              <div className="font-mono text-[9px] mb-0.5">#{sIdx + 1}</div>
                              <div className="truncate">{stg}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Milestones & Updates Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-[#050D1A] border border-[#143054] space-y-2 text-xs">
                        <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] block">
                          Stage Checklist & Verification:
                        </span>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto">
                          {proj.milestones.map((m, mI) => (
                            <div key={mI} className="flex items-start gap-2 text-slate-300">
                              <CheckCircle2
                                className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                  m.completed ? "text-emerald-400" : "text-slate-600"
                                }`}
                              />
                              <div>
                                <span className={m.completed ? "font-semibold text-white" : "text-slate-400"}>
                                  {m.stage}
                                </span>
                                {m.notes && <span className="text-[11px] text-slate-400 block">{m.notes}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#050D1A] border border-[#143054] space-y-2 text-xs">
                        <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] block">
                          Recent Architectural Logs:
                        </span>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {proj.recentUpdates.map((u, uI) => (
                            <div key={uI} className="border-l-2 border-[#32A9E8] pl-3 py-1 space-y-0.5">
                              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                                <span>{u.date}</span>
                                <span className="text-[#73D8FF]">{u.author}</span>
                              </div>
                              <p className="text-slate-200 text-xs">{u.message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DEMO ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Your Demo Customization Inquiries</h2>
              <span className="text-xs text-slate-400">Track response status from StarX solutions desk</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-5 rounded-2xl bg-[#091527] border border-[#143054] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#73D8FF]">{enq.id}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {enq.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{enq.selectedDemoName || enq.industry}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{enq.projectDescription}</p>

                  <div className="pt-2 border-t border-[#143054] flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Budget: {enq.estimatedBudget}</span>
                    <span>Contact: {enq.preferredContactMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modification Request Modal */}
        {modifyingQuoteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-lg bg-[#091527] border border-[#1E4373] rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Request Quotation Modification</h3>
              <p className="text-xs text-slate-300">
                Specify what changes you need (modules to add/remove, payment adjustments, or delivery date shifts).
              </p>
              <form onSubmit={submitModification} className="space-y-4">
                <textarea
                  required
                  rows={4}
                  value={modText}
                  onChange={(e) => setModText(e.target.value)}
                  placeholder="e.g. Please split the development into 2 sub-phases and include SMS gateway integration..."
                  className="w-full p-3 bg-[#050D1A] border border-[#143054] rounded-xl text-xs text-white focus:outline-none focus:border-[#32A9E8]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModifyingQuoteId(null)}
                    className="px-4 py-2 rounded-xl bg-[#050D1A] text-slate-400 text-xs font-semibold hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1769AA] text-white text-xs font-bold hover:bg-[#1E7ECA]"
                  >
                    Send to Architects
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
