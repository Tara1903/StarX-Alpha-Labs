import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { CheckCircle2, ArrowRight, HelpCircle, Shield, Zap, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Engagement Models — STARX LABS",
  description: "Transparent engineering pricing models: Fixed-Scope Projects, Dedicated Monthly Sprints, and Enterprise Maintenance SLAs.",
};

export default function PricingPage() {
  const models = [
    {
      badge: "Most Common",
      name: "Fixed-Scope Milestone",
      price: "From $2,400",
      description: "Ideal for well-defined websites, storefronts, and standalone web applications with specific deliverable requirements.",
      benefits: [
        "Fixed-price contract with zero surprise cost overruns",
        "Clear phased milestone payments tied to approvals",
        "Itemized deliverables with strict acceptance criteria",
        "Comprehensive 30-day post-launch warranty support",
        "100% intellectual property transfer upon final delivery",
      ],
      ctaText: "Request Scope Estimate",
      ctaHref: "/get-quote",
      popular: true,
    },
    {
      badge: "Agile Teams",
      name: "Dedicated Engineering Sprint",
      price: "$4,500 / sprint",
      description: "Bi-weekly sprint capacity dedicated to continuous product engineering, architectural scaling, or custom AI feature delivery.",
      benefits: [
        "Dedicated senior software engineer & architect hours",
        "Weekly priority backlog grooming & sprint planning",
        "Bi-weekly production releases via CI/CD pipelines",
        "Direct Slack/Teams channel with technical leadership",
        "Flexible month-to-month commitments",
      ],
      ctaText: "Reserve Sprint Capacity",
      ctaHref: "/contact",
      popular: false,
    },
    {
      badge: "Continuous Care",
      name: "Technical Maintenance & SLA",
      price: "From $850 / mo",
      description: "Guaranteed uptime, proactive dependency patching, automated disaster recovery backups, and prioritized bug fix SLAs.",
      benefits: [
        "24/7 automated uptime, latency, and error monitoring",
        "Guaranteed 2-hour response time for critical incidents",
        "Monthly security patch cycles & framework updates",
        "Automated off-site database backups with verified restores",
        "Monthly performance and Core Web Vitals health audit",
      ],
      ctaText: "Enroll in SLA Support",
      ctaHref: "/services/maintenance",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow pt-20 sm:pt-24">
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[rgba(130,180,220,0.18)]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>Commercial Terms</Badge>
              <h1 className="text-display font-extrabold text-white">
                Transparent Engagement Models.
              </h1>
              <p className="text-body text-slate-300">
                Predictable budgets, verified milestones, and complete code ownership. We avoid vague hourly
                estimates and deliver concrete commercial certainty.
              </p>
            </div>
          </Container>
        </section>

        {/* Pricing Cards */}
        <section className="py-24 bg-[#07111F]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {models.map((model) => (
                <div
                  key={model.name}
                  className={`p-8 rounded-3xl bg-[#0B192B]/80 border ${
                    model.popular ? "border-[#32A9E8] shadow-cinematic-glow" : "border-[rgba(130,180,220,0.18)]"
                  } flex flex-col justify-between space-y-8 relative`}
                >
                  {model.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge variant="electric" size="sm" dot>Recommended</Badge>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        {model.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">{model.name}</h2>
                      <div className="text-3xl font-extrabold text-[#32A9E8]">{model.price}</div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">{model.description}</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-[rgba(130,180,220,0.18)]">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Included Terms
                      </span>
                      {model.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-[#32A9E8] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[rgba(130,180,220,0.18)]">
                    <LinkButton
                      href={model.ctaHref}
                      variant={model.popular ? "primary" : "outline"}
                      size="md"
                      className="w-full justify-center"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {model.ctaText}
                    </LinkButton>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Guarantees & Code Ownership */}
        <section className="py-20 bg-[#0B192B]/80 border-y border-[rgba(130,180,220,0.18)]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#07111F] border border-[rgba(130,180,220,0.18)] space-y-2">
                <Shield className="w-5 h-5 text-[#32A9E8]" />
                <h3 className="text-sm font-bold text-white">Full Source Code Ownership</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You own all repository commits, database schemas, and assets upon project completion. No ongoing platform fees to us.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#07111F] border border-[rgba(130,180,220,0.18)] space-y-2">
                <Zap className="w-5 h-5 text-[#32A9E8]" />
                <h3 className="text-sm font-bold text-white">Milestone Payment Safety</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Invoices are disbursed across verified deliverable stages. You review and approve each phase before subsequent billing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#07111F] border border-[rgba(130,180,220,0.18)] space-y-2">
                <Sparkles className="w-5 h-5 text-[#32A9E8]" />
                <h3 className="text-sm font-bold text-white">30-Day Defect Warranty</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every custom software release includes 30 days of complimentary bug resolution for any deviations from signed specs.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
