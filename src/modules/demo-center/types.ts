export type DemoArchetype =
  | "pos-terminal"
  | "ordering-kiosk"
  | "ecommerce-storefront"
  | "booking-calendar"
  | "clinic-operations"
  | "diagnostic-lab"
  | "property-discovery"
  | "fleet-dispatch"
  | "warehouse-wms"
  | "kanban-workflow"
  | "crm-pipeline"
  | "lms-learning"
  | "manufacturing-console"
  | "quality-inspection"
  | "developer-portal"
  | "node-automation"
  | "analytics-canvas"
  | "community-feed"
  | "brand-storytelling"
  | "product-configurator"
  | "mobile-app-showcase"
  | "subscription-hub"
  | "creator-showcase"
  | "interactive-3d-experience"
  | "ecosystem-suite";

export interface DemoBrandConfig {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  surface: string;
  surfaceHover?: string;
  border: string;
  text: string;
  mutedText: string;
  fontHeadline: "serif" | "sans" | "mono" | "condensed";
  accentGlow?: string;
}

export interface DemoWorkflowSpec {
  id: string;
  title: string;
  description: string;
}

export type DemoProductType =
  | "business_website"
  | "corporate_website"
  | "brand_experience"
  | "ecommerce_website"
  | "web_application"
  | "marketplace"
  | "native_android_app"
  | "native_ios_app"
  | "pwa"
  | "subscription_platform"
  | "membership_platform"
  | "creator_platform"
  | "interactive_experience"
  | "digital_ecosystem"
  | "fintech_application"
  | "business_management_software";

export interface DemoProductDefinition {
  id: number;
  slug: string;
  name: string;
  categoryNumber: number;
  categoryName: string;
  categorySlug: string;
  archetype: DemoArchetype;
  productType?: string;
  standardProductType?: DemoProductType;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  suitableFor: string;
  searchKeywords?: string[];
  thumbnail?: string;
  seoTitle?: string;
  seoDescription?: string;
  generationStatus?: "draft" | "queued" | "designing" | "implementing" | "testing" | "qa_failed" | "ready_for_review" | "changes_requested" | "approved" | "published" | "archived";
  qaStatus?: "not_run" | "running" | "passed" | "failed" | "warnings";
  publishingStatus?: "unpublished" | "published" | "archived" | "rolled_back";
  previewRoute?: string;
  publicRoute?: string;
  brand: DemoBrandConfig;
  workflows: DemoWorkflowSpec[];
  features: string[];
  techStack: string[];
  indicativePrice: string;
  indicativePriceUsd: string;
  estimatedTime: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  initialData: Record<string, any>;
}

export interface DemoCategoryDefinition {
  number: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  iconName: string;
  gradient: string;
  count: number;
  highlights: string[];
}
