import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#19375E] bg-[#0A1424] text-slate-400 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#19375E]/70">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#102D50] to-[#1769AA] border border-[#32A9E8]/40 flex items-center justify-center font-bold text-white">
                <span className="text-[#32A9E8]">S</span>X
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                STARX <span className="text-[#32A9E8]">LABS</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              {SITE_CONFIG.tagline}. We build enterprise-grade software, bespoke platforms, and
              custom AI solutions for market leaders worldwide.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              {SITE_CONFIG.contact.address}
            </div>
          </div>

          {/* Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Divisions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#divisions" className="hover:text-[#32A9E8] transition-colors">
                  STARX DIGITAL
                </Link>
              </li>
              <li>
                <Link href="#divisions" className="hover:text-[#32A9E8] transition-colors">
                  STARX SYSTEMS
                </Link>
              </li>
              <li>
                <Link href="#divisions" className="hover:text-[#32A9E8] transition-colors">
                  STARX AI SOLUTIONS
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={SITE_CONFIG.ecosystem.starxFlowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#32A9E8] inline-flex items-center gap-1 transition-colors"
                >
                  STARX FLOW <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-[#32A9E8] transition-colors">
                  Design System v1.0
                </Link>
              </li>
              <li>
                <Link href="/api/health" className="hover:text-[#32A9E8] transition-colors">
                  System Health API
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={`mailto:${SITE_CONFIG.contact.sales}`} className="hover:text-[#32A9E8] transition-colors">
                  {SITE_CONFIG.contact.sales}
                </a>
              </li>
              <li>
                <span className="text-slate-500">{SITE_CONFIG.contact.phone}</span>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Authorized Enterprise Inquiries Only
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} {SITE_CONFIG.legalName} All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#contact" className="hover:text-slate-300 transition-colors">
              Terms of Engagement
            </Link>
            <Link href="#contact" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#contact" className="hover:text-slate-300 transition-colors">
              Security Governance
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
