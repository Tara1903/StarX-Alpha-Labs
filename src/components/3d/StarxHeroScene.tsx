"use client";

import * as React from "react";
import { StarxEmblem } from "./StarxEmblem";
import { OrbitalElements } from "./OrbitalElements";

export function StarxHeroScene() {
  const [pointer, setPointer] = React.useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative w-full h-full min-h-[420px] md:min-h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      {/* Background ambient lighting in 3D canvas */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-10, 5, -5]} intensity={1.5} color="#32A9E8" />
      <directionalLight position={[0, -10, 5]} intensity={1.2} color="#1769AA" />

      {/* Hero 3D Objects */}
      <group position={[0, 0, 0]}>
        <StarxEmblem pointerPosition={pointer} />
        <OrbitalElements />
      </group>
    </div>
  );
}
