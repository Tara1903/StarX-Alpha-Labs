"use client";

import React, { useState, useRef } from "react";
import { useDesignStudio } from "../context/DesignStudioContext";
import {
  Monitor,
  Tablet,
  Smartphone,
  Download,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Edit3,
  ExternalLink,
  Layers,
  ChevronDown,
  Loader2,
  X,
  Send,
} from "lucide-react";
import { BuildWithStarXModal } from "./BuildWithStarXModal";
import { EnquirySuccessView } from "./EnquirySuccessView";

type ViewportMode = "desktop" | "tablet" | "mobile";

export function DemoWorkspace() {
  const { state, approveDesignVersion } = useDesignStudio();
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);
  const [revisionPrompt, setRevisionPrompt] = useState("");
  const [isRevising, setIsRevising] = useState(false);
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);

  const activeArtifact = state.activeArtifact;
  const currentVersion = activeArtifact?.versionNumber || 1;
  const isApproved = state.isApproved && state.approvedVersion === currentVersion;

  if (state.enquirySubmitted) {
    return <EnquirySuccessView />;
  }

  const handleApprove = () => {
    approveDesignVersion(currentVersion);
  };

  const handleDownload = () => {
    if (!activeArtifact?.htmlCode) return;
    const blob = new Blob([activeArtifact.htmlCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.preferences.productName || "StarX-Demo"}-v${currentVersion}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRequestRevision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionPrompt.trim()) return;

    setIsRevising(true);
    try {
      const res = await fetch("/api/design-studio/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: state.projectId || `dsp_${Date.now()}`,
          isRevision: true,
          previousVersion: currentVersion,
          revisionInstructions: revisionPrompt.trim(),
          modelId: "GEMINI_3_8_FLASH",
        }),
      });

      const data = await res.json();
      if (data.success && data.artifact) {
        // Updated state will reflect next version
        setIsRevisionOpen(false);
        setRevisionPrompt("");
      }
    } catch (err) {
      console.error("Revision error:", err);
    } finally {
      setIsRevising(false);
    }
  };

  // Viewport width styling
  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-[390px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full max-w-6xl";
    }
  };

  return (
    <div className="min-h-screen pb-16 space-y-6 animate-in fade-in duration-300">
      {/* Workspace Header Toolbar */}
      <div className="sticky top-0 z-30 bg-[#030B24]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Product Meta */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(0,217,255,0.4)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">
                {state.preferences.productName || state.preferences.brandName || "StarX Solution Demo"}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                v{currentVersion}.0
              </span>
              {isApproved && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Approved
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              {state.divisionSlug.toUpperCase()} • {state.industrySlug.toUpperCase()} • {state.selectedPlanId}
            </p>
          </div>
        </div>

        {/* Center: Device Viewport Controls */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewport === "desktop"
                ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,217,255,0.4)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewport === "tablet"
                ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,217,255,0.4)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewport === "mobile"
                ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,217,255,0.4)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRevisionOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Request Changes</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Download HTML</span>
          </button>

          {!isApproved ? (
            <button
              type="button"
              onClick={handleApprove}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Approve Design (v{currentVersion})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsBuildModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-xs shadow-[0_0_25px_rgba(0,217,255,0.4)] transition-all cursor-pointer animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Build This With StarX</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Canvas Frame */}
      <div className="flex justify-center px-4">
        <div
          className={`transition-all duration-300 rounded-2xl border border-white/15 bg-black/80 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden ${getViewportWidth()}`}
        >
          {/* Simulated Browser Chrome */}
          <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex-1 max-w-sm mx-4 px-3 py-1 rounded-lg bg-black/50 border border-white/5 text-[11px] text-zinc-400 font-mono text-center truncate">
              https://demo.starxflow.com/{state.industrySlug}/{state.solutionSlug}
            </div>

            <div className="text-[10px] font-mono text-cyan-400/80">
              {viewport.toUpperCase()}
            </div>
          </div>

          {/* Iframe Viewport Rendering Google Stitch HTML */}
          <div className="relative bg-slate-950 min-h-[640px] h-[75vh]">
            {activeArtifact?.htmlCode ? (
              <iframe
                title="Google Stitch Interactive Preview"
                srcDoc={activeArtifact.htmlCode}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-3">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                <p className="text-xs text-zinc-400">Loading interactive Google Stitch artifact...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Revision Drawer / Modal */}
      {isRevisionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#030B24] border border-cyan-500/40 p-6 shadow-[0_0_50px_rgba(0,217,255,0.2)] space-y-4">
            <button
              type="button"
              onClick={() => setIsRevisionOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyan-400" />
                Request Design Changes (v{currentVersion + 1})
              </h3>
              <p className="text-xs text-zinc-400">
                Specify what changes you want Google Stitch to make to this screen.
              </p>
            </div>

            <form onSubmit={handleRequestRevision} className="space-y-4">
              <textarea
                rows={4}
                value={revisionPrompt}
                onChange={(e) => setRevisionPrompt(e.target.value)}
                placeholder="e.g. Add a VIP Sovereign Reserve quadrant with gold borders, and make the navigation bar sticky."
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-400"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRevisionOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!revisionPrompt.trim() || isRevising}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs disabled:opacity-50"
                >
                  {isRevising ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Editing Screen...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Generate Revision v{currentVersion + 1}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Build With StarX Modal */}
      <BuildWithStarXModal
        isOpen={isBuildModalOpen}
        onClose={() => setIsBuildModalOpen(false)}
        onSuccess={() => {
          setIsBuildModalOpen(false);
        }}
      />
    </div>
  );
}
