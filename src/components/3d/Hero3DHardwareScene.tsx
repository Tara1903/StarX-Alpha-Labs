"use client";

import React, { useRef, useMemo, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Link from "next/link";
import { Globe, Smartphone, ArrowUpRight } from "lucide-react";

// =========================================================================
// 1. HIGH-FIDELITY PROCEDURAL TEXTURE GENERATORS
// =========================================================================

function useDeviceTextures() {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return {
        laptopTexture: null,
        keyboardTexture: null,
        phoneTexture: null,
        comboTexture: null,
        globeTexture: null,
      };
    }

    // ---------------------------------------------------------------------
    // A. Holographic Earth Globe Texture (2048 x 1024 Equirectangular Map)
    // ---------------------------------------------------------------------
    const globeCanvas = document.createElement("canvas");
    globeCanvas.width = 2048;
    globeCanvas.height = 1024;
    const gCtx = globeCanvas.getContext("2d")!;

    // Deep Cosmic Ocean Base
    const oceanGrad = gCtx.createLinearGradient(0, 0, 0, 1024);
    oceanGrad.addColorStop(0, "#02071A");
    oceanGrad.addColorStop(0.5, "#041138");
    oceanGrad.addColorStop(1, "#02071A");
    gCtx.fillStyle = oceanGrad;
    gCtx.fillRect(0, 0, 2048, 1024);

    // Subtle Cyan Coordinate Grid Lines (Equirectangular)
    gCtx.strokeStyle = "rgba(0, 217, 255, 0.22)";
    gCtx.lineWidth = 1.5;
    for (let lat = 0; lat <= 1024; lat += 64) {
      gCtx.beginPath();
      gCtx.moveTo(0, lat);
      gCtx.lineTo(2048, lat);
      gCtx.stroke();
    }
    for (let lon = 0; lon <= 2048; lon += 64) {
      gCtx.beginPath();
      gCtx.moveTo(lon, 0);
      gCtx.lineTo(lon, 1024);
      gCtx.stroke();
    }

    // Equator & Prime Meridian Emphasis
    gCtx.strokeStyle = "rgba(0, 217, 255, 0.5)";
    gCtx.lineWidth = 2.5;
    gCtx.beginPath();
    gCtx.moveTo(0, 512);
    gCtx.lineTo(2048, 512);
    gCtx.stroke();

    // Procedural Continents (Accurate Equirectangular Landmass Polygons)
    const drawLandmass = (
      points: [number, number][],
      fillColor = "rgba(0, 217, 255, 0.45)",
      strokeColor = "#00E5FF"
    ) => {
      if (points.length === 0) return;
      gCtx.fillStyle = fillColor;
      gCtx.strokeStyle = strokeColor;
      gCtx.lineWidth = 3;
      gCtx.shadowColor = "#00D9FF";
      gCtx.shadowBlur = 12;
      gCtx.beginPath();
      gCtx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        gCtx.lineTo(points[i][0], points[i][1]);
      }
      gCtx.closePath();
      gCtx.fill();
      gCtx.stroke();
      gCtx.shadowBlur = 0;
    };

    // North America
    drawLandmass([
      [220, 160], [380, 150], [520, 190], [560, 270], [480, 360],
      [420, 420], [360, 480], [340, 540], [310, 500], [280, 420],
      [220, 340], [180, 240]
    ]);
    // South America
    drawLandmass([
      [360, 560], [450, 580], [520, 640], [490, 780], [420, 920],
      [370, 860], [340, 720], [330, 600]
    ]);
    // Europe
    drawLandmass([
      [960, 200], [1120, 180], [1160, 240], [1120, 320], [1050, 350],
      [980, 340], [940, 280]
    ]);
    // Africa
    drawLandmass([
      [950, 380], [1120, 370], [1200, 480], [1180, 680], [1100, 800],
      [1040, 780], [980, 620], [920, 480]
    ]);
    // Asia
    drawLandmass([
      [1160, 180], [1480, 160], [1720, 220], [1780, 380], [1650, 480],
      [1500, 520], [1380, 560], [1300, 460], [1220, 340]
    ]);
    // Australia
    drawLandmass([
      [1580, 680], [1720, 670], [1760, 760], [1680, 840], [1560, 800],
      [1540, 720]
    ]);

    // High-tech Glowing Dot Clusters across Continents
    gCtx.fillStyle = "#FFFFFF";
    const dotCoords: [number, number][] = [
      [340, 300], [400, 260], [460, 320], [380, 360], [420, 400], // US/Canada
      [420, 660], [440, 720], [400, 800],                         // SA
      [1020, 260], [1080, 240], [1040, 300],                       // Europe
      [1040, 480], [1100, 560], [1080, 680],                       // Africa
      [1320, 380], [1460, 340], [1580, 320], [1420, 450],         // Asia
      [1640, 740], [1680, 780]                                     // Aus
    ];
    dotCoords.forEach(([x, y]) => {
      gCtx.beginPath();
      gCtx.arc(x, y, 4, 0, Math.PI * 2);
      gCtx.fill();
      // Glow halo around key hubs
      gCtx.fillStyle = "rgba(0, 217, 255, 0.6)";
      gCtx.beginPath();
      gCtx.arc(x, y, 9, 0, Math.PI * 2);
      gCtx.fill();
      gCtx.fillStyle = "#FFFFFF";
    });

    const globeTexture = new THREE.CanvasTexture(globeCanvas);

    // ---------------------------------------------------------------------
    // B. Laptop High-Res Screen Display (2048 x 1280, Matches Image 3)
    // ---------------------------------------------------------------------
    const laptopCanvas = document.createElement("canvas");
    laptopCanvas.width = 2048;
    laptopCanvas.height = 1280;
    const lCtx = laptopCanvas.getContext("2d")!;

    // 1. Deep Celestial Twilight Sky Gradient
    const skyGrad = lCtx.createLinearGradient(0, 0, 0, 820);
    skyGrad.addColorStop(0, "#020719");
    skyGrad.addColorStop(0.35, "#071746");
    skyGrad.addColorStop(0.7, "#0d2b74");
    skyGrad.addColorStop(1, "#1853a2");
    lCtx.fillStyle = skyGrad;
    lCtx.fillRect(0, 0, 2048, 820);

    // Radiant Sunlight Flare Behind Mountain Center
    const sunGrad = lCtx.createRadialGradient(1024, 460, 40, 1024, 460, 650);
    sunGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    sunGrad.addColorStop(0.2, "rgba(0, 217, 255, 0.8)");
    sunGrad.addColorStop(0.5, "rgba(8, 123, 255, 0.4)");
    sunGrad.addColorStop(1, "transparent");
    lCtx.fillStyle = sunGrad;
    lCtx.fillRect(0, 0, 2048, 820);

    // 2. Realistic Multi-Layer Mountain Peaks (Alpine Peaks with Snow & Shadow)
    // Layer 1: Distant Dark Blue Ridge
    lCtx.fillStyle = "#0c214d";
    lCtx.beginPath();
    lCtx.moveTo(0, 680);
    lCtx.lineTo(260, 480);
    lCtx.lineTo(540, 560);
    lCtx.lineTo(840, 410);
    lCtx.lineTo(1120, 520);
    lCtx.lineTo(1420, 390);
    lCtx.lineTo(1760, 530);
    lCtx.lineTo(2048, 440);
    lCtx.lineTo(2048, 820);
    lCtx.lineTo(0, 820);
    lCtx.closePath();
    lCtx.fill();

    // Layer 2: Main Majestic Jagged Alpine Peaks
    const drawMountainRidge = (
      points: [number, number][],
      fillColor: string,
      snowPoints: [number, number][]
    ) => {
      // Shaded mountain face
      lCtx.fillStyle = fillColor;
      lCtx.beginPath();
      lCtx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        lCtx.lineTo(points[i][0], points[i][1]);
      }
      lCtx.lineTo(2048, 820);
      lCtx.lineTo(0, 820);
      lCtx.closePath();
      lCtx.fill();

      // Bright Snow Highlights on Ridge Crests
      lCtx.fillStyle = "#EBF4FF";
      lCtx.beginPath();
      lCtx.moveTo(snowPoints[0][0], snowPoints[0][1]);
      for (let i = 1; i < snowPoints.length; i++) {
        lCtx.lineTo(snowPoints[i][0], snowPoints[i][1]);
      }
      lCtx.closePath();
      lCtx.fill();
    };

    // Main Center Mountain (High snowy peak)
    lCtx.fillStyle = "#163a75";
    lCtx.beginPath();
    lCtx.moveTo(520, 820);
    lCtx.lineTo(1024, 310);
    lCtx.lineTo(1580, 820);
    lCtx.closePath();
    lCtx.fill();

    // Snow Cap on Center Peak (Sunlit right face)
    lCtx.fillStyle = "#FFFFFF";
    lCtx.beginPath();
    lCtx.moveTo(1024, 310);
    lCtx.lineTo(1180, 460);
    lCtx.lineTo(1090, 510);
    lCtx.lineTo(1024, 460);
    lCtx.closePath();
    lCtx.fill();

    // Snow Cap on Center Peak (Shadowed left face)
    lCtx.fillStyle = "#95c6ff";
    lCtx.beginPath();
    lCtx.moveTo(1024, 310);
    lCtx.lineTo(920, 470);
    lCtx.lineTo(990, 510);
    lCtx.lineTo(1024, 460);
    lCtx.closePath();
    lCtx.fill();

    // Left Secondary Peak
    lCtx.fillStyle = "#102f64";
    lCtx.beginPath();
    lCtx.moveTo(120, 820);
    lCtx.lineTo(540, 390);
    lCtx.lineTo(920, 820);
    lCtx.closePath();
    lCtx.fill();

    // Snow on Left Peak
    lCtx.fillStyle = "#FFFFFF";
    lCtx.beginPath();
    lCtx.moveTo(540, 390);
    lCtx.lineTo(660, 520);
    lCtx.lineTo(590, 560);
    lCtx.lineTo(540, 510);
    lCtx.closePath();
    lCtx.fill();
    lCtx.fillStyle = "#87b8f7";
    lCtx.beginPath();
    lCtx.moveTo(540, 390);
    lCtx.lineTo(440, 520);
    lCtx.lineTo(500, 550);
    lCtx.lineTo(540, 510);
    lCtx.closePath();
    lCtx.fill();

    // Right Secondary Peak
    lCtx.fillStyle = "#12346b";
    lCtx.beginPath();
    lCtx.moveTo(1200, 820);
    lCtx.lineTo(1620, 360);
    lCtx.lineTo(2048, 760);
    lCtx.lineTo(2048, 820);
    lCtx.closePath();
    lCtx.fill();

    // Snow on Right Peak
    lCtx.fillStyle = "#FFFFFF";
    lCtx.beginPath();
    lCtx.moveTo(1620, 360);
    lCtx.lineTo(1760, 490);
    lCtx.lineTo(1680, 540);
    lCtx.lineTo(1620, 490);
    lCtx.closePath();
    lCtx.fill();
    lCtx.fillStyle = "#95c6ff";
    lCtx.beginPath();
    lCtx.moveTo(1620, 360);
    lCtx.lineTo(1510, 500);
    lCtx.lineTo(1580, 530);
    lCtx.lineTo(1620, 490);
    lCtx.closePath();
    lCtx.fill();

    // 3. Top Sleek Web App Navigation Bar
    lCtx.fillStyle = "rgba(4, 13, 38, 0.94)";
    lCtx.fillRect(0, 0, 2048, 120);
    lCtx.strokeStyle = "rgba(0, 217, 255, 0.3)";
    lCtx.lineWidth = 2;
    lCtx.beginPath();
    lCtx.moveTo(0, 120);
    lCtx.lineTo(2048, 120);
    lCtx.stroke();

    // Window Control Dots (macOS style)
    lCtx.fillStyle = "#FF5F56";
    lCtx.beginPath();
    lCtx.arc(50, 60, 12, 0, Math.PI * 2);
    lCtx.fill();
    lCtx.fillStyle = "#FFBD2E";
    lCtx.beginPath();
    lCtx.arc(86, 60, 12, 0, Math.PI * 2);
    lCtx.fill();
    lCtx.fillStyle = "#27C93F";
    lCtx.beginPath();
    lCtx.arc(122, 60, 12, 0, Math.PI * 2);
    lCtx.fill();

    // SX Logo + Company Name
    lCtx.fillStyle = "#00D9FF";
    lCtx.font = "bold 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    lCtx.fillText("SX", 190, 75);
    lCtx.fillStyle = "#FFFFFF";
    lCtx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    lCtx.fillText("STARX ALPHA LABS", 270, 72);

    // Nav Links
    lCtx.fillStyle = "#C8D5EF";
    lCtx.font = "500 24px -apple-system, BlinkMacSystemFont, sans-serif";
    lCtx.fillText("Solutions", 840, 72);
    lCtx.fillText("Demos 160+", 1020, 72);
    lCtx.fillText("Pricing", 1240, 72);
    lCtx.fillText("About", 1400, 72);

    // Live Web Core Pill Button
    lCtx.fillStyle = "rgba(0, 217, 255, 0.25)";
    lCtx.beginPath();
    lCtx.roundRect(1680, 36, 290, 52, 26);
    lCtx.fill();
    lCtx.strokeStyle = "#00D9FF";
    lCtx.lineWidth = 3;
    lCtx.stroke();
    lCtx.fillStyle = "#00D9FF";
    lCtx.font = "bold 20px monospace";
    lCtx.fillText("● LIVE WEB CORE", 1726, 68);

    // 4. Hero Content On Screen (Matching Image 3)
    // Headline
    lCtx.fillStyle = "#00D9FF";
    lCtx.font = "bold 28px monospace";
    lCtx.fillText("STARX ALPHA LABS • WEB SYSTEM", 120, 250);

    lCtx.fillStyle = "#FFFFFF";
    lCtx.font = "900 76px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    lCtx.fillText("Professional Business Website", 120, 345);

    lCtx.fillStyle = "#E2E8F0";
    lCtx.font = "500 32px -apple-system, BlinkMacSystemFont, sans-serif";
    lCtx.fillText("Enterprise architecture with zero-trust database security, instantaneous", 120, 420);
    lCtx.fillText("multi-currency billing and lightning speed.", 120, 468);

    // Action CTA Button on Screen
    const btnGrad = lCtx.createLinearGradient(120, 0, 460, 0);
    btnGrad.addColorStop(0, "#FF941F");
    btnGrad.addColorStop(0.5, "#FF35B8");
    btnGrad.addColorStop(1, "#E52BFF");
    lCtx.fillStyle = btnGrad;
    lCtx.beginPath();
    lCtx.roundRect(120, 530, 340, 84, 42);
    lCtx.fill();
    lCtx.fillStyle = "#FFFFFF";
    lCtx.font = "bold 30px sans-serif";
    lCtx.fillText("Explore Demos →", 170, 582);

    // 5. Four Feature Cards along the Bottom (Matching Image 3)
    const cardData = [
      { icon: "🌐", title: "Website Development", sub: "100/100 CWV Score", tag: "Full-Stack" },
      { icon: "🛡️", title: "Zero Trust Security", sub: "Enterprise RLS & Auth", tag: "Hardened" },
      { icon: "⚡", title: "Next.js 16 Turbo", sub: "Instantaneous Speed", tag: "Modern" },
      { icon: "💼", title: "Enterprise Portal", sub: "Multi-Role Workflows", tag: "Scalable" }
    ];

    const cardY = 860;
    const cardWidth = 430;
    const cardHeight = 350;
    const cardGap = 46;

    cardData.forEach((c, idx) => {
      const x = 90 + idx * (cardWidth + cardGap);

      // Card Background (Frosted Glass)
      lCtx.fillStyle = "rgba(7, 22, 56, 0.95)";
      lCtx.beginPath();
      lCtx.roundRect(x, cardY, cardWidth, cardHeight, 28);
      lCtx.fill();

      // Border with subtle cyan glow
      lCtx.strokeStyle = "rgba(0, 217, 255, 0.45)";
      lCtx.lineWidth = 2.5;
      lCtx.stroke();

      // Icon Container
      lCtx.fillStyle = "rgba(0, 217, 255, 0.15)";
      lCtx.beginPath();
      lCtx.roundRect(x + 36, cardY + 36, 84, 84, 22);
      lCtx.fill();
      lCtx.strokeStyle = "#00D9FF";
      lCtx.lineWidth = 2;
      lCtx.stroke();

      lCtx.font = "46px sans-serif";
      lCtx.fillText(c.icon, x + 52, cardY + 96);

      // Title
      lCtx.fillStyle = "#FFFFFF";
      lCtx.font = "bold 32px sans-serif";
      lCtx.fillText(c.title, x + 36, cardY + 185);

      // Subtitle
      lCtx.fillStyle = "#94A3B8";
      lCtx.font = "500 24px sans-serif";
      lCtx.fillText(c.sub, x + 36, cardY + 230);

      // Tag Badge
      lCtx.fillStyle = "rgba(8, 123, 255, 0.35)";
      lCtx.beginPath();
      lCtx.roundRect(x + 36, cardY + 270, 160, 44, 12);
      lCtx.fill();
      lCtx.fillStyle = "#00D9FF";
      lCtx.font = "bold 20px monospace";
      lCtx.fillText(c.tag, x + 54, cardY + 299);
    });

    const laptopTexture = new THREE.CanvasTexture(laptopCanvas);

    // ---------------------------------------------------------------------
    // C. Realistic Laptop Keyboard Deck Texture (2048 x 1024)
    // ---------------------------------------------------------------------
    const kbCanvas = document.createElement("canvas");
    kbCanvas.width = 2048;
    kbCanvas.height = 1024;
    const kCtx = kbCanvas.getContext("2d")!;

    kCtx.fillStyle = "#1e293b";
    kCtx.fillRect(0, 0, 2048, 1024);

    // Recessed Keyboard Well
    kCtx.fillStyle = "#0a0f1d";
    kCtx.beginPath();
    kCtx.roundRect(140, 80, 1768, 560, 24);
    kCtx.fill();
    kCtx.strokeStyle = "#00D9FF33";
    kCtx.lineWidth = 2;
    kCtx.stroke();

    // Chiclet Key Grid
    const rows = 5;
    const cols = 14;
    const keyW = 106;
    const keyH = 88;
    const keyGap = 16;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 180 + c * (keyW + keyGap);
        const y = 110 + r * (keyH + keyGap);
        kCtx.fillStyle = "#182236";
        kCtx.beginPath();
        kCtx.roundRect(x, y, keyW, keyH, 12);
        kCtx.fill();
        kCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        kCtx.lineWidth = 1.5;
        kCtx.stroke();
      }
    }

    // Glass Trackpad
    kCtx.fillStyle = "#162033";
    kCtx.beginPath();
    kCtx.roundRect(724, 690, 600, 300, 20);
    kCtx.fill();
    kCtx.strokeStyle = "rgba(0, 217, 255, 0.35)";
    kCtx.lineWidth = 2;
    kCtx.stroke();

    const keyboardTexture = new THREE.CanvasTexture(kbCanvas);

    // ---------------------------------------------------------------------
    // D. Realistic Smartphone High-Res Screen (1024 x 2048, Matches Image 3)
    // ---------------------------------------------------------------------
    const phoneCanvas = document.createElement("canvas");
    phoneCanvas.width = 1024;
    phoneCanvas.height = 2048;
    const pCtx = phoneCanvas.getContext("2d")!;

    // Wallpaper Gradient
    const phoneBg = pCtx.createLinearGradient(0, 0, 0, 2048);
    phoneBg.addColorStop(0, "#030A24");
    phoneBg.addColorStop(0.5, "#071642");
    phoneBg.addColorStop(1, "#030A24");
    pCtx.fillStyle = phoneBg;
    pCtx.fillRect(0, 0, 1024, 2048);

    // Status Bar
    pCtx.fillStyle = "#FFFFFF";
    pCtx.font = "bold 44px -apple-system, BlinkMacSystemFont, sans-serif";
    pCtx.fillText("9:41", 80, 100);
    pCtx.font = "bold 38px monospace";
    pCtx.fillText("5G 🔋", 820, 100);

    // Dynamic Island
    pCtx.fillStyle = "#000000";
    pCtx.beginPath();
    pCtx.roundRect(352, 54, 320, 72, 36);
    pCtx.fill();
    pCtx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    pCtx.lineWidth = 2;
    pCtx.stroke();

    // Camera Lens & Sensor Dot in Island
    pCtx.fillStyle = "#0d1b38";
    pCtx.beginPath();
    pCtx.arc(600, 90, 18, 0, Math.PI * 2);
    pCtx.fill();

    // Brand Header
    pCtx.fillStyle = "#00D9FF";
    pCtx.font = "bold 58px sans-serif";
    pCtx.fillText("SX", 260, 260);
    pCtx.fillStyle = "#FFFFFF";
    pCtx.font = "bold 46px sans-serif";
    pCtx.fillText("STARX ALPHA LABS", 360, 258);

    pCtx.fillStyle = "#E52BFF";
    pCtx.font = "bold 26px monospace";
    pCtx.fillText("MOBILE PLATFORM • NATIVE APPS", 230, 320);

    // 4 Vivid Squircle App Icons (Matching Image 3)
    const phoneTiles = [
      {
        icon: "🛍️",
        title: "E-Commerce",
        sub: "Native Store",
        grad: ["#007BFF", "#00D9FF"]
      },
      {
        icon: "📦",
        title: "Solutions",
        sub: "On-Demand",
        grad: ["#FF8C00", "#FF4500"]
      },
      {
        icon: "🛡️",
        title: "Analytics",
        sub: "Live Telemetry",
        grad: ["#7928CA", "#FF0080"]
      },
      {
        icon: "⚙️",
        title: "Operations",
        sub: "Multi-Role Hub",
        grad: ["#00DF89", "#00B4D8"]
      }
    ];

    phoneTiles.forEach((t, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 76 + col * 456;
      const y = 430 + row * 530;

      // Icon Card Body
      const g = pCtx.createLinearGradient(x, y, x + 416, y + 470);
      g.addColorStop(0, t.grad[0]);
      g.addColorStop(1, t.grad[1]);
      pCtx.fillStyle = g;
      pCtx.beginPath();
      pCtx.roundRect(x, y, 416, 470, 56);
      pCtx.fill();

      // Gloss / Lighting Arc on Top of Squircle
      const gloss = pCtx.createLinearGradient(x, y, x, y + 200);
      gloss.addColorStop(0, "rgba(255, 255, 255, 0.45)");
      gloss.addColorStop(1, "transparent");
      pCtx.fillStyle = gloss;
      pCtx.beginPath();
      pCtx.roundRect(x, y, 416, 200, 56);
      pCtx.fill();

      // Border Glow
      pCtx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      pCtx.lineWidth = 4;
      pCtx.stroke();

      // Center Icon
      pCtx.font = "96px serif";
      pCtx.fillText(t.icon, x + 150, y + 210);

      // Label
      pCtx.fillStyle = "#FFFFFF";
      pCtx.font = "bold 44px sans-serif";
      pCtx.textAlign = "center";
      pCtx.fillText(t.title, x + 208, y + 330);

      pCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      pCtx.font = "bold 26px sans-serif";
      pCtx.fillText(t.sub, x + 208, y + 390);
      pCtx.textAlign = "left";
    });

    // Lower Feature Banner
    pCtx.fillStyle = "rgba(7, 22, 56, 0.95)";
    pCtx.beginPath();
    pCtx.roundRect(76, 1540, 872, 200, 48);
    pCtx.fill();
    pCtx.strokeStyle = "#E52BFF";
    pCtx.lineWidth = 4;
    pCtx.stroke();

    pCtx.fillStyle = "#FFFFFF";
    pCtx.font = "bold 40px sans-serif";
    pCtx.fillText("iOS & Android Apps", 140, 1625);
    pCtx.fillStyle = "#00DF89";
    pCtx.font = "bold 28px monospace";
    pCtx.fillText("✔ 60 FPS Native  ✔ Push Notifications", 140, 1685);

    // Bottom App Dock
    pCtx.fillStyle = "rgba(3, 11, 36, 0.96)";
    pCtx.beginPath();
    pCtx.roundRect(76, 1800, 872, 160, 56);
    pCtx.fill();
    pCtx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    pCtx.lineWidth = 2;
    pCtx.stroke();

    pCtx.font = "60px serif";
    pCtx.fillText("🏠", 150, 1905);
    pCtx.fillText("📦", 360, 1905);
    pCtx.fillText("🔔", 570, 1905);
    pCtx.fillText("👤", 780, 1905);

    const phoneTexture = new THREE.CanvasTexture(phoneCanvas);

    // ---------------------------------------------------------------------
    // E. Floating Combo Card High-Res Graphic (1024 x 1440, Matches Image 3)
    // ---------------------------------------------------------------------
    const comboCanvas = document.createElement("canvas");
    comboCanvas.width = 1024;
    comboCanvas.height = 1440;
    const cCtx = comboCanvas.getContext("2d")!;

    // Translucent Glass Fill
    const cBgGrad = cCtx.createLinearGradient(0, 0, 1024, 1440);
    cBgGrad.addColorStop(0, "rgba(7, 22, 56, 0.96)");
    cBgGrad.addColorStop(0.5, "rgba(4, 14, 40, 0.98)");
    cBgGrad.addColorStop(1, "rgba(3, 11, 36, 0.96)");
    cCtx.fillStyle = cBgGrad;
    cCtx.beginPath();
    cCtx.roundRect(16, 16, 992, 1408, 64);
    cCtx.fill();

    // Dual Neon Glowing Border: Outer Electric Cyan, Inner Purple Glow
    cCtx.strokeStyle = "#00D9FF";
    cCtx.lineWidth = 16;
    cCtx.beginPath();
    cCtx.roundRect(16, 16, 992, 1408, 64);
    cCtx.stroke();

    cCtx.strokeStyle = "rgba(229, 43, 255, 0.85)";
    cCtx.lineWidth = 8;
    cCtx.beginPath();
    cCtx.roundRect(40, 40, 944, 1360, 48);
    cCtx.stroke();

    // Top Glowing Circle Badge with Chain Link 🔗 Icon
    const chainGrad = cCtx.createRadialGradient(512, 240, 20, 512, 240, 130);
    chainGrad.addColorStop(0, "#00D9FF");
    chainGrad.addColorStop(0.7, "#087BFF");
    chainGrad.addColorStop(1, "rgba(8, 123, 255, 0)");
    cCtx.fillStyle = chainGrad;
    cCtx.beginPath();
    cCtx.arc(512, 240, 130, 0, Math.PI * 2);
    cCtx.fill();

    cCtx.fillStyle = "#FFFFFF";
    cCtx.beginPath();
    cCtx.arc(512, 240, 90, 0, Math.PI * 2);
    cCtx.fill();

    cCtx.font = "84px serif";
    cCtx.textAlign = "center";
    cCtx.fillText("🔗", 512, 270);

    // Bold Title Typography
    cCtx.fillStyle = "#FFFFFF";
    cCtx.font = "900 84px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    cCtx.fillText("Combo", 512, 450);
    cCtx.fillText("Website + App", 512, 550);

    cCtx.fillStyle = "#00D9FF";
    cCtx.font = "bold 30px monospace";
    cCtx.fillText("UNIFIED ECOSYSTEM • BEST VALUE", 512, 630);

    // Graphic Container: Mini Laptop + Mini Phone Illustration
    cCtx.fillStyle = "rgba(3, 11, 36, 0.95)";
    cCtx.beginPath();
    cCtx.roundRect(112, 700, 800, 360, 48);
    cCtx.fill();
    cCtx.strokeStyle = "rgba(0, 217, 255, 0.6)";
    cCtx.lineWidth = 4;
    cCtx.stroke();

    cCtx.font = "140px serif";
    cCtx.fillText("💻", 310, 930);

    cCtx.fillStyle = "#FFFFFF";
    cCtx.font = "900 80px monospace";
    cCtx.fillText("+", 512, 910);

    cCtx.fillText("📱", 714, 930);

    // Bottom Action Pill
    const cBtnGrad = cCtx.createLinearGradient(112, 0, 912, 0);
    cBtnGrad.addColorStop(0, "#087BFF");
    cBtnGrad.addColorStop(0.5, "#873BFF");
    cBtnGrad.addColorStop(1, "#E52BFF");
    cCtx.fillStyle = cBtnGrad;
    cCtx.beginPath();
    cCtx.roundRect(112, 1150, 800, 140, 70);
    cCtx.fill();

    cCtx.fillStyle = "#FFFFFF";
    cCtx.font = "bold 44px sans-serif";
    cCtx.fillText("Explore Combo Package →", 512, 1238);
    cCtx.textAlign = "left";

    const comboTexture = new THREE.CanvasTexture(comboCanvas);

    return {
      laptopTexture,
      keyboardTexture,
      phoneTexture,
      comboTexture,
      globeTexture,
    };
  }, []);
}

