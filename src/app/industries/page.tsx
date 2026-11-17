import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { INDUSTRIES_DATA } from "@/data/industries";
import { ArrowRight, CheckCircle2, Building2, Palette, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries Served — StarX Alpha Labs",
  description: "Specialized digital engineering and custom software architectures tailored across 12 core industry sectors.",
};

export default function IndustriesOverviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Industries Header */}
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[#0A1940]">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#00D9FF]/12 blur-[140px]" />
          
          <Container>
            <div className="max-w-3xl space-y-4">
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                12 Canonical Sectors
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Domain-Specific Software. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
                  Engineered for Industry Realities.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed">
                Generic software fails because every sector operates under distinct regulatory obligations, fulfillment constraints, and customer expectations. We engineer purpose-fit technology architectures tailored for 12 key industries.
              </p>
            </div>
          </Container>
        </section>

        {/* 12 Industries Grid */}
        <section className="py-20 bg-[#030B24]">
          <Container className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INDUSTRIES_DATA.map((ind) => (
                <div
                  key={ind.slug}
                  className="p-8 rounded-3xl bg-[#071638]/90 border border-[#0A1940] hover:border-[#00D9FF]/50 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl hover:-translate-y-1 group"
                >
                  <div className="space-y-4">
                    {/* Top Tag & Emoji */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{ind.emoji}</span>
                      <span 
                        className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full border uppercase"
                        style={{ 
                          borderColor: `${ind.accentColor}40`, 
                          color: ind.accentColor,
                          backgroundColor: `${ind.accentColor}10` 
                        }}
                      >
                        {ind.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-[#00D9FF] transition-colors">
                        {ind.name}
                      </h2>
                      <p className="text-xs font-semibold text-slate-400 mt-1 line-clamp-1">
                        {ind.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-[#C8D5EF] leading-relaxed line-clamp-3">
                      {ind.overview}
                    </p>

                    {/* Featured Capabilities */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Key Capabilities
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {ind.featuredCapabilities.slice(0, 3).map((cap) => (
                          <li key={cap} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#00D9FF]" />
                            <span className="truncate">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="text-xs font-bold text-[#00D9FF] hover:underline flex items-center gap-1 group/link"
                    >
                      <span>Industry Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={`/design-studio?industry=${ind.slug}`}
                      className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Palette className="w-3 h-3 text-[#E52BFF]" />
                      <span>Design Concepts</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Design Studio Callout */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#071638] via-[#0A1940] to-[#071638] border border-[#00D9FF]/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl text-center md:text-left">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D9FF]">Interactive Exploration</span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Have an Industry Challenge in Mind?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use the StarX Design Studio to generate bespoke wireframes, explore AI-assisted product designs, or schedule a technical discovery call with our solutions architects.
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap gap-3">
                <LinkButton
                  href="/design-studio"
                  variant="primary"
                  size="md"
                  className="bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-white font-extrabold px-6 rounded-full"
                >
                  Open Design Studio
                </LinkButton>
                <LinkButton
                  href="/book-consultation"
                  variant="outline"
                  size="md"
                  className="border-white/20 text-slate-300 hover:text-white hover:bg-white/5 font-semibold px-4 rounded-full"
                >
                  Book Discovery Call
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
