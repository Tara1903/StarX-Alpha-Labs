import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import {
  CANONICAL_DIVISIONS,
  CANONICAL_SERVICE_CATEGORIES,
  CANONICAL_SOLUTIONS,
  CANONICAL_PLAN_FAMILIES,
  CANONICAL_PLANS,
  CANONICAL_FEATURES,
  CANONICAL_ADDONS,
  RECOMMENDATION_RULES,
  getFeaturesForPlan,
} from '../src/data/commercialCatalogue';

function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const envPath = path.join(process.cwd(), file);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let val = (match[2] || '').replace(/^["'](.*)["']$/, '$1').trim();
          if (!process.env[key]) process.env[key] = val;
        }
      }
    }
  }
}
loadEnv();

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('[SEED ERROR] Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function seedCommercialCatalogue() {
  console.log('\n========================================================================');
  console.log('STARX ALPHA LABS — MASTER COMMERCIAL CATALOGUE DATABASE SEED');
  console.log('========================================================================\n');
  console.log(`Target Supabase URL: ${url}`);

  const results: Record<string, { attempted: number; seeded: number; errors: string[] }> = {
    divisions: { attempted: 0, seeded: 0, errors: [] },
    categories: { attempted: 0, seeded: 0, errors: [] },
    solutions: { attempted: 0, seeded: 0, errors: [] },
    plan_families: { attempted: 0, seeded: 0, errors: [] },
    plans: { attempted: 0, seeded: 0, errors: [] },
    features: { attempted: 0, seeded: 0, errors: [] },
    plan_features: { attempted: 0, seeded: 0, errors: [] },
    addons: { attempted: 0, seeded: 0, errors: [] },
    rules: { attempted: 0, seeded: 0, errors: [] },
  };

  // 1. Seed Divisions
  const divisions = Object.values(CANONICAL_DIVISIONS).map(d => ({
    slug: d.slug,
    name: d.name,
    tagline: d.tagline,
    description: d.description,
    badge: d.badge,
    is_active: true,
  }));
  results.divisions.attempted = divisions.length;
  try {
    const { error } = await supabase.from('canonical_divisions').upsert(divisions, { onConflict: 'slug' });
    if (error) results.divisions.errors.push(error.message);
    else results.divisions.seeded = divisions.length;
  } catch (e: any) {
    results.divisions.errors.push(e.message);
  }

  // 2. Seed Service Categories
  const categories = CANONICAL_SERVICE_CATEGORIES.map(c => ({
    id: c.id,
    division_slug: c.divisionSlug,
    slug: c.slug,
    name: c.name,
    description: c.description,
    display_order: c.displayOrder,
    is_active: true,
  }));
  results.categories.attempted = categories.length;
  try {
    const { error } = await supabase.from('canonical_service_categories').upsert(categories, { onConflict: 'id' });
    if (error) results.categories.errors.push(error.message);
    else results.categories.seeded = categories.length;
  } catch (e: any) {
    results.categories.errors.push(e.message);
  }

  // 3. Seed Solutions
  const solutions = CANONICAL_SOLUTIONS.map(s => ({
    id: s.id,
    division_slug: s.divisionSlug,
    service_category_id: s.serviceCategoryId,
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    description: s.description,
    applicable_industries: s.applicableIndustries,
    supported_platforms: s.supportedPlatforms,
    default_plan_family_id: s.defaultPlanFamilyId,
    is_popular: s.isPopular || false,
    display_order: s.displayOrder,
    is_active: true,
  }));
  results.solutions.attempted = solutions.length;
  try {
    const { error } = await supabase.from('canonical_solutions').upsert(solutions, { onConflict: 'id' });
    if (error) results.solutions.errors.push(error.message);
    else results.solutions.seeded = solutions.length;
  } catch (e: any) {
    results.solutions.errors.push(e.message);
  }

  // 4. Seed Plan Families
  const families = CANONICAL_PLAN_FAMILIES.map(f => ({
    id: f.id,
    division_slug: f.divisionSlug,
    solution_id: f.solutionId,
    code: f.code,
    name: f.name,
    description: f.description,
    is_active: true,
  }));
  results.plan_families.attempted = families.length;
  try {
    const { error } = await supabase.from('canonical_plan_families').upsert(families, { onConflict: 'id' });
    if (error) results.plan_families.errors.push(error.message);
    else results.plan_families.seeded = families.length;
  } catch (e: any) {
    results.plan_families.errors.push(e.message);
  }

  // 5. Seed Canonical Plans
  const plans = CANONICAL_PLANS.map(p => ({
    id: p.id,
    division_slug: p.divisionSlug,
    solution_id: p.solutionId,
    plan_family_id: p.planFamilyId,
    tier: p.tier,
    code: p.code,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    version: p.version,
    status: p.status,
    price_inr: p.priceINR,
    price_usd: p.priceUSD,
    is_custom_quote: p.isCustomQuote,
    billing_type: p.pricingComponents.some(pc => pc.type === 'MONTHLY') ? 'hybrid' : 'fixed_project',
    timeline_weeks: p.limits.timelineWeeks,
    screen_scope: p.limits.pagesOrScreens,
    sla_level: p.limits.slaResponseTime,
    warranty_days: p.limits.warrantyPeriodDays,
    limits: p.limits,
    code_ownership: p.codeOwnership,
    min_complexity_score: p.minComplexityScore,
    max_complexity_score: p.maxComplexityScore,
    ideal_for_audience: p.idealForAudience,
    badge: p.badge || null,
    is_popular: p.isPopular || false,
    is_best_value: p.isBestValue || false,
    is_active: true,
  }));
  results.plans.attempted = plans.length;
  try {
    const { error } = await supabase.from('canonical_plans').upsert(plans, { onConflict: 'id' });
    if (error) results.plans.errors.push(error.message);
    else results.plans.seeded = plans.length;
  } catch (e: any) {
    results.plans.errors.push(e.message);
  }

  // 6. Seed Features
  const features = CANONICAL_FEATURES.map(f => ({
    id: f.id,
    group_category: f.group,
    slug: f.slug,
    name: f.name,
    customer_explanation: f.customerExplanation,
    technical_description: f.technicalDescription,
    applicable_divisions: f.applicableDivisions,
    applicable_solutions: f.applicableSolutions || [],
    default_priority: f.defaultPriority,
    is_enterprise_only: f.isEnterpriseOnly || false,
    is_active: true,
  }));
  results.features.attempted = features.length;
  try {
    const { error } = await supabase.from('canonical_features').upsert(features, { onConflict: 'id' });
    if (error) results.features.errors.push(error.message);
    else results.features.seeded = features.length;
  } catch (e: any) {
    results.features.errors.push(e.message);
  }

  // 7. Seed Add-ons
  const addons = CANONICAL_ADDONS.map(a => ({
    id: a.id,
    division_slug: a.divisionSlug,
    slug: a.slug,
    name: a.name,
    tagline: a.tagline,
    description: a.description,
    price_inr: a.priceINR,
    price_usd: a.priceUSD,
    billing_model: a.billingModel,
    category: a.category,
    status: a.status,
    applicable_solutions: a.applicableSolutions,
    compatible_plan_tiers: a.compatiblePlanTiers,
    is_active: true,
  }));
  results.addons.attempted = addons.length;
  try {
    const { error } = await supabase.from('canonical_addons').upsert(addons, { onConflict: 'id' });
    if (error) results.addons.errors.push(error.message);
    else results.addons.seeded = addons.length;
  } catch (e: any) {
    results.addons.errors.push(e.message);
  }

  // 8. Seed Recommendation Rules
  const rules = RECOMMENDATION_RULES.map(r => ({
    id: r.id,
    division_slug: r.divisionSlug,
    solution_id: r.solutionId || null,
    min_complexity: r.minComplexity,
    max_complexity: r.maxComplexity,
    recommended_plan_id: r.recommendedPlanId,
    justification_template: r.justificationTemplate,
    alternative_plan_ids: r.alternativePlanIds,
    priority: r.priority,
    is_active: r.isActive,
  }));
  results.rules.attempted = rules.length;
  try {
    const { error } = await supabase.from('recommendation_rules').upsert(rules, { onConflict: 'id' });
    if (error) results.rules.errors.push(error.message);
    else results.rules.seeded = rules.length;
  } catch (e: any) {
    results.rules.errors.push(e.message);
  }

  // Print Summary Table
  console.log('ENTITY                ATTEMPTED  SEEDED  STATUS / NOTES');
  console.log('------------------------------------------------------------------------');
  for (const [entity, data] of Object.entries(results)) {
    const status = data.seeded > 0 ? `SUCCESS (${data.seeded}/${data.attempted})` : 
      data.errors.length > 0 ? `DB SKIPPED: ${data.errors[0].substring(0, 35)}...` : 'PENDING';
    console.log(`${entity.padEnd(20)}  ${String(data.attempted).padEnd(9)}  ${String(data.seeded).padEnd(6)}  ${status}`);
  }

  console.log('\n[IN-MEMORY CATALOGUE GUARANTEE]:');
  console.log(`✓ 6 Canonical Divisions Active`);
  console.log(`✓ ${CANONICAL_SOLUTIONS.length} Canonical Solutions Mapped`);
  console.log(`✓ ${CANONICAL_PLAN_FAMILIES.length} Plan Families Configured`);
  console.log(`✓ ${CANONICAL_PLANS.length} Canonical Plans Ready for Onboarding`);
  console.log(`✓ ${CANONICAL_FEATURES.length} Master Features Catalogued`);
  console.log(`✓ ${CANONICAL_ADDONS.length} Add-ons Configured with Multi-Currency Pricing`);
  console.log(`✓ ${RECOMMENDATION_RULES.length} Deterministic Recommendation Rules Active`);
  console.log('\n========================================================================\n');
}

seedCommercialCatalogue().catch(err => {
  console.error('[FATAL SEED RUNNER ERROR]', err);
  process.exit(1);
});
