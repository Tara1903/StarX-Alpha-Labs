import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { DIVISIONS_DATA } from "@/data/divisions";
import { SERVICES_DATA } from "@/data/services";
import { ArrowRight, CheckCircle2, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "STARX SYSTEMS — Custom Software & Business Web Applications",
  description: "Enterprise web applications, business-specific portals, and scalable API integrations engineered by STARX SYSTEMS.",
};

export default function StarxSystemsPage() {
  const division = DIVISIONS_DATA.find((d) => d.slug === "starx-systems")!;
  const relatedServices = SERVICES_DATA.filter((s) => s.category === "systems");

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow">
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[#19375E]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="corporate" dot>{division.badge}</Badge>
              <h1 className="text-display font-extrabold text-white">{division.name}</h1>
              <p className="text-xl font-medium text-[#32A9E8]">{division.tagline}</p>
              <p className="text-body text-slate-300">{division.overview}</p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#0F2038] border-b border-[#19375E]">
          <Container>
            <div className="max-w-3xl mb-12 space-y-2">
              <h2 className="text-2xl font-bold text-white">Systems Capabilities</h2>
              <p className="text-sm text-slate-400">Robust architectures for operational excellence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {division.capabilities.map((cap) => (
                <div key={cap.title} className="p-6 rounded-xl bg-[#0A1424] border border-[#19375E] space-y-2">
                  <div className="flex items-center gap-2 text-base font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA]" />
                    <span>{cap.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Available Services */}
        <section className="py-20 bg-[#0A1424] border-b border-[#19375E]">
          <Container>
            <div className="max-w-3xl mb-12 space-y-2">
              <h2 className="text-2xl font-bold text-white">Systems Services Offered</h2>
              <p className="text-sm text-slate-400">Custom web applications and infrastructure engineering.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
                <div key={service.slug} className="p-6 rounded-xl bg-[#0F2038] border border-[#19375E] hover:border-[#1769AA] transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white">{service.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-3">{service.shortDescription}</p>
                  </div>
                  <div className="pt-2 border-t border-[#19375E]/70 flex items-center justify-between">
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

        <section className="py-16 bg-[#102D50] text-center">
          <Container className="max-w-2xl space-y-6">
            <h2 className="text-2xl font-bold text-white">Engineer Custom Software</h2>
            <p className="text-xs text-slate-300">Discuss custom business applications with our software architects.</p>
            <LinkButton href="/get-quote" variant="corporate" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Request Systems Proposal
            </LinkButton>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
