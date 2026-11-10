import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  Zap, 
  ShieldCheck, 
  Clock, 
  HelpCircle,
  Laptop,
  Layers,
  Code2
} from "lucide-react";
import { 
  WEBSITE_PACKAGES, 
  DEVELOPMENT_ADDONS, 
  formatINR 
} from "@/data/developmentPackages";

export const metadata: Metadata = {
  title: "Website Development Packages (W1–W6) — StarX Alpha Labs",
  description: "Explore our 6 professional website development tiers from ₹7,999 to ₹99,999+. From starter business sites to full-stack SaaS web applications with transparent INR pricing.",
};

export default function WebsiteDevelopmentPage() {
  const websiteAddons = DEVELOPMENT_ADDONS.filter(
    (a) => a.applicableTo === "all" || a.applicableTo.includes("website")
  );

  const faqs = [
    {
      q: "Do I get 100% intellectual property ownership and source code?",
      a: "Yes. Upon completion and final handover signoff, 100% source code, repository access, and all design assets are transferred directly to your organization."
    },
    {
      q: "What tech stack do you build websites with?",
      a: "We build modern websites using Next.js 16, React 19, TypeScript, and Tailwind CSS, backed by high-speed headless CMS engines (like Supabase / Sanity) and deployed on serverless global edges for sub-second page loads."
    },
    {
      q: "How does the payment milestone structure work?",
      a: "Standard development follows transparent milestone tranches: 50% initial advance on contract signing, 30% on beta milestone preview approval, and 20% on final UAT and live DNS deployment."
    },
    {
      q: "Can I upgrade my package or add features later?",
      a: "Absolutely. All our architectures are modular. You can start with W1 or W2 and seamlessly upgrade to W4 (E-commerce) or add custom modules anytime without rebuilding from scratch."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-[#FFFFFF] selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden border-b border-[#0A1940]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#087BFF]/18 blur-[140px]" />
          <Container>
            <div className="max-w-4xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#071638]/70 backdrop-blur-md">
                <Globe className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#00D9FF] uppercase">
                  DIVISION A • HIGH-SPEED WEB ENGINEERING
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Website Development.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#873BFF]">
                  Built for Speed &amp; Revenue.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#C8D5EF] max-w-2xl leading-relaxed">
                From high-credibility corporate showcases to high-volume multi-vendor marketplaces and custom SaaS platforms.
                Explore our 6 structured packages with guaranteed delivery timelines and fixed INR pricing.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <LinkButton
                  href="/project-calculator"
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white font-bold px-6 py-3 shadow-lg shadow-[#087BFF]/30"
                  leftIcon={<Calculator className="w-4 h-4" />}
                >
                  Configure Custom Website Quote
                </LinkButton>

                <LinkButton
                  href="/demos"
                  variant="secondary"
                  size="lg"
                  className="border border-[#00D9FF]/30 bg-[#071638]/70 hover:bg-[#0A1940] text-white px-6 py-3"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#00D9FF]" />}
                >
                  Explore 160+ Live Demos
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* 6 Structured Packages Grid (W1–W6) */}
        <section className="py-20 bg-[#030B24] relative">
          <Container className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Transparent Pricing in INR (₹)</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Six Specialized Website Tiers
              </h2>
              <p className="text-sm sm:text-base text-[#C8D5EF]">
                All packages include responsive mobile layouts, on-page SEO, security setup, and dedicated warranty support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WEBSITE_PACKAGES.map((pkg) => {
                const isPopular = pkg.popular;
                return (
                  <div
                    key={pkg.code}
                    className={`rounded-3xl p-8 bg-[#0A1940] border transition-all duration-300 flex flex-col justify-between relative group ${
                      isPopular 
                        ? "border-[#00D9FF] shadow-[0_0_35px_rgba(0,217,255,0.22)] ring-1 ring-[#00D9FF]/40" 
                        : "border-white/10 hover:border-[#00D9FF]/50"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white text-[11px] font-mono font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                        Most Popular Choice
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Code & Scope */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                          {pkg.code}
                        </span>
                        <span className="text-xs font-mono text-[#C8D5EF] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
                          {pkg.timeline}
                        </span>
                      </div>

                      {/* Package Name & Tagline */}
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-[#C8D5EF] mt-1 leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Price Display */}
                      <div className="p-4 rounded-xl bg-[#071638] border border-white/5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8D5EF]">Fixed Scope Starting From</span>
                        <div className="text-3xl font-extrabold text-white mt-0.5">
                          {formatINR(pkg.startingPrice)}
                        </div>
                        <span className="text-xs text-[#00D9FF] font-medium block mt-1">
                          {pkg.pagesOrScreens}
                        </span>
                      </div>

                      {/* Ideal For */}
                      <div className="text-xs text-slate-300 italic border-l-2 border-[#00D9FF]/60 pl-3">
                        Ideal for: {pkg.idealFor}
                      </div>

                      {/* Feature List */}
                      <div className="space-y-2.5 pt-2 border-t border-white/5">
                        <span className="text-xs font-bold uppercase tracking-wider text-white">Included Deliverables:</span>
                        {pkg.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2 text-xs text-[#C8D5EF]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-8">
                      <Link
                        href={`/project-calculator?division=website&package=${pkg.code}`}
                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 transition-all ${
                          isPopular
                            ? "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-lg shadow-[#087BFF]/30 hover:brightness-110"
                            : "bg-[#071638] hover:bg-[#087BFF]/20 text-white border border-[#00D9FF]/30 hover:border-[#00D9FF]"
                        }`}
                      >
                        <span>Select {pkg.code} in Calculator</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Website Add-ons Section */}
        <section className="py-16 bg-[#071638] border-y border-[#0A1940]">
          <Container className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Modular Power-Ups</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Website Add-On Modules
              </h2>
              <p className="text-xs sm:text-sm text-[#C8D5EF]">
                Enhance any website package with modular add-ons configured to your exact commercial needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {websiteAddons.slice(0, 8).map((addon) => (
                <div
                  key={addon.id}
                  className="p-5 rounded-2xl bg-[#0A1940] border border-white/5 hover:border-[#00D9FF]/40 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{addon.name}</span>
                      <span className="text-xs font-mono font-bold text-[#00D9FF]">
                        +{formatINR(addon.startingPrice)}
                      </span>
                    </div>
                    <p className="text-xs text-[#C8D5EF] leading-relaxed">
                      {addon.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    {addon.priceType.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-[#030B24]">
          <Container>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <HelpCircle className="w-6 h-6 text-[#00D9FF] mx-auto" />
                <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
                <p className="text-xs text-[#C8D5EF]">Everything you need to know about our web engineering process.</p>
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
