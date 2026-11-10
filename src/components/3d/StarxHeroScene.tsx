"use client";

import * as React from "react";
import { StarxEmblem } from "./StarxEmblem";
import { OrbitalElements } from "./OrbitalElements";

export function StarxHeroScene() {
  return (
    <>
      {/* Background ambient lighting in 3D canvas */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-10, 5, -5]} intensity={1.5} color="#32A9E8" />
      <directionalLight position={[0, -10, 5]} intensity={1.2} color="#1769AA" />

      {/* Hero 3D Objects */}
      <group position={[0, 0, 0]}>
        <StarxEmblem />
        <OrbitalElements />
      </group>
    </>
  );
}

