"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { 
  Sparkles, 
  Layers, 
  Palette, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  ShieldCheck, 
  FileText 
} from "lucide-react";

export function DesignStudioShowcaseSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Requirements",
      desc: "Select your industry, platform targets (Web, iOS, Android, POS), and business workflows.",
      icon: Layers,
      color: "#00D9FF",
    },
    {
      num: "02",
      title: "Structured Architecture Brief",
      desc: "Define role permissions, integration requirements, database constraints, and compliance.",
      icon: Sliders,
      color: "#087BFF",
    },
    {
      num: "03",
      title: "Google Stitch AI Generation",
      desc: "Generate high-fidelity UI layout concepts, design system tokens, and interactive previews.",
      icon: Sparkles,
      color: "#E52BFF",
    },
    {
      num: "04",
      title: "Collaborative Review",
      desc: "Refine specifications, request UI revisions, and adjust component architectures live.",
      icon: Palette,
      color: "#FF941F",
    },
    {
      num: "05",
      title: "Engineering Scope & Quotation",
      desc: "Obtain detailed technical specifications, sprint breakdown, fixed pricing, and formal proposal.",
      icon: FileText,
      color: "#00C98B",
    },
  ];

  return (
    <section id="design-studio" className="py-24 bg-[#030B24] relative overflow-hidden">
      {/* Ambient Radial Depth Glow */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-[#00D9FF]/12 via-[#873BFF]/12 to-[#E52BFF]/10 blur-[160px] pointer-events-none -z-10"
      />

      <Container className="space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#071638]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]">
            <Sparkles className="w-4 h-4 text-[#00D9FF]" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
              StarX Design Studio • AI-Powered Prototyping
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Design Your Next Digital Product <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
              Before Writing a Single Line of Code
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed">
            Eliminate project ambiguity. Collaborate with our solution architects and Google Stitch AI to
            generate high-fidelity design concepts, lock technical specifications, and obtain fixed-price milestone quotes.
          </p>
        </div>

        {/* 5-Step Process Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <Card3DTilt
                key={st.num}
                glowColor={st.color}
                maxTilt={8}
                className="p-6 rounded-2xl bg-[#0A1940]/90 border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-xl flex flex-col justify-between space-y-4 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-2xl font-mono font-extrabold"
                      style={{ color: st.color }}
                    >
                      {st.num}
                    </span>
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center border"
                      style={{ 
                        borderColor: `${st.color}40`,
                        backgroundColor: `${st.color}15`
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: st.color }} />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                    {st.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-[#00C98B]" />
                  <span>Verified Blueprint</span>
                </div>
              </Card3DTilt>
            );
          })}
        </div>

        {/* Master Studio Callout Showcase Banner */}
        <Card3DTilt
          glowColor="rgba(0, 217, 255, 0.85)"
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0A1940] via-[#071638] to-[#0A1940] border-2 border-[#00D9FF]/40 shadow-[0_0_50px_rgba(0,217,255,0.22)] flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Left: Device Mockup / Live Concept Preview graphic */}
          <div className="w-full lg:w-5/12 flex items-center justify-center gap-3">
            <div className="p-4 rounded-2xl bg-[#030B24] border border-[#087BFF]/50 text-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="text-3xl text-[#00D9FF]">💻</div>
              <span className="text-[10px] font-mono text-slate-300 mt-1 block font-bold">Web Platform</span>
              <span className="text-[9px] font-mono text-[#00D9FF]">Next.js 16</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#030B24] border border-[#E52BFF]/50 text-center shadow-lg transform scale-105 z-10">
              <div className="text-3xl text-[#E52BFF]">📱</div>
              <span className="text-[10px] font-mono text-slate-300 mt-1 block font-bold">Mobile App</span>
              <span className="text-[9px] font-mono text-[#E52BFF]">Flutter / iOS</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#030B24] border border-[#FF941F]/50 text-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
              <div className="text-3xl text-[#FF941F]">⚙️</div>
              <span className="text-[10px] font-mono text-slate-300 mt-1 block font-bold">POS / ERP</span>
              <span className="text-[9px] font-mono text-[#FF941F]">Supabase Cloud</span>
            </div>
          </div>

          {/* Right: Pitch & Direct Action Buttons */}
          <div className="w-full lg:w-7/12 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087BFF]/20 border border-[#087BFF]/50 text-[#00D9FF] text-xs font-mono font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Google Stitch MCP Integration Live</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Launch Your Interactive Product Session
            </h3>

            <p className="text-sm text-[#C8D5EF] leading-relaxed">
              Step into the StarX Design Studio right in your browser. Choose your technology division,
              custom-tailor your industry requirements, inspect generative prototypes, and submit your scoped brief
              for a guaranteed engineering quotation.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300 font-medium pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> 
                <span>Instant Wireframes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> 
                <span>Fixed Milestone Scopes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> 
                <span>100% IP Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> 
                <span>12 Industry Blueprints</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> 
                <span>Role-Based Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> 
                <span>Supabase SSR Stack</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/design-studio"
                className="px-8 py-3.5 rounded-full font-extrabold text-sm text-white bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF] shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:brightness-110 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch StarX Design Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/project-calculator"
                className="px-6 py-3.5 rounded-full font-bold text-xs text-slate-200 bg-[#071638] border border-white/10 hover:border-[#00D9FF]/50 transition-colors inline-flex items-center gap-2"
              >
                <span>Calculate Project Estimate &rarr;</span>
              </Link>
            </div>
          </div>
        </Card3DTilt>
      </Container>
    </section>
  );
}
