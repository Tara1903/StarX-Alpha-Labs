"use client";

import React from "react";
import type {
  ForgeIntegrationStatusItem,
  ForgeOverviewMetrics,
} from "@/lib/forge/types";
import { GenStatusBadge, JobStatusBadge } from "./ForgeBadges";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  Layers,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

interface ForgeOverviewTabProps {
  overview: ForgeOverviewMetrics | null;
  health: ForgeIntegrationStatusItem[];
  storageMode: "postgres" | "local-store";
  onNavigateSubTab: (tab: string, contextId?: string) => void;
}

export function ForgeOverviewTab({
  overview,
  health,
  storageMode,
  onNavigateSubTab,
}: ForgeOverviewTabProps) {
  if (!overview) {
    return (
      <div className="p-8 rounded-3xl bg-[#071638]/70 border border-white/10 text-center text-xs text-slate-400">
        Loading real-time StarX Forge metrics...
      </div>
    );
  }

  const stitchHealth = health.find((h) => h.id === "stitch_mcp");

  const stats = [
    { label: "Total Registered Demos", value: overview.totalRegisteredDemos, icon: Layers, accent: "text-[#00D9FF]" },
    { label: "Published Demos", value: overview.publishedDemos, icon: Rocket, accent: "text-[#00C98B]" },
    { label: "Draft Demos", value: overview.draftDemos, icon: Clock, accent: "text-slate-300" },
    { label: "Currently Generating", value: overview.generatingDemos, icon: Cpu, accent: "text-blue-400" },
    { label: "Failed Jobs", value: overview.failedJobs, icon: AlertTriangle, accent: "text-rose-400" },
    { label: "Pending Approvals", value: overview.pendingApprovals, icon: ShieldCheck, accent: "text-amber-300" },
    {
      label: "Generation Success Rate",
      value: overview.generationSuccessRate !== null ? `${overview.generationSuccessRate}%` : "Insufficient data",
      icon: CheckCircle2,
      accent: "text-emerald-400",
    },
    {
      label: "Avg Generation Duration",
      value: overview.averageDurationMs !== null ? `${(overview.averageDurationMs / 1000).toFixed(1)}s` : "Insufficient data",
      icon: Activity,
      accent: "text-purple-300",
    },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Stitch Connection Alert if disconnected */}
      {stitchHealth && stitchHealth.status !== "connected" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-extrabold text-white">
                Stitch MCP Integration: {stitchHealth.summary}
              </div>
              <p className="text-[11px] text-amber-100/80 mt-0.5">
                {stitchHealth.actionRequired || stitchHealth.details}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateSubTab("settings")}
            className="px-4 py-2 rounded-xl bg-amber-400 text-[#030B24] font-extrabold text-xs shrink-0 hover:brightness-110 cursor-pointer"
          >
            View Stitch Setup Guide →
          </button>
        </div>
      )}

      {/* Storage mode banner if migration pending */}
      {storageMode === "local-store" && (
        <div className="p-4 rounded-2xl bg-[#087BFF]/10 border border-[#087BFF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Database className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-200">
              <strong className="text-white">Database Schema Pending:</strong> Running on server store fallback until{" "}
              <code className="text-[#00D9FF]">supabase/migrations/20261112000001_starx_forge_platform.sql</code> is executed in Supabase SQL Editor.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateSubTab("settings")}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[11px] font-bold shrink-0 cursor-pointer"
          >
            Inspect Schema Health
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="p-4 sm:p-5 rounded-2xl bg-[#071638]/90 border border-white/10 hover:border-[#00D9FF]/30 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{s.label}</span>
                <Icon className={`w-4 h-4 ${s.accent}`} />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onNavigateSubTab("generator")}
          className="p-5 rounded-2xl bg-gradient-to-br from-[#087BFF]/20 to-[#00D9FF]/10 border border-[#00D9FF]/30 text-left hover:border-[#00D9FF] transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="w-5 h-5 text-[#00D9FF]" />
            <Play className="w-4 h-4 text-white/60 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-sm font-extrabold text-white">Launch New Generation Job</div>
          <p className="text-xs text-slate-300 mt-1">
            Pick any of 160 catalogue entries or create a new custom demo and queue Stitch + QA pipeline.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigateSubTab("batches")}
          className="p-5 rounded-2xl bg-[#071638]/90 border border-white/10 text-left hover:border-[#00D9FF]/40 transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <Layers className="w-5 h-5 text-purple-300" />
            <Play className="w-4 h-4 text-white/60 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-sm font-extrabold text-white">Batch Queue Manager</div>
          <p className="text-xs text-slate-300 mt-1">
            Organize industry-wise demo generation batches with strict concurrency controls.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigateSubTab("qa")}
          className="p-5 rounded-2xl bg-[#071638]/90 border border-white/10 text-left hover:border-[#00D9FF]/40 transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <Wrench className="w-5 h-5 text-emerald-400" />
            <Play className="w-4 h-4 text-white/60 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="text-sm font-extrabold text-white">Automated QA &amp; Preview Gate</div>
          <p className="text-xs text-slate-300 mt-1">
            Inspect WCAG contrast, seed integrity, route status, and approve before publishing.
          </p>
        </button>
      </div>

      {/* Recently Completed Jobs & Recent Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Recently Completed Jobs</h3>
            <button
              type="button"
              onClick={() => onNavigateSubTab("workspace")}
              className="text-[11px] font-mono text-[#00D9FF] hover:underline cursor-pointer"
            >
              Open Workspace →
            </button>
          </div>

          {overview.recentlyCompletedJobs.length === 0 ? (
            <div className="p-6 rounded-2xl bg-[#05112A] border border-white/5 text-center text-xs text-slate-400">
              No completed generation jobs recorded yet. Launch a job from the Generator tab when ready.
            </div>
          ) : (
            <div className="space-y-2">
              {overview.recentlyCompletedJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => onNavigateSubTab("workspace", job.id)}
                  className="p-3 rounded-xl bg-[#05112A] border border-white/5 hover:border-[#00D9FF]/30 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {job.demoName || job.inputConfig?.businessName}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {job.jobCode} • {job.currentStage}
                    </div>
                  </div>
                  <JobStatusBadge status={job.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Recent Forge Activity</h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase">Live Audit Trail</span>
          </div>

          {overview.recentActivity.length === 0 ? (
            <div className="p-6 rounded-2xl bg-[#05112A] border border-white/5 text-center text-xs text-slate-400">
              No administrative actions logged yet.
            </div>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {overview.recentActivity.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-[#05112A] border border-white/5 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-white">{log.action.replace(/_/g, " ")}</div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {log.targetType}: {log.targetId} • by {log.actorEmail}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {new Date(log.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Integration Health Matrix */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white">Integration &amp; Infrastructure Health</h3>
          <button
            type="button"
            onClick={() => onNavigateSubTab("settings")}
            className="text-[11px] font-mono text-[#00D9FF] hover:underline cursor-pointer"
          >
            Configure &amp; Diagnostics →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {health.map((item) => (
            <div key={item.id} className="p-3.5 rounded-2xl bg-[#05112A] border border-white/10 flex items-start gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                  item.status === "connected"
                    ? "bg-[#00C98B] shadow-[0_0_8px_#00C98B]"
                    : item.status === "degraded"
                    ? "bg-amber-400"
                    : "bg-rose-500"
                }`}
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white">{item.name}</div>
                <div className="text-[11px] text-slate-300 mt-0.5">{item.summary}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
