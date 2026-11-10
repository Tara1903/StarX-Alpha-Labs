import * as React from "react";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowRight, Sparkles, ShieldCheck, Cpu, Activity, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      {/* Radial soft depth glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] md:h-[800px] md:w-[800px] rounded-full bg-gradient-to-tr from-[#1769AA]/15 via-[#32A9E8]/12 to-[#73D8FF]/8 blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-8 md:space-y-10">
        {/* Capability Architecture Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(130,180,220,0.22)] bg-[#0B192B]/60 backdrop-blur-xl shadow-lg shadow-[#07111F]/50 animate-hero-fade">
          <Sparkles className="w-3.5 h-3.5 text-[#73D8FF] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-widest uppercase text-[#73D8FF]">
            Digital Engineering • Custom Software • AI Solutions
          </span>
        </div>

        {/* Editorial Headline (Instant LCP: rendered directly into initial HTML) */}
        <h1 className="text-display font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.05] animate-hero-fade-up">
          WE ENGINEER WHAT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#73D8FF] to-[#32A9E8]">
            COMES NEXT.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#A3B4C7] font-normal leading-relaxed animate-hero-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Intelligent software. Digital experiences. Technology built for the future.
          We architect and build enterprise-grade web applications, high-concurrency systems, and applied AI workflows.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 animate-hero-fade-up"
          style={{ animationDelay: "220ms" }}
        >
          <LinkButton
            href="#services"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#1769AA] via-[#32A9E8] to-[#73D8FF] text-[#07111F] hover:brightness-110 shadow-lg shadow-[#32A9E8]/25 transition-all"
            rightIcon={<ArrowRight className="w-4 h-4 text-[#07111F]" />}
          >
            Explore Services
          </LinkButton>
          <LinkButton
            href="/contact"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm glass-panel glass-panel-hover text-white border-[rgba(130,180,220,0.25)] hover:border-[#73D8FF]"
          >
            Start a Project
          </LinkButton>
        </div>

        {/* Engineering Anchors / Badges */}
        <div
          className="pt-8 sm:pt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto animate-hero-fade"
          style={{ animationDelay: "320ms" }}
        >
          <div className="glass-panel rounded-xl p-3.5 text-left border-[rgba(130,180,220,0.14)]">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase font-mono tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#73D8FF]" /> Zero Trust
            </div>
            <p className="text-[11px] text-[#A3B4C7] mt-1">Enterprise encryption & RLS</p>
          </div>

          <div className="glass-panel rounded-xl p-3.5 text-left border-[rgba(130,180,220,0.14)]">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase font-mono tracking-wider">
              <Cpu className="w-4 h-4 text-[#73D8FF]" /> Applied AI
            </div>
            <p className="text-[11px] text-[#A3B4C7] mt-1">Custom models & RAG pipelines</p>
          </div>

          <div className="glass-panel rounded-xl p-3.5 text-left border-[rgba(130,180,220,0.14)]">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase font-mono tracking-wider">
              <Activity className="w-4 h-4 text-[#73D8FF]" /> 99.99% SLA
            </div>
            <p className="text-[11px] text-[#A3B4C7] mt-1">Fault-tolerant distributed backends</p>
          </div>

          <div className="glass-panel rounded-xl p-3.5 text-left border-[rgba(130,180,220,0.14)]">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase font-mono tracking-wider">
              <Terminal className="w-4 h-4 text-[#73D8FF]" /> Modern Stack
            </div>
            <p className="text-[11px] text-[#A3B4C7] mt-1">Next.js 16 • Turbopack • Cloud</p>
          </div>
        </div>
      </div>
    </section>
  );
}
