"use client";

import React, { useState } from "react";
import { 
  CustomerPortalTab, 
  CustomerSessionContext, 
  ClientNotificationItem 
} from "@/types/customerPortal";
import { 
  Menu, 
  Bell, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  Building2, 
  User, 
  Sparkles 
} from "lucide-react";

interface CustomerHeaderProps {
  activeTab: CustomerPortalTab;
  session: CustomerSessionContext | null;
  notifications: ClientNotificationItem[];
  onOpenMobile: () => void;
  onMarkNotificationRead: (id?: string) => void;
}

export function CustomerHeader({
  activeTab,
  session,
  notifications,
  onOpenMobile,
  onMarkNotificationRead,
}: CustomerHeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const tabTitles: Record<CustomerPortalTab, { title: string; subtitle: string }> = {
    dashboard: { title: "Executive Client Dashboard", subtitle: "Real-time delivery progress, active sprints, and upcoming deliverables." },
    estimates: { title: "My Estimates", subtitle: "Review immutable project estimate snapshots generated via the StarX Alpha Labs Interactive Calculator." },
    proposals: { title: "My Proposals", subtitle: "Review technical specifications, milestone deliverables, architecture contracts, and formal payment schedules." },
    agreements: { title: "My Agreements", subtitle: "Executed master service agreements, statements of work, and verifiable electronic signature audit trails." },
    projects: { title: "Assigned Projects", subtitle: "Technical specifications, stage tracking, and architecture repositories." },
    milestones: { title: "Milestones & 13-Stage Delivery", subtitle: "Sequential delivery roadmap, milestone criteria, and sprint completion dates." },
    tasks: { title: "Action Items & Approvals", subtitle: "Pending client decisions, design signoffs, and feedback requests." },
    documents: { title: "Deliverables & Documents", subtitle: "Secure repository for wireframes, architecture specs, code builds, and assets." },
    finances: { title: "Invoices, Quotations & Bank Details", subtitle: "Access tax invoices, accept formal proposals, and view bank transfer instructions." },
    discussions: { title: "Project Discussions", subtitle: "Direct channel with your assigned StarX Alpha Labs engineering team." },
    "change-requests": { title: "Scope Change Requests", subtitle: "Submit and review formal scope adjustments, additions, and revisions." },
    support: { title: "Assistance & Help Desk", subtitle: "Submit technical inquiries, report blockers, or request engineering assistance." },
    warranty: { title: "Warranty & Maintenance SLA", subtitle: "Track your 30-Day Post-Launch Hypercare Warranty scope and explore continuous maintenance SLA tiers." },
    organization: { title: "Organization & Members", subtitle: "Authorized corporate identity, contacts, and invited team members." },
    account: { title: "Account & Security", subtitle: "Manage your authenticated credentials, preferences, and security." },
  };

  const currentMeta = tabTitles[activeTab] || { title: "Client Workspace", subtitle: "StarX Alpha Labs Client Portal" };

  return (
    <header className="sticky top-0 z-30 bg-[#040E26]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">
      {/* 1. Left: Mobile menu button & Title */}
      <div className="flex items-center gap-3 text-left">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {currentMeta.title}
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#087BFF]/10 text-[#00D9FF] border border-[#00D9FF]/30">
              {session?.organization.name || "Client Portal"}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden md:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Right: Notifications Bell & User Pill */}
      <div className="flex items-center gap-3">
        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-xl bg-[#071638] border border-white/10 text-slate-300 hover:text-white hover:border-[#00D9FF]/40 relative transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#FF35B8] to-[#E52BFF] text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#071638] border border-white/10 shadow-2xl p-3 z-50 text-left space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white">Notifications ({unreadCount})</span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      onMarkNotificationRead();
                      setNotifOpen(false);
                    }}
                    className="text-[10px] font-mono text-[#00D9FF] hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto space-y-1.5 divide-y divide-white/5">
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-400 font-mono">
                    No new notifications.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`pt-1.5 pb-1 px-1.5 rounded-lg text-xs ${
                        n.read ? "opacity-60" : "bg-[#08183A]"
                      }`}
                    >
                      <div className="font-semibold text-white text-xs">{n.title}</div>
                      <div className="text-[11px] text-slate-300">{n.message}</div>
                      <div className="text-[9px] font-mono text-slate-400 pt-0.5">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Identity Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10 text-left">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#087BFF] to-[#00D9FF] text-[#030B24] font-black text-xs flex items-center justify-center shadow-md">
            {session?.user.fullName ? session.user.fullName[0].toUpperCase() : "C"}
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-white leading-tight">
              {session?.user.fullName || "Client User"}
            </div>
            <div className="text-[10px] font-mono text-[#00D9FF]">
              {session?.membership.role ? `Role: ${session.membership.role.toUpperCase()}` : "Client"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
