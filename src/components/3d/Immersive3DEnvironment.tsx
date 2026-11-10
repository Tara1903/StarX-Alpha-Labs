"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { isWebGLAvailable } from "./WebGLDetector";
import { AmbientFallback } from "./AmbientFallback";

// Dynamically import ThreeCanvas strictly after initial page load & main thread idle
const DynamicThreeCanvas = dynamic(
  () => import("./ThreeCanvas").then((mod) => mod.ThreeCanvas),
  {
    ssr: false,
    loading: () => <AmbientFallback />,
  }
);

// Dynamically import NeuralMesh particle math
const DynamicNeuralMesh = dynamic(
  () => import("./NeuralMesh").then((mod) => mod.NeuralMesh),
  {
    ssr: false,
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

  const [shouldLoad3D, setShouldLoad3D] = React.useState(false);
  const [sceneReady, setSceneReady] = React.useState(false);

  // Progressive loading: Defer WebGL context init to browser idle time to guarantee instant LCP & TBT
  React.useEffect(() => {
    if (!isMounted || !hasWebGL) return;

    if ("requestIdleCallback" in window) {
      const idleHandle = (window as Window).requestIdleCallback(
        () => setShouldLoad3D(true),
        { timeout: 1000 }
      );
      return () => (window as Window).cancelIdleCallback(idleHandle);
    } else {
      const timer = setTimeout(() => setShouldLoad3D(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isMounted, hasWebGL]);

  // Stage 1: Fallback to pure CSS ambient gradient glows if WebGL is unavailable or still preparing
  if (!isMounted || !hasWebGL || !shouldLoad3D) {
    return <AmbientFallback />;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 h-screen w-screen overflow-hidden"
    >
      {/* Background depth glow: Always present during seamless fade-in */}
      <AmbientFallback />

      {/* Stage 3: Smooth WebGL scene fade-in */}
      <div
        className={`w-full h-full transition-opacity duration-1000 ease-out ${
          sceneReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <DynamicThreeCanvas
          cameraPosition={[0, 0, 5.2]}
          fov={48}
          className="w-full h-full"
        >
          <DynamicNeuralMesh onReady={() => setSceneReady(true)} />
        </DynamicThreeCanvas>
      </div>
    </div>
  );
}
