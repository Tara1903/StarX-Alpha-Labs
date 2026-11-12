"use client";

import React, { useEffect, useState } from "react";
import type { ForgeDemoRecord, ForgeDemoVersion } from "@/lib/forge/types";
import { GenStatusBadge, PubStatusBadge, QaStatusBadge } from "./ForgeBadges";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Monitor,
  Play,
  Rocket,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Tablet,
  XCircle,
} from "lucide-react";

interface ForgePreviewAndQaTabProps {
  mode: "preview" | "qa";
  demos: ForgeDemoRecord[];
  selectedDemoId?: string;
  onRunQa: (demoId: string) => Promise<void>;
  onTransitionDemo: (
    demoId: string,
    action: "approve" | "publish" | "request_changes" | "archive" | "rollback",
    notes?: string,
    targetVersion?: number
  ) => Promise<void>;
  onStartJob: (demoId: string) => void;
  onLoadDemoVersions: (demoId: string) => Promise<ForgeDemoVersion[]>;
}

export function ForgePreviewAndQaTab({
  mode,
  demos,
  selectedDemoId,
  onRunQa,
  onTransitionDemo,
  onStartJob,
  onLoadDemoVersions,
}: ForgePreviewAndQaTabProps) {
  const [activeId, setActiveId] = useState<string>(selectedDemoId || demos[0]?.id || "");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [qaBusy, setQaBusy] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);
  const [changeNotes, setChangeNotes] = useState("");
  const [versions, setVersions] = useState<ForgeDemoVersion[]>([]);

  const demo = demos.find((d) => d.id === activeId) || demos.find((d) => d.id === selectedDemoId) || demos[0] || null;
  const demoId = demo?.id;
  const publishedVersion = demo?.publishedVersion;

  useEffect(() => {
    if (!demoId) return;
    let cancelled = false;
    onLoadDemoVersions(demoId)
      .then((res) => {
        if (!cancelled) setVersions(res);
      })
      .catch(() => {
        if (!cancelled) setVersions([]);
      });
    return () => {
      cancelled = true;
    };
  }, [demoId, publishedVersion, onLoadDemoVersions]);

  if (!demo) return null;

  // Always preview unpublished/custom work inside admin-only sandbox route
  const adminPreviewUrl = `/admin/forge/preview/${demo.slug}`;
  const qa = demo.lastQaReport;
  const canPublish = demo.qaStatus === "passed" || demo.qaStatus === "warnings";

  const handleRunQa = async () => {
    setQaBusy(true);
    try {
      await onRunQa(demo.id);
    } finally {
      setQaBusy(false);
    }
  };

  const handleTransition = async (action: "approve" | "publish" | "request_changes" | "rollback") => {
    if (action === "request_changes" && !changeNotes.trim()) {
      alert("Enter clear change instructions before requesting revisions.");
      return;
    }
    setActionBusy(true);
    try {
      await onTransitionDemo(demo.id, action, changeNotes.trim() || undefined);
      setChangeNotes("");
    } finally {
      setActionBusy(false);
    }
  };

  const frameWidth = viewport === "mobile" ? "w-[390px]" : viewport === "tablet" ? "w-[768px]" : "w-full";

  return (
    <div className="space-y-6 text-left">
      {/* Demo Selector & Control Header */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <select
            value={demo.id}
            onChange={(e) => setActiveId(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs font-bold text-white min-w-[260px] focus:outline-none focus:border-[#00D9FF]"
          >
            {demos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.catalogId ? `#${d.catalogId} — ` : "[Custom] "}
                {d.businessName}
              </option>
            ))}
          </select>

          <GenStatusBadge status={demo.generationStatus} />
          <QaStatusBadge status={demo.qaStatus} />
          <PubStatusBadge status={demo.publishingStatus} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={qaBusy}
            onClick={handleRunQa}
            className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{qaBusy ? "Running QA..." : "Run Automated QA"}</span>
          </button>

          <a
            href={adminPreviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-bold inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>Open Tab</span>
          </a>

          <button
            type="button"
            disabled={actionBusy}
            onClick={() => handleTransition("approve")}
            className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold cursor-pointer"
          >
            Approve Build
          </button>

          <button
            type="button"
            disabled={actionBusy || !canPublish}
            title={canPublish ? "Publish Demo" : "Blocked until Automated QA passes"}
            onClick={() => handleTransition("publish")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-extrabold disabled:opacity-40 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Publish v{(demo.publishedVersion || 0) + 1}</span>
          </button>
        </div>
      </div>

      {/* Preview Frame (Desktop / Tablet / Mobile) */}
      {mode === "preview" && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#05112A] border border-white/10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="text-xs font-mono text-slate-300">
              Admin Sandbox URL: <span className="text-[#00D9FF]">{adminPreviewUrl}</span> (Protected — Unpublished access restricted)
            </div>
            <div className="flex items-center gap-1 bg-[#071638] p-1 rounded-xl border border-white/10">
              {(
                [
                  { id: "desktop", label: "Desktop", icon: Monitor },
                  { id: "tablet", label: "Tablet", icon: Tablet },
                  { id: "mobile", label: "Mobile", icon: Smartphone },
                ] as const
              ).map((v) => {
                const Icon = v.icon;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setViewport(v.id)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                      viewport === v.id ? "bg-[#087BFF] text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{v.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center overflow-x-auto bg-[#030B24] rounded-2xl p-3 border border-white/5">
            <iframe
              key={`${demo.slug}-${viewport}`}
              src={adminPreviewUrl}
              title={`Preview: ${demo.businessName}`}
              className={`${frameWidth} h-[620px] rounded-xl border border-[#00D9FF]/25 bg-[#030B24] transition-all duration-300`}
            />
          </div>
        </div>
      )}

      {/* QA Report Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-white">Automated QA &amp; Quality Control Report</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {qa
                  ? `Run ${qa.runId} • Executed ${new Date(qa.executedAt).toLocaleString()} (${qa.durationMs}ms)`
                  : "QA has not been executed yet for this demo."}
              </p>
            </div>
            {qa && (
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300">
                  {qa.passedCount} Passed
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300">
                  {qa.warningCount} Warnings
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300">
                  {qa.failedCount} Failed
                </span>
              </div>
            )}
          </div>

          {!qa ? (
            <div className="p-8 rounded-2xl bg-[#05112A] border border-white/5 text-center space-y-3">
              <ShieldAlert className="w-8 h-8 text-amber-300 mx-auto" />
              <p className="text-xs text-slate-300">
                Critical rule: Publishing is blocked until Automated QA checks pass.
              </p>
              <button
                type="button"
                disabled={qaBusy}
                onClick={handleRunQa}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-extrabold cursor-pointer"
              >
                {qaBusy ? "Running Checks..." : "Execute Automated QA Now"}
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {qa.checks.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-2xl bg-[#05112A] border border-white/10 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    {c.status === "passed" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : c.status === "failed" ? (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{c.name}</span>
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                          {c.category}
                        </span>
                        {c.critical && (
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300">
                            Critical
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">{c.details}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 shrink-0">{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Actions & Rollback Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#00D9FF] font-bold">Request Revisions / Regenerate</h4>
            <textarea
              rows={3}
              value={changeNotes}
              onChange={(e) => setChangeNotes(e.target.value)}
              placeholder="Describe UI adjustments, missing workflows, or defect notes..."
              className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
            />
            <div className="flex gap-2">
              <button
                type="button"
                disabled={actionBusy}
                onClick={() => handleTransition("request_changes")}
                className="flex-1 px-3 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 text-orange-300 border border-orange-500/30 text-xs font-bold cursor-pointer"
              >
                Request Changes
              </button>
              <button
                type="button"
                onClick={() => onStartJob(demo.id)}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-3">
            <h4 className="text-xs font-mono uppercase text-purple-300 font-bold">
              Published Versions ({versions.length})
            </h4>
            {versions.length === 0 ? (
              <p className="text-xs text-slate-400">No published snapshots stored yet.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {versions.map((v) => (
                  <div key={v.id} className="p-3 rounded-xl bg-[#05112A] border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-mono font-bold text-[#00C98B]">Version v{v.versionNumber}</div>
                      <div className="text-[10px] text-slate-400">{new Date(v.createdAt).toLocaleString()}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onTransitionDemo(demo.id, "rollback", `Rollback to v${v.versionNumber}`, v.versionNumber)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
