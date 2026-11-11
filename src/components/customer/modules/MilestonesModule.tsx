"use client";

import React, { useState } from "react";
import { ProjectMilestoneItem } from "@/types/customerPortal";
import { 
  Milestone, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Check, 
  ExternalLink, 
  X, 
  Calendar,
  MessageSquare
} from "lucide-react";

interface MilestonesModuleProps {
  milestones: ProjectMilestoneItem[];
  onApproveMilestone: (milestoneId: string, title: string) => void;
  onRequestChanges: (milestoneId: string, title: string) => void;
}

export function MilestonesModule({
  milestones,
  onApproveMilestone,
  onRequestChanges,
}: MilestonesModuleProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<ProjectMilestoneItem | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>COMPLETED</span>
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-[#00D9FF] border border-[#00D9FF]/40 animate-pulse">
            <Clock className="w-3 h-3 text-[#00D9FF]" />
            <span>IN PROGRESS</span>
          </span>
        );
      case "awaiting_client":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/40">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            <span>AWAITING APPROVAL</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-slate-400 border border-white/10">
            <span>UPCOMING</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">13-Stage Engineering Delivery Roadmap</h2>
          <p className="text-xs text-slate-400">Sequential milestones governed by StarX Alpha Labs quality standards</p>
        </div>
      </div>

      {/* Sequential Milestone Timeline */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-white/10">
        {milestones.map((m, idx) => {
          const isDone = m.status === "completed";
          const isCurrent = m.status === "in_progress" || m.status === "awaiting_client";

          return (
            <div
              key={m.id}
              className={`relative flex items-start gap-4 p-5 rounded-3xl transition-all ${
                isCurrent
                  ? "bg-[#071638] border-2 border-[#00D9FF] shadow-xl shadow-[#087BFF]/15"
                  : isDone
                  ? "bg-[#071638]/70 border border-emerald-500/30"
                  : "bg-[#071638]/40 border border-white/5 opacity-75"
              }`}
            >
              {/* Order Node */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center font-mono text-xs font-black shrink-0 relative z-10 ${
                  isDone
                    ? "bg-emerald-500 text-[#030B24] shadow-md shadow-emerald-500/30"
                    : isCurrent
                    ? "bg-[#00D9FF] text-[#030B24] shadow-md shadow-[#00D9FF]/40 ring-4 ring-[#087BFF]/30"
                    : "bg-[#08183A] text-slate-400 border border-white/10"
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>

              {/* Milestone Content */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      Stage {idx + 1} of {milestones.length}
                    </span>
                    <h3 className="text-sm font-bold text-white">{m.title}</h3>
                  </div>

                  <div>{getStatusBadge(m.status)}</div>
                </div>

                {m.description && (
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {m.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
                  {m.targetDeliveryDate && (
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-[#00D9FF]" />
                      <span>Target: {m.targetDeliveryDate}</span>
                    </div>
                  )}

                  {m.actualCompletionDate && (
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed: {m.actualCompletionDate}</span>
                    </div>
                  )}

                  {m.deliverableUrl && (
                    <a
                      href={m.deliverableUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#00D9FF] hover:underline flex items-center gap-1"
                    >
                      <span>Review Deliverable</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Client Action Buttons if Awaiting Client */}
                {m.status === "awaiting_client" && (
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      onClick={() => onApproveMilestone(m.id, m.title)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#030B24] text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Approve Milestone</span>
                    </button>

                    <button
                      onClick={() => onRequestChanges(m.id, m.title)}
                      className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Request Revisions</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
