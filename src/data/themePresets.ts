export interface ThemeColors {
  primaryBackground: string;
  secondaryBackground: string;
  cardBackground: string;
  primaryBlue: string;
  royalBlue: string;
  neonCyan: string;
  electricPurple: string;
  neonMagenta: string;
  premiumPink: string;
  electricOrange: string;
  emeraldAccent: string;
  whiteText: string;
  secondaryText: string;
  borderColor: string;
  glowColor: string;
}

export interface ThemeStyles {
  cardRadius: "sm" | "md" | "lg" | "xl" | "2xl";
  glowIntensity: "subtle" | "medium" | "vibrant" | "off";
  borderStyle: "subtle" | "glow" | "minimal";
  fontFamily: "Inter" | "System" | "Mono";
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  styles: ThemeStyles;
}

export const STARX_DEFAULT_THEME: ThemeColors = {
  primaryBackground: "#030B24",
  secondaryBackground: "#071638",
  cardBackground: "#0A1940",
  primaryBlue: "#087BFF",
  royalBlue: "#245BFF",
  neonCyan: "#00D9FF",
  electricPurple: "#873BFF",
  neonMagenta: "#E52BFF",
  premiumPink: "#FF35B8",
  electricOrange: "#FF941F",
  emeraldAccent: "#00C98B",
  whiteText: "#FFFFFF",
  secondaryText: "#C8D5EF",
  borderColor: "rgba(0, 217, 255, 0.22)",
  glowColor: "rgba(8, 123, 255, 0.35)",
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "starx-futuristic-blue",
    name: "STARX FUTURISTIC BLUE (Default)",
    description: "Official master identity with Deep Midnight Navy, Electric Blue & Neon Cyan precision.",
    colors: STARX_DEFAULT_THEME,
    styles: { cardRadius: "xl", glowIntensity: "medium", borderStyle: "glow", fontFamily: "Inter" },
  },
  {
    id: "midnight-neon",
    name: "Midnight Neon",
    description: "Deep obsidian backdrop with intense cyan and neon purple particle accents.",
    colors: {
      ...STARX_DEFAULT_THEME,
      primaryBackground: "#010414",
      secondaryBackground: "#040B21",
      cardBackground: "#06122F",
      neonCyan: "#00F0FF",
      electricPurple: "#A855F7",
      glowColor: "rgba(0, 240, 255, 0.4)",
    },
    styles: { cardRadius: "xl", glowIntensity: "vibrant", borderStyle: "glow", fontFamily: "Inter" },
  },
  {
    id: "electric-blue",
    name: "Electric Blue",
    description: "Ultra-high contrast electric sapphire glow tailored for enterprise software platforms.",
    colors: {
      ...STARX_DEFAULT_THEME,
      primaryBlue: "#0066FF",
      royalBlue: "#1D4ED8",
      neonCyan: "#38BDF8",
      glowColor: "rgba(0, 102, 255, 0.45)",
    },
    styles: { cardRadius: "xl", glowIntensity: "vibrant", borderStyle: "glow", fontFamily: "Inter" },
  },
  {
    id: "purple-galaxy",
    name: "Purple Galaxy",
    description: "Deep cosmos violet and galactic magenta highlights for next-gen AI tech products.",
    colors: {
      ...STARX_DEFAULT_THEME,
      primaryBlue: "#7C3AED",
      royalBlue: "#6D28D9",
      neonCyan: "#C084FC",
      electricPurple: "#9333EA",
      neonMagenta: "#F43F5E",
      borderColor: "rgba(168, 85, 247, 0.28)",
      glowColor: "rgba(147, 51, 234, 0.4)",
    },
    styles: { cardRadius: "2xl", glowIntensity: "medium", borderStyle: "glow", fontFamily: "Inter" },
  },
  {
    id: "cyber-magenta",
    name: "Cyber Magenta",
    description: "Vibrant cyberpunk neon magenta and hot pink aura for cutting-edge digital experiences.",
    colors: {
      ...STARX_DEFAULT_THEME,
      primaryBlue: "#EC4899",
      neonCyan: "#F472B6",
      neonMagenta: "#FF1493",
      premiumPink: "#FF69B4",
      glowColor: "rgba(236, 72, 153, 0.4)",
    },
    styles: { cardRadius: "lg", glowIntensity: "vibrant", borderStyle: "glow", fontFamily: "Inter" },
  },
  {
    id: "ocean-cyan",
    name: "Ocean Cyan",
    description: "Clean bioluminescent cyan and aquamarine gradients inspired by deep-sea optics.",
    colors: {
      ...STARX_DEFAULT_THEME,
      primaryBlue: "#0284C7",
      royalBlue: "#0369A1",
      neonCyan: "#06B6D4",
      glowColor: "rgba(6, 182, 212, 0.4)",
    },
    styles: { cardRadius: "xl", glowIntensity: "medium", borderStyle: "glow", fontFamily: "Inter" },
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    description: "Warm solar orange and radiant amber energy balanced with deep slate navy.",
    colors: {
      ...STARX_DEFAULT_THEME,
      primaryBlue: "#F97316",
      royalBlue: "#EA580C",
      neonCyan: "#FDBA74",
      electricOrange: "#FF7700",
      glowColor: "rgba(249, 115, 22, 0.4)",
    },
    styles: { cardRadius: "xl", glowIntensity: "medium", borderStyle: "subtle", fontFamily: "Inter" },
  },
  {
    id: "emerald-tech",
    name: "Emerald Tech",
    description: "Terminal emerald green and mint circuits representing high-throughput systems.",
    colors: {
      ...STARX_DEFAULT_THEME,
      primaryBlue: "#10B981",
      royalBlue: "#059669",
      neonCyan: "#34D399",
      emeraldAccent: "#00E699",
      glowColor: "rgba(16, 185, 129, 0.4)",
    },
    styles: { cardRadius: "xl", glowIntensity: "medium", borderStyle: "glow", fontFamily: "Inter" },
  },
  {
    id: "premium-black-gold",
    name: "Premium Black & Gold",
    description: "Luxury matte noir background with champaign gold and radiant bronze luster.",
    colors: {
      ...STARX_DEFAULT_THEME,
      primaryBackground: "#08080A",
      secondaryBackground: "#111115",
      cardBackground: "#181820",
      primaryBlue: "#D97706",
      royalBlue: "#B45309",
      neonCyan: "#FBBF24",
      electricOrange: "#F59E0B",
      borderColor: "rgba(245, 158, 11, 0.3)",
      glowColor: "rgba(217, 119, 6, 0.35)",
    },
    styles: { cardRadius: "lg", glowIntensity: "subtle", borderStyle: "glow", fontFamily: "Inter" },
  },
  {
    id: "aurora-gradient",
    name: "Aurora Gradient",
    description: "Spectacular northern lights spectrum blending cyan, emerald and electric violet.",
    colors: {
      ...STARX_DEFAULT_THEME,
      primaryBlue: "#6366F1",
      neonCyan: "#2DD4BF",
      electricPurple: "#A855F7",
      glowColor: "rgba(45, 212, 191, 0.35)",
    },
    styles: { cardRadius: "2xl", glowIntensity: "vibrant", borderStyle: "glow", fontFamily: "Inter" },
  },
  {
    id: "custom",
    name: "Custom Theme",
    description: "Bespoke user-configured palette with individual color channel overrides.",
    colors: STARX_DEFAULT_THEME,
    styles: { cardRadius: "xl", glowIntensity: "medium", borderStyle: "glow", fontFamily: "Inter" },
  },
];
