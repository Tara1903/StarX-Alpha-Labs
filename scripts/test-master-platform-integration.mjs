import fs from "node:fs";

// 1. Synchronously parse .env.local if present
if (fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (match) {
      const key = match[1];
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  }
}

async function runMasterIntegrationTests() {
  console.log("================================================================================");
  console.log("STARX ALPHA LABS — MASTER PLATFORM INTEGRATION & REGRESSION TEST SUITE");
  console.log("================================================================================");

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      process.exitCode = 1;
    }
  }

  // TEST 1: Canonical 6 Divisions
  try {
    const { DIVISIONS_DATA, getDivisionBySlug } = await import("../src/data/divisions.ts");
    assert(DIVISIONS_DATA.length === 6, `All 6 canonical divisions exist (Found ${DIVISIONS_DATA.length})`);
    
    const requiredSlugs = ["starx-web", "starx-apps", "starx-business", "starx-saas", "starx-ai", "starx-custom"];
    for (const slug of requiredSlugs) {
      const found = getDivisionBySlug(slug);
      assert(found !== undefined && found.slug === slug, `Division "${slug}" resolves cleanly (${found?.name})`);
    }
  } catch (err) {
    assert(false, `Divisions test failed: ${err.message}`);
  }

  // TEST 2: Canonical 12 Industries
  try {
    const { INDUSTRIES_DATA, getIndustryBySlug } = await import("../src/data/industries.ts");
    assert(INDUSTRIES_DATA.length === 12, `All 12 canonical industries exist (Found ${INDUSTRIES_DATA.length})`);
    
    const sampleIndustries = ["retail-commerce", "healthcare-life-sciences", "education-edtech", "finance-professional-services"];
    for (const indSlug of sampleIndustries) {
      const found = getIndustryBySlug(indSlug);
      assert(found !== undefined, `Industry "${indSlug}" resolves cleanly (${found?.name})`);
    }
    // Test alias
    const aliasFound = getIndustryBySlug("finance-banking");
    assert(aliasFound !== undefined && aliasFound.slug === "finance-professional-services", `Alias "finance-banking" maps to "finance-professional-services"`);
  } catch (err) {
    assert(false, `Industries test failed: ${err.message}`);
  }

  // TEST 3: Canonical Plans Matrix (24 Plans: 4 per division)
  try {
    const { CANONICAL_PLANS, getPlansByDivision, GLOBAL_PLAN_ADDONS } = await import("../src/data/plans.ts");
    assert(CANONICAL_PLANS.length === 24, `All 24 canonical multi-tier plans exist (Found ${CANONICAL_PLANS.length})`);
    assert(GLOBAL_PLAN_ADDONS.length >= 6, `Global verified add-ons catalog loaded (${GLOBAL_PLAN_ADDONS.length} addons)`);

    const divisions = ["starx-web", "starx-apps", "starx-business", "starx-saas", "starx-ai", "starx-custom"];
    for (const div of divisions) {
      const plans = getPlansByDivision(div);
      assert(plans.length === 4, `Division "${div}" has exactly 4 plans (starter, growth, enterprise, custom)`);
      const tiers = plans.map(p => p.tier);
      assert(
        tiers.includes("starter") && tiers.includes("growth") && tiers.includes("enterprise") && tiers.includes("custom"),
        `Division "${div}" covers all 4 standard commercial tiers`
      );
    }
  } catch (err) {
    assert(false, `Plans matrix test failed: ${err.message}`);
  }

  // TEST 4: Complexity Scoring Engine
  try {
    const { calculateComplexityScore } = await import("../src/lib/plans/recommendationEngine.ts");
    
    // Low complexity case
    const low = calculateComplexityScore({
      divisionSlug: "starx-web",
      platforms: ["Web Desktop"],
      selectedFeatures: ["Static Homepage", "Contact Form"],
      rawDescription: "A simple 3-page website for my local consulting firm.",
    });
    assert(low.score <= 4, `Low complexity test yields score <= 4 (Actual: ${low.score})`);

    // High complexity case
    const high = calculateComplexityScore({
      divisionSlug: "starx-ai",
      platforms: ["Web", "iOS", "Android", "Cloud API"],
      selectedFeatures: ["Real-time Telemetry", "Multi-tenant SSO", "Stripe Payment Switch", "Offline Database Sync", "Audit Logs"],
      rawDescription: "High-throughput real-time AI trading and HIPAA compliant patient telemetry with SAML SSO.",
    });
    assert(high.score >= 7, `High complexity test yields score >= 7 (Actual: ${high.score})`);
    assert(high.factors.realTime >= 6, `Real-time factor elevated (Actual: ${high.factors.realTime})`);
    assert(high.factors.security >= 7, `Security factor elevated (Actual: ${high.factors.security})`);
  } catch (err) {
    assert(false, `Complexity engine test failed: ${err.message}`);
  }

  // TEST 5: Deterministic Recommendation Engine
  try {
    const { recommendPlan } = await import("../src/lib/plans/recommendationEngine.ts");

    const starterRec = recommendPlan({
      divisionSlug: "starx-web",
      industrySlug: "retail-commerce",
      platforms: ["Web"],
      selectedFeatures: ["Responsive Design"],
      complexityScore: 2,
      complexityFactors: { integrations: 2, realTime: 1, security: 2, platforms: 2, scale: 2 },
    });
    assert(starterRec.recommendedPlan.tier === "starter", `Low complexity recommends Starter tier (Got: ${starterRec.recommendedPlan.tier})`);
    assert(starterRec.matchConfidence >= 90, `Starter match confidence is >= 90% (Actual: ${starterRec.matchConfidence}%)`);

    const growthRec = recommendPlan({
      divisionSlug: "starx-business",
      industrySlug: "retail-commerce",
      platforms: ["Web", "Tablet POS"],
      selectedFeatures: ["Multi-Store Inventory", "Barcode Scanning"],
      complexityScore: 5,
      complexityFactors: { integrations: 5, realTime: 4, security: 4, platforms: 5, scale: 4 },
    });
    assert(growthRec.recommendedPlan.tier === "growth", `Medium complexity recommends Growth tier (Got: ${growthRec.recommendedPlan.tier})`);

    const enterpriseRec = recommendPlan({
      divisionSlug: "starx-saas",
      industrySlug: "finance-professional-services",
      platforms: ["Web", "iOS", "Android", "Cloud API"],
      selectedFeatures: ["SAML SSO", "Immutable Audit Event Stream", "Custom Domain Mapping"],
      complexityScore: 8,
      complexityFactors: { integrations: 8, realTime: 8, security: 9, platforms: 8, scale: 8 },
    });
    assert(enterpriseRec.recommendedPlan.tier === "enterprise", `High complexity recommends Enterprise tier (Got: ${enterpriseRec.recommendedPlan.tier})`);
    assert(enterpriseRec.justification.length > 50, `Recommendation includes detailed justification`);
  } catch (err) {
    assert(false, `Recommendation engine test failed: ${err.message}`);
  }

  // TEST 6: AI Blueprint & Prompt Engine
  try {
    const { buildStitchPromptBlueprint } = await import("../src/lib/stitch/blueprints.ts");

    const blueprint = buildStitchPromptBlueprint({
      projectName: "Aura Health Companion",
      divisionSlug: "starx-apps",
      industrySlug: "healthcare-life-sciences",
      deviceType: "MOBILE",
      features: ["Biometric Authentication", "Live Doctor Teleconsultation", "Prescription Vault"],
      userRequirements: "Secure HIPAA compliant mobile companion for chronic patients.",
    });

    assert(blueprint.version === 2, `Blueprint version is 2`);
    assert(blueprint.prompt.includes("AURA HEALTH COMPANION"), `Prompt includes formatted project name`);
    assert(blueprint.prompt.includes("MOBILE APP VIEWPORT (390px"), `Prompt contains device specific mobile chassis directive`);
    assert(blueprint.prompt.includes("WCAG 2.1 AA"), `Prompt includes accessibility compliance standards`);
    assert(blueprint.prompt.includes("DO NOT use generic placeholder text"), `Prompt explicitly bans generic dummy text`);
    assert(blueprint.suggestedTokens.primaryColor.startsWith("#"), `Suggested primary token is valid hex color (${blueprint.suggestedTokens.primaryColor})`);
  } catch (err) {
    assert(false, `Blueprint test failed: ${err.message}`);
  }

  // TEST 7: Google Stitch MCP Direct Provider & Orchestrator Connectivity
  try {
    const { directStitchProvider } = await import("../src/lib/stitch/directProvider.ts");
    const { designStudioOrchestrator } = await import("../src/lib/stitch/jobs.ts");

    assert(directStitchProvider !== null, `Direct Stitch Provider singleton initialized`);
    assert(typeof directStitchProvider.generateDesign === "function", `Provider has generateDesign method`);
    assert(typeof directStitchProvider.editDesign === "function", `Provider has editDesign method`);
    assert(typeof directStitchProvider.uploadAssetToStorage === "function", `Provider has uploadAssetToStorage method`);
    assert(typeof directStitchProvider.createSignedUrl === "function", `Provider has createSignedUrl method`);

    assert(designStudioOrchestrator !== null, `Design Studio Orchestrator initialized`);
    assert(typeof designStudioOrchestrator.createProject === "function", `Orchestrator has createProject method`);
    assert(typeof designStudioOrchestrator.submitGenerationJob === "function", `Orchestrator has submitGenerationJob method`);
    assert(typeof designStudioOrchestrator.submitRevision === "function", `Orchestrator has submitRevision method`);
  } catch (err) {
    assert(false, `Stitch provider test failed: ${err.message}`);
  }

  console.log("================================================================================");
  console.log(`MASTER INTEGRATION TEST SUMMARY: ${passed}/${total} Passed (${Math.round((passed / total) * 100)}%)`);
  console.log("================================================================================");

  if (passed === total) {
    console.log("ALL PLATFORM CRITERIA PASSED! Ready for production promotion.");
  } else {
    throw new Error(`Integration test failure: ${total - passed} test(s) failed.`);
  }
}

runMasterIntegrationTests().catch((err) => {
  console.error("FATAL TEST SUITE ERROR:", err);
  process.exit(1);
});
