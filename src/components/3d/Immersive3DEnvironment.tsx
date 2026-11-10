"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { AmbientFallback } from "./AmbientFallback";

// Dynamically import NeuralScene strictly on the client bundle
const DynamicNeuralScene = dynamic(
  () => import("./NeuralScene").then((mod) => mod.NeuralScene),
  {
    ssr: false,
    loading: () => <AmbientFallback />,
  }
);

export function Immersive3DEnvironment() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 h-screen w-screen overflow-hidden"
    >
      {/* Ambient background depth glow */}
      <AmbientFallback />

      {/* Interactive 3D Hollow Wireframe Brain */}
      <DynamicNeuralScene className="w-full h-full relative z-10" />
    </div>
  );
}
