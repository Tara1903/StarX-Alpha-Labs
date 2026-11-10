import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { INDUSTRIES_DATA } from "@/data/industries";
import { ArrowRight, CheckCircle2, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries Served — STARX LABS",
  description: "Specialized digital engineering and custom software architectures tailored for restaurants, retail, healthcare, education, e-commerce, and professional services.",
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow">
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[#19375E]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>Domain Specialization</Badge>
              <h1 className="text-display font-extrabold text-white">
                Industry-Specific Software Architecture.
              </h1>
              <p className="text-body text-slate-300">
                Generic software fails because every industry operates under distinct operational constraints,
                customer expectations, and regulatory frameworks. We build purpose-fit solutions.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#0A1424]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INDUSTRIES_DATA.map((ind) => (
                <div
                  key={ind.slug}
                  className="p-8 rounded-3xl bg-[#0F2038] border border-[#19375E] hover:border-[#32A9E8] transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="corporate" size="sm">{ind.badge}</Badge>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white mb-1.5">{ind.name}</h2>
                      <p className="text-xs font-medium text-[#32A9E8]">{ind.tagline}</p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {ind.overview}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-[#19375E]/70">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Tailored Solutions
                      </span>
                      {ind.featuredCapabilities.slice(0, 3).map((cap) => (
                        <div key={cap} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#32A9E8] shrink-0" />
                          <span className="truncate">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#19375E]">
                    <LinkButton
                      href={`/industries/${ind.slug}`}
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Industry Solutions
                    </LinkButton>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
