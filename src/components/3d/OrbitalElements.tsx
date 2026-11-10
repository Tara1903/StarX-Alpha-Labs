"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export function OrbitalElements() {
  const ring1Ref = React.useRef<Group>(null);
  const ring2Ref = React.useRef<Group>(null);
  const ring3Ref = React.useRef<Group>(null);

  useFrame((_, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.15;
      ring1Ref.current.rotation.y += delta * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.2;
      ring2Ref.current.rotation.z += delta * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.1;
      ring3Ref.current.rotation.z -= delta * 0.18;
    }
  });

  return (
    <group>
      {/* Precision Orbital Ring 1 */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.3, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#1769AA"
            emissive="#32A9E8"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[2.3, 0, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color="#32A9E8" />
        </mesh>
      </group>

      {/* Precision Orbital Ring 2 (Tilted) */}
      <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.7, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#102D50"
            emissive="#1769AA"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[-2.7, 0, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#63B8F8" />
        </mesh>
      </group>

      {/* Outer Subtle Gyro Ring 3 */}
      <group ref={ring3Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[3.1, 0.01, 16, 100]} />
          <meshStandardMaterial
            color="#19375E"
            emissive="#32A9E8"
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.8}
            transparent={true}
            opacity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}
