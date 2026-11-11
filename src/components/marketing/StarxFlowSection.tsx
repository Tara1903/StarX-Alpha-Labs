"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { getStarxFlowDestinationUrl } from "@/lib/ecosystem";
import { 
  Bot, 
  MessageSquare, 
  Workflow, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  PhoneCall, 
  Calendar,
  Lock
} from "lucide-react";

export function StarxFlowSection() {
  const verifiedCapabilities = [
    {
      icon: <Bot className="w-4 h-4 text-[#00D9FF]" />,
      title: "24/7 AI Receptionist & Voice Call Assistant",
      desc: "Answers inbound phone calls and chats instantly, handles customer inquiries, and books appointments around the clock with zero human wait time.",
      tag: "Zero-Latency Answering",
    },
    {
      icon: <MessageSquare className="w-4 h-4 text-[#087BFF]" />,
      title: "Omnichannel Inbox & WhatsApp Automation",
      desc: "Consolidates WhatsApp, SMS, Web Chat, and Social DMs into one unified live stream with automated replies and intelligent handoff.",
      tag: "Unified Messaging",
    },
    {
      icon: <Users className="w-4 h-4 text-[#873BFF]" />,
      title: "Automated Lead Pipeline & CRM",
      desc: "Captures and qualifies inbound contacts automatically, updates deal stages, and triggers timed follow-up sequences to maximize conversion.",
      tag: "Auto-Qualification",
    },
    {
      icon: <Workflow className="w-4 h-4 text-[#E52BFF]" />,
      title: "Operational Workflow & Task Automation",
      desc: "Automates calendar scheduling, invoice reminders, customer onboarding tasks, and feedback collection without manual intervention.",
      tag: "Hands-Free Operations",
    },
  ];

  const destinationUrl = getStarxFlowDestinationUrl({
    source: "starx_alpha_labs",
    campaign: "homepage_flagship_product",
    feature: "general",
  });

  return (
    <section id="flow" className="py-24 sm:py-28 bg-[#030B24] relative overflow-hidden select-none">
      {/* Cinematic Ambient Atmosphere Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Top-Right Cyan Radial Glow */}
        <div className="absolute top-1/4 -right-20 w-[650px] h-[550px] rounded-full bg-gradient-to-b from-[#00D9FF]/14 via-[#087BFF]/10 to-transparent blur-[160px]" />
        {/* Bottom-Left Purple Ambient Glow */}
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[500px] rounded-full bg-gradient-to-tr from-[#873BFF]/15 via-[#E52BFF]/10 to-transparent blur-[150px]" />
        {/* Subtle Matrix Mesh Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,217,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,217,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <Container className="space-y-16">
        
        {/* Section Top Header & Independence Position */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Small Product Identifier Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#071638]/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,217,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#00D9FF] uppercase">
              Independent Product • AI Business Operating System
            </span>
          </div>

          {/* Master Wordmark & Headline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#E52BFF]">STARX FLOW</span>
          </h2>

          <p className="text-base sm:text-lg text-[#C8D5EF] leading-relaxed">
            The autonomous AI operating system designed to run front-desk reception, capture every incoming lead, and automate customer pipelines for local businesses.
          </p>
        </div>

        {/* Master Showcase Layout: Left Product Story + Right Interactive SaaS Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (5 cols): Product Narrative, Features, CTA & Architecture Note */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Value Proposition Statement */}
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                Autonomous Front-Desk &amp; Customer Operations Out of the Box
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                While <strong className="text-white font-medium">StarX Alpha Labs</strong> engineers bespoke custom software, platforms, and dedicated mobile apps, <strong className="text-white font-medium">STARX FLOW</strong> is an independent commercial software platform built for businesses that need immediate, hands-free automation.
              </p>
            </div>

            {/* 4 Verified Feature Highlights */}
            <div className="space-y-3 pt-1">
              {verifiedCapabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="p-3.5 rounded-xl bg-[#0A1940]/80 border border-white/10 hover:border-[#00D9FF]/40 transition-all flex items-start gap-3.5 group"
                >
                  <div className="p-2 rounded-lg bg-[#071638] border border-white/10 shrink-0 group-hover:border-[#00D9FF]/50 transition-colors">
                    {cap.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        {cap.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30">
                        {cap.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#A3B4C7] leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary CTA & Direct External Link */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full font-extrabold text-sm text-white bg-gradient-to-r from-[#00D9FF] via-[#087BFF] to-[#873BFF] shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:brightness-110 transition-all flex items-center gap-2.5 group"
              >
                <span>Explore STARX FLOW</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B]" />
                <span>flow.starx.io</span>
              </span>
            </div>

            {/* Strict Architecture Independence Note */}
            <div className="p-3.5 rounded-xl bg-[#071638]/90 border border-white/10 flex items-start gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-white font-medium">Independent Software Policy:</strong> STARX FLOW runs on its own isolated cloud infrastructure with a dedicated database and separate authentication. No customer data or credentials are shared.
              </p>
            </div>

          </div>

          {/* Right Column (7 cols): SaaS Product Cockpit Mockup */}
          <div className="lg:col-span-7 relative">
            <Card3DTilt
              glowColor="rgba(0, 217, 255, 0.5)"
              maxTilt={6}
              scaleOnHover={1.01}
              className="rounded-3xl bg-[#0A1940]/95 border-2 border-[#00D9FF]/35 shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden"
            >
              {/* Cockpit Window Chrome / Titlebar */}
              <div className="px-5 py-3.5 bg-[#071638] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                  <span className="ml-3 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#00C98B]" />
                    <span className="text-slate-300">flow.starx.io/app/workspace</span>
                  </span>
                </div>
                
                {/* Live System Status Pill */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C98B]/10 border border-[#00C98B]/30 text-[10px] font-mono text-[#00C98B]">
                  <span className="w-2 h-2 rounded-full bg-[#00C98B] animate-pulse" />
                  <span>AI RECEPTIONIST ONLINE</span>
                </div>
              </div>

              {/* Cockpit Dashboard Content */}
              <div className="p-5 sm:p-7 space-y-6">
                
                {/* Top Metric Bar */}
                <div className="grid grid-cols-3 gap-3 text-left">
                  <div className="p-3 rounded-xl bg-[#071638] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Inbound Speed</span>
                    <span className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#00D9FF]" /> 0.8s Latency
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#071638] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Leads Captured</span>
                    <span className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#00C98B]" /> 100% Retained
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#071638] border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Channels Synced</span>
                    <span className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#E52BFF]" /> 5 Networks
                    </span>
                  </div>
                </div>

                {/* Live Omnichannel Conversation Simulator */}
                <div className="rounded-2xl bg-[#071638] border border-white/10 p-4 sm:p-5 space-y-3.5 text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00D9FF]" />
                      <span className="text-xs font-mono font-bold text-white">Live Customer Interaction</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40">
                        WhatsApp Active
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Today, 11:42 AM</span>
                  </div>

                  {/* Customer Message */}
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs shrink-0 text-slate-300">
                      👤
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-none bg-[#0F2347] border border-white/10 text-xs text-slate-200 leading-relaxed">
                      Hi, I need an urgent consultation for my medical clinic website and booking system. Do you have an opening tomorrow afternoon?
                    </div>
                  </div>

                  {/* AI Receptionist Message */}
                  <div className="flex items-start gap-2.5 max-w-[88%] ml-auto flex-row-reverse">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00D9FF] to-[#087BFF] flex items-center justify-center text-xs shrink-0 text-black font-extrabold shadow-[0_0_12px_rgba(0,217,255,0.6)]">
                      ⚡
                    </div>
                    <div className="p-3 rounded-2xl rounded-tr-none bg-gradient-to-r from-[#00D9FF]/15 to-[#087BFF]/20 border border-[#00D9FF]/40 text-xs text-white leading-relaxed space-y-1.5 shadow-[0_0_20px_rgba(0,217,255,0.15)]">
                      <p>
                        Hello! Yes, I can reserve a 30-minute discovery call for your clinic tomorrow at <strong>2:30 PM</strong>.
                      </p>
                      <p className="text-[11px] text-[#A3B4C7]">
                        I have logged your request in our calendar and sent the preparation brief directly to this WhatsApp number. Would you like me to lock that in?
                      </p>
                    </div>
                  </div>

                  {/* Automated Trigger Execution Bar */}
                  <div className="p-2.5 rounded-xl bg-[#030B24]/90 border border-[#00C98B]/30 flex items-center justify-between text-[11px] text-[#00C98B] font-mono flex-wrap gap-2">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C98B]" />
                      <span>Pipeline: &quot;New Lead &rarr; Qualified ($1,800)&quot;</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-[#00D9FF]" />
                      <span>Calendar Slot Held</span>
                    </span>
                  </div>
                </div>

                {/* Workflow Automation Nodes */}
                <div className="p-4 rounded-2xl bg-[#071638]/70 border border-white/10 space-y-2.5 text-left">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                    <Workflow className="w-3.5 h-3.5 text-[#E52BFF]" />
                    <span>Real-Time Autonomous Workflow Sequence</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono">
                    <div className="p-2 rounded-lg bg-[#0A1940] border border-white/10 text-slate-200">
                      1. Inbound Ping
                    </div>
                    <div className="p-2 rounded-lg bg-[#0A1940] border border-[#00D9FF]/30 text-[#00D9FF]">
                      2. AI Qualification
                    </div>
                    <div className="p-2 rounded-lg bg-[#0A1940] border border-[#873BFF]/30 text-[#873BFF]">
                      3. Calendar Sync
                    </div>
                    <div className="p-2 rounded-lg bg-[#0A1940] border border-[#00C98B]/30 text-[#00C98B]">
                      4. CRM Deal Created
                    </div>
                  </div>
                </div>

              </div>
            </Card3DTilt>
          </div>

        </div>

      </Container>
    </section>
  );
}
