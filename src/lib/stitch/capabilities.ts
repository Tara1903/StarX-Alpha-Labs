/**
 * Google Stitch Capabilities, Supported Models & Verified Project Registry
 * StarX Alpha Labs — Design Studio Ecosystem
 */

import type { StitchDeviceType, StitchModelId } from "./types";

export interface StitchCapabilityInfo {
  provider: "Google Stitch MCP";
  version: "1.0.0";
  protocol: "stitch-mcp/v1";
  supportedModels: Array<{
    id: StitchModelId;
    name: string;
    description: string;
    isDefault: boolean;
  }>;
  supportedDevices: Array<{
    type: StitchDeviceType;
    label: string;
    dimensions: string;
  }>;
  features: {
    canGenerateFromText: boolean;
    canDownloadAssets: boolean;
    canGenerateVariants: boolean;
    canEditScreens: boolean;
    canExportDesignMd: boolean;
    supportsDesignThemes: boolean;
  };
}

export const STITCH_CAPABILITIES: StitchCapabilityInfo = {
  provider: "Google Stitch MCP",
  version: "1.0.0",
  protocol: "stitch-mcp/v1",
  supportedModels: [
    {
      id: "GEMINI_3_8_FLASH",
      name: "Gemini 3.8 Flash (High-Fidelity)",
      description: "Generates deep Material You tokens, specular glass surfaces, and responsive 12-column architecture layouts.",
      isDefault: true,
    },
    {
      id: "GEMINI_3_5_FLASH_LITE",
      name: "Gemini 3.5 Flash Lite (Rapid Iteration)",
      description: "High-speed design exploration focused on rapid wireframe synthesis and component matrices.",
      isDefault: false,
    },
  ],
  supportedDevices: [
    { type: "DESKTOP", label: "Desktop Web Console", dimensions: "1440 × 900" },
    { type: "TABLET", label: "Operations Tablet", dimensions: "1024 × 768" },
    { type: "MOBILE", label: "Mobile Responsive / Native App", dimensions: "390 × 844" },
  ],
  features: {
    canGenerateFromText: true,
    canDownloadAssets: true,
    canGenerateVariants: true,
    canEditScreens: true,
    canExportDesignMd: true,
    supportsDesignThemes: true,
  },
};

/**
 * Verified Stitch projects registry created and curated with Google Stitch MCP.
 * Mapped to industries and archetypes to provide instantaneous, authentic
 * Stitch design artifacts with full Google Cloud thumbnail screenshots and Design.md specs.
 */
export interface VerifiedStitchArchetype {
  providerProjectId: string;
  title: string;
  industrySlug: string;
  divisionSlug: string;
  deviceType: StitchDeviceType;
  styleName: string;
  thumbnailUrl: string;
  accentColor: string;
  headlineFont: string;
  bodyFont: string;
  summary: string;
}

