"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { DEMO_CATEGORIES } from "@/data/categories";

export function IndustriesSection() {
  const industriesMeta: Record<number, { emoji: string; glow: string; border: string; text: string }> = {
    1: { emoji: "🍴", glow: "rgba(255, 148, 31, 0.8)", border: "border-[#FF941F]/40 hover:border-[#FF941F]", text: "text-[#FF941F]" },
    2: { emoji: "🛒", glow: "rgba(0, 217, 255, 0.8)", border: "border-[#00D9FF]/40 hover:border-[#00D9FF]", text: "text-[#00D9FF]" },
    3: { emoji: "🎓", glow: "rgba(135, 59, 255, 0.8)", border: "border-[#873BFF]/40 hover:border-[#873BFF]", text: "text-[#873BFF]" },
    4: { emoji: "💗", glow: "rgba(229, 43, 255, 0.8)", border: "border-[#E52BFF]/40 hover:border-[#E52BFF]", text: "text-[#E52BFF]" },
    5: { emoji: "💼", glow: "rgba(0, 217, 255, 0.8)", border: "border-[#00D9FF]/40 hover:border-[#00D9FF]", text: "text-[#00D9FF]" },
    6: { emoji: "🏢", glow: "rgba(0, 201, 139, 0.8)", border: "border-[#00C98B]/40 hover:border-[#00C98B]", text: "text-[#00C98B]" },
    7: { emoji: "🧰", glow: "rgba(8, 123, 255, 0.8)", border: "border-[#087BFF]/40 hover:border-[#087BFF]", text: "text-[#087BFF]" },
    8: { emoji: "🏭", glow: "rgba(255, 148, 31, 0.8)", border: "border-[#FF941F]/40 hover:border-[#FF941F]", text: "text-[#FF941F]" },
    9: { emoji: "🤖", glow: "rgba(135, 59, 255, 0.8)", border: "border-[#873BFF]/40 hover:border-[#873BFF]", text: "text-[#873BFF]" },
    10: { emoji: "👥", glow: "rgba(255, 53, 184, 0.8)", border: "border-[#FF35B8]/40 hover:border-[#FF35B8]", text: "text-[#FF35B8]" },
    11: { emoji: "🎬", glow: "rgba(0, 217, 255, 0.8)", border: "border-[#00D9FF]/40 hover:border-[#00D9FF]", text: "text-[#00D9FF]" },
    12: { emoji: "📱", glow: "rgba(135, 59, 255, 0.8)", border: "border-[#873BFF]/40 hover:border-[#873BFF]", text: "text-[#873BFF]" },
  };

  return (
    <section id="industries" className="py-20 bg-[#071638] border-y border-white/5 relative overflow-hidden">
      <Container className="space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#00D9FF]" />
            <span>
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-[#E52BFF]">
                12 Industry Solutions
              </span>
            </span>
            <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#00D9FF]" />
          </h2>
          <p className="text-sm text-[#C8D5EF] max-w-xl mx-auto">
            Battle-tested industry architectures pre-configured with real-time dispatch, POS billing, and automated workflows.
          </p>
        </div>

        {/* 12 Industry Cards (2 rows of 6 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DEMO_CATEGORIES.map((cat) => {
            const meta = industriesMeta[cat.number] || industriesMeta[5];
            return (
              <Link key={cat.slug} href={`/demos/${cat.slug}`} className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/50 rounded-2xl">
                <Card3DTilt
                  glowColor={meta.glow}
                  maxTilt={10}
                  className={`p-4 rounded-2xl bg-[#0A1940] border ${meta.border} transition-all flex flex-col justify-between space-y-4 h-full group cursor-pointer`}
                  style={{ boxShadow: `0 4px 20px rgba(0,0,0,0.4)` }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-2xl">{meta.emoji}</span>
                    <span className={`text-sm font-bold ${meta.text} group-hover:translate-x-1 transition-transform`}>
                      ›
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                      Sector #{cat.number}
                    </span>
                    <div className="text-xs font-bold text-white group-hover:text-white leading-snug">
                      {cat.name}
                    </div>
                  </div>
                </Card3DTilt>
              </Link>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
