import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 4, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={cn(
          "w-full rounded-lg bg-[#0A1424] text-slate-100 placeholder:text-slate-500 border border-[#19375E] text-sm p-3.5 transition-all duration-200 focus:outline-none focus:border-[#32A9E8] focus:ring-1 focus:ring-[#32A9E8] disabled:opacity-50 disabled:cursor-not-allowed resize-y",
          error && "border-[#DC5454] focus:border-[#DC5454] focus:ring-[#DC5454]",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
