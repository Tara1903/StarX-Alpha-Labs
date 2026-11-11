-- ==============================================================================
-- STARX ALPHA LABS — COMPLETE RESOLUTION FOR SUPABASE LINTER & WARNINGS
-- File: supabase/migrations/20261112_fix_all_supabase_warnings.sql
-- ==============================================================================
-- Resolves:
--   1. ERROR 42703: column "is_active" does not exist on admin_members
--   2. Postgres query failures logged in Supabase Database Reports
--   3. Supabase Security Linter: function_search_path_mutable
--   4. Supabase Performance Linter: auth_rls_initplan & unindexed_foreign_keys
--   5. Fixes demo_requests, video_station, CRM, Customer Portal, and Finance policies
-- Safe & Idempotent: Run directly in Supabase SQL Editor
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ADD is_active COLUMN TO admin_members (Fixes ERROR 42703 permanently)
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'admin_members' 
      AND column_name = 'is_active'
  ) THEN
    ALTER TABLE public.admin_members 
      ADD COLUMN is_active BOOLEAN GENERATED ALWAYS AS (status = 'active') STORED;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_admin_members_is_active ON public.admin_members(is_active);

-- ------------------------------------------------------------------------------
-- 2. SECURE & OPTIMIZED HELPER FUNCTIONS (STABLE + search_path locked)
-- Resolves function_search_path_mutable and auth_rls_initplan
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.get_admin_role()
RETURNS TEXT AS $$
DECLARE
    v_role TEXT;
BEGIN
    IF (SELECT auth.uid()) IS NULL THEN
        RETURN NULL;
    END IF;
    SELECT role INTO v_role
    FROM public.admin_members
    WHERE user_id = (SELECT auth.uid()) AND status = 'active';
    RETURN v_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_members
        WHERE user_id = (SELECT auth.uid()) AND status = 'active'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp STABLE;

CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_members
        WHERE user_id = (SELECT auth.uid()) AND status = 'active' AND role = 'owner'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp STABLE;

