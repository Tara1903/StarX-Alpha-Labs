import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full rounded-lg bg-[#0A1424] text-slate-100 placeholder:text-slate-500 border border-[#19375E] text-sm px-3.5 py-2.5 transition-all duration-200 focus:outline-none focus:border-[#32A9E8] focus:ring-1 focus:ring-[#32A9E8] disabled:opacity-50 disabled:cursor-not-allowed",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-[#DC5454] focus:border-[#DC5454] focus:ring-[#DC5454]",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-slate-400 pointer-events-none flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
