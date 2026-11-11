export const SITE_CONFIG = {
  name: "StarX Alpha Labs",
  shortName: "StarX Alpha",
  legalName: "StarX Alpha Labs",
  tagline: "Build Smarter. Lead Tomorrow.",
  description:
    "StarX Alpha Labs is a technology and software engineering company building modern digital products, intelligent applications and custom technology solutions for businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://starx-alpha-labs.vercel.app",
  founder: {
    name: "Hari Singh",
    designation: "Founder & Tech Lead",
  },
  ecosystem: {
    starxFlowUrl: process.env.NEXT_PUBLIC_STARX_FLOW_URL || "https://starx-flow.runs-on.dev/",
    starxFlowLabel: "STARX FLOW — Business Automation & AI",
  },
  contact: {
    phone: "+91 9660937033",
    whatsapp: "+91 9660937033",
    whatsappUrl: "https://wa.me/919660937033",
    address: "Shop No. 6, Giriraj Villa, Near Tapti Parisar, Indore, Madhya Pradesh, India",
    // Public company email is NOT PROVIDED YET. Omitted completely per specification.
    email: null,
    sales: null,
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
