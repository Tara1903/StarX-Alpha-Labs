"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Laptop, Smartphone, Layers, ArrowUpRight, Globe, Sparkles } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

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

      // 3D Tilt angles (dramatic yet controlled)
      targetRotY = Math.max(-16, Math.min(16, deltaX * 14));
      targetRotX = Math.max(-12, Math.min(12, -deltaY * 12));

      // Specular spotlight coordinates on the device glass
      const spotX = `${Math.round(((e.clientX - rect.left) / rect.width) * 100)}%`;
      const spotY = `${Math.round(((e.clientY - rect.top) / rect.height) * 100)}%`;

      if (stageRef.current) {
        stageRef.current.style.setProperty("--spot-x", spotX);
        stageRef.current.style.setProperty("--spot-y", spotY);
      }
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
      setActiveHover(null);
    };

    // Smooth 60 FPS physics loop with spring inertia
    const animate = () => {
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      if (stageRef.current) {
        stageRef.current.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(
          2
        )}deg) rotateY(${currentRotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
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
      className="relative w-full max-w-3xl mx-auto flex items-center justify-center min-h-[460px] sm:min-h-[500px] select-none py-4"
    >
      {/* 1. Interactive 3D Three.js Particle Constellation Behind */}
      {mounted && (
        <div className="absolute inset-0 -top-6 w-full h-[520px] pointer-events-none z-0 opacity-80 flex items-center justify-center">
          <DynamicThreeCanvas cameraPosition={[0, 0, 6.2]} fov={45}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={2.0} color="#00D9FF" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#E52BFF" />
            <DynamicHero3DGlobe />
          </DynamicThreeCanvas>
        </div>
      )}

      {/* Radiant Pedestal Ambient Aura */}
      <div className="absolute w-[600px] h-[350px] bottom-0 rounded-full bg-gradient-to-tr from-[#087BFF]/30 via-[#00D9FF]/25 to-[#E52BFF]/30 blur-[130px] pointer-events-none -z-10" />

      {/* 2. 3D Master Hardware Stage (Laptop + Mobile + Combo Card, Side-by-Side, Zero Overlap) */}
      <div
        ref={stageRef}
        className="relative z-10 w-full rounded-3xl transition-transform duration-75 ease-out preserve-3d group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Photorealistic Master Hardware Artwork (Open Laptop, Standing Mobile, Combo Card) */}
        <div className="relative w-full aspect-[1006/485] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10">
          <Image
            src="/brand/hero-devices-master.png"
            alt="StarX Alpha Labs 3D Hardware Devices: Website Development Laptop, Mobile App Smartphone, and Combo Solution"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 750px"
            className="object-contain object-center scale-[1.02] transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dynamic Cursor Light Glint Reflection Across Screens */}
          <div
            className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-300 group-hover:opacity-85 mix-blend-screen"
            style={{
              background:
                "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(0, 217, 255, 0.25) 0%, rgba(229, 43, 255, 0.12) 30%, transparent 65%)",
            }}
          />

          {/* Interactive Hover Hotspot 1: Website Development (Laptop Area) */}
          <Link
            href="/website-development"
            onMouseEnter={() => setActiveHover("laptop")}
            className="absolute left-[3%] top-[5%] w-[42%] h-[90%] z-20 cursor-pointer rounded-2xl transition-all duration-300 hover:bg-[#00D9FF]/5"
            title="Explore Website Development Division"
          >
            <div
              className={`absolute top-2 left-4 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all duration-300 flex items-center gap-1.5 ${
                activeHover === "laptop"
                  ? "bg-[#00D9FF] text-[#030B24] shadow-[0_0_20px_#00D9FF] scale-105"
                  : "bg-[#071638]/90 text-[#00D9FF] border border-[#00D9FF]/50 opacity-0 group-hover:opacity-100"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Explore Websites</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </Link>

          {/* Interactive Hover Hotspot 2: Mobile App Development (Phone Area) */}
          <Link
            href="/app-development"
            onMouseEnter={() => setActiveHover("phone")}
            className="absolute left-[45%] top-[10%] w-[25%] h-[85%] z-20 cursor-pointer rounded-3xl transition-all duration-300 hover:bg-[#E52BFF]/5"
            title="Explore Mobile App Development Division"
          >
            <div
              className={`absolute top-2 left-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all duration-300 flex items-center gap-1.5 ${
                activeHover === "phone"
                  ? "bg-[#E52BFF] text-white shadow-[0_0_20px_#E52BFF] scale-105"
                  : "bg-[#071638]/90 text-[#E52BFF] border border-[#E52BFF]/50 opacity-0 group-hover:opacity-100"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Explore Apps</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </Link>

          {/* Interactive Hover Hotspot 3: Combo Website + App (Combo Card Area) */}
          <Link
            href="/website-app-combo"
            onMouseEnter={() => setActiveHover("combo")}
            className="absolute right-[3%] top-[20%] w-[27%] h-[65%] z-20 cursor-pointer rounded-3xl transition-all duration-300 hover:bg-[#087BFF]/10 hover:border-2 hover:border-[#00D9FF]/60"
            title="Explore Combo Website + App Package (Best Value)"
          >
            <div
              className={`absolute top-2 right-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all duration-300 flex items-center gap-1.5 ${
                activeHover === "combo"
                  ? "bg-gradient-to-r from-[#00D9FF] to-[#E52BFF] text-white shadow-[0_0_20px_#00D9FF] scale-105"
                  : "bg-[#071638]/90 text-white border border-[#00D9FF]/50 opacity-0 group-hover:opacity-100"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>View Combo</span>
              <ArrowUpRight className="w-3 h-3 text-[#FF35B8]" />
            </div>
          </Link>
        </div>

        {/* Floating Neon Reflection Floor Base Ring */}
        <div className="w-[85%] mx-auto h-4 bg-gradient-to-r from-transparent via-[#00D9FF]/40 to-transparent blur-md -mt-2 rounded-full pointer-events-none" />
      </div>
    </div>
  );
}