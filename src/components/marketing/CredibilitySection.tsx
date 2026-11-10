"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { ShieldCheck, Cpu, Terminal, Zap, Lock, RefreshCw } from "lucide-react";

export function CredibilitySection() {
  const commitments = [
    {
      icon: <Terminal className="w-5 h-5 text-[#32A9E8]" />,
      title: "100% Strict Type Safety",
      detail: "Zero unverified any-casts across application codebases, verified by compiler checks.",
    },
    {
      icon: <Lock className="w-5 h-5 text-[#32A9E8]" />,
      title: "Row-Level Security (RLS)",
      detail: "Database access is locked down at the database engine level, not solely in application code.",
    },
    {
      icon: <Zap className="w-5 h-5 text-[#32A9E8]" />,
      title: "Core Web Vitals Standard",
      detail: "Engineered to pass Google's Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) thresholds.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#32A9E8]" />,
      title: "Isolated WebGL Boundaries",
      detail: "Interactive 3D visuals are completely isolated, ensuring primary UI and CTAs never block.",
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-[#32A9E8]" />,
      title: "Zero-Downtime Deployment",
      detail: "Atomic release pipelines with instant rollbacks and preview environments.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#32A9E8]" />,
      title: "Clean Intellectual Property",
      detail: "Full source code, architectural documentation, and production keys are transferred directly to your organization.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0A1424] text-slate-100 relative">
      <Container>
        <div className="max-w-3xl mb-16 space-y-4">
          <Badge variant="electric" dot>
            Engineering Standards
          </Badge>
          <Reveal direction="up" distance={15}>
            <h2 className="text-h2 font-bold text-white">
              Guaranteed Principles Over Unverified Claims.
            </h2>
          </Reveal>
          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-body text-slate-300">
              Rather than presenting unverified client counts or fabricated testimonials, we define
              our credibility through verifiable engineering standards, architecture, and contractual guarantees.
            </p>
          </Reveal>
        </div>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commitments.map((item) => (
            <StaggerItem key={item.title}>
              <div className="p-6 rounded-xl bg-[#0F2038] border border-[#19375E] hover:border-[#32A9E8]/50 transition-all duration-300 h-full space-y-3">
                <div className="h-10 w-10 rounded-lg bg-[#102D50] border border-[#19375E] flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
