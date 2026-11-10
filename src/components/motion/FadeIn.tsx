"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  id?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
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