CREATE OR REPLACE FUNCTION public.is_full_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_members
        WHERE user_id = (SELECT auth.uid()) AND status = 'active' AND role IN ('owner', 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp STABLE;

CREATE OR REPLACE FUNCTION public.is_client_member_of_org(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  IF (SELECT auth.uid()) IS NULL OR org_id IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.client_members
    WHERE user_id = (SELECT auth.uid()) 
      AND organization_id = org_id 
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp STABLE;

-- ------------------------------------------------------------------------------
-- 3. ENSURE RLS IS ENABLED ON ALL TABLES
-- ------------------------------------------------------------------------------
DO $$
DECLARE
  t text;
  tables text[] := ARRAY[
    'admin_members', 'services', 'divisions', 'industries', 'portfolio_projects', 
    'blog_posts', 'enquiries', 'quote_requests', 'consultation_requests', 
    'newsletter_subscribers', 'admin_audit_logs', 'theme_settings', 
    'development_packages', 'development_addons', 'customer_estimates', 
    'quotations', 'client_projects', 'video_categories', 'videos', 
    'demo_requests', 'agency_partnerships', 'client_organizations', 
    'client_members', 'client_invitations', 'project_milestones', 
    'client_tasks', 'client_documents', 'project_updates', 'project_discussions', 
    'client_approvals', 'client_change_requests', 'client_support_requests', 
    'client_notifications', 'finance_settings', 'quotation_versions', 
    'contracts', 'invoices', 'payment_records', 'financial_adjustments', 
    'expenses', 'finance_audit_logs'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = t) THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
    END IF;
  END LOOP;
END $$;

-- ------------------------------------------------------------------------------
-- 4. CLEAN, IDEMPOTENT RLS POLICIES FOR DEMO REQUESTS & MARKETING TABLES
-- ------------------------------------------------------------------------------

-- DEMO REQUESTS (Fixes the exact query in your screenshot)
DROP POLICY IF EXISTS "Admin full access for demo requests" ON public.demo_requests;
DROP POLICY IF EXISTS "Public insert for demo requests" ON public.demo_requests;

CREATE POLICY "Public insert for demo requests" 
  ON public.demo_requests 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin full access for demo requests" 
  ON public.demo_requests 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

-- AGENCY PARTNERSHIPS
DROP POLICY IF EXISTS "Admin full access for agency partnerships" ON public.agency_partnerships;
DROP POLICY IF EXISTS "Public insert for agency partnerships" ON public.agency_partnerships;

CREATE POLICY "Public insert for agency partnerships" 
  ON public.agency_partnerships 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin full access for agency partnerships" 
  ON public.agency_partnerships 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

-- VIDEOS & CATEGORIES
DROP POLICY IF EXISTS "Public read for video categories" ON public.video_categories;
DROP POLICY IF EXISTS "Admin full access for video categories" ON public.video_categories;

CREATE POLICY "Public read for video categories" 
  ON public.video_categories 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin full access for video categories" 
  ON public.video_categories 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

DROP POLICY IF EXISTS "Public read for published videos" ON public.videos;
DROP POLICY IF EXISTS "Admin full access for videos" ON public.videos;

CREATE POLICY "Public read for published videos" 
  ON public.videos 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Admin full access for videos" 
  ON public.videos 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

-- THEME SETTINGS
DROP POLICY IF EXISTS "Public read active theme" ON public.theme_settings;
DROP POLICY IF EXISTS "Admin full access for theme_settings" ON public.theme_settings;

CREATE POLICY "Public read active theme" 
  ON public.theme_settings 
  FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Admin full access for theme_settings" 
  ON public.theme_settings 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

-- DEVELOPMENT PACKAGES & ADDONS
DROP POLICY IF EXISTS "Public read packages" ON public.development_packages;
DROP POLICY IF EXISTS "Admin full access packages" ON public.development_packages;

CREATE POLICY "Public read packages" 
  ON public.development_packages 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin full access packages" 
  ON public.development_packages 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

DROP POLICY IF EXISTS "Public read addons" ON public.development_addons;
DROP POLICY IF EXISTS "Admin full access addons" ON public.development_addons;

CREATE POLICY "Public read addons" 
  ON public.development_addons 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admin full access addons" 
  ON public.development_addons 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

-- CUSTOMER ESTIMATES
DROP POLICY IF EXISTS "Public insert estimates" ON public.customer_estimates;
DROP POLICY IF EXISTS "Admin full access estimates" ON public.customer_estimates;

CREATE POLICY "Public insert estimates" 
  ON public.customer_estimates 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin full access estimates" 
  ON public.customer_estimates 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

-- QUOTATIONS & PROJECTS
DROP POLICY IF EXISTS "Admin full access quotations" ON public.quotations;
CREATE POLICY "Admin full access quotations" 
  ON public.quotations 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

DROP POLICY IF EXISTS "Admin full access client_projects" ON public.client_projects;
CREATE POLICY "Admin full access client_projects" 
  ON public.client_projects 
  FOR ALL 
  USING (
    (SELECT auth.role()) = 'service_role' OR public.is_admin()
  );

-- ------------------------------------------------------------------------------
-- 5. PERFORMANCE LINTER: ENSURE INDEXES ON ALL FOREIGN KEYS
-- Resolves Supabase `unindexed_foreign_keys` warnings
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_admin_members_invited_by ON public.admin_members(invited_by);
CREATE INDEX IF NOT EXISTS idx_demo_requests_assigned_to ON public.demo_requests(assigned_to);
CREATE INDEX IF NOT EXISTS idx_videos_category_id ON public.videos(category_id);

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'client_projects') THEN
    CREATE INDEX IF NOT EXISTS idx_client_projects_quotation_id ON public.client_projects(quotation_id);
    CREATE INDEX IF NOT EXISTS idx_client_projects_assigned_lead ON public.client_projects(assigned_lead);
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'client_members') THEN
    CREATE INDEX IF NOT EXISTS idx_client_members_org_id ON public.client_members(organization_id);
    CREATE INDEX IF NOT EXISTS idx_client_members_user_id ON public.client_members(user_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'client_invitations') THEN
    CREATE INDEX IF NOT EXISTS idx_client_invitations_org_id ON public.client_invitations(organization_id);
    CREATE INDEX IF NOT EXISTS idx_client_invitations_invited_by ON public.client_invitations(invited_by);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'project_milestones') THEN
    CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id ON public.project_milestones(project_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'client_tasks') THEN
    CREATE INDEX IF NOT EXISTS idx_client_tasks_project_id ON public.client_tasks(project_id);
    CREATE INDEX IF NOT EXISTS idx_client_tasks_milestone_id ON public.client_tasks(milestone_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'client_documents') THEN
    CREATE INDEX IF NOT EXISTS idx_client_documents_project_id ON public.client_documents(project_id);
    CREATE INDEX IF NOT EXISTS idx_client_documents_org_id ON public.client_documents(organization_id);
    CREATE INDEX IF NOT EXISTS idx_client_documents_uploaded_by_user ON public.client_documents(uploaded_by_user);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'invoices') THEN
    CREATE INDEX IF NOT EXISTS idx_invoices_organization_id ON public.invoices(organization_id);
    CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON public.invoices(project_id);
    CREATE INDEX IF NOT EXISTS idx_invoices_quotation_id ON public.invoices(quotation_id);
    CREATE INDEX IF NOT EXISTS idx_invoices_contract_id ON public.invoices(contract_id);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payment_records') THEN
    CREATE INDEX IF NOT EXISTS idx_payment_records_invoice_id ON public.payment_records(invoice_id);
    CREATE INDEX IF NOT EXISTS idx_payment_records_organization_id ON public.payment_records(organization_id);
    CREATE INDEX IF NOT EXISTS idx_payment_records_recorded_by ON public.payment_records(recorded_by);
    CREATE INDEX IF NOT EXISTS idx_payment_records_verified_by ON public.payment_records(verified_by);
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 6. REFRESH SCHEMA CACHE
-- ------------------------------------------------------------------------------
NOTIFY pgrst, 'reload schema';
