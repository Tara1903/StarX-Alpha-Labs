import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { PORTFOLIO_DATA, type PortfolioItem } from "@/data/portfolio";
import { ArrowUpRight, Sparkles, Shield, Cpu, Terminal } from "lucide-react";

export function SelectedWorkSection() {
  return (
    <section id="portfolio" className="relative py-10 sm:py-12 md:py-16 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/50 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#73D8FF]">
              Proof of Architecture
            </span>
          </div>

          <Reveal direction="up" distance={15}>
            <h2 className="text-display font-extrabold text-white tracking-tight">
              Selected Showcase Projects.
            </h2>
          </Reveal>

          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-base sm:text-lg text-[#A3B4C7] max-w-2xl mx-auto font-light">
              Explore our architectural demonstrations and proprietary prototypes.
              Engineered to stress-test high concurrency, real-time sync, and applied AI.
            </p>
          </Reveal>
        </div>

        {/* Portfolio Cards Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.map((project: PortfolioItem) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group relative rounded-3xl p-8 sm:p-10 glass-panel glass-panel-hover flex flex-col justify-between h-full border-[rgba(130,180,220,0.18)] hover:border-[#73D8FF]/50 transition-all duration-300 block overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Category & Demo Badge */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#102D50]/60 text-[#73D8FF]">
                      {project.categoryLabel}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1769AA]/20 text-[#63B8F8] border border-[#32A9E8]/30">
                      {project.projectType}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#73D8FF] transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#73D8FF] mt-1">
                      {project.tagline}
                    </p>
                    <p className="mt-3 text-sm text-[#A3B4C7] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Architecture Highlights */}
                  <div className="pt-4 border-t border-[rgba(130,180,220,0.12)] space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                      Key Highlights
                    </span>
                    {project.architectureHighlights.slice(0, 3).map((high) => (
                      <div key={high} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#73D8FF] mt-1.5 shrink-0" />
                        <span>{high}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#07111F]/70 text-slate-300 border border-[rgba(130,180,220,0.14)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[rgba(130,180,220,0.12)] flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                    View Case Study
                  </span>
                  <div className="h-8 w-8 rounded-full border border-[rgba(130,180,220,0.2)] flex items-center justify-center group-hover:border-[#73D8FF] group-hover:bg-[#73D8FF]/10 transition-all">
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#73D8FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
