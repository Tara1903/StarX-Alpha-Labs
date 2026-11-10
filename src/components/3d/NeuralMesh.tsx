"use client";

import * as React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Pure deterministic pseudo-random generator
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type QualityTier = "high" | "balanced" | "low";

function getDeviceQualityTier(): QualityTier {
  if (typeof window === "undefined") return "balanced";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "low";
  }

  const isSmallScreen = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as { deviceMemory?: number }).deviceMemory || 8;

  if (isSmallScreen || cores <= 4 || memory < 4) {
    return "low";
  }
  if (cores <= 6 || memory <= 4 || window.innerWidth < 1280) {
    return "balanced";
  }
  return "high";
}

const TIER_CONFIG: Record<QualityTier, {
  nodeCount: number;
  maxLineDist: number;
  maxLines: number;
  rotationSpeed: number;
  lineOpacity: number;
}> = {
  high: {
    nodeCount: 3200,
    maxLineDist: 0.28,
    maxLines: 900,
    rotationSpeed: 0.08,
    lineOpacity: 0.22,
  },
  balanced: {
    nodeCount: 2200,
    maxLineDist: 0.26,
    maxLines: 600,
    rotationSpeed: 0.07,
    lineOpacity: 0.18,
  },
  low: {
    nodeCount: 1200,
    maxLineDist: 0.22,
    maxLines: 300,
    rotationSpeed: 0.05,
    lineOpacity: 0.14,
  },
};

// Vertex shader for hollow triangle particles
const triangleVertexShader = `
  uniform float uTime;
  uniform vec3 uRayOrigin;
  uniform vec3 uRayDir;
  uniform float uMouseActive;
  uniform float uRadius;

  attribute vec3 aBaseColor;
  attribute float aSize;
  attribute float aAngle;

  varying vec3 vColor;
  varying float vProximity;
  varying float vAngle;

  void main() {
    vAngle = aAngle;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);

    // Compute distance from 3D camera ray to particle in world space
    float proximity = 0.0;
    if (uMouseActive > 0.5) {
      vec3 toPoint = worldPos.xyz - uRayOrigin;
      float proj = dot(toPoint, uRayDir);
      if (proj > 0.0) {
        vec3 closestOnRay = uRayOrigin + uRayDir * proj;
        float distToRay = length(worldPos.xyz - closestOnRay);
        proximity = clamp(1.0 - (distToRay / uRadius), 0.0, 1.0);
      }
    }
    vProximity = proximity;

    // Organic micro-breathing wave
    float wave = sin(uTime * 1.8 + position.x * 2.8 + position.y * 2.8) * 0.035;
    vec3 animatedPos = position + (normalize(position) * wave);

    // Dynamic expansion under mouse pointer
    animatedPos += normalize(position) * (proximity * 0.25);

    vec4 mvPosition = modelViewMatrix * vec4(animatedPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Triangles directly under cursor turn brilliant glowing white (#FFFFFF), matching the reference
    vec3 highlightWhite = vec3(1.0, 1.0, 1.0);
    vColor = mix(aBaseColor, highlightWhite, pow(proximity, 1.15));

    // Size increases under mouse cursor (scaled for clearly visible hollow triangles)
    float dynamicSize = aSize * (1.0 + proximity * 1.25);
    gl_PointSize = dynamicSize * (680.0 / -mvPosition.z);
  }
`;

// Fragment shader: renders an equilateral hollow wireframe triangle with individual rotation
const triangleFragmentShader = `
  varying vec3 vColor;
  varying float vProximity;
  varying float vAngle;

  void main() {
    // Coordinate space [-1.0, 1.0]
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    p.y = -p.y;

    // Rotate triangle to match surface facets
    float c = cos(vAngle);
    float s = sin(vAngle);
    vec2 rotP = vec2(c * p.x - s * p.y, s * p.x + c * p.y);

    // Equilateral triangle signed distance field
    const float k = 1.7320508;
    float d = max(abs(rotP.x) * k + rotP.y, -rotP.y * 2.0) - 0.85;

    // Hollow border profile (wireframe outline)
    float thickness = 0.28 + vProximity * 0.12;
    float border = abs(d + thickness * 0.5) - thickness * 0.5;

    // Antialiased border edge
    float alpha = 1.0 - smoothstep(-0.06, 0.06, border);
    if (alpha < 0.03) discard;

    // Extra radiant bloom for white mouse cluster
    vec3 finalColor = vColor + vec3(vProximity * 0.45);
    gl_FragColor = vec4(finalColor, alpha * (0.92 + vProximity * 0.08));
  }
`;

