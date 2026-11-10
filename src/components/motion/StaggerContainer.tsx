"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  id?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
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

export interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  id?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
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
