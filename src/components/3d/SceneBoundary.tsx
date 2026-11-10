"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { isWebGLAvailable } from "./WebGLDetector";
import { cn } from "@/lib/utils";
import { ShieldAlert, Sparkles } from "lucide-react";

// Dynamically import ThreeCanvas to ensure it is isolated strictly to the client bundle
const DynamicThreeCanvas = dynamic(
  () => import("./ThreeCanvas").then((mod) => mod.ThreeCanvas),
  {
    ssr: false,
    loading: () => <SceneLoadingState />,
  }
);

interface SceneBoundaryProps {
  children: React.ReactNode;
  className?: string;
  fallbackContent?: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
}

function SceneLoadingState() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0A1424]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-2 border-[#19375E] border-t-[#32A9E8] animate-spin" />
          <Sparkles className="h-4 w-4 text-[#32A9E8] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
          Initializing Canvas
        </span>
      </div>
    </div>
  );
}

function DefaultStaticFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0F2038] via-[#0A1424] to-[#102D50] border border-[#19375E] rounded-2xl",
        className
      )}
    >
      <div className="h-12 w-12 rounded-xl bg-[#1769AA]/20 border border-[#1769AA]/40 flex items-center justify-center mb-3">
        <ShieldAlert className="h-6 w-6 text-[#32A9E8]" />
      </div>
      <h4 className="text-sm font-bold text-white mb-1">Interactive 3D Accelerated</h4>
      <p className="text-xs text-slate-400 max-w-xs">
        Hardware WebGL acceleration is unavailable in this environment. Showing high-fidelity static rendering.
      </p>
    </div>
  );
}

const noopSubscribe = () => () => {};

export const SceneBoundary: React.FC<SceneBoundaryProps> = ({
  children,
  className,
  fallbackContent,
  cameraPosition = [0, 0, 5],
  fov = 45,
}) => {
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

  if (!isMounted) {
    return (
      <div className={cn("relative w-full h-full min-h-[300px]", className)}>
        <SceneLoadingState />
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div className={cn("relative w-full h-full min-h-[300px]", className)}>
        {fallbackContent || <DefaultStaticFallback />}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full min-h-[300px]", className)}>
      <DynamicThreeCanvas cameraPosition={cameraPosition} fov={fov}>
        {children}
      </DynamicThreeCanvas>
    </div>
  );
};
