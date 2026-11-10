"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { isWebGLAvailable } from "./WebGLDetector";
import { AmbientFallback } from "./AmbientFallback";

// Dynamically import NeuralScene (which wraps Canvas and NeuralMesh)
const DynamicNeuralScene = dynamic(
  () => import("./NeuralScene").then((mod) => mod.NeuralScene),
  {
    ssr: false,
    loading: () => <AmbientFallback />,
  }
);

const noopSubscribe = () => () => {};

export function Immersive3DEnvironment() {
  const isMounted = React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const hasWebGL = React.useSyncExternalStore(
    noopSubscribe,
    () => isWebGLAvailable(),
    () => false
  );

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 h-screen w-screen overflow-hidden"
    >
      {/* Ambient background depth glow */}
      <AmbientFallback />

      {/* Interactive 3D Hollow Wireframe Brain */}
      {isMounted && hasWebGL && (
        <DynamicNeuralScene className="w-full h-full relative z-10" />
      )}
    </div>
  );
}
