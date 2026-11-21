/**
 * STARX ALPHA LABS — MASTER COMMERCIAL CATALOGUE & PRICING ENGINE TYPES
 * Authoritative Type Contracts for Divisions, Solutions, Plans, Features, Pricing & Add-ons
 */

export type CanonicalDivisionSlug =
  | 'starx-web'
  | 'starx-apps'
  | 'starx-business'
  | 'starx-saas'
  | 'starx-ai'
  | 'starx-custom';

export type CanonicalIndustrySlug =
  | 'retail-commerce'
  | 'healthcare-life-sciences'
  | 'real-estate-property'
  | 'education-edtech'
  | 'financial-services'
  | 'hospitality-travel'
  | 'logistics-supply-chain'
  | 'media-entertainment'
  | 'professional-services'
  | 'manufacturing-industrial'
  | 'fitness-wellness'
  | 'public-sector-gov';

export type CommercialPricingStatus =
  | 'DRAFT'
  | 'INTERNAL_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type PricingModelType =
  | 'ONE_TIME'
  | 'MONTHLY'
  | 'QUARTERLY'
  | 'ANNUAL'
  | 'PER_USER'
  | 'PER_BRANCH'
  | 'PER_USAGE'
  | 'MILESTONE_BASED'
  | 'TIME_AND_MATERIALS'
  | 'CUSTOM_QUOTE';

export type FeatureClassification =
  | 'INCLUDED'
  | 'OPTIONAL_ADDON'
  | 'HIGHER_TIER_ONLY'
  | 'CUSTOM_ENGINEERING'
  | 'UNSUPPORTED';

export type FeatureGroupCategory =
  | 'CORE_ARCHITECTURE'
  | 'AUTHENTICATION_IDENTITY'
  | 'USER_MANAGEMENT_RBAC'
  | 'DASHBOARD_UX'
  | 'COMMERCE_STOREFRONT'
  | 'PAYMENTS_BILLING'
  | 'ANALYTICS_REPORTING'
  | 'AUTOMATION_WORKFLOWS'
  | 'AI_INTELLIGENCE'
  | 'INTEGRATIONS_APIS'
  | 'SECURITY_COMPLIANCE'
  | 'REPORTING_BI'
  | 'INFRASTRUCTURE_CLOUD'
  | 'STORAGE_MEDIA'
  | 'COMMUNICATIONS_MESSAGING'
  | 'ENTERPRISE_GOVERNANCE';

export type PlanTierLevel =
  | 'basic'
  | 'starter'
  | 'plus'
  | 'pro'
  | 'elite'
  | 'ultra'
  | 'ultra_max'
  | 'growth'
  | 'professional'
  | 'enterprise'
  | 'custom';

export interface ServiceCategory {
  id: string;
  divisionSlug: CanonicalDivisionSlug;
  slug: string;
  name: string;
  description: string;
  iconName?: string;
  displayOrder: number;
}

export interface SolutionArchetype {
  id: string;
  divisionSlug: CanonicalDivisionSlug;
  serviceCategoryId: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  applicableIndustries: CanonicalIndustrySlug[];
  supportedPlatforms: string[];
  defaultPlanFamilyId: string;
  isPopular?: boolean;
  displayOrder: number;
}

export interface PlanFamily {
  id: string;
  divisionSlug: CanonicalDivisionSlug;
  solutionId: string;
  code: string;
  name: string;
  description: string;
  tierIds: string[];
}

export interface PricingComponent {
  id: string;
  name: string;
  type: PricingModelType;
  amountINR: number;
  amountUSD: number;
  unitLabel?: string; // e.g. "per month", "per seat", "per 10k tokens"
  isOptional?: boolean;
  description?: string;
}

export interface PlanRestrictionLimits {
  pagesOrScreens: string;
  userRolesAllowed: number;
  maxUsersAllowed?: number;
  includedRevisions: number;
  includedPlatforms: string[];
  timelineWeeks: string;
  slaResponseTime: string;
  warrantyPeriodDays: number;
  monthlyMaintenanceHoursIncluded?: number;
  apiCallQuotaPerMonth?: string;
  aiTokensIncludedPerMonth?: string;
  dedicatedSquadSize?: string;
}