// =========================================================================
// 2. 3D HOLOGRAPHIC EARTH GLOBE & ORBITAL RINGS
// =========================================================================

function GlobeAssembly({ globeTexture }: { globeTexture: THREE.CanvasTexture | null }) {
  const globeRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlePos = useMemo(() => {
    const count = 480;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const xSeed = Math.sin(i * 12.9898 + 1.0) * 43758.5453;
      const ySeed = Math.sin(i * 78.233 + 2.0) * 43758.5453;
      const zSeed = Math.sin(i * 45.164 + 3.0) * 43758.5453;
      const xVal = xSeed - Math.floor(xSeed);
      const yVal = ySeed - Math.floor(ySeed);
      const zVal = zSeed - Math.floor(zSeed);

      pos[i * 3] = (xVal - 0.5) * 16;
      pos[i * 3 + 1] = (yVal - 0.45) * 10;
      pos[i * 3 + 2] = -3.0 - zVal * 5.0;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y = t * 0.08;
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.12;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.09;
    if (particlesRef.current) particlesRef.current.rotation.y = -t * 0.02;
  });

  return (
    <group position={[0.6, 1.2, -4.2]}>
      {/* 3D Realistic Earth Globe (Equirectangular Continents & Grids) */}
      <group ref={globeRef}>
        {globeTexture && (
          <mesh>
            <sphereGeometry args={[3.3, 64, 48]} />
            <meshBasicMaterial map={globeTexture} />
          </mesh>
        )}

        {/* Luminous Atmospheric Glow Rim */}
        <mesh>
          <sphereGeometry args={[3.36, 48, 36]} />
          <meshBasicMaterial
            color="#00D9FF"
            transparent
            opacity={0.16}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Orbital Ring 1 - Cyan Sweeping Arc */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.25, 0]}>
        <ringGeometry args={[3.95, 3.99, 90]} />
        <meshBasicMaterial color="#00D9FF" side={THREE.DoubleSide} transparent opacity={0.5} />
      </mesh>

      {/* Orbital Ring 2 - Magenta Opposite Tilt */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.2, 0.35, 0]}>
        <ringGeometry args={[4.25, 4.29, 90]} />
        <meshBasicMaterial color="#E52BFF" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>

      {/* Space Particles */}
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
// 3. 3D HARDWARE DEVICES RIG (Realistic Laptop, Phone, Combo Card)
// =========================================================================

