"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { Globe, Server, Cpu, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface DivisionCardProps {
  division: {
    badge: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    capabilities: string[];
    linkText: string;
    href: string;
    glowColor: string;
  };
}

function DivisionCard({ division }: DivisionCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative rounded-3xl p-8 sm:p-10 glass-panel glass-panel-hover flex flex-col justify-between overflow-hidden group"
    >
      {/* Interactive cursor light flare (zero React re-renders via CSS variables) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${division.glowColor}, transparent 70%)`,
        }}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.22)] bg-[#102D50]/50 text-[#73D8FF]">
            {division.badge}
          </span>
          <div className="h-12 w-12 rounded-2xl bg-[#0B192B] border border-[rgba(130,180,220,0.2)] flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:border-[#73D8FF] transition-all">
            {division.icon}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {division.title}
          </h3>
          <p className="mt-3 text-sm text-[#A3B4C7] leading-relaxed">
            {division.description}
          </p>
        </div>

        <div className="pt-4 border-t border-[rgba(130,180,220,0.12)] space-y-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Core Competencies
          </p>
          {division.capabilities.map((cap) => (
            <div key={cap} className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#73D8FF] shrink-0" />
              <span>{cap}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 mt-6">
        <LinkButton
          href={division.href}
          variant="outline"
          size="md"
          className="w-full justify-between text-xs font-semibold tracking-wider border-[rgba(130,180,220,0.25)] hover:border-[#73D8FF] text-white hover:text-[#73D8FF]"
          rightIcon={<ArrowRight className="w-4 h-4 text-[#73D8FF] group-hover:translate-x-1 transition-transform" />}
        >
          {division.linkText}
        </LinkButton>
      </div>
    </div>
  );
}

export function DivisionsSection() {
  const divisions = [
    {
      badge: "Web & E-Commerce",
      title: "STARX DIGITAL",
      icon: <Globe className="w-6 h-6 text-[#73D8FF]" />,
      description:
        "High-conversion corporate websites, bespoke e-commerce platforms, and progressive web apps engineered for speed, international reach, and visual elegance.",
      capabilities: [
        "Business & Corporate Web Platforms",
        "Headless E-Commerce & Custom Checkouts",
        "High-Impact Landing Page Engines",
        "Progressive Web Apps (PWAs)",
        "Enterprise Design System Architecture",
        "Core Web Vitals & Technical SEO",
      ],
      linkText: "Explore STARX Digital",
      href: "/divisions/starx-digital",
      glowColor: "rgba(115, 216, 255, 0.12)",
    },
    {
      badge: "Custom Software",
      title: "STARX SYSTEMS",
      icon: <Server className="w-6 h-6 text-[#32A9E8]" />,
      description:
        "Custom web applications, cloud backends, management portals, and multi-system API architectures tailored to mission-critical operational workflows.",
      capabilities: [
        "Custom Enterprise Web Applications",
        "Business-Specific Operations Software",
        "Executive Dashboards & Telematics",
        "Customer & Partner SaaS Portals",
        "High-Concurrency Microservices",
        "Secure Database & Third-Party APIs",
      ],
      linkText: "Explore STARX Systems",
      href: "/divisions/starx-systems",
      glowColor: "rgba(50, 169, 232, 0.12)",
    },
    {
      badge: "Applied AI Systems",
      title: "STARX AI SOLUTIONS",
      icon: <Cpu className="w-6 h-6 text-[#73D8FF]" />,
      description:
        "Bespoke artificial intelligence integrations, enterprise RAG pipelines, and intelligent decision systems engineered specifically for your proprietary workflows.",
      capabilities: [
        "Domain-Specific AI Application Development",
        "Enterprise RAG & Document Intelligence",
        "Predictive Analytics & Forecasting Models",
        "Computer Vision & Automated Inspections",
        "Fine-Tuned LLM Cloud Deployments",
        "Zero-Leakage AI Governance & Auditing",
      ],
      linkText: "Explore STARX AI Solutions",
      href: "/divisions/starx-ai-solutions",
      glowColor: "rgba(23, 105, 170, 0.16)",
    },
  ];

  return (
    <section id="divisions" className="relative py-10 sm:py-12 md:py-16 overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/50 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#73D8FF]">
              Specialized Operating Divisions
            </span>
          </div>

          <Reveal direction="up" distance={15}>
            <h2 className="text-display font-extrabold text-white tracking-tight">
              Purpose-Built Engineering Units.
            </h2>
          </Reveal>

          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-base sm:text-lg text-[#A3B4C7] max-w-2xl mx-auto font-light">
              We operate through three dedicated divisions to ensure deep domain specialization,
              cutting-edge tooling, and uncompromising execution across every software discipline.
            </p>
          </Reveal>
        </div>

        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {divisions.map((division) => (
            <StaggerItem key={division.title}>
              <DivisionCard division={division} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
