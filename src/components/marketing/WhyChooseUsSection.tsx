"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Card3DTilt } from "@/components/ui/Card3DTilt";

export function WhyChooseUsSection() {
  const pillars = [
    { emoji: "💎", title: "End-to-End IT Solutions", glow: "rgba(0, 217, 255, 0.8)", border: "hover:border-[#00D9FF]" },
    { emoji: "🚀", title: "Website | App | Combo Development", glow: "rgba(229, 43, 255, 0.8)", border: "hover:border-[#E52BFF]" },
    { emoji: "🛡️", title: "Secure & Reliable", glow: "rgba(0, 201, 139, 0.8)", border: "hover:border-[#00C98B]" },
    { emoji: "🎛️", title: "Fully Customizable", glow: "rgba(0, 217, 255, 0.8)", border: "hover:border-[#00D9FF]" },
    { emoji: "🎧", title: "Expert Support", glow: "rgba(8, 123, 255, 0.8)", border: "hover:border-[#087BFF]" },
    { emoji: "📈", title: "Business Growth Focused", glow: "rgba(255, 148, 31, 0.8)", border: "hover:border-[#FF941F]" }
  ];

  return (
    <section id="why" className="py-20 bg-[#071638] relative overflow-hidden">
      <Container className="space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#00D9FF]" />
            <span>Why Choose STARX ALPHA LABS?</span>
            <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#00D9FF]" />
          </h2>
        </div>

        {/* 6 Minimalist Diamond Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {pillars.map((p) => (
            <Card3DTilt
              key={p.title}
              glowColor={p.glow}
              maxTilt={12}
              className={`p-6 rounded-2xl bg-[#0A1940] border border-white/10 ${p.border} transition-all space-y-3 flex flex-col items-center justify-center`}
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
            >
              <div className="text-3xl">{p.emoji}</div>
              <div className="text-xs font-bold text-white leading-snug">{p.title}</div>
            </Card3DTilt>
          ))}
        </div>

      </Container>
    </section>
  );
}
