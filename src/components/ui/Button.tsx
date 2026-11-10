import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "corporate"
    | "navy"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-[#32A9E8] hover:bg-[#2595D1] text-white shadow-md shadow-[#32A9E8]/25 focus-visible:ring-[#32A9E8] focus-visible:ring-offset-[#0A1424]",
      corporate:
        "bg-[#1769AA] hover:bg-[#12558B] text-white shadow-md shadow-[#1769AA]/20 focus-visible:ring-[#1769AA] focus-visible:ring-offset-[#0A1424]",
      navy:
        "bg-[#102D50] hover:bg-[#0B2039] text-white border border-[#19375E] focus-visible:ring-[#1769AA] focus-visible:ring-offset-[#0A1424]",
      secondary:
        "bg-[#0F2038] hover:bg-[#152B4B] text-slate-200 border border-[#19375E] focus-visible:ring-[#32A9E8] focus-visible:ring-offset-[#0A1424]",
      outline:
        "bg-transparent border border-[#32A9E8]/40 hover:border-[#32A9E8] text-[#32A9E8] hover:bg-[#32A9E8]/10 focus-visible:ring-[#32A9E8] focus-visible:ring-offset-[#0A1424]",
      ghost:
        "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white focus-visible:ring-slate-400 focus-visible:ring-offset-[#0A1424]",
      danger:
        "bg-[#DC5454] hover:bg-[#C94242] text-white shadow-md shadow-[#DC5454]/20 focus-visible:ring-[#DC5454] focus-visible:ring-offset-[#0A1424]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
