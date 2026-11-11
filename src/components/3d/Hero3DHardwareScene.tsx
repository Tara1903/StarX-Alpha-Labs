"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Link from "next/link";
import { Globe, Smartphone, Layers, ArrowUpRight } from "lucide-react";

// =========================================================================
// 1. PROCEDURAL 3D TEXTURE GENERATORS (Zero external raster images)
// =========================================================================

function useDeviceTextures() {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return { laptopTexture: null, phoneTexture: null, comboTexture: null };
    }

    // 1. Laptop Screen (1024 x 640)
    const laptopCanvas = document.createElement("canvas");
    laptopCanvas.width = 1024;
    laptopCanvas.height = 640;
    const lCtx = laptopCanvas.getContext("2d")!;

    const bgGrad = lCtx.createLinearGradient(0, 0, 0, 640);
    bgGrad.addColorStop(0, "#071638");
    bgGrad.addColorStop(1, "#030B24");
    lCtx.fillStyle = bgGrad;
    lCtx.fillRect(0, 0, 1024, 640);

    // Matrix Grid
    lCtx.strokeStyle = "rgba(0, 217, 255, 0.08)";
    lCtx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 40) {
      lCtx.beginPath();
      lCtx.moveTo(x, 0);
      lCtx.lineTo(x, 640);
      lCtx.stroke();
    }
    for (let y = 0; y < 640; y += 40) {
      lCtx.beginPath();
      lCtx.moveTo(0, y);
      lCtx.lineTo(1024, y);
      lCtx.stroke();
    }

    // Top Navigation
    lCtx.fillStyle = "rgba(3, 11, 36, 0.95)";
    lCtx.fillRect(0, 0, 1024, 62);
    lCtx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    lCtx.strokeRect(0, 0, 1024, 62);

    lCtx.fillStyle = "#00D9FF";
    lCtx.font = "bold 24px sans-serif";
    lCtx.fillText("SX", 32, 40);
    lCtx.fillStyle = "#FFFFFF";
    lCtx.fillText(" STARX ALPHA LABS", 72, 40);

    lCtx.fillStyle = "rgba(0, 217, 255, 0.2)";
    lCtx.beginPath();
    lCtx.roundRect(850, 15, 140, 32, 8);
    lCtx.fill();
    lCtx.strokeStyle = "#00D9FF";
    lCtx.lineWidth = 1.5;
    lCtx.stroke();
    lCtx.fillStyle = "#00D9FF";
    lCtx.font = "bold 12px monospace";
    lCtx.fillText("LIVE WEB CORE", 866, 36);

    // Hero Mountain Card
    const mGrad = lCtx.createLinearGradient(0, 90, 0, 420);
    mGrad.addColorStop(0, "rgba(8, 123, 255, 0.45)");
    mGrad.addColorStop(1, "rgba(3, 11, 36, 0.95)");
    lCtx.fillStyle = mGrad;
    lCtx.beginPath();
    lCtx.roundRect(36, 84, 952, 344, 20);
    lCtx.fill();
    lCtx.strokeStyle = "rgba(0, 217, 255, 0.6)";
    lCtx.lineWidth = 2;
    lCtx.stroke();

    lCtx.fillStyle = "rgba(8, 123, 255, 0.6)";
    lCtx.beginPath();
    lCtx.moveTo(380, 428);
    lCtx.lineTo(600, 170);
    lCtx.lineTo(840, 428);
    lCtx.closePath();
    lCtx.fill();

    lCtx.fillStyle = "rgba(0, 217, 255, 0.8)";
    lCtx.beginPath();
    lCtx.moveTo(520, 428);
    lCtx.lineTo(720, 200);
    lCtx.lineTo(950, 428);
    lCtx.closePath();
    lCtx.fill();

    lCtx.strokeStyle = "#00D9FF";
    lCtx.lineWidth = 4;
    lCtx.beginPath();
    lCtx.moveTo(600, 170);
    lCtx.lineTo(720, 200);
    lCtx.lineTo(830, 310);
    lCtx.stroke();

    lCtx.fillStyle = "#00D9FF";
    lCtx.font = "bold 14px monospace";
    lCtx.fillText("STARX ALPHA LABS • WEB CORE", 68, 136);

    lCtx.fillStyle = "#FFFFFF";
    lCtx.font = "900 36px sans-serif";
    lCtx.fillText("Professional Business Website", 68, 185);

    lCtx.fillStyle = "#C8D5EF";
    lCtx.font = "16px sans-serif";
    lCtx.fillText("Enterprise architecture with zero-trust database security,", 68, 226);
    lCtx.fillText("instantaneous multi-currency billing and lightning speed.", 68, 252);

    const btnGrad = lCtx.createLinearGradient(68, 0, 240, 0);
    btnGrad.addColorStop(0, "#FF941F");
    btnGrad.addColorStop(1, "#E52BFF");
    lCtx.fillStyle = btnGrad;
    lCtx.beginPath();
    lCtx.roundRect(68, 285, 185, 46, 23);
    lCtx.fill();
    lCtx.fillStyle = "#FFFFFF";
    lCtx.font = "bold 15px sans-serif";
    lCtx.fillText("View Demos →", 104, 314);

    const metrics = [
      { val: "100%", title: "CWV Score", color: "#00D9FF" },
      { val: "Zero", title: "Trust Security", color: "#00C98B" },
      { val: "Next.js 16", title: "Turbopack App", color: "#E52BFF" },
      { val: "Multi-Role", title: "Enterprise Portal", color: "#FF941F" }
    ];

    metrics.forEach((m, i) => {
      const x = 36 + i * 244;
      lCtx.fillStyle = "rgba(7, 22, 56, 0.95)";
      lCtx.beginPath();
      lCtx.roundRect(x, 452, 220, 150, 16);
      lCtx.fill();
      lCtx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      lCtx.lineWidth = 1;
      lCtx.stroke();

      lCtx.fillStyle = m.color;
      lCtx.font = "bold 26px monospace";
      lCtx.fillText(m.val, x + 24, 510);

      lCtx.fillStyle = "#C8D5EF";
      lCtx.font = "14px sans-serif";
      lCtx.fillText(m.title, x + 24, 550);
    });

    const laptopTexture = new THREE.CanvasTexture(laptopCanvas);

    // 2. Smartphone Screen (512 x 1024)
    const phoneCanvas = document.createElement("canvas");
    phoneCanvas.width = 512;
    phoneCanvas.height = 1024;
    const pCtx = phoneCanvas.getContext("2d")!;

    pCtx.fillStyle = "#030B24";
    pCtx.fillRect(0, 0, 512, 1024);

    pCtx.fillStyle = "#C8D5EF";
    pCtx.font = "bold 22px monospace";
    pCtx.fillText("9:41", 40, 52);
    pCtx.fillText("5G 🔋", 410, 52);

    pCtx.fillStyle = "#000000";
    pCtx.beginPath();
    pCtx.roundRect(176, 28, 160, 36, 18);
    pCtx.fill();
    pCtx.strokeStyle = "rgba(255,255,255,0.2)";
    pCtx.stroke();

    pCtx.fillStyle = "#00D9FF";
    pCtx.font = "bold 30px sans-serif";
    pCtx.fillText("SX", 130, 130);
    pCtx.fillStyle = "#FFFFFF";
    pCtx.fillText(" STARX ALPHA LABS", 175, 130);

    pCtx.fillStyle = "#E52BFF";
    pCtx.font = "bold 14px monospace";
    pCtx.fillText("MOBILE PLATFORM • NATIVE APPS", 110, 165);

    const tiles = [
      { icon: "🛍️", label: "E-Commerce", sub: "Native Store", grad: ["#087BFF", "#00D9FF"] },
      { icon: "⚡", label: "Solutions", sub: "On-Demand", grad: ["#FF941F", "#FF35B8"] },
      { icon: "📊", label: "Analytics", sub: "Live Telemetry", grad: ["#873BFF", "#E52BFF"] },
      { icon: "⚙️", label: "Operations", sub: "Multi-Role Hub", grad: ["#00C98B", "#00D9FF"] }
    ];

    tiles.forEach((t, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 38 + col * 228;
      const y = 215 + row * 265;

      const g = pCtx.createLinearGradient(x, y, x + 210, y + 235);
      g.addColorStop(0, "rgba(7, 22, 56, 0.95)");
      g.addColorStop(1, "rgba(3, 11, 36, 0.95)");
      pCtx.fillStyle = g;
      pCtx.beginPath();
      pCtx.roundRect(x, y, 210, 235, 24);
      pCtx.fill();
      pCtx.strokeStyle = "rgba(0, 217, 255, 0.45)";
      pCtx.lineWidth = 2;
      pCtx.stroke();

      const iconGrad = pCtx.createLinearGradient(x + 24, y + 24, x + 104, y + 104);
      iconGrad.addColorStop(0, t.grad[0]);
      iconGrad.addColorStop(1, t.grad[1]);
      pCtx.fillStyle = iconGrad;
      pCtx.beginPath();
      pCtx.roundRect(x + 24, y + 24, 78, 78, 20);
      pCtx.fill();

      pCtx.font = "38px serif";
      pCtx.fillText(t.icon, x + 42, y + 78);

      pCtx.fillStyle = "#FFFFFF";
      pCtx.font = "bold 22px sans-serif";
      pCtx.fillText(t.label, x + 24, y + 150);

      pCtx.fillStyle = "#C8D5EF";
      pCtx.font = "14px sans-serif";
      pCtx.fillText(t.sub, x + 24, y + 185);
    });

    pCtx.fillStyle = "rgba(7, 22, 56, 0.95)";
    pCtx.beginPath();
    pCtx.roundRect(38, 770, 436, 100, 24);
    pCtx.fill();
    pCtx.strokeStyle = "rgba(229, 43, 255, 0.5)";
    pCtx.lineWidth = 2;
    pCtx.stroke();

    pCtx.fillStyle = "#FFFFFF";
    pCtx.font = "bold 20px sans-serif";
    pCtx.fillText("iOS & Android Apps", 68, 815);
    pCtx.fillStyle = "#00C98B";
    pCtx.font = "bold 14px monospace";
    pCtx.fillText("✔ 60 FPS Native  ✔ Push Notifications", 68, 846);

    pCtx.fillStyle = "#071638";
    pCtx.beginPath();
    pCtx.roundRect(38, 900, 436, 80, 28);
    pCtx.fill();
    pCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    pCtx.stroke();

    pCtx.font = "28px serif";
    pCtx.fillText("🏠", 75, 950);
    pCtx.fillText("📦", 180, 950);
    pCtx.fillText("🔔", 285, 950);
    pCtx.fillText("👤", 390, 950);

    const phoneTexture = new THREE.CanvasTexture(phoneCanvas);

    // 3. Dedicated Combo Card (512 x 720)
    const comboCanvas = document.createElement("canvas");
    comboCanvas.width = 512;
    comboCanvas.height = 720;
    const cCtx = comboCanvas.getContext("2d")!;

    const cBgGrad = cCtx.createLinearGradient(0, 0, 512, 720);
    cBgGrad.addColorStop(0, "#071638");
    cBgGrad.addColorStop(1, "#030B24");
    cCtx.fillStyle = cBgGrad;
    cCtx.beginPath();
    cCtx.roundRect(0, 0, 512, 720, 36);
    cCtx.fill();

    cCtx.strokeStyle = "#00D9FF";
    cCtx.lineWidth = 10;
    cCtx.stroke();

    cCtx.strokeStyle = "rgba(229, 43, 255, 0.7)";
    cCtx.lineWidth = 4;
    cCtx.strokeRect(14, 14, 484, 692);

    const cIconGrad = cCtx.createLinearGradient(200, 50, 312, 160);
    cIconGrad.addColorStop(0, "#087BFF");
    cIconGrad.addColorStop(1, "#00D9FF");
    cCtx.fillStyle = cIconGrad;
    cCtx.beginPath();
    cCtx.arc(256, 120, 60, 0, Math.PI * 2);
    cCtx.fill();
    cCtx.strokeStyle = "#FFFFFF";
    cCtx.lineWidth = 4;
    cCtx.stroke();

    cCtx.font = "50px serif";
    cCtx.fillText("🔗", 230, 138);

    cCtx.fillStyle = "#FFFFFF";
    cCtx.font = "900 46px sans-serif";
    cCtx.textAlign = "center";
    cCtx.fillText("Combo", 256, 240);
    cCtx.fillText("Website + App", 256, 295);

    cCtx.fillStyle = "#00D9FF";
    cCtx.font = "bold 15px monospace";
    cCtx.fillText("UNIFIED ECOSYSTEM • BEST VALUE", 256, 340);

    cCtx.fillStyle = "#030B24";
    cCtx.beginPath();
    cCtx.roundRect(56, 380, 400, 160, 24);
    cCtx.fill();
    cCtx.strokeStyle = "rgba(0, 217, 255, 0.5)";
    cCtx.lineWidth = 2;
    cCtx.stroke();

    cCtx.font = "65px serif";
    cCtx.fillText("💻", 150, 485);
    cCtx.fillStyle = "#FFFFFF";
    cCtx.font = "bold 36px monospace";
    cCtx.fillText("+", 256, 475);
    cCtx.fillText("📱", 362, 485);

    const cBtnGrad = cCtx.createLinearGradient(56, 0, 456, 0);
    cBtnGrad.addColorStop(0, "#087BFF");
    cBtnGrad.addColorStop(1, "#E52BFF");
    cCtx.fillStyle = cBtnGrad;
    cCtx.beginPath();
    cCtx.roundRect(56, 580, 400, 76, 38);
    cCtx.fill();

    cCtx.fillStyle = "#FFFFFF";
    cCtx.font = "bold 22px sans-serif";
    cCtx.fillText("Explore Combo Package →", 256, 628);

    const comboTexture = new THREE.CanvasTexture(comboCanvas);

    return { laptopTexture, phoneTexture, comboTexture };
  }, []);
}

