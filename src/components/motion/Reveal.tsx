"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  id?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  id,
}) => {
  return (
    <div id={id} className={cn("opacity-100", className)}>
      {children}
    </div>
  );
};
