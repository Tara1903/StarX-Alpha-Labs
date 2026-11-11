"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Hero3DGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Generate particle constellation around the globe
  const [particlesPos] = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 0.8;
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
      // Base rotation
      globeRef.current.rotation.y = t * 0.12;
      globeRef.current.rotation.x = Math.sin(t * 0.05) * 0.08;

      // Mouse parallax tilt
      globeRef.current.rotation.y += pointer.x * 0.02;
      globeRef.current.rotation.x += -pointer.y * 0.02;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.08;
      particlesRef.current.rotation.z = Math.cos(t * 0.06) * 0.05;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group ref={globeRef} position={[0.4, 0, 0]}>
      {/* Outer Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 24]} />
        <meshBasicMaterial
          color="#087BFF"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Inner Dense Wireframe */}
      <mesh scale={0.96}>
        <sphereGeometry args={[2.2, 20, 16]} />
        <meshBasicMaterial
          color="#00D9FF"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Core Glowing Atmosphere Sphere */}
      <mesh scale={0.88}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#031640"
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Orbital Data Rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[2.6, 2.63, 64]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <ringGeometry args={[2.75, 2.78, 64]} />
        <meshBasicMaterial
          color="#E52BFF"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Orbital Particle Points */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D9FF"
          size={0.045}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
