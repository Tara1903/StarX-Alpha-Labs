/**
 * Google Stitch Integration & Design Studio Types
 * StarX Alpha Labs — Design Studio Ecosystem
 */

export type StitchDeviceType = "DESKTOP" | "MOBILE" | "TABLET";

export type StitchModelId = "GEMINI_3_8_FLASH" | "GEMINI_3_5_FLASH_LITE" | "DEFAULT";

export interface StitchNamedColors {
  primary?: string;
  on_primary?: string;
  primary_container?: string;
  on_primary_container?: string;
  inverse_primary?: string;
  secondary?: string;
  on_secondary?: string;
  secondary_container?: string;
  on_secondary_container?: string;
  tertiary?: string;
  on_tertiary?: string;
  tertiary_container?: string;
  on_tertiary_container?: string;
  surface?: string;
  on_surface?: string;
  surface_variant?: string;
  on_surface_variant?: string;
  surface_dim?: string;
  surface_bright?: string;
  surface_container_lowest?: string;
  surface_container_low?: string;
  surface_container?: string;
  surface_container_high?: string;
  surface_container_highest?: string;
  inverse_surface?: string;
  inverse_on_surface?: string;
  background?: string;
  on_background?: string;
  outline?: string;
  outline_variant?: string;
  surface_tint?: string;
  error?: string;
  on_error?: string;
  error_container?: string;
  on_error_container?: string;
  [key: string]: string | undefined;
}

export interface StitchTypographyItem {
  fontFamily: string;
  fontSize: string;
  fontWeight: string | number;
  lineHeight: string;
  letterSpacing?: string;
}

export type StitchTypographyScale = Record<string, StitchTypographyItem>;

export interface StitchSpacingScale {
  margin?: string;
  margin_desktop?: string;
  margin_tablet?: string;
  margin_mobile?: string;
  gutter?: string;
  gutter_desktop?: string;
  gutter_tablet?: string;
  gutter_mobile?: string;
  space_2xs?: string;
  space_xs?: string;
  space_sm?: string;
  space_md?: string;
  space_base?: string;
  space_lg?: string;
  space_xl?: string;
  space_2xl?: string;
  [key: string]: string | undefined;
}

export interface StitchDesignTheme {
  colorMode?: "DARK" | "LIGHT";
  font?: string;
  headlineFont?: string;
  bodyFont?: string;
  labelFont?: string;
  headlineFontFamily?: string;
  bodyFontFamily?: string;
  labelFontFamily?: string;
  roundness?: string;
  customColor?: string;
  overridePrimaryColor?: string;
  overrideSecondaryColor?: string;
  overrideTertiaryColor?: string;
  overrideNeutralColor?: string;
  colorVariant?: string;
  spacingScale?: number;
  namedColors?: StitchNamedColors;
  typography?: StitchTypographyScale;
  spacing?: StitchSpacingScale;
}

export interface StitchThumbnailScreenshot {
  name: string;
  downloadUrl: string;
}

export interface StitchProjectMetadata {
  userRole?: string;
  origin?: string;
  [key: string]: any;
}

export interface StitchProject {
  name: string; // e.g. "projects/16910281969740318767"
  title: string;
  visibility?: "PRIVATE" | "PUBLIC";
  createTime?: string;
  updateTime?: string;
  projectType?: string;
  origin?: string;
  deviceType?: StitchDeviceType;
  thumbnailScreenshot?: StitchThumbnailScreenshot;
  designTheme?: StitchDesignTheme;
  designMd?: string;
  metadata?: StitchProjectMetadata;
  sharingSettings?: {
    permissions?: Array<{ id: string; role: string; email?: string }>;
    accessType?: string;
  };
}

export interface StitchScreen {
  name: string;
  title?: string;
  description?: string;
  deviceType?: StitchDeviceType;
  screenshot?: {
    name: string;
    downloadUrl?: string;
  };
  htmlCode?: {
    name: string;
    downloadUrl?: string;
  };
  createTime?: string;
  updateTime?: string;
}

// -------------------------------------------------------------
// Design Studio Application & Database Entity Types
// -------------------------------------------------------------

export type JobStatus = "queued" | "processing" | "completed" | "failed" | "cancelled";

export type ProjectLifecycleStatus =
  | "draft"
  | "generating"
  | "generated"
  | "revision_requested"
  | "approved"
  | "quoted";

export interface DesignStudioBrief {
  industrySlug: string;
  industryName: string;
  divisionSlug: string;
  divisionName: string;
  projectName: string;
  description: string;
  platformTargets: string[];
  selectedFeatures: string[];
  themePreference: "cosmic-dark" | "executive-light" | "high-contrast-neon";
  deviceTarget: StitchDeviceType;
  modelPreference?: StitchModelId;
  specialInstructions?: string;
}

export interface DesignStudioProject {
  id: string;
  projectCode: string;
  organizationId?: string;
  customerId?: string;
  sessionId?: string;
  title: string;
  industrySlug: string;
  divisionSlug: string;
  status: ProjectLifecycleStatus;
  targetPlatforms: string[];
  featureRequirements: string[];
  themePreference: string;
  rawDescription?: string;
  structuredBrief: DesignStudioBrief;
  activeArtifactId?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  quoteRequestId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DesignGenerationJob {
  id: string;
  jobCode: string;
  projectId: string;
  organizationId?: string;
  provider: "stitch";
  modelId: StitchModelId;
  deviceType: StitchDeviceType;
  status: JobStatus;
  stage: string;
  progressPercent: number;
  prompt: string;
  inputParameters: Record<string, any>;
  providerProjectId?: string;
  providerScreenId?: string;
  errorMessage?: string;
  executionLogs: Array<{ timestamp: string; message: string; stage?: string }>;
  retryCount?: number;
  maxRetries?: number;
  lockedBy?: string;
  lockedAt?: string;
  heartbeatAt?: string;
  idempotencyKey?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DesignArtifact {
  id: string;
  projectId: string;
  organizationId?: string;
  jobId?: string;
  versionNumber: number;
  provider: "stitch";
  providerProjectId: string;
  providerScreenId?: string;
  title: string;
  styleName: string;
  deviceType: StitchDeviceType;
  designTheme: StitchDesignTheme;
  designMd: string;
  thumbnailUrl: string;
  downloadUrl?: string;
  storagePathHtml?: string;
  storagePathScreenshot?: string;
  htmlCode?: string;
  palette: string[];
  keyFeatures: string[];
  isApproved: boolean;
  createdAt: string;
}

export interface DesignRevision {
  id: string;
  projectId: string;
  artifactId: string;
  revisionNumber: number;
  notes: string;
  status: "pending" | "processing" | "applied" | "rejected";
  appliedJobId?: string;
  createdAt: string;
}
