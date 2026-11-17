export type StitchDeviceType = "DESKTOP" | "TABLET" | "MOBILE";

export interface BlueprintParams {
  projectName: string;
  divisionSlug: string;
  industrySlug: string;
  category?: string;
  deviceType: StitchDeviceType;
  brandPalette?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
  };
  features: string[];
  userRequirements: string;
  targetAudience?: string;
  stylePreset?: string;
}

export interface PromptBlueprint {
  version: number;
  systemDirective: string;
  prompt: string;
  suggestedTokens: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
}

const INDUSTRY_PALETTES: Record<string, { primary: string; accent: string; bg: string; text: string }> = {
  "retail-commerce": { primary: "#00D9FF", accent: "#E52BFF", bg: "#030B24", text: "#FFFFFF" },
  "food-hospitality": { primary: "#FF941F", accent: "#FF35B8", bg: "#0D0A14", text: "#FFFFFF" },
  "healthcare-life-sciences": { primary: "#00D9FF", accent: "#00C98B", bg: "#041026", text: "#FFFFFF" },
  "education-edtech": { primary: "#087BFF", accent: "#873BFF", bg: "#060E28", text: "#FFFFFF" },
  "real-estate-infrastructure": { primary: "#D4AF37", accent: "#00D9FF", bg: "#080B14", text: "#FFFFFF" },
  "automotive-mobility": { primary: "#FF334B", accent: "#00D9FF", bg: "#0A0B10", text: "#FFFFFF" },
  "logistics-supply-chain": { primary: "#FF941F", accent: "#087BFF", bg: "#08101E", text: "#FFFFFF" },
  "manufacturing-industrial": { primary: "#64748B", accent: "#00D9FF", bg: "#0A0F1D", text: "#FFFFFF" },
  "finance-professional-services": { primary: "#087BFF", accent: "#00C98B", bg: "#030A1C", text: "#FFFFFF" },
  "beauty-fitness-lifestyle": { primary: "#E52BFF", accent: "#FF941F", bg: "#0C0617", text: "#FFFFFF" },
  "travel-tourism-events": { primary: "#00D9FF", accent: "#FF941F", bg: "#041224", text: "#FFFFFF" },
  "technology-digital-enterprises": { primary: "#00D9FF", accent: "#087BFF", bg: "#030B24", text: "#FFFFFF" },
};

/**
 * Modular Versioned AI Blueprint Prompt Engine
 * Assembles a comprehensive, production-grade prompt for Google Stitch MCP generation.
 */
export function buildStitchPromptBlueprint(params: BlueprintParams): PromptBlueprint {
  const {
    projectName,
    divisionSlug,
    industrySlug,
    category = "Platform",
    deviceType = "DESKTOP",
    brandPalette,
    features = [],
    userRequirements,
    targetAudience = "Business professionals and modern consumers",
    stylePreset = "cosmic-dark",
  } = params;

  const defaultPalette = INDUSTRY_PALETTES[industrySlug] || INDUSTRY_PALETTES["technology-digital-enterprises"];
  const primaryColor = brandPalette?.primary || defaultPalette.primary;
  const accentColor = brandPalette?.accent || defaultPalette.accent;
  const backgroundColor = brandPalette?.background || defaultPalette.bg;

  const deviceDirective = deviceType === "MOBILE" 
    ? "MOBILE APP VIEWPORT (390px width x 844px height): Design a tactile, modern mobile interface with fixed bottom navigation bar, thumb-friendly tap targets (minimum 44x44px), biometric quick-action cards, pull-to-refresh indicators, and smooth card stacks."
    : deviceType === "TABLET"
    ? "TABLET VIEWPORT (768px width x 1024px height): Design a dual-pane responsive tablet layout with collapsible sidebar navigation, live stats tiles, and touch-optimized list/detail views."
    : "HIGH-RESOLUTION DESKTOP CANVAS (1440px width x 900px min-height): Design a cinematic, multi-section web platform featuring a sticky blur navigation header, hero KPI command bar, interactive tabular data cards, and polished status badges.";

  const promptSections = [
    `ACT AS A PRINCIPAL DESIGN ARCHITECT FOR STARX ALPHA LABS.`,
    `PROJECT NAME: "${projectName.toUpperCase()}"`,
    `INDUSTRY: ${industrySlug.replace(/-/g, " ").toUpperCase()}`,
    `PRODUCT DIVISION: ${divisionSlug.replace(/-/g, " ").toUpperCase()} (${category})`,
    `TARGET AUDIENCE: ${targetAudience}`,
    `DEVICE CHASSIS: ${deviceDirective}`,
    ``,
    `VISUAL IDENTITY & THEME:`,
    `- Theme Aesthetic: ${stylePreset} (Cinematic Dark Mode with neon accents)`,
    `- Primary Brand Color: ${primaryColor}`,
    `- Accent Interactive Color: ${accentColor}`,
    `- Background Surface: ${backgroundColor}`,
    `- Typography: Inter, SF Pro, or JetBrains Mono for metrics and numerical values.`,
    `- Depth: Subtle borders with rgba(255,255,255,0.08), 24px rounded cards, glassmorphic blur overlays (backdrop-filter: blur(16px)).`,
    ``,
    `REQUIRED CORE SECTIONS & MODULES:`,
    ...features.map((feat, idx) => `${idx + 1}. ${feat}: Dedicated interactive UI module with clear state indicators, filters, and actionable buttons.`),
    ``,
    `CLIENT REQUIREMENTS & DOMAIN SPECIFICATION:`,
    `"${userRequirements}"`,
    ``,
    `CRITICAL DESIGN STANDARDS:`,
    `- DO NOT use generic placeholder text like 'Lorem Ipsum'. Generate authentic, contextually rich sample data (e.g. realistic company metrics, timestamps, customer names, SKU codes, and currency values in INR ₹ or USD $).`,
    `- Include clear visual hierarchy with high-contrast text ratios conforming to WCAG 2.1 AA.`,
    `- Include interactive elements: Search inputs, filter pills, action triggers, toggle switches, and status pills (e.g., 'Synchronized', 'Live', 'Verified').`,
    `- Ensure pixel-perfect CSS with Tailwind or clean vanilla CSS variables.`,
  ];

  return {
    version: 2,
    systemDirective: "You are the Google Stitch MCP Design Engine generating high-fidelity UI screens for StarX Alpha Labs clients.",
    prompt: promptSections.join("\n"),
    suggestedTokens: {
      primaryColor,
      accentColor,
      backgroundColor,
      textColor: defaultPalette.text,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    },
  };
}
