"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { DIVISIONS_DATA, DivisionItem } from "@/data/divisions";
import { 
  Globe, 
  Smartphone, 
  Briefcase, 
  Cloud, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
} from "lucide-react";

const ICON_MAP = {
  Globe,
  Smartphone,
  Briefcase,
  Cloud,
  Sparkles,
  Cpu,
};

export function DivisionsSection() {
  return (
    <section id="divisions" className="py-24 bg-[#030B24] relative overflow-hidden">
      {/* Ambient background depth lighting */}
      <div 
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#087BFF]/10 via-[#00D9FF]/8 to-transparent blur-[160px] pointer-events-none -z-10"
      />

      <Container className="space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#071638]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
              Bespoke Engineering • 6 Practices
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our Six Core{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
              Technology Divisions
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed">
            From high-conversion web architectures and native mobile applications to bespoke business management systems,
            AI agents, and enterprise platforms—every solution is custom-built with 100% intellectual property ownership.
          </p>
        </div>

        {/* 6 Division Cards Grid (3x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DIVISIONS_DATA.map((div: DivisionItem) => {
            const Icon = ICON_MAP[div.iconName] || Globe;
            return (
              <Card3DTilt
                key={div.slug}
                glowColor={div.accentColor}
                maxTilt={8}
                className="rounded-3xl p-8 bg-[#0A1940]/90 border border-white/10 hover:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col justify-between space-y-6 group transition-all"
              >
                {/* Header & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg"
                      style={{ 
                        borderColor: `${div.accentColor}60`,
                        backgroundColor: `${div.accentColor}18`,
                        boxShadow: `0 0 25px ${div.accentColor}25`
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: div.accentColor }} />
                    </div>

                    <span 
                      className="px-3 py-1 text-[11px] font-mono font-bold rounded-full border"
                      style={{ 
                        borderColor: `${div.accentColor}40`,
                        color: div.accentColor,
                        backgroundColor: `${div.accentColor}10`
                      }}
                    >
                      {div.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors">
                      {div.name}
                    </h3>
                    <p className="text-xs text-[#00D9FF] font-mono font-medium mt-1">
                      {div.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {div.shortDescription}
                  </p>

                  {/* Top 3 Capabilities */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {div.capabilities.slice(0, 3).map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#C8D5EF]">
                        <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                        <span className="line-clamp-1 font-medium">{cap.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {div.techStack.slice(0, 4).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#071638] text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                  <Link
                    href={`/divisions/${div.slug}`}
                    className="w-full py-3 px-5 rounded-xl font-extrabold text-xs text-center flex items-center justify-center gap-2 bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    <span>Explore {div.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/design-studio?division=${div.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl font-mono text-[11px] text-center flex items-center justify-center gap-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-[#00D9FF]" />
                    <span>Scope in Design Studio &rarr;</span>
                  </Link>
                </div>
              </Card3DTilt>
            );
          })}
        </div>

        {/* Global Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            href="/divisions"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#00D9FF] hover:text-white transition-colors group"
          >
            <span>Explore All 6 Divisions With Complete Capabilities &amp; Deliverables</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
