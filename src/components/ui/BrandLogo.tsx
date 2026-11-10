import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showGlow?: boolean;
  priority?: boolean;
}

const SIZE_MAP = {
  xs: { box: "h-7 w-7 rounded-lg", px: 28 },
  sm: { box: "h-8 w-8 rounded-xl", px: 32 },
  md: { box: "h-10 w-10 sm:h-11 sm:w-11 rounded-xl", px: 44 },
  lg: { box: "h-14 w-14 rounded-2xl", px: 56 },
  xl: { box: "h-20 w-20 rounded-3xl", px: 80 },
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = "md",
  className,
  showGlow = true,
  priority = false,
}) => {
  const { box, px } = SIZE_MAP[size];

  return (
    <div
      className={cn(
        "relative overflow-hidden shrink-0 border border-[#32A9E8]/40 shadow-lg shadow-[#1769AA]/30 group-hover:border-[#73D8FF] group-hover:shadow-[#32A9E8]/40 transition-all duration-300 bg-[#00031E]",
        box,
        className
      )}
    >
      <Image
        src="/brand/starx-alpha-logo.webp"
        alt="StarX Alpha Labs"
        width={px}
        height={px}
        priority={priority}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {showGlow && (
        <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#73D8FF] animate-pulse pointer-events-none" />
      )}
    </div>
  );
};
