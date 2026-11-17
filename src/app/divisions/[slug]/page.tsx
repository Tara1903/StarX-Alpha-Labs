import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { DIVISIONS_DATA, getDivisionBySlug } from "@/data/divisions";
import { 
  Globe, 
  Smartphone, 
  Briefcase, 
  Cloud, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Palette, 
  FileText, 
  MessageSquare, 
  ShieldCheck, 
  Zap,
  ArrowUpRight
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DIVISIONS_DATA.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivisionBySlug(slug);
  if (!division) return { title: "Division Not Found" };

  return {
    title: `${division.name} — ${division.tagline} | StarX Alpha Labs`,
    description: division.overview,
  };
}

export default async function DivisionDetailPage({ params }: Props) {
  const { slug } = await params;
  const division = getDivisionBySlug(slug);

  if (!division) {
    notFound();
  }

  const getDivisionIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-8 h-8 text-[#00D9FF]" />;
      case "Smartphone":
        return <Smartphone className="w-8 h-8 text-[#E52BFF]" />;
      case "Briefcase":
        return <Briefcase className="w-8 h-8 text-[#FF941F]" />;
      case "Cloud":
        return <Cloud className="w-8 h-8 text-[#087BFF]" />;
      case "Sparkles":
        return <Sparkles className="w-8 h-8 text-[#873BFF]" />;
      case "Cpu":
      default:
        return <Cpu className="w-8 h-8 text-[#FF35B8]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white">
      <Navbar />

      <main className="grow pt-24 sm:pt-28">
        {/* Division Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[#0A1940]">
          {/* Ambient Glow */}
          <div 
            className="absolute top-1/4 right-1/4 -z-10 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 pointer-events-none"
            style={{ backgroundColor: division.accentColor }}
          />

          <Container>
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/divisions" className="text-xs text-slate-400 hover:text-[#00D9FF] transition-colors flex items-center gap-1 font-mono">
                  <span>&larr;</span> All Divisions
                </Link>
                <span className="text-slate-600">/</span>
                <span 
                  className="px-3 py-1 text-xs font-mono font-bold rounded-full border"
                  style={{ 
                    borderColor: `${division.accentColor}50`, 
                    color: division.accentColor,
                    backgroundColor: `${division.accentColor}15`
                  }}
                >
                  {division.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  • {division.indicativePrice}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl border flex items-center justify-center shrink-0 backdrop-blur-xl shadow-xl"
                  style={{ 
                    borderColor: `${division.accentColor}40`, 
                    backgroundColor: `${division.accentColor}12`
                  }}
                >
                  {getDivisionIcon(division.iconName)}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    {division.name}
                  </h1>
                  <p 
                    className="text-base sm:text-lg font-semibold mt-1"
                    style={{ color: division.accentColor }}
                  >
                    {division.tagline}
                  </p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed max-w-3xl">
                {division.overview}
              </p>

              {/* Action Pathways */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <LinkButton
                  href={`/get-quote?division=${division.slug}`}
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#00D9FF] to-[#087BFF] hover:brightness-110 text-white font-extrabold px-6 shadow-[0_0_25px_rgba(0,217,255,0.3)] rounded-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Scoped Quotation
                </LinkButton>

                <LinkButton
                  href={`/design-studio?division=${division.slug}`}
                  variant="outline"
                  size="lg"
                  className="border-[#00D9FF]/40 text-[#00D9FF] hover:bg-[#00D9FF]/10 font-bold px-6 rounded-full flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Explore in Design Studio</span>
                </LinkButton>
              </div>
            </div>
          </Container>
        </section>

        {/* Mission Statement */}
        <section className="py-12 bg-[#071638] border-b border-white/5">
          <Container>
            <div className="p-6 md:p-8 rounded-2xl bg-[#030B24]/70 border border-[#0A1940] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1 max-w-2xl">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#00D9FF]">Division Mandate</span>
                <p className="text-sm md:text-base font-medium text-white italic">
                  &ldquo;{division.mission}&rdquo;
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#071638] px-4 py-2 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#00D9FF]" />
                <span>100% Code Ownership</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Core Capabilities */}
        <section className="py-20 bg-[#030B24]">
          <Container className="space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF]">Technical Competencies</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                What We Engineer in {division.name}
              </h2>
              <p className="text-sm text-slate-300">
                Purpose-fit architectures designed for production resilience and business scalability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {division.capabilities.map((cap, idx) => (
                <div
                  key={cap.title}
                  className="p-6 rounded-2xl bg-[#071638]/90 border border-[#0A1940] hover:border-[#00D9FF]/50 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-xl hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                      <Zap className="w-4 h-4 text-[#00D9FF]" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Deliverables & Tech Stack */}
        <section className="py-16 bg-[#071638] border-y border-white/5">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Deliverables */}
              <div className="lg:col-span-7 space-y-5">
                <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#00D9FF]" />
                  <span>Standard Engineering Deliverables</span>
                </h3>
                <ul className="space-y-3">
                  {division.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="lg:col-span-5 space-y-5">
                <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#E52BFF]" />
                  <span>Engineered With</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {division.techStack.map((tech) => (
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
                    <span>Quality Guarantee</span>
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Every project includes automated CI/CD deployment pipelines, strict TypeScript contracts, comprehensive documentation, and a 30-day post-launch warranty.
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
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D9FF]">Start Your Project</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Ready to Engineer with {division.name}?
                </h2>
                <p className="text-sm text-slate-300">
                  Submit your technical requirements for an itemized proposal or collaborate with our architects inside the StarX Design Studio.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <LinkButton
                  href={`/get-quote?division=${division.slug}`}
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-[#E52BFF] to-[#087BFF] hover:brightness-110 text-white font-extrabold px-8 shadow-xl rounded-full"
                >
                  Request Official Quotation
                </LinkButton>
                <LinkButton
                  href="/book-consultation"
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-slate-200 hover:text-white hover:bg-white/5 font-semibold px-6 rounded-full"
                >
                  Book Architecture Consultation
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
