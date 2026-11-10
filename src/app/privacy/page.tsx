import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/lib/constants";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft) — STARX LABS",
  description: "Draft operational privacy policy for STARX LABS services, data handling practices, and information protection standards.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow py-20">
        <Container className="max-w-4xl space-y-8">
          <div className="space-y-4 border-b border-[rgba(130,180,220,0.18)] pb-6">
            <Badge variant="navy">Legal Governance</Badge>
            <h1 className="text-display font-extrabold text-white">Privacy Policy</h1>
            <div className="p-3.5 rounded-lg bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] flex items-center gap-2 text-xs text-amber-400 font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>DRAFT OPERATIONAL POLICY — SUBJECT TO FORMAL JURISDICTIONAL COUNSEL REVIEW</span>
            </div>
            <p className="text-xs text-slate-400">Effective Date: November 2026 | {SITE_CONFIG.legalName}</p>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
              <p>
                STARX LABS collects technical and business contact information submitted voluntarily through our
                quote requests, consultation forms, and direct email communications. This includes full names, corporate
                emails, phone numbers, company names, and technical project briefs.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Use of Information</h2>
              <p>
                We use collected information solely to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Evaluate project scope and prepare commercial proposals.</li>
                <li>Conduct requested architectural consultation sessions.</li>
                <li>Fulfill signed contractual obligations and provide technical maintenance.</li>
                <li>Comply with applicable legal, accounting, and security obligations.</li>
              </ul>
              <p>
                We do not sell, rent, or monetize your corporate contact data or project brief specifications to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Client Intellectual Property & Code Confidentiality</h2>
              <p>
                All proprietary codebases, database credentials, API secrets, and architectural diagrams shared with STARX LABS
                during engagements are treated as strictly confidential under binding non-disclosure agreements. Client data is never
                used to train public artificial intelligence models.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">4. Cookies and Analytical Tracking</h2>
              <p>
                We use strictly necessary functional session cookies and privacy-respecting performance telemetry to monitor
                page load speeds and Core Web Vitals. Refer to our Cookie Policy for detailed specifications.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
              <p>
                Inquiries regarding data protection should be addressed to:{" "}
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-[#32A9E8] hover:underline font-semibold">
                  {SITE_CONFIG.contact.email}
                </a>.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
