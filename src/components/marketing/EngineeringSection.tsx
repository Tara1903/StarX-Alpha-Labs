"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { Compass, GitMerge, ShieldCheck, Rocket } from "lucide-react";

export function EngineeringSection() {
  const steps = [
    {
      number: "01",
      icon: <Compass className="w-5 h-5 text-[#32A9E8]" />,
      title: "Discovery & System Architecture",
      description:
        "We dissect business requirements, map data models, define API contracts, and establish technical specifications before writing code.",
    },
    {
      number: "02",
      icon: <GitMerge className="w-5 h-5 text-[#1769AA]" />,
      title: "Iterative Sprint Development",
      description:
        "Work proceeds in focused, testable milestones. Continuous integration ensures code reviews, branch previews, and stakeholder validation.",
    },
    {
      number: "03",
      icon: <ShieldCheck className="w-5 h-5 text-[#63B8F8]" />,
      title: "Quality Assurance & Security Audits",
      description:
        "Every build undergoes strict type verification, linting, end-to-end integration tests, and security audits for data isolation and access controls.",
    },
    {
      number: "04",
      icon: <Rocket className="w-5 h-5 text-[#32A9E8]" />,
      title: "Production Deployment & Lifecycle Support",
      description:
        "Automated edge deployments, real-time error telemetry, performance monitoring, and guaranteed service-level agreements ensure operational uptime.",
    },
  ];

  return (
    <section id="engineering" className="py-24 md:py-32 bg-[#F4F8FC] text-[#172B43] theme-corporate-light border-y border-[#DDE7F0]">
      <Container>
        <div className="max-w-3xl mb-16 space-y-4">
          <Badge variant="corporate" dot>
            Process & Delivery
          </Badge>
          <Reveal direction="up" distance={15}>
            <h2 className="text-h2 font-bold text-[#102D50]">
              The STARX Engineering Methodology.
            </h2>
          </Reveal>
          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-body text-[#64748B]">
              A disciplined software development lifecycle designed to eliminate technical debt,
              guarantee predictability, and ensure enterprise software resilience.
            </p>
          </Reveal>
        </div>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="p-6 rounded-xl bg-white border border-[#DDE7F0] shadow-corporate-card flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-mono text-[#1769AA]/40">
                      {step.number}
                    </span>
                    <div className="h-9 w-9 rounded-lg bg-[#F4F8FC] border border-[#DDE7F0] flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#102D50] leading-snug">{step.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{step.description}</p>
                </div>

                <div className="pt-2 border-t border-[#DDE7F0]/80 text-[11px] font-mono text-[#1769AA]">
                  Stage {step.number} Verified
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
