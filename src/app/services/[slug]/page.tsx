import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { SERVICES_DATA } from "@/data/services";
import { ArrowRight, CheckCircle2, Clock, DollarSign, HelpCircle, Layers, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} — STARX LABS`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow">
        {/* Service Header */}
        <section className="py-20 md:py-24 relative overflow-hidden border-b border-[#19375E]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/services" className="text-xs text-slate-400 hover:text-white">
                  &larr; All Services
                </Link>
                <span className="text-slate-600">/</span>
                <Badge variant="electric" size="sm">{service.categoryLabel}</Badge>
              </div>

              <h1 className="text-display font-extrabold text-white leading-tight">
                {service.title}
              </h1>

              <p className="text-lg text-slate-300 font-light leading-relaxed">
                {service.overview}
              </p>

              {/* Quick Spec Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#0F2038] border border-[#19375E] text-left">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Division</span>
                  <Link href={`/divisions/${service.divisionSlug}`} className="text-xs font-bold text-[#32A9E8] hover:underline">
                    {service.categoryLabel}
                  </Link>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Estimated Timeline</span>
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#32A9E8]" /> {service.estimatedTimeline}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Investment</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> From {service.startingPrice}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Deliverables</span>
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#32A9E8]" /> Certified Milestone
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits & Features Grid */}
        <section className="py-20 bg-[#0F2038] border-b border-[#19375E]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Strategic Benefits */}
              <div className="space-y-6">
                <Badge variant="corporate">Business Value</Badge>
                <h2 className="text-2xl font-bold text-white">Strategic Benefits</h2>
                <div className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="p-4 rounded-xl bg-[#0A1424] border border-[#19375E] flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#16866A] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Features */}
              <div className="space-y-6">
                <Badge variant="electric">Technical Architecture</Badge>
                <h2 className="text-2xl font-bold text-white">Engineering Features</h2>
                <div className="space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="p-4 rounded-xl bg-[#0A1424] border border-[#19375E] flex items-start gap-3">
                      <Layers className="w-4 h-4 text-[#32A9E8] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Scope of Delivery & Technology Stack */}
        <section className="py-20 bg-[#F4F8FC] text-[#172B43] theme-corporate-light border-b border-[#DDE7F0]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7 space-y-6">
                <Badge variant="corporate" dot>Execution Plan</Badge>
                <h2 className="text-2xl font-bold text-[#102D50]">Scope of Delivery</h2>
                <div className="space-y-3">
                  {service.scope.map((step, idx) => (
                    <div key={step} className="p-4 rounded-xl bg-white border border-[#DDE7F0] shadow-corporate-card flex items-center gap-4">
                      <span className="h-7 w-7 rounded-full bg-[#102D50] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-medium text-[#172B43]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <Badge variant="corporate">Validated Stack</Badge>
                <h2 className="text-2xl font-bold text-[#102D50]">Technologies Deployed</h2>
                <div className="p-6 rounded-2xl bg-white border border-[#DDE7F0] shadow-corporate-card space-y-3">
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    We select battle-tested, high-reliability software packages with strict TypeScript support and active security audit maintenance.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.techStack.map((tech) => (
                      <span key={tech} className="text-xs font-mono px-3 py-1 rounded-lg bg-[#F4F8FC] border border-[#DDE7F0] text-[#102D50] font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQs */}
        {service.faqs.length > 0 && (
          <section className="py-20 bg-[#0A1424] border-b border-[#19375E]">
            <Container className="max-w-4xl space-y-8">
              <div className="space-y-2 text-center">
                <Badge variant="navy">Inquiries</Badge>
                <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {service.faqs.map((faq) => (
                  <div key={faq.question} className="p-6 rounded-xl bg-[#0F2038] border border-[#19375E] space-y-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#32A9E8] shrink-0" /> {faq.question}
                    </h3>
                    <p className="text-xs text-slate-300 pl-6 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Request Quote Banner */}
        <section className="py-20 bg-gradient-to-br from-[#102D50] via-[#0A1424] to-[#0F2038] text-center">
          <Container className="max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold text-white">Ready to Engage on {service.title}?</h2>
            <p className="text-sm text-slate-300">
              Submit your project scope for an itemized proposal, timeline, and architectural review.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <LinkButton href={`/get-quote?service=${service.slug}`} variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request Service Quote
              </LinkButton>
              <LinkButton href="/book-consultation" variant="secondary" size="lg">
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