function HardwareRig({
  laptopTexture,
  keyboardTexture,
  phoneTexture,
  comboTexture,
}: {
  laptopTexture: THREE.CanvasTexture | null;
  keyboardTexture: THREE.CanvasTexture | null;
  phoneTexture: THREE.CanvasTexture | null;
  comboTexture: THREE.CanvasTexture | null;
}) {
  const masterGroup = useRef<THREE.Group>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);
  const phoneRef = useRef<THREE.Group>(null);
  const comboRef = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();

    // Mouse tilt lerp (Controlled, elegant 3D perspective)
    if (masterGroup.current) {
      masterGroup.current.rotation.y = THREE.MathUtils.lerp(
        masterGroup.current.rotation.y,
        pointer.x * 0.18,
        0.08
      );
      masterGroup.current.rotation.x = THREE.MathUtils.lerp(
        masterGroup.current.rotation.x,
        -pointer.y * 0.14,
        0.08
      );
    }

    // Dynamic specular glint tracking cursor
    if (cursorLightRef.current) {
      cursorLightRef.current.position.x = pointer.x * 6;
      cursorLightRef.current.position.y = pointer.y * 4 + 2;
    }

    // Gentle floating breath on mobile & combo card
    if (phoneRef.current) {
      phoneRef.current.position.y = -0.32 + Math.sin(t * 1.8) * 0.04;
    }
    if (comboRef.current) {
      comboRef.current.position.y = 0.08 + Math.cos(t * 1.5) * 0.05;
    }
  });

  return (
    <group ref={masterGroup}>
      {/* Specular Mouse Point Light */}
      <pointLight
        ref={cursorLightRef}
        position={[0, 2, 4.5]}
        intensity={3.8}
        color="#00D9FF"
        distance={12}
      />

      {/* Glowing Concentric Neon Rings on Floor */}
      <group position={[0.4, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[2.0, 2.04, 64]} />
          <meshBasicMaterial color="#00D9FF" side={THREE.DoubleSide} transparent opacity={0.65} />
        </mesh>
        <mesh>
          <ringGeometry args={[2.7, 2.74, 64]} />
          <meshBasicMaterial color="#873BFF" side={THREE.DoubleSide} transparent opacity={0.45} />
        </mesh>
        <mesh>
          <ringGeometry args={[3.4, 3.44, 64]} />
          <meshBasicMaterial color="#E52BFF" side={THREE.DoubleSide} transparent opacity={0.35} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 1. REALISTIC 3D PHYSICAL LAPTOP (LEFT)                         */}
      {/* ------------------------------------------------------------- */}
      <group position={[-1.65, -0.65, 0.2]} rotation={[0.06, 0.32, -0.02]}>
        {/* Metallic Base Chassis (Silver / Dark Titanium) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.4, 0.1, 2.3]} />
          <meshStandardMaterial color="#283548" metalness={0.88} roughness={0.2} />
        </mesh>

        {/* Keyboard Deck Plate with Procedural Keyboard Texture */}
        {keyboardTexture && (
          <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.36, 2.26]} />
            <meshStandardMaterial map={keyboardTexture} roughness={0.4} />
          </mesh>
        )}

        {/* Front Lip Scoop */}
        <mesh position={[0, 0.03, 1.155]}>
          <boxGeometry args={[0.55, 0.04, 0.03]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>

        {/* Laptop Screen Lid (Angled backwards ~110°) */}
        <group position={[0, 0.05, -1.13]} rotation={[-0.26, 0, 0]}>
          {/* Metallic Back Lid */}
          <mesh position={[0, 1.12, 0]}>
            <boxGeometry args={[3.4, 2.24, 0.06]} />
            <meshStandardMaterial color="#283548" metalness={0.88} roughness={0.2} />
          </mesh>

          {/* Front Bezel Frame (Slim Obsidian Black) */}
          <mesh position={[0, 1.12, 0.032]}>
            <boxGeometry args={[3.38, 2.22, 0.005]} />
            <meshStandardMaterial color="#050B14" roughness={0.9} />
          </mesh>

          {/* Screen Display Face (High-Res Mountain Landscape & UI) */}
          {laptopTexture && (
            <mesh position={[0, 1.12, 0.036]}>
              <planeGeometry args={[3.26, 2.12]} />
              <meshBasicMaterial map={laptopTexture} />
            </mesh>
          )}

          {/* Subtle Screen Bezel Rim Glow (Soft, not a wireframe box!) */}
          <mesh position={[0, 1.12, 0.038]}>
            <ringGeometry args={[1.9, 1.91, 4]} />
            <meshBasicMaterial color="#00D9FF" transparent opacity={0.25} />
          </mesh>
        </group>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 2. REALISTIC 3D PHYSICAL SMARTPHONE (CENTER, STANDING)        */}
      {/* ------------------------------------------------------------- */}
      <group ref={phoneRef} position={[0.75, -0.32, 0.55]} rotation={[-0.04, -0.22, 0.04]}>
        {/* Polished Metallic Perimeter Chassis (Titanium Bezel) */}
        <mesh>
          <boxGeometry args={[1.44, 2.84, 0.14]} />
          <meshStandardMaterial color="#334155" metalness={0.94} roughness={0.14} />
        </mesh>

        {/* Screen Display Face (High-Res iPhone Apps & Widgets) */}
        {phoneTexture && (
          <mesh position={[0, 0, 0.073]}>
            <planeGeometry args={[1.36, 2.74]} />
            <meshBasicMaterial map={phoneTexture} />
          </mesh>
        )}

        {/* Volume & Power Buttons */}
        <mesh position={[-0.73, 0.5, 0]}>
          <boxGeometry args={[0.03, 0.35, 0.05]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} />
        </mesh>
        <mesh position={[0.73, 0.4, 0]}>
          <boxGeometry args={[0.03, 0.35, 0.05]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 3. REALISTIC 3D STANDALONE COMBO CARD (RIGHT, FLOATING)       */}
      {/* ------------------------------------------------------------- */}
      <group ref={comboRef} position={[2.55, 0.06, 0.28]} rotation={[-0.02, -0.24, 0.01]}>
        {/* Glassmorphic Slab Face (High-Res Neon Combo Graphic) */}
        {comboTexture && (
          <mesh>
            <boxGeometry args={[1.58, 2.22, 0.06]} />
            <meshBasicMaterial map={comboTexture} />
          </mesh>
        )}
      </group>
    </group>
  );
}

