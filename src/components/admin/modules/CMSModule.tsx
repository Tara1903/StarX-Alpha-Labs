"use client";

import React, { useState } from "react";
import {
  Layers,
  Building,
  Globe,
  Briefcase,
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/data/services";
import { DIVISIONS_DATA, DivisionItem } from "@/data/divisions";
import { INDUSTRIES_DATA, IndustryItem } from "@/data/industries";
import { PORTFOLIO_DATA, PortfolioItem } from "@/data/portfolio";
import { BLOG_POSTS, BlogPost } from "@/data/blog";

interface CMSModuleProps {
  initialSubTab?: "services" | "divisions" | "industries" | "portfolio" | "blog";
  onShowToast: (msg: string) => void;
}

export function CMSModule({ initialSubTab = "services", onShowToast }: CMSModuleProps) {
  const [subTab, setSubTab] = useState<"services" | "divisions" | "industries" | "portfolio" | "blog">(initialSubTab);

  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [divisions, setDivisions] = useState<DivisionItem[]>(DIVISIONS_DATA);
  const [industries, setIndustries] = useState<IndustryItem[]>(INDUSTRIES_DATA);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(PORTFOLIO_DATA);
  const [blog, setBlog] = useState<BlogPost[]>(BLOG_POSTS);

  // Edit / Add modal
  const [editItem, setEditItem] = useState<any | null>(null);

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    if (subTab === "services") {
      setServices((prev) =>
        prev.map((s) => (s.slug === editItem.slug ? editItem : s))
      );
      onShowToast(`Updated Service: ${editItem.title}`);
    } else if (subTab === "portfolio") {
      setPortfolio((prev) =>
        prev.map((p) => (p.slug === editItem.slug ? editItem : p))
      );
      onShowToast(`Updated Portfolio: ${editItem.title}`);
    } else if (subTab === "blog") {
      setBlog((prev) =>
        prev.map((b) => (b.slug === editItem.slug ? editItem : b))
      );
      onShowToast(`Updated Blog: ${editItem.title}`);
    }

    setEditItem(null);
  };

  return (
    <div className="space-y-6 text-left">
      {/* 1. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        {[
          { id: "services", label: `Services (${services.length})`, icon: Layers },
          { id: "divisions", label: `Divisions (${divisions.length})`, icon: Building },
          { id: "industries", label: `Industries (${industries.length})`, icon: Globe },
          { id: "portfolio", label: `Portfolio (${portfolio.length})`, icon: Briefcase },
          { id: "blog", label: `Blog (${blog.length})`, icon: BookOpen },
        ].map((t) => {
          const Icon = t.icon;
          const isSelected = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-md shadow-[#087BFF]/30"
                  : "bg-[#071638] text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. SUBTAB: SERVICES */}
      {subTab === "services" && (
        <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Service Title &amp; Slug</th>
                <th className="py-3 px-4">Category / Division</th>
                <th className="py-3 px-4">Timeline / Price</th>
                <th className="py-3 px-4">Features Count</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((svc) => (
                <tr key={svc.slug} className="hover:bg-[#0E2248]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{svc.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">/{svc.slug}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF]">
                      {svc.categoryLabel || svc.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    <div>{svc.startingPrice}</div>
                    <div className="text-[10px] text-slate-400">{svc.estimatedTimeline}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {svc.features.length} core deliverables
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setEditItem(svc)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00D9FF] hover:text-[#030B24] text-white font-bold text-[10px] transition-colors cursor-pointer"
                    >
                      Edit Service
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. SUBTAB: DIVISIONS */}
      {subTab === "divisions" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {divisions.map((div) => (
            <div key={div.slug} className="p-6 rounded-3xl bg-[#071638]/90 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#00D9FF] uppercase">{div.badge}</span>
                <span className="text-[10px] font-mono text-emerald-400">Published</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">{div.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">{div.tagline}</p>
              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 font-mono">
                Route: /divisions/{div.slug}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. SUBTAB: INDUSTRIES */}
      {subTab === "industries" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind) => (
            <div key={ind.slug} className="p-5 rounded-2xl bg-[#071638]/90 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{ind.name}</span>
                <span className="text-[10px] font-mono text-[#00D9FF]">/{ind.slug}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{ind.overview}</p>
              <div className="text-[10px] font-mono text-slate-400 pt-1">
                {ind.solutions.length} enterprise solutions
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. SUBTAB: PORTFOLIO */}
      {subTab === "portfolio" && (
        <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Category &amp; Verification</th>
                <th className="py-3 px-4">Project Type</th>
                <th className="py-3 px-4">Tech Stack</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {portfolio.map((p) => (
                <tr key={p.slug} className="hover:bg-[#0E2248]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{p.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">/{p.slug}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <div>{p.categoryLabel}</div>
                    <div className="text-[10px] text-slate-400">{p.verificationBadge}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 font-mono text-[9px] uppercase border border-cyan-400/30">
                      {p.projectType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[10px]">
                    {p.techStack.slice(0, 3).join(", ")}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setEditItem(p)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00D9FF] hover:text-[#030B24] text-white font-bold text-[10px] transition-colors cursor-pointer"
                    >
                      Edit Project
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. SUBTAB: BLOG */}
      {subTab === "blog" && (
        <div className="rounded-3xl bg-[#071638]/90 border border-white/10 overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#05112A] border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Reading Time</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blog.map((b) => (
                <tr key={b.slug} className="hover:bg-[#0E2248]/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{b.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">/{b.slug}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300">
                      {b.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[10px]">
                    {b.readTime}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[10px]">
                    {b.publishDate}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setEditItem(b)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00D9FF] hover:text-[#030B24] text-white font-bold text-[10px] transition-colors cursor-pointer"
                    >
                      Edit Article
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 7. Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveItem}
            className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Edit {editItem.title}</h3>
              <button
                type="button"
                onClick={() => setEditItem(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Title</label>
              <input
                type="text"
                value={editItem.title || ""}
                onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Slug</label>
              <input
                type="text"
                disabled
                value={editItem.slug || ""}
                className="w-full px-3 py-2 rounded-xl bg-[#05112A] border border-white/5 text-xs text-slate-400 font-mono"
              />
            </div>

            {editItem.startingPrice !== undefined && (
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Starting Price</label>
                <input
                  type="text"
                  value={editItem.startingPrice || ""}
                  onChange={(e) => setEditItem({ ...editItem, startingPrice: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
                />
              </div>
            )}

            {editItem.projectType !== undefined && (
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Project Type</label>
                <select
                  value={editItem.projectType}
                  onChange={(e) => setEditItem({ ...editItem, projectType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#08183A] border border-white/10 text-xs text-white"
                >
                  <option value="Architectural Demo">Architectural Demo</option>
                  <option value="Proprietary Prototype">Proprietary Prototype</option>
                  <option value="Reference System">Reference System</option>
                </select>
              </div>
            )}

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditItem(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00D9FF] text-[#030B24] text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
