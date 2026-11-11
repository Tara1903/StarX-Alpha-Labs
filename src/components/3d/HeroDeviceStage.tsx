"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Laptop, Smartphone, Globe, ArrowUpRight } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized delta [-1, 1] relative to stage center
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp target rotation angles
      targetRotY = Math.max(-18, Math.min(18, deltaX * 16));
      targetRotX = Math.max(-14, Math.min(14, -deltaY * 14));

      // Specular spotlight coordinates on the device glass
      const spotX = `${Math.round(((e.clientX - rect.left) / rect.width) * 100)}%`;
      const spotY = `${Math.round(((e.clientY - rect.top) / rect.height) * 100)}%`;

      if (laptopRef.current) {
        laptopRef.current.style.setProperty("--spot-x", spotX);
        laptopRef.current.style.setProperty("--spot-y", spotY);
      }
      if (phoneRef.current) {
        phoneRef.current.style.setProperty("--spot-x", spotX);
        phoneRef.current.style.setProperty("--spot-y", spotY);
      }
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    // Smooth physics loop with spring inertia
    const animate = () => {
      // Lerp smoothing factor
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      if (stageRef.current) {
        stageRef.current.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(
          2
        )}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
      }

      // Elevated parallax for smartphone (floats forward and translates in 3D)
      if (phoneRef.current) {
        const phoneTranslateX = currentRotY * 1.2;
        const phoneTranslateY = -currentRotX * 0.8;
        phoneRef.current.style.transform = `translate3d(${phoneTranslateX.toFixed(
          1
        )}px, ${phoneTranslateY.toFixed(
          1
        )}px, 55px) rotateZ(5deg) rotateX(${(-currentRotX * 0.6).toFixed(
          2
        )}deg) rotateY(${(currentRotY * 0.7).toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto flex items-center justify-center min-h-[480px] sm:min-h-[520px] select-none py-6"
    >
      {/* 1. 3D Holographic Wireframe Globe in Background (Centered) */}
      {mounted && (
        <div className="absolute inset-0 -top-6 w-full h-[540px] pointer-events-none z-0 opacity-90 flex items-center justify-center">
          <DynamicThreeCanvas cameraPosition={[0, 0, 6.2]} fov={45}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={2.0} color="#00D9FF" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#E52BFF" />
            <DynamicHero3DGlobe />
          </DynamicThreeCanvas>
        </div>
      )}

      {/* Ambient Neon Backlight Aura Behind Devices */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#087BFF]/25 via-[#00D9FF]/20 to-[#E52BFF]/25 blur-[140px] pointer-events-none -z-10" />

      {/* 2. 3D Device Stage (Mouse-Reactive Parallax Rig) */}
      <div
        ref={stageRef}
        className="relative z-10 w-full transition-transform duration-75 ease-out preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ======================================================== */}
        {/* FLOATING HUD BADGE 1: Website Development (Top Left)    */}
        {/* ======================================================== */}
        <div
          className="absolute -top-7 left-4 sm:left-8 z-30 pointer-events-auto group cursor-default"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="px-4 py-2 rounded-2xl bg-[#071638]/95 border-2 border-[#00D9FF] text-white text-xs font-extrabold shadow-[0_0_25px_#00D9FF,inset_0_0_12px_rgba(0,217,255,0.3)] flex items-center gap-2.5 backdrop-blur-xl transition-transform duration-200 group-hover:scale-105">
            <Globe className="w-4 h-4 text-[#00D9FF] animate-spin-slow" />
            <span className="text-white font-extrabold tracking-wide text-xs sm:text-sm whitespace-nowrap">
              Website Development
            </span>
          </div>
          {/* Cyan Glowing Laser Tether connecting to Laptop top bezel */}
          <div className="w-[2px] h-7 bg-gradient-to-b from-[#00D9FF] via-[#00D9FF]/80 to-transparent ml-7 shadow-[0_0_10px_#00D9FF]" />
          {/* Connection Dot on Laptop Rim */}
          <div className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF] ml-[25px] -mt-1 animate-pulse" />
        </div>

        {/* ======================================================== */}
        {/* FLOATING HUD BADGE 2: Mobile App Development (Top Right) */}
        {/* ======================================================== */}
        <div
          className="absolute -top-4 right-6 sm:right-10 z-30 pointer-events-auto group cursor-default"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="px-4 py-2 rounded-2xl bg-[#071638]/95 border-2 border-[#E52BFF] text-white text-xs font-extrabold shadow-[0_0_25px_#E52BFF,inset_0_0_12px_rgba(229,43,255,0.3)] flex items-center gap-2.5 backdrop-blur-xl transition-transform duration-200 group-hover:scale-105">
            <Smartphone className="w-4 h-4 text-[#E52BFF]" />
            <span className="text-white font-extrabold tracking-wide text-xs sm:text-sm whitespace-nowrap">
              Mobile App Development
            </span>
          </div>
          {/* Magenta Glowing Laser Tether connecting to Device */}
          <div className="w-[2px] h-7 bg-gradient-to-b from-[#E52BFF] via-[#E52BFF]/80 to-transparent ml-8 shadow-[0_0_10px_#E52BFF]" />
          {/* Connection Dot on Device Rim */}
          <div className="w-2 h-2 rounded-full bg-[#E52BFF] shadow-[0_0_10px_#E52BFF] ml-[29px] -mt-1 animate-pulse" />
        </div>

        {/* ======================================================== */}
        {/* 3D LAPTOP HARDWARE CHASSIS (Centerpiece)                 */}
        {/* ======================================================== */}
        <div
          ref={laptopRef}
          style={{ transform: "translateZ(20px)" }}
          className="relative mx-auto w-[92%] sm:w-[90%] rounded-2xl bg-[#0A1940] border-2 border-[#00D9FF] shadow-[0_0_40px_rgba(0,217,255,0.45),0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden p-3.5 sm:p-4 transition-all duration-200"
        >
          {/* Specular Cursor Glass Reflection Overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl z-20 opacity-70"
            style={{
              background:
                "radial-gradient(550px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(0, 217, 255, 0.14), transparent 50%)",
            }}
          />

          {/* Laptop Screen Display Area */}
          <div className="bg-[#030B24] rounded-xl border border-white/10 p-3.5 sm:p-4 text-left space-y-3.5 shadow-inner relative z-10">
            {/* Top Browser Bar matching screenshot */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-[0_0_6px_#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
                <span className="text-[11px] sm:text-xs font-mono text-slate-300 ml-3 tracking-wide">
                  starxalphalabs.com
                </span>
              </div>
              <span className="text-[10px] font-mono font-extrabold text-[#00D9FF] uppercase tracking-wider bg-[#00D9FF]/10 px-2.5 py-0.5 rounded-md border border-[#00D9FF]/50 shadow-[0_0_12px_rgba(0,217,255,0.35)]">
                LIVE WEB CORE
              </span>
            </div>

            {/* Simulated Live Product Screen Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#087BFF]/20 via-[#071638]/90 to-[#030B24] border border-[#00D9FF]/35 space-y-2 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] sm:text-xs font-extrabold text-[#00D9FF] uppercase tracking-wider">
                  STARX ALPHA LABS
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00C98B] shadow-[0_0_8px_#00C98B] animate-pulse" />
              </div>
              <div className="text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight leading-snug">
                Professional Business Website
              </div>
              <p className="text-xs sm:text-sm text-[#C8D5EF] leading-relaxed max-w-md">
                Enterprise architecture with zero-trust database security, instantaneous multi-currency billing.
              </p>
            </div>

            {/* 3 Metric Pills on Screen */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-[10px] font-mono">
              <div className="p-2 rounded-lg bg-[#071638] border border-white/10 text-slate-200 flex items-center justify-center gap-1.5 shadow-sm">
                <span className="text-[#00D9FF]">⚡</span> 100/100 CWV
              </div>
              <div className="p-2 rounded-lg bg-[#071638] border border-white/10 text-slate-200 flex items-center justify-center gap-1.5 shadow-sm">
                <span className="text-[#00C98B]">🛡️</span> Zero Trust
              </div>
              <div className="p-2 rounded-lg bg-[#071638] border border-white/10 text-slate-200 flex items-center justify-center gap-1.5 shadow-sm">
                <span className="text-[#E52BFF]">🚀</span> Next.js 16
              </div>
            </div>
          </div>

          {/* Laptop Base Lip / Keyboard Deck with Center Notch */}
          <div className="h-3 w-full bg-[#071638] rounded-b-xl border-t border-white/10 mt-1.5 flex items-center justify-center">
            <div className="w-14 h-1 bg-white/30 rounded-full" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3D SMARTPHONE HARDWARE CHASSIS (Overlapping Bottom Right) */}
        {/* ======================================================== */}
        <div
          ref={phoneRef}
          className="absolute -bottom-6 -right-2 sm:right-2 w-44 sm:w-56 rounded-3xl bg-[#0A1940] border-2 border-[#873BFF] shadow-[0_20px_50px_rgba(135,59,255,0.55),0_0_35px_rgba(229,43,255,0.4)] p-3 z-30 transition-all duration-150"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Specular Cursor Glass Reflection Overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl z-20 opacity-70"
            style={{
              background:
                "radial-gradient(350px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(229, 43, 255, 0.2), transparent 50%)",
            }}
          />

          <div className="bg-[#030B24] rounded-2xl border border-white/10 p-2.5 text-left space-y-2.5 relative z-10 shadow-inner">
            {/* Phone Top Notch / Status Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 px-1">
              <span className="text-[9px] font-mono font-bold text-slate-300">9:41</span>
              <div className="w-10 h-1 rounded-full bg-white/30" />
              <span className="text-[9px] font-mono text-[#00C98B] font-bold">5G</span>
            </div>

            {/* Mobile App UI Card */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#873BFF]/25 to-[#071638] border border-[#E52BFF]/40 text-[10px] space-y-1">
              <span className="font-extrabold text-white block text-xs">StarX Mobile App</span>
              <span className="text-[#E52BFF] text-[9px] font-mono block">iOS &amp; Android Synced</span>
            </div>

            {/* 2 Feature Tags */}
            <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono font-semibold">
              <div className="p-1.5 rounded-lg bg-[#071638] text-center text-slate-200 border border-white/10 shadow-sm">
                🔔 Push
              </div>
              <div className="p-1.5 rounded-lg bg-[#071638] text-center text-slate-200 border border-white/10 shadow-sm">
                🔒 FaceID
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* FLOATING HUD BADGE 3: Combo Website + App                */}
        {/* (Floats directly above the Phone on the right)           */}
        {/* ======================================================== */}
        <div
          className="absolute bottom-16 sm:bottom-20 -right-4 sm:-right-8 z-40 pointer-events-auto group cursor-default"
          style={{ transform: "translateZ(95px)" }}
        >
          <div className="px-5 py-3 rounded-2xl bg-[#071638]/95 border-2 border-[#00D9FF] text-white shadow-[0_0_30px_rgba(0,217,255,0.6),inset_0_0_12px_rgba(0,217,255,0.3)] flex flex-col items-center gap-1.5 backdrop-blur-xl ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105">
            {/* Top row: Laptop icon + '+' + Phone icon */}
            <div className="flex items-center gap-2 text-[#00D9FF]">
              <Laptop className="w-4 h-4 text-[#00D9FF]" />
              <span className="text-xs font-black text-white">+</span>
              <Smartphone className="w-4 h-4 text-[#00D9FF]" />
            </div>
            {/* Bottom row: Combo Website + App */}
            <span className="text-xs sm:text-sm font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-white to-[#FF35B8] whitespace-nowrap">
              Combo Website + App
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}