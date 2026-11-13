"use client";

import React, { useCallback, useEffect, useState } from "react";
import type {
  ForgeBatch,
  ForgeDemoRecord,
  ForgeDemoVersion,
  ForgeIntegrationStatusItem,
  ForgeJob,
  ForgeOverviewMetrics,
  ForgeSettings,
} from "@/lib/forge/types";
import { ForgeOverviewTab } from "./ForgeOverviewTab";
import { ForgeAuditTab } from "./ForgeAuditTab";
import { ForgeCatalogueTab } from "./ForgeCatalogueTab";
import { ForgeGeneratorTab } from "./ForgeGeneratorTab";
import { ForgeWorkspaceTab } from "./ForgeWorkspaceTab";
import { ForgePreviewAndQaTab } from "./ForgePreviewAndQaTab";
import { ForgeBatchesTab } from "./ForgeBatchesTab";
import { ForgeSettingsTab } from "./ForgeSettingsTab";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Eye,
  Layers,
  LayoutDashboard,
  PlusCircle,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ForgeSubTab =
  | "overview"
  | "audit"
  | "catalogue"
  | "generator"
  | "workspace"
  | "preview"
  | "qa"
  | "batches"
  | "settings";

interface StarXForgeWorkspaceProps {
  onShowToast?: (msg: string) => void;
}

