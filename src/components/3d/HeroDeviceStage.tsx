"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Laptop, Smartphone, Globe, Layers, Sparkles, CheckCircle2 } from "lucide-react";

// Dynamically import ThreeCanvas to avoid SSR issues
const DynamicThreeCanvas = dynamic(
  () => import("./ThreeCanvas").then((mod) => mod.ThreeCanvas),
  { ssr: false }
);

const DynamicHero3DGlobe = dynamic(
  () => import("./Hero3DGlobe").then((mod) => mod.Hero3DGlobe),
  { ssr: false }
);

export function HeroDeviceStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stage = stageRef.current;
    if (!stage) return;

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

        // 3D Tilt calculation
        const rotY = deltaX * 12; // degrees
        const rotX = -deltaY * 12;

        stage.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });
    };

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      stage.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    stage.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      stage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto flex items-center justify-center min-h-[460px] select-none">
      
      {/* 3D Holographic Globe Canvas in Background */}
      {mounted && (
        <div className="absolute inset-0 -top-8 w-full h-[520px] pointer-events-none z-0 opacity-85">
          <DynamicThreeCanvas cameraPosition={[0, 0, 6]} fov={45}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00D9FF" />
            <pointLight position={[-10, -10, -10]} intensity={1.0} color="#E52BFF" />
            <DynamicHero3DGlobe />
          </DynamicThreeCanvas>
        </div>
      )}

      {/* Ambient Neon Backlight Aura */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#087BFF]/25 via-[#00D9FF]/20 to-[#E52BFF]/25 blur-[120px] pointer-events-none -z-10" />

      {/* 3D Device Rig (Mouse-Reactive) */}
      <div
        ref={stageRef}
        className="relative z-10 w-full transition-transform duration-200 ease-out preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Floating 3D HUD Tag 1: Website Development */}
        <div className="absolute -top-6 left-6 z-30 animate-bounce duration-1000" style={{ animationDuration: "3.5s" }}>
          <div className="px-3.5 py-1.5 rounded-xl bg-[#071638]/95 border border-[#00D9FF]/70 text-white text-xs font-bold shadow-[0_0_20px_rgba(0,217,255,0.4)] flex items-center gap-2 backdrop-blur-xl">
            <Globe className="w-4 h-4 text-[#00D9FF]" />
            <span className="text-white font-extrabold tracking-wide">Website Development</span>
          </div>
          {/* Laser-Light Tether Line to Laptop */}
          <div className="w-0.5 h-6 bg-gradient-to-b from-[#00D9FF] via-[#00D9FF]/60 to-transparent ml-6 shadow-[0_0_8px_#00D9FF]" />
        </div>

        {/* Floating 3D HUD Tag 2: Mobile App Development */}
        <div className="absolute -top-3 right-4 z-30 animate-bounce duration-1000" style={{ animationDuration: "4s", animationDelay: "1s" }}>
          <div className="px-3.5 py-1.5 rounded-xl bg-[#071638]/95 border border-[#E52BFF]/70 text-white text-xs font-bold shadow-[0_0_20px_rgba(229,43,255,0.4)] flex items-center gap-2 backdrop-blur-xl">
            <Smartphone className="w-4 h-4 text-[#E52BFF]" />
            <span className="text-white font-extrabold tracking-wide">Mobile App Development</span>
          </div>
          {/* Laser-Light Tether Line to Phone */}
          <div className="w-0.5 h-6 bg-gradient-to-b from-[#E52BFF] via-[#E52BFF]/60 to-transparent ml-8 shadow-[0_0_8px_#E52BFF]" />
        </div>

        {/* Floating 3D HUD Tag 3: Combo Website + App */}
        <div className="absolute bottom-6 -right-6 z-30 animate-bounce duration-1000" style={{ animationDuration: "4.5s", animationDelay: "0.5s" }}>
          <div className="p-3.5 rounded-2xl bg-[#071638]/95 border-2 border-[#087BFF]/70 text-white text-xs font-bold shadow-[0_0_30px_rgba(8,123,255,0.5)] flex flex-col items-center gap-1.5 backdrop-blur-xl ring-1 ring-[#00D9FF]/40">
            <div className="flex items-center gap-1.5 text-[#00D9FF]">
              <Laptop className="w-4 h-4" />
              <span className="text-xs font-extrabold">+</span>
              <Smartphone className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#FFFFFF] to-[#FF35B8]">
              Combo Website + App
            </span>
          </div>
        </div>

        {/* 3D Realistic Laptop Container */}
        <div className="relative mx-auto w-11/12 rounded-2xl bg-[#0A1940] border-2 border-[#00D9FF]/50 shadow-[0_20px_60px_rgba(0,217,255,0.35)] overflow-hidden p-3 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          
          {/* Laptop Screen Bezel */}
          <div className="bg-[#030B24] rounded-xl border border-white/10 p-3.5 text-left space-y-3 shadow-inner">
            {/* Browser Tab Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono text-slate-400 ml-2">starxalphalabs.com</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-[#00D9FF] uppercase tracking-wider bg-[#087BFF]/20 px-2 py-0.5 rounded border border-[#00D9FF]/30">
                Live Web Core
              </span>
            </div>

            {/* Simulated Live Interface */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#087BFF]/20 via-[#071638] to-[#030B24] border border-[#00D9FF]/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold text-[#00D9FF] uppercase">
                  STARX ALPHA LABS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C98B] animate-pulse" />
              </div>
              <div className="text-sm font-extrabold text-white">
                Professional Business Website
              </div>
              <p className="text-[10px] text-[#C8D5EF] leading-relaxed">
                Enterprise architecture with zero-trust database security, instantaneous page loads, and multi-currency billing.
              </p>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">
              <div className="p-1.5 rounded-lg bg-[#071638] border border-white/5 text-slate-300 flex items-center justify-center gap-1">
                <span className="text-[#00D9FF]">⚡</span> 100/100 CWV
              </div>
              <div className="p-1.5 rounded-lg bg-[#071638] border border-white/5 text-slate-300 flex items-center justify-center gap-1">
                <span className="text-[#00C98B]">🛡️</span> Zero Trust
              </div>
              <div className="p-1.5 rounded-lg bg-[#071638] border border-white/5 text-slate-300 flex items-center justify-center gap-1">
                <span className="text-[#E52BFF]">🚀</span> Next.js 16
              </div>
            </div>
          </div>

          {/* Laptop Base Lip / Keyboard Deck Notch */}
          <div className="h-2.5 w-full bg-[#071638] rounded-b-xl border-t border-white/10 mt-1 flex items-center justify-center">
            <div className="w-12 h-1 bg-white/20 rounded-full" />
          </div>
        </div>

        {/* 3D Realistic Smartphone Mockup (Overlapping Bottom Right) */}
        <div className="absolute -bottom-4 right-1 w-36 sm:w-44 rounded-2xl bg-[#0A1940] border-2 border-[#E52BFF]/60 shadow-[0_20px_50px_rgba(229,43,255,0.45)] p-2.5 transform rotate-6 hover:rotate-2 transition-transform duration-300 z-20">
          <div className="bg-[#030B24] rounded-xl border border-white/10 p-2 text-left space-y-2">
            {/* Phone Top Notch */}
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <span className="text-[8px] font-mono text-slate-400">9:41</span>
              <div className="w-8 h-1 rounded-full bg-white/20" />
              <span className="text-[8px] font-mono text-emerald-400">5G</span>
            </div>

            {/* Mobile App UI Card */}
            <div className="p-2 rounded-lg bg-[#873BFF]/20 border border-[#E52BFF]/30 text-[9px] space-y-0.5">
              <span className="font-bold text-white block">StarX Mobile App</span>
              <span className="text-[#E52BFF] text-[8px] font-mono block">iOS &amp; Android Synced</span>
            </div>

            {/* 2 Feature Tags */}
            <div className="grid grid-cols-2 gap-1 text-[8px] font-mono">
              <div className="p-1 rounded bg-[#071638] text-center text-slate-300 border border-white/5">
                🔔 Push
              </div>
              <div className="p-1 rounded bg-[#071638] text-center text-slate-300 border border-white/5">
                🔒 FaceID
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
