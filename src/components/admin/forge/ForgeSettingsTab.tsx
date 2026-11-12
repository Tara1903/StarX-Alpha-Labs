"use client";

import React, { useState } from "react";
import type { ForgeIntegrationStatusItem, ForgeSettings } from "@/lib/forge/types";
import { AlertTriangle, CheckCircle2, Copy, RefreshCw, Save, Server, ShieldAlert, XCircle } from "lucide-react";

interface ForgeSettingsTabProps {
  settings: ForgeSettings;
  health: ForgeIntegrationStatusItem[];
  onSaveSettings: (updated: Partial<ForgeSettings>) => Promise<void>;
  onRefreshHealth: () => Promise<void>;
}

const STITCH_SNIPPET = `{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "stitch-mcp"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "YOUR_GCP_PROJECT_ID",
        "STITCH_API_KEY": "YOUR_STITCH_API_KEY"
      }
    }
  }
}`;

export function ForgeSettingsTab({
  settings,
  health,
  onSaveSettings,
  onRefreshHealth,
}: ForgeSettingsTabProps) {
  const [maxConcurrentJobs, setMaxConcurrentJobs] = useState(settings.maxConcurrentJobs);
  const [retryLimit, setRetryLimit] = useState(settings.retryLimit);
  const [jobTimeoutSeconds, setJobTimeoutSeconds] = useState(settings.jobTimeoutSeconds);
  const [defaultInstructions, setDefaultInstructions] = useState(settings.defaultGenerationInstructions);
  const [blockPublishOnCriticalFail, setBlockPublishOnCriticalFail] = useState(
    settings.defaultQaRequirements.blockPublishOnCriticalFail
  );
  const [stitchEndpoint, setStitchEndpoint] = useState(settings.stitchMcpEndpoint || "");
  const [workerMode, setWorkerMode] = useState(settings.antigravityWorkerMode);

  const [saving, setSaving] = useState(false);
  const [probing, setProbing] = useState(false);

  const stitchHealth = health.find((h) => h.id === "stitch_mcp");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSaveSettings({
        maxConcurrentJobs,
        retryLimit,
        jobTimeoutSeconds,
        defaultGenerationInstructions: defaultInstructions,
        stitchMcpEndpoint: stitchEndpoint.trim() || null,
        antigravityWorkerMode: workerMode,
        defaultQaRequirements: {
          ...settings.defaultQaRequirements,
          blockPublishOnCriticalFail,
        },
      });
    } finally {
      setSaving(false);
    }
  };

  const handleProbe = async () => {
    setProbing(true);
    try {
      await onRefreshHealth();
    } finally {
      setProbing(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Live Integration Diagnostics (Strictly Real Checks — Never Simulated) */}
      <div className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-[#00D9FF]" />
              <span>Real Integration Health Diagnostics</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live server-side checks against Stitch MCP config, Antigravity Bridge, Supabase PostgreSQL, Storage, Queue, and QA Tooling.
            </p>
          </div>
          <button
            type="button"
            disabled={probing}
            onClick={handleProbe}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${probing ? "animate-spin" : ""}`} />
            <span>{probing ? "Probing..." : "Re-Run Health Checks"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {health.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#05112A] border border-white/10 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-white flex items-center gap-2">
                  {item.status === "connected" ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
                  ) : item.status === "degraded" ? (
                    <AlertTriangle className="w-4 h-4 text-amber-300" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <span>{item.name}</span>
                </span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                    item.status === "connected"
                      ? "bg-[#00C98B]/15 text-[#00C98B] border-[#00C98B]/40"
                      : item.status === "degraded"
                      ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
                      : "bg-rose-500/15 text-rose-300 border-rose-500/40"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200">{item.summary}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.details}</p>
              {item.actionRequired && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                  <strong>Action Required:</strong> {item.actionRequired}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stitch MCP Connection Guide Card (Shown whenever Stitch MCP is disconnected) */}
      {stitchHealth?.status !== "connected" && (
        <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/30 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>How to Connect Google Stitch MCP to Antigravity</span>
            </div>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(STITCH_SNIPPET)}
              className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy mcp_config.json Snippet</span>
            </button>
          </div>
          <ol className="list-decimal pl-5 text-xs text-slate-200 space-y-1.5">
            <li>
              Sign in at <code className="text-[#00D9FF]">stitch.withgoogle.com</code> → Settings → Click{" "}
              <strong>Create API Key</strong> (or enable <code className="text-[#00D9FF]">stitch.googleapis.com</code> via{" "}
              <code className="text-[#00D9FF]">gcloud beta services mcp enable stitch.googleapis.com</code>).
            </li>
            <li>
              Open your Antigravity MCP config file at{" "}
              <code className="text-[#00D9FF]">C:\Users\&lt;you&gt;\.gemini\antigravity\mcp_config.json</code> and merge the{" "}
              <code className="text-[#00D9FF]">stitch</code> server block below into <code className="text-[#00D9FF]">mcpServers</code>:
            </li>
            <li>Restart Antigravity / reload MCP servers and run Re-Run Health Checks above.</li>
          </ol>
          <pre className="p-4 rounded-2xl bg-[#030B24] border border-white/10 text-[11px] font-mono text-cyan-200 overflow-x-auto">
            {STITCH_SNIPPET}
          </pre>
        </div>
      )}

      {/* Orchestration Settings Form */}
      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-5">
        <h3 className="text-base font-extrabold text-white">Orchestration &amp; Quality Policies</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">Max Concurrent Jobs</label>
            <input
              type="number"
              min={1}
              max={10}
              value={maxConcurrentJobs}
              onChange={(e) => setMaxConcurrentJobs(Number(e.target.value) || 2)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">Retry Limit</label>
            <input
              type="number"
              min={0}
              max={5}
              value={retryLimit}
              onChange={(e) => setRetryLimit(Number(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">Timeout (Seconds)</label>
            <input
              type="number"
              min={30}
              max={1800}
              value={jobTimeoutSeconds}
              onChange={(e) => setJobTimeoutSeconds(Number(e.target.value) || 300)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
              Optional Remote Stitch MCP Bridge URL
            </label>
            <input
              type="url"
              value={stitchEndpoint}
              onChange={(e) => setStitchEndpoint(e.target.value)}
              placeholder="https://your-stitch-bridge.example.com (leave blank if using IDE MCP)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
              Antigravity Execution Mode
            </label>
            <select
              value={workerMode}
              onChange={(e) => setWorkerMode(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
            >
              <option value="local-bridge">Local Workspace Bridge (IDE + Node)</option>
              <option value="ide-agent">Antigravity IDE Interactive Session</option>
              <option value="remote-worker">Remote Worker Daemon (ANTIGRAVITY_BRIDGE_URL)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1.5">
            Default Generation Instructions
          </label>
          <textarea
            rows={3}
            value={defaultInstructions}
            onChange={(e) => setDefaultInstructions(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
          />
        </div>

        <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
          <input
            type="checkbox"
            checked={blockPublishOnCriticalFail}
            onChange={(e) => setBlockPublishOnCriticalFail(e.target.checked)}
            className="accent-[#00D9FF]"
          />
          <span>Enforce QA Safeguard: strictly block publishing when critical QA checks fail or QA has not run.</span>
        </label>

        <div className="flex justify-end pt-2 border-t border-white/10">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-extrabold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Policies..." : "Save Forge Configuration"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
