import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SITE_CONFIG } from "@/lib/constants";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy (Draft) — STARX LABS",
  description: "Draft operational cookie policy describing essential session cookies, local storage tokens, and telemetry on the STARX LABS website.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F8FAFC]">
      <Navbar />

      <main className="grow py-20">
        <Container className="max-w-4xl space-y-8">
          <div className="space-y-4 border-b border-[rgba(130,180,220,0.18)] pb-6">
            <Badge variant="navy">Legal Governance</Badge>
            <h1 className="text-display font-extrabold text-white">Cookie Policy</h1>
            <div className="p-3.5 rounded-lg bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] flex items-center gap-2 text-xs text-amber-400 font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>DRAFT OPERATIONAL POLICY — SUBJECT TO FORMAL JURISDICTIONAL COUNSEL REVIEW</span>
            </div>
            <p className="text-xs text-slate-400">Effective Date: November 2026 | {SITE_CONFIG.legalName}</p>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. What Are Cookies</h2>
              <p>
                Cookies and browser local storage entries are small data files placed on your device to maintain session state,
                enable smooth client-side routing, and track core performance metrics across web sessions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Categories of Cookies Used</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] space-y-1">
                  <h3 className="text-sm font-bold text-white">Strictly Necessary Cookies</h3>
                  <p className="text-xs text-slate-300">
                    Required for basic site navigation, authentication tokens, CSRF protection, and security headers. These cannot be disabled.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B192B]/80 border border-[rgba(130,180,220,0.18)] space-y-1">
                  <h3 className="text-sm font-bold text-white">Performance & Web Vitals Telemetry</h3>
                  <p className="text-xs text-slate-300">
                    Anonymous telemetry used to measure Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and server latency without tracking personal user identities.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Third-Party Tracking & Advertising</h2>
              <p>
                STARX LABS does not deploy intrusive third-party cross-site advertising trackers or sell browsing data to data brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">4. Managing Preferences</h2>
              <p>
                You can configure your browser settings to refuse non-essential cookies. Most modern browsers allow you to inspect,
                block, or delete stored cookies through standard privacy settings.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
