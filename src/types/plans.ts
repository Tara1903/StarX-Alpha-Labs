import type {
  CanonicalDivisionSlug,
  PlanTierLevel,
  PricingModelType,
  CommercialPricingStatus,
  PricingComponent,
  PlanRestrictionLimits,
  PlanFeatureMapping,
} from './commercial';

export type PlanTier =
  | "basic"
  | "starter"
  | "plus"
  | "pro"
  | "elite"
  | "ultra"
  | "ultra_max"
  | "growth"
  | "professional"
  | "enterprise"
  | "custom";
export type PlanDivisionSlug = CanonicalDivisionSlug;

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
  category: "feature" | "compliance" | "speed" | "marketing" | "ai" | "integration" | "support";
}

export interface CanonicalPlan {
  id: string;
  divisionSlug: PlanDivisionSlug;
  solutionId?: string;
  planFamilyId?: string;
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
  isCustomQuote?: boolean;
  planType?: "subscription" | "bespoke_project";
  monthlySubscriptionPriceINR?: number;
  billingType: "fixed_project" | "managed_monthly" | "hybrid" | "custom";
  managedMonthlyINR?: number;
  managedMonthlyUSD?: number;
  pricingComponents?: PricingComponent[];
  version?: number;
  status?: CommercialPricingStatus;
  
  // Scoping
  timelineWeeks: string;
  screenOrPageScope: string;
  revisionsIncluded: number;
  codeOwnership: string;
  limits?: PlanRestrictionLimits;
  
  // Platforms & Capabilities
  supportedPlatforms: string[];
  recommendedFor: string[];
  includedFeatures: PlanFeature[];
  limitations: string[];
  availableAddons: PlanAddon[];
  featureMappings?: PlanFeatureMapping[];
  compatibleAddonIds?: string[];
  
  // Production Guarantees & SLA
  slaLevel: "Standard 48h" | "Priority 24h" | "Mission-Critical 2h" | "Dedicated Enterprise Pod" | string;
  postLaunchWarrantyDays: number;
  complianceTags: string[];
}

export * from './commercial';