export interface PlanFeatureMapping {
  featureId: string;
  classification: FeatureClassification;
  customLimitation?: string;
  requiredAddonId?: string;
}

export interface CanonicalPlanRecord {
  id: string;
  divisionSlug: CanonicalDivisionSlug;
  solutionId: string;
  planFamilyId: string;
  tier: PlanTierLevel;
  code: string;
  name: string;
  tagline: string;
  description: string;
  version: number;
  status: CommercialPricingStatus;
  
  // Pricing
  priceINR: number;
  priceUSD: number;
  isCustomQuote: boolean;
  planType?: 'subscription' | 'bespoke_project';
  monthlySubscriptionPriceINR?: number;
  pricingComponents: PricingComponent[];
  
  // Scoping & Boundaries
  limits: PlanRestrictionLimits;
  codeOwnership: '100% Intellectual Property & Transfer' | 'Enterprise License' | string;
  
  // Feature Mappings
  featureMappings: PlanFeatureMapping[];
  compatibleAddonIds: string[];
  
  // Recommendation Attributes
  minComplexityScore: number; // 1-10
  maxComplexityScore: number; // 1-10
  idealForAudience: string[];
  
  badge?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  updatedAt: string;
}

export interface CanonicalFeatureRecord {
  id: string;
  group: FeatureGroupCategory;
  name: string;
  slug: string;
  customerExplanation: string;
  technicalDescription: string;
  applicableDivisions: CanonicalDivisionSlug[];
  applicableSolutions?: string[]; // solution IDs or empty for all
  dependencies?: string[]; // feature IDs
  defaultPriority: 'must_have' | 'important' | 'nice_to_have';
  isEnterpriseOnly?: boolean;
}

export interface CanonicalAddonRecord {
  id: string;
  divisionSlug: CanonicalDivisionSlug;
  applicableSolutions: string[];
  compatiblePlanTiers: PlanTierLevel[];
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceINR: number;
  priceUSD: number;
  billingModel: PricingModelType;
  category: 'feature' | 'speed' | 'compliance' | 'ai' | 'integration' | 'support' | 'marketing';
  status: CommercialPricingStatus;
}

export interface RecommendationRuleRecord {
  id: string;
  divisionSlug: CanonicalDivisionSlug;
  solutionId?: string;
  industrySlug?: string;
  minComplexity: number;
  maxComplexity: number;
  recommendedPlanId: string;
  justificationTemplate: string;
  alternativePlanIds: string[];
  priority: number;
  isActive: boolean;
}

export interface CommercialAuditLogRecord {
  id: string;
  entityType: 'plan' | 'feature' | 'pricing' | 'addon' | 'solution';
  entityId: string;
  action: 'CREATE' | 'UPDATE_PRICE' | 'STATUS_CHANGE' | 'PUBLISH' | 'ARCHIVE';
  previousValue?: any;
  newValue: any;
  performedByAdminEmail: string;
  approvalReference?: string;
  timestamp: string;
}

export interface InvestmentSummaryCalculation {
  planId: string;
  planName: string;
  planTier: PlanTierLevel;
  currency: 'INR' | 'USD';
  isCustomQuote: boolean;
  
  // Development Investment (One-time)
  baseDevelopmentPrice: number;
  selectedAddonsTotal: number;
  totalOneTimeDevelopment: number;
  
  // Recurring Operations (Monthly/Annual)
  monthlyOperationsRetainer: number;
  annualOperationsRetainer: number;
  
  // Taxes & Total
  taxPercentage: number;
  taxAmount: number;
  totalGrossOneTime: number;
  
  breakdownItems: Array<{
    label: string;
    type: 'base_plan' | 'addon' | 'maintenance' | 'tax';
    amount: number;
    billingPeriod: string;
  }>;
}
