import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "cinematic-dark" | "corporate-light" | "surface-dark" | "transparent";
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  noContainer?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  className,
  variant = "cinematic-dark",
  spacing = "lg",
  containerSize = "lg",
  noContainer = false,
  children,
  ...props
}) => {
  const variantStyles = {
    "cinematic-dark": "bg-[#0A1424] text-slate-100 relative overflow-hidden",
    "corporate-light": "bg-[#F4F8FC] text-[#172B43] theme-corporate-light border-y border-[#DDE7F0]",
    "surface-dark": "bg-[#0F2038] text-slate-100 border-y border-[#19375E]",
    transparent: "bg-transparent text-inherit",
  };

  const spacingStyles = {
    none: "py-0",
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
    xl: "py-24 md:py-32",
  };

  const containerSizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <section className={cn(variantStyles[variant], spacingStyles[spacing], className)} {...props}>
      {noContainer ? (
        children
      ) : (
        <div className={cn("w-full mx-auto px-4 sm:px-6 lg:px-8", containerSizes[containerSize])}>
          {children}
        </div>
      )}
    </section>
  );
};
