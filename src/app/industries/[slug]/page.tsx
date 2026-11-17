import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { INDUSTRIES_DATA, getIndustryBySlug } from "@/data/industries";
import { DIVISIONS_DATA, getDivisionBySlug } from "@/data/divisions";
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Palette, 
  Layers, 
  Zap,
  ArrowUpRight
} from "lucide-react";

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
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry Not Found" };

  return {
    title: `${industry.name} Software & Digital Engineering — StarX Alpha Labs`,
    description: industry.overview,
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const relevantDivisions = (industry.recommendedDivisions || [])
    .map((divSlug) => getDivisionBySlug(divSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Industry Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[#0A1940]">
          {/* Ambient Radial Depth Glow */}
          <div 
            className="absolute top-1/4 right-1/4 -z-10 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none"
            style={{ backgroundColor: industry.accentColor }}
          />

          <Container>
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/industries" className="text-xs text-slate-400 hover:text-[#00D9FF] transition-colors flex items-center gap-1 font-mono">
                  <span>&larr;</span> All 12 Industries
                </Link>
                <span className="text-slate-600">/</span>
                <span 
                  className="px-3 py-1 text-xs font-mono font-bold rounded-full border"
                  style={{ 
                    borderColor: `${industry.accentColor}50`, 
                    color: industry.accentColor,
                    backgroundColor: `${industry.accentColor}15`
                  }}
                >
                  {industry.badge}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl sm:text-5xl">{industry.emoji}</span>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    {industry.name}
                  </h1>
                  <p 
                    className="text-base sm:text-lg font-semibold mt-1"
                    style={{ color: industry.accentColor }}
                  >
                    {industry.tagline}
                  </p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed max-w-3xl">
                {industry.overview}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <LinkButton
                  href={`/get-quote?industry=${industry.slug}`}
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-white font-extrabold px-6 shadow-[0_0_25px_rgba(0,217,255,0.3)] rounded-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Industry Proposal
                </LinkButton>

                <LinkButton
                  href={`/design-studio?industry=${industry.slug}`}
                  variant="outline"
                  size="lg"
                  className="border-[#00D9FF]/40 text-[#00D9FF] hover:bg-[#00D9FF]/10 font-bold px-6 rounded-full flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Explore Concepts in Design Studio</span>
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* Challenges vs Opportunities */}
        <section className="py-20 bg-[#071638] border-b border-white/5">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Challenges */}
              <div className="p-8 rounded-3xl bg-[#030B24]/80 border border-[#0A1940] space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Critical Industry Friction Points</h3>
                </div>
                <ul className="space-y-4">
                  {industry.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-3 text-sm text-[#C8D5EF] leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="p-8 rounded-3xl bg-[#030B24]/80 border border-[#0A1940] space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Digital Transformation Opportunities</h3>
                </div>
                <ul className="space-y-4">
                  {industry.opportunities.map((opp) => (
                    <li key={opp} className="flex items-start gap-3 text-sm text-[#C8D5EF] leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Solutions & Capabilities */}
        <section className="py-20 bg-[#030B24]">
          <Container className="space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF]">Bespoke Engineering</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Architectures We Engineer for {industry.name}
              </h2>
              <p className="text-sm text-slate-300">
                Custom platforms built around your real-world business constraints and compliance requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.featuredCapabilities.map((cap, idx) => (
                <div
                  key={cap}
                  className="p-6 rounded-2xl bg-[#071638]/90 border border-[#0A1940] hover:border-[#00D9FF]/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                      <Zap className="w-4 h-4 text-[#00D9FF]" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cap}
                    </h3>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Production Architecture
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Relevant Divisions & Tech Stack */}
        <section className="py-16 bg-[#071638] border-y border-white/5">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Relevant Divisions */}
              <div className="lg:col-span-7 space-y-5">
                <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#00D9FF]" />
                  <span>Recommended StarX Divisions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relevantDivisions.map((div) => {
                    if (!div) return null;
                    return (
                      <Link
                        key={div.slug}
                        href={`/divisions/${div.slug}`}
                        className="p-4 rounded-2xl bg-[#030B24] border border-[#0A1940] hover:border-[#00D9FF]/50 transition-all group flex flex-col justify-between space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#00D9FF]">{div.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2">
                          {div.tagline}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Technologies */}
              <div className="lg:col-span-5 space-y-5">
                <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#E52BFF]" />
                  <span>Engineered With</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {industry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[#030B24] border border-white/10 text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-[#030B24] border border-white/5 space-y-2 mt-4">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00C98B]" />
                    <span>Domain Compliance</span>
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    All software engineered for {industry.name} is designed with relevant compliance, security audits, and dedicated enterprise SLA support.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Conversion CTA */}
        <section className="py-24 bg-[#030B24] relative overflow-hidden">
          <Container>
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#071638] via-[#0A1940] to-[#071638] border border-[#00D9FF]/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D9FF]">Initiate Engagement</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Transform Your {industry.name} Operations
                </h2>
                <p className="text-sm text-slate-300">
                  Collaborate directly with our senior software architects to scope, design, and deliver your proprietary technology solution.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <LinkButton
                  href={`/get-quote?industry=${industry.slug}`}
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#E52BFF] to-[#087BFF] hover:brightness-110 text-white font-extrabold px-8 shadow-xl rounded-full"
                >
                  Request Itemized Proposal
                </LinkButton>
                <LinkButton
                  href={`/design-studio?industry=${industry.slug}`}
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-slate-200 hover:text-white hover:bg-white/5 font-semibold px-6 rounded-full"
                >
                  Launch Design Studio
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
