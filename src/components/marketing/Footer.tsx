import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { getStarxFlowDestinationUrl } from "@/lib/ecosystem";
import { ArrowUpRight, Sparkles, Calculator, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#0A1940] bg-[#030B24] text-slate-400 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0 select-none">
              <BrandLogo size="sm" showGlow={false} />
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white whitespace-nowrap">
                  STARX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#087BFF]">ALPHA LABS</span>
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#00D9FF]">
                  Build Smarter. Lead Tomorrow.
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm text-[#C8D5EF]">
              {SITE_CONFIG.tagline}. We build enterprise-grade software, websites, mobile applications,
              and synchronized dual-platform combo systems for modern businesses.
            </p>
            <div className="text-xs text-slate-400 font-mono">
              {SITE_CONFIG.contact.address}
            </div>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/project-calculator"
                className="text-xs text-[#00D9FF] hover:underline font-semibold flex items-center gap-1"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Project Calculator &rarr;</span>
              </Link>
              <span className="text-slate-600">&bull;</span>
              <Link
                href="/demos"
                className="text-xs text-[#00D9FF] hover:underline font-semibold"
              >
                160+ Demos &rarr;
              </Link>
            </div>
          </div>

          {/* Development Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Development Divisions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/website-development" className="hover:text-[#00D9FF] transition-colors">
                  Website Development (W1–W6)
                </Link>
              </li>
              <li>
                <Link href="/app-development" className="hover:text-[#00D9FF] transition-colors">
                  Mobile App Development (A1–A5)
                </Link>
              </li>
              <li>
                <Link href="/website-app-combo" className="hover:text-[#00D9FF] transition-colors">
                  Website + App Combo (C1–C5)
                </Link>
              </li>
              <li>
                <Link href="/development-services" className="hover:text-[#00D9FF] transition-colors font-semibold text-slate-300">
                  All Divisions Overview &rarr;
                </Link>
              </li>
              <li>
                <Link href="/project-calculator" className="hover:text-[#00D9FF] transition-colors text-[#00D9FF] font-mono">
                  Interactive Scope Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Solutions &amp; Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/demos" className="hover:text-[#00D9FF] transition-colors">
                  160 Enterprise Demos
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-[#00D9FF] transition-colors">
                  12 Industry Categories
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#00D9FF] transition-colors">
                  Pricing (INR ₹)
                </Link>
              </li>
              <li>
                <Link href="/ecosystem" className="hover:text-[#00D9FF] transition-colors text-slate-300 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00D9FF]" />
                  <span>STARX Ecosystem</span>
                </Link>
              </li>
              <li>
                <a
                  href={getStarxFlowDestinationUrl({ source: "starx_alpha_labs", campaign: "footer_solutions" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00D9FF] hover:underline flex items-center gap-1 font-mono font-bold"
                  title="STARX FLOW — Independent AI Business Operating System"
                >
                  <span>STARX FLOW (AI OS)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#00D9FF] transition-colors text-slate-400">
                  Selected Work &amp; Blueprints
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Workspaces</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/customer" className="hover:text-[#00D9FF] transition-colors">
                  Customer Portal &amp; Projects
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#00D9FF] transition-colors">
                  Admin Console
                </Link>
              </li>
              <li>
                <Link href="/admin/settings/appearance" className="hover:text-[#00D9FF] transition-colors text-slate-400">
                  Theme Studio
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#00D9FF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#00D9FF] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t border-white/5 mt-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-slate-400">
              &copy; {currentYear} {SITE_CONFIG.legalName}. All rights reserved. Build Smarter. Lead Tomorrow.
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              Ecosystem Policy: STARX FLOW is an independent product operated on decoupled cloud infrastructure.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>Currency: INR (₹)</span>
            <span>&bull;</span>
            <span>Next.js 16 • React 19 • Supabase</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
