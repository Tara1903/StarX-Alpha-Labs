"use client";

import React, { useState } from "react";
import { AdminTabId, AdminUser, AdminNotification } from "./types";
import {
  Menu,
  Search,
  Bell,
  Plus,
  LogOut,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileText,
  Users,
  Tv,
} from "lucide-react";

interface AdminHeaderProps {
  activeTab: AdminTabId;
  currentUser: AdminUser;
  onOpenMobile: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onQuickAction: (action: "lead" | "quote" | "demo" | "video") => void;
  notifications: AdminNotification[];
  onMarkNotificationRead: (id: string) => void;
  onSignOut: () => void;
}

const TAB_TITLES: Record<AdminTabId, { title: string; subtitle: string }> = {
  overview: {
    title: "Executive Operations Command",
    subtitle: "Real-time metrics, live lead feeds, and cross-division operations.",
  },
  crm: {
    title: "Unified CRM & Lead Management",
    subtitle: "Centralized inbox for contact requests, demo leads, and customer inquiries.",
  },
  "demo-requests": {
    title: "Personalized Demo Pipeline",
    subtitle: "Incoming DEMO-XXXXX requests from the interactive homepage showcase.",
  },
  "agency-enquiries": {
    title: "Agency Partnerships Portal",
    subtitle: "Incoming AGY-XXXXX white-label and agency partner applications.",
  },
  estimates: {
    title: "Project Calculator Submissions",
    subtitle: "Customer-configured website, mobile app, and combo architecture estimates.",
  },
  quotations: {
    title: "Formal Quotations Hub",
    subtitle: "Official commercial proposals with payment milestones (50/30/20) and scopes.",
  },
  projects: {
    title: "Active Client Projects",
    subtitle: "13-stage milestone execution tracking from kickoff to production handover.",
  },
  demos: {
    title: "160+ Demo Catalog Management",
    subtitle: "Interactive prototype directory across 12 verified industry verticals.",
  },
  "video-station": {
    title: "Video Station Showcase CMS",
    subtitle: "Responsive 16:9 walkthroughs, architecture breakdowns, and tech demos.",
  },
  "cms-services": {
    title: "Services Catalog CMS",
    subtitle: "Digital, Systems, AI, and Maintenance service packages.",
  },
  "cms-divisions": {
    title: "Core Divisions CMS",
    subtitle: "StarX Digital, StarX Systems, and StarX AI Solutions division pages.",
  },
  "cms-industries": {
    title: "Industry Verticals CMS",
    subtitle: "12 industry categories and targeted enterprise solutions.",
  },
  "cms-portfolio": {
    title: "Portfolio & Case Studies",
    subtitle: "Reference designs, prototypes, and verified production client deployments.",
  },
  "cms-blog": {
    title: "Engineering Blog CMS",
    subtitle: "Technical articles, architecture deep-dives, and platform announcements.",
  },
  "pricing-packages": {
    title: "Pricing & Packages Administration",
    subtitle: "Website (W1-W6), App (A1-A5), and Combo (C1-C5) tiered pricing.",
  },
  settings: {
    title: "Business Profile & System Settings",
    subtitle: "Company identity, contact channels, Indore headquarters, and ecosystem linkage.",
  },
  team: {
    title: "Admin Team & Role Permissions",
    subtitle: "Role-based access control (Owner, Admin, Editor) and member provisioning.",
  },
  "audit-logs": {
    title: "System Audit Logs",
    subtitle: "Immutable administrative action timeline and operational audit trail.",
  },
  reports: {
    title: "Operational Reports & CSV Export",
    subtitle: "Lead analytics, demo request trends, and full inventory export.",
  },
  finance: {
    title: "Financial Command & Cashflow",
    subtitle: "Centralized commercial metrics, outstanding aging, and billing intelligence.",
  },
  contracts: {
    title: "Client Contracts & MSAs",
    subtitle: "Master services agreements, project statements of work, and execution tracking.",
  },
  invoices: {
    title: "Sequential Tax Invoices",
    subtitle: "Transaction-safe INV-YYYY-XXXX generation, balance tracking, and PDF printing.",
  },
  payments: {
    title: "Manual Payment Receipts",
    subtitle: "Verification desk for direct bank transfers (NEFT/RTGS/IMPS), UPI, and cheques.",
  },
  expenses: {
    title: "Operational Expenses Ledger",
    subtitle: "Approved technology, infrastructure, domain, and operational project costs.",
  },
};

export function AdminHeader({
  activeTab,
  currentUser,
  onOpenMobile,
  searchQuery,
  onSearchChange,
  onQuickAction,
  notifications,
  onMarkNotificationRead,
  onSignOut,
}: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentMeta = TAB_TITLES[activeTab] || {
    title: "Admin Console",
    subtitle: "StarX Alpha Labs Administrative Platform",
  };

  return (
    <header className="sticky top-0 z-30 bg-[#030B24]/95 border-b border-white/10 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* 1. Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 text-left">
        <button
          onClick={onOpenMobile}
          className="p-2 rounded-xl bg-[#071638] border border-white/10 text-slate-300 hover:text-white lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              {currentMeta.title}
            </h1>
          </div>
          <p className="hidden sm:block text-xs text-slate-400 font-light truncate max-w-xl">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Center: Global Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-xs relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search leads, demos, quotes..."
          className="w-full pl-9 pr-3 py-1.5 rounded-full bg-[#071638] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D9FF] transition-colors"
        />
      </div>

      {/* 3. Right: Quick Actions, Notifications, Profile, SignOut */}
      <div className="flex items-center gap-2.5">
        {/* Quick Action Button */}
        <div className="relative">
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold shadow-md shadow-[#087BFF]/30 flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Action</span>
          </button>

          {showQuickMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#071638] border border-[#00D9FF]/30 shadow-2xl p-2 z-50 text-left space-y-1">
              <button
                onClick={() => {
                  onQuickAction("quote");
                  setShowQuickMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-[#0E2248] hover:text-white transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Create Quotation</span>
              </button>
              <button
                onClick={() => {
                  onQuickAction("demo");
                  setShowQuickMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-[#0E2248] hover:text-white transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E52BFF]" />
                <span>Add Demo Model</span>
              </button>
              <button
                onClick={() => {
                  onQuickAction("video");
                  setShowQuickMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-[#0E2248] hover:text-white transition-colors"
              >
                <Tv className="w-3.5 h-3.5 text-cyan-300" />
                <span>Add Video Showcase</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full bg-[#071638] border border-white/10 text-slate-300 hover:text-white relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E52BFF] text-white font-mono text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#071638] border border-white/10 shadow-2xl p-3 z-50 text-left space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white">Notifications</span>
                <span className="text-[10px] font-mono text-[#00D9FF]">
                  {unreadCount} new
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-1.5">
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-400">
                    No active notifications.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        n.read
                          ? "bg-transparent border-white/5 text-slate-400"
                          : "bg-[#0E2248] border-[#00D9FF]/30 text-white"
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{n.title}</span>
                        <span className="text-[9px] font-mono text-slate-400">
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
                        {n.description}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Role Pill */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071638] border border-white/10 text-xs text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00D9FF]" />
          <span className="font-mono capitalize">{currentUser.role}</span>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={onSignOut}
          className="p-2 rounded-full bg-[#071638] border border-white/10 text-slate-300 hover:text-rose-400 hover:border-rose-400/40 transition-colors cursor-pointer"
          title="Sign out of Admin Console"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
