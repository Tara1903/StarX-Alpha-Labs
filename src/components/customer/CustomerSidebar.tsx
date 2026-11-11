"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { 
  CustomerPortalTab, 
  CustomerSessionContext 
} from "@/types/customerPortal";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Milestone, 
  CheckSquare, 
  FileText, 
  Receipt,
  MessageSquare, 
  GitPullRequest, 
  HelpCircle, 
  Building2, 
  UserCheck, 
  LogOut,
  X,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

interface CustomerSidebarProps {
  activeTab: CustomerPortalTab;
  onSelectTab: (tab: CustomerPortalTab) => void;
  session: CustomerSessionContext | null;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onSignOut: () => void;
}

export function CustomerSidebar({
  activeTab,
  onSelectTab,
  session,
  mobileOpen,
  onCloseMobile,
  onSignOut,
}: CustomerSidebarProps) {
  const navItems: { id: CustomerPortalTab; label: string; icon: any; count?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "My Projects", icon: FolderKanban, count: session?.assignedProjects.length },
    { id: "milestones", label: "Milestones & Delivery", icon: Milestone },
    { id: "tasks", label: "Tasks & Actions", icon: CheckSquare },
    { id: "documents", label: "Deliverables & Files", icon: FileText },
    { id: "finances", label: "Invoices & Quotes", icon: Receipt },
    { id: "discussions", label: "Team Discussions", icon: MessageSquare },
    { id: "change-requests", label: "Change Requests", icon: GitPullRequest },
    { id: "support", label: "Assistance & Help", icon: HelpCircle },
    { id: "organization", label: "My Organization", icon: Building2 },
    { id: "account", label: "Account & Profile", icon: UserCheck },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#040E26] border-r border-[#00D9FF]/20 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 1. Header with Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/customer" className="flex items-center gap-2">
            <BrandLogo size="sm" />
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
              Client Portal
            </span>
          </Link>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Client Organization Card */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-[#071638] border border-white/10 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Organization
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              {session?.membership.role ? session.membership.role.toUpperCase() : "CLIENT"}
            </span>
          </div>
          <div className="font-bold text-white text-sm truncate">
            {session?.organization.name || "Client Workspace"}
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {session?.user.fullName || "Authorized Member"}
          </div>
        </div>

        {/* 3. Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto text-left">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-lg shadow-[#087BFF]/25 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#00D9FF]"}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* 4. Footer & Sign Out */}
        <div className="p-4 border-t border-white/10 space-y-2 text-left">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-[#00C98B]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS Secured</span>
            </span>
            <Link href="/" target="_blank" className="hover:text-white flex items-center gap-1">
              <span>Main Site</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>

          <button
            onClick={onSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
