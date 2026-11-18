"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import {
  Globe,
  Smartphone,
  Tablet,
  Monitor,
  Server,
  Cpu,
  Cloud,
  Layers,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Info,
} from "lucide-react";

interface PlatformOption {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
}

const PLATFORMS: PlatformOption[] = [
  {
    id: "web",
    name: "Web & Responsive PWA",
    badge: "Core Universal",
    tagline: "Desktop, Tablet & Mobile Browsers",
    description: "Next.js 16 high-performance responsive web platform with instant loading, SEO dominance, and offline PWA caching.",
    icon: Globe,
  },
  {
    id: "ios",
    name: "Apple iOS (iPhone & iPad)",
    badge: "Apple Ecosystem",
    tagline: "Native App Store Deployment",
    description: "Fluid Apple App Store app with Face ID, Apple Pay, push notifications, and native metal graphics acceleration.",
    icon: Smartphone,
  },
  {
    id: "android",
    name: "Google Android",
    badge: "Global Reach",
    tagline: "Google Play Store Deployment",
    description: "Modern Android application compatible with phone and tablet form factors, biometric login, and Google Play Billing.",
    icon: Tablet,
  },
  {
    id: "pos-terminal",
    name: "Hardware POS Terminal",
    badge: "In-Store & Retail",
    tagline: "Touch Displays & Peripherals",
    description: "Designed for touch-screen POS hardware, thermal receipt printers, cash drawers, and barcode scanners.",
    icon: Layers,
  },
  {
    id: "desktop",
    name: "macOS & Windows Desktop",
    badge: "Enterprise Heavy",
    tagline: "Standalone Workstation App",
    description: "High-performance Tauri or Electron desktop distribution with native file system access and offline processing.",
    icon: Monitor,
  },
  {
    id: "backend-api",
    name: "Cloud Backend & API",
    badge: "Infrastructure",
    tagline: "Headless Services & Webhooks",
    description: "Scalable PostgreSQL, GraphQL / REST microservices, automated background workers, and secure API gateways.",
    icon: Server,
  },
  {
    id: "ai-systems",
    name: "AI Inference & Pipelines",
    badge: "Intelligence",
    tagline: "Autonomous Agent Runtimes",
    description: "Dedicated GPU clusters, vector embeddings, streaming WebSocket voice, and LLM inference endpoints.",
    icon: Cpu,
  },
  {
    id: "cloud-edge",
    name: "Global Edge & Multi-Cloud",
    badge: "Enterprise Cloud",
    tagline: "Multi-Region Distributed",
    description: "Distributed edge workers with sub-10ms global latency, DDoS protection, and sovereign data residency.",
    icon: Cloud,
  },
];

export function Step6Platform() {
  const { state, setPlatforms, nextStep } = useDesignStudio();
  const selectedPlatforms = state.platforms || ["web"];
  const [showHelper, setShowHelper] = useState(false);

  const togglePlatform = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length === 1) return; // Keep at least one platform
      setPlatforms(selectedPlatforms.filter((p) => p !== id));
    } else {
      setPlatforms([...selectedPlatforms, id]);
    }
  };

  const applyRecommendedPlatforms = () => {
    switch (state.primaryDivision) {
      case "starx-apps":
        setPlatforms(["ios", "android", "backend-api"]);
        break;
      case "starx-business":
        setPlatforms(["pos-terminal", "web", "backend-api"]);
        break;
      case "starx-saas":
        setPlatforms(["web", "backend-api", "cloud-edge"]);
        break;
      case "starx-ai":
        setPlatforms(["web", "ai-systems", "backend-api"]);
        break;
      case "starx-custom":
        setPlatforms(["web", "desktop", "backend-api", "cloud-edge"]);
        break;
      default:
        setPlatforms(["web", "backend-api"]);
        break;
    }
    setShowHelper(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 2 • Step 6 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Where Should Your Solution Work?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Choose all target platforms. Google Stitch will automatically tailor preview viewports (Desktop, Mobile, Tablet) and design guidelines for each.
        </p>

        {/* Smart recommendation banner */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Not sure? Click for recommended platforms for {state.primaryDivision.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Helper Drawer */}
      {showHelper && (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 space-y-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-zinc-300">
              <p className="font-bold text-white">
                Platform Architecture Recommendation
              </p>
              <p>
                Based on your primary division (<strong className="text-cyan-300">{state.primaryDivision}</strong>) and solution (<strong className="text-cyan-300">{state.solutionCategory}</strong>), our engineering system recommends selecting the corresponding primary client interfaces and backend microservices.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={applyRecommendedPlatforms}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors"
            >
              Apply Recommended Platforms
            </button>
          </div>
        </div>
      )}

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORMS.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          const Icon = platform.icon;

          return (
            <div
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className={`group relative rounded-xl p-5 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                isSelected
                  ? "bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent border-cyan-400 shadow-[0_0_20px_rgba(0,217,255,0.2)] ring-1 ring-cyan-400"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                        : "bg-white/5 text-zinc-400 border border-white/10 group-hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                    {platform.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-[11px] font-medium text-cyan-400/80 mt-0.5">
                    {platform.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    {platform.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-300">
                  {isSelected ? "Active Platform" : "Add Target"}
                </span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                    isSelected
                      ? "bg-cyan-400 text-black font-bold"
                      : "border border-zinc-600 group-hover:border-zinc-400"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Selected Platforms:{" "}
            <strong className="text-white">
              {selectedPlatforms.map((p) => PLATFORMS.find((o) => o.id === p)?.name || p).join(", ")}
            </strong>
          </span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          disabled={selectedPlatforms.length === 0}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          <span>Continue to Tell Us Your Idea</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
