import * as React from "react";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { getStarxFlowDestinationUrl } from "@/lib/ecosystem";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight, Bot, Cpu, MessageSquare, Workflow, Sparkles } from "lucide-react";

export function EcosystemSection() {
  const flowFeatures = [
    {
      icon: <Workflow className="w-5 h-5 text-[#73D8FF]" />,
      title: "Business Workflow Automation",
      description: "Automate repetitive operational processes, document intake, and enterprise approval routing.",
    },
    {
      icon: <Bot className="w-5 h-5 text-[#32A9E8]" />,
      title: "AI Receptionist & Voice Agents",
      description: "Intelligent front-desk inbound call answering, appointment scheduling, and customer qualification.",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-[#73D8FF]" />,
      title: "Omnichannel Customer Messaging",
      description: "Unified communication inbox across WhatsApp, SMS, Web Chat, Email, and Social platforms.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#32A9E8]" />,
      title: "Integrated Business CRM",
      description: "Automated deal pipeline tracking, customer relationship data, and multi-channel reminders.",
    },
  ];

  return (
    <section id="ecosystem" className="relative py-10 sm:py-12 md:py-16 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Product Positioning & Link */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/50 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#73D8FF]" />
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-[#73D8FF]">
                Ecosystem Complement
              </span>
            </div>

            <Reveal direction="up" distance={15}>
              <h2 className="text-display font-extrabold text-white leading-tight">
                Looking for Ready-Made Business Automation? Meet{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73D8FF] to-[#32A9E8]">
                  STARX FLOW.
                </span>
              </h2>
            </Reveal>

            <Reveal direction="up" distance={15} delay={0.1}>
              <p className="text-base sm:text-lg text-[#A3B4C7] font-light leading-relaxed">
                While <strong className="text-white font-semibold">StarX Alpha Labs</strong> engineers bespoke software, custom platforms, and
                proprietary AI integrations, the independently operated product <strong className="text-white font-semibold">STARX FLOW</strong> provides an
                all-in-one commercial automation platform with AI receptionists, CRM, and omnichannel messaging.
              </p>
            </Reveal>

            <Reveal direction="up" distance={15} delay={0.2}>
              <div className="p-4 rounded-2xl glass-panel border border-[rgba(130,180,220,0.18)]">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <span className="text-[#73D8FF] font-semibold">Architecture Note:</span> Both platforms are strictly
                  independent software systems with dedicated databases, isolated authentication, and decoupled deployments.
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" distance={15} delay={0.3}>
              <div className="pt-2">
                <a
                  href={getStarxFlowDestinationUrl({ campaign: "ecosystem_section", feature: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider bg-gradient-to-r from-[#1769AA] to-[#32A9E8] text-white hover:brightness-110 shadow-lg shadow-[#1769AA]/30 border border-[#73D8FF]/30 transition-all"
                >
                  <span>Visit STARX FLOW Platform</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: FLOW Capabilities Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {flowFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl glass-panel glass-panel-hover border-[rgba(130,180,220,0.16)] flex flex-col justify-between space-y-3"
              >
                <div className="h-10 w-10 rounded-xl bg-[#102D50]/60 border border-[rgba(130,180,220,0.22)] flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-[#A3B4C7] mt-1.5 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
