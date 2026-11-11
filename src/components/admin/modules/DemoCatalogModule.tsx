"use client";

import React, { useState } from "react";
import { DemoModel } from "@/types/demo";
import { DEMO_CATEGORIES } from "@/data/categories";
import {
  Globe,
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface DemoCatalogModuleProps {
  demos: DemoModel[];
  onSaveDemo: (demo: DemoModel) => void;
  onShowToast: (msg: string) => void;
}

export function DemoCatalogModule({
  demos,
  onSaveDemo,
  onShowToast,
}: DemoCatalogModuleProps) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [editDemo, setEditDemo] = useState<DemoModel | null>(null);

  const filteredDemos = demos.filter((d) => {
    const matchesSearch =
      !search.trim() ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toString() === search.trim() ||
      d.categoryName.toLowerCase().includes(search.toLowerCase());

    const matchesCat = catFilter === "all" || d.categorySlug === catFilter;
    const matchesPlatform = platformFilter === "all" || d.platform.toLowerCase().includes(platformFilter);

    return matchesSearch && matchesCat && matchesPlatform;
  });

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Category", "DevType", "Platform", "Price", "EstTime", "Status", "AI", "Ecommerce"];
    const rows = filteredDemos.map((d) => [
      d.id,
      `"${d.name.replace(/"/g, '""')}"`,
      `"${d.categoryName.replace(/"/g, '""')}"`,
      d.developmentType,
      d.platform,
      `"${d.indicativeStartingPrice}"`,
      `"${d.estimatedDevelopmentTime}"`,
      d.availabilityStatus,
      d.isAiEnabled ? "Yes" : "No",
      d.isEcommerce ? "Yes" : "No",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `starx_demo_catalog_${filteredDemos.length}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Exported ${filteredDemos.length} demo models to CSV`);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDemo) return;
    onSaveDemo(editDemo);
    onShowToast(`Saved Demo #${editDemo.id} — ${editDemo.name}`);
    setEditDemo(null);
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Filter Bar */}
      <div className="p-5 rounded-3xl bg-[#071638]/90 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative min-w-[200px] flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, or vertical..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D9FF]"
            />
          </div>

          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
          >
            <option value="all">All 12 Categories</option>
            {DEMO_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00D9FF]"
          >
            <option value="all">All Platforms</option>
            <option value="web">Web &amp; Cloud</option>
            <option value="ios">Mobile (iOS &amp; Android)</option>
            <option value="hybrid">Unified Combo</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-[#08183A] hover:bg-[#0E2248] border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Demos Table */}
      <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4"># ID</th>
                <th className="py-3 px-4">Demo Title &amp; Category</th>
                <th className="py-3 px-4">Type &amp; Platform</th>
                <th className="py-3 px-4">Indicative Cost</th>
                <th className="py-3 px-4">Capabilities</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDemos.slice(0, 50).map((demo) => (
                <tr key={demo.id} className="hover:bg-[#0E2248]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#00D9FF]">
                    #{demo.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{demo.name}</div>
                    <div className="text-[10px] text-slate-400">{demo.categoryName}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200">{demo.developmentType}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{demo.platform}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-200">{demo.indicativeStartingPrice}</div>
                    <div className="text-[10px] text-slate-400">{demo.estimatedDevelopmentTime}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {demo.isAiEnabled && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono text-[9px]">
                          AI
                        </span>
                      )}
                      {demo.isEcommerce && (
                        <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 font-mono text-[9px]">
                          Store
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-[9px] uppercase border border-emerald-500/30">
                      {demo.availabilityStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setEditDemo(demo)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#00D9FF] hover:text-[#030B24] text-white text-[10px] font-bold transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDemos.length > 50 && (
          <div className="p-3 text-center text-xs font-mono text-slate-400 border-t border-white/5">
            Showing first 50 of {filteredDemos.length} demo models. Use search or category filter to refine.
          </div>
        )}
      </div>

      {/* 3. Edit Demo Modal */}
      {editDemo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleEditSubmit}
            className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Edit Demo Model #{editDemo.id}</h3>
              <button
                type="button"
                onClick={() => setEditDemo(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Demo Name</label>
              <input
                type="text"
                value={editDemo.name}
                onChange={(e) => setEditDemo({ ...editDemo, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Indicative Price</label>
                <input
                  type="text"
                  value={editDemo.indicativeStartingPrice}
                  onChange={(e) => setEditDemo({ ...editDemo, indicativeStartingPrice: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Estimated Timeline</label>
                <input
                  type="text"
                  value={editDemo.estimatedDevelopmentTime}
                  onChange={(e) => setEditDemo({ ...editDemo, estimatedDevelopmentTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
              <textarea
                rows={3}
                value={editDemo.shortDescription || ""}
                onChange={(e) => setEditDemo({ ...editDemo, shortDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditDemo(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00D9FF] text-[#030B24] text-xs font-bold"
              >
                Save Demo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
