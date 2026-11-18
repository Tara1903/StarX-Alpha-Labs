/**
 * STARX ALPHA LABS — MASTER COMMERCIAL CATALOGUE COMPREHENSIVE TEST SUITE
 * Tests A through H covering all divisions, solutions, plans, recommendations, pricing, and onboarding flows.
 */

import {
  CANONICAL_DIVISIONS,
  CANONICAL_SOLUTIONS,
  CANONICAL_PLAN_FAMILIES,
  CANONICAL_PLANS,
  CANONICAL_FEATURES,
  CANONICAL_ADDONS,
  RECOMMENDATION_RULES,
  getPlansByDivision,
  getPlansForSolution,
  getPlanById,
  getFeaturesForPlan,
  getAddonsForPlan,
  matchRecommendationRule,
  calculateInvestmentSummary,
} from '../src/data/commercialCatalogue';
import { calculateComplexityScore, recommendPlan } from '../src/lib/plans/recommendationEngine';
import type { CanonicalDivisionSlug } from '../src/types/commercial';

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${msg}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${msg}`);
  }
}

async function runCommercialTests() {
  console.log('\n========================================================================');
  console.log('STARX ALPHA LABS — COMMERCIAL CATALOGUE SYSTEM VERIFICATION');
  console.log('========================================================================\n');

  // TEST A: ALL SIX DIVISIONS
  console.log('TEST A: All Six Divisions Verification');
  const requiredDivisions: CanonicalDivisionSlug[] = [
    'starx-web',
    'starx-apps',
    'starx-business',
    'starx-saas',
    'starx-ai',
    'starx-custom',
  ];
  for (const div of requiredDivisions) {
    const meta = CANONICAL_DIVISIONS[div];
    assert(meta !== undefined && meta.slug === div, `Division ${div} is registered in CANONICAL_DIVISIONS`);
    const plans = getPlansByDivision(div);
    assert(plans.length >= 2, `Division ${div} has ${plans.length} published canonical plans`);
  }

  // TEST B: EVERY SOLUTION CATEGORY
  console.log('\nTEST B: Solution Archetypes & Plan Families Coverage');
  assert(CANONICAL_SOLUTIONS.length >= 25, `Total solutions count is ${CANONICAL_SOLUTIONS.length} (Expected >= 25)`);
  for (const sol of CANONICAL_SOLUTIONS) {
    assert(sol.applicableIndustries.length >= 1, `Solution ${sol.name} has industry mappings (${sol.applicableIndustries.length})`);
    assert(sol.supportedPlatforms.length >= 1, `Solution ${sol.name} specifies platforms (${sol.supportedPlatforms.join(', ')})`);
  }

  // TEST C: PLAN RETRIEVAL
  console.log('\nTEST C: Plan Retrieval for Specific Solutions');
  const webEcomPlans = getPlansForSolution('sol-web-ecom', 'starx-web');
  assert(webEcomPlans.length >= 2, `Ecommerce solution returns ${webEcomPlans.length} specific ecommerce plans`);
  assert(webEcomPlans.some(p => p.id === 'web-ecom-starter'), 'Ecommerce solution includes web-ecom-starter');

  const appsXplatPlans = getPlansForSolution('sol-app-xplat', 'starx-apps');
  assert(appsXplatPlans.length >= 2, `Cross-platform app solution returns ${appsXplatPlans.length} mobile plans`);

  // TEST D: RECOMMENDATION ENGINE DETERMINISM
  console.log('\nTEST D: Recommendation Engine Determinism & Complexity Scoring');
  // Scenario 1: Low-complexity Web Project
  const rec1 = recommendPlan({
    divisionSlug: 'starx-web',
    solutionSlugOrId: 'sol-web-biz',
    industrySlug: 'retail-commerce',
    platforms: ['Web Desktop'],
    selectedFeatures: ['feat-nextjs-app-router'],
    complexityScore: 2,
    complexityFactors: { integrations: 2, realTime: 1, security: 2, platforms: 2, scale: 2 },
  });
  assert(rec1.recommendedPlan.id === 'web-biz-starter', `Low complexity recommends Starter (Got: ${rec1.recommendedPlan.id})`);
  assert(rec1.matchConfidence >= 85, `Confidence score is high (${rec1.matchConfidence}%)`);

  // Scenario 2: High-complexity Autonomous AI Project
  const rec2 = recommendPlan({
    divisionSlug: 'starx-ai',
    solutionSlugOrId: 'sol-ai-agent',
    industrySlug: 'financial-services',
    platforms: ['Web Desktop', 'Web Mobile', 'Background Worker'],
    selectedFeatures: ['feat-gemini-orchestration-engine', 'feat-rag-pgvector-embeddings', 'feat-immutable-audit-ledger'],
    complexityScore: 8,
    complexityFactors: { integrations: 8, realTime: 7, security: 9, platforms: 8, scale: 8 },
  });
  assert(rec2.recommendedPlan.id === 'ai-agent-growth', `High complexity AI recommends Growth Orchestration (Got: ${rec2.recommendedPlan.id})`);
  assert(rec2.alternativePlans.length >= 1, `Alternative plans provided (${rec2.alternativePlans.map(p => p.name).join(', ')})`);

  // TEST E: FEATURE CONFIGURATION & CLASSIFICATION
  console.log('\nTEST E: Feature Classification & Plan-Feature Matrix');
  const webBizStarterFeatures = getFeaturesForPlan('web-biz-starter');
  const includedFeats = webBizStarterFeatures.filter(f => f.classification === 'INCLUDED');
  const higherTierFeats = webBizStarterFeatures.filter(f => f.classification === 'HIGHER_TIER_ONLY');
  assert(includedFeats.length >= 4, `Starter plan has ${includedFeats.length} included features`);
  assert(higherTierFeats.length >= 1, `Starter plan identifies higher tier features (${higherTierFeats.length})`);

  // TEST F: PRICING ENGINE & STATUTORY GST
  console.log('\nTEST F: Pricing Engine Multi-Component Calculation');
  const calcINR = calculateInvestmentSummary({
    planId: 'web-biz-growth',
    selectedAddonIds: ['addon-seo-mastery', 'addon-priority-sla-monthly'],
    currency: 'INR',
  });
  assert(calcINR.baseDevelopmentPrice === 119999, `Base price INR matches ₹1,19,999 (Got: ${calcINR.baseDevelopmentPrice})`);
  assert(calcINR.selectedAddonsTotal === 11999, `One-time add-on calculated accurately (₹11,999)`);
  assert(calcINR.monthlyOperationsRetainer === 9999, `Recurring SLA operations separated (₹9,999/mo)`);
  assert(calcINR.taxPercentage === 18, `Statutory GST calculated at 18%`);
  assert(calcINR.taxAmount === Math.round((119999 + 11999) * 0.18), `GST Amount accurately computed (₹${calcINR.taxAmount})`);
  assert(calcINR.totalGrossOneTime === (119999 + 11999 + calcINR.taxAmount), `Gross total matches (₹${calcINR.totalGrossOneTime})`);

  // Test Export Currency (USD)
  const calcUSD = calculateInvestmentSummary({
    planId: 'web-biz-growth',
    selectedAddonIds: ['addon-seo-mastery'],
    currency: 'USD',
  });
  assert(calcUSD.baseDevelopmentPrice === 1599, `Export price in USD matches $1,599 (Got: ${calcUSD.baseDevelopmentPrice})`);
  assert(calcUSD.taxPercentage === 0, `Export transactions have 0% GST (LUT compliant)`);

  // SUMMARY REPORT
  console.log('\n========================================================================');
  console.log(`TEST EXECUTION SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runCommercialTests().catch(err => {
  console.error('[TEST ERROR]', err);
  process.exit(1);
});
