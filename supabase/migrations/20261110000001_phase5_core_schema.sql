-- ==============================================================================
-- STARX ALPHA LABS — PHASE 5 BACKEND FOUNDATION & CMS SCHEMA
-- Migration: 20261110000001_phase5_core_schema.sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. ADMINISTRATIVE MEMBERSHIP & RBAC
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.admin_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'editor')),
    status TEXT NOT NULL CHECK (status IN ('active', 'suspended')) DEFAULT 'active',
    invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_members_user_id ON public.admin_members(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_members_email ON public.admin_members(email);
CREATE INDEX IF NOT EXISTS idx_admin_members_role_status ON public.admin_members(role, status);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_admin_members_updated_at
    BEFORE UPDATE ON public.admin_members
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Security Helper Functions (SECURITY DEFINER with clean search_path)
CREATE OR REPLACE FUNCTION public.get_admin_role()
RETURNS TEXT AS $$
DECLARE
    v_role TEXT;
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN NULL;
    END IF;
    SELECT role INTO v_role
    FROM public.admin_members
    WHERE user_id = auth.uid() AND status = 'active';
    RETURN v_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.get_admin_role() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.get_admin_role() = 'owner';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.is_full_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.get_admin_role() IN ('owner', 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ==============================================================================
-- 3. CMS CONTENT TABLES
-- ==============================================================================

-- A. Services
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    short_description TEXT,
    description TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    category TEXT NOT NULL CHECK (category IN ('digital', 'systems', 'ai', 'maintenance')) DEFAULT 'digital',
    category_label TEXT DEFAULT 'STARX DIGITAL',
    division_slug TEXT NOT NULL DEFAULT 'starx-digital',
    icon TEXT,
    featured_image TEXT,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    display_order INT NOT NULL DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_status ON public.services(status);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(display_order);

CREATE TRIGGER set_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- B. Divisions
CREATE TABLE IF NOT EXISTS public.divisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    tagline TEXT,
    short_description TEXT,
    badge TEXT,
    mission TEXT,
    overview TEXT,
    capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    display_order INT NOT NULL DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_divisions_slug ON public.divisions(slug);
CREATE INDEX IF NOT EXISTS idx_divisions_status ON public.divisions(status);
CREATE INDEX IF NOT EXISTS idx_divisions_order ON public.divisions(display_order);

CREATE TRIGGER set_divisions_updated_at
    BEFORE UPDATE ON public.divisions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- C. Industries
CREATE TABLE IF NOT EXISTS public.industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    badge TEXT,
    tagline TEXT,
    overview TEXT NOT NULL,
    challenges JSONB NOT NULL DEFAULT '[]'::jsonb,
    solutions JSONB NOT NULL DEFAULT '[]'::jsonb,
    featured_capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
    recommended_services JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    display_order INT NOT NULL DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_industries_slug ON public.industries(slug);
CREATE INDEX IF NOT EXISTS idx_industries_status ON public.industries(status);
CREATE INDEX IF NOT EXISTS idx_industries_order ON public.industries(display_order);

CREATE TRIGGER set_industries_updated_at
    BEFORE UPDATE ON public.industries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- D. Portfolio Projects
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    project_type TEXT NOT NULL DEFAULT 'Architectural Demo',
    category TEXT NOT NULL CHECK (category IN ('web', 'systems', 'ai')) DEFAULT 'web',
    category_label TEXT DEFAULT 'Web & Corporate Portal',
    tagline TEXT,
    description TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    architecture_highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    demo_url TEXT,
    github_url TEXT,
    verification_badge TEXT DEFAULT 'StarX Alpha Architecture Demo',
    thumbnail TEXT,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    featured BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON public.portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON public.portfolio_projects(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON public.portfolio_projects(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON public.portfolio_projects(display_order);

CREATE TRIGGER set_portfolio_updated_at
    BEFORE UPDATE ON public.portfolio_projects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- E. Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_name TEXT NOT NULL DEFAULT 'StarX Alpha Engineering Team',
    author_role TEXT DEFAULT 'Platform Architecture',
    read_time TEXT DEFAULT '5 min read',
    category TEXT NOT NULL CHECK (category IN ('Engineering', 'Architecture', 'AI & Systems', 'Performance')) DEFAULT 'Engineering',
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_published_at ON public.blog_posts(published_at);

CREATE TRIGGER set_blog_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 4. CONVERSION & LEAD PERSISTENCE TABLES
-- ==============================================================================

-- A. General Contact Enquiries
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    source_page TEXT NOT NULL DEFAULT '/',
    status TEXT NOT NULL CHECK (status IN ('new', 'in_review', 'contacted', 'closed')) DEFAULT 'new',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON public.enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

CREATE TRIGGER set_enquiries_updated_at
    BEFORE UPDATE ON public.enquiries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- B. Project Quotation Requests
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_slug TEXT,
    budget_range TEXT,
    timeline TEXT,
    project_details TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('new', 'reviewing', 'quoted', 'declined', 'won')) DEFAULT 'new',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_status ON public.quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_email ON public.quote_requests(email);
CREATE INDEX IF NOT EXISTS idx_quote_created_at ON public.quote_requests(created_at DESC);

CREATE TRIGGER set_quote_updated_at
    BEFORE UPDATE ON public.quote_requests
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- C. Architecture Consultation Requests
CREATE TABLE IF NOT EXISTS public.consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    preferred_date DATE,
    preferred_time TEXT,
    topic TEXT,
    notes TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'rescheduled', 'completed', 'cancelled')) DEFAULT 'pending',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consultation_status ON public.consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_email ON public.consultation_requests(email);
CREATE INDEX IF NOT EXISTS idx_consultation_created_at ON public.consultation_requests(created_at DESC);

CREATE TRIGGER set_consultation_updated_at
    BEFORE UPDATE ON public.consultation_requests
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- D. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('subscribed', 'unsubscribed')) DEFAULT 'subscribed',
    consent_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON public.newsletter_subscribers(status);

