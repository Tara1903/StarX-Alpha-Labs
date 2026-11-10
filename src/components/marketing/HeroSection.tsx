import * as React from "react";
import Link from "next/link";
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
  Globe,
  Smartphone,
  Laptop,
  TrendingUp,
  BarChart3,
  Lock,
  Cloud
} from "lucide-react";

export function HeroSection() {
  const stats = [
    { label: "Demo Models", val: "160+", sub: "Ready to test" },
    { label: "Solution Modules", val: "50+", sub: "Plug & play" },
    { label: "Industry Categories", val: "12", sub: "End-to-end" },
    { label: "Architecture", val: "100%", sub: "Customizable" },
    { label: "Deployment", val: "1–4 Wks", sub: "Fast time-to-market" }
  ];

  return (
    <section className="relative flex flex-col justify-center items-center overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
      {/* Background Soft Atmospheric Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[800px] md:h-[700px] md:w-[1100px] rounded-full bg-gradient-to-tr from-[#087BFF]/25 via-[#00D9FF]/15 to-[#873BFF]/20 blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 space-y-8 md:space-y-10">
        {/* Capability Architecture Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#071638]/80 backdrop-blur-xl shadow-lg shadow-[#030B24]/60">
          <Sparkles className="w-3.5 h-3.5 text-[#00D9FF] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-widest uppercase text-[#00D9FF]">
            Next-Gen Digital Solutions • Websites • Mobile Apps • Custom Software
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
          Next-Gen Digital Solutions{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#00D9FF] to-[#087BFF]">
            for Every Business.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-[#C8D5EF] font-normal leading-relaxed">
          We Design, Develop &amp; Deploy Powerful Websites, Mobile Apps, Custom Software,
          Cloud &amp; AI Solutions That Help Businesses Grow, Automate and Scale Globally.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
          <LinkButton
            href="/demos"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#087BFF] via-[#00D9FF] to-[#873BFF] text-white hover:brightness-110 shadow-xl shadow-[#087BFF]/30 transition-all"
            rightIcon={<ArrowRight className="w-4 h-4 text-white" />}
          >
            Explore 160+ Demos
          </LinkButton>
          <LinkButton
            href="/project-calculator"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-[#071638]/80 hover:bg-[#0A1940] text-white border border-[#00D9FF]/30 hover:border-[#00D9FF] transition-all"
          >
            Start a Project
          </LinkButton>
        </div>

        {/* Supporting Highlights */}
        <div className="flex items-center justify-center gap-6 text-xs font-mono text-[#C8D5EF] flex-wrap pt-1">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B]" /> Custom Development
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#00D9FF]" /> Fast 1–4 Weeks Deployment
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#873BFF]" /> Secure &amp; Scalable
          </span>
        </div>

        {/* Premium Technology Visuals: Laptop Dashboard & Smartphone Dual Mockup */}
        <div className="pt-6 sm:pt-8 max-w-5xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-[#0A1940]/90 backdrop-blur-2xl shadow-2xl shadow-[#030B24]/90 overflow-hidden text-left relative p-6 sm:p-8 space-y-6">
            {/* Top Chrome Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="h-4 w-px bg-white/10 mx-2" />
                <span className="text-xs font-mono text-[#00D9FF] flex items-center gap-1.5 font-bold">
                  <Terminal className="w-3.5 h-3.5" /> starx-alpha-labs://system-cockpit
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-[#00C98B] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#00C98B] animate-pulse" />
                  All Clusters Nominal
                </span>
              </div>
            </div>

            {/* Mockup Dual View: Laptop Software Dashboard & Smartphone Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Laptop Software Dashboard Mockup (2 cols) */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-[#071638] border border-white/5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-[#00D9FF]" />
                    <span className="text-xs font-bold text-white">STARX Software Dashboard</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#087BFF]/20 text-[#00D9FF]">
                    Next.js 16 Web Core
                  </span>
                </div>

                {/* Dashboard Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#0A1940] border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono">Active Users</span>
                    <div className="text-lg font-bold text-white flex items-center gap-1">
                      24.8k <TrendingUp className="w-3 h-3 text-[#00C98B]" />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A1940] border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono">Real-time Orders</span>
                    <div className="text-lg font-bold text-white flex items-center gap-1">
                      ₹8.4L <BarChart3 className="w-3 h-3 text-[#00D9FF]" />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A1940] border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono">AI Response</span>
                    <div className="text-lg font-bold text-white flex items-center gap-1">
                      18ms <Cpu className="w-3 h-3 text-[#873BFF]" />
                    </div>
                  </div>
                </div>

                {/* Chart Graphic Preview */}
                <div className="p-4 rounded-xl bg-[#0A1940] border border-white/5 space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Business Growth &amp; Telemetry Velocity</span>
                    <span className="text-[#00C98B] font-mono">+142% MoM</span>
                  </div>
                  <div className="h-14 flex items-end gap-2 pt-2">
                    {[35, 45, 30, 60, 50, 75, 65, 85, 95, 80, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-[#087BFF] to-[#00D9FF] hover:brightness-125 transition-all"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Smartphone Mobile Interface Mockup (1 col) */}
              <div className="p-5 rounded-2xl bg-[#071638] border border-[#873BFF]/30 space-y-4 relative">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#E52BFF]" />
                    <span className="text-xs font-bold text-white">STARX Mobile App</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#873BFF]/20 text-[#E52BFF]">
                    iOS / Android
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A1940] border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Push Alert Engine</span>
                    <span className="text-[10px] font-mono text-[#00C98B]">Delivered</span>
                  </div>
                  <p className="text-[11px] text-[#C8D5EF]">
                    New customer order #8491 received. Auto-dispatched to fulfillment fleet.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A1940] border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">Biometric FaceID</span>
                    <Lock className="w-3.5 h-3.5 text-[#00D9FF]" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Session encrypted &bull; 256-bit AES
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Bar (Horizontal 5-Stat Strip) */}
        <div className="pt-4 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-[#071638] border border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
            {stats.map((s, idx) => (
              <div key={s.label} className={idx === 4 ? "col-span-2 sm:col-span-1" : ""}>
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#087BFF]">
                  {s.val}
                </div>
                <div className="text-xs font-bold text-white mt-0.5">{s.label}</div>
                <div className="text-[10px] font-mono text-[#C8D5EF] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
