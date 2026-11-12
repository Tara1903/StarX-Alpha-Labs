"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DemoCategory, DemoModel } from "@/types/demo";
import { DemoCard } from "@/components/demos/DemoCard";
import { CustomizationModal } from "@/components/demos/CustomizationModal";
import { VideoModal } from "@/components/demos/VideoModal";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowLeft, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Search, 
  Sparkles, 
  UtensilsCrossed, 
  ShoppingBag, 
  GraduationCap, 
  Activity, 
  Briefcase, 
  Building2, 
  Wrench, 
  Factory, 
  Users, 
  Ticket, 
  Smartphone,
  ChevronRight
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

interface CategoryClientProps {
  category: DemoCategory;
  demos: DemoModel[];
}

export function CategoryClient({ category, demos }: CategoryClientProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeVideoDemo, setActiveVideoDemo] = useState<DemoModel | null>(null);
  const [activeCustomizationDemo, setActiveCustomizationDemo] = useState<DemoModel | null>(null);

  const Icon = ICON_MAP[category.iconName] || Layers;

  const filtered = demos.filter((d) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.shortDescription.toLowerCase().includes(q) ||
      (d.productType?.toLowerCase().includes(q) ?? false) ||
      (d.searchKeywords?.some((k) => k.toLowerCase().includes(q)) ?? false) ||
      d.techStack.some((t) => t.toLowerCase().includes(q)) ||
      d.mainFeatures.some((f) => f.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/demos" className="hover:text-white transition-colors">All Demos</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#73D8FF] font-medium">{category.name}</span>
          </nav>
          <Link
            href="/demos"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#32A9E8] hover:text-[#73D8FF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("btn.backToCatalogue")}</span>
          </Link>
        </div>

        {/* Category Hero Banner */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0A172C] to-[#06101E] border border-[#163359] shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102D50] text-[#73D8FF] text-xs font-semibold border border-[#1769AA]/50">
              <Icon className="w-4 h-4 text-[#32A9E8]" />
              <span>Category {category.number} of 12 &bull; {demos.length} Models</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {category.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {category.description}
            </p>

            {/* Category Highlights */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              {category.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#091527] text-xs font-medium text-slate-200 border border-[#173863]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#32A9E8]" />
                  <span>{h}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Search Within Category */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#081324] p-4 rounded-2xl border border-[#163359]">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search within ${category.name}...`}
              className="w-full pl-10 pr-4 py-2 bg-[#050D1A] rounded-xl border border-[#173863] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#32A9E8]"
            />
          </div>
          <div className="text-xs text-slate-400">
            Displaying <strong className="text-[#73D8FF]">{filtered.length}</strong> of {category.count} models in this sector
          </div>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((demo) => (
            <DemoCard
              key={demo.id}
              demo={demo}
              onOpenVideo={setActiveVideoDemo}
              onOpenCustomization={setActiveCustomizationDemo}
            />
          ))}
        </div>
      </div>

      <VideoModal
        demo={activeVideoDemo}
        isOpen={Boolean(activeVideoDemo)}
        onClose={() => setActiveVideoDemo(null)}
      />

      <CustomizationModal
        demo={activeCustomizationDemo}
        isOpen={Boolean(activeCustomizationDemo)}
        onClose={() => setActiveCustomizationDemo(null)}
      />
    </div>
  );
}