// =========================================================================
// 2. 3D BACKGROUND HOLOGRAPHIC GLOBE & ORBITAL RINGS
// =========================================================================

function GlobeAssembly() {
  const globeRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePos = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const rad = 3.0 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      pos[i * 3] = rad * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = rad * Math.sin(phi);
      pos[i * 3 + 2] = rad * Math.sin(theta) * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y = t * 0.08;
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.12;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.09;
    if (particlesRef.current) particlesRef.current.rotation.y = -t * 0.05;
  });

  return (
    <group position={[0.3, 1.2, -3.4]}>
      {/* Outer Cyan Wireframe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.9, 36, 28]} />
        <meshBasicMaterial color="#00D9FF" wireframe transparent opacity={0.22} />
      </mesh>

      {/* Inner Blue Wireframe */}
      <mesh>
        <sphereGeometry args={[2.8, 24, 20]} />
        <meshBasicMaterial color="#087BFF" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.2, 0]}>
        <ringGeometry args={[3.35, 3.38, 64]} />
        <meshBasicMaterial color="#00D9FF" side={THREE.DoubleSide} transparent opacity={0.45} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.2, 0.4, 0]}>
        <ringGeometry args={[3.55, 3.58, 64]} />
        <meshBasicMaterial color="#E52BFF" side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>

      {/* Constellation Particle Points */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePos, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00D9FF" size={0.045} transparent opacity={0.85} />
      </points>
    </group>
  );
}

