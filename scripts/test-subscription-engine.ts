import { CANONICAL_PLANS, getPlanById } from "../src/data/plans";
import { recommendPlan } from "../src/lib/plans/recommendationEngine";
import { calculateInvestmentSummary } from "../src/data/commercialCatalogue";

console.log("==================================================");
console.log("STARX COMMERCIAL CATALOGUE — SUBSCRIPTION PLANS AUDIT");
console.log("==================================================");

// 1. Audit StarX Web Subscription Plans
const webPlans = [
  { id: "sub-web-basic", price: 499, tier: "basic", name: "StarX Web Basic" },
  { id: "sub-web-starter", price: 999, tier: "starter", name: "StarX Web Starter" },
  { id: "sub-web-plus", price: 1499, tier: "plus", name: "StarX Web Plus" },
  { id: "sub-web-pro", price: 2499, tier: "pro", name: "StarX Web Pro" },
  { id: "sub-web-elite", price: 3999, tier: "elite", name: "StarX Web Elite" },
  { id: "sub-web-ultra", price: 5999, tier: "ultra", name: "StarX Web Ultra" },
  { id: "sub-web-ultra-max", price: 8999, tier: "ultra_max", name: "StarX Web Ultra Max" },
];

console.log("\n--- StarX Web 7-Tier Subscriptions ---");
let allWebPass = true;
for (const p of webPlans) {
  const record = getPlanById(p.id);
  if (!record) {
    console.error(`❌ Plan ${p.id} not found!`);
    allWebPass = false;
    continue;
  }
  const isMatch = record.priceINR === p.price && record.monthlySubscriptionPriceINR === p.price && record.tier === p.tier;
  if (isMatch) {
    console.log(`✅ ${record.name}: ₹${record.priceINR}/mo (${record.tier}) - Scope: ${record.screenOrPageScope} - SLA: ${record.slaLevel}`);
  } else {
    console.error(`❌ Plan ${p.id} mismatch: Expected ₹${p.price}, got ₹${record.priceINR}`);
    allWebPass = false;
  }
}

// 2. Audit StarX Apps Subscription Plans
const appPlans = [
  { id: "sub-app-basic", price: 499, tier: "basic", name: "StarX App Basic" },
  { id: "sub-app-starter", price: 999, tier: "starter", name: "StarX App Starter" },
  { id: "sub-app-plus", price: 1499, tier: "plus", name: "StarX App Plus" },
  { id: "sub-app-pro", price: 1999, tier: "pro", name: "StarX App Pro" },
  { id: "sub-app-elite", price: 2999, tier: "elite", name: "StarX App Elite" },
  { id: "sub-app-ultra", price: 4999, tier: "ultra", name: "StarX App Ultra" },
  { id: "sub-app-ultra-max", price: 6499, tier: "ultra_max", name: "StarX App Ultra Max" },
];

console.log("\n--- StarX Apps 7-Tier Subscriptions ---");
let allAppPass = true;
for (const p of appPlans) {
  const record = getPlanById(p.id);
  if (!record) {
    console.error(`❌ Plan ${p.id} not found!`);
    allAppPass = false;
    continue;
  }
  const isMatch = record.priceINR === p.price && record.monthlySubscriptionPriceINR === p.price && record.tier === p.tier;
  if (isMatch) {
    console.log(`✅ ${record.name}: ₹${record.priceINR}/mo (${record.tier}) - Scope: ${record.screenOrPageScope} - SLA: ${record.slaLevel}`);
  } else {
    console.error(`❌ Plan ${p.id} mismatch: Expected ₹${p.price}, got ₹${record.priceINR}`);
    allAppPass = false;
  }
}

// 3. Test Dynamic Recommendation Engine
console.log("\n--- Dynamic Recommendation Engine Tests ---");

