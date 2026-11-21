import type { CanonicalPlan, PlanAddon, PlanDivisionSlug, PlanFeature } from "../types/plans";
import {
  CANONICAL_PLANS as CATALOGUE_RECORDS,
  CANONICAL_ADDONS,
  getFeaturesForPlan,
  getAddonsForPlan,
  getSolutionsByDivision,
  getSolutionBySlugOrId,
} from "./commercialCatalogue";

// Helper to convert a CanonicalPlanRecord into the CanonicalPlan interface
function recordToCanonicalPlan(record: typeof CATALOGUE_RECORDS[0]): CanonicalPlan {
  const mappedFeatures: PlanFeature[] = getFeaturesForPlan(record.id)
    .filter(f => f.classification === 'INCLUDED')
    .map(f => ({
      id: f.feature.id,
      name: f.feature.name,
      description: f.feature.customerExplanation,
      category: 'core',
      highlighted: f.feature.defaultPriority === 'must_have',
    }));

  const mappedAddons: PlanAddon[] = getAddonsForPlan(record.id).map(a => ({
    id: a.id,
    name: a.name,
    description: a.description,
    priceINR: a.priceINR,
    priceUSD: a.priceUSD,
    billingPeriod: a.billingModel === 'MONTHLY' ? 'monthly' : 'one_time',
    category: a.category,
  }));

  const limitations = [
    `Scope: ${record.limits.pagesOrScreens}`,
    `Revisions: ${record.limits.includedRevisions} rounds included`,
    `SLA: ${record.limits.slaResponseTime}`,
    `Warranty: ${record.limits.warrantyPeriodDays} days comprehensive coverage`,
  ];
  if (record.limits.aiTokensIncludedPerMonth) {
    limitations.push(`AI Tokens: ${record.limits.aiTokensIncludedPerMonth}`);
  }

  return {
    id: record.id,
    divisionSlug: record.divisionSlug,
    solutionId: record.solutionId,
    planFamilyId: record.planFamilyId,
    tier: record.tier,
    code: record.code,
    name: record.name,
    tagline: record.tagline,
    description: record.description,
    badge: record.badge,
    popular: record.isPopular,
    bestValue: record.isBestValue,
    priceINR: record.priceINR,
    priceUSD: record.priceUSD,
    isCustomPrice: record.isCustomQuote,
    isCustomQuote: record.isCustomQuote,
    planType: record.planType || (record.pricingComponents.some(pc => pc.type === 'MONTHLY') ? 'subscription' : 'bespoke_project'),
    monthlySubscriptionPriceINR: record.monthlySubscriptionPriceINR || record.priceINR,
    billingType: record.pricingComponents.some(pc => pc.type === 'MONTHLY') ? 'managed_monthly' : 'fixed_project',
    timelineWeeks: record.limits.timelineWeeks,
    screenOrPageScope: record.limits.pagesOrScreens,
    revisionsIncluded: record.limits.includedRevisions,
    codeOwnership: record.codeOwnership,
    supportedPlatforms: record.limits.includedPlatforms,
    recommendedFor: record.idealForAudience,
    includedFeatures: mappedFeatures,
    limitations,
    availableAddons: mappedAddons,
    slaLevel: record.limits.slaResponseTime,
    postLaunchWarrantyDays: record.limits.warrantyPeriodDays,
    complianceTags: ['OWASP Hardened', 'Production Ready', 'GDPR/DPDP Aligned'],
    limits: record.limits,
    pricingComponents: record.pricingComponents,
    version: record.version,
    status: record.status,
  };
}

// Global Shared Addons available across divisions
export const GLOBAL_PLAN_ADDONS: PlanAddon[] = CANONICAL_ADDONS.map(a => ({
  id: a.id,
  name: a.name,
  description: a.description,
  priceINR: a.priceINR,
  priceUSD: a.priceUSD,
  billingPeriod: a.billingModel === 'MONTHLY' ? 'monthly' : 'one_time',
  category: a.category,
}));

// Canonical plans array derived authoritatively from commercial catalogue
export const CANONICAL_PLANS: CanonicalPlan[] = CATALOGUE_RECORDS.map(recordToCanonicalPlan);

/**
 * Returns all active plans across all divisions.
 */
export function getAllPlans(): CanonicalPlan[] {
  return CANONICAL_PLANS;
}

/**
 * Normalizes user-submitted or URL division slugs into canonical division slugs.
 */
export function normalizeDivisionSlug(raw: string): PlanDivisionSlug {
  const cleaned = (raw || '').toLowerCase().trim();
  if (cleaned.includes('web') || cleaned === 'websites' || cleaned === 'website') return 'starx-web';
  if (cleaned.includes('app') || cleaned === 'mobile' || cleaned === 'ios' || cleaned === 'android') return 'starx-apps';
  if (cleaned.includes('business') || cleaned === 'erp' || cleaned === 'pos' || cleaned === 'retail') return 'starx-business';
  if (cleaned.includes('saas') || cleaned === 'platform') return 'starx-saas';
  if (cleaned.includes('ai') || cleaned === 'agent' || cleaned === 'copilot') return 'starx-ai';
  if (cleaned.includes('custom') || cleaned === 'engineering' || cleaned === 'systems') return 'starx-custom';
  return 'starx-web';
}

/**
 * Returns published canonical plans for a division, optionally filtered by solution.
 */
export function getPlansByDivision(divisionSlug: PlanDivisionSlug, solutionSlugOrId?: string): CanonicalPlan[] {
  const norm = normalizeDivisionSlug(divisionSlug);
  let plans = CANONICAL_PLANS.filter(p => p.divisionSlug === norm);

  if (solutionSlugOrId) {
    const sol = getSolutionBySlugOrId(solutionSlugOrId);
    if (sol) {
      const solutionPlans = plans.filter(p => p.solutionId === sol.id || p.planType === 'subscription');
      if (solutionPlans.length > 0) {
        return solutionPlans;
      }
    }
  }

  return plans;
}

/**
 * Returns a specific plan by its ID or code.
 */
export function getPlanById(planId: string): CanonicalPlan | undefined {
  return CANONICAL_PLANS.find(p => p.id === planId || p.code === planId);
}

/**
 * Returns the default recommended plan for a division.
 */
export function getDefaultPlanForDivision(divisionSlug: PlanDivisionSlug): CanonicalPlan {
  const plans = getPlansByDivision(divisionSlug);
  const popular = plans.find(p => p.popular || p.bestValue);
  return popular || plans[0] || CANONICAL_PLANS[0];
}

/**
 * Returns all addons available for a specific plan.
 */
export function getPlanAddons(planId: string): PlanAddon[] {
  const plan = getPlanById(planId);
  return plan ? plan.availableAddons : GLOBAL_PLAN_ADDONS;
}

// Re-export everything from the master commercial catalogue
export * from "./commercialCatalogue";
