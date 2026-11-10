"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { CheckCircle2, Code, Compass, Layers, ShieldCheck } from "lucide-react";

export function CompanyIntro() {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-[#32A9E8]" />,
      title: "Architectural Precision",
      description:
        "Every project begins with thorough system design, type safety, modular component boundaries, and scalable cloud topologies.",
    },
    {
      icon: <Code className="w-5 h-5 text-[#32A9E8]" />,
      title: "Engineered For Speed",
      description:
        "We harness cutting-edge web technologies like Next.js Turbopack, React Server Components, and WebGL to deliver sub-second response times.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#32A9E8]" />,
      title: "Security & Governance",
      description:
        "Enterprise-grade security standards with strict row-level authorization, server-side data validation, and sanitized API gateways.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#32A9E8]" />,
      title: "Business-Aligned Impact",
      description:
        "We don't build technology for novelty; we engineer platforms that streamline operations, elevate brand authority, and accelerate commercial growth.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F4F8FC] text-[#172B43] theme-corporate-light border-y border-[#DDE7F0]">
      <Container>
        <div className="max-w-3xl mb-16 space-y-4">
          <Badge variant="corporate" dot>
            About STARX LABS
          </Badge>
          <Reveal direction="up" distance={15}>
            <h2 className="text-h2 font-bold text-[#102D50]">
              Engineering Premier Digital Solutions for Market Leaders.
            </h2>
          </Reveal>
          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-body text-[#64748B]">
              STARX LABS is a specialized digital engineering and technology consultancy. We partner
              with growing companies and established organizations to build reliable websites,
              purpose-built software applications, and bespoke artificial intelligence solutions.
            </p>
          </Reveal>
        </div>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <div className="p-6 rounded-xl bg-white border border-[#DDE7F0] shadow-corporate-card hover:shadow-xl hover:border-[#1769AA]/40 transition-all duration-300 h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-[#F4F8FC] border border-[#DDE7F0] flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#102D50]">{pillar.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{pillar.description}</p>
                </div>
                <div className="pt-2 border-t border-[#DDE7F0]/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#1769AA]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16866A]" /> Certified Standard
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
