import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/LinkButton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ArrowRight, CheckCircle2, Shield, Cpu, Code2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Engineering Philosophy & Mission",
  description: "Learn about STARX LABS: our engineering thesis, architectural principles, and commitment to building premier digital solutions for enterprise leaders.",
};

export default function AboutPage() {
  const leadershipPrinciples = [
    {
      title: "Zero-Compromise Code Quality",
      description: "We enforce strict type checking, immutable component boundaries, and automated linting across every tier of our stack.",
    },
    {
      title: "Full Intellectual Property Transfer",
      description: "Our clients retain 100% ownership of custom source code, database architectures, and production assets. No proprietary vendor lock-in.",
    },
    {
      title: "Measurable Business Outcomes",
      description: "Every line of software is engineered to solve a concrete business problem: accelerating revenue, automating overhead, or securing transactions.",
    },
    {
      title: "Architectural Honesty",
      description: "We don't fabricate customer numbers or deploy hype-driven technologies where simple, resilient architectures perform best.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow">
        {/* Header Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden border-b border-[#19375E]">
          <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#1769AA]/15 blur-[120px]" />
          <Container>
            <div className="max-w-3xl space-y-4">
              <Badge variant="electric" dot>About STARX LABS</Badge>
              <h1 className="text-display font-extrabold text-white">
                Engineered for High-Stakes Digital Demands.
              </h1>
              <p className="text-body text-slate-300">
                STARX LABS was founded on a simple realization: modern businesses are weary of slow, bloated
                templates and brittle off-the-shelf software. We build bespoke digital software that operates with
                architectural precision.
              </p>
            </div>
          </Container>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-[#0F2038] border-b border-[#19375E]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-[#0A1424] border border-[#19375E] space-y-4">
                <Badge variant="corporate">Our Mission</Badge>
                <h2 className="text-2xl font-bold text-white">Deliver Software That Empowers Scalable Growth</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To provide growing enterprises and market leaders with handcrafted software architectures,
                  resilient cloud platforms, and tailored artificial intelligence capabilities that deliver tangible
                  commercial advantages.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#0A1424] border border-[#19375E] space-y-4">
                <Badge variant="electric">Our Vision</Badge>
                <h2 className="text-2xl font-bold text-white">The Gold Standard of Digital Engineering</h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To establish a premier global benchmark where cinematic visual computing meets robust
                  enterprise infrastructure — software that looks extraordinary, executes instantaneously, and scales
                  without technical debt.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Technology Philosophy */}
        <section className="py-24 bg-[#F4F8FC] text-[#172B43] theme-corporate-light border-b border-[#DDE7F0]">
          <Container>
            <div className="max-w-3xl mb-12 space-y-3">
              <Badge variant="corporate" dot>Our Philosophy</Badge>
              <h2 className="text-h2 font-bold text-[#102D50]">Core Engineering Commitments</h2>
              <p className="text-body text-[#64748B]">
                How we think, write code, and deliver digital platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {leadershipPrinciples.map((item) => (
                <div key={item.title} className="p-6 rounded-xl bg-white border border-[#DDE7F0] shadow-corporate-card space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#102D50]">
                    <CheckCircle2 className="w-4 h-4 text-[#16866A]" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-[#0A1424] text-center">
          <Container className="max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold text-white">Experience Architectural Excellence</h2>
            <p className="text-sm text-slate-300">
              Speak directly with our engineering team regarding your project scope, technical requirements, and target timeline.
            </p>
            <div className="flex justify-center gap-4">
              <LinkButton href="/get-quote" variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request a Project Proposal
              </LinkButton>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
