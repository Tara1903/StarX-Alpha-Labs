import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowRight, CheckCircle2, Code2, Cpu, Layers, ShieldAlert, Terminal } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_DATA.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study | STARX LABS`,
    description: project.description,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow">
        {/* Header */}
        <section className="py-20 md:py-24 relative overflow-hidden border-b border-[#19375E]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#32A9E8]/15 blur-[120px]" />
          <Container>
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/portfolio" className="text-xs text-slate-400 hover:text-white">
                  &larr; All Showcases
                </Link>
                <span className="text-slate-600">/</span>
                <Badge variant="electric" size="sm">{project.projectType}</Badge>
              </div>

              <h1 className="text-display font-extrabold text-white leading-tight">
                {project.title}
              </h1>

              <p className="text-xl font-medium text-[#32A9E8]">
                {project.tagline}
              </p>

              <p className="text-base text-slate-300 font-light leading-relaxed">
                {project.description}
              </p>
            </div>
          </Container>
        </section>

        {/* Technical Architecture Deep Dive */}
        <section className="py-20 bg-[#0F2038] border-b border-[#19375E]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Badge variant="corporate">Architecture</Badge>
                <h2 className="text-2xl font-bold text-white">System Architecture Highlights</h2>
                <div className="space-y-3">
                  {project.architectureHighlights.map((highlight) => (
                    <div key={highlight} className="p-4 rounded-xl bg-[#0A1424] border border-[#19375E] flex items-start gap-3">
                      <Terminal className="w-4 h-4 text-[#32A9E8] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Badge variant="electric">Capabilities</Badge>
                <h2 className="text-2xl font-bold text-white">Functional Specifications</h2>
                <div className="space-y-3">
                  {project.features.map((feat) => (
                    <div key={feat} className="p-4 rounded-xl bg-[#0A1424] border border-[#19375E] flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#16866A] shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Technology Stack Deployed */}
        <section className="py-20 bg-[#F4F8FC] text-[#172B43] theme-corporate-light border-b border-[#DDE7F0]">
          <Container className="max-w-4xl space-y-8">
            <div className="space-y-2">
              <Badge variant="corporate" dot>Verified Toolchain</Badge>
              <h2 className="text-2xl font-bold text-[#102D50]">Technologies Deployed in This Showcase</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <div key={tech} className="px-4 py-2 rounded-xl bg-white border border-[#DDE7F0] shadow-corporate-card font-mono text-xs font-bold text-[#102D50]">
                  {tech}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Project Enquiry Banner */}
        <section className="py-20 bg-[#0A1424] text-center">
          <Container className="max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold text-white">Need Similar Architecture For Your Business?</h2>
            <p className="text-xs text-slate-300">
              Our architects will assess your specifications and recommend an optimal technology stack and roadmap.
            </p>
            <div className="flex justify-center gap-4">
              <LinkButton href="/get-quote" variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request Scoping Consultation
              </LinkButton>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
