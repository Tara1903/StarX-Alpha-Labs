import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { SERVICES_DATA } from "@/data/services";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Services Catalog — STARX LABS",
  description: "Explore our full catalog of custom software, enterprise web development, e-commerce, API integration, and bespoke AI development services.",
};

export default function ServicesPage() {
  const categories = [
    { key: "digital", label: "STARX DIGITAL (Web & Commerce)" },
    { key: "systems", label: "STARX SYSTEMS (Custom Software & APIs)" },
    { key: "ai", label: "STARX AI SOLUTIONS (Bespoke AI Architecture)" },
    { key: "maintenance", label: "Engineering Maintenance & SLA" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow">
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[#19375E]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>Service Catalog</Badge>
              <h1 className="text-display font-extrabold text-white">
                Bespoke Digital & Software Services.
              </h1>
              <p className="text-body text-slate-300">
                Transparent deliverables, clear milestones, and verified architectural standards.
                Select any capability below to review scope, timelines, and technology stacks.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#0A1424]">
          <Container className="space-y-16">
            {categories.map((cat) => {
              const services = SERVICES_DATA.filter((s) => s.category === cat.key);
              if (services.length === 0) return null;

              return (
                <div key={cat.key} className="space-y-8">
                  <div className="border-b border-[#19375E] pb-3 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{cat.label}</h2>
                    <span className="text-xs font-mono text-[#32A9E8]">{services.length} Capabilities</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <div
                        key={service.slug}
                        className="p-6 rounded-2xl bg-[#0F2038] border border-[#19375E] hover:border-[#32A9E8] transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between space-y-6"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="navy" size="sm">{service.categoryLabel}</Badge>
                            <span className="text-xs font-mono text-[#32A9E8]">{service.estimatedTimeline}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white leading-snug">{service.title}</h3>
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                            {service.shortDescription}
                          </p>
                          <div className="space-y-1.5 pt-2 border-t border-[#19375E]/60">
                            {service.features.slice(0, 3).map((feat) => (
                              <div key={feat} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#32A9E8] shrink-0" />
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#19375E] flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-mono text-slate-500">Starting at</span>
                            <span className="text-sm font-bold text-white">{service.startingPrice}</span>
                          </div>
                          <LinkButton
                            href={`/services/${service.slug}`}
                            variant="outline"
                            size="sm"
                            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                          >
                            Explore Scope
                          </LinkButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </Container>
        </section>

        {/* Custom Scoping Banner */}
        <section className="py-16 bg-[#102D50] border-t border-[#19375E] text-center">
          <Container className="max-w-2xl space-y-4">
            <h2 className="text-2xl font-bold text-white">Need a Multi-Service Enterprise Architecture?</h2>
            <p className="text-xs text-slate-300">
              Our engineering leadership conducts comprehensive scoping workshops to design unified technical roadmaps.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <LinkButton href="/get-quote" variant="primary" size="md">
                Request Tailored Quote
              </LinkButton>
              <LinkButton href="/book-consultation" variant="secondary" size="md">
                Book Consultation
              </LinkButton>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
