"use client";

import React, { useState } from "react";
import { FORGE_JOB_STAGES, type ForgeJob } from "@/lib/forge/types";
import { JobStatusBadge } from "./ForgeBadges";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Layers,
  Play,
  RotateCcw,
  Terminal,
  XCircle,
} from "lucide-react";

interface ForgeWorkspaceTabProps {
  jobs: ForgeJob[];
  selectedJobId?: string;
  onRetryJob: (jobId: string) => Promise<void>;
  onCancelJob: (jobId: string) => Promise<void>;
  onSyncStitchOutput: (
    jobId: string,
    stitchAssets: { projectId: string; screenIds?: string[]; designTokens?: Record<string, string>; screenSummary: string }
  ) => Promise<void>;
  onOpenPreview: (demoId: string) => void;
}

export function ForgeWorkspaceTab({
  jobs,
  selectedJobId,
  onRetryJob,
  onCancelJob,
  onSyncStitchOutput,
  onOpenPreview,
}: ForgeWorkspaceTabProps) {
  const [activeJobId, setActiveJobId] = useState<string>(selectedJobId || jobs[0]?.id || "");
  const [syncOpen, setSyncOpen] = useState(false);
  const [stitchProjectId, setStitchProjectId] = useState("");
  const [stitchScreenIds, setStitchScreenIds] = useState("");
  const [stitchSummary, setStitchSummary] = useState("");
  const [stitchPrimaryHex, setStitchPrimaryHex] = useState("#087BFF");
  const [stitchAccentHex, setStitchAccentHex] = useState("#00D9FF");
  const [busy, setBusy] = useState(false);

  const activeJob = jobs.find((j) => j.id === activeJobId) || jobs.find((j) => j.id === selectedJobId) || jobs[0] || null;

  const handleCopyBrief = () => {
    if (!activeJob) return;
    navigator.clipboard.writeText(JSON.stringify(activeJob.stitchRequestPayload, null, 2));
  };

  const handleStitchSyncSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJob || !stitchProjectId.trim() || !stitchSummary.trim()) return;
    setBusy(true);
    try {
      await onSyncStitchOutput(activeJob.id, {
        projectId: stitchProjectId.trim(),
        screenIds: stitchScreenIds
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        screenSummary: stitchSummary.trim(),
        designTokens: {
          primary: stitchPrimaryHex,
          accent: stitchAccentHex,
        },
      });
      setSyncOpen(false);
    } finally {
      setBusy(false);
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="p-12 rounded-3xl bg-[#071638]/80 border border-white/10 text-center space-y-3">
        <Layers className="w-10 h-10 text-slate-500 mx-auto" />
        <h3 className="text-base font-extrabold text-white">No Active Generation Jobs</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Select a business from the Demo Catalogue or New Demo Generator to start a 13-stage Stitch + Antigravity pipeline job.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      {/* Left Column: Jobs Roster */}
      <div className="lg:col-span-4 space-y-3">
        <div className="text-xs font-mono uppercase text-slate-400 px-1">
          Orchestration Queue ({jobs.length})
        </div>
        <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
          {jobs.map((job) => {
            const isSelected = activeJob?.id === job.id;
            return (
              <button
                key={job.id}
                type="button"
                onClick={() => setActiveJobId(job.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#087BFF]/20 border-[#00D9FF] shadow-md"
                    : "bg-[#071638]/80 border-white/10 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-[#00D9FF]">{job.jobCode}</span>
                  <JobStatusBadge status={job.status} />
                </div>
                <div className="text-xs font-extrabold text-white mt-1 truncate">
                  {job.demoName || job.inputConfig?.businessName}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 truncate">
                  Stage {job.stageIndex}/13: {job.currentStage}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Live 13-Stage Pipeline & Telemetry */}
      {activeJob && (
        <div className="lg:col-span-8 space-y-6">
          {/* Job Header & Actions */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#00D9FF] font-bold">{activeJob.jobCode}</span>
                  <JobStatusBadge status={activeJob.status} />
                  <span className="text-[10px] font-mono text-slate-400">
                    Retries: {activeJob.retryCount}/{activeJob.maxRetries}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  {activeJob.demoName || activeJob.inputConfig?.businessName}
                </h3>
                <div className="text-[11px] font-mono text-slate-400 mt-1 flex flex-wrap gap-4">
                  <span>Started: {activeJob.startedAt ? new Date(activeJob.startedAt).toLocaleString() : "Queued"}</span>
                  <span>Last Activity: {new Date(activeJob.updatedAt).toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeJob.status !== "completed" && activeJob.status !== "cancelled" && (
                  <button
                    type="button"
                    onClick={() => onCancelJob(activeJob.id)}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}

                {activeJob.status === "failed" && (
                  <>
                    <button
                      type="button"
                      onClick={() => onRetryJob(activeJob.id)}
                      className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Stage</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSyncOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Attach Stitch MCP Output &amp; Resume →</span>
                    </button>
                  </>
                )}

                {activeJob.status === "completed" && (
                  <button
                    type="button"
                    onClick={() => onOpenPreview(activeJob.demoId)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Preview &amp; QA Review</span>
                  </button>
                )}
              </div>
            </div>

            {/* Real Error Notice (Never hidden or faked) */}
            {activeJob.errors.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-extrabold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Execution Blocker / Errors Reported</span>
                </div>
                <ul className="list-disc pl-5 text-xs text-rose-200 space-y-1">
                  {activeJob.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 13-Stage Real Stepper */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#00D9FF] font-bold">
                13-Stage Pipeline Execution
              </h4>
              <button
                type="button"
                onClick={handleCopyBrief}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-slate-300 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Stitch Request Payload</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FORGE_JOB_STAGES.map((stageName, idx) => {
                const num = idx + 1;
                const isDone =
                  activeJob.status === "completed"
                    ? true
                    : num < activeJob.stageIndex;
                const isCurrent = num === activeJob.stageIndex && activeJob.status !== "completed";
                const isFailed = isCurrent && activeJob.status === "failed";

                return (
                  <div
                    key={stageName}
                    className={`p-3 rounded-xl border flex items-center gap-3 text-xs ${
                      isFailed
                        ? "bg-rose-500/10 border-rose-500/40 text-rose-200"
                        : isCurrent
                        ? "bg-[#087BFF]/20 border-[#00D9FF] text-white"
                        : isDone
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                        : "bg-[#05112A]/60 border-white/5 text-slate-500"
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold bg-black/30 shrink-0">
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : num}
                    </div>
                    <span className="truncate font-medium">{stageName}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stitch Design Assets & Execution Logs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-3">
              <div className="text-xs font-mono uppercase text-[#00D9FF] font-bold">
                Stitch MCP Design References
              </div>
              {activeJob.stitchResponseAssets?.projectId ? (
                <div className="space-y-2 text-xs text-slate-200">
                  <div>
                    <strong className="text-white">Source:</strong> {activeJob.stitchResponseAssets.source}
                  </div>
                  <div>
                    <strong className="text-white">Project ID:</strong>{" "}
                    <code className="text-[#00D9FF]">{activeJob.stitchResponseAssets.projectId}</code>
                  </div>
                  <div>
                    <strong className="text-white">Screens:</strong>{" "}
                    {activeJob.stitchResponseAssets.screenIds?.join(", ") || "Primary screen set"}
                  </div>
                  <p className="text-[11px] text-slate-300 bg-[#05112A] p-3 rounded-xl border border-white/5">
                    {activeJob.stitchResponseAssets.screenSummary}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#05112A] border border-white/5 text-xs text-slate-400 space-y-2">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <p>No Stitch design artifact attached yet for this job.</p>
                </div>
              )}
            </div>

            <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Execution Logs ({activeJob.logs.length})</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#030B24] border border-white/10 max-h-60 overflow-y-auto space-y-2 font-mono text-[11px]">
                {activeJob.logs.map((log) => (
                  <div key={log.id} className="leading-relaxed">
                    <span className="text-slate-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{" "}
                    <span
                      className={
                        log.level === "error"
                          ? "text-rose-400"
                          : log.level === "warn"
                          ? "text-amber-300"
                          : log.level === "success"
                          ? "text-emerald-400"
                          : "text-[#00D9FF]"
                      }
                    >
                      [{log.stage}]
                    </span>{" "}
                    <span className="text-slate-200">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attach Genuine Stitch Output Modal (for local Antigravity IDE Stitch MCP Bridge) */}
      {syncOpen && activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleStitchSyncSubmit}
            className="bg-[#0A1940] border border-[#00D9FF]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4"
          >
            <h3 className="text-lg font-extrabold text-white">Attach Stitch MCP Design Output</h3>
            <p className="text-xs text-slate-300">
              After generating screens via Stitch MCP tools in Antigravity IDE using the job payload, record the verified Stitch Project ID and design tokens below to continue Stages 5–13.
            </p>
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">Stitch Project ID *</label>
              <input
                required
                value={stitchProjectId}
                onChange={(e) => setStitchProjectId(e.target.value)}
                placeholder="e.g. stitch_proj_9a8f12c"
                className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                Generated Screen IDs (comma separated)
              </label>
              <input
                value={stitchScreenIds}
                onChange={(e) => setStitchScreenIds(e.target.value)}
                placeholder="scr_ops_dashboard, scr_client_portal"
                className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">Primary Token Hex</label>
                <input
                  value={stitchPrimaryHex}
                  onChange={(e) => setStitchPrimaryHex(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">Accent Token Hex</label>
                <input
                  value={stitchAccentHex}
                  onChange={(e) => setStitchAccentHex(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">
                Stitch Layout &amp; Screen Summary *
              </label>
              <textarea
                required
                rows={3}
                value={stitchSummary}
                onChange={(e) => setStitchSummary(e.target.value)}
                placeholder="Summary of screens & hierarchy returned by Stitch MCP..."
                className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSyncOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={busy}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-extrabold cursor-pointer"
              >
                {busy ? "Resuming Pipeline..." : "Save Stitch Artifact & Run QA"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
