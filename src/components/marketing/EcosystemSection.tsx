"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight, Bot, Cpu, MessageSquare, Workflow } from "lucide-react";

export function EcosystemSection() {
  const flowFeatures = [
    {
      icon: <Workflow className="w-5 h-5 text-[#32A9E8]" />,
      title: "Business Workflow Automation",
      description: "Automate repetitive business processes, document intake, and enterprise routing.",
    },
    {
      icon: <Bot className="w-5 h-5 text-[#32A9E8]" />,
      title: "AI Receptionist & Voice Agents",
      description: "Intelligent front-desk call handling, appointment scheduling, and automated qualification.",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-[#32A9E8]" />,
      title: "Omnichannel Customer Messaging",
      description: "Unified communications across WhatsApp, SMS, web chat, email, and social channels.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#32A9E8]" />,
      title: "Integrated Business CRM",
      description: "Automated deal pipeline, customer record intelligence, and automated follow-ups.",
    },
  ];

  return (
    <section id="ecosystem" className="py-24 md:py-32 bg-[#0F2038] text-slate-100 border-t border-[#19375E] relative overflow-hidden">
      {/* Background ambient illumination */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#1769AA]/20 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Positioning & Link */}
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="corporate" dot>
              STARX Ecosystem
            </Badge>

            <Reveal direction="up" distance={15}>
              <h2 className="text-h2 font-bold text-white leading-tight">
                Looking for Ready-Made Business Automation? Meet{" "}
                <span className="text-[#32A9E8]">STARX FLOW</span>.
              </h2>
            </Reveal>

            <Reveal direction="up" distance={15} delay={0.1}>
              <p className="text-body text-slate-300">
                While <strong>STARX LABS</strong> engineers bespoke software, custom platforms, and
                proprietary AI integrations, our sister product <strong>STARX FLOW</strong> provides an
                all-in-one business automation platform with AI receptionists, CRM, and omnichannel messaging.
              </p>
            </Reveal>

            <div className="pt-2">
              <a
                href={SITE_CONFIG.ecosystem.starxFlowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1769AA] hover:bg-[#12558B] text-white font-medium text-sm transition-all shadow-lg shadow-[#1769AA]/20"
              >
                <span>Explore STARX FLOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[11px] text-slate-400 font-mono">
              Direct external destination: {SITE_CONFIG.ecosystem.starxFlowUrl}
            </p>
          </div>

          {/* Right Column: FLOW Feature Matrix Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {flowFeatures.map((feat) => (
              <div
                key={feat.title}
                className="p-5 rounded-xl bg-[#0A1424] border border-[#19375E] hover:border-[#1769AA]/60 transition-all space-y-2.5"
              >
                <div className="h-9 w-9 rounded-lg bg-[#102D50] border border-[#19375E] flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="text-sm font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
