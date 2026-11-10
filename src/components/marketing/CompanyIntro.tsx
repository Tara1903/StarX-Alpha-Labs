"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { Layers, Code, ShieldCheck, Compass, Sparkles } from "lucide-react";

export function CompanyIntro() {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-[#73D8FF]" />,
      title: "Architectural Precision",
      description:
        "Every project begins with clean system design, rigorous type safety, modular component boundaries, and scalable cloud topologies.",
    },
    {
      icon: <Code className="w-5 h-5 text-[#32A9E8]" />,
      title: "Engineered For Speed",
      description:
        "We harness Next.js 16 Turbopack, React Server Components, and GPU-accelerated graphics to deliver sub-second response times.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#73D8FF]" />,
      title: "Security & Governance",
      description:
        "Enterprise-grade standards with strict row-level authorization, server-side data validation, and sanitized API gateways.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#32A9E8]" />,
      title: "Business-Aligned Impact",
      description:
        "We engineer platforms that streamline operations, elevate brand authority, and accelerate measurable commercial growth.",
    },
  ];

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <Container>
        {/* Editorial Technology Statement */}
        <div className="max-w-5xl mx-auto text-center space-y-6 mb-20 md:mb-24">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/50 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" />
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#73D8FF]">
                Our Core Philosophy
              </span>
            </div>
          </FadeIn>

          <Reveal direction="up" distance={20} delay={0.2}>
            <blockquote className="text-display font-extrabold text-[#F8FAFC] tracking-tight leading-[1.1]">
              &ldquo;Technology is not just what we build. It&apos;s what becomes{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73D8FF] via-[#32A9E8] to-[#63B8F8]">
                possible because of it.
              </span>
              &rdquo;
            </blockquote>
          </Reveal>

          <Reveal direction="up" distance={15} delay={0.35}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#A3B4C7] font-light leading-relaxed">
              STARX LABS is a specialized digital engineering and applied AI consultancy.
              We partner with industry leaders to transform complex challenges into high-performance,
              resilient software solutions that shape market standards.
            </p>
          </Reveal>
        </div>

        {/* 4 Pillars in Glassmorphic Cards */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-[#1769AA]/20 border border-[#32A9E8]/30 flex items-center justify-center mb-5 shadow-sm shadow-[#1769AA]/30">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#A3B4C7] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[rgba(130,180,220,0.12)] flex items-center gap-2 text-xs font-mono text-[#73D8FF]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#73D8FF]" />
                  Verified Engineering Standard
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
