"use client";

import React, { useMemo, useState } from "react";
import type { ForgeBatch, ForgeDemoRecord, ForgeJob } from "@/lib/forge/types";
import { DEMO_CATEGORIES } from "@/data/categories";
import { JobStatusBadge } from "./ForgeBadges";
import { Layers, Pause, Play, Plus, XCircle } from "lucide-react";

interface ForgeBatchesTabProps {
  batches: ForgeBatch[];
  demos: ForgeDemoRecord[];
  jobs: ForgeJob[];
  onCreateBatch: (payload: { name: string; description: string; demoIds: string[]; maxConcurrency: number }) => Promise<void>;
  onControlBatch: (batchId: string, action: "start" | "pause" | "resume" | "cancel") => Promise<void>;
}

export function ForgeBatchesTab({
  batches,
  demos,
  jobs,
  onCreateBatch,
  onControlBatch,
}: ForgeBatchesTabProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maxConcurrency, setMaxConcurrency] = useState(2);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [categoryPreset, setCategoryPreset] = useState<string>(DEMO_CATEGORIES[0]?.slug || "food-hospitality");
  const [creating, setCreating] = useState(false);

  const categoryDemos = useMemo(
    () => demos.filter((d) => d.categorySlug === categoryPreset),
    [demos, categoryPreset]
  );

  const toggleDemo = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSelectCategorySlice = () => {
    const ids = categoryDemos.map((d) => d.id);
    setSelectedIds(ids);
    const catName = DEMO_CATEGORIES.find((c) => c.slug === categoryPreset)?.name || categoryPreset;
    if (!name.trim()) setName(`Batch: ${catName} (${ids.length} Demos)`);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || selectedIds.length === 0) return;
    setCreating(true);
    try {
      await onCreateBatch({
        name: name.trim(),
        description: description.trim(),
        demoIds: selectedIds,
        maxConcurrency,
      });
      setName("");
      setDescription("");
      setSelectedIds([]);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      {/* Create Batch Form */}
      <form
        onSubmit={handleCreate}
        className="lg:col-span-5 p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4 h-fit"
      >
        <div className="flex items-center gap-2 text-[#00D9FF] font-mono text-xs uppercase font-bold">
          <Plus className="w-4 h-4" />
          <span>Create Generation Batch</span>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">Batch Name *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Batch 01 — Food & Hospitality"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">Notes / Objective</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Stitch + Antigravity production build wave..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">Industry Slice</label>
            <select
              value={categoryPreset}
              onChange={(e) => setCategoryPreset(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white"
            >
              {DEMO_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-300 mb-1">Max Concurrency</label>
            <input
              type="number"
              min={1}
              max={10}
              value={maxConcurrency}
              onChange={(e) => setMaxConcurrency(Number(e.target.value) || 2)}
              className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/15 text-xs text-white font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-300 font-mono">
            Selected: <strong className="text-[#00D9FF]">{selectedIds.length}</strong> demos
          </span>
          <button
            type="button"
            onClick={handleSelectCategorySlice}
            className="text-xs font-bold text-[#00D9FF] hover:underline cursor-pointer"
          >
            Select All in Category ({categoryDemos.length})
          </button>
        </div>

        <div className="max-h-56 overflow-y-auto space-y-1.5 p-2 rounded-2xl bg-[#05112A] border border-white/10">
          {categoryDemos.map((d) => {
            const checked = selectedIds.includes(d.id);
            return (
              <label
                key={d.id}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/5 cursor-pointer text-xs text-slate-200"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleDemo(d.id)}
                  className="accent-[#00D9FF]"
                />
                <span className="font-mono text-[10px] text-slate-400">#{d.catalogId}</span>
                <span className="truncate font-medium">{d.businessName}</span>
              </label>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={creating || selectedIds.length === 0}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-extrabold text-xs disabled:opacity-40 cursor-pointer"
        >
          {creating ? "Creating Batch Queue..." : `Save Batch Queue (${selectedIds.length} Demos)`}
        </button>
      </form>

      {/* Active Batches List */}
      <div className="lg:col-span-7 space-y-4">
        <div className="text-xs font-mono uppercase text-slate-400 px-1">
          Configured Batches ({batches.length})
        </div>

        {batches.length === 0 ? (
          <div className="p-10 rounded-3xl bg-[#071638]/80 border border-white/10 text-center space-y-2">
            <Layers className="w-10 h-10 text-slate-500 mx-auto" />
            <div className="text-sm font-bold text-white">No Batches Scheduled Yet</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Select an industry slice on the left to queue controlled concurrent generation batches once Stitch MCP is connected.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {batches.map((b) => {
              const batchJobs = jobs.filter((j) => j.batchId === b.id);
              return (
                <div key={b.id} className="p-5 sm:p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#00D9FF] font-bold">{b.batchCode}</span>
                        <JobStatusBadge status={b.status} />
                        <span className="text-[10px] font-mono text-slate-400">
                          Concurrency: {b.maxConcurrency}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-white mt-1">{b.name}</h4>
                      {b.description && <p className="text-xs text-slate-300 mt-0.5">{b.description}</p>}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(b.status === "draft" || b.status === "paused") && (
                        <button
                          type="button"
                          onClick={() => onControlBatch(b.id, b.status === "paused" ? "resume" : "start")}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-extrabold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{b.status === "paused" ? "Resume Tick" : "Start Batch"}</span>
                        </button>
                      )}
                      {b.status === "running" && (
                        <>
                          <button
                            type="button"
                            onClick={() => onControlBatch(b.id, "resume")}
                            className="px-3.5 py-1.5 rounded-xl bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30 text-xs font-bold cursor-pointer"
                          >
                            Next Slice →
                          </button>
                          <button
                            type="button"
                            onClick={() => onControlBatch(b.id, "pause")}
                            className="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause</span>
                          </button>
                        </>
                      )}
                      {b.status !== "completed" && b.status !== "cancelled" && (
                        <button
                          type="button"
                          onClick={() => onControlBatch(b.id, "cancel")}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-300 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-[#05112A] border border-white/5 text-center font-mono text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">TOTAL</span>
                      <strong className="text-white">{b.totalCount}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">COMPLETED</span>
                      <strong className="text-emerald-400">{b.completedCount}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">FAILED</span>
                      <strong className="text-rose-400">{b.failedCount}</strong>
                    </div>
                  </div>

                  {batchJobs.length > 0 && (
                    <div className="text-[11px] font-mono text-slate-300">
                      Spawned Jobs: {batchJobs.map((j) => `${j.jobCode} (${j.status})`).join(" • ")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
