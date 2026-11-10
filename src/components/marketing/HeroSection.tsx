import * as React from "react";
import { LinkButton } from "@/components/ui/LinkButton";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Activity,
  Terminal,
  Zap,
  CheckCircle2,
  Server,
  Layers,
  GitBranch,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center items-center overflow-hidden pt-24 pb-8 sm:pt-32 sm:pb-10">
      {/* Background Soft Atmospheric Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] md:h-[650px] md:w-[950px] rounded-full bg-gradient-to-tr from-[#1769AA]/20 via-[#32A9E8]/14 to-[#73D8FF]/10 blur-[150px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-7 md:space-y-9">
        {/* Capability Architecture Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(130,180,220,0.22)] bg-[#0B192B]/70 backdrop-blur-xl shadow-lg shadow-[#07111F]/50 animate-hero-fade">
          <Sparkles className="w-3.5 h-3.5 text-[#73D8FF] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-widest uppercase text-[#73D8FF]">
            Digital Engineering • Custom Software • AI Solutions
          </span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-display font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.05] animate-hero-fade-up">
          WE ENGINEER WHAT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#73D8FF] to-[#32A9E8]">
            COMES NEXT.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#A3B4C7] font-normal leading-relaxed animate-hero-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Intelligent software. High-performance web applications. Applied AI workflows.
          We architect and build enterprise-grade software engineered for speed, high concurrency,
          and zero-trust resilience.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1 animate-hero-fade-up"
          style={{ animationDelay: "200ms" }}
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

        {/* Interactive Engineering Cockpit Showcase (Eliminates empty space) */}
        <div
          className="pt-6 sm:pt-8 max-w-5xl mx-auto animate-hero-fade"
          style={{ animationDelay: "280ms" }}
        >
          <div className="rounded-2xl border border-[rgba(130,180,220,0.2)] bg-[#0B192B]/80 backdrop-blur-xl shadow-2xl shadow-[#07111F]/80 overflow-hidden text-left">
            {/* Terminal Top Bar */}
            <div className="px-4 py-3 border-b border-[rgba(130,180,220,0.12)] bg-[#07111F]/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <div className="h-3.5 w-px bg-slate-700/60 mx-1.5" />
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#73D8FF]" /> starx-alpha-labs://production-telemetry
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-[#73D8FF] bg-[#102D50]/60 border border-[rgba(130,180,220,0.16)]">
                  <GitBranch className="w-2.5 h-2.5" /> main
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All Clusters Nominal
                </span>
              </div>
            </div>

            {/* 3 Telemetry Feature Columns */}
            <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Metric 1 */}
              <div className="p-4 rounded-xl border border-[rgba(130,180,220,0.12)] bg-[#07111F]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#73D8FF] uppercase tracking-wider flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5" /> Systems Core
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    1.42M <span className="text-xs text-slate-400 font-sans font-normal">req/sec</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Peak concurrent throughput across distributed microservices.
                  </p>
                </div>
                <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-[#63B8F8]">
                  <span>P99: 14ms</span>
                  <span>•</span>
                  <span>HTTP/3 Edge</span>
                  <span>•</span>
                  <span>99.99% SLA</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-4 rounded-xl border border-[rgba(130,180,220,0.12)] bg-[#07111F]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#73D8FF] uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Applied AI
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#32A9E8]/10 text-[#32A9E8] border border-[#32A9E8]/20">
                    Live RAG
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    0.00% <span className="text-xs text-slate-400 font-sans font-normal">leakage</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Zero-leakage vector embeddings and enterprise safety guardrails.
                  </p>
                </div>
                <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-[#63B8F8]">
                  <span>Hybrid Search</span>
                  <span>•</span>
                  <span>Context Cache</span>
                  <span>•</span>
                  <span>SOC2</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-4 rounded-xl border border-[rgba(130,180,220,0.12)] bg-[#07111F]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#73D8FF] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Zero Trust
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Enforced
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    100% <span className="text-xs text-slate-400 font-sans font-normal">isolated</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Row-level database security and cryptographic tenant boundaries.
                  </p>
                </div>
                <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-[#63B8F8]">
                  <span>PostgreSQL RLS</span>
                  <span>•</span>
                  <span>TLS 1.3</span>
                  <span>•</span>
                  <span>Audit Logs</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Feed */}
            <div className="px-5 py-3 border-t border-[rgba(130,180,220,0.08)] bg-[#07111F]/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#32A9E8]" />
                <span className="text-slate-300">Stack Architecture:</span>
                <span className="text-white">Next.js 16 Turbopack • React 19 • Supabase • Applied AI</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-[#A3B4C7]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Edge Optimized
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Type Safe End-to-End
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Badges (Tightened Spacing) */}
        <div
          className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto animate-hero-fade"
          style={{ animationDelay: "340ms" }}
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
