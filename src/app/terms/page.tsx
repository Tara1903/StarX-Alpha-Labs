import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/lib/constants";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service (Draft) — STARX LABS",
  description: "Draft operational terms of service governing software development agreements, milestone sign-offs, and intellectual property transfer.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow py-20">
        <Container className="max-w-4xl space-y-8">
          <div className="space-y-4 border-b border-[rgba(130,180,220,0.18)] pb-6">
            <Badge variant="navy">Legal Governance</Badge>
            <h1 className="text-display font-extrabold text-white">Terms of Service</h1>
            <div className="p-3.5 rounded-lg bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] flex items-center gap-2 text-xs text-amber-400 font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>DRAFT OPERATIONAL POLICY — SUBJECT TO FORMAL JURISDICTIONAL COUNSEL REVIEW</span>
            </div>
            <p className="text-xs text-slate-400">Effective Date: November 2026 | {SITE_CONFIG.legalName}</p>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Scope of Engagement</h2>
              <p>
                These Terms of Service govern professional software development, consulting, web architecture, and maintenance
                services provided by STARX LABS to client organizations. Individual projects are formalized under written Statements
                of Work (SOW) detailing milestones, deliverables, and acceptance criteria.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Intellectual Property Rights & Ownership</h2>
              <p>
                Upon receipt of full payment for completed project milestones, all right, title, and interest in custom application code,
                database schemas, graphics, and documentation created specifically for the Client shall transfer entirely to the Client.
                STARX LABS retains ownership of pre-existing proprietary developer tooling, libraries, and boilerplates incorporated into deliverables under non-exclusive licenses.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Milestone Acceptance & Defect Warranty</h2>
              <p>
                Each project milestone includes a 14-day client review period. STARX LABS provides a standard 30-day warranty following final
                production deployment to resolve any reproducible functional defects that deviate from approved written specifications.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">4. Independent Platform Operation</h2>
              <p>
                STARX LABS operates independently from STARX FLOW. Contracting for services with STARX LABS does not create any license,
                obligation, or liability regarding STARX FLOW software, and vice versa.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">5. Governing Law & Jurisdiction</h2>
              <p>
                Unless modified by an executed Master Services Agreement, these terms shall be interpreted in accordance with the applicable
                commercial laws of the jurisdiction specified in the primary Statement of Work.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
