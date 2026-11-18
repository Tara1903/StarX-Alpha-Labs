-- ==============================================================================
-- STARX ALPHA LABS — MASTER COMMERCIAL CATALOGUE & PRICING ENGINE MIGRATION
-- Migration: 20261118000001_commercial_catalogue_engine.sql
-- ==============================================================================
-- Implements the authoritative database schema for:
-- 1. Canonical Divisions & Service Categories
-- 2. Solutions & Plan Families
-- 3. Canonical Plans & Multi-Component Pricing
-- 4. Master Feature Catalogue & Plan-Feature Matrix
-- 5. Add-ons & Compatibility Rules
-- 6. Recommendation Rules Engine
-- 7. Catalogue Audit Logs & Row-Level Security
-- ==============================================================================

-- 1. CANONICAL DIVISIONS TABLE
CREATE TABLE IF NOT EXISTS public.canonical_divisions (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    badge TEXT NOT NULL DEFAULT 'Core Division',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CANONICAL SERVICE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.canonical_service_categories (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL REFERENCES public.canonical_divisions(slug) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cat_service_division ON public.canonical_service_categories(division_slug);

-- 3. CANONICAL SOLUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.canonical_solutions (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL REFERENCES public.canonical_divisions(slug) ON DELETE CASCADE,
    service_category_id TEXT NOT NULL REFERENCES public.canonical_service_categories(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    applicable_industries JSONB NOT NULL DEFAULT '[]'::jsonb,
    supported_platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
    default_plan_family_id TEXT,
    is_popular BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cat_solutions_division ON public.canonical_solutions(division_slug);
CREATE INDEX IF NOT EXISTS idx_cat_solutions_slug ON public.canonical_solutions(slug);

-- 4. CANONICAL PLAN FAMILIES TABLE
CREATE TABLE IF NOT EXISTS public.canonical_plan_families (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL REFERENCES public.canonical_divisions(slug) ON DELETE CASCADE,
    solution_id TEXT NOT NULL REFERENCES public.canonical_solutions(id) ON DELETE CASCADE,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cat_families_solution ON public.canonical_plan_families(solution_id);

-- 5. CANONICAL PLANS TABLE (Upgraded with Solution ID & Multi-Component Pricing)
CREATE TABLE IF NOT EXISTS public.canonical_plans (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL REFERENCES public.canonical_divisions(slug) ON DELETE CASCADE,
    solution_id TEXT REFERENCES public.canonical_solutions(id) ON DELETE SET NULL,
    plan_family_id TEXT REFERENCES public.canonical_plan_families(id) ON DELETE SET NULL,
    tier TEXT NOT NULL CHECK (tier IN ('starter', 'growth', 'professional', 'enterprise', 'custom')),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'INTERNAL_REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED')),
    price_inr NUMERIC NOT NULL DEFAULT 0,
    price_usd NUMERIC NOT NULL DEFAULT 0,
    is_custom_quote BOOLEAN NOT NULL DEFAULT FALSE,
    billing_type TEXT NOT NULL DEFAULT 'fixed_project',
    timeline_weeks TEXT NOT NULL,
    screen_scope TEXT NOT NULL,
    sla_level TEXT NOT NULL,
    warranty_days INTEGER NOT NULL DEFAULT 30,
    limits JSONB NOT NULL DEFAULT '{}'::jsonb,
    code_ownership TEXT NOT NULL DEFAULT '100% Intellectual Property & Transfer',
    min_complexity_score INTEGER NOT NULL DEFAULT 1,
    max_complexity_score INTEGER NOT NULL DEFAULT 10,
    ideal_for_audience JSONB NOT NULL DEFAULT '[]'::jsonb,
    badge TEXT,
    is_popular BOOLEAN NOT NULL DEFAULT FALSE,
    is_best_value BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cat_plans_division ON public.canonical_plans(division_slug);
CREATE INDEX IF NOT EXISTS idx_cat_plans_solution ON public.canonical_plans(solution_id);
CREATE INDEX IF NOT EXISTS idx_cat_plans_tier ON public.canonical_plans(tier);
CREATE INDEX IF NOT EXISTS idx_cat_plans_status ON public.canonical_plans(status);

-- 6. CANONICAL FEATURES TABLE
CREATE TABLE IF NOT EXISTS public.canonical_features (
    id TEXT PRIMARY KEY,
    group_category TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    customer_explanation TEXT NOT NULL,
    technical_description TEXT NOT NULL,
    applicable_divisions JSONB NOT NULL DEFAULT '[]'::jsonb,
    applicable_solutions JSONB NOT NULL DEFAULT '[]'::jsonb,
    default_priority TEXT NOT NULL DEFAULT 'must_have' CHECK (default_priority IN ('must_have', 'important', 'nice_to_have')),
    is_enterprise_only BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cat_features_group ON public.canonical_features(group_category);
CREATE INDEX IF NOT EXISTS idx_cat_features_slug ON public.canonical_features(slug);

-- 7. PLAN FEATURES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS public.plan_features (
    plan_id TEXT NOT NULL REFERENCES public.canonical_plans(id) ON DELETE CASCADE,
    feature_id TEXT NOT NULL REFERENCES public.canonical_features(id) ON DELETE CASCADE,
    classification TEXT NOT NULL DEFAULT 'INCLUDED' CHECK (classification IN ('INCLUDED', 'OPTIONAL_ADDON', 'HIGHER_TIER_ONLY', 'CUSTOM_ENGINEERING', 'UNSUPPORTED')),
    custom_limitation TEXT,
    required_addon_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (plan_id, feature_id)
);

CREATE INDEX IF NOT EXISTS idx_plan_features_plan ON public.plan_features(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_features_feat ON public.plan_features(feature_id);

-- 8. CANONICAL ADD-ONS TABLE
CREATE TABLE IF NOT EXISTS public.canonical_addons (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL REFERENCES public.canonical_divisions(slug) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    price_inr NUMERIC NOT NULL DEFAULT 0,
    price_usd NUMERIC NOT NULL DEFAULT 0,
    billing_model TEXT NOT NULL DEFAULT 'ONE_TIME' CHECK (billing_model IN ('ONE_TIME', 'MONTHLY', 'QUARTERLY', 'ANNUAL')),
    category TEXT NOT NULL DEFAULT 'feature',
    status TEXT NOT NULL DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'INTERNAL_REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED')),
    applicable_solutions JSONB NOT NULL DEFAULT '[]'::jsonb,
    compatible_plan_tiers JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cat_addons_division ON public.canonical_addons(division_slug);

-- 9. PRICING COMPONENTS TABLE
CREATE TABLE IF NOT EXISTS public.pricing_components (
    id TEXT PRIMARY KEY,
    plan_id TEXT REFERENCES public.canonical_plans(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'ONE_TIME',
    amount_inr NUMERIC NOT NULL DEFAULT 0,
    amount_usd NUMERIC NOT NULL DEFAULT 0,
    unit_label TEXT,
    is_optional BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pricing_comp_plan ON public.pricing_components(plan_id);

-- 10. RECOMMENDATION RULES TABLE
CREATE TABLE IF NOT EXISTS public.recommendation_rules (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL REFERENCES public.canonical_divisions(slug) ON DELETE CASCADE,
    solution_id TEXT REFERENCES public.canonical_solutions(id) ON DELETE CASCADE,
    industry_slug TEXT,
    min_complexity INTEGER NOT NULL DEFAULT 1,
    max_complexity INTEGER NOT NULL DEFAULT 10,
    recommended_plan_id TEXT NOT NULL REFERENCES public.canonical_plans(id) ON DELETE CASCADE,
    justification_template TEXT NOT NULL,
    alternative_plan_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    priority INTEGER NOT NULL DEFAULT 10,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rec_rules_division ON public.recommendation_rules(division_slug);
CREATE INDEX IF NOT EXISTS idx_rec_rules_solution ON public.recommendation_rules(solution_id);

-- 11. CATALOGUE AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.catalogue_audit_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL,
    previous_value JSONB,
    new_value JSONB NOT NULL,
    performed_by_email TEXT NOT NULL,
    approval_reference TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cat_audit_entity ON public.catalogue_audit_logs(entity_type, entity_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.canonical_divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_plan_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalogue_audit_logs ENABLE ROW LEVEL SECURITY;

-- Public Read for Published & Active Entities
CREATE POLICY "Public can view active divisions" ON public.canonical_divisions FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view active categories" ON public.canonical_service_categories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view active solutions" ON public.canonical_solutions FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view active plan families" ON public.canonical_plan_families FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view published plans" ON public.canonical_plans FOR SELECT USING (status = 'PUBLISHED' AND is_active = TRUE);
CREATE POLICY "Public can view active features" ON public.canonical_features FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view plan features" ON public.plan_features FOR SELECT USING (TRUE);
CREATE POLICY "Public can view published addons" ON public.canonical_addons FOR SELECT USING (status = 'PUBLISHED' AND is_active = TRUE);
CREATE POLICY "Public can view pricing components" ON public.pricing_components FOR SELECT USING (TRUE);
CREATE POLICY "Public can view active recommendation rules" ON public.recommendation_rules FOR SELECT USING (is_active = TRUE);

-- Admin Full Access Policies
CREATE POLICY "Admins have full access to divisions" ON public.canonical_divisions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to categories" ON public.canonical_service_categories FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to solutions" ON public.canonical_solutions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to plan families" ON public.canonical_plan_families FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to plans" ON public.canonical_plans FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to features" ON public.canonical_features FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to plan features" ON public.plan_features FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to addons" ON public.canonical_addons FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to pricing components" ON public.pricing_components FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to recommendation rules" ON public.recommendation_rules FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admins have full access to audit logs" ON public.catalogue_audit_logs FOR ALL USING (auth.role() = 'service_role');
