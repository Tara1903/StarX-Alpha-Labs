import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { Search, Compass, Cpu, Rocket, Sparkles, CheckCircle2 } from "lucide-react";

export function EngineeringSection() {
  const stages = [
    {
      number: "01",
      name: "Discover",
      icon: <Search className="w-5 h-5 text-[#73D8FF]" />,
      headline: "Requirements Analysis & Scope",
      description:
        "We dissect your business goals, user journeys, data requirements, and security constraints to formulate an unambiguous architectural specification.",
      deliverables: ["Product Architecture Spec", "Data Entity Diagrams", "API Contract Blueprint"],
    },
    {
      number: "02",
      name: "Architect",
      icon: <Compass className="w-5 h-5 text-[#32A9E8]" />,
      headline: "System Design & Topologies",
      description:
        "We engineer the database schema, row-level access policies, edge routing, component design systems, and cloud infrastructure.",
      deliverables: ["Supabase / PostgreSQL Schema", "Design System Tokens", "Security & RLS Policies"],
    },
    {
      number: "03",
      name: "Engineer",
      icon: <Cpu className="w-5 h-5 text-[#73D8FF]" />,
      headline: "Iterative Sprint Execution",
      description:
        "Full-stack development using Next.js 16, TypeScript, and React 19. Continuous validation ensures type safety, linting checks, and preview branches.",
      deliverables: ["Production-Ready Source Code", "Automated Test Suites", "Interactive Preview Builds"],
    },
    {
      number: "04",
      name: "Deliver",
      icon: <Rocket className="w-5 h-5 text-[#32A9E8]" />,
      headline: "Production Launch & Support",
      description:
        "Zero-downtime deployment, global edge caching, error telemetry, uptime monitoring, and guaranteed service-level agreements.",
      deliverables: ["Global Cloud Deployment", "Performance & SEO Audit", "Ongoing SLA Maintenance"],
    },
  ];

  return (
    <section id="engineering" className="relative py-24 md:py-36 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/50 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#73D8FF]">
              Disciplined SDLC
            </span>
          </div>

          <Reveal direction="up" distance={15}>
            <h2 className="text-display font-extrabold text-white tracking-tight">
              The 4-Stage Engineering Process.
            </h2>
          </Reveal>

          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-base sm:text-lg text-[#A3B4C7] max-w-2xl mx-auto font-light">
              Predictability by design. Our rigorous software engineering lifecycle eliminates
              technical debt and ensures enterprise-grade resilience from day one.
            </p>
          </Reveal>
        </div>

        {/* Constellation Process Steps */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-[#1769AA]/40 via-[#32A9E8]/60 to-[#73D8FF]/40 -translate-y-12 pointer-events-none -z-10" />

          <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stages.map((stage) => (
              <StaggerItem key={stage.number}>
                <div className="glass-panel glass-panel-hover rounded-3xl p-7 flex flex-col justify-between h-full border-[rgba(130,180,220,0.18)] hover:border-[#73D8FF]/40">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#73D8FF] to-[#32A9E8]">
                        {stage.number}
                      </span>
                      <div className="h-10 w-10 rounded-xl bg-[#102D50]/60 border border-[rgba(130,180,220,0.25)] flex items-center justify-center shadow-md">
                        {stage.icon}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#73D8FF] font-semibold">
                        Stage {stage.number}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                        {stage.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-300 mt-0.5">
                        {stage.headline}
                      </p>
                    </div>

                    <p className="text-xs text-[#A3B4C7] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[rgba(130,180,220,0.12)] space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      Key Deliverables
                    </span>
                    {stage.deliverables.map((del) => (
                      <div key={del} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#73D8FF] shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
