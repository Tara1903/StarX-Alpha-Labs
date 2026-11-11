import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { ECOSYSTEM_PRODUCTS, getStarxFlowDestinationUrl } from "@/lib/ecosystem";
import { 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Bot, 
  Workflow, 
  Lock, 
  Zap, 
  Server, 
  Layers,
  ArrowRight,
  Calculator
} from "lucide-react";

export const metadata: Metadata = {
  title: "STARX Ecosystem & Independent Products | StarX Alpha Labs",
  description:
    "Explore the StarX technology ecosystem. StarX Alpha Labs engineers bespoke custom software, while STARX FLOW operates as an independent autonomous AI business operating system.",
  openGraph: {
    title: "STARX Ecosystem & Independent Products | StarX Alpha Labs",
    description:
      "Explore the StarX technology ecosystem. Learn how StarX Alpha Labs and STARX FLOW operate as distinct, decoupled platforms.",
    url: "https://starxlabs.io/ecosystem",
  },
};

export default function EcosystemPage() {
  const flowProduct = ECOSYSTEM_PRODUCTS[0];
  const flowUrl = getStarxFlowDestinationUrl({
    source: "starx_alpha_labs",
    campaign: "ecosystem_page_hero",
    feature: "general",
  });

  return (
    <div className="relative min-h-screen flex flex-col bg-[#030B24] text-white selection:bg-[#087BFF] selection:text-white overflow-x-hidden">
      {/* Background Cinematic Atmosphere */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#087BFF]/22 via-[#00D9FF]/12 to-transparent blur-[150px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-[#087BFF]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/3 -right-40 w-[600px] h-[600px] bg-[#873BFF]/12 blur-[170px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <main className="grow relative z-10 pt-36 sm:pt-40 lg:pt-44 pb-24 space-y-24">
        {/* 1. Header / Hero Section */}
        <section className="relative">
          <Container className="text-center max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#071638]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#00D9FF] uppercase">
                Technology Ecosystem &amp; Product Directory
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Bespoke Engineering &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">
                Independent Products
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#C8D5EF] leading-relaxed max-w-3xl mx-auto font-light">
              StarX Alpha Labs is a premier software engineering company that crafts bespoke web applications, 3D digital experiences, and enterprise platforms—while cultivating and showcasing independent technology products like <strong className="text-white font-medium">STARX FLOW</strong>.
            </p>
          </Container>
        </section>

        {/* 2. Architectural Independence Guarantee (Two Distinct Platforms) */}
        <section className="relative">
          <Container>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1940]/90 border border-[#00D9FF]/30 shadow-[0_15px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF] block">
                    Strict Architectural Separation Policy
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Decoupled Platforms. Zero Shared Infrastructure.
                  </h2>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00C98B]/10 border border-[#00C98B]/30 text-xs font-mono text-[#00C98B] shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#00C98B]" />
                  <span>Isolation Verified</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {/* Column 1: StarX Alpha Labs */}
                <div className="p-6 rounded-2xl bg-[#071638] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#087BFF]/20 text-[#00D9FF] border border-[#00D9FF]/30">
                      Engineering Company
                    </span>
                    <Server className="w-5 h-5 text-[#00D9FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">StarX Alpha Labs</h3>
                  <p className="text-xs text-[#C8D5EF] leading-relaxed">
                    Custom software engineering, client proposals, bespoke 3D WebGL architectures, and dedicated client portal workflows.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300 font-mono">
                    <li className="flex items-center gap-2 text-[#00C98B]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Dedicated Supabase Database</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#00C98B]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Isolated Admin Role-Based Access Control</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#00C98B]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Private Proposal Storage Buckets</span>
                    </li>
                  </ul>
                </div>

                {/* Column 2: STARX FLOW */}
                <div className="p-6 rounded-2xl bg-[#071638] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#E52BFF]/20 text-[#E52BFF] border border-[#E52BFF]/30">
                      Independent SaaS Product
                    </span>
                    <Bot className="w-5 h-5 text-[#E52BFF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">STARX FLOW</h3>
                  <p className="text-xs text-[#C8D5EF] leading-relaxed">
                    Commercial off-the-shelf business automation OS, 24/7 AI receptionists, WhatsApp messaging, and lead pipeline tracking for local businesses.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300 font-mono">
                    <li className="flex items-center gap-2 text-[#00C98B]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Completely Separate Database &amp; Storage</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#00C98B]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Independent User Accounts &amp; JWT Sessions</span>
                    </li>
                    <li className="flex items-center gap-2 text-[#00C98B]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Autonomous flow.starx.io Cloud Deployment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. Featured Product Showcase: STARX FLOW */}
        <section className="relative">
          <Container className="space-y-10">
            <div className="text-left space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D9FF]">
                Active Commercial Product
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Product: STARX FLOW
              </h2>
            </div>

            <Card3DTilt
              glowColor="rgba(0, 217, 255, 0.6)"
              maxTilt={6}
              className="p-8 sm:p-12 rounded-3xl bg-[#0A1940]/90 border-2 border-[#00D9FF]/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Product Summary */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3.5 py-1 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/40 font-mono text-xs font-bold">
                      {flowProduct.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Status: <strong className="text-[#00C98B]">Live Production</strong>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {flowProduct.name} &bull;{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#087BFF]">
                      {flowProduct.tagline}
                    </span>
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {flowProduct.fullDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {flowProduct.verifiedCapabilities.map((cap) => (
                      <div
                        key={cap.title}
                        className="p-3.5 rounded-xl bg-[#071638] border border-white/10 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white tracking-tight">{cap.title}</h4>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF]">
                            {cap.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{cap.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <a
                      href={flowUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3.5 rounded-full font-extrabold text-sm text-white bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#873BFF] shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:brightness-110 transition-all flex items-center gap-2 group"
                    >
                      <span>{flowProduct.ctaLabel}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <span className="text-xs font-mono text-slate-400">
                      Direct destination: <strong className="text-slate-200">flow.starx.io</strong>
                    </span>
                  </div>
                </div>

                {/* Right Visual Card */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#071638] border border-white/10 space-y-4 text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#00C98B]" />
                      <span>Security &amp; Data Isolation</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#00D9FF]">ENFORCED</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-bold text-white block">Database Isolation:</span>
                      <p className="text-slate-400 mt-0.5">{flowProduct.architectureSeparation.database}</p>
                    </div>
                    <div>
                      <span className="font-bold text-white block">Authentication Isolation:</span>
                      <p className="text-slate-400 mt-0.5">{flowProduct.architectureSeparation.auth}</p>
                    </div>
                    <div>
                      <span className="font-bold text-white block">Deployment Isolation:</span>
                      <p className="text-slate-400 mt-0.5">{flowProduct.architectureSeparation.infrastructure}</p>
                    </div>
                    <div>
                      <span className="font-bold text-white block">Zero Customer Sync:</span>
                      <p className="text-slate-400 mt-0.5">{flowProduct.architectureSeparation.dataPolicy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          </Container>
        </section>

        {/* 4. Cross-Platform Referral Guide */}
        <section className="relative">
          <Container>
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0A1940]/80 border border-white/10 space-y-6 text-center">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00D9FF]">
                Which Solution Fits Your Business?
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Bespoke Software Engineering vs. Ready-Made AI Platform
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Choose the right path depending on whether your company requires proprietary custom software tailored to specific workflows, or an immediate off-the-shelf business automation OS.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
                <div className="p-6 rounded-2xl bg-[#071638] border border-white/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white">Choose StarX Alpha Labs If:</h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                        <span>You need a bespoke corporate website or custom web application built from scratch.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                        <span>You need proprietary business logic, custom databases, or specialized AI models.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                        <span>You require full intellectual property ownership of your codebase and architecture.</span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href="/project-calculator"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#00D9FF] hover:underline pt-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Custom Engineering Scope &rarr;</span>
                  </Link>
                </div>

                <div className="p-6 rounded-2xl bg-[#071638] border border-white/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white">Choose STARX FLOW If:</h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#E52BFF] shrink-0 mt-0.5" />
                        <span>You need an AI receptionist to answer customer phone calls and book slots 24/7 immediately.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#E52BFF] shrink-0 mt-0.5" />
                        <span>You want automated WhatsApp and multi-channel messaging without custom coding.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#E52BFF] shrink-0 mt-0.5" />
                        <span>You prefer a subscription SaaS platform maintained and updated continuously.</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href={flowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#E52BFF] hover:underline pt-2"
                  >
                    <span>Visit STARX FLOW Platform</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
