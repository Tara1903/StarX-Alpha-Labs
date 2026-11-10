import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  Zap, 
  ShieldCheck, 
  Clock, 
  HelpCircle,
  Apple,
  Play,
  Layers
} from "lucide-react";
import { 
  APP_PACKAGES, 
  DEVELOPMENT_ADDONS, 
  formatINR 
} from "@/data/developmentPackages";

export const metadata: Metadata = {
  title: "Mobile App Development Packages (A1–A5) — StarX Alpha Labs",
  description: "Explore our 5 mobile application development packages from ₹19,999 to ₹1,49,999+. Android, iOS, cross-platform Flutter/React Native with transparent INR pricing.",
};

export default function AppDevelopmentPage() {
  const appAddons = DEVELOPMENT_ADDONS.filter(
    (a) => a.applicableTo === "all" || a.applicableTo.includes("app")
  );

  const faqs = [
    {
      q: "Do you publish the apps to Google Play Store and Apple App Store?",
      a: "Yes. We manage the entire store release submission pipeline, including asset generation, app bundles (AAB / IPA), privacy policies, content ratings, and resolving review compliance criteria."
    },
    {
      q: "Do you develop native or cross-platform applications?",
      a: "We specialize in high-performance cross-platform frameworks (Flutter & React Native) allowing you to launch seamlessly on both Android and iOS from a single robust codebase, cutting maintenance costs by up to 50%. We also build dedicated Swift / Kotlin native modules when deep hardware integration requires it."
    },
    {
      q: "Does the app come with an Admin Dashboard to manage users and content?",
      a: "Yes. From Package A2 onwards, an intuitive web-based Admin Dashboard is included so your team can manage customers, view orders/bookings, send push notifications, and monitor live analytics without touching code."
    },
    {
      q: "Can the mobile app work offline?",
      a: "Yes. We implement local SQLite/WatermelonDB caching with optimistic UI updates and background synchronization so users can continue browsing and working even in low-connectivity environments."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-[#FFFFFF] selection:bg-[#873BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden border-b border-[#0A1940]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#873BFF]/20 blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 -z-10 h-80 w-80 rounded-full bg-[#E52BFF]/15 blur-[120px]" />

          <Container>
            <div className="max-w-4xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E52BFF]/30 bg-[#071638]/70 backdrop-blur-md">
                <Smartphone className="w-3.5 h-3.5 text-[#E52BFF]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#E52BFF] uppercase">
                  DIVISION B • MOBILE APP ENGINEERING
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Mobile App Development.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E52BFF] via-[#873BFF] to-[#00D9FF]">
                  Android, iOS &amp; Cross-Platform.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#C8D5EF] max-w-2xl leading-relaxed">
                From lightweight utility apps to full-scale on-demand marketplace applications with rider/partner tracking,
                instant push notifications, and real-time backend synchronization.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <LinkButton
                  href="/project-calculator?division=app"
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#873BFF] to-[#E52BFF] hover:brightness-110 text-white font-bold px-6 py-3 shadow-lg shadow-[#873BFF]/30"
                  leftIcon={<Calculator className="w-4 h-4" />}
                >
                  Configure Mobile App Quote
                </LinkButton>

                <LinkButton
                  href="/demos"
                  variant="secondary"
                  size="lg"
                  className="border border-[#E52BFF]/30 bg-[#071638]/70 hover:bg-[#0A1940] text-white px-6 py-3"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#E52BFF]" />}
                >
                  Explore App Demos
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* 5 Structured Packages Grid (A1–A5) */}
        <section className="py-20 bg-[#030B24] relative">
          <Container className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E52BFF]">Transparent Pricing in INR (₹)</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Five Mobile Application Tiers
              </h2>
              <p className="text-sm sm:text-base text-[#C8D5EF]">
                Built with Flutter or React Native for maximum performance, buttery-smooth 60fps animations, and unified store deployments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {APP_PACKAGES.map((pkg) => {
                const isPopular = pkg.popular;
                return (
                  <div
                    key={pkg.code}
                    className={`rounded-3xl p-8 bg-[#0A1940] border transition-all duration-300 flex flex-col justify-between relative group ${
                      isPopular 
                        ? "border-[#E52BFF] shadow-[0_0_35px_rgba(229,43,255,0.22)] ring-1 ring-[#E52BFF]/40" 
                        : "border-white/10 hover:border-[#E52BFF]/50"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#873BFF] to-[#E52BFF] text-white text-[11px] font-mono font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                        Best Value for Growth
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Code & Scope */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#873BFF]/20 text-[#E52BFF] border border-[#E52BFF]/30">
                          {pkg.code}
                        </span>
                        <span className="text-xs font-mono text-[#C8D5EF] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#E52BFF]" />
                          {pkg.timeline}
                        </span>
                      </div>

                      {/* Package Name & Tagline */}
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#E52BFF] transition-colors">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-[#C8D5EF] mt-1 leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Platforms Badge */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {pkg.platforms.map((plat) => (
                          <span key={plat} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#071638] text-slate-300 border border-white/5">
                            {plat}
                          </span>
                        ))}
                      </div>

                      {/* Price Display */}
                      <div className="p-4 rounded-xl bg-[#071638] border border-white/5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8D5EF]">Starting From</span>
                        <div className="text-3xl font-extrabold text-white mt-0.5">
                          {formatINR(pkg.startingPrice)}
                        </div>
                        <span className="text-xs text-[#E52BFF] font-medium block mt-1">
                          {pkg.pagesOrScreens}
                        </span>
                      </div>

                      {/* Ideal For */}
                      <div className="text-xs text-slate-300 italic border-l-2 border-[#E52BFF]/60 pl-3">
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
                        href={`/project-calculator?division=app&package=${pkg.code}`}
                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 transition-all ${
                          isPopular
                            ? "bg-gradient-to-r from-[#873BFF] to-[#E52BFF] text-white shadow-lg shadow-[#873BFF]/30 hover:brightness-110"
                            : "bg-[#071638] hover:bg-[#873BFF]/20 text-white border border-[#E52BFF]/30 hover:border-[#E52BFF]"
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

        {/* Mobile App Add-ons Section */}
        <section className="py-16 bg-[#071638] border-y border-[#0A1940]">
          <Container className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E52BFF]">Mobile Power-Ups</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                App Add-On Modules
              </h2>
              <p className="text-xs sm:text-sm text-[#C8D5EF]">
                Plug in automated push campaigns, in-app billing, biometric authentication, and custom cloud functions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {appAddons.slice(0, 8).map((addon) => (
                <div
                  key={addon.id}
                  className="p-5 rounded-2xl bg-[#0A1940] border border-white/5 hover:border-[#E52BFF]/40 transition-colors flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{addon.name}</span>
                      <span className="text-xs font-mono font-bold text-[#E52BFF]">
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
                <HelpCircle className="w-6 h-6 text-[#E52BFF] mx-auto" />
                <h3 className="text-2xl font-bold text-white">App Engineering FAQs</h3>
                <p className="text-xs text-[#C8D5EF]">Key details on store submissions, platform compatibility, and updates.</p>
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
