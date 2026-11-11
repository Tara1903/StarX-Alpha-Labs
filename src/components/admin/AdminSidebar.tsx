"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { AdminTabId, AdminUser } from "./types";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Briefcase,
  Calculator,
  FileText,
  FolderKanban,
  Tv,
  Layers,
  Globe,
  BookOpen,
  Tag,
  Settings,
  ShieldCheck,
  Activity,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Lock,
  Building,
  CheckCircle2,
  Banknote,
  Receipt,
  FileCheck2,
  CreditCard,
} from "lucide-react";

interface AdminSidebarProps {
  activeTab: AdminTabId;
  onSelectTab: (tab: AdminTabId) => void;
  currentUser: AdminUser;
  counts: {
    leads: number;
    demoRequests: number;
    agencyEnquiries: number;
    estimates: number;
    quotations: number;
    projects: number;
    demos: number;
    videos: number;
  };
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  activeTab,
  onSelectTab,
  currentUser,
  counts,
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  // Collapsible section states
  const [crmOpen, setCrmOpen] = useState(true);
  const [cmsOpen, setCmsOpen] = useState(true);
  const [productsOpen, setProductsOpen] = useState(true);
  const [commercialOpen, setCommercialOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(true);

  const isSelected = (tab: AdminTabId) => activeTab === tab;

  const handleTabClick = (tab: AdminTabId) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const navClass = (tab: AdminTabId) => `
    flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer
    ${
      isSelected(tab)
        ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-bold shadow-md shadow-[#087BFF]/30"
        : "text-slate-300 hover:text-white hover:bg-[#0E2248] border border-transparent"
    }
  `;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#05112A] border-r border-[#00D9FF]/20 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 1. Header / Logo Brand */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#030B24]/90">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" priority />
            <div>
              <div className="text-xs font-extrabold tracking-wider text-white uppercase flex items-center gap-1.5">
                <span>StarX Alpha Labs</span>
              </div>
              <span className="text-[10px] font-mono text-[#00D9FF] tracking-wider uppercase block">
                SUPER ADMIN PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* 2. User Profile Card */}
        <div className="p-3 mx-3 my-3 rounded-2xl bg-[#08183A] border border-white/10 flex items-center justify-between text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#087BFF] to-[#00D9FF] flex items-center justify-center text-xs font-bold text-white shadow-inner">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-white truncate max-w-[120px]">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                {currentUser.email}
              </div>
            </div>
          </div>
          <span
            className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
              currentUser.role === "owner"
                ? "bg-amber-400/10 text-amber-300 border-amber-400/40"
                : currentUser.role === "admin"
                ? "bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/40"
                : "bg-emerald-400/10 text-emerald-300 border-emerald-400/40"
            }`}
          >
            {currentUser.role}
          </span>
        </div>

        {/* 3. Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 text-left">
          {/* A. OVERVIEW */}
          <div>
            <button
              onClick={() => handleTabClick("overview")}
              className={navClass("overview")}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-[#00D9FF]" />
                <span>Executive Dashboard</span>
              </div>
            </button>
          </div>

          {/* B. CRM & ENQUIRIES */}
          <div className="space-y-1">
            <button
              onClick={() => setCrmOpen(!crmOpen)}
              className="flex items-center justify-between w-full px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-white"
            >
              <span>CRM &amp; Enquiries</span>
              {crmOpen ? (
                <ChevronDown className="w-3 h-3 text-slate-400" />
              ) : (
                <ChevronRight className="w-3 h-3 text-slate-400" />
              )}
            </button>

            {crmOpen && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleTabClick("crm")}
                  className={navClass("crm")}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-[#00D9FF]" />
                    <span>All Leads &amp; Enquiries</span>
                  </div>
                  {counts.leads > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#00D9FF]/20 text-[#00D9FF] font-mono text-[10px]">
                      {counts.leads}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleTabClick("demo-requests")}
                  className={navClass("demo-requests")}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#E52BFF]" />
                    <span>Personalized Demos</span>
                  </div>
                  {counts.demoRequests > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#E52BFF]/20 text-[#E52BFF] font-mono text-[10px]">
                      {counts.demoRequests}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleTabClick("agency-enquiries")}
                  className={navClass("agency-enquiries")}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span>Agency Partnerships</span>
                  </div>
                  {counts.agencyEnquiries > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-400 font-mono text-[10px]">
                      {counts.agencyEnquiries}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleTabClick("estimates")}
                  className={navClass("estimates")}
                >
                  <div className="flex items-center gap-2.5">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    <span>Calculator Estimates</span>
                  </div>
                  {counts.estimates > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-400 font-mono text-[10px]">
                      {counts.estimates}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleTabClick("quotations")}
                  className={navClass("quotations")}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#087BFF]" />
                    <span>Quotations Hub</span>
                  </div>
                  {counts.quotations > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#087BFF]/20 text-[#087BFF] font-mono text-[10px]">
                      {counts.quotations}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleTabClick("projects")}
                  className={navClass("projects")}
                >
                  <div className="flex items-center gap-2.5">
                    <FolderKanban className="w-4 h-4 text-cyan-300" />
                    <span>Client Projects</span>
                  </div>
                  {counts.projects > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-cyan-400/20 text-cyan-300 font-mono text-[10px]">
                      {counts.projects}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* C. PRODUCTS & DEMOS */}
          <div className="space-y-1">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="flex items-center justify-between w-full px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-white"
            >
              <span>Products &amp; Demos</span>
              {productsOpen ? (
                <ChevronDown className="w-3 h-3 text-slate-400" />
              ) : (
                <ChevronRight className="w-3 h-3 text-slate-400" />
              )}
            </button>

            {productsOpen && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleTabClick("demos")}
                  className={navClass("demos")}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-[#00D9FF]" />
                    <span>Demo Catalog (160+)</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300 font-mono text-[10px]">
                    {counts.demos}
                  </span>
                </button>

                <button
                  onClick={() => handleTabClick("video-station")}
                  className={navClass("video-station")}
                >
                  <div className="flex items-center gap-2.5">
                    <Tv className="w-4 h-4 text-[#E52BFF]" />
                    <span>Video Station</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300 font-mono text-[10px]">
                    {counts.videos}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* D. WEBSITE CMS */}
          <div className="space-y-1">
            <button
              onClick={() => setCmsOpen(!cmsOpen)}
              className="flex items-center justify-between w-full px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-white"
            >
              <span>Website CMS</span>
              {cmsOpen ? (
                <ChevronDown className="w-3 h-3 text-slate-400" />
              ) : (
                <ChevronRight className="w-3 h-3 text-slate-400" />
              )}
            </button>

            {cmsOpen && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleTabClick("cms-services")}
                  className={navClass("cms-services")}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Services</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("cms-divisions")}
                  className={navClass("cms-divisions")}
                >
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-blue-400" />
                    <span>Divisions</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("cms-industries")}
                  className={navClass("cms-industries")}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>Industries</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("cms-portfolio")}
                  className={navClass("cms-portfolio")}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4 text-pink-400" />
                    <span>Portfolio Projects</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("cms-blog")}
                  className={navClass("cms-blog")}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Blog Articles</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* E. COMMERCIAL & PRICING */}
          <div className="space-y-1">
            <button
              onClick={() => setCommercialOpen(!commercialOpen)}
              className="flex items-center justify-between w-full px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-white"
            >
              <span>Commercial &amp; Pricing</span>
              {commercialOpen ? (
                <ChevronDown className="w-3 h-3 text-slate-400" />
              ) : (
                <ChevronRight className="w-3 h-3 text-slate-400" />
              )}
            </button>

            {commercialOpen && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleTabClick("finance")}
                  className={navClass("finance")}
                >
                  <div className="flex items-center gap-2.5">
                    <Banknote className="w-4 h-4 text-emerald-400" />
                    <span>Finance Overview</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("quotations")}
                  className={navClass("quotations")}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#087BFF]" />
                    <span>Quotations Hub</span>
                  </div>
                  {counts.quotations > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#087BFF]/20 text-[#087BFF] font-mono text-[10px]">
                      {counts.quotations}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleTabClick("contracts")}
                  className={navClass("contracts")}
                >
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-indigo-400" />
                    <span>Contracts &amp; SLAs</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("invoices")}
                  className={navClass("invoices")}
                >
                  <div className="flex items-center gap-2.5">
                    <Receipt className="w-4 h-4 text-[#00D9FF]" />
                    <span>Invoices &amp; Ledger</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("payments")}
                  className={navClass("payments")}
                >
                  <div className="flex items-center gap-2.5">
                    <Banknote className="w-4 h-4 text-emerald-400" />
                    <span>Payments Received</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("expenses")}
                  className={navClass("expenses")}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-rose-400" />
                    <span>Expenses</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("pricing-packages")}
                  className={navClass("pricing-packages")}
                >
                  <div className="flex items-center gap-2.5">
                    <Tag className="w-4 h-4 text-[#00D9FF]" />
                    <span>Packages (W/A/C)</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* F. ADMINISTRATION */}
          <div className="space-y-1">
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="flex items-center justify-between w-full px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-white"
            >
              <span>Administration</span>
              {adminOpen ? (
                <ChevronDown className="w-3 h-3 text-slate-400" />
              ) : (
                <ChevronRight className="w-3 h-3 text-slate-400" />
              )}
            </button>

            {adminOpen && (
              <div className="space-y-0.5 pl-1">
                <button
                  onClick={() => handleTabClick("team")}
                  className={navClass("team")}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Admin Team &amp; Roles</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("settings")}
                  className={navClass("settings")}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-slate-300" />
                    <span>Business Settings</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("audit-logs")}
                  className={navClass("audit-logs")}
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-[#00D9FF]" />
                    <span>Audit Logs</span>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick("reports")}
                  className={navClass("reports")}
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-4 h-4 text-purple-400" />
                    <span>Reports &amp; Export</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. Bottom Footer: Public Links */}
        <div className="p-3 border-t border-white/10 bg-[#030B24]/90 flex items-center justify-between text-[11px] text-slate-400">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 hover:text-[#00D9FF] transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="/demos"
            target="_blank"
            className="flex items-center gap-1.5 hover:text-[#00D9FF] transition-colors"
          >
            <span>160+ Demos</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="/video-station"
            target="_blank"
            className="flex items-center gap-1.5 hover:text-[#00D9FF] transition-colors"
          >
            <span>Videos</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </aside>
    </>
  );
}
