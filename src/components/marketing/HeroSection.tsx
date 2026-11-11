"use client";

import * as React from "react";
import Link from "next/link";
import { LinkButton } from "@/components/ui/LinkButton";
import { HeroDeviceStage } from "@/components/3d/HeroDeviceStage";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Grid, 
  Building2, 
  Sliders, 
  Clock 
} from "lucide-react";

export function HeroSection() {
  const stats = [
    { label: "Demo Models", val: "160+", icon: "🥞", color: "text-[#00D9FF]" },
    { label: "Solution Modules", val: "50+", icon: "▦", color: "text-[#00D9FF]" },
    { label: "Industry Categories", val: "12", icon: "🏢", color: "text-[#873BFF]" },
    { label: "Customizable", val: "100%", icon: "⚙️", color: "text-[#E52BFF]" },
    { label: "Deployment", val: "1–4 Wks", icon: "⚡", color: "text-[#FF941F]" }
  ];

  return (
    <section className="relative min-h-[920px] lg:min-h-screen pt-36 sm:pt-40 lg:pt-44 pb-20 overflow-hidden flex flex-col justify-start bg-[#030B24]">
      {/* 1. Continuous Cinematic Atmosphere Lighting (Spans Entire Hero Section) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Top-Right Cyan Planetary Glow */}
        <div className="absolute top-6 right-1/4 w-[800px] h-[600px] rounded-full bg-gradient-to-b from-[#00D9FF]/18 via-[#087BFF]/12 to-transparent blur-[140px]" />
        {/* Left Electric Blue & Purple Glow behind headline */}
        <div className="absolute top-1/4 -left-10 w-[700px] h-[550px] rounded-full bg-gradient-to-r from-[#087BFF]/22 via-[#873BFF]/15 to-transparent blur-[160px]" />
        {/* Center Spatial Bridging Glow */}
        <div className="absolute top-1/3 left-1/3 w-[650px] h-[500px] rounded-full bg-[#E52BFF]/10 blur-[150px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main Hero Row: Left Text + Right 3D Hardware Rig in One Shared Environment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[560px]">
          
          {/* Left Column: Headline, Copy, Dual Buttons, Highlights */}
          <div className="lg:col-span-5 space-y-6 text-left relative z-20">
            {/* Crown Capability Badge (Fully visible with 36px+ navbar clearance) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/45 bg-[#071638]/90 backdrop-blur-md shadow-[0_0_25px_rgba(0,217,255,0.25)]">
              <span className="text-amber-400 text-sm">👑</span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-200 uppercase">
                IT | AI | Software | Web | Mobile | Cloud | Enterprise
              </span>
            </div>

            {/* Master Headline matching approved graphic */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Next-Gen Digital Solutions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
                for Every Business
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed max-w-xl font-normal">
              We Design, Develop &amp; Deploy Powerful Websites, Mobile Apps &amp; Complete Digital Solutions
              that Help Businesses Grow, Automate and Scale Globally.
            </p>

            {/* Dual Action Buttons matching graphic */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/demos"
                className="px-8 py-3.5 rounded-full font-extrabold text-sm text-white bg-gradient-to-r from-[#FF941F] via-[#FF35B8] to-[#E52BFF] shadow-[0_0_30px_rgba(255,148,31,0.45)] hover:brightness-110 transition-all flex items-center gap-2"
              >
                <span>Explore 160+ Demos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/project-calculator"
                className="px-7 py-3.5 rounded-full font-bold text-sm text-white bg-[#071638]/90 border border-[#00D9FF]/50 hover:border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.2)] hover:bg-[#0A1940] transition-all flex items-center gap-2"
              >
                <span>🚀 Start a Project</span>
              </Link>
            </div>

            {/* Supporting Highlights matching graphic */}
            <div className="flex items-center gap-5 text-xs font-mono text-slate-300 pt-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-[#00C98B]">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
                <span className="text-white font-medium">Custom Development</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#00C98B]">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
                <span className="text-white font-medium">Fast Deployment</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#00C98B]">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" />
                <span className="text-white font-medium">Secure &amp; Scalable</span>
              </span>
            </div>
          </div>

          {/* Right Column: Seamless 3D Stage (Zero box border, sharing single background) */}
          <div className="lg:col-span-7 relative">
            <HeroDeviceStage />
          </div>

        </div>

        {/* Horizontal Statistics Bar (Matching Graphic) */}
        <div className="p-6 rounded-3xl bg-[#0A1940]/90 border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl relative z-20">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={`flex items-center gap-3 justify-center sm:justify-start ${
                  idx === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className={`w-11 h-11 rounded-2xl bg-[#071638] border border-white/10 flex items-center justify-center text-xl shadow-inner ${s.color}`}>
                  {s.icon}
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-white">
                    {s.val}
                  </div>
                  <div className="text-xs text-[#C8D5EF] font-medium">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
