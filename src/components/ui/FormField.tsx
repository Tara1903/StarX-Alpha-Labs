import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  htmlFor?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  className,
  label,
  error,
  helperText,
  required = false,
  htmlFor,
  children,
  ...props
}) => {
  return (
    <div className={cn("space-y-1.5 w-full", className)} {...props}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={htmlFor}
            className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
          >
            {label}
            {required && <span className="text-[#DC5454] ml-1">*</span>}
          </label>
        </div>
      )}
      {children}
      {error ? (
        <p className="text-xs text-[#DC5454] flex items-center gap-1 font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};
