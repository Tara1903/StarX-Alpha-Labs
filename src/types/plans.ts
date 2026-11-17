export type PlanTier = "starter" | "growth" | "enterprise" | "custom";

export type PlanDivisionSlug = 
  | "starx-web" 
  | "starx-apps" 
  | "starx-business" 
  | "starx-saas" 
  | "starx-ai" 
  | "starx-custom";

export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  category: "core" | "ux" | "security" | "integration" | "ai" | "infra" | "support" | "compliance";
  highlighted?: boolean;
}

export interface PlanAddon {
  id: string;
  name: string;
  description: string;
  priceINR: number;
  priceUSD: number;
  billingPeriod?: "one_time" | "monthly" | "yearly";
  category: "feature" | "compliance" | "speed" | "marketing" | "ai" | "integration";
}

export interface CanonicalPlan {
  id: string;
  divisionSlug: PlanDivisionSlug;
  tier: PlanTier;
  code: string;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  popular?: boolean;
  bestValue?: boolean;
  
  // Pricing
  priceINR: number;
  priceUSD: number;
  isCustomPrice?: boolean;
  billingType: "fixed_project" | "managed_monthly" | "hybrid" | "custom";
  managedMonthlyINR?: number;
  managedMonthlyUSD?: number;
  
  // Scoping
  timelineWeeks: string;
  screenOrPageScope: string;
  revisionsIncluded: number;
  codeOwnership: "100% Full Intellectual Property & Code Transfer" | "Enterprise License";
  
  // Platforms & Capabilities
  supportedPlatforms: string[];
  recommendedFor: string[];
  includedFeatures: PlanFeature[];
  limitations: string[];
  availableAddons: PlanAddon[];
  
  // Production Guarantees & SLA
  slaLevel: "Standard 48h" | "Priority 24h" | "Mission-Critical 2h" | "Dedicated Enterprise Pod";
  postLaunchWarrantyDays: number;
  complianceTags: string[];
}
