"use client";

import React, { useState, useEffect } from "react";
import { 
  FileCheck, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  RotateCcw,
  History
} from "lucide-react";
import { 
  getQuotations, 
  Quotation, 
  acceptProposal, 
  requestProposalRevision 
} from "@/lib/quotationStore";
import { formatINR } from "@/data/developmentPackages";
import { printProposalPDF } from "@/lib/pdfGenerator";

interface ProposalsModuleProps {
  onNavigateTab?: (tab: string, contextId?: string) => void;
  filterProposalId?: string;
}

export function ProposalsModule({ onNavigateTab, filterProposalId }: ProposalsModuleProps) {
  const [proposals, setProposals] = useState<Quotation[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<Quotation | null>(null);
  const [signatoryName, setSignatoryName] = useState("");
  const [designation, setDesignation] = useState("Authorized Signatory");
  const [revisionNotes, setRevisionNotes] = useState("");
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  useEffect(() => {
    const list = getQuotations();
    setProposals(list);
    if (filterProposalId) {
      const match = list.find((p) => p.proposalNumber === filterProposalId || p.id === filterProposalId);
      if (match) setSelectedProposal(match);
      else if (list.length > 0) setSelectedProposal(list[0]);
    } else if (list.length > 0) {
      setSelectedProposal(list[0]);
    }
  }, [filterProposalId]);

  const handleAccept = () => {
    if (!selectedProposal) return;
    if (!signatoryName.trim()) {
      alert("Please provide the full legal name of the authorized signatory.");
      return;
    }
    const updated = acceptProposal(selectedProposal.id, signatoryName.trim(), designation.trim());
    if (updated) {
      setProposals(getQuotations());
      setSelectedProposal(updated);
      setIsAcceptModalOpen(false);
    }
  };

  const handleRevision = () => {
    if (!selectedProposal) return;
    if (!revisionNotes.trim()) {
      alert("Please specify the exact revisions or changes requested.");
      return;
    }
    const updated = requestProposalRevision(selectedProposal.id, revisionNotes.trim());
    if (updated) {
      setProposals(getQuotations());
      setSelectedProposal(updated);
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
            Formal Scope &amp; Commercial Agreement Review
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1">My Proposals</h2>
          <p className="text-xs text-[#C8D5EF] mt-1">
            Review technical specifications, milestone deliverables, architecture contracts, and formal payment schedules.
          </p>
        </div>

        {selectedProposal && (
          <button
            type="button"
            onClick={() => printProposalPDF(selectedProposal)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-extrabold text-xs shadow-lg shadow-[#087BFF]/30 hover:brightness-110 shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Proposal PDF (A4)</span>
          </button>
        )}
      </div>

      {proposals.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0A1940] border border-white/5 space-y-4">
          <FileCheck className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Proposals Issued Yet</h3>
          <p className="text-xs text-[#C8D5EF] max-w-md mx-auto">
            Once StarX Alpha Labs finishes requirement verification for your estimate, your formal technical proposal will appear here for review and digital signoff.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Proposals Selector Roster */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Active Proposals ({proposals.length})
            </h3>
            {proposals.map((prop) => {
              const isSelected = selectedProposal?.id === prop.id;
              return (
                <div
                  key={prop.id}
                  onClick={() => setSelectedProposal(prop)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? "bg-[#0A1940] border-[#00D9FF] ring-1 ring-[#00D9FF] shadow-xl shadow-[#087BFF]/10"
                      : "bg-[#0A1940]/60 border-white/5 hover:border-white/20 hover:bg-[#0A1940]"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono font-bold text-sm text-[#00D9FF]">{prop.proposalNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border uppercase ${
                      prop.status === "Approved"
                        ? "bg-[#00C98B]/20 text-[#00C98B] border-[#00C98B]/40 font-bold"
                        : prop.status === "Revision Requested"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                        : "bg-blue-500/20 text-blue-400 border-blue-500/40"
                    }`}>
                      {prop.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{prop.projectTitle}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Version: {prop.currentVersion}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-white/5 text-xs">
                    <span className="text-slate-400 text-[10px]">Total Investment:</span>
                    <span className="font-mono font-bold text-white">{formatINR(prop.totalAmount)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Proposal Deep View (Center & Right 2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {selectedProposal && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-white/10 shadow-2xl space-y-6 animate-fade-in">
                {/* Header Information */}
                <div className="flex flex-wrap justify-between items-start gap-4 border-b border-white/10 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-base text-[#00D9FF]">{selectedProposal.proposalNumber}</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-bold">
                        {selectedProposal.currentVersion}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white mt-1">{selectedProposal.projectTitle}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Client: <strong className="text-white">{selectedProposal.clientName}</strong> ({selectedProposal.clientBusiness})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Fixed Investment</span>
                    <span className="font-mono font-extrabold text-2xl text-[#00D9FF]">
                      {formatINR(selectedProposal.totalAmount)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">incl. 18% GST</span>
                  </div>
                </div>

                {/* Acceptance Banner or Actions */}
                {selectedProposal.status === "Approved" && selectedProposal.acceptance ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>PROPOSAL OFFICIALLY ACCEPTED &amp; LOCKED</span>
                    </div>
                    <p className="text-xs text-emerald-200">
                      Accepted by <strong>{selectedProposal.acceptance.clientSignatureName}</strong> ({selectedProposal.acceptance.designation}) on{" "}
                      {new Date(selectedProposal.acceptance.acceptedAt).toLocaleString("en-IN")}.
                      Verification Code: <span className="font-mono font-bold text-white">{selectedProposal.acceptance.verificationHash}</span>.
                    </p>
                    {onNavigateTab && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => onNavigateTab("agreements")}
                          className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Proceed to Project Agreement &amp; Signature →</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : selectedProposal.status === "Revision Requested" ? (
                  <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-1">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                      <Clock className="w-4 h-4" />
                      <span>Scope Revision Requested by Client</span>
                    </div>
                    <p className="text-xs text-amber-200">
                      Revision Note: &ldquo;{selectedProposal.customerRevisionNotes}&rdquo;. Our engineering lead is drafting revision {selectedProposal.currentVersion === "v1.0" ? "v2.0" : "next"}.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-[#071638] border border-white/10 items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Ready for Digital Acceptance?</span>
                      <span className="text-[11px] text-slate-400">
                        Accepting records your formal intent and unlocks the execution agreement.
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsRevisionModalOpen(true)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                      >
                        Request Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAcceptModalOpen(true)}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00C98B] to-[#00D9FF] text-slate-950 font-extrabold text-xs shadow-lg hover:brightness-110 cursor-pointer"
                      >
                        Accept Official Proposal ✓
                      </button>
                    </div>
                  </div>
                )}

                {/* Section 1: Executive Overview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#00D9FF] tracking-wider">
                    1. Executive Overview &amp; Objectives
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-[#071638] p-4 rounded-xl border border-white/5">
                    {selectedProposal.projectOverview}
                  </p>
                  <div className="space-y-1 pt-1">
                    {selectedProposal.businessObjectives.map((obj, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Technical Scope, Modules & Tech Stack */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#00D9FF] tracking-wider">
                    2. Deliverable Modules &amp; Technology Stack
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Scope Modules</span>
                      <ul className="space-y-1 text-slate-300">
                        {selectedProposal.modules.map((m, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Tech Stack &amp; APIs</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProposal.techStack.map((tech, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-md bg-[#0A1940] border border-white/10 text-white font-mono text-[10px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="pt-2 text-[11px] text-slate-400">
                        <strong>Integrations:</strong> {selectedProposal.thirdPartyIntegrations.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Itemized Financial Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#00D9FF] tracking-wider">
                    3. Fixed Investment Breakdown
                  </h4>
                  <div className="border border-white/10 rounded-2xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-[#071638] text-[10px] uppercase font-mono text-slate-400 border-b border-white/10">
                        <tr>
                          <th className="p-3">Deliverable Item</th>
                          <th className="p-3">Category</th>
                          <th className="p-3 text-right">Investment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {selectedProposal.items.map((item) => (
                          <tr key={item.id} className="hover:bg-white/5">
                            <td className="p-3">
                              <span className="font-bold text-white block">{item.title}</span>
                              <span className="text-[10px] text-slate-400">{item.description}</span>
                            </td>
                            <td className="p-3 text-slate-300">{item.category}</td>
                            <td className="p-3 text-right font-mono font-bold text-white">
                              {formatINR(item.amount)}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-[#071638]/60 font-semibold">
                          <td colSpan={2} className="p-3 text-right text-slate-400">Subtotal:</td>
                          <td className="p-3 text-right font-mono text-[#00D9FF]">{formatINR(selectedProposal.subtotal)}</td>
                        </tr>
                        <tr className="bg-[#071638]/60 text-slate-400">
                          <td colSpan={2} className="p-3 text-right">GST (18%):</td>
                          <td className="p-3 text-right font-mono">{formatINR(selectedProposal.taxAmount)}</td>
                        </tr>
                        <tr className="bg-[#030B24] font-bold text-white border-t border-[#00D9FF]/40">
                          <td colSpan={2} className="p-3 text-right">Total Project Investment:</td>
                          <td className="p-3 text-right font-mono text-base text-[#00D9FF] font-extrabold">
                            {formatINR(selectedProposal.totalAmount)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 4: Milestone Payment Schedule */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#00D9FF] tracking-wider">
                    4. Milestone Payment Schedule
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {selectedProposal.milestoneSchedules.map((m) => (
                      <div key={m.milestoneNumber} className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[10px] font-bold text-[#00D9FF] uppercase">{m.duePeriod}</span>
                          <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white font-bold">{m.percentage}%</span>
                        </div>
                        <h5 className="font-bold text-white">{m.title}</h5>
                        <ul className="text-[11px] text-slate-400 space-y-0.5">
                          {m.deliverables.map((d, i) => (
                            <li key={i}>• {d}</li>
                          ))}
                        </ul>
                        <div className="pt-2 border-t border-white/5 text-right font-mono font-bold text-[#00C98B]">
                          {formatINR(m.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Standard Guarantees & IP */}
                <div className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-2 text-xs text-slate-300">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Ownership &amp; Guarantees</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <strong className="text-white block">Full IP Ownership:</strong>
                      <span>{selectedProposal.intellectualPropertyTerms}</span>
                    </div>
                    <div>
                      <strong className="text-white block">30-Day Post-Launch Warranty:</strong>
                      <span>Includes comprehensive defect remediation and rapid SLA response during kickoff warranty.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Accept Proposal Modal */}
      {isAcceptModalOpen && selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1940] border border-[#00C98B]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#00C98B] font-bold">Legal Intent Record</span>
              <h3 className="text-xl font-bold text-white mt-1">Accept Official Proposal {selectedProposal.proposalNumber}</h3>
              <p className="text-xs text-[#C8D5EF] mt-1">
                You are accepting version <strong className="text-white">{selectedProposal.currentVersion}</strong> with a total fixed investment of{" "}
                <strong className="text-[#00D9FF]">{formatINR(selectedProposal.totalAmount)}</strong>.
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name of Authorized Signatory *</label>
                <input
                  type="text"
                  required
                  value={signatoryName}
                  onChange={(e) => setSignatoryName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#071638] border border-white/10 text-white text-xs focus:border-[#00C98B] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Corporate Designation / Role</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Managing Director / Founder"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#071638] border border-white/10 text-white text-xs focus:border-[#00C98B] focus:outline-none"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              By confirming, your timestamp, identity ({selectedProposal.clientEmail}), and IP audit trail will be permanently recorded. Next step: Project Agreement generation.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAcceptModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00C98B] to-[#00D9FF] text-slate-950 font-extrabold text-xs cursor-pointer shadow-lg hover:brightness-110"
              >
                Confirm Official Acceptance ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revision Request Modal */}
      {isRevisionModalOpen && selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0A1940] border border-[#00D9FF]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#00D9FF]">Proposal Revision</span>
              <h3 className="text-lg font-bold text-white mt-1">Request Proposal Revisions</h3>
              <p className="text-xs text-[#C8D5EF] mt-1">
                Describe the specific milestone splits, scope adjustments, or timeline changes needed for {selectedProposal.proposalNumber}.
              </p>
            </div>

            <textarea
              rows={4}
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              placeholder="e.g. We would like to add an offline sync capability to the driver mobile application..."
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
                onClick={handleRevision}
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
