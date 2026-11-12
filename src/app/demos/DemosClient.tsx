"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_DEMOS } from "@/data/demos";
import { DEMO_CATEGORIES } from "@/data/categories";
import { DemoModel } from "@/types/demo";
import { applyPublishedStates } from "@/lib/forge/demoMerge";
import { DemoCard } from "@/components/demos/DemoCard";
import { DemoFilterBar, DemoFilterState } from "@/components/demos/DemoFilterBar";
import { CustomizationModal } from "@/components/demos/CustomizationModal";
import { VideoModal } from "@/components/demos/VideoModal";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Sparkles, 
  Layers, 
  Building2, 
  Download, 
  ArrowRight, 
  UtensilsCrossed, 
  ShoppingBag, 
  GraduationCap, 
  Activity, 
  Briefcase, 
  Wrench, 
  Factory, 
  Users, 
  Ticket, 
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  FileSpreadsheet
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  UtensilsCrossed,
  ShoppingBag,
  GraduationCap,
  Activity,
  Briefcase,
  Building2,
  Wrench,
  Factory,
  Sparkles,
  Users,
  Ticket,
  Smartphone
};

export function DemosClient({ publishedSlugs = [] }: { publishedSlugs?: string[] }) {
  const { t, language, setLanguage } = useLanguage();
  const [activeVideoDemo, setActiveVideoDemo] = useState<DemoModel | null>(null);
  const [activeCustomizationDemo, setActiveCustomizationDemo] = useState<DemoModel | null>(null);

  const allDemos = useMemo(
    () => applyPublishedStates(ALL_DEMOS, publishedSlugs),
    [publishedSlugs]
  );

  const liveCount = useMemo(
    () => allDemos.filter((d) => d.availabilityStatus === "Live Demo").length,
    [allDemos]
  );

  const [filters, setFilters] = useState<DemoFilterState>({
    searchQuery: "",
    selectedCategory: "all",
    selectedDevType: "all",
    selectedPlatform: "all",
    aiOnly: false,
    ecommerceOnly: false,
    erpCrmOnly: false,
    freeDemoOnly: false,
    sortBy: "default",
    activeTab: "all"
  });

  // Filter & Sort calculation
  const filteredDemos = useMemo(() => {
    let list = [...allDemos];

    // Tab filter
    if (filters.activeTab === "featured") {
      list = list.filter((d) => d.isFeatured);
    } else if (filters.activeTab === "popular") {
      list = list.filter((d) => d.isPopular || d.isFeatured);
    } else if (filters.activeTab === "recent") {
      list = list.slice(-30);
    }

    // Category filter
    if (filters.selectedCategory !== "all") {
      list = list.filter((d) => d.categorySlug === filters.selectedCategory);
    }

    // Development type filter
    if (filters.selectedDevType !== "all") {
      list = list.filter((d) => d.developmentType === filters.selectedDevType);
    }

    // Platform filter
    if (filters.selectedPlatform !== "all") {
      list = list.filter((d) => d.platform === filters.selectedPlatform);
    }

    // AI toggle
    if (filters.aiOnly) {
      list = list.filter((d) => d.isAiEnabled);
    }

    // E-commerce toggle
    if (filters.ecommerceOnly) {
      list = list.filter((d) => d.isEcommerce);
    }

    // ERP/CRM toggle
    if (filters.erpCrmOnly) {
      list = list.filter((d) => d.isErpCrm);
    }

    // Free Demo toggle
    if (filters.freeDemoOnly) {
      list = list.filter((d) => d.isFreeDemoAvailable);
    }

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.categoryName.toLowerCase().includes(q) ||
          d.shortDescription.toLowerCase().includes(q) ||
          d.suitableFor.toLowerCase().includes(q) ||
          (d.productType?.toLowerCase().includes(q) ?? false) ||
          (d.searchKeywords?.some((k) => k.toLowerCase().includes(q)) ?? false) ||
          d.techStack.some((t) => t.toLowerCase().includes(q)) ||
          d.mainFeatures.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (filters.sortBy === "price-asc") {
      list.sort((a, b) => parseInt(a.indicativeStartingPrice.replace(/[^0-9]/g, "")) - parseInt(b.indicativeStartingPrice.replace(/[^0-9]/g, "")));
    } else if (filters.sortBy === "price-desc") {
      list.sort((a, b) => parseInt(b.indicativeStartingPrice.replace(/[^0-9]/g, "")) - parseInt(a.indicativeStartingPrice.replace(/[^0-9]/g, "")));
    } else if (filters.sortBy === "popular") {
      list.sort((a, b) => b.viewsCount - a.viewsCount);
    } else {
      list.sort((a, b) => a.id - b.id);
    }

    return list;
  }, [allDemos, filters]);

  const exportCatalogueCSV = () => {
    const headers = ["ID", "Name", "Category", "Dev Type", "Platform", "Starting Price", "Est. Time", "Status", "AI Enabled", "E-commerce"];
    const rows = allDemos.map((d) => [
      d.id,
      `"${d.name.replace(/"/g, '""')}"`,
      `"${d.categoryName.replace(/"/g, '""')}"`,
      d.developmentType,
      d.platform,
      `"${d.indicativeStartingPrice}"`,
      `"${d.estimatedDevelopmentTime}"`,
      d.availabilityStatus,
      d.isAiEnabled ? "Yes" : "No",
      d.isEcommerce ? "Yes" : "No"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `starx_alpha_labs_160_demos_catalogue.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 pt-28 pb-20">
      {/* Background Glow Accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1769AA]/20 via-[#102D50]/10 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Header / Language & Offline Export Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#143054] pb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#102D50] text-[#73D8FF] text-xs font-mono border border-[#1769AA]/50 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#32A9E8]" />
              {allDemos.length} Canonical Solution Blueprints ({liveCount} Live &bull; {allDemos.length - liveCount} Under Development)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center bg-[#091527] border border-[#163359] rounded-xl p-1 text-xs">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  language === "en" ? "bg-[#1769AA] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  language === "hi" ? "bg-[#1769AA] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Offline Catalogue Export */}
            <button
              onClick={exportCatalogueCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F243E] hover:bg-[#163359] text-slate-200 border border-[#1A3D68] text-xs font-medium transition-all"
              title="Download Full 160 Demos Catalogue as CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV (160 Demos)</span>
            </button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102D50]/80 border border-[#32A9E8]/40 text-xs font-semibold text-[#73D8FF] shadow-lg shadow-[#1769AA]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Technology Sandbox & Blueprint Library</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {t("showcase.title")}
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-3xl mx-auto">
            {t("showcase.subtitle")}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto">
            {[
              { label: "Catalogue Entries", value: `${allDemos.length} Models`, sub: "Fully Documented" },
              { label: "Core Industries", value: "12 Sectors", sub: "Specialized Architectures" },
              { label: "Role Portals", value: "Multi-Persona", sub: "Admin, Staff, Customer" },
              { label: "Turnaround", value: "1-4 Weeks", sub: "Production Deployed" },
            ].map((stat, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[#091527]/80 border border-[#163359] text-center">
                <div className="text-lg sm:text-xl font-extrabold text-[#73D8FF]">{stat.value}</div>
                <div className="text-xs font-semibold text-white">{stat.label}</div>
                <div className="text-[10px] text-slate-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 12 Category Tiles Grid */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#32A9E8]" />
              <span>Explore by 12 Core Industry Categories</span>
            </h2>
            <span className="text-xs text-slate-400">Click any sector to view dedicated hub</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DEMO_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.iconName] || Layers;
              const isSelected = filters.selectedCategory === cat.slug;

              return (
                <div
                  key={cat.slug}
                  className={`group relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#102D50] border-[#32A9E8] shadow-lg shadow-[#1769AA]/30"
                      : "bg-[#091527]/80 hover:bg-[#0E203B] border-[#163359] hover:border-[#32A9E8]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#102D50] to-[#1769AA] border border-[#32A9E8]/40 flex items-center justify-center text-[#73D8FF] group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#050D1A] text-slate-300 border border-[#143054]">
                        {cat.count} Models
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base mb-1 group-hover:text-[#73D8FF] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#143054] flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, selectedCategory: isSelected ? "all" : cat.slug })}
                      className="text-[#32A9E8] hover:text-[#73D8FF] font-medium"
                    >
                      {isSelected ? "Clear Filter" : "Filter Here"}
                    </button>
                    <Link
                      href={`/demos/${cat.slug}`}
                      className="flex items-center gap-1 text-slate-300 hover:text-white font-medium group/link"
                    >
                      <span>Category Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Filter Bar & Interactive Catalogue Grid */}
        <section id="catalogue" className="space-y-6 pt-6">
          <DemoFilterBar
            filters={filters}
            onChange={setFilters}
            totalFiltered={filteredDemos.length}
            totalCount={allDemos.length}
          />

          {/* Demos Cards Grid */}
          {filteredDemos.length === 0 ? (
            <div className="py-20 text-center bg-[#081324] rounded-3xl border border-[#163359] p-8 space-y-4">
              <Layers className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Matching Demos Found</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                No demo model matched your current search filters. Try resetting the filters or searching for alternative industry keywords.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: "",
                    selectedCategory: "all",
                    selectedDevType: "all",
                    selectedPlatform: "all",
                    aiOnly: false,
                    ecommerceOnly: false,
                    erpCrmOnly: false,
                    freeDemoOnly: false,
                    sortBy: "default",
                    activeTab: "all"
                  })
                }
                className="px-6 py-2.5 rounded-xl bg-[#1769AA] text-white text-xs font-semibold hover:bg-[#1F7ECB]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDemos.map((demo) => (
                <DemoCard
                  key={demo.id}
                  demo={demo}
                  onOpenVideo={setActiveVideoDemo}
                  onOpenCustomization={setActiveCustomizationDemo}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Video Modal */}
      <VideoModal
        demo={activeVideoDemo}
        isOpen={Boolean(activeVideoDemo)}
        onClose={() => setActiveVideoDemo(null)}
      />

      {/* Customization Request Modal */}
      <CustomizationModal
        demo={activeCustomizationDemo}
        isOpen={Boolean(activeCustomizationDemo)}
        onClose={() => setActiveCustomizationDemo(null)}
      />
    </div>
  );
}
