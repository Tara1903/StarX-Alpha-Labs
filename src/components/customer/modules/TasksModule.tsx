"use client";

import React, { useState } from "react";
import { ClientTaskItem } from "@/types/customerPortal";
import { 
  CheckSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  MessageSquare, 
  ThumbsUp, 
  Calendar 
} from "lucide-react";

interface TasksModuleProps {
  tasks: ClientTaskItem[];
  onCompleteTaskAction: (taskId: string, actionType: string) => void;
}

export function TasksModule({
  tasks,
  onCompleteTaskAction,
}: TasksModuleProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status !== "completed";
    if (filter === "completed") return t.status === "completed";
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Client Action Items &amp; Tasks ({tasks.length})</h2>
          <p className="text-xs text-slate-400">Items requiring client review, asset upload, or feedback signoff</p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#08183A] border border-white/10 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-xl font-medium transition-colors cursor-pointer ${
              filter === "all" ? "bg-[#087BFF] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded-xl font-medium transition-colors cursor-pointer ${
              filter === "pending" ? "bg-[#087BFF] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded-xl font-medium transition-colors cursor-pointer ${
              filter === "completed" ? "bg-[#087BFF] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#071638] border border-white/10 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Action Items Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">
              You are all caught up! When our engineering team requires design review, content assets, or approval signoffs, they will appear here.
            </p>
          </div>
        ) : (
          filteredTasks.map((t) => {
            const isCompleted = t.status === "completed";

            return (
              <div
                key={t.id}
                className={`p-5 rounded-2xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCompleted
                    ? "bg-[#071638]/50 border-white/5 opacity-70"
                    : "bg-[#071638] border-white/10 hover:border-[#00D9FF]/30"
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                        t.clientAction === "approve"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                          : t.clientAction === "upload_files"
                          ? "bg-purple-500/10 text-purple-300 border border-purple-500/30"
                          : "bg-blue-500/10 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {t.clientAction.replace("_", " ")}
                    </span>

                    {t.dueDate && (
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Due: {t.dueDate}</span>
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm font-bold ${isCompleted ? "line-through text-slate-400" : "text-white"}`}>
                    {t.title}
                  </h3>

                  {t.description && (
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {t.description}
                    </p>
                  )}
                </div>

                {/* Action button */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => onCompleteTaskAction(t.id, t.clientAction)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {t.clientAction === "approve" && <ThumbsUp className="w-3.5 h-3.5" />}
                      {t.clientAction === "upload_files" && <Upload className="w-3.5 h-3.5" />}
                      {t.clientAction === "submit_feedback" && <MessageSquare className="w-3.5 h-3.5" />}
                      <span>Take Action</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
