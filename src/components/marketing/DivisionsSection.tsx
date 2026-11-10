"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import {
  Globe,
  Server,
  Cpu,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export function DivisionsSection() {
  const divisions = [
    {
      badge: "Web & E-Commerce",
      title: "STARX DIGITAL",
      icon: <Globe className="w-6 h-6 text-[#32A9E8]" />,
      description:
        "High-conversion corporate websites, bespoke e-commerce experiences, and progressive web apps engineered for performance and international reach.",
      capabilities: [
        "Business & Corporate Websites",
        "E-Commerce & Digital Storefronts",
        "High-Impact Landing Pages",
        "Progressive Web Apps (PWAs)",
        "Enterprise Website Redesigns",
        "Search & Performance Optimization",
      ],
      linkText: "Explore Digital Solutions",
      href: "#contact",
      highlightBorder: "hover:border-[#32A9E8]",
    },
    {
      badge: "Custom Software",
      title: "STARX SYSTEMS",
      icon: <Server className="w-6 h-6 text-[#1769AA]" />,
      description:
        "Custom web applications, business software, management portals, and multi-system API architectures tailored to your exact operational workflows.",
      capabilities: [
        "Custom Web Applications",
        "Business-Specific Software",
        "Operations & Management Portals",
        "Customer-Facing SaaS Applications",
        "Custom Dashboards & Analytics",
        "Secure API & Database Integrations",
      ],
      linkText: "Explore Systems Engineering",
      href: "#contact",
      highlightBorder: "hover:border-[#1769AA]",
    },
    {
      badge: "Intelligent Systems",
      title: "STARX AI SOLUTIONS",
      icon: <Cpu className="w-6 h-6 text-[#63B8F8]" />,
      description:
        "Bespoke artificial intelligence integrations and intelligent features engineered specifically for your proprietary business applications and workflows.",
      capabilities: [
        "Custom AI Applications & Models",
        "Application-Embedded AI Features",
        "Client-Specific Workflow AI",
        "Vector Search & Semantic Retrieval",
        "Automated Document Processing",
        "Data Extraction & Classification",
      ],
      linkText: "Explore Custom AI",
      href: "#contact",
      highlightBorder: "hover:border-[#63B8F8]",
    },
  ];

  return (
    <section id="divisions" className="py-24 md:py-32 bg-[#0A1424] text-slate-100 relative">
      <Container>
        <div className="max-w-3xl mb-16 space-y-4">
          <Badge variant="electric" dot>
            Strategic Divisions
          </Badge>
          <Reveal direction="up" distance={15}>
            <h2 className="text-h2 font-bold text-white">
              Specialized Engineering Capabilities Across Three Core Disciplines.
            </h2>
          </Reveal>
          <Reveal direction="up" distance={15} delay={0.1}>
            <p className="text-body text-slate-300">
              STARX LABS organizes its technical competencies into focused divisions, ensuring
              specialized engineering depth while delivering unified solutions.
            </p>
          </Reveal>
        </div>

        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {divisions.map((div) => (
            <StaggerItem key={div.title}>
              <div
                className={`p-8 rounded-2xl bg-[#0F2038] border border-[#19375E] transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-cinematic-glow ${div.highlightBorder} flex flex-col justify-between h-full space-y-8`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-[#102D50] border border-[#19375E] flex items-center justify-center">
                      {div.icon}
                    </div>
                    <Badge variant="navy" size="sm">
                      {div.badge}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{div.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{div.description}</p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-[#19375E]/70">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                      Core Offerings
                    </span>
                    {div.capabilities.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-[#32A9E8] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#19375E]">
                  <LinkButton
                    href={div.href}
                    variant="outline"
                    size="md"
                    className="w-full justify-between"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {div.linkText}
                  </LinkButton>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
