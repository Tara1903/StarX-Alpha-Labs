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
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {children}
      </Canvas>
    </div>
  );
};
