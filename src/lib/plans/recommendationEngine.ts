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
  planTypePreference?: 'subscription' | 'bespoke_project';
  pageCount?: number;
  hasEcommerce?: boolean;
  hasAuth?: boolean;
  hasAI?: boolean;
  hasCMS?: boolean;
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
  const desc = (request.rawDescription || "").toLowerCase();
  const feats = request.selectedFeatures.map(f => f.toLowerCase());

  const hasAI = request.hasAI || feats.some(f => f.includes("ai") || f.includes("bot") || f.includes("copilot") || f.includes("agent") || f.includes("rag") || f.includes("ocr") || f.includes("predictive") || f.includes("recommendation")) || desc.includes("ai") || desc.includes("copilot") || desc.includes("assistant") || desc.includes("chatbot");
  const hasAuth = request.hasAuth || feats.some(f => f.includes("auth") || f.includes("login") || f.includes("user") || f.includes("signup") || f.includes("rbac") || f.includes("oauth") || f.includes("2fa")) || desc.includes("auth") || desc.includes("login") || desc.includes("signup");
  const hasEcom = request.hasEcommerce || feats.some(f => f.includes("ecom") || f.includes("pay") || f.includes("cart") || f.includes("checkout") || f.includes("upi") || f.includes("catalog") || f.includes("billing") || f.includes("subscription") || f.includes("invoicing")) || desc.includes("ecom") || desc.includes("payment") || desc.includes("pay ") || desc.includes("store") || desc.includes("checkout");
  const hasCMS = request.hasCMS || feats.some(f => f.includes("cms") || f.includes("blog") || f.includes("brand") || f.includes("content") || f.includes("storage") || f.includes("file")) || desc.includes("cms") || desc.includes("blog");
  const hasLiquidGlass = feats.some(f => f.includes("liquid") || f.includes("glass") || f.includes("premium") || f.includes("futuristic") || f.includes("elegant")) || desc.includes("liquid") || desc.includes("glass");
  const hasCustomization = feats.some(f => f.includes("custom") || f.includes("layout") || f.includes("tailored")) || desc.includes("customization") || desc.includes("layout");
  const hasAnalytics = feats.some(f => f.includes("analytic") || f.includes("report") || f.includes("bi") || f.includes("metric")) || desc.includes("analytic") || desc.includes("report");
  const pages = request.pageCount;

  // Check if we should recommend monthly subscription plans (Default for Web & Apps)
  const isSubscriptionPreferred = request.planTypePreference !== 'bespoke_project';

  if (isSubscriptionPreferred && normDivision === 'starx-web') {
    let recId = 'sub-web-basic';
    let justification = 'For an essential 1–3 page high-speed web presence with lead forms and standard care, StarX Web Basic delivers the perfect foundation at ₹499/mo.';

    if ((pages && pages > 100) || score >= 10 || desc.includes("unlimited")) {
      recId = 'sub-web-ultra-max';
      justification = 'Your scope demands unlimited pages, bespoke fully custom design, enterprise CMS, and dedicated engineer support, matching StarX Web Ultra Max at ₹8,999+/mo.';
    } else if (hasAI) {
      if ((pages && pages > 50) || score >= 9) {
        recId = 'sub-web-ultra';
        justification = 'Your project requires AI-enhanced design, advanced + AI CMS, intelligent copilot, and up to 100 pages, perfectly matching StarX Web Ultra at ₹5,999/mo.';
      } else {
        recId = 'sub-web-elite';
        justification = 'Because your requirements include AI features (chatbot/content) alongside signature Liquid Glass UI and up to 50 pages, StarX Web Elite at ₹3,999/mo is the optimal tier.';
      }
    } else if (hasAuth || (pages && pages > 10)) {
      recId = 'sub-web-pro';
      justification = 'Your project specifies user authentication (login/signup), full ecommerce checkout, and complete admin dashboard (up to 20 pages), making StarX Web Pro at ₹2,499/mo the recommended tier.';
    } else if (hasEcom || (pages && pages > 5)) {
      recId = 'sub-web-plus';
      justification = 'Your scope requires dynamic database integration, basic ecommerce/payments, or custom domain connection (up to 10 pages), perfectly aligned with our most popular StarX Web Plus tier at ₹1,499/mo.';
    } else if (hasCMS || (pages && pages > 3)) {
      recId = 'sub-web-starter';
      justification = 'Because your requirements include custom branding, blog sections, and a content management editor (up to 5 pages), StarX Web Starter at ₹999/mo delivers the right balance.';
    }

    const recPlan = getPlanById(recId) || CANONICAL_PLANS[0];
    const webSubPlans = CANONICAL_PLANS.filter(p => p.divisionSlug === 'starx-web' && p.planType === 'subscription');
    const alternatives = webSubPlans.filter(p => p.id !== recPlan.id).slice(0, 3);

    const upgradeReasons: string[] = [];
    const higherTier = webSubPlans.find(p => p.priceINR > recPlan.priceINR);
    if (higherTier) {
      upgradeReasons.push(`Upgrade to ${higherTier.name} for extended scope (${higherTier.screenOrPageScope}), higher feature limits, and ${higherTier.slaLevel}`);
    } else {
      upgradeReasons.push("Consider modular add-ons for custom integrations and third-party APIs");
    }

    return {
      recommendedPlan: recPlan,
      alternativePlans: alternatives,
      matchConfidence: 96,
      justification,
      keyMatches: [
        `Aligned with ${recPlan.screenOrPageScope} allowance`,
        `Includes ${recPlan.slaLevel} and regular updates`,
        `Deployment on generic Vercel domain or custom domain`,
      ],
      upgradeReasons,
      suggestedAddons: getAddonsForPlan(recPlan.id).map(a => ({
        id: a.id,
        name: a.name,
        description: a.description,
        priceINR: a.priceINR,
        priceUSD: a.priceUSD,
        billingPeriod: a.billingModel === 'MONTHLY' ? 'monthly' as const : 'one_time' as const,
        category: a.category,
      })),
    };
  }

  if (isSubscriptionPreferred && normDivision === 'starx-apps') {
    let recId = 'sub-app-basic';
    let justification = 'For an essential branded Android app with order/booking capture and standard support, StarX App Basic gets your business on mobile at just ₹499/mo.';

    if (hasAI) {
      if (score >= 9) {
        recId = 'sub-app-ultra-max';
        justification = 'Your mobile application requires advanced multi-agent AI, automated re-engagement workflows, and dedicated engineer support, matching StarX App Ultra Max at ₹6,499/mo.';
      } else {
        recId = 'sub-app-ultra';
        justification = 'Your scope demands customer-facing AI Assistant (Shopping AI / Concierge) and automated business intelligence, matching StarX App Ultra at ₹4,999/mo.';
      }
    } else if (hasLiquidGlass) {
      recId = 'sub-app-elite';
      justification = 'Because you requested our signature Liquid Glass UI styling with fluid mobile animations and 60fps fluidity, StarX App Elite at ₹2,999/mo is the recommended flagship tier.';
    } else if (hasCustomization) {
      recId = 'sub-app-pro';
      justification = 'Advanced home screen layout customization, promotional banners, and priority technical support make StarX App Pro at ₹1,999/mo the recommended choice.';
    } else if (hasAnalytics) {
      recId = 'sub-app-plus';
      justification = 'Detailed revenue reports, sales analytics, and operational customer tracking make StarX App Plus at ₹1,499/mo our most popular mobile tier.';
    } else if (hasEcom || desc.includes("dashboard") || desc.includes("payment")) {
      recId = 'sub-app-starter';
      justification = 'Your mobile app requires in-app payment processing (UPI, Cards, Wallets) and a merchant management dashboard, perfectly matching StarX App Starter at ₹999/mo.';
    }

    const recPlan = getPlanById(recId) || CANONICAL_PLANS[0];
    const appSubPlans = CANONICAL_PLANS.filter(p => p.divisionSlug === 'starx-apps' && p.planType === 'subscription');
    const alternatives = appSubPlans.filter(p => p.id !== recPlan.id).slice(0, 3);

    const upgradeReasons: string[] = [];
    const higherTier = appSubPlans.find(p => p.priceINR > recPlan.priceINR);
    if (higherTier) {
      upgradeReasons.push(`Upgrade to ${higherTier.name} for higher feature access, advanced customization, and ${higherTier.slaLevel}`);
    } else {
      upgradeReasons.push("Add Google Play Store Publishing service (₹2,999 per app) for seamless deployment");
    }

    return {
      recommendedPlan: recPlan,
      alternativePlans: alternatives,
      matchConfidence: 96,
      justification,
      keyMatches: [
        `Native branded Android App with your logo, colors & theme`,
        `Features adapted to your specific business type`,
        `Includes ${recPlan.slaLevel} and ongoing cloud maintenance`,
      ],
      upgradeReasons,
      suggestedAddons: getAddonsForPlan(recPlan.id).map(a => ({
        id: a.id,
        name: a.name,
        description: a.description,
        priceINR: a.priceINR,
        priceUSD: a.priceUSD,
        billingPeriod: a.billingModel === 'MONTHLY' ? 'monthly' as const : 'one_time' as const,
        category: a.category,
      })),
    };
  }

  // 1. Evaluate deterministic recommendation rule from Master Commercial Catalogue for bespoke packages
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
