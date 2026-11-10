"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { AmbientFallback } from "./AmbientFallback";

// Dynamically import NeuralScene (which wraps Canvas and NeuralMesh)
const DynamicNeuralScene = dynamic(
  () => import("./NeuralScene").then((mod) => mod.NeuralScene),
  {
    ssr: false,
    loading: () => <AmbientFallback />,
  }
);

export function Immersive3DEnvironment() {
  const [canRender, setCanRender] = React.useState(false);

  React.useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setCanRender(Boolean(window.WebGLRenderingContext && gl));
    } catch {
      setCanRender(false);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 h-screen w-screen overflow-hidden"
    >
      {/* Ambient background depth glow */}
      <AmbientFallback />

      {/* Interactive 3D Hollow Wireframe Brain */}
      {canRender && (
        <DynamicNeuralScene className="w-full h-full relative z-10" />
      )}
    </div>
  );
}
