import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/lib/constants";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation Policy (Draft) — STARX LABS",
  description: "Draft operational cancellation policy for custom software contracts, sprints, and ongoing technical maintenance retainers.",
};

export default function CancellationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1424] text-slate-100">
      <Navbar />

      <main className="grow py-20">
        <Container className="max-w-4xl space-y-8">
          <div className="space-y-4 border-b border-[#19375E] pb-6">
            <Badge variant="navy">Commercial Policy</Badge>
            <h1 className="text-display font-extrabold text-white">Cancellation Policy</h1>
            <div className="p-3.5 rounded-lg bg-[#0F2038] border border-[#19375E] flex items-center gap-2 text-xs text-amber-400 font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>DRAFT OPERATIONAL POLICY — SUBJECT TO FORMAL JURISDICTIONAL COUNSEL REVIEW</span>
            </div>
            <p className="text-xs text-slate-400">Effective Date: November 2026 | {SITE_CONFIG.legalName}</p>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Fixed-Price Project Cancellation</h2>
              <p>
                Either party may terminate an active fixed-price project with 14 business days written notice. In the event of
                early termination, the Client shall pay for all engineering hours completed and approved milestones up to the date
                of termination. All completed work-in-progress code and assets shall be handed over to the Client.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Monthly Retainers & Maintenance Cancellations</h2>
              <p>
                Ongoing technical maintenance retainers and dedicated sprint allocations operate on flexible monthly agreements.
                Clients may cancel upcoming monthly renewals by providing written notice at least 30 days prior to the start of the next billing cycle.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Consultation Rescheduling</h2>
              <p>
                Requested technical consultations can be rescheduled or cancelled at no charge up to 4 hours prior to the scheduled
                video conference time.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
