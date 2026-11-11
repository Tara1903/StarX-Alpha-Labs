"use client";

import React, { useRef, useEffect } from "react";

interface Card3DTiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number; // max tilt degrees (default: 8)
  scaleOnHover?: number; // default: 1.02
}

export function Card3DTilt({
  children,
  className = "",
  glowColor = "rgba(0, 217, 255, 0.75)",
  maxTilt = 8,
  scaleOnHover = 1.02,
  style = {},
  ...props
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS custom properties for radial border spotlight
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        // Compute 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -((y - centerY) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, ${scaleOnHover})`;
      });
    };

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.setProperty("--mouse-x", `-999px`);
      card.style.setProperty("--mouse-y", `-999px`);
    };

    card.addEventListener("mousemove", handleMouseMove, { passive: true });
    card.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, scaleOnHover]);

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-150 ease-out preserve-3d group ${className}`}
      style={{
        transformStyle: "preserve-3d",
        ["--glow-color" as any]: glowColor,
        ...style,
      }}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Border Pseudo-Element */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1px] rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-[inherit]"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), var(--glow-color, ${glowColor}), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
