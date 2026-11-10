"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { THEME_PRESETS, ThemeColors } from "@/data/themePresets";
import { 
  Palette, 
  Sparkles, 
  RotateCcw, 
  Check, 
  Save, 
  Eye, 
  ArrowLeft, 
  Layers, 
  Globe, 
  CheckCircle2, 
  Laptop, 
  Smartphone,
  Shield,
  Zap
} from "lucide-react";

export default function AppearanceSettingsPage() {
  const {
    activeThemeId,
    themeColors,
    isDraft,
    setPreset,
    updateColor,
    publishTheme,
    resetToDefault,
    discardDraft
  } = useTheme();

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePublish = () => {
    publishTheme();
    showToast("Theme successfully published and applied across all client screens!");
  };

  const handleReset = () => {
    if (confirm("Reset theme to official STARX FUTURISTIC BLUE master default?")) {
      resetToDefault();
      showToast("Reset to official STARX FUTURISTIC BLUE default.");
    }
  };

  const colorFields: { key: keyof ThemeColors; label: string; description: string }[] = [
    { key: "primaryBackground", label: "Primary Background", description: "Dominant page canvas backdrop" },
    { key: "secondaryBackground", label: "Secondary Background", description: "Headers, sections, and navigation" },
    { key: "cardBackground", label: "Card Background", description: "Package containers and modal surfaces" },
    { key: "primaryBlue", label: "Primary Blue", description: "Core brand identity buttons and links" },
    { key: "royalBlue", label: "Royal Blue", description: "Deep tech gradients and dark accents" },
    { key: "neonCyan", label: "Neon Cyan", description: "Active navigation, borders, and glowing highlights" },
    { key: "electricPurple", label: "Electric Purple", description: "Advanced technology division highlights" },
    { key: "neonMagenta", label: "Neon Magenta", description: "Secondary vibrant glow & mobile highlights" },
    { key: "premiumPink", label: "Premium Pink", description: "Special badges & luxury accents" },
    { key: "electricOrange", label: "Electric Orange", description: "Combo badges, savings alerts & CTAs" },
    { key: "emeraldAccent", label: "Emerald Accent", description: "Success indicators, verified badges, ticks" },
    { key: "whiteText", label: "White Text", description: "Headlines and high-contrast typography" },
    { key: "secondaryText", label: "Secondary Text", description: "Body copy, captions, and muted labels" }
  ];

  return (
    <div className="min-h-screen bg-[#030B24] text-white pt-24 pb-16">
      {/* Toast Notice */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-[#00C98B] text-[#030B24] font-bold text-xs py-3 px-5 rounded-xl shadow-2xl animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/admin" className="hover:text-[#00D9FF] flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Console
              </Link>
              <span>/</span>
              <span className="text-[#00D9FF]">Settings</span>
              <span>/</span>
              <span className="text-white">Live Appearance Studio</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Palette className="w-8 h-8 text-[#00D9FF]" />
              Live Theme Management Studio
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {isDraft && (
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Unsaved Draft
              </span>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-[#071638] hover:bg-[#0A1940] border border-white/10 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <button
              type="button"
              onClick={handlePublish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white font-extrabold text-xs shadow-lg shadow-[#087BFF]/30 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Publish Live Theme</span>
            </button>
          </div>
        </div>

        {/* Studio Grid: Left 2 Cols (Presets + Color Pickers), Right 1 Col (Live Interactive Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 11 Theme Presets Grid */}
            <div className="p-6 rounded-3xl bg-[#0A1940] border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Curated Theme Presets</h3>
                  <p className="text-xs text-[#C8D5EF]">
                    Choose from 11 verified cinematic themes designed for high-conversion enterprise platforms.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#00D9FF]">11 Presets Available</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {THEME_PRESETS.map((preset) => {
                  const isActive = activeThemeId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setPreset(preset.id);
                        showToast(`Switched to preset: ${preset.name}`);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                        isActive
                          ? "border-[#00D9FF] bg-[#071638] ring-1 ring-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.2)]"
                          : "border-white/5 bg-[#071638]/50 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate pr-1">
                          {preset.name}
                        </span>
                        {isActive && <Check className="w-3.5 h-3.5 text-[#00D9FF] shrink-0" />}
                      </div>

                      {/* Color Palette Swatches */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.primaryBackground }} />
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.primaryBlue }} />
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.neonCyan }} />
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.electricPurple }} />
                        <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.colors.electricOrange }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Palette Color Pickers (13 Colors) */}
            <div className="p-6 rounded-3xl bg-[#0A1940] border border-white/5 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Custom Palette Calibration</h3>
                <p className="text-xs text-[#C8D5EF]">
                  Fine-tune individual hex codes or RGB values in real time. Changes are instantly injected into CSS variables.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {colorFields.map((field) => {
                  const currentValue = themeColors[field.key];
                  return (
                    <div
                      key={field.key}
                      className="p-3.5 rounded-2xl bg-[#071638] border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <label className="text-xs font-bold text-white block">{field.label}</label>
                        <span className="text-[10px] text-slate-400 block">{field.description}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono uppercase text-slate-300">
                          {currentValue}
                        </span>
                        <input
                          type="color"
                          value={currentValue}
                          onChange={(e) => updateColor(field.key, e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-white/20"
                          title={`Pick color for ${field.label}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Mockup Preview Column (Right Col) */}
          <div className="space-y-6">
            <div className="sticky top-28 p-6 rounded-3xl bg-[#0A1940] border border-[#00D9FF]/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#00D9FF]" />
                  Live Component Preview
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#087BFF]/20 text-[#00D9FF] uppercase">
                  Real-time CSS
                </span>
              </div>

              {/* Mock Container Rendered with live CSS Variables */}
              <div 
                className="p-5 rounded-2xl border transition-all duration-300 space-y-4"
                style={{
                  backgroundColor: themeColors.primaryBackground,
                  borderColor: themeColors.neonCyan + "40",
                  color: themeColors.whiteText
                }}
              >
                {/* Mock Header */}
                <div 
                  className="p-3 rounded-xl border flex items-center justify-between"
                  style={{
                    backgroundColor: themeColors.secondaryBackground,
                    borderColor: themeColors.neonCyan + "30"
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: themeColors.primaryBlue, color: themeColors.whiteText }}
                    >
                      SX
                    </div>
                    <span className="text-xs font-extrabold tracking-tight">STARX ALPHA LABS</span>
                  </div>
                  <span 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: themeColors.primaryBlue + "20", color: themeColors.neonCyan }}
                  >
                    PREVIEW
                  </span>
                </div>

                {/* Mock Hero Headline */}
                <div className="space-y-1.5 pt-1">
                  <span 
                    className="text-[10px] font-mono font-bold uppercase tracking-widest block"
                    style={{ color: themeColors.neonCyan }}
                  >
                    Next-Gen Engineering
                  </span>
                  <h5 className="text-base font-extrabold leading-snug">
                    Build Smarter.{" "}
                    <span style={{ color: themeColors.neonCyan }}>Lead Tomorrow.</span>
                  </h5>
                  <p 
                    className="text-[11px] leading-relaxed"
                    style={{ color: themeColors.secondaryText }}
                  >
                    Custom high-performance web applications, mobile apps, and synchronized digital ecosystems.
                  </p>
                </div>

                {/* Mock Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    className="flex-1 py-2 rounded-lg text-xs font-bold text-center"
                    style={{
                      background: `linear-gradient(to right, ${themeColors.primaryBlue}, ${themeColors.neonCyan})`,
                      color: themeColors.whiteText
                    }}
                  >
                    Explore Demos
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-2 rounded-lg text-xs font-bold text-center border"
                    style={{
                      backgroundColor: themeColors.cardBackground,
                      borderColor: themeColors.neonCyan + "40",
                      color: themeColors.whiteText
                    }}
                  >
                    Start Project
                  </button>
                </div>

                {/* Mock Feature Card */}
                <div 
                  className="p-4 rounded-xl border space-y-2"
                  style={{
                    backgroundColor: themeColors.cardBackground,
                    borderColor: themeColors.electricPurple + "40"
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-[10px] font-mono font-bold uppercase"
                      style={{ color: themeColors.electricPurple }}
                    >
                      Division C Suite
                    </span>
                    <span 
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                      style={{ backgroundColor: themeColors.electricOrange + "20", color: themeColors.electricOrange }}
                    >
                      Save ₹15,000
                    </span>
                  </div>
                  <div className="text-sm font-bold">Business Combo C2</div>
                  <div className="flex items-center gap-1.5 text-[11px]" style={{ color: themeColors.emeraldAccent }}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Synchronized Dual-Platform Engine</span>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="text-[11px] text-slate-400 space-y-1">
                <p className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#00C98B]" />
                  <span>Updates apply to all client navigation, cards, buttons &amp; forms.</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#00C98B]" />
                  <span>Persisted in browser localStorage and database schema.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