// =========================================================================
// 3. 3D HARDWARE DEVICES RIG (Laptop, Phone, Combo Card, Zero Overlap)
// =========================================================================

function HardwareRig({
  laptopTexture,
  phoneTexture,
  comboTexture,
}: {
  laptopTexture: THREE.CanvasTexture | null;
  phoneTexture: THREE.CanvasTexture | null;
  comboTexture: THREE.CanvasTexture | null;
}) {
  const masterGroup = useRef<THREE.Group>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);
  const phoneRef = useRef<THREE.Group>(null);
  const comboRef = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();

    // Mouse tilt lerp
    if (masterGroup.current) {
      masterGroup.current.rotation.y = THREE.MathUtils.lerp(
        masterGroup.current.rotation.y,
        pointer.x * 0.22,
        0.08
      );
      masterGroup.current.rotation.x = THREE.MathUtils.lerp(
        masterGroup.current.rotation.x,
        -pointer.y * 0.16,
        0.08
      );
    }

    // Dynamic specular light
    if (cursorLightRef.current) {
      cursorLightRef.current.position.x = pointer.x * 6;
      cursorLightRef.current.position.y = pointer.y * 4 + 2;
    }

    // Subtle floating breath on phone and combo card
    if (phoneRef.current) {
      phoneRef.current.position.y = -0.32 + Math.sin(t * 1.8) * 0.04;
    }
    if (comboRef.current) {
      comboRef.current.position.y = 0.05 + Math.cos(t * 1.5) * 0.05;
    }
  });

  return (
    <group ref={masterGroup}>
      {/* Specular Mouse Point Light */}
      <pointLight ref={cursorLightRef} position={[0, 2, 4.5]} intensity={3.5} color="#00D9FF" distance={12} />

      {/* Concentric Neon Floor Rings */}
      <group position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.9, 1.93, 64]} />
          <meshBasicMaterial color="#00D9FF" side={THREE.DoubleSide} transparent opacity={0.55} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.5, 2.53, 64]} />
          <meshBasicMaterial color="#873BFF" side={THREE.DoubleSide} transparent opacity={0.45} />
        </mesh>
        <mesh>
          <ringGeometry args={[3.1, 3.13, 64]} />
          <meshBasicMaterial color="#E52BFF" side={THREE.DoubleSide} transparent opacity={0.35} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* UNIT 1: REAL 3D PHYSICAL LAPTOP (LEFT)                        */}
      {/* ------------------------------------------------------------- */}
      <group position={[-1.8, -0.65, 0.2]} rotation={[0.06, 0.35, -0.02]}>
        {/* Base Chassis */}
        <mesh>
          <boxGeometry args={[3.3, 0.12, 2.3]} />
          <meshStandardMaterial color="#223048" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Front Lip Thumb Scoop */}
        <mesh position={[0, 0.04, 1.15]}>
          <boxGeometry args={[0.5, 0.05, 0.04]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>

        {/* Recessed Keyboard Well */}
        <mesh position={[0, 0.06, -0.32]}>
          <boxGeometry args={[2.9, 0.02, 1.25]} />
          <meshStandardMaterial color="#090E17" roughness={0.8} />
        </mesh>

        {/* Chiclet Key Rows */}
        {[-0.75, -0.52, -0.3, -0.08, 0.14].map((z, idx) => (
          <mesh key={idx} position={[0, 0.075, z]}>
            <boxGeometry args={[2.8, 0.02, 0.16]} />
            <meshStandardMaterial color="#182236" roughness={0.5} metalness={0.4} />
          </mesh>
        ))}

        {/* Spacebar */}
        <mesh position={[0, 0.08, 0.14]}>
          <boxGeometry args={[1.2, 0.025, 0.14]} />
          <meshStandardMaterial color="#2B384E" roughness={0.4} metalness={0.5} />
        </mesh>

        {/* Glass Trackpad */}
        <mesh position={[0, 0.065, 0.62]}>
          <boxGeometry args={[1.2, 0.015, 0.7]} />
          <meshStandardMaterial color="#1E293B" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.07, 0.62]}>
          <boxGeometry args={[1.22, 0.01, 0.72]} />
          <meshBasicMaterial color="#00D9FF" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Screen Lid (Angled backwards) */}
        <group position={[0, 0.06, -1.12]} rotation={[-0.25, 0, 0]}>
          {/* Metallic Outer Lid */}
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[3.3, 2.2, 0.08]} />
            <meshStandardMaterial color="#223048" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Screen Display Face */}
          {laptopTexture && (
            <mesh position={[0, 1.1, 0.045]}>
              <planeGeometry args={[3.18, 2.08]} />
              <meshBasicMaterial map={laptopTexture} />
            </mesh>
          )}

          {/* Glowing Cyan Bezel Frame */}
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[3.32, 2.22, 0.09]} />
            <meshBasicMaterial color="#00D9FF" wireframe transparent opacity={0.45} />
          </mesh>
        </group>

        {/* 3D Laser Pointer Line */}
        <mesh position={[-0.2, 2.6, -0.6]} rotation={[0, 0, -0.15]}>
          <cylinderGeometry args={[0.008, 0.008, 0.8, 8]} />
          <meshBasicMaterial color="#00D9FF" />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* UNIT 2: REAL 3D PHYSICAL SMARTPHONE (CENTER, STANDING)        */}
      {/* ------------------------------------------------------------- */}
      <group ref={phoneRef} position={[0.65, -0.32, 0.45]} rotation={[-0.04, -0.22, 0.04]}>
        {/* Titanium Chassis */}
        <mesh>
          <boxGeometry args={[1.4, 2.8, 0.14]} />
          <meshStandardMaterial color="#223048" metalness={0.95} roughness={0.16} />
        </mesh>

        {/* Buttons */}
        <mesh position={[-0.71, 0.5, 0]}>
          <boxGeometry args={[0.03, 0.35, 0.05]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        <mesh position={[0.71, 0.4, 0]}>
          <boxGeometry args={[0.03, 0.35, 0.05]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>

        {/* Screen Display Face */}
        {phoneTexture && (
          <mesh position={[0, 0, 0.072]}>
            <planeGeometry args={[1.34, 2.72]} />
            <meshBasicMaterial map={phoneTexture} />
          </mesh>
        )}

        {/* Purple Glowing Rim Frame */}
        <mesh>
          <boxGeometry args={[1.42, 2.82, 0.15]} />
          <meshBasicMaterial color="#873BFF" wireframe transparent opacity={0.55} />
        </mesh>

        {/* 3D Laser Pointer Line */}
        <mesh position={[0, 1.8, 0.1]}>
          <cylinderGeometry args={[0.008, 0.008, 0.75, 8]} />
          <meshBasicMaterial color="#E52BFF" />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* UNIT 3: REAL 3D PHYSICAL STANDALONE COMBO CARD (RIGHT)        */}
      {/* ------------------------------------------------------------- */}
      <group ref={comboRef} position={[2.45, 0.05, 0.2]} rotation={[-0.04, -0.38, 0.02]}>
        {/* Glassmorphic Slab Face */}
        {comboTexture && (
          <mesh>
            <boxGeometry args={[1.55, 2.15, 0.08]} />
            <meshBasicMaterial map={comboTexture} />
          </mesh>
        )}

        {/* Double Glowing Neon Wireframe */}
        <mesh>
          <boxGeometry args={[1.6, 2.2, 0.09]} />
          <meshBasicMaterial color="#00D9FF" wireframe transparent opacity={0.65} />
        </mesh>
      </group>
    </group>
  );
}

