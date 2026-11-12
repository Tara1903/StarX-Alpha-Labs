"use client";

import React from "react";
import type {
  ForgeBatchStatus,
  ForgeDemoGenerationStatus,
  ForgeJobExecutionStatus,
  ForgePublishingStatus,
  ForgeQaStatus,
} from "@/lib/forge/types";

export function GenStatusBadge({ status }: { status: ForgeDemoGenerationStatus }) {
  const styles: Record<ForgeDemoGenerationStatus, string> = {
    draft: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    queued: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    designing: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
    implementing: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    testing: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    qa_failed: "bg-rose-500/15 text-rose-300 border-rose-500/40",
    ready_for_review: "bg-cyan-500/15 text-[#00D9FF] border-[#00D9FF]/40",
    changes_requested: "bg-orange-500/15 text-orange-300 border-orange-500/40",
    approved: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    published: "bg-[#00C98B]/20 text-[#00C98B] border-[#00C98B]/50",
    archived: "bg-slate-700/30 text-slate-400 border-slate-600/30",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${styles[status] || styles.draft}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

export function QaStatusBadge({ status }: { status: ForgeQaStatus }) {
  const styles: Record<ForgeQaStatus, string> = {
    not_run: "bg-slate-500/10 text-slate-400 border-slate-600/30",
    running: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    passed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    warnings: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    failed: "bg-rose-500/15 text-rose-300 border-rose-500/40",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${styles[status] || styles.not_run}`}>
      QA: {status.replace(/_/g, " ")}
    </span>
  );
}

export function PubStatusBadge({ status }: { status: ForgePublishingStatus }) {
  const styles: Record<ForgePublishingStatus, string> = {
    unpublished: "bg-slate-500/10 text-slate-400 border-slate-600/30",
    published: "bg-[#00C98B]/20 text-[#00C98B] border-[#00C98B]/50 font-bold",
    archived: "bg-slate-700/20 text-slate-400 border-slate-600/30",
    rolled_back: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${styles[status] || styles.unpublished}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

export function JobStatusBadge({ status }: { status: ForgeJobExecutionStatus | ForgeBatchStatus }) {
  const styles: Record<string, string> = {
    queued: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    draft: "bg-slate-500/15 text-slate-300 border-slate-500/30",
    running: "bg-cyan-500/15 text-[#00D9FF] border-[#00D9FF]/40 animate-pulse",
    paused: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    failed: "bg-rose-500/15 text-rose-300 border-rose-500/40",
    partial_failure: "bg-orange-500/15 text-orange-300 border-orange-500/40",
    cancelled: "bg-slate-700/30 text-slate-400 border-slate-600/30",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${styles[status] || styles.draft}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
