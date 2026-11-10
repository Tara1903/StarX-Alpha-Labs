"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { INDUSTRIES_DATA, type IndustryItem } from "@/data/industries";
import { ArrowUpRight, Sparkles, Building2 } from "lucide-react";

export function IndustriesSection() {
  return (
    <section id="industries" className="relative py-24 md:py-36 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/50 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#73D8FF]">
              Sector Solutions
            </span>
          </div>

          <Reveal direction="up" distance={15}>
            <h2 className="text-display font-extrabold text-white tracking-tight">
              Tailored Across 7 High-Growth Industries.
            </h2>
          </Reveal>

          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-base sm:text-lg text-[#A3B4C7] max-w-2xl mx-auto font-light">
              We design specialized digital platforms for sectors that demand operational excellence,
              regulatory compliance, and bespoke workflow automation.
            </p>
          </Reveal>
        </div>

        {/* 7 Industries Grid */}
        <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INDUSTRIES_DATA.map((industry: IndustryItem) => (
            <StaggerItem key={industry.slug}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative rounded-3xl p-7 glass-panel glass-panel-hover flex flex-col justify-between h-full border-[rgba(130,180,220,0.18)] hover:border-[#73D8FF]/50 transition-all duration-300 block"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#102D50]/60 text-[#73D8FF]">
                      {industry.badge}
                    </span>
                    <div className="h-8 w-8 rounded-full border border-[rgba(130,180,220,0.2)] flex items-center justify-center group-hover:border-[#73D8FF] group-hover:bg-[#73D8FF]/10 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#73D8FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#73D8FF] transition-colors tracking-tight">
                      {industry.name}
                    </h3>
                    <p className="text-xs font-mono text-[#73D8FF] mt-1">
                      {industry.tagline}
                    </p>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#A3B4C7] leading-relaxed line-clamp-3">
                      {industry.overview}
                    </p>
                  </div>

                  {/* Solved Challenges */}
                  <div className="pt-3 border-t border-[rgba(130,180,220,0.12)] space-y-1.5">
                    {industry.solutions.slice(0, 2).map((sol) => (
                      <div key={sol} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#73D8FF] mt-1.5 shrink-0" />
                        <span className="line-clamp-1">{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[rgba(130,180,220,0.12)] flex items-center justify-between text-xs text-slate-300 font-semibold group-hover:text-white">
                  <span>Explore Industry Blueprint</span>
                  <span className="text-[#73D8FF] font-mono text-xs">→</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
