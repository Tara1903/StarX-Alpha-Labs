"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getQuotations, updateQuotationStatus, Quotation } from "@/lib/quotationStore";
import { getClientProjects, ClientProject, PROJECT_STAGES } from "@/lib/projectStore";
import { getEnquiries, DemoEnquiry } from "@/lib/leadStore";
import { getEstimates, CustomerEstimate } from "@/lib/estimateStore";
import { useLanguage } from "@/context/LanguageContext";
import { formatINR } from "@/data/developmentPackages";
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
  AlertTriangle,
  Calculator
} from "lucide-react";

export function CustomerPortalClient() {
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<"quotations" | "projects" | "estimates" | "enquiries">("quotations");
  const [quotations, setQuotations] = useState<Quotation[]>(() =>
    typeof window !== "undefined" ? getQuotations() : []
  );
  const [projects, setProjects] = useState<ClientProject[]>(() =>
    typeof window !== "undefined" ? getClientProjects() : []
  );
  const [enquiries, setEnquiries] = useState<DemoEnquiry[]>(() =>
    typeof window !== "undefined" ? getEnquiries() : []
  );
  const [estimates, setEstimates] = useState<CustomerEstimate[]>(() =>
    typeof window !== "undefined" ? getEstimates() : []
  );
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Modification request modal state
  const [modifyingQuoteId, setModifyingQuoteId] = useState<string | null>(null);
  const [modText, setModText] = useState("");

  const refreshData = () => {
    setQuotations(getQuotations());
    setProjects(getClientProjects());
    setEnquiries(getEnquiries());
    setEstimates(getEstimates());
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
    <div className="min-h-screen bg-[#030B24] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/40">
                Customer Workspace
              </span>
              <span className="text-xs text-slate-400 font-mono">Client ID: CLT-7489</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Customer Acquisition &amp; Project Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/project-calculator"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold shadow-md hover:brightness-110 flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Project Calculator</span>
            </Link>
            <Link
              href="/demos"
              className="px-4 py-2 rounded-xl bg-[#071638] text-white text-xs font-semibold border border-white/10 hover:bg-[#0A1940] flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>Browse 160 Demos</span>
            </Link>
          </div>
        </div>

        {/* Action Notice Alert */}
        {actionNotice && (
          <div className="p-4 rounded-2xl bg-[#00C98B]/20 border border-[#00C98B] text-[#00C98B] text-sm flex items-center gap-2 animate-fade-in font-bold">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Quick Tabs: Quotations, Active Projects, Estimates, Enquiries */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
          {[
            { id: "quotations", label: `Commercial Quotations (${quotations.length})`, icon: FileText },
            { id: "projects", label: `Active Projects (${projects.length})`, icon: Layers },
            { id: "estimates", label: `Saved Estimates (${estimates.length})`, icon: Calculator },
            { id: "enquiries", label: `Demo Enquiries (${enquiries.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-lg shadow-[#087BFF]/30"
                    : "bg-[#0A1940] text-slate-400 hover:text-white border border-white/5"
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
              <h2 className="text-xl font-bold text-white">Your Technical &amp; Commercial Quotations</h2>
              <span className="text-xs text-slate-400">Review line items, milestones, and approve projects</span>
            </div>

            {quotations.length === 0 ? (
              <div className="p-12 text-center bg-[#0A1940] rounded-3xl border border-white/5 space-y-3">
                <FileText className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Quotations Generated Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Configure an estimate with our Project Calculator or select any demo model to receive a custom proposal.
                </p>
                <Link
                  href="/project-calculator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#087BFF] text-white text-xs font-semibold mt-2"
                >
                  Launch Project Calculator
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
                      className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/10 space-y-6 shadow-xl"
                    >
                      {/* Quotation Header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#00D9FF]">{qt.quotationNumber}</span>
                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                              isApproved
                                ? "bg-[#00C98B]/20 text-[#00C98B] border-[#00C98B]/40"
                                : isRejected
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                                : "bg-[#00D9FF]/20 text-[#00D9FF] border-[#00D9FF]/40"
                            }`}>
                              {qt.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mt-1">{qt.selectedSolution}</h3>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Client: {qt.clientName} &bull; {qt.clientBusiness}
                          </div>
                        </div>

                        <div className="text-right sm:border-l sm:border-white/10 sm:pl-6">
                          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Total Investment</span>
                          <div className="text-2xl font-extrabold text-[#00D9FF]">
                            {formatINR(qt.totalAmount)}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">Incl. 18% GST ({formatINR(qt.taxAmount)})</div>
                        </div>
                      </div>

                      {/* Project Scope & Timeline */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#071638] border border-white/5 space-y-1">
                          <span className="font-semibold text-slate-300">Project Scope Summary:</span>
                          <p className="text-slate-300 leading-relaxed">{qt.projectScope}</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#071638] border border-white/5 space-y-2">
                          <div>
                            <span className="font-semibold text-slate-300">Target Delivery Timeline: </span>
                            <span className="text-[#00C98B] font-mono">{qt.deliveryTimeline}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-300">Payment Milestones: </span>
                            <span className="text-slate-300">{qt.paymentSchedule}</span>
                          </div>
                        </div>
                      </div>

                      {/* Line Items Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border border-white/10 rounded-xl overflow-hidden">
                          <thead className="bg-[#071638] text-slate-400 uppercase font-mono text-[10px]">
                            <tr>
                              <th className="p-3">Category</th>
                              <th className="p-3">Deliverable Scope</th>
                              <th className="p-3 text-right">Amount (INR)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {qt.items.map((it) => (
                              <tr key={it.id} className="hover:bg-white/5">
                                <td className="p-3 font-semibold text-slate-300">{it.category}</td>
                                <td className="p-3">
                                  <div className="font-bold text-white">{it.title}</div>
                                  <div className="text-slate-400 text-[11px]">{it.description}</div>
                                </td>
                                <td className="p-3 text-right font-mono text-[#00D9FF] font-semibold">
                                  {formatINR(it.amount)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Customer Actions */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.print()}
                            className="px-3.5 py-2 rounded-xl bg-[#071638] hover:bg-[#0A1940] text-slate-300 border border-white/10 text-xs font-medium flex items-center gap-1.5"
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
                              className="px-4 py-2 rounded-xl bg-[#071638] hover:bg-[#0A1940] text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Request Changes</span>
                            </button>
                            <button
                              onClick={() => handleReject(qt.id)}
                              className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs font-semibold cursor-pointer"
                            >
                              Decline
                            </button>
                            <button
                              onClick={() => handleApprove(qt.id)}
                              className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#00C98B] to-emerald-400 hover:brightness-110 text-[#030B24] text-xs font-extrabold shadow-lg flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Approve &amp; Launch Project</span>
                            </button>
                          </div>
                        )}

                        {isApproved && (
                          <div className="text-xs text-[#00C98B] font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Quotation Approved &bull; Project active in workspace</span>
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

        {/* TAB 2: ACTIVE PROJECTS (13-STAGE WORKFLOW) */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Your Development Projects</h2>
              <span className="text-xs text-slate-400">13-Stage transparent software engineering progression</span>
            </div>

            {projects.length === 0 ? (
              <div className="p-12 text-center bg-[#0A1940] rounded-3xl border border-white/5 space-y-3">
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
                    className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/10 space-y-6 shadow-xl"
                  >
                    {/* Project Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#087BFF]/20 text-[#00D9FF]">
                            {proj.projectCode}
                          </span>
                          <span className="text-xs font-semibold text-[#00C98B] px-2.5 py-0.5 rounded-full bg-[#00C98B]/10 border border-[#00C98B]/30">
                            {proj.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white mt-1">{proj.projectName}</h3>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-400">Current Phase</span>
                        <div className="text-sm font-bold text-[#00D9FF]">{proj.currentStage}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Target Handover: {proj.targetHandoverDate}
                        </div>
                      </div>
                    </div>

                    {/* 13-Stage Visual Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">Lifecycle Progress</span>
                        <span className="font-mono text-[#00D9FF] font-bold">{proj.progressPercent}% Completed</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#071638] overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-[#087BFF] via-[#00D9FF] to-[#00C98B] transition-all duration-500"
                          style={{ width: `${proj.progressPercent}%` }}
                        />
                      </div>

                      {/* 13 Stages Pills Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 pt-2">
                        {PROJECT_STAGES.map((stg, sIdx) => {
                          const currentIdx = PROJECT_STAGES.indexOf(proj.currentStage);
                          const isPast = sIdx < currentIdx;
                          const isCurrent = sIdx === currentIdx;

                          return (
                            <div
                              key={stg}
                              className={`p-2 rounded-xl text-center border text-[10px] font-medium transition-all ${
                                isPast
                                  ? "bg-[#00C98B]/10 text-[#00C98B] border-[#00C98B]/30"
                                  : isCurrent
                                  ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white border-[#00D9FF] shadow font-bold"
                                  : "bg-[#071638] text-slate-500 border-white/5"
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
                      <div className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-2 text-xs">
                        <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] block">
                          Stage Checklist &amp; Verification:
                        </span>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto">
                          {proj.milestones.map((m, mI) => (
                            <div key={mI} className="flex items-start gap-2 text-slate-300">
                              <CheckCircle2
                                className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                  m.completed ? "text-[#00C98B]" : "text-slate-600"
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

                      <div className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-2 text-xs">
                        <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] block">
                          Recent Architectural Logs:
                        </span>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {proj.recentUpdates.map((u, uI) => (
                            <div key={uI} className="border-l-2 border-[#00D9FF] pl-3 py-1 space-y-0.5">
                              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                                <span>{u.date}</span>
                                <span className="text-[#00D9FF]">{u.author}</span>
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

        {/* TAB 3: ESTIMATES */}
        {activeTab === "estimates" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Your Saved Project Estimates</h2>
              <Link
                href="/project-calculator"
                className="text-xs font-bold text-[#00D9FF] hover:underline flex items-center gap-1"
              >
                <span>+ Configure New Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {estimates.length === 0 ? (
              <div className="p-12 text-center bg-[#0A1940] rounded-3xl border border-white/5 space-y-3">
                <Calculator className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Estimates Saved Yet</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Use our 7-step Project Calculator to configure your customized scope with instant itemized costs.
                </p>
                <Link
                  href="/project-calculator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold mt-2 shadow"
                >
                  Launch Project Calculator
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {estimates.map((est) => (
                  <div key={est.id} className="p-6 rounded-3xl bg-[#0A1940] border border-white/5 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#00D9FF] px-2 py-0.5 rounded bg-[#071638]">
                            {est.estimateNumber}
                          </span>
                          <span className="text-xs font-mono uppercase text-slate-300">
                            {est.division} Division
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00C98B]/20 text-[#00C98B]">
                            {est.status}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">
                          {est.packageCode} — {est.packageName}
                        </h4>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xl font-extrabold text-white">{formatINR(est.grandTotal)}</div>
                        <span className="text-[10px] font-mono text-slate-400">Incl. 18% GST</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#C8D5EF] flex items-center gap-4 flex-wrap pt-1 border-t border-white/5">
                      <span>Base: {formatINR(est.basePrice)}</span>
                      <span>Add-ons: +{formatINR(est.addonsTotal)} ({est.selectedAddons.length} items)</span>
                      <span>Hosting: +{formatINR(est.hostingCost)}</span>
                      <span>SLA: +{formatINR(est.maintenanceCost)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Your Demo &amp; Contact Enquiries</h2>
            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-5 rounded-2xl bg-[#0A1940] border border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">{enq.selectedDemoName || "General Engineering Consultation"}</span>
                    <span className="text-xs font-mono text-[#00D9FF]">{enq.status}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {(Array.isArray(enq.notes) ? enq.notes[0] : enq.notes) || enq.projectDescription || "Enquiry submitted via StarX Alpha Labs platform."}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block">
                    Received: {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal for Requesting Modifications */}
        {modifyingQuoteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-lg bg-[#0A1940] border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Request Quotation Scope Adjustment</h3>
              <form onSubmit={submitModification} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Describe requested additions, budget target, or timeline preferences:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={modText}
                    onChange={(e) => setModText(e.target.value)}
                    placeholder="e.g., We would like to add Razorpay automated payout splits and launch 1 week sooner..."
                    className="w-full p-3 bg-[#071638] border border-white/10 rounded-xl text-white focus:border-[#00D9FF] focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModifyingQuoteId(null)}
                    className="px-4 py-2 bg-[#071638] text-slate-400 rounded-xl hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold rounded-xl"
                  >
                    Send to Engineering Team
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
