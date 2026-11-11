"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { Globe, Smartphone, Laptop, CheckCircle2, ArrowRight } from "lucide-react";

export function DivisionsSection() {
  return (
    <section id="solutions" className="py-20 bg-[#030B24] relative overflow-hidden">
      <Container className="space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#00D9FF]" />
            <span>Our Core Solutions</span>
            <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#00D9FF]" />
          </h2>
          <p className="text-sm text-[#C8D5EF] max-w-xl mx-auto">
            Engineered software packages with transparent INR pricing, fixed milestone scopes, and full intellectual property ownership.
          </p>
        </div>

        {/* 3 Large Neon Glow Cards with 3D Tilt & Cursor Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CARD 1: Website Development (Electric Blue / Neon Cyan) */}
          <Card3DTilt
            glowColor="rgba(0, 217, 255, 0.85)"
            className="rounded-3xl p-8 bg-[#0A1940] border-2 border-[#00D9FF]/40 shadow-[0_0_35px_rgba(0,217,255,0.18)] flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#087BFF]/20 border border-[#00D9FF]/50 flex items-center justify-center text-2xl text-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.3)]">
                  💻
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Website Development</h3>
                  <span className="text-xs font-mono text-[#00D9FF] font-bold">W1–W6 Packages</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#C8D5EF]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                  <span>Business, E-commerce, Portal, CRM, LMS &amp; Custom Websites</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                  <span>Responsive &amp; SEO Ready (100/100 Core Web Vitals)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                  <span>Secure, Fast &amp; Scalable on Next.js 16 Edge Cloud</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/website-development"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white shadow-[0_0_20px_rgba(8,123,255,0.4)] hover:brightness-110 transition-all"
              >
                <span>View Website Demos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card3DTilt>

          {/* CARD 2: Mobile App Development (Electric Purple / Neon Magenta) */}
          <Card3DTilt
            glowColor="rgba(229, 43, 255, 0.85)"
            className="rounded-3xl p-8 bg-[#0A1940] border-2 border-[#E52BFF]/40 shadow-[0_0_35px_rgba(229,43,255,0.18)] flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#873BFF]/20 border border-[#E52BFF]/50 flex items-center justify-center text-2xl text-[#E52BFF] shadow-[0_0_20px_rgba(229,43,255,0.3)]">
                  📱
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Mobile App Development</h3>
                  <span className="text-xs font-mono text-[#E52BFF] font-bold">A1–A5 Packages</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#C8D5EF]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                  <span>Android, iOS &amp; Cross-platform (Flutter / React Native)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                  <span>Business, E-commerce, On-Demand, Social, Finance &amp; Utility Apps</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                  <span>High Performance &amp; User Friendly with Push Notifications</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/app-development"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 bg-gradient-to-r from-[#873BFF] to-[#E52BFF] text-white shadow-[0_0_20px_rgba(135,59,255,0.4)] hover:brightness-110 transition-all"
              >
                <span>View App Demos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card3DTilt>

          {/* CARD 3: Website + App Combo (Amber / Orange / Pink - Best Value) */}
          <Card3DTilt
            glowColor="rgba(255, 148, 31, 0.85)"
            className="rounded-3xl p-8 bg-[#0A1940] border-2 border-[#FF941F]/50 shadow-[0_0_35px_rgba(255,148,31,0.22)] flex flex-col justify-between relative overflow-hidden"
          >
            {/* Best Value Ribbon Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#E52BFF] to-[#FF35B8] text-white text-[10px] font-mono font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg">
              Best Value
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FF941F]/20 border border-[#FF941F]/50 flex items-center justify-center text-2xl text-[#FF941F] shadow-[0_0_20px_rgba(255,148,31,0.3)]">
                  💻📱
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Website + App Combo</h3>
                  <span className="text-xs font-mono text-[#FF941F] font-bold">C1–C5 Suites</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#C8D5EF]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                  <span>Complete Digital Solution with Unified PostgreSQL Database</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                  <span>Single Design, Unified Branding &amp; Centralized Admin</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0 mt-0.5" />
                  <span>Cost Effective &amp; Faster Deployment (Save up to ₹50,000)</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/website-app-combo"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF941F] via-[#FF35B8] to-[#FF941F] text-white shadow-[0_0_25px_rgba(255,148,31,0.4)] hover:brightness-110 transition-all"
              >
                <span>View Combo Demos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card3DTilt>

        </div>
      </Container>
    </section>
  );
}
