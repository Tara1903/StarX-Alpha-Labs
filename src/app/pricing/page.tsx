import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { PricingClient } from "@/components/pricing/PricingClient";
import { CheckCircle2, ArrowRight, HelpCircle, Shield, Zap, Sparkles, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Development Packages — StarX Alpha Labs",
  description: "Transparent engineering pricing in INR (₹). Explore packages across Website Development, Mobile App Development, and Website + App Combo Solutions.",
};

export default function PricingPage() {
  const faqs = [
    {
      q: "Are the package prices in Indian Rupees (INR) with fixed scope?",
      a: "Yes. All listed prices are in Indian Rupees (₹). Every package represents a clear, fixed-scope milestone deliverable with zero hidden fees or unexpected overruns."
    },
    {
      q: "How does the payment milestone schedule work?",
      a: "Standard projects follow a 3-tranche milestone structure: 50% initial advance on contract signing and sprint kickoff, 30% upon approval of the beta milestone preview, and the remaining 20% on final UAT delivery and live DNS deployment."
    },
    {
      q: "Who owns the source code and intellectual property?",
      a: "You do. 100% intellectual property ownership, Git repository access, design files, and deployment configurations are transferred directly to your organization upon project handover."
    },
    {
      q: "Can I request custom features or integrations outside the base package?",
      a: "Yes! Use our 7-step Interactive Project Calculator to customize packages with specific add-ons (payment gateways, push notifications, AI chatbots, etc.), or request a custom scope review from our engineering leads."
    },
    {
      q: "What kind of post-launch warranty and support do you provide?",
      a: "All packages include 14 to 30 days of complimentary bug warranty post-deployment. We also offer monthly maintenance SLAs covering security updates, performance monitoring, automated backups, and prioritized feature updates."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-[#FFFFFF] selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Header Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden border-b border-[#0A1940]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#087BFF]/15 blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#873BFF]/15 blur-[120px]" />

          <Container>
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#071638]/70 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#00D9FF] animate-pulse" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#00D9FF] uppercase">
                  Transparent Engineering Pricing in INR (₹)
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Predictable Budgets.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#873BFF]">
                  Verified Milestones.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#C8D5EF] max-w-2xl leading-relaxed">
                Choose from our three dedicated development divisions: Website Development, Mobile App Development,
                or complete Website + App Combo suites with real savings up to ₹50,000.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <LinkButton
                  href="/project-calculator"
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white font-bold px-6 py-3 shadow-lg shadow-[#087BFF]/30"
                  leftIcon={<Calculator className="w-4 h-4" />}
                >
                  Launch Interactive Project Calculator
                </LinkButton>

                <LinkButton
                  href="/development-services"
                  variant="secondary"
                  size="lg"
                  className="border border-[#00D9FF]/30 bg-[#071638]/70 hover:bg-[#0A1940] text-white px-6 py-3"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#00D9FF]" />}
                >
                  Explore The Three Divisions
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing Client with 3 Colored Tabs */}
        <section className="py-20 bg-[#030B24]">
          <Container>
            <PricingClient />
          </Container>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-[#071638] border-t border-[#0A1940]">
          <Container>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <HelpCircle className="w-6 h-6 text-[#00D9FF] mx-auto" />
                <h3 className="text-2xl font-bold text-white">Commercial &amp; Contract FAQs</h3>
                <p className="text-xs text-[#C8D5EF]">Clear answers to commercial terms, code ownership, and warranties.</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.q} className="p-6 rounded-2xl bg-[#0A1940] border border-white/5 space-y-2">
                    <h4 className="text-sm font-bold text-white">{faq.q}</h4>
                    <p className="text-xs text-[#C8D5EF] leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
