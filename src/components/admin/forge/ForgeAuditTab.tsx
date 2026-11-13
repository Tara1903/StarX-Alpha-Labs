"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  PORTFOLIO_AUDIT_DATA,
  getPortfolioAuditMetrics,
  DemoAuditRecord,
  AuditDecision,
} from "@/lib/forge/auditData";
import { DEMO_CATEGORIES } from "@/data/categories";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  Layers,
  Package,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
} from "lucide-react";

interface ForgeAuditTabProps {
  onShowToast?: (msg: string) => void;
}

export function ForgeAuditTab({ onShowToast }: ForgeAuditTabProps) {
  const metrics = useMemo(() => getPortfolioAuditMetrics(), []);
  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("ALL");
  const [selectedDecision, setSelectedDecision] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedProductType, setSelectedProductType] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return PORTFOLIO_AUDIT_DATA.filter((item) => {
      if (selectedBatch !== "ALL" && item.batch !== selectedBatch) return false;
      if (selectedDecision !== "ALL" && item.decision !== selectedDecision) return false;
      if (selectedCategory !== "ALL" && item.targetCategorySlug !== selectedCategory) return false;
      if (selectedProductType !== "ALL" && item.productType !== selectedProductType) return false;
      if (!search.trim()) return true;

      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.targetCategoryName.toLowerCase().includes(q) ||
        item.productType.toLowerCase().includes(q) ||
        item.analysisReasoning.toLowerCase().includes(q) ||
        item.salvageableAssets.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [search, selectedBatch, selectedDecision, selectedCategory, selectedProductType]);

  const getDecisionBadge = (decision: AuditDecision) => {
    switch (decision) {
      case "KEEP":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "RECLASSIFY":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      case "REBUILD":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "SCRAP":
        return "bg-rose-500/15 text-rose-400 border-rose-500/30";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-cyan-400";
    if (score >= 70) return "text-amber-400";
    return "text-rose-400";
  };

  return (
    <div className="space-y-8">
      {/* Executive Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1A35] via-[#09152B] to-[#060F1E] border border-[#163359] shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Canonical 12-Category Architecture & Quality Gate</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Batch 1 & 2 Portfolio Audit: 12 Industry Solutions with Differentiated Product Types
          </h2>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            StarX Alpha Labs maintains exactly 12 industry categories across the public showcase. Management software is an independent
            product type (<code className="text-cyan-400 font-mono">business_management_software</code>), integrated directly into its native industry (e.g. Restaurant Management in Food & Hospitality, Multi-Store POS in Retail & Ecommerce).
          </p>
        </div>
      </div>

      {/* Metrics Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-[#0A172C] border border-[#173863]">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Audited Demos</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{metrics.totalAudited}</span>
            <span className="text-xs text-slate-400">+ 1 Pilot</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono mt-1 block">100% evaluated</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0A172C] border border-emerald-500/30">
          <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider block">KEEP (Flagships)</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400">{metrics.keepCount}</span>
            <span className="text-xs text-slate-400">({Math.round((metrics.keepCount / metrics.totalAudited) * 100)}%)</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Customer digital products</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0A172C] border border-blue-500/30">
          <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wider block">RECLASSIFY</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-400">{metrics.reclassifyCount}</span>
            <span className="text-xs text-slate-400">({Math.round((metrics.reclassifyCount / metrics.totalAudited) * 100)}%)</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Typed as Business Mgmt</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0A172C] border border-amber-500/30">
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wider block">REBUILD</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-400">{metrics.rebuildCount}</span>
            <span className="text-xs text-slate-400">({Math.round((metrics.rebuildCount / metrics.totalAudited) * 100)}%)</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Consumer product rebuilds</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0A172C] border border-rose-500/30">
          <span className="text-[11px] font-medium text-rose-400 uppercase tracking-wider block">SCRAP</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-rose-400">{metrics.scrapCount}</span>
            <span className="text-xs text-slate-400">({Math.round((metrics.scrapCount / metrics.totalAudited) * 100)}%)</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Redundant / weak models</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0A172C] border border-[#173863]">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Average Quality</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#73D8FF]">{metrics.averageScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block truncate">Top: {metrics.highestScoring.score}/100</span>
        </div>
      </div>

      {/* 12 Industry Solutions Architecture Notice */}
      <div className="p-4 rounded-xl bg-[#08182E] border border-blue-500/30 flex items-start gap-3">
        <Briefcase className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed space-y-1">
          <p className="font-semibold text-white">
            Architecture Preserved: <span className="text-cyan-400 font-mono">Exactly 12 Canonical Industry Categories</span>
          </p>
          <p>
            The public catalogue strictly retains the 12 industry categories matching the homepage 2×6 layout.
            The 16 reclassified applications (#01, #02, #03, #08, #09, #15, #16, #17, #18, #19, #20, #21, #22, #26, #27, #28)
            remain anchored in their native industries (Food & Hospitality or Retail & Ecommerce) with their product type standardized as <code className="text-blue-400 font-mono">business_management_software</code>.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#081324] border border-[#163359] flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audited demos, assets..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#050D1A] rounded-lg border border-[#173863] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Industry Category Selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-[#050D1A] rounded-lg border border-[#173863] text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All 12 Industries</option>
            {DEMO_CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                #{cat.number} {cat.name}
              </option>
            ))}
          </select>

          {/* Product Type Selector */}
          <select
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(e.target.value)}
            className="px-2.5 py-1.5 bg-[#050D1A] rounded-lg border border-[#173863] text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Product Types</option>
            <option value="business_management_software">business_management_software</option>
            <option value="ecommerce_website">ecommerce_website</option>
            <option value="web_application">web_application</option>
            <option value="marketplace">marketplace</option>
            <option value="pwa">pwa</option>
            <option value="business_website">business_website</option>
            <option value="native_android_app">native_android_app</option>
            <option value="native_ios_app">native_ios_app</option>
            <option value="digital_ecosystem">digital_ecosystem</option>
          </select>

          {/* Batch Selector */}
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="px-2.5 py-1.5 bg-[#050D1A] rounded-lg border border-[#173863] text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Batches</option>
            <option value="Batch 01">Batch 01 (Food & Hospitality)</option>
            <option value="Batch 02">Batch 02 (Retail & Ecommerce)</option>
            <option value="Pilot">Pilot (Maison Ember)</option>
          </select>

          {/* Decision Selector */}
          <select
            value={selectedDecision}
            onChange={(e) => setSelectedDecision(e.target.value)}
            className="px-2.5 py-1.5 bg-[#050D1A] rounded-lg border border-[#173863] text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="ALL">All Decisions</option>
            <option value="KEEP">KEEP (5 Flagships)</option>
            <option value="RECLASSIFY">RECLASSIFY (16 Management)</option>
            <option value="REBUILD">REBUILD (4 High-Potential)</option>
            <option value="SCRAP">SCRAP (3 Weak)</option>
          </select>

          <span className="text-xs text-slate-400 ml-auto font-mono">
            Showing <strong className="text-white">{filtered.length}</strong> of {PORTFOLIO_AUDIT_DATA.length}
          </span>
        </div>
      </div>

      {/* Audit Items Accordion / Cards */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.slug}
              className="rounded-xl bg-[#091527] border border-[#163359] hover:border-[#1E4575] transition-all overflow-hidden"
            >
              {/* Card Header Row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none hover:bg-[#0B1A33]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#102D50] text-[#73D8FF] border border-[#1769AA]/40 shrink-0">
                    #{item.catalogId || "Pilot"}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-white leading-snug">{item.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">({item.slug})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <span>{item.batch}</span>
                      <span>&bull;</span>
                      <span className="text-cyan-400 font-medium">{item.targetCategoryName}</span>
                      <span>&bull;</span>
                      <span className="text-slate-300 font-mono text-[11px] bg-[#06101E] px-1.5 py-0.5 rounded border border-white/5">
                        {item.productType}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {/* Total Score Badge */}
                  <div className="text-right">
                    <span className={`text-base font-extrabold ${getScoreColor(item.scores.total)}`}>
                      {item.scores.total}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1">/100</span>
                  </div>

                  {/* Decision Badge */}
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getDecisionBadge(
                      item.decision
                    )} shrink-0`}
                  >
                    {item.decision}
                  </span>

                  {/* Chevron Toggle */}
                  <button className="text-slate-400 hover:text-white p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Inspection Detail Drawer */}
              {isExpanded && (
                <div className="p-5 pt-3 bg-[#06101E] border-t border-[#132B4C] space-y-4 text-xs">
                  {/* Score Breakdown Radar */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 rounded-lg bg-[#081529] border border-[#143257]">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Design (25)</span>
                      <span className="text-sm font-bold text-white">{item.scores.design} / 25</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Functionality (25)</span>
                      <span className="text-sm font-bold text-white">{item.scores.functionality} / 25</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Completeness (20)</span>
                      <span className="text-sm font-bold text-white">{item.scores.completeness} / 20</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Originality (15)</span>
                      <span className="text-sm font-bold text-white">{item.scores.originality} / 15</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Commercial (15)</span>
                      <span className="text-sm font-bold text-white">{item.scores.commercial} / 15</span>
                    </div>
                  </div>

                  {/* Analysis Reasoning */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                      Architectural Evaluation & Rationale:
                    </span>
                    <p className="text-slate-200 leading-relaxed">{item.analysisReasoning}</p>
                  </div>

                  {/* Salvageable Assets */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                      Salvageable Reusable Assets & Code:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.salvageableAssets.map((asset, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]"
                        >
                          {asset}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Issues Found */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                      Identified Limitations / Misclassifications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.issuesFound.map((issue, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px]"
                        >
                          {issue}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action & Links */}
                  <div className="pt-2 border-t border-[#132B4C] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Industry:</span>
                      <span className="font-semibold text-[#73D8FF]">{item.targetCategoryName}</span>
                      <span className="text-slate-500">|</span>
                      <span className="text-slate-400">Product Type:</span>
                      <span className="font-mono text-cyan-300 font-semibold">{item.productType}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/forge/preview/${item.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#102D50] hover:bg-[#174175] text-[#73D8FF] font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect in Forge Sandbox</span>
                      </Link>

                      {item.batch !== "Pilot" && (
                        <Link
                          href={`/demos/${item.targetCategorySlug}/${item.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#09172B] hover:bg-[#122744] text-slate-300 hover:text-white border border-[#163359] font-medium transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          <span>Catalog Blueprint</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
