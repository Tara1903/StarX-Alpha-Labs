import * as React from "react";

export function AmbientFallback() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 h-screen w-screen overflow-hidden bg-[#07111F]"
    >
      {/* High-performance CSS compositor glow spheres */}
      <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-[#1769AA]/15 blur-[160px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-[#32A9E8]/12 blur-[180px]" />
      <div className="absolute top-2/3 left-1/5 h-[400px] w-[400px] rounded-full bg-[#73D8FF]/8 blur-[140px]" />
    </div>
  );
}
