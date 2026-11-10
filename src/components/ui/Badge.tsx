import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "navy"
    | "electric"
    | "corporate"
    | "success"
    | "warning"
    | "danger"
    | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "electric",
  size = "md",
  dot = false,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  const variantStyles = {
    navy: "bg-[#102D50] text-[#32A9E8] border border-[#19375E]",
    electric: "bg-[#32A9E8]/15 text-[#32A9E8] border border-[#32A9E8]/30",
    corporate: "bg-[#1769AA]/15 text-[#63B8F8] border border-[#1769AA]/35",
    success: "bg-[#16866A]/15 text-[#2DD4BF] border border-[#16866A]/30",
    warning: "bg-[#D69B35]/15 text-[#FBBF24] border border-[#D69B35]/30",
    danger: "bg-[#DC5454]/15 text-[#F87171] border border-[#DC5454]/30",
    outline: "bg-transparent text-slate-300 border border-slate-700",
  };

  const dotColors = {
    navy: "bg-[#32A9E8]",
    electric: "bg-[#32A9E8]",
    corporate: "bg-[#1769AA]",
    success: "bg-[#16866A]",
    warning: "bg-[#D69B35]",
    danger: "bg-[#DC5454]",
    outline: "bg-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full uppercase tracking-wider",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />}
      <span>{children}</span>
    </span>
  );
};
