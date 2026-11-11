"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { Laptop, Smartphone, Tablet, ArrowRight, CheckCircle2 } from "lucide-react";

export function DemoShowcaseSection() {
  return (
    <section id="demos" className="py-16 bg-[#030B24] relative overflow-hidden">
      <Container>
        <Card3DTilt
          glowColor="rgba(0, 217, 255, 0.85)"
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0A1940] via-[#071638] to-[#0A1940] border-2 border-[#00D9FF]/40 shadow-[0_0_50px_rgba(0,217,255,0.22)] flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Left: 3-Device Glowing Screen Mockup Stack */}
          <div className="w-full lg:w-5/12 flex items-center justify-center gap-3">
            <div className="p-4 rounded-2xl bg-[#030B24] border border-[#087BFF]/50 text-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="text-3xl text-[#00D9FF]">💻</div>
              <span className="text-[10px] font-mono text-slate-300 mt-1 block">Desktop Web</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#030B24] border border-[#E52BFF]/50 text-center shadow-lg transform scale-105 z-10">
              <div className="text-3xl text-[#E52BFF]">📱</div>
              <span className="text-[10px] font-mono text-slate-300 mt-1 block">Mobile App</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#030B24] border border-[#FF941F]/50 text-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
              <div className="text-3xl text-[#FF941F]">📟</div>
              <span className="text-[10px] font-mono text-slate-300 mt-1 block">Tablet POS</span>
            </div>
          </div>

          {/* Right: Copy & CTA */}
          <div className="w-full lg:w-7/12 space-y-4 text-left">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              160+ Enterprise Demo Models
            </h3>
            <p className="text-sm text-[#C8D5EF]">
              Explore, Test &amp; Choose the Right Solution for Your Business with real interactive databases.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-medium pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> <span>Live Demo Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> <span>Feature Details</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> <span>Use Case Videos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C98B]" /> <span>Custom Quotation</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/demos"
                className="px-8 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#E52BFF] via-[#FF35B8] to-[#087BFF] shadow-[0_0_25px_rgba(229,43,255,0.4)] hover:brightness-110 transition-all inline-flex items-center gap-2"
              >
                <span>Explore All Demos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Card3DTilt>
      </Container>
    </section>
  );
}
