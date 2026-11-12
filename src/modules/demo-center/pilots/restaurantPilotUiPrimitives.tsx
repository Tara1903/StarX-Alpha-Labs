"use client";

import React from "react";
import { X } from "lucide-react";

export const PILOT_CARD_CLASS =
  "rounded-2xl bg-white border border-[#E7E2DA] shadow-[0_1px_2px_rgba(28,25,23,0.04)]";

export const PILOT_SOFT_SURFACE_CLASS =
  "rounded-xl bg-[#F6F3EE] border border-[#E7E2DA]";

export const PILOT_INPUT_CLASS =
  "w-full px-3 py-2 rounded-lg bg-[#FCF9F4] border border-[#D8D1C7] text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]/30";

export const PILOT_PRIMARY_BTN_CLASS =
  "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50";

export const PILOT_SECONDARY_BTN_CLASS =
  "inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-[#F6F3EE] border border-[#E7E2DA] text-[#1C1917] text-xs font-semibold transition-colors cursor-pointer";

const STATUS_BADGE_MAP: Record<string, string> = {
  New: "bg-amber-50 text-amber-800 border-amber-200",
  Preparing: "bg-orange-50 text-[#C2410C] border-orange-200",
  Ready: "bg-emerald-50 text-[#15803D] border-emerald-200",
  Served: "bg-[#F0EDE9] text-[#4D4540] border-[#D8D1C7]",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
  Available: "bg-emerald-50 text-[#15803D] border-emerald-200",
  Occupied: "bg-orange-50 text-[#C2410C] border-orange-200",
  Reserved: "bg-amber-50 text-amber-800 border-amber-200",
  Cleaning: "bg-stone-100 text-stone-700 border-stone-300",
  Confirmed: "bg-amber-50 text-amber-800 border-amber-200",
  Seated: "bg-orange-50 text-[#C2410C] border-orange-200",
  Completed: "bg-emerald-50 text-[#15803D] border-emerald-200",
  "No-Show": "bg-red-50 text-red-700 border-red-200",
  "On Duty": "bg-emerald-50 text-[#15803D] border-emerald-200",
  "On Break": "bg-amber-50 text-amber-800 border-amber-200",
  "Off Duty": "bg-stone-100 text-stone-600 border-stone-300",
  Active: "bg-emerald-50 text-[#15803D] border-emerald-200",
  Seasonal: "bg-amber-50 text-amber-800 border-amber-200",
  Hidden: "bg-stone-100 text-stone-600 border-stone-300",
  Paid: "bg-emerald-50 text-[#15803D] border-emerald-200",
  Pending: "bg-amber-50 text-amber-800 border-amber-200",
  Refunded: "bg-red-50 text-red-700 border-red-200",
  "VIP Patron": "bg-orange-50 text-[#C2410C] border-orange-200",
  Regular: "bg-[#F0EDE9] text-[#4D4540] border-[#D8D1C7]",
  "First Visit": "bg-emerald-50 text-[#15803D] border-emerald-200",
};

export function PilotStatusBadge({ status }: { status: string }) {
  const cls = STATUS_BADGE_MAP[status] || "bg-[#F0EDE9] text-[#4D4540] border-[#E7E2DA]";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>
      {status}
    </span>
  );
}

export function PilotSectionHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#C2410C] font-semibold block mb-1">
          {eyebrow}
        </span>
        <h2
          className="text-2xl sm:text-[26px] font-semibold text-[#1C1917] tracking-tight leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {title}
        </h2>
        {subtitle && <p className="text-xs sm:text-sm text-[#4D4540] mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function PilotModal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-[#1C1917]/45 backdrop-blur-[2px] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-[#E7E2DA] shadow-2xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#E7E2DA]">
          <div>
            <h3
              className="text-lg font-semibold text-[#1C1917]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {title}
            </h3>
            {subtitle && <p className="text-xs text-[#4D4540] mt-0.5">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-[#4D4540] hover:bg-[#F6F3EE] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}
