"use client";

import React from "react";
import { useDesignStudio } from "../context/DesignStudioContext";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Download,
  Calendar,
  MessageSquare,
  Home,
} from "lucide-react";
import Link from "next/link";

export function EnquirySuccessView() {
  const { state, resetSession } = useDesignStudio();
  const enquiryId = state.enquiryId || `ENQ-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const submittedAt = state.enquirySubmittedAt || new Date().toLocaleString();

  const handleDownloadArtifact = () => {
    if (!state.activeArtifact?.htmlCode) return;
    const blob = new Blob([state.activeArtifact.htmlCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.preferences.productName || "StarX-Demo"}-Screen-v${state.activeArtifact.versionNumber || 1}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 animate-in zoom-in-95 duration-300 text-center">
      {/* Success Icon */}
      <div className="relative w-24 h-24 mx-auto">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-black shadow-[0_0_40px_rgba(16,185,129,0.5)]">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>
      </div>

      {/* Main Heading & Copy */}
      <div className="space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
          <Sparkles className="w-3.5 h-3.5" />
          Enquiry Transmission Confirmed
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
          Thank You! Your Project Enquiry Has Been Received.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          A StarX representative will contact you directly using the contact information you provided to discuss your project and guide you through the next steps.
        </p>
      </div>

      {/* Reference Card */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 backdrop-blur-xl text-left space-y-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Enquiry Reference Confirmation
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
            {enquiryId}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Project Title</span>
            <span className="font-bold text-white text-sm">
              {state.preferences.productName || state.preferences.brandName || "StarX Digital Solution"}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Submission Date</span>
            <span className="text-zinc-300 font-mono flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {submittedAt}
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Contact Email</span>
            <span className="text-zinc-300">{state.account.email}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-semibold">Preferred Notification</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Direct WhatsApp / Call
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        {state.activeArtifact?.htmlCode && (
          <button
            type="button"
            onClick={handleDownloadArtifact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download Approved HTML Artifact</span>
          </button>
        )}

        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Go to Client Dashboard</span>
        </Link>
      </div>

      <p className="text-xs text-zinc-500">
        You can return to your saved sessions at any time by signing in to your StarX account.
      </p>
    </div>
  );
}
