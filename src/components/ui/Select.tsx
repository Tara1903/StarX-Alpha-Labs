import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, placeholder, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          defaultValue=""
          className={cn(
            "w-full appearance-none rounded-lg bg-[#0A1424] text-slate-100 border border-[#19375E] text-sm px-3.5 py-2.5 pr-10 transition-all duration-200 focus:outline-none focus:border-[#32A9E8] focus:ring-1 focus:ring-[#32A9E8] disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[#DC5454] focus:border-[#DC5454] focus:ring-[#DC5454]",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#0F2038] text-slate-400">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="bg-[#0F2038] text-slate-100"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = "Select";