// Module-level pre-allocated vectors to prevent per-frame garbage collection
const tempMouseVec = new THREE.Vector3();
const tempRayDir = new THREE.Vector3();

export function NeuralMesh() {
  const { viewport, camera } = useThree();
  const isMobile = viewport.width < 5;

  const quality = React.useMemo(() => getDeviceQualityTier(), []);
  const config = TIER_CONFIG[quality];

  const mouseRef = React.useRef({ x: 0, y: 0, active: false });

  React.useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.active = true;
    };
    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // 1. Generate anatomical human brain points, faceted rotations, and regional colors
  const { positions, colors, sizes, angles, connectionPositions, connectionColors } = React.useMemo(() => {
    const nodeCount = config.nodeCount;
    const maxLineDist = config.maxLineDist;
    const maxLines = config.maxLines;

    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);
    const sz = new Float32Array(nodeCount);
    const ang = new Float32Array(nodeCount);

    const amberGold = new THREE.Color("#F59E0B");
    const goldenYellow = new THREE.Color("#FBBF24");
    const warmOrange = new THREE.Color("#F97316");
    const electricCyan = new THREE.Color("#73D8FF");
    const skyBlue = new THREE.Color("#38BDF8");
    const deepBlue = new THREE.Color("#1D4ED8");
    const violetPurple = new THREE.Color("#8B5CF6");
    const deepMagenta = new THREE.Color("#A855F7");
    const emeraldAccent = new THREE.Color("#10B981");

    for (let i = 0; i < nodeCount; i++) {
      const u = pseudoRandom(i * 6 + 1);
      const v = pseudoRandom(i * 6 + 2);
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const rx = 1.46;
      const ry = 1.16;
      const rz = 1.74;
      // 75% on outer cortex shell to give crisp anatomical silhouette
      const isShell = pseudoRandom(i * 5 + 4) > 0.25;
      const r = isShell
        ? 0.78 + pseudoRandom(i * 6 + 3) * 0.22
        : Math.cbrt(pseudoRandom(i * 6 + 3)) * 0.78;

      let x = rx * r * Math.sin(phi) * Math.cos(theta);
      let y = ry * r * Math.sin(phi) * Math.sin(theta);
      let z = rz * r * Math.cos(phi);

      // Longitudinal cerebral fissure
      const hemisphere = x >= 0 ? 1 : -1;
      x += hemisphere * 0.15;

      // Sulcal convolutions (gyri folds)
      const fold = Math.sin(x * 4.2) * Math.cos(y * 4.2) * Math.sin(z * 4.2) * 0.12;
      x += fold;
      y += fold;
      z += fold;

      // Cranial base flattening
      if (y < -0.38) {
        y *= 0.82;
      }

      // Cerebellum (12% of nodes)
      if (i > nodeCount * 0.88) {
        const cu = pseudoRandom(i * 3 + 1);
        const cv = pseudoRandom(i * 3 + 2);
        const cTheta = cu * 2.0 * Math.PI;
        const cPhi = Math.acos(2.0 * cv - 1.0);
        x = 0.82 * Math.sin(cPhi) * Math.cos(cTheta) * 0.62;
        y = -0.72 + 0.45 * Math.sin(cPhi) * Math.sin(cTheta) * 0.48;
        z = -0.82 + 0.62 * Math.cos(cPhi) * 0.52;
      }

      // Brainstem (4% of nodes)
      if (i > nodeCount * 0.96) {
        const su = pseudoRandom(i * 2 + 1) - 0.5;
        const sv = pseudoRandom(i * 2 + 2);
        x = su * 0.32;
        y = -0.82 - sv * 0.52;
        z = -0.12 + (pseudoRandom(i * 2 + 3) - 0.5) * 0.32;
      }

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Triangle size & facet angle (calibrated for crisp, visible wireframe outlines)
      sz[i] = 0.095 + pseudoRandom(i * 7) * 0.055;
      ang[i] = pseudoRandom(i * 13) * Math.PI * 2.0;

      // Regional Coloring matching the reference screenshot:
      const distFromCenter = Math.sqrt(x * x + y * y + z * z);
      const isPerimeter = distFromCenter > 1.22 || y > 0.78;
      const isInnerCore = distFromCenter < 0.68;

      const chosenColor = new THREE.Color();
      if (isPerimeter) {
        const t = Math.min(1, (distFromCenter - 1.22) / 0.5);
        if (pseudoRandom(i * 17) > 0.5) {
          chosenColor.lerpColors(goldenYellow, amberGold, t);
        } else {
          chosenColor.lerpColors(amberGold, warmOrange, t);
        }
      } else if (isInnerCore) {
        chosenColor.lerpColors(violetPurple, deepMagenta, pseudoRandom(i * 11));
      } else if (y > 0.12) {
        chosenColor.lerpColors(skyBlue, electricCyan, pseudoRandom(i * 9));
      } else if (x > 0.28 && y < 0) {
        chosenColor.lerpColors(emeraldAccent, electricCyan, 0.45);
      } else {
        chosenColor.lerpColors(violetPurple, deepBlue, 0.55);
      }

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    // 2. Synaptic connections with controlled segment budget
    const linesPos: number[] = [];
    const linesCol: number[] = [];
    let lineCount = 0;

    for (let i = 0; i < nodeCount; i += 2) {
      if (lineCount >= maxLines) break;
      const x1 = pos[i * 3];
      const y1 = pos[i * 3 + 1];
      const z1 = pos[i * 3 + 2];

      for (let j = i + 1; j < nodeCount; j += 3) {
        if (lineCount >= maxLines) break;

        const x2 = pos[j * 3];
        const y2 = pos[j * 3 + 1];
        const z2 = pos[j * 3 + 2];

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const dSq = dx * dx + dy * dy + dz * dz;

        if (dSq < maxLineDist * maxLineDist) {
          linesPos.push(x1, y1, z1, x2, y2, z2);
          linesCol.push(col[i * 3], col[i * 3 + 1], col[i * 3 + 2]);
          linesCol.push(col[j * 3], col[j * 3 + 1], col[j * 3 + 2]);
          lineCount++;
        }
      }
    }

    return {
      positions: pos,
      colors: col,
      sizes: sz,
      angles: ang,
      connectionPositions: new Float32Array(linesPos),
      connectionColors: new Float32Array(linesCol),
    };
  }, [config]);

  const groupRef = React.useRef<THREE.Group>(null);
  const coreRef = React.useRef<THREE.Mesh>(null);
  const shaderMatRef = React.useRef<THREE.ShaderMaterial>(null);

  // Shader uniforms
  const uniforms = React.useMemo(() => {
    return {
      uTime: { value: 0 },
      uRayOrigin: { value: new THREE.Vector3(0, 0, 5) },
      uRayDir: { value: new THREE.Vector3(0, 0, -1) },
      uMouseActive: { value: 0 },
      uRadius: { value: 1.55 },
    };
  }, []);

  // Dedicated BufferGeometries instantiated via useMemo with explicit typed attributes
  const pointsGeometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aBaseColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aAngle", new THREE.BufferAttribute(angles, 1));
    return geo;
  }, [positions, colors, sizes, angles]);

  const linesGeometry = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(connectionPositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(connectionColors, 3));
    return geo;
  }, [connectionPositions, connectionColors]);

  // Frame animation loop with zero runtime allocations
  useFrame((state, delta) => {
    if (typeof document !== "undefined" && document.hidden) return;

    const time = state.clock.getElapsedTime();
    const isMouseActive = mouseRef.current.active;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    // 1. Update shader uniforms & 3D ray projection using pre-allocated vectors
    if (shaderMatRef.current) {
      shaderMatRef.current.uniforms.uTime.value = time;
      shaderMatRef.current.uniforms.uMouseActive.value = isMouseActive ? 1.0 : 0.0;

      if (isMouseActive) {
        tempMouseVec.set(mx, my, 0.5).unproject(camera);
        tempRayDir.copy(tempMouseVec).sub(camera.position).normalize();

        shaderMatRef.current.uniforms.uRayOrigin.value.copy(camera.position);
        shaderMatRef.current.uniforms.uRayDir.value.copy(tempRayDir);
      }
    }

    // 2. Continuous rotation & mouse parallax
    if (groupRef.current) {
      const targetRotY = time * config.rotationSpeed + (isMouseActive ? mx * 0.38 : 0);
      const targetRotX = isMouseActive ? -my * 0.24 : 0;

      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.055;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.055;

      // 3. Scroll-Driven Descent
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const docHeight = typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 1;
      const scrollProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      let targetX = isMobile ? 0 : 1.35;
      let targetY = isMobile ? 0.45 : 0.08;
      let targetZ = isMobile ? -0.5 : 0.15;
      let targetScale = isMobile ? 0.78 : 1.25;

      if (scrollProgress < 0.18) {
        // Hero Section: Upper right / 3/4 profile behind headline
        targetX = isMobile ? 0 : 1.35;
        targetY = isMobile ? 0.45 : 0.08;
        targetZ = isMobile ? -0.5 : 0.15;
        targetScale = isMobile ? 0.78 : 1.25;
      } else if (scrollProgress < 0.38) {
        // Technology Statement: Glides down and centers, expanding slightly
        const t = (scrollProgress - 0.18) / 0.2;
        targetX = THREE.MathUtils.lerp(isMobile ? 0 : 1.35, 0.0, t);
        targetY = THREE.MathUtils.lerp(isMobile ? 0.45 : 0.08, -0.3, t);
        targetZ = THREE.MathUtils.lerp(isMobile ? -0.5 : 0.15, 0.5, t);
        targetScale = THREE.MathUtils.lerp(isMobile ? 0.78 : 1.25, isMobile ? 0.85 : 1.3, t);
      } else if (scrollProgress < 0.62) {
        // Operating Divisions: Glides down and frames division cards from the left
        const t = (scrollProgress - 0.38) / 0.24;
        targetX = THREE.MathUtils.lerp(0.0, isMobile ? 0 : -1.75, t);
        targetY = THREE.MathUtils.lerp(-0.3, -0.25, t);
        targetZ = THREE.MathUtils.lerp(0.5, -0.2, t);
        targetScale = THREE.MathUtils.lerp(isMobile ? 0.85 : 1.3, isMobile ? 0.75 : 1.1, t);
      } else if (scrollProgress < 0.82) {
        // Services & Engineering: Glides down and translates across to the right
        const t = (scrollProgress - 0.62) / 0.2;
        targetX = THREE.MathUtils.lerp(isMobile ? 0 : -1.75, isMobile ? 0 : 1.7, t);
        targetY = THREE.MathUtils.lerp(-0.25, -0.45, t);
        targetZ = THREE.MathUtils.lerp(-0.2, 0.0, t);
        targetScale = THREE.MathUtils.lerp(isMobile ? 0.75 : 1.1, isMobile ? 0.72 : 1.05, t);
      } else {
        // Final Engagement CTA: Glides to bottom center with radiant glow
        const t = (scrollProgress - 0.82) / 0.18;
        targetX = THREE.MathUtils.lerp(isMobile ? 0 : 1.7, 0.0, t);
        targetY = THREE.MathUtils.lerp(-0.45, -0.15, t);
        targetZ = THREE.MathUtils.lerp(0.0, 0.35, t);
        targetScale = THREE.MathUtils.lerp(isMobile ? 0.72 : 1.05, isMobile ? 0.82 : 1.2, t);
      }

      // Smooth physics damping (exponential lerp)
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.055;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.055;
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.055;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.055)
      );
    }

    // 4. Central STARX nucleus pulse
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.45;
      coreRef.current.rotation.x += delta * 0.22;
      const pulse = 1 + Math.sin(time * 2.2) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[isMobile ? 0 : 1.35, isMobile ? 0.45 : 0.08, isMobile ? -0.5 : 0.15]}
      scale={isMobile ? 0.78 : 1.25}
    >
      {/* 1. Hollow Triangle Brain Point Cloud */}
      <points geometry={pointsGeometry}>
        <shaderMaterial
          ref={shaderMatRef}
          vertexShader={triangleVertexShader}
          fragmentShader={triangleFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 2. Synaptic Connective Filaments */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={config.lineOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 3. Central STARX Crystalline Energy Nucleus */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshBasicMaterial
          color="#F59E0B"
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
}