// =========================================================================
// 4. MAIN EXPORT COMPONENT
// =========================================================================

export function Hero3DHardwareScene() {
  const [mounted, setMounted] = useState(false);
  const textures = useDeviceTextures();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[540px] sm:h-[580px] flex items-center justify-center">
        <span className="text-xs font-mono text-[#00D9FF] tracking-wider animate-pulse">
          INITIALIZING 3D HARDWARE RIG...
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[540px] sm:h-[580px] select-none">
      {/* WebGL Canvas - 100% Transparent, seamlessly integrated into the page background */}
      <Canvas
        camera={{ position: [0, 0.35, 8.2], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 9, 6]} intensity={2.0} color="#FFFFFF" />
        <pointLight position={[-5, 2.5, 4]} intensity={3.0} color="#00D9FF" />
        <pointLight position={[5, 1.5, 4]} intensity={2.5} color="#E52BFF" />

        {/* 3D Globe */}
        <GlobeAssembly />

        {/* 3D Hardware Rig */}
        <HardwareRig
          laptopTexture={textures.laptopTexture}
          phoneTexture={textures.phoneTexture}
          comboTexture={textures.comboTexture}
        />
      </Canvas>

      {/* Floating HUD Indicators over WebGL */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <Link
          href="/website-development"
          className="pointer-events-auto absolute top-7 left-[10%] px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide text-white bg-[#071638]/95 border-2 border-[#00D9FF] shadow-[0_0_25px_rgba(0,217,255,0.6)] backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Globe className="w-3.5 h-3.5 text-[#00D9FF]" />
          <span>Website Development</span>
          <ArrowUpRight className="w-3 h-3 text-[#00D9FF]" />
        </Link>

        <Link
          href="/app-development"
          className="pointer-events-auto absolute top-10 left-[52%] px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide text-white bg-[#071638]/95 border-2 border-[#E52BFF] shadow-[0_0_25px_rgba(229,43,255,0.6)] backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#E52BFF]" />
          <span>Mobile App Development</span>
          <ArrowUpRight className="w-3 h-3 text-[#E52BFF]" />
        </Link>
      </div>
    </div>
  );
}
