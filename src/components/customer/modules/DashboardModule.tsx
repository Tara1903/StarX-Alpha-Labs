"use client";

import React from "react";
import { 
  CustomerSessionContext, 
  ProjectMilestoneItem, 
  ClientTaskItem, 
  ProjectUpdateItem,
  CustomerPortalTab
} from "@/types/customerPortal";
import { formatINR } from "@/data/developmentPackages";
import { 
  FolderKanban, 
  Milestone, 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  CheckCircle2 
} from "lucide-react";

interface DashboardModuleProps {
  session: CustomerSessionContext | null;
  milestones: ProjectMilestoneItem[];
  tasks: ClientTaskItem[];
  updates: ProjectUpdateItem[];
  onNavigateTab: (tab: CustomerPortalTab) => void;
}

export function DashboardModule({
  session,
  milestones,
  tasks,
  updates,
  onNavigateTab,
}: DashboardModuleProps) {
  const activeProjects = session?.assignedProjects || [];
  const primaryProject = activeProjects[0];

  const pendingTasks = tasks.filter((t) => t.status === "awaiting_client" || t.status === "pending");
  const completedMilestones = milestones.filter((m) => m.status === "completed");
  const upcomingMilestone = milestones.find((m) => m.status === "in_progress" || m.status === "awaiting_client") || milestones[0];

  return (
    <div className="space-y-8 text-left">
      {/* 1. Welcome & Client Status Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#071638] via-[#0B1E4A] to-[#071638] border border-[#00D9FF]/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
              <Sparkles className="w-3 h-3" />
              <span>Verified Client Workspace</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Welcome back, {session?.user.fullName || "Partner"}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl font-light">
              Your dedicated StarX Alpha Labs engineering cockpit for {session?.organization.name}. 
              Track delivery milestones, review technical deliverables, and communicate with your team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab("estimates")}
              className="px-4 py-2 rounded-xl bg-[#0A1940] hover:bg-[#0c2254] border border-[#00D9FF]/40 text-[#00D9FF] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>My Estimates ↗</span>
            </button>
            <button
              onClick={() => onNavigateTab("proposals")}
              className="px-4 py-2 rounded-xl bg-[#0A1940] hover:bg-[#0c2254] border border-purple-500/40 text-purple-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>My Proposals ↗</span>
            </button>
            <button
              onClick={() => onNavigateTab("agreements")}
              className="px-4 py-2 rounded-xl bg-[#0A1940] hover:bg-[#0c2254] border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Agreements ↗</span>
            </button>
            <button
              onClick={() => onNavigateTab("milestones")}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold shadow-lg shadow-[#087BFF]/30 hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Assigned Projects */}
        <div className="p-5 rounded-2xl bg-[#071638] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Assigned Projects</span>
            <FolderKanban className="w-4 h-4 text-[#00D9FF]" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {activeProjects.length}
          </div>
          <div className="text-[11px] text-slate-400">
            {primaryProject ? primaryProject.projectName : "Active Engagement"}
          </div>
        </div>

        {/* Card 2: Current Stage */}
        <div className="p-5 rounded-2xl bg-[#071638] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Current Delivery Stage</span>
            <Clock className="w-4 h-4 text-[#E52BFF]" />
          </div>
          <div className="text-sm font-bold text-white line-clamp-1">
            {primaryProject?.currentStage || "UI/UX & Architecture"}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            {completedMilestones.length} of {milestones.length || 13} Milestones Done
          </div>
        </div>

        {/* Card 3: Pending Action Items */}
        <div className="p-5 rounded-2xl bg-[#071638] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Client Action Items</span>
            <CheckSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {pendingTasks.length}
          </div>
          <div className="text-[11px] text-slate-400">
            {pendingTasks.length > 0 ? "Requires review or signoff" : "All clear, no pending blockers"}
          </div>
        </div>

        {/* Card 4: Security & SLA */}
        <div className="p-5 rounded-2xl bg-[#071638] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Engagement Security</span>
            <ShieldCheck className="w-4 h-4 text-[#00C98B]" />
          </div>
          <div className="text-sm font-bold text-white">
            Enterprise SLA Active
          </div>
          <div className="text-[11px] text-[#00D9FF] font-mono">
            Strict Multi-Tenant Isolation
          </div>
        </div>
      </div>

      {/* 3. Urgent Action Needed Banner (if any) */}
      {pendingTasks.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">
                Client Action Required: {pendingTasks[0].title}
              </div>
              <div className="text-[11px] text-slate-300">
                Action type: <span className="font-mono text-amber-300 uppercase">{pendingTasks[0].clientAction}</span>. Your engineering leads are awaiting this input to proceed.
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab("tasks")}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#030B24] text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            Review Action
          </button>
        </div>
      )}

      {/* 4. Two Columns: Active Project Overview & Recent Team Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Project Cockpit (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-[#00D9FF]" />
                <span>Active Project Spotlight</span>
              </h3>
              <button
                onClick={() => onNavigateTab("projects")}
                className="text-xs text-[#00D9FF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {primaryProject ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#00D9FF] font-bold">
                      {primaryProject.projectCode}
                    </span>
                    <h4 className="text-base font-extrabold text-white">
                      {primaryProject.projectName}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30 uppercase">
                    {primaryProject.division}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Delivery Completion</span>
                    <span className="text-emerald-400 font-bold">{primaryProject.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#087BFF] to-[#00D9FF] rounded-full transition-all duration-500"
                      style={{ width: `${primaryProject.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Next Milestone */}
                {upcomingMilestone && (
                  <div className="p-4 rounded-2xl bg-[#08183A] border border-white/5 space-y-1.5">
                    <div className="text-[10px] font-mono text-[#E52BFF] uppercase tracking-wider">
                      Target Milestone
                    </div>
                    <div className="text-sm font-bold text-white">
                      {upcomingMilestone.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      Target Delivery: <span className="text-slate-200 font-mono">{upcomingMilestone.targetDeliveryDate || "In Progress"}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400 font-mono">
                No active projects assigned yet. StarX Alpha Labs will link your project upon quotation agreement.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Team Announcements / Updates (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E52BFF]" />
                <span>Engineering Lead Updates</span>
              </h3>
              <button
                onClick={() => onNavigateTab("discussions")}
                className="text-xs text-[#00D9FF] hover:underline cursor-pointer"
              >
                Discuss
              </button>
            </div>

            <div className="space-y-3">
              {updates.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 font-mono">
                  No public updates published yet.
                </div>
              ) : (
                updates.slice(0, 3).map((upd) => (
                  <div key={upd.id} className="p-3.5 rounded-2xl bg-[#08183A] border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{upd.title}</span>
                      <span className="text-[9px] font-mono text-slate-400">
                        {new Date(upd.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {upd.summary}
                    </p>
                    <div className="text-[10px] font-mono text-[#00D9FF]">
                      By {upd.authorName}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
