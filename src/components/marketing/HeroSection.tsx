"use client";

import * as React from "react";
import { LinkButton } from "@/components/ui/LinkButton";
import { Badge } from "@/components/ui/Badge";
import { SceneBoundary } from "@/components/3d/SceneBoundary";
import { StarxHeroScene } from "@/components/3d/StarxHeroScene";
import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, Sparkles, Shield, Cpu } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0A1424] pt-8 pb-16 md:py-24">
      {/* Cinematic Ambient Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#1769AA]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#32A9E8]/15 blur-[160px] pointer-events-none" />

      {/* Grid Pattern overlay for structural depth */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#19375E15_1px,transparent_1px),linear-gradient(to_bottom,#19375E15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left z-10">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#32A9E8]/30 bg-[#102D50]/60 backdrop-blur-sm text-xs font-semibold tracking-wider uppercase text-[#32A9E8]">
                <Sparkles className="w-3.5 h-3.5 text-[#32A9E8]" />
                <span>Premier Digital Engineering & AI Architecture</span>
              </div>
            </FadeIn>

            <Reveal direction="up" distance={20} delay={0.2}>
              <h1 className="text-display font-extrabold tracking-tight text-white leading-tight">
                Technology That{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769AA] via-[#32A9E8] to-[#63B8F8]">
                  Powers
                </span>{" "}
                Your Business.
              </h1>
            </Reveal>

            <Reveal direction="up" distance={15} delay={0.3}>
              <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
                We build professional websites, intelligent business applications, e-commerce platforms
                and custom AI-powered digital solutions that help businesses grow.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal direction="up" distance={15} delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <LinkButton
                  href="#divisions"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Services
                </LinkButton>
                <LinkButton
                  href="#contact"
                  variant="secondary"
                  size="lg"
                >
                  Start a Project
                </LinkButton>
              </div>
            </Reveal>

            {/* Quality Anchors */}
            <FadeIn delay={0.5}>
              <div className="pt-6 border-t border-[#19375E]/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase">
                    <Shield className="w-3.5 h-3.5 text-[#32A9E8]" /> Enterprise
                  </div>
                  <p className="text-[11px] text-slate-400">Robust security & governance</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase">
                    <Cpu className="w-3.5 h-3.5 text-[#32A9E8]" /> Custom AI
                  </div>
                  <p className="text-[11px] text-slate-400">Tailored model integrations</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#32A9E8]" /> WebGL
                  </div>
                  <p className="text-[11px] text-slate-400">Cinematic digital design</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: 3D Interactive STARX Emblem */}
          <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] lg:h-[560px] flex items-center justify-center">
            {/* Glow backdrop behind 3D Canvas */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1769AA]/20 via-[#32A9E8]/20 to-transparent blur-3xl pointer-events-none" />

            <SceneBoundary
              cameraPosition={[0, 0, 5]}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              fallbackContent={
                <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-[#0F2038] border border-[#19375E] rounded-3xl">
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-[#102D50] to-[#1769AA] border border-[#32A9E8]/40 flex items-center justify-center font-extrabold text-3xl text-white shadow-xl mb-4">
                    <span className="text-[#32A9E8]">S</span>X
                  </div>
                  <Badge variant="electric" size="sm" dot>STARX 3D Emblem</Badge>
                  <p className="text-xs text-slate-400 mt-2 max-w-xs">
                    Accelerated hardware rendering fallback active.
                  </p>
                </div>
              }
            >
              <StarxHeroScene />
            </SceneBoundary>
          </div>
        </div>
      </div>
    </section>
  );
}
