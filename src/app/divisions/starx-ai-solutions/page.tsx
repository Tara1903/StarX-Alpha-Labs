import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { DIVISIONS_DATA } from "@/data/divisions";
import { SERVICES_DATA } from "@/data/services";
import { ArrowRight, ArrowUpRight, CheckCircle2, Cpu, Sparkles, Bot } from "lucide-react";
import { getStarxFlowDestinationUrl } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "STARX AI SOLUTIONS — Custom AI & Intelligent Application Features",
  description: "Application-embedded artificial intelligence, proprietary RAG pipelines, and intelligent software features engineered by STARX AI SOLUTIONS.",
};

export default function StarxAiSolutionsPage() {
  const division = DIVISIONS_DATA.find((d) => d.slug === "starx-ai-solutions")!;
  const relatedServices = SERVICES_DATA.filter((s) => s.category === "ai");

  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow pt-20 sm:pt-24">
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[rgba(130,180,220,0.18)]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#63B8F8]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>{division.badge}</Badge>
              <h1 className="text-display font-extrabold text-white">{division.name}</h1>
              <p className="text-xl font-medium text-[#32A9E8]">{division.tagline}</p>
              <p className="text-body text-slate-300">{division.overview}</p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#0B192B]/80 border-b border-[rgba(130,180,220,0.18)]">
          <Container>
            <div className="max-w-3xl mb-12 space-y-2">
              <h2 className="text-2xl font-bold text-white">Custom AI Capabilities</h2>
              <p className="text-sm text-slate-400">Practical intelligence embedded into enterprise code.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {division.capabilities.map((cap) => (
                <div key={cap.title} className="p-6 rounded-xl bg-[#07111F] border border-[rgba(130,180,220,0.18)] space-y-2">
                  <div className="flex items-center gap-2 text-base font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#32A9E8]" />
                    <span>{cap.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Available Services */}
        <section className="py-20 bg-[#07111F] border-b border-[rgba(130,180,220,0.18)]">
          <Container>
            <div className="max-w-3xl mb-12 space-y-2">
              <h2 className="text-2xl font-bold text-white">AI Services Offered</h2>
              <p className="text-sm text-slate-400">Deep, client-specific AI architectures.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
                <div key={service.slug} className="p-6 rounded-xl bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] hover:border-[#32A9E8] transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white">{service.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-3">{service.shortDescription}</p>
                  </div>
                  <div className="pt-2 border-t border-[rgba(130,180,220,0.18)]/70 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#32A9E8]">From {service.startingPrice}</span>
                    <Link href={`/services/${service.slug}`} className="text-xs text-white hover:text-[#32A9E8] font-medium flex items-center gap-1">
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Contextual Referral: STARX FLOW Commercial Alternative */}
        <section className="py-16 bg-[#071638] border-b border-[rgba(130,180,220,0.18)]">
          <Container>
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0A1940] border border-[#00D9FF]/30 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Looking for Off-the-Shelf Business AI?</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Need an Out-of-the-Box AI Receptionist? Meet STARX FLOW.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  If your company does not require bespoke model engineering and instead needs an immediate AI receptionist to answer customer calls, manage WhatsApp, and capture inbound leads, explore our independent platform <strong className="text-white font-medium">STARX FLOW</strong>.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={getStarxFlowDestinationUrl({ source: "starx_alpha_labs", campaign: "ai_solutions_page", feature: "ai_receptionist" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-white hover:brightness-110 shadow-lg shadow-[#087BFF]/30 flex items-center gap-2 transition-all whitespace-nowrap"
                >
                  <span>Explore STARX FLOW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <Link
                  href="/ecosystem"
                  className="text-xs text-slate-400 hover:text-white px-3 py-2"
                >
                  View Ecosystem &rarr;
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-[#102D50] text-center">
          <Container className="max-w-2xl space-y-6">
            <h2 className="text-2xl font-bold text-white">Deploy Custom Intelligence</h2>
            <p className="text-xs text-slate-300">Explore how bespoke AI models can automate your proprietary workflows.</p>
            <LinkButton href="/get-quote" variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Request AI Architecture Consultation
            </LinkButton>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
