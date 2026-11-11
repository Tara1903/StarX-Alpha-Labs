"use client";

import React, { useState } from "react";
import { CustomerSessionContext } from "@/types/customerPortal";
import { formatINR } from "@/data/developmentPackages";
import { 
  FolderKanban, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  X,
  FileText
} from "lucide-react";

interface ProjectsModuleProps {
  session: CustomerSessionContext | null;
  onSelectProject: (projectId: string) => void;
}

export function ProjectsModule({
  session,
  onSelectProject,
}: ProjectsModuleProps) {
  const projects = session?.assignedProjects || [];
  const [detailProject, setDetailProject] = useState<any | null>(null);

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Assigned Organization Projects ({projects.length})</h2>
          <p className="text-xs text-slate-400">Production software developments governed under StarX Alpha Labs SLA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-2 p-12 rounded-3xl bg-[#071638] border border-white/10 text-center space-y-2">
            <FolderKanban className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Projects Linked Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto font-light">
              Your organization has been provisioned. Once a formal development quotation is finalized, your engineering project will automatically appear here.
            </p>
          </div>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-5 flex flex-col justify-between hover:border-[#00D9FF]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#00D9FF]">
                    {p.projectCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/30 uppercase">
                    {p.division}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white">
                  {p.projectName}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-[#E52BFF]" />
                  <span>Current Stage: <strong className="text-white">{p.currentStage}</strong></span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-emerald-400 font-bold">{p.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#087BFF] to-[#00D9FF] rounded-full"
                      style={{ width: `${p.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setDetailProject(p)}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#00D9FF]" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onSelectProject(p.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Detail Modal */}
      {detailProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#071638] border border-[#00D9FF]/40 rounded-3xl w-full max-w-2xl p-6 space-y-5 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#00D9FF] font-bold">
                  {detailProject.projectCode}
                </span>
                <h3 className="text-lg font-bold text-white">{detailProject.projectName}</h3>
              </div>
              <button
                onClick={() => setDetailProject(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#08183A] space-y-1">
                <div className="text-slate-400 font-mono">Division</div>
                <div className="font-bold text-white uppercase">{detailProject.division}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#08183A] space-y-1">
                <div className="text-slate-400 font-mono">Status</div>
                <div className="font-bold text-emerald-400">{detailProject.status}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#08183A] space-y-1">
                <div className="text-slate-400 font-mono">Current Stage</div>
                <div className="font-bold text-white">{detailProject.currentStage}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#08183A] space-y-1">
                <div className="text-slate-400 font-mono">Completion Rate</div>
                <div className="font-bold text-[#00D9FF] font-mono">{detailProject.progressPercent}%</div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setDetailProject(null)}
                className="px-5 py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
