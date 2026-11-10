"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { isWebGLAvailable } from "./WebGLDetector";
import { NeuralMesh } from "./NeuralMesh";

// Dynamically import ThreeCanvas to ensure it is isolated strictly to the client bundle
const DynamicThreeCanvas = dynamic(
  () => import("./ThreeCanvas").then((mod) => mod.ThreeCanvas),
  {
    ssr: false,
    loading: () => <AmbientFallback />,
  }
);

function AmbientFallback() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#07111F]">
      <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-[#1769AA]/20 blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-[#32A9E8]/15 blur-[170px]" />
      <div className="absolute top-2/3 left-1/5 h-[400px] w-[400px] rounded-full bg-[#73D8FF]/10 blur-[140px]" />
    </div>
  );
}

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

  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const current = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setScrollProgress(Math.min(1, Math.max(0, current)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isMounted || !hasWebGL) {
    return <AmbientFallback />;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 h-screen w-screen overflow-hidden"
    >
      <DynamicThreeCanvas
        cameraPosition={[0, 0, 5.2]}
        fov={48}
        className="w-full h-full"
      >
        <NeuralMesh scrollProgress={scrollProgress} />
      </DynamicThreeCanvas>
    </div>
  );
}
