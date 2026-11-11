"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the real 3D hardware scene to prevent any SSR mismatches
const DynamicHardwareScene = dynamic(
  () => import("./Hero3DHardwareScene").then((mod) => mod.Hero3DHardwareScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] sm:h-[560px] rounded-3xl bg-radial from-[#071638] to-[#030B24] border border-[#00D9FF]/30 animate-pulse flex items-center justify-center">
        <span className="text-xs font-mono text-[#00D9FF] tracking-wider">
          LOADING 3D HARDWARE SCENE...
        </span>
      </div>
    ),
  }
);

export function HeroDeviceStage() {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center select-none py-2">
      {/* Radiant Pedestal Ambient Aura */}
      <div className="absolute w-[650px] h-[380px] bottom-0 rounded-full bg-gradient-to-tr from-[#087BFF]/30 via-[#00D9FF]/20 to-[#E52BFF]/30 blur-[140px] pointer-events-none -z-10" />

      {/* Real 3D Hardware Stage (Laptop, Smartphone, Combo Card, Wireframe Earth Globe) */}
      <div className="w-full relative z-10">
        <DynamicHardwareScene />
      </div>
    </div>
  );
}