export function StarXForgeWorkspace({ onShowToast }: StarXForgeWorkspaceProps) {
  const [subTab, setSubTab] = useState<ForgeSubTab>("overview");
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [localToast, setLocalToast] = useState<string | null>(null);

  const [storageMode, setStorageMode] = useState<"postgres" | "local-store">("local-store");
  const [overview, setOverview] = useState<ForgeOverviewMetrics | null>(null);
  const [demos, setDemos] = useState<ForgeDemoRecord[]>([]);
  const [jobs, setJobs] = useState<ForgeJob[]>([]);
  const [batches, setBatches] = useState<ForgeBatch[]>([]);
  const [settings, setSettings] = useState<ForgeSettings | null>(null);
  const [health, setHealth] = useState<ForgeIntegrationStatusItem[]>([]);

  const [selectedDemoId, setSelectedDemoId] = useState<string | undefined>(undefined);
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(undefined);

  const notify = (msg: string) => {
    if (onShowToast) onShowToast(msg);
    else {
      setLocalToast(msg);
      setTimeout(() => setLocalToast(null), 3500);
    }
  };

  const fetchAll = useCallback(async () => {
    try {
      const [ovRes, healthRes] = await Promise.all([
        fetch("/api/admin/forge/overview"),
        fetch("/api/admin/forge/health"),
      ]);

      if (ovRes.status === 401 || ovRes.status === 403) {
        const err = await ovRes.json().catch(() => ({}));
        setAuthError(err.error || "Sign in via /admin/login to access StarX Forge.");
        setLoading(false);
        return;
      }

      if (ovRes.ok) {
        const data = await ovRes.json();
        setStorageMode(data.storageMode || "local-store");
        setOverview(data.overview || null);
        setDemos(data.demos || []);
        setJobs(data.jobs || []);
        setBatches(data.batches || []);
        setSettings(data.settings || null);
      }
      if (healthRes.ok) {
        const hData = await healthRes.json();
        setHealth(hData.checks || []);
      }
      setAuthError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleStartJob = async (demoId: string, inputConfig: any = {}) => {
    const res = await fetch("/api/admin/forge/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demoId, inputConfig }),
    });
    const data = await res.json();
    if (!res.ok) {
      notify(data.error || "Failed to launch job.");
      return;
    }
    setSelectedJobId(data.job.id);
    setSubTab("workspace");
    notify(`Job ${data.job.jobCode} (${data.job.status.toUpperCase()})`);
    await fetchAll();
  };

  const handleCreateCustomDemo = async (payload: any): Promise<ForgeDemoRecord> => {
    const res = await fetch("/api/admin/forge/demos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create custom demo");
    await fetchAll();
    return data.demo;
  };

  const handleDuplicateDemo = async (sourceId: string) => {
    const res = await fetch("/api/admin/forge/demos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "duplicate", sourceId }),
    });
    const data = await res.json();
    if (!res.ok) {
      notify(data.error || "Duplicate failed.");
      return;
    }
    notify(`Duplicated configuration as ${data.demo.businessName}`);
    await fetchAll();
  };

  const handleTransitionDemo = async (
    demoId: string,
    action: "approve" | "publish" | "request_changes" | "archive" | "rollback",
    notes?: string,
    targetVersionNumber?: number
  ) => {
    const res = await fetch("/api/admin/forge/demos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demoId, action, notes, targetVersionNumber }),
    });
    const data = await res.json();
    if (!res.ok) {
      notify(data.error || "Action blocked.");
      return;
    }
    notify(`Demo "${data.demo.businessName}" → ${action.replace(/_/g, " ").toUpperCase()}`);
    await fetchAll();
  };

  const handleLoadDemoVersions = async (demoId: string): Promise<ForgeDemoVersion[]> => {
    const res = await fetch(`/api/admin/forge/demos?id=${encodeURIComponent(demoId)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.versions || [];
  };

  const handleRetryJob = async (jobId: string) => {
    const res = await fetch("/api/admin/forge/jobs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, action: "retry" }),
    });
    const data = await res.json();
    notify(res.ok ? `Retried ${data.job.jobCode}` : data.error || "Retry failed.");
    await fetchAll();
  };

  const handleCancelJob = async (jobId: string) => {
    const res = await fetch("/api/admin/forge/jobs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, action: "cancel" }),
    });
    notify(res.ok ? "Job cancelled cleanly." : "Failed to cancel job.");
    await fetchAll();
  };

  const handleSyncStitchOutput = async (jobId: string, stitchAssets: any) => {
    const res = await fetch("/api/admin/forge/jobs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, action: "sync_stitch", stitchAssets }),
    });
    const data = await res.json();
    notify(res.ok ? `Pipeline resumed & QA complete for ${data.job.jobCode}` : data.error || "Stitch sync failed.");
    await fetchAll();
  };

  const handleRunQa = async (demoId: string) => {
    const res = await fetch("/api/admin/forge/qa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ demoId }),
    });
    const data = await res.json();
    notify(
      res.ok
        ? `QA Complete: ${data.qaReport.readiness.toUpperCase()} (${data.qaReport.passedCount} passed, ${data.qaReport.failedCount} failed)`
        : data.error || "QA execution failed."
    );
    await fetchAll();
  };

  const handleCreateBatch = async (payload: any) => {
    const res = await fetch("/api/admin/forge/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    notify(res.ok ? `Batch ${data.batch.batchCode} queued` : data.error || "Failed creating batch.");
    await fetchAll();
  };

  const handleControlBatch = async (batchId: string, action: "start" | "pause" | "resume" | "cancel") => {
    const res = await fetch("/api/admin/forge/batches", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId, action }),
    });
    const data = await res.json();
    notify(res.ok ? `Batch ${data.batch.batchCode} → ${data.batch.status}` : data.error || "Batch update failed.");
    await fetchAll();
  };

  const handleSaveSettings = async (partial: Partial<ForgeSettings>) => {
    const res = await fetch("/api/admin/forge/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partial),
    });
    const data = await res.json();
    notify(res.ok ? "Forge orchestration settings saved." : data.error || "Failed saving settings.");
    await fetchAll();
  };

  const tabs: { id: ForgeSubTab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "audit", label: "Portfolio Audit & Restructuring", icon: ShieldCheck },
    { id: "catalogue", label: "Demo Catalogue", icon: Layers },
    { id: "generator", label: "New Demo Generator", icon: PlusCircle },
    { id: "workspace", label: "Generation Workspace", icon: Cpu },
    { id: "preview", label: "Preview & Approval", icon: Eye },
    { id: "qa", label: "QA & Quality Control", icon: ShieldCheck },
    { id: "batches", label: "Batch Manager", icon: Activity },
    { id: "settings", label: "Settings & Health", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="p-12 rounded-3xl bg-[#071638]/70 border border-white/10 text-center text-xs font-mono text-[#00D9FF] animate-pulse">
        INITIALIZING STARX FORGE ORCHESTRATION ENGINE...
      </div>
    );
  }

  if (authError) {
    return (
      <div className="p-8 rounded-3xl bg-[#071638]/90 border border-rose-500/30 max-w-xl mx-auto text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
        <h3 className="text-lg font-extrabold text-white">Administrative Authentication Required</h3>
        <p className="text-xs text-slate-300">{authError}</p>
        <a
          href="/admin/login"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-extrabold"
        >
          Sign In to Admin Portal →
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {localToast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-[#00C98B] text-[#030B24] font-extrabold text-xs shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{localToast}</span>
        </div>
      )}

      {/* Branded StarX Forge Studio Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#061334] via-[#091C4A] to-[#05102E] border border-[#00D9FF]/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00D9FF]/15 border border-[#00D9FF]/40 text-[#00D9FF] font-mono text-[10px] font-bold uppercase tracking-widest">
              STARX FORGE STUDIO
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Design. Build. Test. Launch.
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00D9FF]" />
            <span>AI-Powered Demo Creation &amp; Orchestration</span>
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Stitch MCP Design → Antigravity Engineering → Automated QA → Controlled Multi-Batch Publishing
          </p>
        </div>

        <button
          type="button"
          onClick={fetchAll}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#00D9FF]" />
          <span>Sync State</span>
        </button>
      </div>

      {/* Studio Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-2 pb-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = subTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSubTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer ${
                active
                  ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-md shadow-[#087BFF]/30"
                  : "bg-[#071638]/80 border border-white/10 text-slate-300 hover:text-white hover:border-[#00D9FF]/30"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Studio Module */}
      {subTab === "overview" && (
        <ForgeOverviewTab
          overview={overview}
          health={health}
          storageMode={storageMode}
          onNavigateSubTab={(tab, contextId) => {
            if (tab === "workspace" && contextId) setSelectedJobId(contextId);
            setSubTab(tab as ForgeSubTab);
          }}
        />
      )}

      {subTab === "audit" && (
        <ForgeAuditTab onShowToast={notify} />
      )}

      {subTab === "catalogue" && (
        <ForgeCatalogueTab
          demos={demos}
          jobs={jobs}
          onStartJob={(demoId) => handleStartJob(demoId)}
          onDuplicateDemo={handleDuplicateDemo}
          onTransitionDemo={handleTransitionDemo}
          onOpenPreview={(demoId) => {
            setSelectedDemoId(demoId);
            setSubTab("preview");
          }}
          onLoadDemoVersions={handleLoadDemoVersions}
        />
      )}

      {subTab === "generator" && (
        <ForgeGeneratorTab
          key={`gen-${selectedDemoId || "default"}`}
          demos={demos}
          preselectedDemoId={selectedDemoId}
          onCreateCustomDemo={handleCreateCustomDemo}
          onLaunchJob={handleStartJob}
        />
      )}

      {subTab === "workspace" && (
        <ForgeWorkspaceTab
          key={`ws-${selectedJobId || "default"}`}
          jobs={jobs}
          selectedJobId={selectedJobId}
          onRetryJob={handleRetryJob}
          onCancelJob={handleCancelJob}
          onSyncStitchOutput={handleSyncStitchOutput}
          onOpenPreview={(demoId) => {
            setSelectedDemoId(demoId);
            setSubTab("preview");
          }}
        />
      )}

      {(subTab === "preview" || subTab === "qa") && (
        <ForgePreviewAndQaTab
          key={`prev-${subTab}-${selectedDemoId || "default"}`}
          mode={subTab}
          demos={demos}
          selectedDemoId={selectedDemoId}
          onRunQa={handleRunQa}
          onTransitionDemo={handleTransitionDemo}
          onStartJob={(demoId) => {
            setSelectedDemoId(demoId);
            setSubTab("generator");
          }}
          onLoadDemoVersions={handleLoadDemoVersions}
        />
      )}

      {subTab === "batches" && (
        <ForgeBatchesTab
          batches={batches}
          demos={demos}
          jobs={jobs}
          onCreateBatch={handleCreateBatch}
          onControlBatch={handleControlBatch}
        />
      )}

      {subTab === "settings" && settings && (
        <ForgeSettingsTab
          settings={settings}
          health={health}
          onSaveSettings={handleSaveSettings}
          onRefreshHealth={fetchAll}
        />
      )}
    </div>
  );
}
