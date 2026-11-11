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
  | "community-feed";

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

export interface DemoProductDefinition {
  id: number;
  slug: string;
  name: string;
  categoryNumber: number;
  categoryName: string;
  categorySlug: string;
  archetype: DemoArchetype;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  suitableFor: string;
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
