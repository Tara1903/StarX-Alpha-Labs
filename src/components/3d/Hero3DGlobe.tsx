"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Hero3DGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Generate particle constellation around the globe
  const [particlesPos] = useMemo(() => {
    const count = 450;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    return [positions];
  }, []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) {
      // Base continuous rotation
      globeRef.current.rotation.y = t * 0.14;
      globeRef.current.rotation.x = Math.sin(t * 0.05) * 0.08;

      // Smooth mouse cursor parallax reaction
      globeRef.current.rotation.y += pointer.x * 0.04;
      globeRef.current.rotation.x += -pointer.y * 0.04;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.1;
      particlesRef.current.rotation.z = Math.cos(t * 0.06) * 0.08;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.2;
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.1) * 0.05;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.16;
    }
  });

  return (
    <group ref={globeRef} position={[0, 0.2, 0]}>
      {/* Outer Primary Holographic Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[2.35, 36, 28]} />
        <meshBasicMaterial
          color="#00D9FF"
          wireframe
          transparent
          opacity={0.32}
        />
      </mesh>

      {/* Secondary Tech Wireframe Grid */}
      <mesh scale={0.97}>
        <sphereGeometry args={[2.35, 24, 20]} />
        <meshBasicMaterial
          color="#087BFF"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Glowing Tech Atmosphere Core */}
      <mesh scale={0.9}>
        <sphereGeometry args={[2.35, 32, 32]} />
        <meshBasicMaterial
          color="#071638"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital Ellipse 1 — Cyan Neon Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.2, 0]}>
        <ringGeometry args={[2.8, 2.84, 80]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbital Ellipse 2 — Magenta/Purple Tech Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.8, Math.PI / 5, 0]}>
        <ringGeometry args={[3.0, 3.03, 80]} />
        <meshBasicMaterial
          color="#E52BFF"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Constellation Data Points */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D9FF"
          size={0.055}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
