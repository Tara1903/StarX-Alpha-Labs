import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { 
  Globe, 
  Smartphone, 
  Layers, 
  ArrowRight, 
  ArrowUpRight,
  CheckCircle2, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  Zap, 
  TrendingUp,
  Cpu,
  Clock
} from "lucide-react";
import { getStarxFlowDestinationUrl } from "@/lib/ecosystem";
import { 
  WEBSITE_PACKAGES, 
  APP_PACKAGES, 
  COMBO_PACKAGES, 
  formatINR 
} from "@/data/developmentPackages";

export const metadata: Metadata = {
  title: "Development Services & Three Core Divisions — StarX Alpha Labs",
  description: "Explore our three dedicated engineering divisions: Website Development, Mobile App Development, and Website + App Combo Solutions with unified pricing in INR.",
};

export default function DevelopmentServicesPage() {
  const divisions = [
    {
      code: "DIVISION A",
      name: "Website Development",
      slug: "/website-development",
      accent: "from-[#087BFF] to-[#00D9FF]",
      borderAccent: "border-[#00D9FF]/40 hover:border-[#00D9FF]",
      glowColor: "rgba(0, 217, 255, 0.15)",
      badgeColor: "bg-[#087BFF]/20 text-[#00D9FF] border-[#00D9FF]/30",
      icon: Globe,
      pricingRange: `${formatINR(7999)} – ${formatINR(99999)}+`,
      packagesCount: "6 Specialized Packages (W1–W6)",
      tagline: "High-speed, SEO-engineered websites, headless CMS storefronts & enterprise web applications.",
      keyCapabilities: [
        "Modern Next.js 16 & React 19 Frontend",
        "Mobile-first responsive fluid layouts",
        "Headless CMS for seamless client editing",
        "Instant WhatsApp & CRM lead capture",
        "100/100 Core Web Vitals speed optimization",
        "Full source code ownership & SSL setup",
      ],
      popularPackage: WEBSITE_PACKAGES.find((p) => p.code === "W2"),
    },
    {
      code: "DIVISION B",
      name: "Mobile App Development",
      slug: "/app-development",
      accent: "from-[#873BFF] to-[#E52BFF]",
      borderAccent: "border-[#E52BFF]/40 hover:border-[#E52BFF]",
      glowColor: "rgba(229, 43, 255, 0.15)",
      badgeColor: "bg-[#873BFF]/20 text-[#E52BFF] border-[#E52BFF]/30",
      icon: Smartphone,
      pricingRange: `${formatINR(19999)} – ${formatINR(149999)}+`,
      packagesCount: "5 Specialized Packages (A1–A5)",
      tagline: "Native & cross-platform iOS & Android mobile applications built for retention, speed, and scale.",
      keyCapabilities: [
        "Android & iOS (Flutter / React Native)",
        "Push notifications & deep linking",
        "Secure biometric login & Firebase/Supabase auth",
        "Offline caching & background synchronization",
        "Play Store & App Store deployment guidance",
        "Admin control console for content & users",
      ],
      popularPackage: APP_PACKAGES.find((p) => p.code === "A2"),
    },
    {
      code: "DIVISION C",
      name: "Website + App Combo",
      slug: "/website-app-combo",
      accent: "from-[#FF941F] via-[#FF35B8] to-[#087BFF]",
      borderAccent: "border-[#FF941F]/40 hover:border-[#FF941F]",
      glowColor: "rgba(255, 148, 31, 0.15)",
      badgeColor: "bg-[#FF941F]/20 text-[#FF941F] border-[#FF941F]/30",
      icon: Layers,
      pricingRange: `${formatINR(24999)} – ${formatINR(199999)}+`,
      packagesCount: "5 Complete Packages (C1–C5)",
      tagline: "The all-in-one business powerhouse. A synchronized website, mobile apps, and one central admin dashboard.",
      keyCapabilities: [
        "Synchronized database & unified backend",
        "Single Super Admin controls web & mobile",
        "Real savings up to ₹50,000 vs separate builds",
        "Integrated payment gateways & SMS/WhatsApp alerts",
        "Unified user accounts across all platforms",
        "Single contract, single team, zero friction",
      ],
      popularPackage: COMBO_PACKAGES.find((p) => p.code === "C2"),
    },
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
            <div className="max-w-4xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#071638]/70 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#00D9FF] animate-pulse" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#00D9FF] uppercase">
                  StarX Alpha Labs Engineering
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Three Specialized Divisions.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#873BFF]">
                  One Unified Standard.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#C8D5EF] max-w-2xl leading-relaxed">
                Whether you need a high-converting website, a scalable mobile application, or a fully synchronized
                web and mobile ecosystem, StarX Alpha Labs delivers production-grade architecture with transparent INR pricing.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <LinkButton
                  href="/project-calculator"
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white font-bold px-6 py-3 shadow-lg shadow-[#087BFF]/30"
                  leftIcon={<Calculator className="w-4 h-4" />}
                >
                  Interactive Project Calculator
                </LinkButton>

                <LinkButton
                  href="/pricing"
                  variant="secondary"
                  size="lg"
                  className="border border-[#00D9FF]/30 bg-[#071638]/70 hover:bg-[#0A1940] text-white px-6 py-3"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#00D9FF]" />}
                >
                  View All Package Pricing
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* The 3 Core Divisions Grid */}
        <section className="py-20 bg-[#030B24] relative">
          <Container className="space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">Core Business System</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Choose Your Development Pathway
              </h2>
              <p className="text-sm sm:text-base text-[#C8D5EF]">
                Select a division below to explore dedicated tiers, itemized technical inclusions, delivery timelines, and live demos.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {divisions.map((div) => {
                const Icon = div.icon;
                return (
                  <div
                    key={div.code}
                    className={`rounded-3xl p-8 bg-[#0A1940]/90 border transition-all duration-300 flex flex-col justify-between relative group hover:shadow-2xl ${div.borderAccent}`}
                    style={{
                      boxShadow: `0 8px 32px 0 ${div.glowColor}`,
                    }}
                  >
                    <div className="space-y-6">
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${div.badgeColor}`}>
                          {div.code}
                        </span>
                        <span className="text-xs font-mono text-[#C8D5EF] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
                          1–4 Wks
                        </span>
                      </div>

                      {/* Division Name & Icon */}
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${div.accent} flex items-center justify-center shrink-0 shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                            {div.name}
                          </h3>
                          <p className="text-xs font-mono text-[#00D9FF] mt-0.5">
                            {div.packagesCount}
                          </p>
                        </div>
                      </div>

                      {/* Pricing Callout */}
                      <div className="p-4 rounded-xl bg-[#071638] border border-white/5 space-y-1">
                        <span className="text-[11px] font-mono text-[#C8D5EF] uppercase">Starting Investment</span>
                        <div className="text-2xl font-extrabold text-white">
                          {div.pricingRange}
                        </div>
                      </div>

                      {/* Tagline */}
                      <p className="text-sm text-[#C8D5EF] leading-relaxed">
                        {div.tagline}
                      </p>

                      {/* Key Capabilities */}
                      <div className="space-y-2.5 pt-2 border-t border-white/5">
                        <span className="text-xs font-bold uppercase tracking-wider text-white">Included Capabilities:</span>
                        {div.keyCapabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2 text-xs text-[#C8D5EF]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B] shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-8">
                      <Link
                        href={div.slug}
                        className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 bg-gradient-to-r ${div.accent} text-white shadow-lg transition-transform group-hover:scale-[1.02]`}
                      >
                        <span>Explore {div.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Contextual Referral to STARX FLOW Independent Product */}
        <section className="py-12 bg-[#030B24] border-t border-[#0A1940]">
          <Container>
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0A1940]/90 border border-[#00D9FF]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00D9FF]">
                  Independent Commercial Product
                </span>
                <h4 className="text-lg font-bold text-white">
                  Looking for Ready-Made AI Business Automation Instead of Custom Coding?
                </h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  Explore <strong className="text-white">STARX FLOW</strong> for autonomous AI receptionists, 24/7 call answering, and WhatsApp pipelines ready to deploy.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={getStarxFlowDestinationUrl({ source: "starx_alpha_labs", campaign: "development_services_banner", feature: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#00D9FF] to-[#087BFF] text-white hover:brightness-110 shadow-lg flex items-center gap-1.5 transition-all whitespace-nowrap"
                >
                  <span>Explore STARX FLOW</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <Link href="/ecosystem" className="text-xs text-slate-400 hover:text-white px-2 py-1">
                  Ecosystem &rarr;
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Instant Project Calculator Teaser */}
        <section className="py-16 bg-[#071638] border-y border-[#0A1940] relative overflow-hidden">
          <Container>
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0A1940] to-[#071638] border border-[#00D9FF]/30 relative shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087BFF]/20 border border-[#00D9FF]/30 text-xs font-mono text-[#00D9FF]">
                  <Calculator className="w-3.5 h-3.5" />
                  Self-Service Estimation
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Need a Customized Solution with Instant Cost Breakdown?
                </h3>
                <p className="text-sm text-[#C8D5EF]">
                  Use our 7-step interactive project calculator to select base tiers, add custom modules, configure
                  cloud hosting and maintenance SLAs, and generate an official transparent quotation instantly.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <LinkButton
                  href="/project-calculator"
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#FF941F] to-[#FF35B8] hover:brightness-110 text-white font-bold px-8 py-4 shadow-xl shadow-[#FF941F]/20 text-center"
                >
                  Launch Calculator ↗
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
