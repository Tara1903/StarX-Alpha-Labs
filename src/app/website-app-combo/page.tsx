import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  Zap, 
  ShieldCheck, 
  Clock, 
  HelpCircle,
  Database,
  Smartphone,
  Globe,
  Tag
} from "lucide-react";
import { 
  COMBO_PACKAGES, 
  DEVELOPMENT_ADDONS, 
  formatINR 
} from "@/data/developmentPackages";

export const metadata: Metadata = {
  title: "Website + App Combo Packages (C1–C5) — StarX Alpha Labs",
  description: "Synchronized dual-platform website and mobile app solutions from ₹24,999 to ₹1,99,999+. Single database, unified Super Admin, and real savings up to ₹50,000.",
};

export default function WebsiteAppComboPage() {
  const faqs = [
    {
      q: "How does the synchronized database work between the website and apps?",
      a: "Both your website and mobile apps connect to a single high-availability Supabase/PostgreSQL database and REST/GraphQL API layer. When you update a product, publish an article, or change pricing in your Super Admin panel, the change reflects in real-time across your website and both mobile apps instantly."
    },
    {
      q: "Why is a Combo package cheaper than building them separately?",
      a: "Building a website and app separately requires writing two distinct backends, two authentication systems, and double the API integrations. With our Combo architecture, we architect a shared backend and API layer once, passing significant engineering efficiency directly to you as instant savings up to ₹50,000."
    },
    {
      q: "Do customer accounts work across both the website and the app?",
      a: "Yes! Your customers use the exact same phone number or email and password to log in on the website or mobile app. Their carts, order history, profile, and saved preferences are completely synchronized."
    },
    {
      q: "Can I manage everything from a single Admin Panel?",
      a: "Yes. You receive one unified Super Admin Console where you can oversee web traffic, app installations, customer enquiries, orders, invoices, and push notification campaigns from one login."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-[#FFFFFF] selection:bg-[#FF941F] selection:text-white">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden border-b border-[#0A1940]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#FF941F]/18 blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#FF35B8]/15 blur-[120px]" />

          <Container>
            <div className="max-w-4xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF941F]/30 bg-[#071638]/70 backdrop-blur-md">
                <Layers className="w-3.5 h-3.5 text-[#FF941F]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#FF941F] uppercase">
                  DIVISION C • SYNCHRONIZED COMBO ARCHITECTURE
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Website + App Combo.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF941F] via-[#FF35B8] to-[#087BFF]">
                  One Database. Complete Domination.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#C8D5EF] max-w-2xl leading-relaxed">
                Launch a high-performance website and dual-platform mobile apps simultaneously.
                Eliminate duplicate agency costs, maintain zero data desynchronization, and save up to ₹50,000 on upfront development.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <LinkButton
                  href="/project-calculator?division=combo"
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#FF941F] to-[#FF35B8] hover:brightness-110 text-white font-bold px-6 py-3 shadow-lg shadow-[#FF941F]/30"
                  leftIcon={<Calculator className="w-4 h-4" />}
                >
                  Configure Custom Combo Quote
                </LinkButton>

                <LinkButton
                  href="/pricing"
                  variant="secondary"
                  size="lg"
                  className="border border-[#FF941F]/30 bg-[#071638]/70 hover:bg-[#0A1940] text-white px-6 py-3"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#FF941F]" />}
                >
                  Compare All Combo Tiers
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* Why Combo Architecture Visual Block */}
        <section className="py-12 bg-[#071638] border-b border-[#0A1940]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0A1940] border border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#087BFF]/20 text-[#00D9FF] flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Unified Web Frontend</h3>
                <p className="text-xs text-[#C8D5EF] leading-relaxed">
                  Next.js 16 high-speed responsive website engineered for organic Google search dominance and desktop conversions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0A1940] border border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#873BFF]/20 text-[#E52BFF] flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Dual Mobile Apps</h3>
                <p className="text-xs text-[#C8D5EF] leading-relaxed">
                  Fast Flutter / React Native iOS & Android apps with push notifications, biometric auth, and offline caching.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0A1940] border border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF941F]/20 text-[#FF941F] flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Single Super Admin</h3>
                <p className="text-xs text-[#C8D5EF] leading-relaxed">
                  One unified control console. Update content, manage orders, and check analytics once — synced everywhere in real time.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 5 Combo Packages Grid (C1–C5) */}
        <section className="py-20 bg-[#030B24] relative">
          <Container className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF941F]">Synchronized Business Suites</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Five Dual-Platform Combo Tiers
              </h2>
              <p className="text-sm sm:text-base text-[#C8D5EF]">
                Every combo tier includes guaranteed real cost savings compared to commissioning separate web and mobile contracts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COMBO_PACKAGES.map((pkg) => {
                const isBestValue = pkg.bestValue || pkg.popular;
                return (
                  <div
                    key={pkg.code}
                    className={`rounded-3xl p-8 bg-[#0A1940] border transition-all duration-300 flex flex-col justify-between relative group ${
                      isBestValue 
                        ? "border-[#FF941F] shadow-[0_0_35px_rgba(255,148,31,0.22)] ring-1 ring-[#FF941F]/40" 
                        : "border-white/10 hover:border-[#FF941F]/50"
                    }`}
                  >
                    {isBestValue && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF941F] to-[#FF35B8] text-white text-[11px] font-mono font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                        Maximum ROI &amp; Savings
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Code & Scope */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#FF941F]/20 text-[#FF941F] border border-[#FF941F]/30">
                          {pkg.code}
                        </span>
                        <span className="text-xs font-mono text-[#C8D5EF] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#FF941F]" />
                          {pkg.timeline}
                        </span>
                      </div>

                      {/* Package Name & Tagline */}
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#FF941F] transition-colors">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-[#C8D5EF] mt-1 leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Real Savings Highlight */}
                      {pkg.savings && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#FF941F]/10 border border-[#FF941F]/30 text-xs text-[#FF941F] font-semibold">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Includes {formatINR(pkg.savings)} Instant Savings!</span>
                        </div>
                      )}

                      {/* Platforms Badge */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {pkg.platforms.map((plat) => (
                          <span key={plat} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#071638] text-slate-300 border border-white/5">
                            {plat}
                          </span>
                        ))}
                      </div>

                      {/* Price Display */}
                      <div className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-1">
                        <div className="flex items-baseline justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8D5EF]">Combo Price</span>
                          {pkg.standaloneValue && (
                            <span className="text-xs text-slate-400 line-through font-mono">
                              {formatINR(pkg.standaloneValue)}
                            </span>
                          )}
                        </div>
                        <div className="text-3xl font-extrabold text-white">
                          {formatINR(pkg.startingPrice)}
                        </div>
                        <span className="text-xs text-[#FF941F] font-medium block">
                          {pkg.pagesOrScreens}
                        </span>
                      </div>

                      {/* Ideal For */}
                      <div className="text-xs text-slate-300 italic border-l-2 border-[#FF941F]/60 pl-3">
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
                        href={`/project-calculator?division=combo&package=${pkg.code}`}
                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 transition-all ${
                          isBestValue
                            ? "bg-gradient-to-r from-[#FF941F] to-[#FF35B8] text-white shadow-lg shadow-[#FF941F]/30 hover:brightness-110"
                            : "bg-[#071638] hover:bg-[#FF941F]/20 text-white border border-[#FF941F]/30 hover:border-[#FF941F]"
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

        {/* FAQs */}
        <section className="py-20 bg-[#071638] border-t border-[#0A1940]">
          <Container>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <HelpCircle className="w-6 h-6 text-[#FF941F] mx-auto" />
                <h3 className="text-2xl font-bold text-white">Combo Development FAQs</h3>
                <p className="text-xs text-[#C8D5EF]">Common questions about synchronizing your web &amp; mobile assets.</p>
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
