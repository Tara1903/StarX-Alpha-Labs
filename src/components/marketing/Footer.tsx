import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { getStarxFlowDestinationUrl } from "@/lib/ecosystem";
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
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/get-quote"
                className="text-xs text-[#32A9E8] hover:underline font-semibold"
              >
                Request Quote &rarr;
              </Link>
              <span className="text-slate-600">&bull;</span>
              <Link
                href="/book-consultation"
                className="text-xs text-[#32A9E8] hover:underline font-semibold"
              >
                Book Consultation &rarr;
              </Link>
            </div>
          </div>

          {/* Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Divisions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/divisions/starx-digital" className="hover:text-[#32A9E8] transition-colors">
                  STARX DIGITAL
                </Link>
              </li>
              <li>
                <Link href="/divisions/starx-systems" className="hover:text-[#32A9E8] transition-colors">
                  STARX SYSTEMS
                </Link>
              </li>
              <li>
                <Link href="/divisions/starx-ai-solutions" className="hover:text-[#32A9E8] transition-colors">
                  STARX AI SOLUTIONS
                </Link>
              </li>
              <li>
                <Link href="/divisions" className="hover:text-slate-200 text-slate-500 transition-colors">
                  All Divisions Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services" className="hover:text-[#32A9E8] transition-colors">
                  Services Catalog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#32A9E8] transition-colors">
                  Pricing & Models
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#32A9E8] transition-colors">
                  Portfolio & Showcases
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-[#32A9E8] transition-colors">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#32A9E8] transition-colors">
                  About STARX LABS
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#32A9E8] transition-colors">
                  Engineering Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={getStarxFlowDestinationUrl({ campaign: "footer_link" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#32A9E8] inline-flex items-center gap-1 transition-colors text-slate-300 font-medium"
                >
                  STARX FLOW (Automation) <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#32A9E8] transition-colors">
                  Contact Architects
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-[#32A9E8] transition-colors">
                  Design System v1.0
                </Link>
              </li>
              <li>
                <Link href="/api/health" className="hover:text-[#32A9E8] transition-colors font-mono">
                  System Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} {SITE_CONFIG.legalName} All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund" className="hover:text-slate-300 transition-colors">
              Refund Policy
            </Link>
            <Link href="/cancellation" className="hover:text-slate-300 transition-colors">
              Cancellation Policy
            </Link>
            <Link href="/cookies" className="hover:text-slate-300 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
