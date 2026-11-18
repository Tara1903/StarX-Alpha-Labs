"use client";

import React, { useState } from "react";
import { useDesignStudio } from "../../context/DesignStudioContext";
import { DesignPreferences } from "../../types";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Palette,
  Type,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
} from "lucide-react";

interface StyleOption {
  id: "minimal" | "premium" | "modern" | "corporate" | "bold" | "futuristic";
  name: string;
  tagline: string;
  previewBg: string;
  previewBorder: string;
  accent: string;
}

const STYLES: StyleOption[] = [
  {
    id: "futuristic",
    name: "Cosmic Futuristic",
    tagline: "Electric cyan glows, dark cosmic obsidian, and cyber grid accents",
    previewBg: "from-cyan-950/40 via-blue-950/20 to-black",
    previewBorder: "border-cyan-500/40",
    accent: "bg-cyan-400 text-black",
  },
  {
    id: "premium",
    name: "Obsidian Luxury",
    tagline: "Rich velvet blacks, warm amber/champagne accents, and subtle glass",
    previewBg: "from-amber-950/30 via-zinc-950/50 to-black",
    previewBorder: "border-amber-500/30",
    accent: "bg-amber-400 text-black",
  },
  {
    id: "modern",
    name: "Fluid Neo-SaaS",
    tagline: "Smooth gradients, rounded glassy capsules, and modern contrast",
    previewBg: "from-blue-950/40 via-indigo-950/20 to-black",
    previewBorder: "border-blue-500/40",
    accent: "bg-blue-500 text-white",
  },
  {
    id: "minimal",
    name: "Crisp Minimalist",
    tagline: "Maximum negative space, razor-sharp typography, and pure utility",
    previewBg: "from-zinc-900/40 via-black to-black",
    previewBorder: "border-white/20",
    accent: "bg-white text-black",
  },
  {
    id: "corporate",
    name: "Enterprise Governance",
    tagline: "Authoritative slate blues, clear hierarchy, and trustworthy layouts",
    previewBg: "from-slate-900/50 via-zinc-900 to-black",
    previewBorder: "border-slate-500/40",
    accent: "bg-slate-300 text-black",
  },
  {
    id: "bold",
    name: "High-Energy Bold",
    tagline: "High-contrast neon pink and violet accents with punchy typography",
    previewBg: "from-pink-950/40 via-purple-950/20 to-black",
    previewBorder: "border-pink-500/40",
    accent: "bg-pink-400 text-black",
  },
];

const PALETTES = [
  { id: "cosmic", name: "StarX Cosmic (Cyan & Navy)", primary: "#00D9FF", secondary: "#087BFF", accent: "#E52BFF" },
  { id: "emerald", name: "Emerald Mint & Forest", primary: "#10B981", secondary: "#059669", accent: "#34D399" },
  { id: "amber", name: "Imperial Gold & Slate", primary: "#FF941F", secondary: "#F59E0B", accent: "#FBBF24" },
  { id: "royal", name: "Royal Violet & Indigo", primary: "#A855F7", secondary: "#6366F1", accent: "#EC4899" },
];

export function Step15Personalise() {
  const { state, setDesignPreferences, nextStep } = useDesignStudio();
  const prefs = state.designPreferences;

  const [productName, setProductName] = useState(prefs.productName || "");
  const [brandName, setBrandName] = useState(prefs.brandName || state.profile.companyName || "");
  const [selectedStyle, setSelectedStyle] = useState<StyleOption["id"]>(
    (prefs.visualStyle as any) || "futuristic"
  );
  const [selectedPalette, setSelectedPalette] = useState(prefs.primaryColor || "#00D9FF");
  const [typography, setTypography] = useState(prefs.typography || "Inter / Modern Sans");
  const [themeMode, setThemeMode] = useState<"dark" | "light" | "system">(prefs.theme || "dark");

  const handleUpdate = () => {
    const updated: DesignPreferences = {
      productName: productName.trim() || "StarX Product Demo",
      brandName: brandName.trim() || "StarX Client",
      primaryColor: selectedPalette,
      secondaryColor: "#087BFF",
      accentColor: "#E52BFF",
      typography,
      designStyle: selectedStyle,
      visualStyle: selectedStyle,
      appearance: themeMode,
      theme: themeMode,
      brandPersonality: "High-trust, futuristic, cinematic and ultra-fluid enterprise software",
    };
    setDesignPreferences(updated);
    nextStep();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Chapter 4 • Step 15 of 16
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          Let's Give Your Idea an Identity.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          Personalize branding, visual tokens, and color harmony. Google Stitch will apply these exact tokens when rendering your demo screens.
        </p>
      </div>

      <div className="space-y-6">
        {/* Product Identity Inputs */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-400" />
            Product & Brand Nomenclature
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Product / Application Name:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Aura Flow, Horizon Health, Apex POS"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Company or Brand Name:</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Apex Global Technologies"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Visual Style Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Visual Design Direction & Atmosphere
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {STYLES.map((style) => {
              const isSelected = selectedStyle === style.id;

              return (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`group relative rounded-xl p-4 transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? `bg-gradient-to-b ${style.previewBg} ${style.previewBorder} shadow-[0_0_20px_rgba(0,217,255,0.2)] ring-1 ring-cyan-400`
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {style.name}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${style.accent}`}>
                        Preview
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-snug">
                      {style.tagline}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-300">
                      {isSelected ? "Active Style" : "Choose Style"}
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
        </div>

        {/* Color Palette & Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Palette Presets */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              Harmonized Color System
            </h4>
            <div className="space-y-2">
              {PALETTES.map((pal) => {
                const isSelected = selectedPalette === pal.primary;
                return (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setSelectedPalette(pal.primary)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? "bg-white/[0.05] border-cyan-400 text-white"
                        : "bg-white/[0.01] border-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.primary }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.secondary }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.accent }} />
                      </div>
                      <span className="font-medium">{pal.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography & Theme Mode */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Type className="w-4 h-4 text-cyan-400" />
                Typography System
              </h4>
              <select
                value={typography}
                onChange={(e) => setTypography(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="Inter / Modern Sans">Inter & Geist (Modern Sans-Serif)</option>
                <option value="JetBrains Mono + Space Grotesk">JetBrains Mono & Space Grotesk (Tech & Developer)</option>
                <option value="Instrument Serif + Inter">Instrument Serif & Inter (Editorial Luxury)</option>
              </select>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <Moon className="w-4 h-4 text-cyan-400" />
                Default Display Mode
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {(["dark", "light", "system"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setThemeMode(m)}
                    className={`py-2 text-xs font-semibold rounded-lg border capitalize transition-all ${
                      themeMode === m
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-400"
                        : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Brand tokens compiled for Google Stitch HTML rendering.</span>
        </div>

        <button
          type="button"
          onClick={handleUpdate}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
        >
          <span>Continue to Final Blueprint & Demo Generation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
