import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { DIVISIONS_DATA } from "@/data/divisions";
import { 
  Globe, 
  Smartphone, 
  Briefcase, 
  Cloud, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Palette, 
  ShieldCheck,
  Zap
} from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Divisions — StarX Alpha Labs",
  description: "Explore the six specialized engineering divisions of StarX Alpha Labs: StarX Web, StarX Apps, StarX Business, StarX SaaS, StarX AI, and StarX Custom.",
};

export default function DivisionsOverviewPage() {
  const getIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-6 h-6" style={{ color }} />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6" style={{ color }} />;
      case "Briefcase":
        return <Briefcase className="w-6 h-6" style={{ color }} />;
      case "Cloud":
        return <Cloud className="w-6 h-6" style={{ color }} />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" style={{ color }} />;
      case "Cpu":
      default:
        return <Cpu className="w-6 h-6" style={{ color }} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Divisions Header */}
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[#0A1940]">
          {/* Cyan Glow */}
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#00D9FF]/12 blur-[140px]" />
          
          <Container>
            <div className="max-w-3xl space-y-4">
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                Six Specialized Units
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                One Unified Company. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
                  Six Engineering Divisions.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed">
                To combine deep domain specialization with seamless cross-platform integration, StarX Alpha Labs operates across six dedicated engineering divisions. Commission a single division or an integrated multi-division solution.
              </p>
            </div>
          </Container>
        </section>

        {/* 6 Divisions Grid */}
        <section className="py-20 bg-[#030B24]">
          <Container className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DIVISIONS_DATA.map((division) => (
                <div
                  key={division.slug}
                  className="p-8 rounded-3xl bg-[#071638]/90 border border-[#0A1940] hover:border-[#00D9FF]/50 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl hover:-translate-y-1 group"
                >
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 backdrop-blur-md"
                        style={{ 
                          borderColor: `${division.accentColor}40`, 
                          backgroundColor: `${division.accentColor}15` 
                        }}
                      >
                        {getIcon(division.iconName, division.accentColor)}
                      </div>
                      <span 
                        className="px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full border uppercase"
                        style={{ 
                          borderColor: `${division.accentColor}40`, 
                          color: division.accentColor,
                          backgroundColor: `${division.accentColor}10` 
                        }}
                      >
                        {division.badge}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight group-hover:text-[#00D9FF] transition-colors">
                        {division.name}
                      </h2>
                      <p className="text-xs font-semibold text-slate-400 mt-1 line-clamp-1">
                        {division.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-[#C8D5EF] leading-relaxed line-clamp-3">
                      {division.shortDescription}
                    </p>

                    {/* Capabilities preview */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Core Focus Areas
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {division.capabilities.slice(0, 3).map((cap) => (
                          <li key={cap.title} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#00D9FF]" />
                            <span className="truncate">{cap.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={`/divisions/${division.slug}`}
                      className="text-xs font-bold text-[#00D9FF] hover:underline flex items-center gap-1 group/link"
                    >
                      <span>Explore Division</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={`/design-studio?division=${division.slug}`}
                      className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Palette className="w-3 h-3 text-[#E52BFF]" />
                      <span>Design Studio</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Cross-Division Collaboration Banner */}
            <div className="p-8 rounded-3xl bg-[#071638] border border-[#0A1940] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl text-center md:text-left">
                <h3 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#00D9FF]" />
                  <span>Integrated Multi-Division Solutions</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need a complete web application (StarX Web) with synchronized mobile apps (StarX Apps) and embedded AI automation (StarX AI)? We engineer unified architectures sharing a single database and API layer.
                </p>
              </div>

              <div className="shrink-0 flex gap-3">
                <LinkButton
                  href="/get-quote"
                  variant="primary"
                  size="md"
                  className="bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-white font-bold px-6 rounded-full"
                >
                  Request Custom Scope
                </LinkButton>
                <LinkButton
                  href="/project-calculator"
                  variant="outline"
                  size="md"
                  className="border-white/20 text-slate-300 hover:text-white hover:bg-white/5 font-semibold px-4 rounded-full"
                >
                  Estimate Budget
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