-- ==============================================================================
-- 5. AUDIT LOGGING (IMMUTABLE ENTERPRISE AUDIT TRAIL)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    actor_email TEXT NOT NULL,
    actor_role TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_actor ON public.admin_audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON public.admin_audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON public.admin_audit_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON public.admin_audit_logs(created_at DESC);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across every single table
ALTER TABLE public.admin_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- RLS: admin_members
-- ------------------------------------------------------------------------------
-- Only active admin members can view admin list
CREATE POLICY "admin_members_select"
    ON public.admin_members
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- Only Owner or Admin can insert new admin members
CREATE POLICY "admin_members_insert"
    ON public.admin_members
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_full_admin());

-- Owner can update any admin member; Admin can update editors; users cannot escalate self
CREATE POLICY "admin_members_update"
    ON public.admin_members
    FOR UPDATE
    TO authenticated
    USING (
        public.is_owner()
        OR (public.is_full_admin() AND role = 'editor')
    )
    WITH CHECK (
        public.is_owner()
        OR (public.is_full_admin() AND role = 'editor')
    );

-- Only Owner can delete admin members
CREATE POLICY "admin_members_delete"
    ON public.admin_members
    FOR DELETE
    TO authenticated
    USING (public.is_owner());

-- ------------------------------------------------------------------------------
-- RLS: CMS Content Tables (services, divisions, industries, portfolio, blog)
-- ------------------------------------------------------------------------------

-- Services
CREATE POLICY "services_public_select"
    ON public.services
    FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "services_admin_insert"
    ON public.services
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "services_admin_update"
    ON public.services
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "services_admin_delete"
    ON public.services
    FOR DELETE
    TO authenticated
    USING (public.is_full_admin());

-- Divisions
CREATE POLICY "divisions_public_select"
    ON public.divisions
    FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "divisions_admin_insert"
    ON public.divisions
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "divisions_admin_update"
    ON public.divisions
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "divisions_admin_delete"
    ON public.divisions
    FOR DELETE
    TO authenticated
    USING (public.is_full_admin());

-- Industries
CREATE POLICY "industries_public_select"
    ON public.industries
    FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "industries_admin_insert"
    ON public.industries
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "industries_admin_update"
    ON public.industries
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "industries_admin_delete"
    ON public.industries
    FOR DELETE
    TO authenticated
    USING (public.is_full_admin());

-- Portfolio Projects
CREATE POLICY "portfolio_public_select"
    ON public.portfolio_projects
    FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "portfolio_admin_insert"
    ON public.portfolio_projects
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "portfolio_admin_update"
    ON public.portfolio_projects
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "portfolio_admin_delete"
    ON public.portfolio_projects
    FOR DELETE
    TO authenticated
    USING (public.is_full_admin());

-- Blog Posts
CREATE POLICY "blog_public_select"
    ON public.blog_posts
    FOR SELECT
    USING (status = 'published' OR public.is_admin());

CREATE POLICY "blog_admin_insert"
    ON public.blog_posts
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "blog_admin_update"
    ON public.blog_posts
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "blog_admin_delete"
    ON public.blog_posts
    FOR DELETE
    TO authenticated
    USING (public.is_full_admin());

-- ------------------------------------------------------------------------------
-- RLS: Submissions & Enquiries
-- (Direct client reads/writes blocked; only server-side service-role can insert; admins can read/manage)
-- ------------------------------------------------------------------------------

-- Enquiries
CREATE POLICY "enquiries_admin_select"
    ON public.enquiries
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "enquiries_admin_update"
    ON public.enquiries
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "enquiries_admin_delete"
    ON public.enquiries
    FOR DELETE
    TO authenticated
    USING (public.is_full_admin());

-- Quote Requests
CREATE POLICY "quote_requests_admin_select"
    ON public.quote_requests
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "quote_requests_admin_update"
    ON public.quote_requests
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "quote_requests_admin_delete"
    ON public.quote_requests
    FOR DELETE
    TO authenticated
    USING (public.is_full_admin());

-- Consultation Requests
CREATE POLICY "consultation_requests_admin_select"
    ON public.consultation_requests
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "consultation_requests_admin_update"
    ON public.consultation_requests
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "consultation_requests_admin_delete"
    ON public.consultation_requests
    FOR DELETE
    TO authenticated
    USING (public.is_full_admin());

-- Newsletter Subscribers
CREATE POLICY "newsletter_admin_select"
    ON public.newsletter_subscribers
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "newsletter_admin_update"
    ON public.newsletter_subscribers
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "newsletter_admin_delete"
    ON public.newsletter_subscribers
    FOR DELETE
    TO authenticated
    USING (public.is_full_admin());

-- ------------------------------------------------------------------------------
-- RLS: Admin Audit Logs
-- (Strictly append-only via service-role / authenticated admin; readable by owners & admins; never modifiable)
-- ------------------------------------------------------------------------------

CREATE POLICY "audit_logs_admin_select"
    ON public.admin_audit_logs
    FOR SELECT
    TO authenticated
    USING (public.is_full_admin());

CREATE POLICY "audit_logs_admin_insert"
    ON public.admin_audit_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

-- NO UPDATE POLICY: Audit logs are permanently immutable.
-- NO DELETE POLICY: Audit logs can never be removed via standard client/user commands.
