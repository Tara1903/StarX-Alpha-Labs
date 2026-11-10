import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/lib/constants";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy (Draft) — StarX Alpha Labs",
  description: "Draft operational refund policy governing custom engineering deliverables, milestone billing, and deposit terms.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow py-20">
        <Container className="max-w-4xl space-y-8">
          <div className="space-y-4 border-b border-[rgba(130,180,220,0.18)] pb-6">
            <Badge variant="navy">Commercial Policy</Badge>
            <h1 className="text-display font-extrabold text-white">Refund Policy</h1>
            <div className="p-3.5 rounded-lg bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] flex items-center gap-2 text-xs text-amber-400 font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>DRAFT OPERATIONAL POLICY — SUBJECT TO FORMAL JURISDICTIONAL COUNSEL REVIEW</span>
            </div>
            <p className="text-xs text-slate-400">Effective Date: November 2026 | {SITE_CONFIG.legalName}</p>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Milestone-Based Commercial Nature</h2>
              <p>
                StarX Alpha Labs provides custom professional software engineering, architecture, and technology consulting services.
                Because custom software development involves dedicated engineering team time and resource allocation, project
                retainers and approved milestone disbursements are generally non-refundable once work on the corresponding milestone has commenced.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Unstarted Milestone Deposits</h2>
              <p>
                If an engagement is terminated by mutual written consent before work on a subsequent scheduled milestone has commenced,
                any unexpended advance deposits for that future milestone will be refunded in full within 14 business days.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Defect Remediation Commitment</h2>
              <p>
                In the event that deliverables do not meet agreed acceptance criteria, our primary obligation under warranty is to
                remediate and refactor the code at no additional cost until it strictly satisfies the approved technical specifications.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">4. Monthly Maintenance Subscriptions</h2>
              <p>
                Monthly technical maintenance plans and dedicated sprint retainers can be cancelled with 30 days written notice.
                Fees paid for active monthly billing cycles are non-refundable.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
