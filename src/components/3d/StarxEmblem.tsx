"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";

interface StarxEmblemProps {
  pointerPosition?: { x: number; y: number };
}

export function StarxEmblem({ pointerPosition }: StarxEmblemProps) {
  const groupRef = React.useRef<Group>(null);
  const coreRef = React.useRef<Mesh>(null);
  const outerStarRef = React.useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Base continuous rotation
      groupRef.current.rotation.y += delta * 0.35;

      // Pointer tilt interaction if available
      if (pointerPosition) {
        const targetX = pointerPosition.y * 0.35;
        const targetZ = -pointerPosition.x * 0.35;
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.05;
      }
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.6;
      coreRef.current.rotation.x += delta * 0.3;
    }

    if (outerStarRef.current) {
      outerStarRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Radiant Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#32A9E8"
          emissive="#32A9E8"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Point light localized at the core */}
      <pointLight color="#32A9E8" intensity={3} distance={5} />

      {/* Outer Star Prisms Structure (Dual intersecting tetrahedra / 8-pointed star crystal) */}
      <group ref={outerStarRef}>
        {/* Primary Star Polyhedron */}
        <mesh>
          <icosahedronGeometry args={[1.35, 0]} />
          <meshStandardMaterial
            color="#102D50"
            emissive="#1769AA"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.85}
            wireframe={true}
          />
        </mesh>

        {/* Inner solid faceted prism */}
        <mesh scale={[1.1, 1.1, 1.1]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0A1424"
            roughness={0.15}
            metalness={0.95}
            transparent={true}
            opacity={0.8}
          />
        </mesh>

        {/* 4 Cardinal Star Points (X Axis) */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <group key={idx} rotation={[0, 0, angle]}>
            <mesh position={[1.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <coneGeometry args={[0.3, 0.9, 4]} />
              <meshStandardMaterial
                color="#102D50"
                emissive="#32A9E8"
                emissiveIntensity={0.6}
                roughness={0.3}
                metalness={0.9}
              />
            </mesh>
          </group>
        ))}

        {/* Floating Accent Nodes at vertices */}
        {[
          [0, 1.8, 0],
          [0, -1.8, 0],
          [1.8, 0, 0],
          [-1.8, 0, 0],
          [0, 0, 1.8],
          [0, 0, -1.8],
        ].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#63B8F8" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
