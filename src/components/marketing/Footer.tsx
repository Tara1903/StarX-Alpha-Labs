import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { getStarxFlowDestinationUrl } from "@/lib/ecosystem";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(130,180,220,0.16)] bg-[#07111F]/90 backdrop-blur-xl text-slate-400 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[rgba(130,180,220,0.12)]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0 select-none">
              <BrandLogo size="sm" showGlow={false} />
              <span className="font-extrabold text-xl tracking-tight text-white whitespace-nowrap">
                STARX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73D8FF] to-[#32A9E8]">ALPHA LABS</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm text-[#A3B4C7]">
              {SITE_CONFIG.tagline}. We build enterprise-grade software, bespoke platforms, and
              custom AI solutions for market leaders worldwide.
            </p>
            <div className="text-xs text-slate-400 font-mono">
              {SITE_CONFIG.contact.address}
            </div>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/get-quote"
                className="text-xs text-[#73D8FF] hover:underline font-semibold"
              >
                Request Quote &rarr;
              </Link>
              <span className="text-slate-600">&bull;</span>
              <Link
                href="/book-consultation"
                className="text-xs text-[#73D8FF] hover:underline font-semibold"
              >
                Book Consultation &rarr;
              </Link>
            </div>
          </div>

          {/* Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Divisions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/divisions/starx-digital" className="hover:text-[#73D8FF] transition-colors">
                  STARX DIGITAL
                </Link>
              </li>
              <li>
                <Link href="/divisions/starx-systems" className="hover:text-[#73D8FF] transition-colors">
                  STARX SYSTEMS
                </Link>
              </li>
              <li>
                <Link href="/divisions/starx-ai-solutions" className="hover:text-[#73D8FF] transition-colors">
                  STARX AI SOLUTIONS
                </Link>
              </li>
              <li>
                <Link href="/divisions" className="hover:text-[#73D8FF] transition-colors">
                  All Divisions Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#73D8FF] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#73D8FF] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#73D8FF] transition-colors">
                  Portfolio & Case Studies
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-[#73D8FF] transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#73D8FF] transition-colors">
                  Pricing & Models
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#73D8FF] transition-colors">
                  Engineering Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Ecosystem & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={getStarxFlowDestinationUrl({ campaign: "footer", feature: "general" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#73D8FF] hover:underline"
                >
                  <span>STARX FLOW</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-white transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Live System Node */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#73D8FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#32A9E8]"></span>
            </span>
            <span>StarX Alpha Architecture: Fully Operational</span>
          </div>

          <div className="text-center sm:text-right font-mono text-[11px]">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved. Decoupled from STARX FLOW.
          </div>
        </div>
      </Container>
    </footer>
  );
}
