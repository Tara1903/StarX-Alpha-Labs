"use client";

import * as React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralMeshProps {
  scrollProgress?: number;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function NeuralMesh({ scrollProgress = 0 }: NeuralMeshProps) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  const nodeCount = isMobile ? 650 : 1400;
  const maxDistance = isMobile ? 0.65 : 0.55;

  // 1. Generate organic dual-hemisphere neural node positions & colors
  const { nodePositions, originalPositions, colors, connectionPositions, connectionColors } = React.useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const orig = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);

    const colorCyan = new THREE.Color("#73D8FF");
    const colorElectric = new THREE.Color("#32A9E8");
    const colorCorporate = new THREE.Color("#1769AA");
    const colorWhite = new THREE.Color("#FFFFFF");

    for (let i = 0; i < nodeCount; i++) {
      // Create organic brain-like dual-hemisphere distribution with pure PRNG
      const u = pseudoRandom(i * 3 + 1);
      const v = pseudoRandom(i * 3 + 2);
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(pseudoRandom(i * 3 + 3)) * 1.8 + 0.2;

      // Distort sphere into elongated organic brain lobes
      let x = r * Math.sin(phi) * Math.cos(theta) * 1.25;
      let y = r * Math.sin(phi) * Math.sin(theta) * 0.95;
      let z = r * Math.cos(phi) * 1.05;

      // Hemisphere cleft (separation on X axis)
      const hemisphere = x >= 0 ? 1 : -1;
      x += hemisphere * 0.18;

      // Organic fold ripples
      const ripple = Math.sin(x * 3) * Math.cos(y * 3) * 0.15;
      x += ripple;
      y += ripple;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      // Color gradient from core (white/cyan) to perimeter (electric/corporate)
      const distFromCenter = Math.sqrt(x * x + y * y + z * z) / 2.2;
      const chosenColor = new THREE.Color();
      if (distFromCenter < 0.35) {
        chosenColor.lerpColors(colorWhite, colorCyan, distFromCenter / 0.35);
      } else if (distFromCenter < 0.7) {
        chosenColor.lerpColors(colorCyan, colorElectric, (distFromCenter - 0.35) / 0.35);
      } else {
        chosenColor.lerpColors(colorElectric, colorCorporate, Math.min(1, (distFromCenter - 0.7) / 0.3));
      }

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    // 2. Pre-calculate synaptic connections (lines) between close nodes
    const connPos: number[] = [];
    const connCol: number[] = [];
    const maxConnectionsPerNode = 4;

    for (let i = 0; i < nodeCount; i++) {
      let connections = 0;
      const x1 = pos[i * 3];
      const y1 = pos[i * 3 + 1];
      const z1 = pos[i * 3 + 2];

      for (let j = i + 1; j < nodeCount; j++) {
        if (connections >= maxConnectionsPerNode) break;

        const x2 = pos[j * 3];
        const y2 = pos[j * 3 + 1];
        const z2 = pos[j * 3 + 2];

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          connPos.push(x1, y1, z1, x2, y2, z2);

          // Filament color
          connCol.push(col[i * 3], col[i * 3 + 1], col[i * 3 + 2]);
          connCol.push(col[j * 3], col[j * 3 + 1], col[j * 3 + 2]);

          connections++;
        }
      }
    }

    return {
      nodePositions: pos,
      originalPositions: orig,
      colors: col,
      connectionPositions: new Float32Array(connPos),
      connectionColors: new Float32Array(connCol),
    };
  }, [nodeCount, maxDistance]);

  // Ambient floating background particles
  const { ambientPositions } = React.useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1000) - 0.5) * 18;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2000) - 0.5) * 16;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3000) - 0.5) * 14 - 2;
    }
    return { ambientPositions: pos };
  }, []);

  const groupRef = React.useRef<THREE.Group>(null);
  const coreRef = React.useRef<THREE.Mesh>(null);
  const outerRingsRef = React.useRef<THREE.Group>(null);
  const pointsRef = React.useRef<THREE.Points>(null);
  const linesRef = React.useRef<THREE.LineSegments>(null);

  // Animated pulse and frame logic
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // 1. Smooth Mouse Parallax & Scene Target Interpolation
    if (groupRef.current) {
      // Continuous ambient rotation + mouse response
      const targetRotY = time * 0.08 + pointer.x * 0.45;
      const targetRotX = -pointer.y * 0.25;

      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;

      // 2. Scroll-driven camera & transform choreographies
      // State transitions along scroll:
      // 0.0 - 0.15: Hero (Centered, scale 1.0)
      // 0.15 - 0.35: Technology Statement (Diving in, scale 1.3, camera penetrates)
      // 0.35 - 0.60: Capabilities & Services (Shifts right, tilts, frames content)
      // 0.60 - 0.85: Process & Work (Expands horizontally into waveforms)
      // 0.85 - 1.0: Final CTA (Converges to intense radiant core)
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetScale = 1;

      if (scrollProgress < 0.15) {
        // Hero stage
        targetX = 0;
        targetY = 0;
        targetZ = 0;
        targetScale = isMobile ? 0.75 : 1.0;
      } else if (scrollProgress < 0.38) {
        // Diving in for Technology statement
        const t = (scrollProgress - 0.15) / 0.23;
        targetX = THREE.MathUtils.lerp(0, -0.6, t);
        targetY = THREE.MathUtils.lerp(0, 0.3, t);
        targetZ = THREE.MathUtils.lerp(0, 1.2, t);
        targetScale = THREE.MathUtils.lerp(1.0, 1.35, t);
      } else if (scrollProgress < 0.65) {
        // Shift right to frame capability cards
        const t = (scrollProgress - 0.38) / 0.27;
        targetX = THREE.MathUtils.lerp(-0.6, isMobile ? 0 : 1.7, t);
        targetY = THREE.MathUtils.lerp(0.3, -0.2, t);
        targetZ = THREE.MathUtils.lerp(1.2, -0.5, t);
        targetScale = THREE.MathUtils.lerp(1.35, 1.1, t);
      } else if (scrollProgress < 0.85) {
        // Waveform alignment for services
        const t = (scrollProgress - 0.65) / 0.2;
        targetX = THREE.MathUtils.lerp(isMobile ? 0 : 1.7, 0, t);
        targetY = THREE.MathUtils.lerp(-0.2, -0.5, t);
        targetZ = THREE.MathUtils.lerp(-0.5, -1.2, t);
        targetScale = THREE.MathUtils.lerp(1.1, 1.25, t);
      } else {
        // Converging to Final CTA core
        const t = (scrollProgress - 0.85) / 0.15;
        targetX = 0;
        targetY = THREE.MathUtils.lerp(-0.5, 0, t);
        targetZ = THREE.MathUtils.lerp(-1.2, -0.2, t);
        targetScale = THREE.MathUtils.lerp(1.25, 1.15, t);
      }

      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05)
      );
    }

    // 3. Central STARX geometric core counter-rotation
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.45;
      coreRef.current.rotation.x += delta * 0.2;
      const pulse = 1 + Math.sin(time * 2.5) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // 4. Outer gyroscopic rings
    if (outerRingsRef.current) {
      outerRingsRef.current.rotation.z += delta * 0.15;
      outerRingsRef.current.rotation.x -= delta * 0.1;
    }

    // 5. Ambient organic undulating wave through particles
    if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // Organic biological sine ripple
        const wave = Math.sin(time * 1.5 + ox * 2 + oy * 2) * 0.04;
        positions[i * 3] = ox * (1 + wave);
        positions[i * 3 + 1] = oy * (1 + wave);
        positions[i * 3 + 2] = oz * (1 + wave);
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Lighting Setup */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[8, 12, 10]} intensity={1.8} color="#73D8FF" />
      <directionalLight position={[-10, -5, -6]} intensity={1.2} color="#1769AA" />
      <pointLight color="#73D8FF" intensity={3.5} distance={7} />

      {/* 1. Synaptic Nodes (Points Cloud) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.038 : 0.045}
          vertexColors
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Synaptic Filaments (Line Segments) */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connectionPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[connectionColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 3. Central STARX Crystalline Nexus Core */}
      <group>
        {/* Faceted Star Polyhedron */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#73D8FF"
            emissive="#32A9E8"
            emissiveIntensity={1.8}
            roughness={0.15}
            metalness={0.9}
            wireframe={true}
          />
        </mesh>

        {/* Inner Solid Luminous Core */}
        <mesh scale={[0.35, 0.35, 0.35]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#F8FAFC" />
        </mesh>

        {/* Fine Gyroscopic Orbital Rings */}
        <group ref={outerRingsRef}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.9, 0.008, 16, 90]} />
            <meshBasicMaterial color="#32A9E8" transparent opacity={0.6} />
          </mesh>
          <mesh rotation={[-Math.PI / 3, Math.PI / 5, 0]}>
            <torusGeometry args={[2.2, 0.006, 16, 90]} />
            <meshBasicMaterial color="#73D8FF" transparent opacity={0.45} />
          </mesh>
        </group>
      </group>

      {/* 4. Ambient Volumetric Floating Bokeh Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ambientPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#73D8FF"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
