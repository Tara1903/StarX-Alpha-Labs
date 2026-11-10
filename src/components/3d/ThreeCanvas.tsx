"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { cn } from "@/lib/utils";

export interface ThreeCanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  children,
  className,
  cameraPosition = [0, 0, 5],
  fov = 45,
}) => {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        // Capping DPR to 1.5 avoids rendering 4x to 9x pixels on dense screens with zero visible loss
        dpr={[1, 1.5]}
        gl={{
          // Analytical shader SDF has built-in smoothstep antialiasing; hardware MSAA is disabled to save fill rate
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        {children}
      </Canvas>
    </div>
  );
};
