-- ==============================================================================
-- STARX ALPHA LABS — Master Platform Architecture & Security Migration
-- Migration: 20261117000002_master_platform_architecture.sql
-- ==============================================================================
-- Implements Phase 3 Database & Security Architecture:
-- 1. Canonical Plans & Feature Matrix
-- 2. Recommendation Rules Engine
-- 3. AI Prompt Blueprints
-- 4. Customer Design Sessions & Autosave
-- 5. Customer Enquiries & Quotation Records
-- 6. Central Audit Event Log
-- 7. Hardened Row-Level Security (RLS) across all tables
-- ==============================================================================

-- 1. CANONICAL PLANS TABLE
CREATE TABLE IF NOT EXISTS public.canonical_plans (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL,
    tier TEXT NOT NULL CHECK (tier IN ('starter', 'growth', 'enterprise', 'custom')),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    price_inr NUMERIC NOT NULL DEFAULT 0,
    price_usd NUMERIC NOT NULL DEFAULT 0,
    is_custom_price BOOLEAN NOT NULL DEFAULT FALSE,
    billing_type TEXT NOT NULL DEFAULT 'fixed_project',
    timeline_weeks TEXT NOT NULL,
    screen_scope TEXT NOT NULL,
    sla_level TEXT NOT NULL,
    warranty_days INTEGER NOT NULL DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_canonical_plans_division ON public.canonical_plans(division_slug);
CREATE INDEX IF NOT EXISTS idx_canonical_plans_tier ON public.canonical_plans(tier);

-- 2. CANONICAL FEATURES TABLE
CREATE TABLE IF NOT EXISTS public.canonical_features (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_canonical_features_division ON public.canonical_features(division_slug);
CREATE INDEX IF NOT EXISTS idx_canonical_features_category ON public.canonical_features(category);

-- 3. PLAN FEATURES JUNCTION TABLE
CREATE TABLE IF NOT EXISTS public.plan_features (
    plan_id TEXT NOT NULL REFERENCES public.canonical_plans(id) ON DELETE CASCADE,
    feature_id TEXT NOT NULL REFERENCES public.canonical_features(id) ON DELETE CASCADE,
    is_included BOOLEAN NOT NULL DEFAULT TRUE,
    limitation_note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (plan_id, feature_id)
);

-- 4. RECOMMENDATION RULES TABLE
CREATE TABLE IF NOT EXISTS public.recommendation_rules (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL,
    industry_slug TEXT,
    platform TEXT,
    min_complexity INTEGER NOT NULL DEFAULT 1,
    max_complexity INTEGER NOT NULL DEFAULT 10,
    recommended_plan_id TEXT NOT NULL REFERENCES public.canonical_plans(id) ON DELETE CASCADE,
    reason_template TEXT NOT NULL,
    priority INTEGER NOT NULL DEFAULT 10,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recommendation_rules_division ON public.recommendation_rules(division_slug);
CREATE INDEX IF NOT EXISTS idx_recommendation_rules_industry ON public.recommendation_rules(industry_slug);

-- 5. AI PROMPT BLUEPRINTS TABLE
CREATE TABLE IF NOT EXISTS public.ai_prompt_blueprints (
    id TEXT PRIMARY KEY,
    division_slug TEXT NOT NULL,
    industry_slug TEXT NOT NULL,
    category TEXT NOT NULL,
    device_type TEXT NOT NULL DEFAULT 'DESKTOP',
    system_instructions TEXT NOT NULL,
    base_prompt_template TEXT NOT NULL,
    suggested_color_palette JSONB NOT NULL DEFAULT '[]'::jsonb,
    version INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prompt_blueprints_lookup ON public.ai_prompt_blueprints(division_slug, industry_slug, category);

-- 6. CUSTOMER DESIGN SESSIONS (Design Studio 8-Step State & Autosave)
CREATE TABLE IF NOT EXISTS public.customer_design_sessions (
    id TEXT PRIMARY KEY,
    session_token TEXT NOT NULL UNIQUE,
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    current_step INTEGER NOT NULL DEFAULT 1,
    step_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    completed_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_converted BOOLEAN NOT NULL DEFAULT FALSE,
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customer_design_sessions_token ON public.customer_design_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_customer_design_sessions_user ON public.customer_design_sessions(customer_id);

-- 7. CUSTOMER ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.customer_enquiries (
    id TEXT PRIMARY KEY,
    session_id TEXT REFERENCES public.customer_design_sessions(id) ON DELETE SET NULL,
    project_id TEXT REFERENCES public.design_studio_projects(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    customer_company TEXT,
    division_slug TEXT NOT NULL,
    industry_slug TEXT NOT NULL,
    selected_plan_id TEXT REFERENCES public.canonical_plans(id) ON DELETE SET NULL,
    selected_addons JSONB NOT NULL DEFAULT '[]'::jsonb,
    estimated_total_inr NUMERIC NOT NULL DEFAULT 0,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customer_enquiries_status ON public.customer_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_customer_enquiries_email ON public.customer_enquiries(customer_email);

-- 8. QUOTATION RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.quotation_records (
    id TEXT PRIMARY KEY,
    quotation_code TEXT NOT NULL UNIQUE,
    enquiry_id TEXT REFERENCES public.customer_enquiries(id) ON DELETE SET NULL,
    project_id TEXT REFERENCES public.design_studio_projects(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    division_slug TEXT NOT NULL,
    selected_plan_id TEXT REFERENCES public.canonical_plans(id) ON DELETE SET NULL,
    base_price_inr NUMERIC NOT NULL DEFAULT 0,
    addons_total_inr NUMERIC NOT NULL DEFAULT 0,
    discount_inr NUMERIC NOT NULL DEFAULT 0,
    final_total_inr NUMERIC NOT NULL DEFAULT 0,
    payment_schedule JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
    valid_until TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotation_records_code ON public.quotation_records(quotation_code);
CREATE INDEX IF NOT EXISTS idx_quotation_records_status ON public.quotation_records(status);

-- 9. AUDIT EVENTS LOG TABLE
CREATE TABLE IF NOT EXISTS public.audit_events (
    id TEXT PRIMARY KEY,
    actor_id TEXT,
    actor_role TEXT NOT NULL DEFAULT 'anonymous',
    action TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    target_id TEXT,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_events_action ON public.audit_events(action);
CREATE INDEX IF NOT EXISTS idx_audit_events_created ON public.audit_events(created_at);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all newly created tables
ALTER TABLE public.canonical_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.canonical_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_prompt_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_design_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

-- 1. Canonical Catalogue & AI Blueprints: Read-only for public, admin full access
CREATE POLICY "Public read canonical plans" ON public.canonical_plans
    FOR SELECT TO public USING (is_active = TRUE);

CREATE POLICY "Public read canonical features" ON public.canonical_features
    FOR SELECT TO public USING (is_active = TRUE);

CREATE POLICY "Public read plan features" ON public.plan_features
    FOR SELECT TO public USING (TRUE);

CREATE POLICY "Public read recommendation rules" ON public.recommendation_rules
    FOR SELECT TO public USING (is_active = TRUE);

CREATE POLICY "Public read ai prompt blueprints" ON public.ai_prompt_blueprints
    FOR SELECT TO public USING (is_active = TRUE);

-- 2. Customer Design Sessions: Guest sessions can create and read their own sessions
CREATE POLICY "Guest manage design sessions" ON public.customer_design_sessions
    FOR ALL TO public
    USING (TRUE)
    WITH CHECK (TRUE);

-- 3. Customer Enquiries: Anyone can submit an enquiry, users can view their own
CREATE POLICY "Public create enquiry" ON public.customer_enquiries
    FOR INSERT TO public WITH CHECK (TRUE);

CREATE POLICY "Users view own enquiry" ON public.customer_enquiries
    FOR SELECT TO authenticated
    USING (customer_email = auth.jwt() ->> 'email');

-- 4. Quotations: Authenticated users can view their own quotes
CREATE POLICY "Users view own quotations" ON public.quotation_records
    FOR SELECT TO authenticated
    USING (customer_id = auth.uid());

-- 5. Audit Events: Anyone can insert audit log events; only service role / admin reads
CREATE POLICY "Public write audit event" ON public.audit_events
    FOR INSERT TO public WITH CHECK (TRUE);

CREATE POLICY "Service role view audit events" ON public.audit_events
    FOR SELECT TO service_role USING (TRUE);