// =========================================================================
// 4. MAIN EXPORT COMPONENT
// =========================================================================

const emptySubscribe = () => () => {};

export function Hero3DHardwareScene() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const textures = useDeviceTextures();

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
      {/* WebGL Canvas - 100% Transparent, Seamlessly Floating in Hero Space */}
      <Canvas
        camera={{ position: [0, 0.35, 8.2], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 9, 6]} intensity={2.2} color="#FFFFFF" />
        <pointLight position={[-5, 2.5, 4]} intensity={3.5} color="#00D9FF" />
        <pointLight position={[5, 1.5, 4]} intensity={3.0} color="#E52BFF" />

        {/* 3D Holographic Globe with Visible Continents */}
        <GlobeAssembly globeTexture={textures.globeTexture} />

        {/* 3D Realistic Hardware Rig */}
        <HardwareRig
          laptopTexture={textures.laptopTexture}
          keyboardTexture={textures.keyboardTexture}
          phoneTexture={textures.phoneTexture}
          comboTexture={textures.comboTexture}
        />
      </Canvas>

      {/* Floating Neon Indicators (Matching Image 3 with pointer lines) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* 1. Website Development Badge (Above Laptop) */}
        <div className="absolute top-2 left-[12%] sm:left-[14%] flex flex-col items-center">
          <Link
            href="/website-development"
            className="pointer-events-auto px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide text-white bg-[#071638]/95 border-2 border-[#00D9FF] shadow-[0_0_25px_rgba(0,217,255,0.7)] backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Globe className="w-3.5 h-3.5 text-[#00D9FF]" />
            <span>Website Development</span>
            <ArrowUpRight className="w-3 h-3 text-[#00D9FF]" />
          </Link>
          {/* Neon Pointer Arrow Down to Laptop Screen */}
          <svg className="w-6 h-12 text-[#00D9FF] -mt-0.5 filter drop-shadow-[0_0_8px_#00D9FF]" viewBox="0 0 24 48" fill="none">
            <line x1="12" y1="0" x2="12" y2="40" stroke="#00D9FF" strokeWidth="2.5" />
            <polygon points="6,38 12,46 18,38" fill="#00D9FF" />
          </svg>
        </div>

        {/* 2. Mobile App Development Badge (Above Smartphone) */}
        <div className="absolute top-4 left-[56%] sm:left-[58%] flex flex-col items-center">
          <Link
            href="/app-development"
            className="pointer-events-auto px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide text-white bg-[#071638]/95 border-2 border-[#E52BFF] shadow-[0_0_25px_rgba(229,43,255,0.7)] backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#E52BFF]" />
            <span>Mobile App Development</span>
            <ArrowUpRight className="w-3 h-3 text-[#E52BFF]" />
          </Link>
          {/* Neon Pointer Arrow Down to Smartphone Screen */}
          <svg className="w-6 h-12 text-[#E52BFF] -mt-0.5 filter drop-shadow-[0_0_8px_#E52BFF]" viewBox="0 0 24 48" fill="none">
            <line x1="12" y1="0" x2="12" y2="40" stroke="#E52BFF" strokeWidth="2.5" />
            <polygon points="6,38 12,46 18,38" fill="#E52BFF" />
          </svg>
        </div>
      </div>
    </div>
  );
}
