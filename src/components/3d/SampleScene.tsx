"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function SampleScene() {
  const meshRef = React.useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#32A9E8" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#1769AA" />
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#102D50"
          emissive="#1769AA"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>
    </>
  );
}
