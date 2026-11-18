import type { CanonicalPlan, PlanAddon, PlanDivisionSlug } from "../../types/plans";
import { getPlansByDivision, normalizeDivisionSlug, GLOBAL_PLAN_ADDONS, CANONICAL_PLANS } from "@/data/plans";

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
    scale += 3;
    breakdown.push("Advanced multi-tenancy & AI compute tier");
  } else if (divisionSlug === "starx-business" || divisionSlug === "starx-custom") {
    integrations += 3;
    security += 3;
    breakdown.push("Enterprise database schemas & ACID compliance");
  }

  // 3. Keyword / Feature Analysis
  const text = `${selectedFeatures.join(" ")} ${rawDescription}`.toLowerCase();

  if (text.includes("real-time") || text.includes("telemetry") || text.includes("gps") || text.includes("chat")) {
    realTime = Math.min(10, realTime + 4);
    breakdown.push("Real-time bidirectional synchronization / live telemetry");
  }

  if (text.includes("payment") || text.includes("stripe") || text.includes("upi") || text.includes("checkout") || text.includes("pos")) {
    integrations = Math.min(10, integrations + 3);
    security = Math.min(10, security + 2);
    breakdown.push("Payment gateway switch & transactional settlement");
  }

  if (text.includes("multi-tenant") || text.includes("sso") || text.includes("rbac") || text.includes("hipaa") || text.includes("audit")) {
    security = Math.min(10, security + 4);
    scale = Math.min(10, scale + 3);
    breakdown.push("Enterprise security, role permissions & compliance audits");
  }

  if (text.includes("offline") || text.includes("barcode") || text.includes("hardware") || text.includes("printer")) {
    integrations = Math.min(10, integrations + 3);
    breakdown.push("Hardware peripheral / offline database sync");
  }

  // Calculate weighted overall score (1 to 10)
  const rawScore = (
    integrations * 0.25 +
    realTime * 0.20 +
    security * 0.25 +
    platformFactor * 0.15 +
    scale * 0.15
  );

  const finalScore = Math.max(1, Math.min(10, Math.round(rawScore)));

  return {
    score: finalScore,
    factors: {
      integrations,
      realTime,
      security,
      platforms: platformFactor,
      scale,
    },
    breakdown,
  };
}

/**
 * Deterministic Plan Recommendation Engine with AI Explanatory Layer
 * Matches client requirements against canonical plans with 0 arbitrary budget sliders.
 */
export function recommendPlan(request: RecommendationRequest): RecommendationResult {
  const {
    divisionSlug,
    complexityScore = 4,
    platforms = [],
    selectedFeatures = [],
  } = request;
  
  const normalizedSlug = normalizeDivisionSlug(divisionSlug);
  let plans = getPlansByDivision(normalizedSlug);

  if (!plans || plans.length === 0) {
    plans = CANONICAL_PLANS.filter((p) => p.divisionSlug === "starx-web");
  }

  let recommendedTier: "starter" | "growth" | "enterprise" | "custom" = "growth";
  let confidence = 88;
  const keyMatches: string[] = [];
  const upgradeReasons: string[] = [];

  // Deterministic rule engine
  if (complexityScore <= 3) {
    recommendedTier = "starter";
    confidence = 94;
    keyMatches.push("Rapid turnaround timeline within 1–3 weeks");
    keyMatches.push("Lean scope optimized for essential operational readiness");
    keyMatches.push("Single to dual platform deployment target");
    upgradeReasons.push("Consider Growth tier if you require multi-user role permissions or dynamic CMS");
  } else if (complexityScore <= 6) {
    recommendedTier = "growth";
    confidence = 96;
    keyMatches.push("Full-featured platform supporting scaling operations");
    keyMatches.push("Dynamic database backend with automated notifications and webhooks");
    keyMatches.push("Priority 24-hour SLA response and 60-day warranty coverage");
    upgradeReasons.push("Consider Enterprise tier if you require custom hardware integrations, SAML SSO, or dedicated SLA pods");
  } else if (complexityScore <= 8) {
    recommendedTier = "enterprise";
    confidence = 92;
    keyMatches.push("Mission-critical architecture with hardened security and compliance");
    keyMatches.push("High-concurrency queues, multi-role workspaces, and automated sync");
    keyMatches.push("Mission-Critical 2-hour SLA response and 90-day warranty");
    upgradeReasons.push("Custom engineering tier recommended for bespoke proprietary foundation models or legacy mainframe bridges");
  } else {
    recommendedTier = "custom";
    confidence = 95;
    keyMatches.push("Bespoke proprietary software architecture with dedicated engineering squad");
    keyMatches.push("Complex non-standard integrations, multi-cloud VPC, or deep hardware firmware");
    keyMatches.push("Dedicated Solutions Architect with 100% intellectual property transfer");
  }

  // Find exact plan match
  const recommendedPlan = plans.find((p) => p.tier === recommendedTier) || plans[0];
  const alternativePlans = plans.filter((p) => p.id !== recommendedPlan.id);

  // Generate transparent justification
  const justification = `Based on your multi-factor complexity rating of ${complexityScore}/10 across ${platforms.length} target platform(s) and ${selectedFeatures.length} selected capabilities, the ${recommendedPlan.name} is the optimal architectural match. It delivers complete technical scope, native compliance, and verified milestone deliverables without paying for unnecessary enterprise overhead.`;

  // Recommend relevant modular addons
  const suggestedAddons: PlanAddon[] = [];
  if (platforms.some((p) => p.toLowerCase().includes("web"))) {
    const seo = GLOBAL_PLAN_ADDONS.find((a) => a.id === "addon-seo-mastery");
    if (seo) suggestedAddons.push(seo);
  }
  if (selectedFeatures.some((f) => f.toLowerCase().includes("payment") || f.toLowerCase().includes("checkout"))) {
    const pay = GLOBAL_PLAN_ADDONS.find((a) => a.id === "addon-payment-gateway");
    if (pay) suggestedAddons.push(pay);
  }
  if (complexityScore >= 6) {
    const pentest = GLOBAL_PLAN_ADDONS.find((a) => a.id === "addon-security-pentest");
    if (pentest) suggestedAddons.push(pentest);
  }
  if (suggestedAddons.length === 0) {
    suggestedAddons.push(GLOBAL_PLAN_ADDONS[0], GLOBAL_PLAN_ADDONS[3]);
  }

  return {
    recommendedPlan,
    alternativePlans,
    matchConfidence: confidence,
    justification,
    keyMatches,
    upgradeReasons,
    suggestedAddons,
  };
}
