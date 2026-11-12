"use client";

import React from "react";
import { DemoModel } from "@/types/demo";
import { X, Play, ShieldAlert, Sparkles, ExternalLink } from "lucide-react";

interface VideoModalProps {
  demo: DemoModel | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ demo, isOpen, onClose }: VideoModalProps) {
  if (!isOpen || !demo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#091527] border border-[#1E4373] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#143054] flex items-center justify-between bg-gradient-to-r from-[#0C1E38] to-[#091527]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <Play className="w-4 h-4 fill-current" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Walkthrough Video: {demo.name}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Duration: {demo.videoDuration} &bull; Architecture Deep Dive
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#132B4C] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video w-full bg-[#030811] flex flex-col items-center justify-center p-6 text-center">
          {/* Faux Interactive Screen Visualizer */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#102D50]/40 via-[#07111F]/80 to-[#030811] opacity-90" />
          
          <div className="relative z-10 space-y-4 max-w-lg">
            <div className="w-16 h-16 rounded-full bg-[#1769AA]/30 border-2 border-[#32A9E8] flex items-center justify-center mx-auto text-[#73D8FF] shadow-[0_0_30px_rgba(50,169,232,0.4)] animate-pulse">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                {demo.name} System Walkthrough
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Demonstrating role permissions (Admin, Staff, Customer), real-time order/dispatch workflows, multi-tenant database synchronization, and analytics dashboards.
              </p>
            </div>

            {demo.availabilityStatus === "Live Demo" && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={`/demos/${demo.categorySlug}/${demo.slug}/live`}
                  className="px-5 py-2 rounded-xl bg-[#1769AA] text-white text-xs font-semibold hover:bg-[#1E7ECA] flex items-center gap-1.5 shadow-md shadow-[#1769AA]/40"
                >
                  <span>Launch Interactive Sandbox Instead</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-[#132B4C] pt-2">
            <span>Video ID: SX-DEMO-{demo.id.toString().padStart(3, "0")}</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              HD 1080p 60FPS Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
