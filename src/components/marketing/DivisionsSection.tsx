"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { Globe, Smartphone, Layers, ArrowRight, CheckCircle2, Sparkles, Clock, Calculator } from "lucide-react";
import { formatINR } from "@/data/developmentPackages";

interface DivisionCardProps {
  division: {
    badge: string;
    code: string;
    title: string;
    icon: React.ReactNode;
    pricing: string;
    description: string;
    capabilities: string[];
    linkText: string;
    href: string;
    glowColor: string;
    accentGradient: string;
  };
}

function DivisionCard({ division }: DivisionCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative rounded-3xl p-8 sm:p-10 bg-[#0A1940] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden group shadow-xl"
    >
      {/* Interactive cursor light flare */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${division.glowColor}, transparent 70%)`,
        }}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 bg-[#071638] text-white">
            {division.code}
          </span>
          <div className="h-12 w-12 rounded-2xl bg-[#071638] border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
            {division.icon}
          </div>
        </div>

        <div>
          <span className="text-[11px] font-mono text-[#00D9FF] uppercase tracking-wider block mb-1">
            {division.badge}
          </span>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {division.title}
          </h3>
          <div className="mt-2 text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00D9FF]">
            {division.pricing}
          </div>
          <p className="mt-3 text-xs sm:text-sm text-[#C8D5EF] leading-relaxed">
            {division.description}
          </p>
        </div>

        <div className="pt-4 border-t border-white/5 space-y-2.5">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Core Technical Inclusions
          </p>
          {division.capabilities.map((cap) => (
            <div key={cap} className="flex items-center gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#00C98B] shrink-0" />
              <span>{cap}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 mt-6">
        <Link
          href={division.href}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs flex items-center justify-between bg-gradient-to-r ${division.accentGradient} text-white shadow-lg hover:brightness-110 transition-all`}
        >
          <span>{division.linkText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export function DivisionsSection() {
  const divisions = [
    {
      code: "DIVISION A",
      badge: "W1–W6 Packages",
      title: "Website Development",
      pricing: `From ${formatINR(7999)} to ${formatINR(99999)}+`,
      icon: <Globe className="w-6 h-6 text-[#00D9FF]" />,
      description: "High-speed Next.js 16 websites, headless CMS storefronts, multi-vendor marketplaces and full-stack SaaS portals.",
      capabilities: [
        "100/100 Core Web Vitals speed optimization",
        "Mobile-first responsive fluid layouts",
        "Headless CMS for zero-code content editing",
        "Integrated SEO meta architecture & Google indexation",
        "100% intellectual property & source code ownership"
      ],
      linkText: "Explore Website Packages (W1–W6)",
      href: "/website-development",
      glowColor: "rgba(0, 217, 255, 0.2)",
      accentGradient: "from-[#087BFF] to-[#00D9FF]"
    },
    {
      code: "DIVISION B",
      badge: "A1–A5 Packages",
      title: "Mobile App Development",
      pricing: `From ${formatINR(19999)} to ${formatINR(149999)}+`,
      icon: <Smartphone className="w-6 h-6 text-[#E52BFF]" />,
      description: "Native and cross-platform iOS and Android mobile apps engineered for speed, offline caching, and user retention.",
      capabilities: [
        "Flutter & React Native cross-platform engines",
        "Automated push notifications & deep link routing",
        "Biometric authentication & encrypted sessions",
        "Google Play Store & Apple App Store submission",
        "Web admin dashboard to manage users & content"
      ],
      linkText: "Explore App Packages (A1–A5)",
      href: "/app-development",
      glowColor: "rgba(229, 43, 255, 0.2)",
      accentGradient: "from-[#873BFF] to-[#E52BFF]"
    },
    {
      code: "DIVISION C",
      badge: "C1–C5 Suites",
      title: "Website + App Combo",
      pricing: `From ${formatINR(24999)} to ${formatINR(199999)}+`,
      icon: <Layers className="w-6 h-6 text-[#FF941F]" />,
      description: "Synchronized dual-platform powerhouses. High-converting website, iOS & Android apps, and one central Super Admin.",
      capabilities: [
        "Shared Supabase PostgreSQL database & backend",
        "Single Super Admin controls web and mobile",
        "Real savings up to ₹50,000 vs separate agency builds",
        "Unified user accounts and synchronized carts",
        "Single commercial contract & unified SLA maintenance"
      ],
      linkText: "Explore Combo Suites (C1–C5)",
      href: "/website-app-combo",
      glowColor: "rgba(255, 148, 31, 0.2)",
      accentGradient: "from-[#FF941F] to-[#FF35B8]"
    }
  ];

  return (
    <section id="divisions" className="relative py-16 sm:py-20 md:py-24 bg-[#030B24] overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D9FF]/30 bg-[#071638]/70 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-[#00D9FF]">
              Core Business Divisions
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Three Specialized Engineering Divisions.
          </h2>

          <p className="text-base sm:text-lg text-[#C8D5EF] max-w-2xl mx-auto font-light leading-relaxed">
            StarX Alpha Labs organizes its technical capabilities into three focused development divisions,
            all governed by strict enterprise SLAs and unified INR pricing.
          </p>
        </div>

        {/* Divisions Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {divisions.map((div) => (
            <DivisionCard key={div.title} division={div} />
          ))}
        </div>

        {/* Central Hub Footer Action */}
        <div className="mt-12 text-center">
          <Link
            href="/development-services"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00D9FF] hover:underline"
          >
            <span>View All Three Divisions &amp; Comprehensive Package Comparison</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
