"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { DEMO_CATEGORIES } from "@/data/categories";
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  ArrowUpDown,
  Laptop,
  Smartphone,
  Globe,
  Database,
  Bot,
  ShoppingCart
} from "lucide-react";

export interface DemoFilterState {
  searchQuery: string;
  selectedCategory: string; // "all" or category slug
  selectedDevType: string;
  selectedPlatform: string;
  aiOnly: boolean;
  ecommerceOnly: boolean;
  erpCrmOnly: boolean;
  freeDemoOnly: boolean;
  sortBy: "default" | "price-asc" | "price-desc" | "popular" | "time";
  activeTab: "all" | "featured" | "popular" | "recent";
}

interface DemoFilterBarProps {
  filters: DemoFilterState;
  onChange: (filters: DemoFilterState) => void;
  totalFiltered: number;
  totalCount: number;
}

export function DemoFilterBar({ filters, onChange, totalFiltered, totalCount }: DemoFilterBarProps) {
  const { t } = useLanguage();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const update = (partial: Partial<DemoFilterState>) => {
    onChange({ ...filters, ...partial });
  };

  const resetAll = () => {
    onChange({
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
  };

  const hasActiveFilters = 
    filters.searchQuery !== "" || 
    filters.selectedCategory !== "all" || 
    filters.selectedDevType !== "all" || 
    filters.selectedPlatform !== "all" || 
    filters.aiOnly || 
    filters.ecommerceOnly || 
    filters.erpCrmOnly || 
    filters.freeDemoOnly;

  return (
    <div className="space-y-4">
      {/* Top Search Bar & Sort Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-[#081324]/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#163359]">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => update({ searchQuery: e.target.value })}
            placeholder={t("showcase.searchPlaceholder")}
            className="w-full pl-10 pr-10 py-2.5 bg-[#050D1A] rounded-xl border border-[#173863] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#32A9E8] focus:ring-1 focus:ring-[#32A9E8] transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => update({ searchQuery: "" })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tabs & Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-2">
          {/* Quick Sort Dropdown */}
          <div className="relative flex items-center bg-[#050D1A] rounded-xl border border-[#173863] px-3 py-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#32A9E8] mr-1.5" />
            <select
              value={filters.sortBy}
              onChange={(e) => update({ sortBy: e.target.value as any })}
              aria-label="Sort demo models"
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="default" className="bg-[#050D1A] text-white">Sort: Standard (#1 - #160)</option>
              <option value="popular" className="bg-[#050D1A] text-white">Sort: Most Popular</option>
              <option value="price-asc" className="bg-[#050D1A] text-white">Sort: Price: Low to High</option>
              <option value="price-desc" className="bg-[#050D1A] text-white">Sort: Price: High to Low</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-[#102D50] hover:bg-[#1769AA] text-white rounded-xl text-xs font-semibold border border-[#32A9E8]/40"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#73D8FF] animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Showcase Mode Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {[
            { id: "all", label: `All 160 Models (${totalCount})` },
            { id: "featured", label: "Featured Flagships" },
            { id: "popular", label: "Popular & In-Demand" },
            { id: "recent", label: "Recently Updated" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => update({ activeTab: tab.id as any })}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                filters.activeTab === tab.id
                  ? "bg-[#1769AA] text-white border-[#32A9E8] shadow-md shadow-[#1769AA]/30"
                  : "bg-[#091527] text-slate-300 border-[#163359] hover:bg-[#10243E] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">
            Showing <strong className="text-[#73D8FF]">{totalFiltered}</strong> of {totalCount}
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetAll}
              className="text-[#32A9E8] hover:text-[#73D8FF] hover:underline flex items-center gap-1 font-medium"
            >
              <X className="w-3 h-3" />
              <span>{t("showcase.clearFilters")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Comprehensive Filter Controls Grid (Desktop & Open Drawer) */}
      <div className={`${mobileDrawerOpen ? "block" : "hidden md:block"} bg-[#06101E]/95 p-4 rounded-2xl border border-[#163359] space-y-4`}>
        {/* Row 1: Category Selector Dropdown & Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Industry Category */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              {t("filter.industry")}
            </label>
            <select
              value={filters.selectedCategory}
              onChange={(e) => update({ selectedCategory: e.target.value })}
              aria-label="Filter by industry category"
              className="w-full py-2 px-3 bg-[#091527] border border-[#1A3D68] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[#32A9E8]"
            >
              <option value="all">All 12 Categories</option>
              {DEMO_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.number}. {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          {/* Development Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              {t("filter.softwareType")}
            </label>
            <select
              value={filters.selectedDevType}
              onChange={(e) => update({ selectedDevType: e.target.value })}
              aria-label="Filter by software development type"
              className="w-full py-2 px-3 bg-[#091527] border border-[#1A3D68] rounded-xl text-xs text-slate-200 focus:outline-none focus:border-[#32A9E8]"
            >
              <option value="all">All Software Types</option>
              <option value="Web App">Web App</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Website">Website</option>
              <option value="Cloud ERP">Cloud ERP</option>
              <option value="AI Microservice">AI Microservice</option>
              <option value="SaaS Platform">SaaS Platform</option>
            </select>
          </div>

          {/* Platform filter: Website / Web App / Mobile App */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              {t("filter.platform")}
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: "all", label: "All" },
                { id: "Website", label: "Web", icon: Globe },
                { id: "Web App", label: "App", icon: Laptop },
                { id: "Mobile App", label: "Mobile", icon: Smartphone }
              ].map((p) => {
                const isSelected = filters.selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => update({ selectedPlatform: p.id })}
                    className={`py-2 px-1.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      isSelected
                        ? "bg-[#1769AA] text-white border-[#32A9E8]"
                        : "bg-[#091527] text-slate-300 border-[#1A3D68] hover:bg-[#10243E]"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2: Feature Toggles: AI-enabled, E-commerce, ERP/CRM, Free Demo */}
        <div className="pt-2 border-t border-[#132B4C] flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-2">
            Capability Filters:
          </span>

          {/* AI-enabled */}
          <button
            type="button"
            onClick={() => update({ aiOnly: !filters.aiOnly })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              filters.aiOnly
                ? "bg-violet-950/80 text-violet-200 border-violet-500 shadow-sm"
                : "bg-[#091527] text-slate-400 border-[#1A3D68] hover:text-slate-200"
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-violet-400" />
            <span>AI Enabled</span>
            {filters.aiOnly && <Check className="w-3 h-3 text-violet-300 ml-0.5" />}
          </button>

          {/* E-commerce */}
          <button
            type="button"
            onClick={() => update({ ecommerceOnly: !filters.ecommerceOnly })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              filters.ecommerceOnly
                ? "bg-blue-950/80 text-blue-200 border-blue-500 shadow-sm"
                : "bg-[#091527] text-slate-400 border-[#1A3D68] hover:text-slate-200"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 text-blue-400" />
            <span>E-Commerce</span>
            {filters.ecommerceOnly && <Check className="w-3 h-3 text-blue-300 ml-0.5" />}
          </button>

          {/* ERP / CRM */}
          <button
            type="button"
            onClick={() => update({ erpCrmOnly: !filters.erpCrmOnly })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              filters.erpCrmOnly
                ? "bg-purple-950/80 text-purple-200 border-purple-500 shadow-sm"
                : "bg-[#091527] text-slate-400 border-[#1A3D68] hover:text-slate-200"
            }`}
          >
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span>ERP / CRM</span>
            {filters.erpCrmOnly && <Check className="w-3 h-3 text-purple-300 ml-0.5" />}
          </button>

          {/* Free Demo Available */}
          <button
            type="button"
            onClick={() => update({ freeDemoOnly: !filters.freeDemoOnly })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              filters.freeDemoOnly
                ? "bg-emerald-950/80 text-emerald-200 border-emerald-500 shadow-sm"
                : "bg-[#091527] text-slate-400 border-[#1A3D68] hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free Live Demo Available</span>
            {filters.freeDemoOnly && <Check className="w-3 h-3 text-emerald-300 ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
