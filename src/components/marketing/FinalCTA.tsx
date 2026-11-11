"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { ArrowRight, Calendar, Sparkles, Send } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="contact" className="py-20 bg-[#030B24] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#087BFF]/20 via-[#00D9FF]/15 to-[#E52BFF]/20 blur-[160px] pointer-events-none -z-10" />

      <Container className="max-w-5xl">
        <Card3DTilt
          glowColor="rgba(0, 217, 255, 0.75)"
          className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#0A1940] via-[#071638] to-[#0A1940] border-2 border-[#00D9FF]/40 shadow-[0_0_50px_rgba(0,217,255,0.22)] text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#071638]/90 text-xs font-mono text-[#00D9FF] mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Production Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Have a Project in Mind?
          </h2>

          <p className="text-base sm:text-lg text-[#C8D5EF] max-w-xl mx-auto leading-relaxed">
            Let&apos;s turn your idea into a powerful digital solution. Fast deployment, dedicated senior engineering, and transparent milestone pricing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/project-calculator"
              className="px-8 py-4 rounded-full font-extrabold text-sm text-white bg-gradient-to-r from-[#E52BFF] via-[#FF941F] to-[#E52BFF] shadow-[0_0_30px_rgba(229,43,255,0.4)] hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span>🚀 Start a Project Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/book-consultation"
              className="px-7 py-4 rounded-full font-bold text-sm text-white bg-[#030B24] border border-[#00D9FF]/50 hover:border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.2)] hover:bg-[#071638] transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#00D9FF]" />
              <span>Schedule a Call</span>
            </Link>
          </div>
        </Card3DTilt>
      </Container>
    </section>
  );
}
