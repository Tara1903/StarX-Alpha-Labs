"use client";

import React, { useMemo, useState } from "react";
import type { ForgeDemoRecord, ForgeDemoVersion, ForgeJob } from "@/lib/forge/types";
import { GenStatusBadge, PubStatusBadge, QaStatusBadge } from "./ForgeBadges";
import {
  Archive,
  Copy,
  Eye,
  History,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";

interface ForgeCatalogueTabProps {
  demos: ForgeDemoRecord[];
  jobs: ForgeJob[];
  onStartJob: (demoId: string) => void;
  onDuplicateDemo: (sourceId: string) => Promise<void>;
  onTransitionDemo: (
    demoId: string,
    action: "approve" | "publish" | "request_changes" | "archive" | "rollback",
    notes?: string,
    targetVersion?: number
  ) => Promise<void>;
  onOpenPreview: (demoId: string) => void;
  onLoadDemoVersions: (demoId: string) => Promise<ForgeDemoVersion[]>;
}

export function ForgeCatalogueTab({
  demos,
  jobs,
  onStartJob,
  onDuplicateDemo,
  onTransitionDemo,
  onOpenPreview,
  onLoadDemoVersions,
}: ForgeCatalogueTabProps) {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [genFilter, setGenFilter] = useState("all");
  const [pubFilter, setPubFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"catalog" | "name" | "updated" | "status">("catalog");

  const [selectedDemo, setSelectedDemo] = useState<ForgeDemoRecord | null>(null);
  const [versions, setVersions] = useState<ForgeDemoVersion[]>([]);
  const [loadingVersions, setLoadingVersions] = useState(false);

  const industries = useMemo(
    () => Array.from(new Set(demos.map((d) => d.industry))).sort(),
    [demos]
  );

  const filtered = useMemo(() => {
    return demos
      .filter((d) => {
        const q = search.trim().toLowerCase();
        const matchesSearch =
          !q ||
          d.businessName.toLowerCase().includes(q) ||
          d.slug.toLowerCase().includes(q) ||
          String(d.catalogId || "") === q;
        const matchesInd = industryFilter === "all" || d.industry === industryFilter;
        const matchesGen = genFilter === "all" || d.generationStatus === genFilter;
        const matchesPub = pubFilter === "all" || d.publishingStatus === pubFilter;
        return matchesSearch && matchesInd && matchesGen && matchesPub;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.businessName.localeCompare(b.businessName);
        if (sortBy === "updated") return b.updatedAt.localeCompare(a.updatedAt);
        if (sortBy === "status") return a.generationStatus.localeCompare(b.generationStatus);
        return (a.catalogId ?? 9999) - (b.catalogId ?? 9999);
      });
  }, [demos, search, industryFilter, genFilter, pubFilter, sortBy]);

  const handleOpenDetails = async (demo: ForgeDemoRecord) => {
    setSelectedDemo(demo);
    setLoadingVersions(true);
    try {
      const list = await onLoadDemoVersions(demo.id);
      setVersions(list);
    } finally {
      setLoadingVersions(false);
    }
  };

  const demoJobs = useMemo(
    () => (selectedDemo ? jobs.filter((j) => j.demoId === selectedDemo.id) : []),
    [selectedDemo, jobs]
  );

  return (
    <div className="space-y-6 text-left">
      {/* Filter Controls */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#071638]/90 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="relative lg:col-span-2">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by business name, slug, or ID..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D9FF]"
          />
        </div>

        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
        >
          <option value="all">All Industries ({industries.length})</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>

        <select
          value={genFilter}
          onChange={(e) => setGenFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
        >
          <option value="all">All Gen Statuses</option>
          <option value="draft">Draft</option>
          <option value="queued">Queued</option>
          <option value="designing">Designing</option>
          <option value="implementing">Implementing</option>
          <option value="testing">Testing</option>
          <option value="qa_failed">QA Failed</option>
          <option value="ready_for_review">Ready for Review</option>
          <option value="changes_requested">Changes Requested</option>
          <option value="approved">Approved</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <div className="flex gap-2">
          <select
            value={pubFilter}
            onChange={(e) => setPubFilter(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
          >
            <option value="all">Publishing: All</option>
            <option value="unpublished">Unpublished</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-[#05112A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
          >
            <option value="catalog">Sort: ID</option>
            <option value="name">Sort: Name</option>
            <option value="updated">Sort: Updated</option>
            <option value="status">Sort: Status</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
        <span>Showing {filtered.length} of {demos.length} registered business demos</span>
        <span>Preserving existing 160-demo identifiers</span>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#05112A]/80 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">ID / Business</th>
                <th className="py-3.5 px-4">Industry &amp; Archetype</th>
                <th className="py-3.5 px-4">Generation</th>
                <th className="py-3.5 px-4">QA &amp; Publishing</th>
                <th className="py-3.5 px-4">Updated</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filtered.slice(0, 80).map((demo) => (
                <tr key={demo.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#00D9FF]">
                        {demo.catalogId ? `#${demo.catalogId}` : "CUSTOM"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(demo)}
                        className="font-bold text-white hover:text-[#00D9FF] text-left cursor-pointer"
                      >
                        {demo.businessName}
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs mt-0.5">{demo.description}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200 font-medium">{demo.industry}</div>
                    <div className="text-[10px] font-mono text-slate-400">{demo.archetype}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <GenStatusBadge status={demo.generationStatus} />
                  </td>
                  <td className="py-3.5 px-4 space-y-1">
                    <div className="flex flex-wrap gap-1.5">
                      <QaStatusBadge status={demo.qaStatus} />
                      <PubStatusBadge status={demo.publishingStatus} />
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] font-mono text-slate-400 whitespace-nowrap">
                    {new Date(demo.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        title="Open Details & History"
                        onClick={() => handleOpenDetails(demo)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                      >
                        <History className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        title="Preview Demo"
                        onClick={() => onOpenPreview(demo.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#00D9FF] cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        title="Duplicate Config"
                        onClick={() => onDuplicateDemo(demo.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onStartJob(demo.id)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold text-[11px] inline-flex items-center gap-1 hover:brightness-110 cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        <span>{demo.generationStatus === "draft" ? "Forge" : "Regenerate"}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 80 && (
          <div className="p-3 border-t border-white/10 text-center text-[11px] text-slate-400 font-mono">
            Displaying first 80 matching entries. Narrow filters or search to pinpoint specific demos.
          </div>
        )}
      </div>

      {/* Demo Details & Version History Modal */}
      {selectedDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A1940] border border-[#00D9FF]/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#00D9FF]/15 text-[#00D9FF]">
                    {selectedDemo.slug}
                  </span>
                  <GenStatusBadge status={selectedDemo.generationStatus} />
                  <QaStatusBadge status={selectedDemo.qaStatus} />
                </div>
                <h3 className="text-xl font-extrabold text-white mt-2">{selectedDemo.businessName}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{selectedDemo.industry}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDemo(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#071638] border border-white/10 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-[#00D9FF]">Target Audience</div>
                <p className="text-slate-200">{selectedDemo.targetAudience || "—"}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#071638] border border-white/10 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-[#00D9FF]">Design Direction</div>
                <p className="text-slate-200">{selectedDemo.designDirection || "—"}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#071638] border border-white/10 space-y-2 text-xs">
              <div className="text-[10px] font-mono uppercase text-[#00D9FF]">Feature Requirements</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedDemo.featureRequirements.map((f, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-200">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Generation History */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00D9FF]" />
                <span>Job History ({demoJobs.length})</span>
              </div>
              {demoJobs.length === 0 ? (
                <p className="text-xs text-slate-400">No generation jobs executed yet for this entry.</p>
              ) : (
                <div className="space-y-1.5">
                  {demoJobs.map((j) => (
                    <div key={j.id} className="p-3 rounded-xl bg-[#05112A] border border-white/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-white">{j.jobCode} • {j.currentStage}</span>
                      <span className="text-[11px] font-mono text-slate-400">{j.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Version Snapshots & Rollback */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-purple-300" />
                <span>Published Version History</span>
              </div>
              {loadingVersions ? (
                <p className="text-xs text-slate-400">Loading snapshots...</p>
              ) : versions.length === 0 ? (
                <p className="text-xs text-slate-400">No immutable release versions recorded yet.</p>
              ) : (
                <div className="space-y-2">
                  {versions.map((ver) => (
                    <div key={ver.id} className="p-3 rounded-xl bg-[#05112A] border border-white/10 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#00C98B]">v{ver.versionNumber}</span>{" "}
                        <span className="text-slate-300">Approved by {ver.approvedBy}</span>
                        <div className="text-[10px] font-mono text-slate-400">{ver.notes}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onTransitionDemo(selectedDemo.id, "rollback", `Rollback to v${ver.versionNumber}`, ver.versionNumber)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-amber-500/25 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Rollback</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-between gap-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={async () => {
                  await onTransitionDemo(selectedDemo.id, "archive");
                  setSelectedDemo(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-bold inline-flex items-center gap-1.5 hover:bg-rose-500/20 cursor-pointer"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>Archive Demo</span>
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onOpenPreview(selectedDemo.id);
                    setSelectedDemo(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#071638] border border-white/15 text-white text-xs font-bold cursor-pointer"
                >
                  Open Preview &amp; QA
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onStartJob(selectedDemo.id);
                    setSelectedDemo(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-extrabold cursor-pointer"
                >
                  Launch Forge Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
