import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { INDUSTRIES_DATA } from "@/data/industries";
import { SERVICES_DATA } from "@/data/services";
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INDUSTRIES_DATA.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES_DATA.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry Not Found" };

  return {
    title: `${industry.name} Software & Digital Solutions — STARX LABS`,
    description: industry.overview,
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRIES_DATA.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const recommendedServices = SERVICES_DATA.filter((s) =>
    industry.recommendedServices.includes(s.slug)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow">
        {/* Industry Header */}
        <section className="py-20 md:py-24 relative overflow-hidden border-b border-[#19375E]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/industries" className="text-xs text-slate-400 hover:text-white">
                  &larr; All Industries
                </Link>
                <span className="text-slate-600">/</span>
                <Badge variant="corporate" size="sm">{industry.badge}</Badge>
              </div>

              <h1 className="text-display font-extrabold text-white leading-tight">
                {industry.name}
              </h1>

              <p className="text-xl font-medium text-[#32A9E8]">
                {industry.tagline}
              </p>

              <p className="text-base text-slate-300 font-light leading-relaxed">
                {industry.overview}
              </p>
            </div>
          </Container>
        </section>

        {/* Challenges vs Solutions */}
        <section className="py-20 bg-[#0F2038] border-b border-[#19375E]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Challenges */}
              <div className="space-y-6">
                <Badge variant="danger">Operational Bottlenecks</Badge>
                <h2 className="text-2xl font-bold text-white">Industry Friction Points</h2>
                <div className="space-y-3">
                  {industry.challenges.map((chal) => (
                    <div key={chal} className="p-4 rounded-xl bg-[#0A1424] border border-[#19375E] flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-[#DC5454] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-relaxed">{chal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div className="space-y-6">
                <Badge variant="success">Engineered Solutions</Badge>
                <h2 className="text-2xl font-bold text-white">The STARX Approach</h2>
                <div className="space-y-3">
                  {industry.solutions.map((sol) => (
                    <div key={sol} className="p-4 rounded-xl bg-[#0A1424] border border-[#19375E] flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#16866A] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-relaxed">{sol}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Capabilities Matrix */}
        <section className="py-20 bg-[#F4F8FC] text-[#172B43] theme-corporate-light border-b border-[#DDE7F0]">
          <Container>
            <div className="max-w-3xl mb-12 space-y-2">
              <Badge variant="corporate" dot>Specialized Systems</Badge>
              <h2 className="text-2xl font-bold text-[#102D50]">Featured Capabilities for {industry.name}</h2>
              <p className="text-xs text-[#64748B]">Purpose-built modules engineered to resolve sector-specific requirements.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industry.featuredCapabilities.map((cap) => (
                <div key={cap} className="p-5 rounded-xl bg-white border border-[#DDE7F0] shadow-corporate-card flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#1769AA] shrink-0" />
                  <span className="text-xs font-bold text-[#102D50]">{cap}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Recommended Services Grid */}
        {recommendedServices.length > 0 && (
          <section className="py-20 bg-[#0A1424] border-b border-[#19375E]">
            <Container className="space-y-8">
              <div className="space-y-2">
                <Badge variant="navy">Architectural Services</Badge>
                <h2 className="text-2xl font-bold text-white">Recommended Engineering Packages</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedServices.map((service) => (
                  <div key={service.slug} className="p-6 rounded-2xl bg-[#0F2038] border border-[#19375E] hover:border-[#32A9E8] transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[#32A9E8] uppercase">{service.categoryLabel}</span>
                      <h3 className="text-base font-bold text-white">{service.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-3">{service.shortDescription}</p>
                    </div>
                    <div className="pt-2 border-t border-[#19375E]/70 flex items-center justify-between">
                      <span className="text-xs font-mono text-[#32A9E8]">From {service.startingPrice}</span>
                      <Link href={`/services/${service.slug}`} className="text-xs text-white hover:text-[#32A9E8] font-medium flex items-center gap-1">
                        Review <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Conversion CTA */}
        <section className="py-20 bg-[#102D50] text-center">
          <Container className="max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold text-white">Modernize Your {industry.name} Operations</h2>
            <p className="text-xs text-slate-300">
              Schedule a technical consultation to map requirements and timeline with an industry architect.
            </p>
            <div className="flex justify-center gap-4">
              <LinkButton href={`/get-quote?industry=${industry.slug}`} variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request Industry Consultation
              </LinkButton>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
