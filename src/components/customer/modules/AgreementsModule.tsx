"use client";

import React, { useState } from "react";
import { 
  FileCheck2, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Upload
} from "lucide-react";
import { formatINR } from "@/data/developmentPackages";

interface AgreementsModuleProps {
  onNavigateTab?: (tab: string, contextId?: string) => void;
}

export function AgreementsModule({ onNavigateTab }: AgreementsModuleProps) {
  const [agreementStatus, setAgreementStatus] = useState<"Pending" | "Executed">("Executed");
  const [signatoryName, setSignatoryName] = useState("Vikram Malhotra");
  const [signatoryDesignation, setSignatoryDesignation] = useState("Managing Director");
  const [signedDate, setSignedDate] = useState("November 11, 2026, 04:30 PM IST");
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);

  const clauses = [
    {
      title: "1. Parties & Purpose",
      body: "This Master Services Agreement & Statement of Work is entered into between STARX ALPHA LABS (Complete Technology Company, Indore/Mumbai) and Nexus Logistics Hub Private Limited (Client). StarX Alpha Labs is commissioned to engineer, test, deploy, and support the Nexus Fleet Logistics & Multi-City Dispatch Platform."
    },
    {
      title: "2. Intellectual Property & Ownership",
      body: "Upon verified final payment clearance, 100% full legal title, intellectual property, production source code repositories, design assets, and database schemas shall be assigned irrevocably to the Client. StarX Alpha Labs retains zero residual proprietary lock-in on custom code developed for this engagement."
    },
    {
      title: "3. Milestone Payments & Invoicing",
      body: "Total fixed investment is ₹75,515 (inclusive of 18% GST). Milestone 1 (40% Advance on Kickoff: ₹30,206), Milestone 2 (40% on Staging Beta UAT: ₹30,206), and Milestone 3 (20% on Production DNS Handover: ₹15,103). Project activation requires verified advance settlement."
    },
    {
      title: "4. Hypercare & 30-Day Post-Launch Warranty",
      body: "StarX Alpha Labs provides 30 consecutive calendar days of comprehensive bug hypercare commencing immediately upon production deployment handover. Covers functional defects, configuration anomalies, and query performance optimizations at zero additional cost."
    },
    {
      title: "5. Confidentiality & Non-Disclosure",
      body: "Both parties agree to treat all business telemetry, client lists, API keys, algorithmic routines, and technical specifications as strictly confidential and proprietary."
    },
    {
      title: "6. Change Request Protocol",
      body: "Any functional scope enhancements outside the approved SRS shall be evaluated under a transparent Change Request (CR) sprint addendum without halting baseline milestone velocity."
    },
    {
      title: "7. Governing Law & Dispute Resolution",
      body: "This Agreement is governed by the laws of India, subject to the exclusive jurisdiction of the competent courts in Indore and Mumbai."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
            Commercial Work Order &amp; Legal Protection
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1">My Agreements</h2>
          <p className="text-xs text-[#C8D5EF] mt-1">
            Executed master service agreements, statements of work, and verifiable electronic signature audit trails.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-extrabold text-xs shadow-lg shadow-[#087BFF]/30 hover:brightness-110 shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Print / Save Agreement (A4)</span>
        </button>
      </div>

      {/* Active Agreement Summary Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0A1940] border border-[#00D9FF]/30 shadow-2xl space-y-6">
        <div className="flex flex-wrap justify-between items-start gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-base text-[#00D9FF]">STARX-AGR-2026-000101</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#00C98B]/20 text-[#00C98B] border border-[#00C98B]/40 font-mono text-[10px] font-bold uppercase">
                {agreementStatus === "Executed" ? "Executed & Legally Binding ✓" : "Pending Signature"}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">Master Development &amp; IP Assignment Agreement</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Associated Proposal: <strong className="text-white">STARX-PROP-2026-000101</strong> • Estimate: <strong className="text-white">STARX-EST-2026-001042</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Contract Value</span>
            <span className="font-mono font-extrabold text-2xl text-[#00D9FF]">₹75,515</span>
            <span className="text-[10px] text-slate-400 block">40% Advance Cleared: ₹30,206</span>
          </div>
        </div>

        {/* Execution & Audit Trail */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ELECTRONIC SIGNATURE AUDIT TRAIL</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div>
              <span className="text-slate-400 block text-[10px]">Client Signatory</span>
              <span className="font-bold text-white">{signatoryName}</span>
              <span className="text-[10px] text-emerald-300 block">{signatoryDesignation}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Execution Timestamp</span>
              <span className="text-white font-medium">{signedDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Integrity Hash</span>
              <span className="font-mono text-[10px] text-slate-300">SHA256: 8f4c2e...b971a0</span>
            </div>
          </div>
        </div>

        {/* Legal Clauses Grid */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase text-[#00D9FF] tracking-wider">
            Standard Work Order Clauses &amp; Protection Terms
          </h4>
          <div className="space-y-3">
            {clauses.map((clause, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-1">
                <h5 className="text-xs font-bold text-white">{clause.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed">{clause.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step: Milestone Financing */}
        {onNavigateTab && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#071638] border border-white/10">
            <div>
              <span className="text-xs font-bold text-white block">Next Operational Phase: Invoices &amp; Payments</span>
              <span className="text-[11px] text-slate-400">
                View your Advance Milestone Invoice (SX-INV-001) or review payment verification receipts.
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("finances")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold text-xs flex items-center gap-1.5 hover:brightness-110 cursor-pointer"
            >
              <span>View Invoices &amp; Payment History →</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
