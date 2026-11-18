import type { CanonicalPlan, PlanAddon, PlanDivisionSlug } from "@/types/plans";
import {
  getPlansByDivision,
  normalizeDivisionSlug,
  GLOBAL_PLAN_ADDONS,
  CANONICAL_PLANS,
  getPlanById,
  matchRecommendationRule,
  getAddonsForPlan,
} from "@/data/plans";

export interface ComplexityFactors {
  integrations: number;   // 1 to 10
  realTime: number;       // 1 to 10
  security: number;       // 1 to 10
  platforms: number;      // 1 to 10
  scale: number;          // 1 to 10
}

export interface RecommendationRequest {
  divisionSlug: PlanDivisionSlug;
  industrySlug: string;
  solutionSlugOrId?: string;
  platforms: string[];
  selectedFeatures: string[];
  complexityScore: number;
  complexityFactors: ComplexityFactors;
  rawDescription?: string;
}

export interface RecommendationResult {
  recommendedPlan: CanonicalPlan;
  alternativePlans: CanonicalPlan[];
  matchConfidence: number;
  justification: string;
  keyMatches: string[];
  upgradeReasons: string[];
  suggestedAddons: PlanAddon[];
}

/**
 * Calculates a transparent, multi-factor complexity score (1 to 10)
 * based on selected features, target platforms, and operational scope.
 */
export function calculateComplexityScore(params: {
  divisionSlug: string;
  platforms: string[];
  selectedFeatures: string[];
  rawDescription?: string;
}): { score: number; factors: ComplexityFactors; breakdown: string[] } {
  const { divisionSlug, platforms, selectedFeatures, rawDescription = "" } = params;

  let integrations = 2;
  let realTime = 2;
  let security = 2;
  let platformFactor = 2;
  let scale = 2;
  const breakdown: string[] = [];

  // 1. Platform Factor
  if (platforms.length >= 3) {
    platformFactor = 8;
    breakdown.push("Multi-platform cross-deployment (Web, iOS, Android, POS)");
  } else if (platforms.length === 2) {
    platformFactor = 5;
    breakdown.push("Dual-platform deployment");
  } else {
    platformFactor = 3;
    breakdown.push("Single target platform");
  }

  // 2. Division Baseline
  if (divisionSlug === "starx-ai" || divisionSlug === "starx-saas") {
    security += 3;
    integrations += 3;
    scale += 2;
    breakdown.push("Frontier AI / Multi-Tenant SaaS baseline complexity");
  } else if (divisionSlug === "starx-business") {
    integrations += 3;
    security += 2;
    breakdown.push("Operational ERP / Multi-Warehouse sync requirements");
  }

  // 3. Feature Count & Keyword Multiplier
  const featCount = selectedFeatures.length;
  if (featCount >= 8) {
    scale += 4;
    integrations += 3;
    breakdown.push("High feature density (8+ architectural capabilities)");
  } else if (featCount >= 4) {
    scale += 2;
    integrations += 1;
    breakdown.push("Moderate feature density (4–7 capabilities)");
  }

  const descLower = rawDescription.toLowerCase();
  if (descLower.includes("real-time") || descLower.includes("live") || descLower.includes("stream") || descLower.includes("instant")) {
    realTime = Math.min(10, realTime + 4);
    breakdown.push("Real-time streaming / live WebSocket requirement");
  }
  if (descLower.includes("hipaa") || descLower.includes("pci") || descLower.includes("soc-2") || descLower.includes("finance") || descLower.includes("bank")) {
    security = Math.min(10, security + 4);
    breakdown.push("Regulated compliance / banking-grade security tier");
  }
  if (descLower.includes("enterprise") || descLower.includes("millions") || descLower.includes("high traffic") || descLower.includes("concurrency")) {
    scale = Math.min(10, scale + 4);
    breakdown.push("High-concurrency enterprise scale requirement");
  }

  // Clamped weighted composite score
  const rawScore = (integrations * 0.2) + (realTime * 0.15) + (security * 0.25) + (platformFactor * 0.2) + (scale * 0.2);
  const score = Math.max(1, Math.min(10, Math.round(rawScore)));

  return {
    score,
    factors: {
      integrations: Math.min(10, integrations),
      realTime: Math.min(10, realTime),
      security: Math.min(10, security),
      platforms: Math.min(10, platformFactor),
      scale: Math.min(10, scale),
    },
    breakdown,
  };
}

/**
 * Deterministically recommends the optimal StarX plan based on division,
 * solution archetype, feature count, platforms, and computed complexity score.
 */
export function recommendPlan(request: RecommendationRequest): RecommendationResult {
  const normDivision = normalizeDivisionSlug(request.divisionSlug);
  const score = request.complexityScore || 4;

  // 1. Evaluate deterministic recommendation rule from Master Commercial Catalogue
  const ruleResult = matchRecommendationRule({
    divisionSlug: normDivision,
    solutionSlugOrId: request.solutionSlugOrId,
    complexityScore: score,
  });

  // Convert recommended plan record to CanonicalPlan interface
  const recommended = getPlanById(ruleResult.recommendedPlan.id) || 
    getPlansByDivision(normDivision, request.solutionSlugOrId)[0] || 
    CANONICAL_PLANS[0];

  // Map alternative plans
  const alternatives = ruleResult.alternativePlans
    .map(p => getPlanById(p.id))
    .filter((p): p is CanonicalPlan => p !== undefined && p.id !== recommended.id);

  // If no alternatives returned by rule, pick eligible division plans
  if (alternatives.length === 0) {
    const allDivPlans = getPlansByDivision(normDivision, request.solutionSlugOrId);
    allDivPlans.forEach(p => {
      if (p.id !== recommended.id && alternatives.length < 2) {
        alternatives.push(p);
      }
    });
  }

  // 2. Identify key feature matches
  const keyMatches: string[] = [
    `Aligned with ${recommended.screenOrPageScope} specification`,
    `Delivers ${recommended.slaLevel} SLA guarantee and ${recommended.postLaunchWarrantyDays}-day warranty`,
  ];
  if (request.platforms.length > 0) {
    keyMatches.push(`Native deployment on ${recommended.supportedPlatforms.join(', ')}`);
  }
  if (recommended.includedFeatures.length > 0) {
    keyMatches.push(`Includes ${recommended.includedFeatures.slice(0, 3).map(f => f.name).join(', ')}`);
  }

  // 3. Upgrade reasons (what higher tier provides)
  const upgradeReasons: string[] = [];
  const higherTier = alternatives.find(p => p.priceINR > recommended.priceINR);
  if (higherTier) {
    upgradeReasons.push(`Upgrade to ${higherTier.name} for extended scope (${higherTier.screenOrPageScope}) and ${higherTier.slaLevel} response SLA`);
  } else {
    upgradeReasons.push("Consider modular add-ons for custom integrations and managed operations");
  }

  // 4. Suggested Addons
  const suggestedAddons = getAddonsForPlan(recommended.id).map(a => ({
    id: a.id,
    name: a.name,
    description: a.description,
    priceINR: a.priceINR,
    priceUSD: a.priceUSD,
    billingPeriod: a.billingModel === 'MONTHLY' ? 'monthly' as const : 'one_time' as const,
    category: a.category,
  }));

  const matchConfidence = Math.min(98, Math.max(85, 90 + Math.round((score % 3) * 3)));

  return {
    recommendedPlan: recommended,
    alternativePlans: alternatives,
    matchConfidence,
    justification: ruleResult.justification,
    keyMatches,
    upgradeReasons,
    suggestedAddons,
  };
}