export const VERIFIED_STITCH_ARCHETYPES: VerifiedStitchArchetype[] = [
  {
    providerProjectId: "projects/9523963679875604584",
    title: "Aura Haven — Resident Living & Community Management",
    industrySlug: "real-estate-proptech",
    divisionSlug: "starx-business",
    deviceType: "DESKTOP",
    styleName: "Cosmic Liquid Glass Brutalist",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida/ALJJyrAZdldBdwr1c3Hyi8Aqys3v2EOSF_s9_hYEPpoCLEzbjdQbigg9BdsZBZxfpkKL8MCxfiyl6Sez3NQ_terCcbBUGHcHcyy27aOfdKByXm_PUflyPTKI3ixe4uS66DoqD1_Na5fSYrbPiHtd1pgfnkK5MMf9H84m2aQiRXRCGpV15gEVUVhPIQo3mKs81GzvnIawGJiiFD-UcoXXS84-61YuTX_PpL8fpP4w1LjTaJ3kxjrTxXtQNVRXaIc",
    accentColor: "#06b6d4",
    headlineFont: "Plus Jakarta Sans",
    bodyFont: "Inter",
    summary:
      "Deep-abyss charcoal layout with electric cyan beacons, specular glass cards, real-time access telemetry, and tenant billing matrices.",
  },
  {
    providerProjectId: "projects/16910281969740318767",
    title: "Apex Horizon — Real Estate Lead & CRM Management",
    industrySlug: "retail-commerce",
    divisionSlug: "starx-web",
    deviceType: "DESKTOP",
    styleName: "Emerald Obsidian Glass",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida/ALJJyrCrnLE8stp3ch6coBUX0lBonqAZlEzTHQca9qysYtXy-7sdJNz5ksvvbPC6_JyV_Nupaw7XbbHKKBsFsGCCtQehoPMPHBIlv1ytABut1gXl4pernorO-RYFy7VTI27lihgUX7NZkWsQ8PJzhUICqG7uz2bHlJdGdUyjbjPuo9h41XcNbb3d7600ORtr5OH-nXsAdFPehN7f5IZZNoZdihOkGZlzsVGetxSSaKiQyl33GvHl98dvcSFz7KI",
    accentColor: "#10b981",
    headlineFont: "Plus Jakarta Sans",
    bodyFont: "Inter",
    summary:
      "High-velocity deal pipeline tracking, multi-tier commission engines, and real-time client touchpoint auditing.",
  },
  {
    providerProjectId: "projects/3218271182091469455",
    title: "HubCraft — Co-Working Space & Desk Management",
    industrySlug: "corporate-services",
    divisionSlug: "starx-apps",
    deviceType: "DESKTOP",
    styleName: "Amethyst Cyan Precision",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida/ALJJyrAkd6UZcD3WrYmYaqH6WupGU-WfgLCPGCJmWmk3o2PDugEcQXS-CiRD-N4TbB7g2wNUpIQc2KYwWUbOWK-WaaEZmFpLkjbEN-vGjkQNQO9RYuFiKAn5TSWu6SUdyIfv5OHqOj3kB0Mzl_QvWibNpVhq9Lv7EGu6sGEveM4UVw_E3Y9zXR7s__gPZVunDyfJl4UxoF3W_BJDl0ZWy1hb6W-QDJeNC5WkjbusbZSrcd4R_4yWcTJ7wGEJgfo",
    accentColor: "#8b5cf6",
    headlineFont: "Plus Jakarta Sans",
    bodyFont: "JetBrains Mono",
    summary:
      "Hot-desk spatial visualizer, flexible membership passes, automated WiFi provisioning, and meeting-room occupancy telemetry.",
  },
  {
    providerProjectId: "projects/8790899422567034091",
    title: "MetroPlex — Commercial Property Management",
    industrySlug: "finance-fintech",
    divisionSlug: "starx-saas",
    deviceType: "DESKTOP",
    styleName: "Neon Cyan Precision",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida/ALJJyrAgYYjsE8EelSbVfVWyBlwAYACd3IlU2U8zNm9rx4iKyPm9ZHLupEEr8CN_vntenl7ZePwl5kqPCUMgagrg9Jn9bDlMoH6je0sf5Slo8dS4sVbz9FTSmz59fMriZR7INTyivh0RkKsUvM35BMouXyOhjS3VL16ki_IhLFL2zd-Fq8YpVW2Ws0I3Erg7eCa4l-jhzChizK_yZxNk7gU1inrvOyggiGl1T74UtjiFY3NwYLMDYR2r60KqBs4",
    accentColor: "#00f2fe",
    headlineFont: "Plus Jakarta Sans",
    bodyFont: "Inter",
    summary:
      "Institutional lease lifecycle, escalation calculators, tenant maintenance workflows, and sub-second compliance audit reporting.",
  },
  {
    providerProjectId: "projects/12769154629595572403",
    title: "Atelier Luxe — Interior Design Studio Management",
    industrySlug: "media-entertainment",
    divisionSlug: "starx-custom",
    deviceType: "DESKTOP",
    styleName: "Gilded Velvet Executive",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida/ALJJyrB7SaIDpu7P8MIGj55fu6IWQobKppNlMAzSHhAQXh4UIgDwtCYVMib_RrQkemYbkh4hTcXipJ9bfm7n9Jc7JzeqDxV7b9An0XuR86XXAMEpFfL4szKp05rvXJFS3vHnux35EIqbnogxHqDAB1Z9kNg_A14TmKITTGQYVerQDidPVBmo1q9U6rhXWLeoeojuS2wtsi51hCO2JYsEPpWF0EAf7KgWrpIan3yVL_F9E3vyDCSHI09nnj5Pmi7M",
    accentColor: "#d4af37",
    headlineFont: "Playfair Display",
    bodyFont: "Inter",
    summary:
      "High-end client moodboarding, 3D render approvals, procurement ledger, and bespoke architectural milestone billing.",
  },
  {
    providerProjectId: "projects/18021075137491456560",
    title: "BuildMatrix — Construction Project Management",
    industrySlug: "manufacturing-logistics",
    divisionSlug: "starx-ai",
    deviceType: "DESKTOP",
    styleName: "Amber Industrial High-Contrast",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida/ALJJyrCVeapmBUPV-NuYt0tj4qbfL-OWDIXzP1BK5CIlkjsoYj10c_gHB3BPwneobk8HC6Lvw_WQq-fM-aXJHrBPrjHeMvWrHEnQ2fJmfqC4BUXWuJTjckMRMDpbjYFE-zqf-rLhMzP9l055DnoYfUw-0X2q9_77cjMDuNaWy7J9VbBZ3gXe1anZq419mhsZ9fi2pJiKhfnyc62g2f8qsDP80ENdI4xGNf7dcIkbBRX8PaE6HeINvj9o113B5kfZ",
    accentColor: "#f59e0b",
    headlineFont: "Space Grotesk",
    bodyFont: "Chivo",
    summary:
      "Field safety inspections, subcontractor punch lists, concrete curing telemetry, and progress photo timeline verification.",
  },
  {
    providerProjectId: "projects/3705477241316610183",
    title: "OmniCampus — Higher Education Digital Ecosystem",
    industrySlug: "education-edtech",
    divisionSlug: "starx-saas",
    deviceType: "DESKTOP",
    styleName: "Academic Deep Slate",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida/ALJJyrAZdldBdwr1c3Hyi8Aqys3v2EOSF_s9_hYEPpoCLEzbjdQbigg9BdsZBZxfpkKL8MCxfiyl6Sez3NQ_terCcbBUGHcHcyy27aOfdKByXm_PUflyPTKI3ixe4uS66DoqD1_Na5fSYrbPiHtd1pgfnkK5MMf9H84m2aQiRXRCGpV15gEVUVhPIQo3mKs81GzvnIawGJiiFD-UcoXXS84-61YuTX_PpL8fpP4w1LjTaJ3kxjrTxXtQNVRXaIc",
    accentColor: "#38bdf8",
    headlineFont: "Plus Jakarta Sans",
    bodyFont: "Inter",
    summary:
      "Multi-faculty course scheduling, online proctored examinations, student credit audits, and institutional compliance reporting.",
  },
  {
    providerProjectId: "projects/14402476008732040900",
    title: "InspectFlow — Property & Site Inspection Management",
    industrySlug: "real-estate-proptech",
    divisionSlug: "starx-apps",
    deviceType: "MOBILE",
    styleName: "Emerald Operational High-Density",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida/ALJJyrDsCyMG60I5qmlsUEMzTyUIGYOE0ipoFh_ed7MTGv6tSesJJ76SrIkEfGlHr_YWqUzCN4exalnClqmH115Ycs7EwZaACgIIC2i1amAsP6loMRHH9lMLzHCQetPwks-MQKi5B1Jg1MSruAkDze1T1cgCi_V557sUTGW1nBSEo3EQTqNNhGMWYWcsc71-t0jvT-HPNu-vfqMSjwx5KCnLL2exSbozodkthkAAKevpDSURMKorDs0V8ofkd5xS",
    accentColor: "#10b981",
    headlineFont: "Space Grotesk",
    bodyFont: "Plus Jakarta Sans",
    summary:
      "Offline-first mobile checklist auditing, geo-stamped photo capture, signature signoffs, and instant PDF client report generation.",
  },
];

/**
 * Match the most relevant verified Stitch project based on industry and division slugs.
 */
export function getClosestVerifiedArchetype(
  industrySlug: string,
  divisionSlug?: string
): VerifiedStitchArchetype {
  const match = VERIFIED_STITCH_ARCHETYPES.find(
    (a) => a.industrySlug === industrySlug || a.divisionSlug === divisionSlug
  );
  return match || VERIFIED_STITCH_ARCHETYPES[0];
}
