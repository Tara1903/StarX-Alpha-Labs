import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "glow" | "brand";
  orientation?: "horizontal" | "vertical";
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({
  className,
  variant = "subtle",
  orientation = "horizontal",
  label,
  ...props
}) => {
  const isHorizontal = orientation === "horizontal";

  const variantStyles = {
    subtle: isHorizontal ? "border-t border-[#19375E]/60" : "border-l border-[#19375E]/60",
    glow: isHorizontal
      ? "h-[1px] bg-gradient-to-r from-transparent via-[#32A9E8]/60 to-transparent"
      : "w-[1px] bg-gradient-to-b from-transparent via-[#32A9E8]/60 to-transparent",
    brand: isHorizontal
      ? "h-[2px] bg-gradient-to-r from-[#102D50] via-[#1769AA] to-[#32A9E8]"
      : "w-[2px] bg-gradient-to-b from-[#102D50] via-[#1769AA] to-[#32A9E8]",
  };

  if (label && isHorizontal) {
    return (
      <div className={cn("relative flex py-4 items-center w-full", className)} {...props}>
        <div className="grow border-t border-[#19375E]/80" />
        <span className="shrink mx-4 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-[#0A1424] px-2">
          {label}
        </span>
        <div className="grow border-t border-[#19375E]/80" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        isHorizontal ? "w-full my-6" : "h-full mx-4 inline-block",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
};
