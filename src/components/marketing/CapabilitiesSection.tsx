"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import {
  Monitor,
  Database,
  Cloud,
  Network,
  ShoppingCart,
  BrainCircuit,
  GitBranch,
  Sparkles,
} from "lucide-react";

export function CapabilitiesSection() {
  const capabilities = [
    {
      title: "Frontend Engineering",
      icon: <Monitor className="w-5 h-5 text-[#73D8FF]" />,
      tech: "Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion",
      focus: "Responsive UI, Server Components, sub-second LCP, zero layout shifts, WCAG AA compliance.",
    },
    {
      title: "Backend Engineering",
      icon: <Network className="w-5 h-5 text-[#32A9E8]" />,
      tech: "Node.js, Edge Middleware, Serverless Functions, REST & GraphQL",
      focus: "High-throughput APIs, asynchronous job workers, microservices, and server-side authentication.",
    },
    {
      title: "Database Architecture",
      icon: <Database className="w-5 h-5 text-[#73D8FF]" />,
      tech: "PostgreSQL, Supabase, Redis, Vector Databases (pgvector)",
      focus: "Row-Level Security (RLS), relational integrity, optimized indexing, caching layers, and real-time streaming.",
    },
    {
      title: "API & System Integration",
      icon: <GitBranch className="w-5 h-5 text-[#32A9E8]" />,
      tech: "Webhooks, Stripe, OpenTelemetry, Third-Party Gateways",
      focus: "Idempotent payment flows, external ERP/CRM synchronization, telemetry, and automated error handling.",
    },
    {
      title: "E-Commerce Engineering",
      icon: <ShoppingCart className="w-5 h-5 text-[#73D8FF]" />,
      tech: "Headless Commerce, Dynamic Inventory, Checkout Optimization",
      focus: "High-concurrency checkout pipelines, PCI-DSS compliance, customized multi-currency catalogs.",
    },
    {
      title: "Bespoke AI Integration",
      icon: <BrainCircuit className="w-5 h-5 text-[#32A9E8]" />,
      tech: "OpenAI, Anthropic, Gemini, Vector Embeddings, RAG Pipelines",
      focus: "Context-aware RAG pipelines, semantic document intelligence, model evaluation, and safety guardrails.",
    },
    {
      title: "Cloud Infrastructure",
      icon: <Cloud className="w-5 h-5 text-[#73D8FF]" />,
      tech: "CI/CD Pipelines, Docker, Edge CDN, Automated Backups",
      focus: "Zero-downtime rolling releases, automated uptime monitoring, environment parity, and SLA support.",
    },
  ];

  return (
    <section id="capabilities" className="relative py-24 md:py-36 overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/50 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#73D8FF]">
              Technical Rigor
            </span>
          </div>

          <Reveal direction="up" distance={15}>
            <h2 className="text-display font-extrabold text-white tracking-tight">
              Full-Lifecycle Capability Matrix.
            </h2>
          </Reveal>

          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-base sm:text-lg text-[#A3B4C7] max-w-2xl mx-auto font-light">
              Modern digital engineering requires cohesion across every tier of the stack. We
              deliver end-to-end technical execution without reliance on fragmented third-party handoffs.
            </p>
          </Reveal>
        </div>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <StaggerItem key={cap.title}>
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#1769AA]/20 border border-[rgba(130,180,220,0.22)] flex items-center justify-center shrink-0">
                      {cap.icon}
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {cap.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A3B4C7] leading-relaxed">
                    {cap.focus}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(130,180,220,0.12)]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Technologies
                  </span>
                  <p className="text-xs font-mono text-[#73D8FF]">
                    {cap.tech}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
