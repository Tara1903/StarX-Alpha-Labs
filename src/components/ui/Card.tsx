import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "cinematic" | "corporate" | "elevated" | "flat";
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "cinematic", hoverable = false, children, ...props }, ref) => {
    const variantStyles = {
      cinematic:
        "bg-[#0F2038] text-slate-100 border border-[#19375E] rounded-xl shadow-lg",
      corporate:
        "bg-white text-[#172B43] border border-[#DDE7F0] rounded-xl shadow-corporate-card",
      elevated:
        "bg-[#102D50] text-slate-100 border border-[#19375E] rounded-xl shadow-2xl",
      flat:
        "bg-transparent text-inherit border border-[#19375E]/60 rounded-xl",
    };

    const hoverStyles = hoverable
      ? variant === "corporate"
        ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#1769AA]/40"
        : "transition-all duration-300 hover:-translate-y-1 hover:border-[#32A9E8]/80 hover:shadow-cinematic-glow"
      : "";

    return (
      <div
        ref={ref}
        className={cn(variantStyles[variant], hoverStyles, "overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pb-4 space-y-1.5", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold tracking-tight text-inherit", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm opacity-70 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0 space-y-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0 flex items-center justify-between border-t border-inherit/20 mt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