const testCases = [
  {
    name: "Web: Basic 1-3 pages, no auth/ecom",
    request: {
      divisionSlug: "starx-web" as const,
      industrySlug: "general",
      platforms: ["Web Desktop"],
      selectedFeatures: ["feat-web-contact-leads"],
      complexityScore: 1,
      complexityFactors: { integrations: 1, realTime: 1, security: 1, platforms: 1, scale: 1 },
      rawDescription: "Simple landing page for a plumbing service",
    },
    expectedPlanId: "sub-web-basic",
  },
  {
    name: "Web: CMS & Blog requirement",
    request: {
      divisionSlug: "starx-web" as const,
      industrySlug: "general",
      platforms: ["Web Desktop"],
      selectedFeatures: ["feat-web-cms", "feat-web-blog"],
      complexityScore: 3,
      complexityFactors: { integrations: 2, realTime: 1, security: 2, platforms: 2, scale: 2 },
      rawDescription: "Agency portfolio with blog and content manager",
    },
    expectedPlanId: "sub-web-starter",
  },
  {
    name: "Web: Ecommerce / Payments",
    request: {
      divisionSlug: "starx-web" as const,
      industrySlug: "retail",
      platforms: ["Web Desktop", "Mobile"],
      selectedFeatures: ["feat-web-ecom-payments", "feat-web-db-dynamic"],
      complexityScore: 5,
      complexityFactors: { integrations: 3, realTime: 2, security: 3, platforms: 2, scale: 3 },
      rawDescription: "Online storefront with upi payment checkout",
    },
    expectedPlanId: "sub-web-plus",
  },
  {
    name: "Web: User Authentication & Admin Dashboard",
    request: {
      divisionSlug: "starx-web" as const,
      industrySlug: "tech",
      platforms: ["Web Desktop", "Mobile"],
      selectedFeatures: ["feat-auth-supabase-jwt", "feat-web-admin-dashboard"],
      complexityScore: 6,
      complexityFactors: { integrations: 4, realTime: 2, security: 4, platforms: 2, scale: 4 },
      rawDescription: "Client membership portal with login signup authentication",
    },
    expectedPlanId: "sub-web-pro",
  },
  {
    name: "Web: AI Chatbot / Smart Features",
    request: {
      divisionSlug: "starx-web" as const,
      industrySlug: "services",
      platforms: ["Web Desktop"],
      selectedFeatures: ["feat-web-ai-features"],
      complexityScore: 7,
      complexityFactors: { integrations: 5, realTime: 4, security: 4, platforms: 2, scale: 4 },
      rawDescription: "Website with AI chatbot assistant and smart search",
    },
    expectedPlanId: "sub-web-elite",
  },
  {
    name: "Apps: Basic branded app",
    request: {
      divisionSlug: "starx-apps" as const,
      industrySlug: "food",
      platforms: ["Android Mobile"],
      selectedFeatures: ["feat-app-core-branding", "feat-app-orders-bookings"],
      complexityScore: 1,
      complexityFactors: { integrations: 1, realTime: 1, security: 1, platforms: 1, scale: 1 },
      rawDescription: "Takeaway menu for our local restaurant",
    },
    expectedPlanId: "sub-app-basic",
  },
  {
    name: "Apps: In-app payments & dashboard",
    request: {
      divisionSlug: "starx-apps" as const,
      industrySlug: "retail",
      platforms: ["Android Mobile"],
      selectedFeatures: ["feat-app-payments-upi", "feat-app-business-dashboard"],
      complexityScore: 3,
      complexityFactors: { integrations: 3, realTime: 2, security: 3, platforms: 2, scale: 2 },
      rawDescription: "Mobile app with upi payments and merchant dashboard",
    },
    expectedPlanId: "sub-app-starter",
  },
  {
    name: "Apps: AI Assistant",
    request: {
      divisionSlug: "starx-apps" as const,
      industrySlug: "retail",
      platforms: ["Android Mobile"],
      selectedFeatures: ["feat-app-ai-assistant"],
      complexityScore: 8,
      complexityFactors: { integrations: 6, realTime: 5, security: 5, platforms: 3, scale: 5 },
      rawDescription: "Shopping app with intelligent customer-facing AI assistant",
    },
    expectedPlanId: "sub-app-ultra",
  },
];

let allRecsPass = true;
for (const tc of testCases) {
  const result = recommendPlan(tc.request);
  const pass = result.recommendedPlan.id === tc.expectedPlanId;
  if (pass) {
    console.log(`✅ [PASS] ${tc.name} -> ${result.recommendedPlan.name} (₹${result.recommendedPlan.priceINR}/mo)`);
    console.log(`   Justification: "${result.justification}"`);
  } else {
    console.error(`❌ [FAIL] ${tc.name} -> Expected ${tc.expectedPlanId}, Got ${result.recommendedPlan.id}`);
    allRecsPass = false;
  }
}

// 4. Test Investment Calculation
console.log("\n--- Investment Summary Calculation Tests ---");
const subCalc = calculateInvestmentSummary({
  planId: "sub-web-plus",
  selectedAddonIds: ["addon-custom-domain"],
  currency: "INR",
});
console.log(`Plan: ${subCalc.planName}`);
console.log(`Monthly Operations Retainer: ₹${subCalc.monthlyOperationsRetainer}/mo`);
console.log(`One-Time Setup Total (Net): ₹${subCalc.totalOneTimeDevelopment}`);
console.log(`GST (18%): ₹${subCalc.taxAmount}`);
console.log(`Total Initial Setup (Gross): ₹${subCalc.totalGrossOneTime}`);
console.log("Breakdown items:", subCalc.breakdownItems);

const isCalcValid = subCalc.monthlyOperationsRetainer === 1499 && subCalc.totalOneTimeDevelopment === (1499 + 1499);
console.log(isCalcValid ? "✅ Investment summary calculation is valid!" : "❌ Investment calculation unexpected values");

console.log("\n==================================================");
console.log(`OVERALL TEST RESULT: ${allWebPass && allAppPass && allRecsPass && isCalcValid ? "ALL 100% PASSED" : "FAILED"}`);
console.log("==================================================");
