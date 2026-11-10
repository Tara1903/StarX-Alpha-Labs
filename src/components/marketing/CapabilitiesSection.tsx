"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
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
} from "lucide-react";

export function CapabilitiesSection() {
  const capabilities = [
    {
      title: "Frontend Engineering",
      icon: <Monitor className="w-5 h-5 text-[#32A9E8]" />,
      tech: "Next.js 16, React 19, TypeScript, Tailwind CSS, Motion",
      focus: "Responsive UI, Server Components, sub-second LCP, zero layout shifts, accessibility (WCAG AA).",
    },
    {
      title: "Backend Engineering",
      icon: <Network className="w-5 h-5 text-[#1769AA]" />,
      tech: "Node.js, Serverless Functions, Edge Middleware, REST & GraphQL",
      focus: "High-throughput APIs, asynchronous job workers, microservices, and server-side authentication.",
    },
    {
      title: "Database Architecture",
      icon: <Database className="w-5 h-5 text-[#63B8F8]" />,
      tech: "PostgreSQL, Supabase, Redis, Vector Databases",
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
      icon: <ShoppingCart className="w-5 h-5 text-[#1769AA]" />,
      tech: "Headless Commerce, Dynamic Inventory, Checkout Optimization",
      focus: "High-concurrency checkout pipelines, PCI-DSS compliance, customized multi-currency catalogs.",
    },
    {
      title: "Bespoke AI Integration",
      icon: <BrainCircuit className="w-5 h-5 text-[#63B8F8]" />,
      tech: "OpenAI, Anthropic, Gemini, Vector Embeddings, LangChain",
      focus: "Context-aware RAG pipelines, semantic document intelligence, model evaluation, and guardrails.",
    },
    {
      title: "Deployment & Maintenance",
      icon: <Cloud className="w-5 h-5 text-[#32A9E8]" />,
      tech: "CI/CD Pipelines, Docker, Edge CDN, Automated Backups",
      focus: "Zero-downtime rolling releases, automated uptime monitoring, environment parity, and SLA support.",
    },
  ];

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-[#0F2038] text-slate-100 border-y border-[#19375E]">
      <Container>
        <div className="max-w-3xl mb-16 space-y-4">
          <Badge variant="corporate" dot>
            Technical Rigor
          </Badge>
          <Reveal direction="up" distance={15}>
            <h2 className="text-h2 font-bold text-white">
              Full-Lifecycle Capability Matrix.
            </h2>
          </Reveal>
          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-body text-slate-300">
              Modern digital engineering requires cohesion across every tier of the stack. We
              deliver end-to-end technical execution without reliance on fragmented third-party teams.
            </p>
          </Reveal>
        </div>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <StaggerItem key={cap.title}>
              <div className="p-6 rounded-xl bg-[#0A1424] border border-[#19375E] hover:border-[#32A9E8]/60 transition-all duration-300 h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#102D50] border border-[#19375E] flex items-center justify-center shrink-0">
                      {cap.icon}
                    </div>
                    <h3 className="text-base font-bold text-white">{cap.title}</h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{cap.focus}</p>
                </div>

                <div className="pt-3 border-t border-[#19375E]/70">
                  <span className="text-[10px] font-mono text-[#32A9E8] block uppercase tracking-wider mb-1">
                    Tech Stack
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{cap.tech}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
