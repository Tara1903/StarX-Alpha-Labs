import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { DIVISIONS_DATA } from "@/data/divisions";
import { ArrowRight, CheckCircle2, Globe, Server, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Divisions — STARX LABS",
  description: "Explore the specialized technical divisions of STARX LABS: STARX DIGITAL, STARX SYSTEMS, and STARX AI SOLUTIONS.",
};

export default function DivisionsPage() {
  const getIcon = (slug: string) => {
    switch (slug) {
      case "starx-digital":
        return <Globe className="w-6 h-6 text-[#32A9E8]" />;
      case "starx-systems":
        return <Server className="w-6 h-6 text-[#1769AA]" />;
      case "starx-ai-solutions":
        return <Cpu className="w-6 h-6 text-[#63B8F8]" />;
      default:
        return <Server className="w-6 h-6 text-[#32A9E8]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow pt-20 sm:pt-24">
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[rgba(130,180,220,0.18)]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>Technical Divisions</Badge>
              <h1 className="text-display font-extrabold text-white">
                Specialized Engineering Units.
              </h1>
              <p className="text-body text-slate-300">
                To provide both depth of specialization and end-to-end cohesion, STARX LABS operates across
                three specialized engineering divisions.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-24 bg-[#07111F]">
          <Container className="space-y-16">
            {DIVISIONS_DATA.map((division, idx) => (
              <div
                key={division.slug}
                className="p-8 md:p-12 rounded-3xl bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-xl"
              >
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-[#102D50] border border-[rgba(130,180,220,0.18)] flex items-center justify-center">
                      {getIcon(division.slug)}
                    </div>
                    <Badge variant="navy">{division.badge}</Badge>
                  </div>

                  <div>
                    <h2 className="text-3xl font-extrabold text-white mb-2">{division.name}</h2>
                    <p className="text-sm font-medium text-[#32A9E8]">{division.tagline}</p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">{division.overview}</p>

                  <div className="pt-2">
                    <LinkButton
                      href={`/divisions/${division.slug}`}
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Explore {division.name}
                    </LinkButton>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#07111F] p-6 rounded-2xl border border-[rgba(130,180,220,0.18)] space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Core Capabilities & Deliverables
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {division.capabilities.map((cap) => (
                      <div key={cap.title} className="space-y-1">
                        <div className="flex items-start gap-2 text-xs font-bold text-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#32A9E8] shrink-0 mt-0.5" />
                          <span>{cap.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 pl-5.5 leading-relaxed">
                          {cap.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[rgba(130,180,220,0.18)]/80 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 mr-2">Tech:</span>
                    {division.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#102D50] border border-[rgba(130,180,220,0.18)] text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
