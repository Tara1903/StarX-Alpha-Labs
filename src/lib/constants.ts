export const SITE_CONFIG = {
  name: "STARX LABS",
  legalName: "STARX LABS Ltd.",
  tagline: "High-Performance Digital Engineering & Cinematic Intelligence",
  description:
    "STARX LABS engineers premier custom software, enterprise platforms, and bespoke digital experiences for market leaders worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://starxlabs.io",
  ecosystem: {
    starxFlowUrl: process.env.NEXT_PUBLIC_STARX_FLOW_URL || "https://flow.starx.io",
    starxFlowLabel: "STARX FLOW — Business Automation & AI",
  },
  contact: {
    email: "contact@starxlabs.io",
    sales: "solutions@starxlabs.io",
    phone: "+1 (800) 555-STARX",
    address: "One World Trade Center, Floor 72, New York, NY 10007",
  },
};

export const BRAND_COLORS = {
  primaryNavy: "#102D50",
  corporateBlue: "#1769AA",
  electricBlue: "#32A9E8",
  white: "#FFFFFF",
  lightBackground: "#F4F8FC",
  darkText: "#172B43",
  mutedText: "#64748B",
  success: "#16866A",
  warning: "#D69B35",
  danger: "#DC5454",
  border: "#DDE7F0",
  // Cinematic dark surface tokens
  darkBackground: "#0A1424",
  darkSurface: "#0F2038",
  darkSurfaceBorder: "#19375E",
};

export const SPACING_TOKENS = {
  xs: "0.25rem",  // 4px
  sm: "0.5rem",   // 8px
  md: "1rem",     // 16px
  lg: "1.5rem",   // 24px
  xl: "2rem",     // 32px
  "2xl": "3rem",  // 48px
  "3xl": "4.5rem",// 72px
};

export const RADIUS_TOKENS = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
};
