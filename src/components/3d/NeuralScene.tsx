"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { NeuralMesh } from "./NeuralMesh";
import { cn } from "@/lib/utils";

export interface NeuralSceneProps {
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export function NeuralScene({
  className,
  cameraPosition = [0, 0, 5.2],
  fov = 48,
}: NeuralSceneProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <NeuralMesh />
      </Canvas>
    </div>
  );
}
