"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { INDUSTRIES_DATA, IndustryItem } from "@/data/industries";
import { ArrowRight, Sparkles } from "lucide-react";

export function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-[#071638] border-y border-white/5 relative overflow-hidden">
      {/* Subtle depth lighting */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-[#00D9FF]/8 via-[#873BFF]/8 to-transparent blur-[160px] pointer-events-none -z-10"
      />

      <Container className="space-y-14">
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#0A1940]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
              12 Specialized Sector Blueprints
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Tailored Solutions Across{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
              12 Major Industries
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed">
            Every vertical presents distinct compliance, transactional, and architectural demands.
            Explore how StarX Alpha Labs delivers domain-specialized technology platforms.
          </p>
        </div>

        {/* 12 Industry Cards (2 rows of 6 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INDUSTRIES_DATA.map((ind: IndustryItem, idx: number) => {
            return (
              <Link 
                key={ind.slug} 
                href={`/industries/${ind.slug}`} 
                className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/50 rounded-2xl group"
              >
                <Card3DTilt
                  glowColor={ind.accentColor || "#00D9FF"}
                  maxTilt={10}
                  className="p-5 rounded-2xl bg-[#0A1940] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4 h-full shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-2xl">{ind.emoji}</span>
                    <span 
                      className="text-sm font-bold group-hover:translate-x-1 transition-transform"
                      style={{ color: ind.accentColor || "#00D9FF" }}
                    >
                      &rarr;
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      Sector #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="text-xs font-bold text-white group-hover:text-[#00D9FF] transition-colors leading-snug">
                      {ind.name}
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {ind.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{ind.recommendedDivisions.length} Divisions</span>
                    <span className="text-[#00D9FF]">Explore &rarr;</span>
                  </div>
                </Card3DTilt>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA to Industries Hub */}
        <div className="text-center pt-2">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00D9FF]/40 transition-all"
          >
            <span>View All 12 Industry Transformation Roadmaps &rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
