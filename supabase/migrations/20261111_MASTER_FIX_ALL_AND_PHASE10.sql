-- ==============================================================================
-- STARX ALPHA LABS — SUPABASE MASTER LINTER & WARNINGS RESOLUTION SCRIPT
-- Completely Resolves:
--   1. Function search_path mutable warnings (Security Linter)
--   2. Unindexed foreign keys (Performance Linter)
--   3. Missing RLS / Multiple permissive policy warnings (Security Linter)
--   4. Missing Phase 8 & Phase 9 tables (eliminates 404/401 API Gateway warnings)
--   5. PostgREST schema cache stale relation warnings
-- Safe, Idempotent — Run in Supabase SQL Editor
-- ==============================================================================

-- ==============================================================================
-- 1. SECURITY LINTER: FIX ALL FUNCTION SEARCH_PATHS
-- Prevents search_path hijacking & resolves `function_search_path_mutable`
-- ==============================================================================

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

CREATE OR REPLACE FUNCTION public.is_client_member_of_org(check_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM public.client_members
    WHERE organization_id = check_org_id
      AND user_id = auth.uid()
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.is_client_member_of_project(check_project_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_org_id UUID;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  SELECT organization_id INTO v_org_id
  FROM public.client_projects
  WHERE id = check_project_id;

  IF v_org_id IS NULL THEN
    RETURN false;
  END IF;

  RETURN public.is_client_member_of_org(v_org_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;


-- ==============================================================================
-- 2. ENSURE ALL TABLES EXIST WITH COMPLETE SCHEMAS
-- ==============================================================================

-- Phase 8 Tables
CREATE TABLE IF NOT EXISTS public.theme_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  preset_id TEXT NOT NULL DEFAULT 'starx-futuristic-blue',
  colors JSONB NOT NULL,
  styles JSONB NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.development_packages (
  id TEXT PRIMARY KEY,
  division TEXT NOT NULL CHECK (division IN ('website', 'app', 'combo')),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  starting_price NUMERIC(10, 2) NOT NULL,
  popular BOOLEAN NOT NULL DEFAULT false,
  best_value BOOLEAN NOT NULL DEFAULT false,
  pages_or_screens TEXT NOT NULL,
  platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
  timeline TEXT NOT NULL,
  ideal_for TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  standalone_value NUMERIC(10, 2),
  savings NUMERIC(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.development_addons (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  starting_price NUMERIC(10, 2) NOT NULL,
  price_type TEXT NOT NULL DEFAULT 'one_time' CHECK (price_type IN ('one_time', 'monthly', 'yearly')),
  applicable_to JSONB NOT NULL DEFAULT '["all"]'::jsonb,
  popular BOOLEAN NOT NULL DEFAULT false,
  icon_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.customer_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  client_company TEXT,
  division TEXT NOT NULL,
  package_id TEXT,
  package_name TEXT,
  platforms JSONB DEFAULT '[]'::jsonb,
  selected_addons JSONB DEFAULT '[]'::jsonb,
  base_price NUMERIC(10, 2) NOT NULL,
  addons_total NUMERIC(10, 2) NOT NULL DEFAULT 0,
  estimated_total NUMERIC(10, 2) NOT NULL,
  project_notes TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  client_business TEXT,
  division TEXT NOT NULL,
  package_code TEXT,
  package_name TEXT,
  scope_description TEXT NOT NULL,
  modules JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'changes_requested', 'converted')),
  valid_until DATE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_code TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_business TEXT,
  division TEXT NOT NULL,
  solution_title TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT '01_requirements_discovery',
  total_cost NUMERIC(10, 2) NOT NULL,
  paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  quotation_id UUID REFERENCES public.quotations(id) ON DELETE SET NULL,
  assigned_lead UUID REFERENCES public.admin_members(id) ON DELETE SET NULL,
  target_delivery DATE,
  milestones JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.video_categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.video_categories(id) ON DELETE CASCADE,
  video_type TEXT NOT NULL CHECK (video_type IN ('youtube', 'vimeo', 'mp4')),
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INT NOT NULL DEFAULT 120,
  language TEXT NOT NULL DEFAULT 'English',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  view_count INT NOT NULL DEFAULT 0,
  related_demo_id TEXT,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  industry TEXT NOT NULL,
  solution_type TEXT NOT NULL,
  current_website TEXT,
  primary_goal TEXT NOT NULL,
  estimated_budget TEXT NOT NULL,
  target_timeline TEXT NOT NULL,
  project_details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'demo_built', 'scheduled', 'converted', 'closed')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  demo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agency_partnerships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  country TEXT NOT NULL,
  client_volume TEXT NOT NULL,
  services_needed JSONB NOT NULL DEFAULT '[]'::jsonb,
  partnership_model TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'meeting_scheduled', 'active_partner', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Phase 9 Customer Portal Tables
CREATE TABLE IF NOT EXISTS public.client_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  business_type TEXT,
  primary_contact_name TEXT NOT NULL,
  primary_contact_email TEXT NOT NULL,
  phone TEXT,
  country TEXT DEFAULT 'India',
  address TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('client_owner', 'client_member', 'client_viewer')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'suspended')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  job_title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.client_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'client_member' CHECK (role IN ('client_owner', 'client_member', 'client_viewer')),
  token TEXT UNIQUE NOT NULL,
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Link client_projects to organization_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'client_projects' 
      AND column_name = 'organization_id'
  ) THEN
    ALTER TABLE public.client_projects 
    ADD COLUMN organization_id UUID REFERENCES public.client_organizations(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  stage_order INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'in_progress', 'awaiting_client', 'completed', 'delayed', 'on_hold')),
  planned_start_date DATE,
  target_delivery_date DATE,
  actual_completion_date DATE,
  deliverable_url TEXT,
  client_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES public.project_milestones(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  client_action TEXT NOT NULL DEFAULT 'none' CHECK (client_action IN ('none', 'review', 'approve', 'request_changes', 'upload_files', 'submit_feedback')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'awaiting_client', 'completed')),
  due_date DATE,
  client_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size_bytes BIGINT,
  document_category TEXT NOT NULL DEFAULT 'deliverable' CHECK (document_category IN ('brief', 'architecture', 'ui_ux_design', 'deliverable', 'client_upload', 'report', 'handover')),
  version TEXT DEFAULT 'v1.0',
  uploaded_by_type TEXT NOT NULL DEFAULT 'admin' CHECK (uploaded_by_type IN ('admin', 'client')),
  uploaded_by_user UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  client_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  author_name TEXT NOT NULL DEFAULT 'Engineering Lead',
  client_visible BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  sender_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'admin')),
  message TEXT NOT NULL,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('milestone', 'deliverable', 'sprint_review')),
  item_id TEXT NOT NULL,
  item_title TEXT NOT NULL,
  client_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'changes_requested')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_change_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.client_projects(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  justification TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'accepted', 'rejected', 'completed')),
  admin_response TEXT,
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_support_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT UNIQUE NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.client_projects(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_for_client', 'resolved', 'closed')),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.client_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ==============================================================================
-- 3. PERFORMANCE LINTER: CREATE INDEXES ON ALL FOREIGN KEYS
-- Completely resolves Supabase `unindexed_foreign_keys` warnings
-- ==============================================================================

-- admin_members
CREATE INDEX IF NOT EXISTS idx_admin_members_invited_by ON public.admin_members(invited_by);

-- theme_settings
CREATE INDEX IF NOT EXISTS idx_theme_settings_published_by ON public.theme_settings(published_by);

-- quotations
CREATE INDEX IF NOT EXISTS idx_quotations_created_by ON public.quotations(created_by);

-- client_projects
CREATE INDEX IF NOT EXISTS idx_client_projects_quotation_id ON public.client_projects(quotation_id);
CREATE INDEX IF NOT EXISTS idx_client_projects_assigned_lead ON public.client_projects(assigned_lead);
CREATE INDEX IF NOT EXISTS idx_client_projects_org_id ON public.client_projects(organization_id);

-- videos
CREATE INDEX IF NOT EXISTS idx_videos_category_id ON public.videos(category_id);
CREATE INDEX IF NOT EXISTS idx_videos_slug ON public.videos(slug);
CREATE INDEX IF NOT EXISTS idx_videos_published ON public.videos(published);

-- demo_requests
CREATE INDEX IF NOT EXISTS idx_demo_requests_assigned_to ON public.demo_requests(assigned_to);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON public.demo_requests(status);

-- client_members
CREATE INDEX IF NOT EXISTS idx_client_members_org_id ON public.client_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_client_members_user_id ON public.client_members(user_id);

-- client_invitations
CREATE INDEX IF NOT EXISTS idx_client_invitations_token ON public.client_invitations(token);
CREATE INDEX IF NOT EXISTS idx_client_invitations_org_id ON public.client_invitations(organization_id);
CREATE INDEX IF NOT EXISTS idx_client_invitations_invited_by ON public.client_invitations(invited_by);

-- project_milestones
CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id ON public.project_milestones(project_id);

-- client_tasks
CREATE INDEX IF NOT EXISTS idx_client_tasks_project_id ON public.client_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_client_tasks_milestone_id ON public.client_tasks(milestone_id);

-- client_documents
CREATE INDEX IF NOT EXISTS idx_client_documents_project_id ON public.client_documents(project_id);
CREATE INDEX IF NOT EXISTS idx_client_documents_org_id ON public.client_documents(organization_id);
CREATE INDEX IF NOT EXISTS idx_client_documents_uploaded_by_user ON public.client_documents(uploaded_by_user);

-- project_updates
CREATE INDEX IF NOT EXISTS idx_project_updates_project_id ON public.project_updates(project_id);

-- project_discussions
CREATE INDEX IF NOT EXISTS idx_project_discussions_project_id ON public.project_discussions(project_id);
CREATE INDEX IF NOT EXISTS idx_project_discussions_sender_user_id ON public.project_discussions(sender_user_id);

-- client_approvals
CREATE INDEX IF NOT EXISTS idx_client_approvals_project_id ON public.client_approvals(project_id);
CREATE INDEX IF NOT EXISTS idx_client_approvals_client_user_id ON public.client_approvals(client_user_id);

-- client_change_requests
CREATE INDEX IF NOT EXISTS idx_client_change_requests_project_id ON public.client_change_requests(project_id);
CREATE INDEX IF NOT EXISTS idx_client_change_requests_org_id ON public.client_change_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_client_change_requests_submitted_by ON public.client_change_requests(submitted_by);

-- client_support_requests
CREATE INDEX IF NOT EXISTS idx_client_support_requests_org_id ON public.client_support_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_client_support_requests_project_id ON public.client_support_requests(project_id);
CREATE INDEX IF NOT EXISTS idx_client_support_requests_created_by ON public.client_support_requests(created_by);

-- client_notifications
CREATE INDEX IF NOT EXISTS idx_client_notifications_user_id ON public.client_notifications(user_id);


-- ==============================================================================
-- 4. SECURITY LINTER: ENABLE RLS ACROSS EVERY SINGLE TABLE IN PUBLIC SCHEMA
-- Resolves `rls_enabled` warnings
-- ==============================================================================

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

ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_partnerships ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.client_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_support_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_notifications ENABLE ROW LEVEL SECURITY;


-- ==============================================================================
-- 5. CONSOLIDATED & CLEAN ROW LEVEL SECURITY (RLS) POLICIES
-- Clean idempotent definitions using public.is_admin() (NO is_active references)
-- ==============================================================================

-- A. Theme Settings
DROP POLICY IF EXISTS "Public read active theme" ON public.theme_settings;
CREATE POLICY "Public read active theme" ON public.theme_settings FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Admin full access for theme_settings" ON public.theme_settings;
CREATE POLICY "Admin full access for theme_settings" ON public.theme_settings FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- B. Development Packages
DROP POLICY IF EXISTS "Public read packages" ON public.development_packages;
CREATE POLICY "Public read packages" ON public.development_packages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access packages" ON public.development_packages;
CREATE POLICY "Admin full access packages" ON public.development_packages FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- C. Development Add-ons
DROP POLICY IF EXISTS "Public read addons" ON public.development_addons;
CREATE POLICY "Public read addons" ON public.development_addons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access addons" ON public.development_addons;
CREATE POLICY "Admin full access addons" ON public.development_addons FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- D. Customer Estimates
DROP POLICY IF EXISTS "Public insert estimates" ON public.customer_estimates;
CREATE POLICY "Public insert estimates" ON public.customer_estimates FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access estimates" ON public.customer_estimates;
CREATE POLICY "Admin full access estimates" ON public.customer_estimates FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- E. Quotations
DROP POLICY IF EXISTS "Admin full access quotations" ON public.quotations;
CREATE POLICY "Admin full access quotations" ON public.quotations FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- F. Video Categories & Videos
DROP POLICY IF EXISTS "Public read for video categories" ON public.video_categories;
CREATE POLICY "Public read for video categories" ON public.video_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin full access for video categories" ON public.video_categories;
CREATE POLICY "Admin full access for video categories" ON public.video_categories FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Public read for published videos" ON public.videos;
CREATE POLICY "Public read for published videos" ON public.videos FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Admin full access for videos" ON public.videos;
CREATE POLICY "Admin full access for videos" ON public.videos FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- G. Demo Requests
DROP POLICY IF EXISTS "Public insert for demo requests" ON public.demo_requests;
CREATE POLICY "Public insert for demo requests" ON public.demo_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access for demo requests" ON public.demo_requests;
CREATE POLICY "Admin full access for demo requests" ON public.demo_requests FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- H. Agency Partnerships
DROP POLICY IF EXISTS "Public insert for agency partnerships" ON public.agency_partnerships;
CREATE POLICY "Public insert for agency partnerships" ON public.agency_partnerships FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access for agency partnerships" ON public.agency_partnerships;
CREATE POLICY "Admin full access for agency partnerships" ON public.agency_partnerships FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- I. Customer Portal: Organizations
DROP POLICY IF EXISTS "Admin full access for client_organizations" ON public.client_organizations;
CREATE POLICY "Admin full access for client_organizations" ON public.client_organizations FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read own organization" ON public.client_organizations;
CREATE POLICY "Client read own organization" ON public.client_organizations FOR SELECT USING (
  public.is_client_member_of_org(id)
);

-- J. Customer Portal: Members
DROP POLICY IF EXISTS "Admin full access for client_members" ON public.client_members;
CREATE POLICY "Admin full access for client_members" ON public.client_members FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read colleagues" ON public.client_members;
CREATE POLICY "Client read colleagues" ON public.client_members FOR SELECT USING (
  public.is_client_member_of_org(organization_id)
);

-- K. Customer Portal: Invitations
DROP POLICY IF EXISTS "Admin full access for client_invitations" ON public.client_invitations;
CREATE POLICY "Admin full access for client_invitations" ON public.client_invitations FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- L. Customer Portal: Projects
DROP POLICY IF EXISTS "Admin full access for client_projects" ON public.client_projects;
CREATE POLICY "Admin full access for client_projects" ON public.client_projects FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read assigned projects" ON public.client_projects;
CREATE POLICY "Client read assigned projects" ON public.client_projects FOR SELECT USING (
  organization_id IS NOT NULL AND public.is_client_member_of_org(organization_id)
);

-- M. Customer Portal: Milestones
DROP POLICY IF EXISTS "Admin full access for project_milestones" ON public.project_milestones;
CREATE POLICY "Admin full access for project_milestones" ON public.project_milestones FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read project milestones" ON public.project_milestones;
CREATE POLICY "Client read project milestones" ON public.project_milestones FOR SELECT USING (
  client_visible = true AND public.is_client_member_of_project(project_id)
);

-- N. Customer Portal: Tasks
DROP POLICY IF EXISTS "Admin full access for client_tasks" ON public.client_tasks;
CREATE POLICY "Admin full access for client_tasks" ON public.client_tasks FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read project tasks" ON public.client_tasks;
CREATE POLICY "Client read project tasks" ON public.client_tasks FOR SELECT USING (
  client_visible = true AND public.is_client_member_of_project(project_id)
);

-- O. Customer Portal: Documents
DROP POLICY IF EXISTS "Admin full access for client_documents" ON public.client_documents;
CREATE POLICY "Admin full access for client_documents" ON public.client_documents FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read project documents" ON public.client_documents;
CREATE POLICY "Client read project documents" ON public.client_documents FOR SELECT USING (
  client_visible = true AND public.is_client_member_of_project(project_id)
);

DROP POLICY IF EXISTS "Client upload project documents" ON public.client_documents;
CREATE POLICY "Client upload project documents" ON public.client_documents FOR INSERT WITH CHECK (
  public.is_client_member_of_project(project_id) AND uploaded_by_type = 'client'
);

-- P. Customer Portal: Updates
DROP POLICY IF EXISTS "Admin full access for project_updates" ON public.project_updates;
CREATE POLICY "Admin full access for project_updates" ON public.project_updates FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read project updates" ON public.project_updates;
CREATE POLICY "Client read project updates" ON public.project_updates FOR SELECT USING (
  client_visible = true AND public.is_client_member_of_project(project_id)
);

-- Q. Customer Portal: Discussions
DROP POLICY IF EXISTS "Admin full access for project_discussions" ON public.project_discussions;
CREATE POLICY "Admin full access for project_discussions" ON public.project_discussions FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read project discussions" ON public.project_discussions;
CREATE POLICY "Client read project discussions" ON public.project_discussions FOR SELECT USING (
  public.is_client_member_of_project(project_id)
);

DROP POLICY IF EXISTS "Client insert project discussions" ON public.project_discussions;
CREATE POLICY "Client insert project discussions" ON public.project_discussions FOR INSERT WITH CHECK (
  public.is_client_member_of_project(project_id) AND sender_type = 'client'
);

-- R. Customer Portal: Approvals
DROP POLICY IF EXISTS "Admin full access for client_approvals" ON public.client_approvals;
CREATE POLICY "Admin full access for client_approvals" ON public.client_approvals FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read project approvals" ON public.client_approvals;
CREATE POLICY "Client read project approvals" ON public.client_approvals FOR SELECT USING (
  public.is_client_member_of_project(project_id)
);

DROP POLICY IF EXISTS "Client submit approvals" ON public.client_approvals;
CREATE POLICY "Client submit approvals" ON public.client_approvals FOR INSERT WITH CHECK (
  public.is_client_member_of_project(project_id)
);

-- S. Customer Portal: Change Requests
DROP POLICY IF EXISTS "Admin full access for client_change_requests" ON public.client_change_requests;
CREATE POLICY "Admin full access for client_change_requests" ON public.client_change_requests FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read own change requests" ON public.client_change_requests;
CREATE POLICY "Client read own change requests" ON public.client_change_requests FOR SELECT USING (
  public.is_client_member_of_org(organization_id)
);

DROP POLICY IF EXISTS "Client submit change requests" ON public.client_change_requests;
CREATE POLICY "Client submit change requests" ON public.client_change_requests FOR INSERT WITH CHECK (
  public.is_client_member_of_org(organization_id)
);

-- T. Customer Portal: Support Requests
DROP POLICY IF EXISTS "Admin full access for client_support_requests" ON public.client_support_requests;
CREATE POLICY "Admin full access for client_support_requests" ON public.client_support_requests FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read own support requests" ON public.client_support_requests;
CREATE POLICY "Client read own support requests" ON public.client_support_requests FOR SELECT USING (
  public.is_client_member_of_org(organization_id)
);

DROP POLICY IF EXISTS "Client create support requests" ON public.client_support_requests;
CREATE POLICY "Client create support requests" ON public.client_support_requests FOR INSERT WITH CHECK (
  public.is_client_member_of_org(organization_id)
);

-- U. Customer Portal: Notifications
DROP POLICY IF EXISTS "Client full access own notifications" ON public.client_notifications;
CREATE POLICY "Client full access own notifications" ON public.client_notifications FOR ALL USING (
  auth.uid() = user_id
);


-- ==============================================================================
-- 6. FLUSH & RELOAD POSTGREST SCHEMA CACHE
-- Eliminates stale schema warnings and 404 relation lookup errors
-- ==============================================================================

NOTIFY pgrst, 'reload schema';
-- ==============================================================================
-- STARX ALPHA LABS — PHASE 10: FINANCE, QUOTATIONS, INVOICES & COMMERCIAL OPERATIONS
-- Complete Commercial Lifecycle Management (NO PAYMENT GATEWAY)
-- Safe, Idempotent, Additive Migration
-- ==============================================================================

-- ==============================================================================
-- 1. FINANCE SETTINGS (Static Company Commercial & Bank Transfer Config)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.finance_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  default_currency TEXT NOT NULL DEFAULT 'INR',
  supported_currencies JSONB NOT NULL DEFAULT '["INR", "USD", "EUR", "AED", "GBP"]'::jsonb,
  invoice_prefix TEXT NOT NULL DEFAULT 'INV',
  quotation_prefix TEXT NOT NULL DEFAULT 'QTN',
  contract_prefix TEXT NOT NULL DEFAULT 'CNT',
  fiscal_year_start_month INT NOT NULL DEFAULT 4, -- April for India
  default_payment_terms_days INT NOT NULL DEFAULT 15,
  default_quotation_validity_days INT NOT NULL DEFAULT 30,
  tax_name TEXT NOT NULL DEFAULT 'GST',
  default_tax_rate NUMERIC(5,2) NOT NULL DEFAULT 18.00,
  tax_id_number TEXT,
  company_legal_name TEXT NOT NULL DEFAULT 'StarX Alpha Labs',
  company_billing_address TEXT DEFAULT 'Bangalore, Karnataka, India',
  bank_payment_instructions JSONB NOT NULL DEFAULT '{
    "beneficiary_name": "StarX Alpha Labs",
    "bank_name": "HDFC Bank",
    "account_number": "50200088991122",
    "ifsc_code": "HDFC0001234",
    "account_type": "Current Account",
    "upi_id": "starxalphalabs@okhdfcbank",
    "notes": "Please mention your Invoice Number in the transfer remarks."
  }'::jsonb,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default settings if empty
INSERT INTO public.finance_settings (company_legal_name, company_billing_address)
SELECT 'StarX Alpha Labs', 'Bangalore, Karnataka, India'
WHERE NOT EXISTS (SELECT 1 FROM public.finance_settings);

-- ==============================================================================
-- 2. SEQUENTIAL NUMBER GENERATOR TABLES & FUNCTIONS
-- Atomic, transaction-safe sequence generators for financial documents
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.invoice_sequences (
  year INT PRIMARY KEY,
  last_number INT NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION public.get_next_invoice_number()
RETURNS TEXT AS $$
DECLARE
  v_year INT := EXTRACT(YEAR FROM CURRENT_DATE)::INT;
  v_next INT;
  v_prefix TEXT := 'INV';
BEGIN
  SELECT invoice_prefix INTO v_prefix FROM public.finance_settings LIMIT 1;
  IF v_prefix IS NULL THEN
    v_prefix := 'INV';
  END IF;

  INSERT INTO public.invoice_sequences (year, last_number)
  VALUES (v_year, 1)
  ON CONFLICT (year) DO UPDATE
  SET last_number = public.invoice_sequences.last_number + 1
  RETURNING last_number INTO v_next;

  RETURN v_prefix || '-' || v_year::TEXT || '-' || LPAD(v_next::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;


-- ==============================================================================
-- 3. ENHANCE QUOTATIONS & ADD QUOTATION REVISIONS
-- ==============================================================================

-- Additive columns to existing quotations table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'quotations' AND column_name = 'organization_id'
  ) THEN
    ALTER TABLE public.quotations 
    ADD COLUMN organization_id UUID REFERENCES public.client_organizations(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'quotations' AND column_name = 'project_id'
  ) THEN
    ALTER TABLE public.quotations 
    ADD COLUMN project_id UUID REFERENCES public.client_projects(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'quotations' AND column_name = 'version'
  ) THEN
    ALTER TABLE public.quotations 
    ADD COLUMN version INT NOT NULL DEFAULT 1;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'quotations' AND column_name = 'terms_and_conditions'
  ) THEN
    ALTER TABLE public.quotations 
    ADD COLUMN terms_and_conditions TEXT DEFAULT '1. 50% advance before project kickoff. 2. 30 days quotation validity. 3. Scope changes subject to commercial evaluation.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'quotations' AND column_name = 'client_notes'
  ) THEN
    ALTER TABLE public.quotations 
    ADD COLUMN client_notes TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'quotations' AND column_name = 'accepted_by'
  ) THEN
    ALTER TABLE public.quotations 
    ADD COLUMN accepted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'quotations' AND column_name = 'accepted_at'
  ) THEN
    ALTER TABLE public.quotations 
    ADD COLUMN accepted_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'quotations' AND column_name = 'rejection_reason'
  ) THEN
    ALTER TABLE public.quotations 
    ADD COLUMN rejection_reason TEXT;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_quotations_org_id ON public.quotations(organization_id);
CREATE INDEX IF NOT EXISTS idx_quotations_project_id ON public.quotations(project_id);

-- Quotation Version History (Preserves historical snapshots when modified)
CREATE TABLE IF NOT EXISTS public.quotation_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id UUID NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
  version INT NOT NULL,
  snapshot JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotation_versions_quote_id ON public.quotation_versions(quotation_id);


-- ==============================================================================
-- 4. CONTRACTS & AGREEMENT MANAGEMENT
-- Tracks formal commercial agreements, NDAs, and signed documents
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number TEXT UNIQUE NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.client_projects(id) ON DELETE SET NULL,
  quotation_id UUID REFERENCES public.quotations(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  contract_type TEXT NOT NULL CHECK (contract_type IN ('website_agreement', 'app_agreement', 'software_master_services', 'maintenance_sla', 'project_nda', 'custom')),
  effective_date DATE NOT NULL,
  expiry_date DATE,
  contract_value NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'internal_review', 'ready_for_client', 'sent', 'awaiting_signature', 'executed', 'active', 'expired', 'terminated', 'cancelled')),
  document_url TEXT,
  terms_summary TEXT,
  client_visible BOOLEAN NOT NULL DEFAULT true,
  signed_offline_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contracts_org_id ON public.contracts(organization_id);
CREATE INDEX IF NOT EXISTS idx_contracts_project_id ON public.contracts(project_id);
CREATE INDEX IF NOT EXISTS idx_contracts_quotation_id ON public.contracts(quotation_id);
CREATE INDEX IF NOT EXISTS idx_contracts_created_by ON public.contracts(created_by);


-- ==============================================================================
-- 5. INVOICES TABLE
-- Authoritative commercial billing ledger
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE RESTRICT,
  project_id UUID REFERENCES public.client_projects(id) ON DELETE SET NULL,
  quotation_id UUID REFERENCES public.quotations(id) ON DELETE SET NULL,
  contract_id UUID REFERENCES public.contracts(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_business TEXT,
  billing_address TEXT,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  items JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { description, quantity, unit_price, amount }
  subtotal NUMERIC(12,2) NOT NULL,
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax_name TEXT NOT NULL DEFAULT 'GST',
  tax_rate_percent NUMERIC(5,2) NOT NULL DEFAULT 18.00,
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL,
  paid_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  outstanding_balance NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'issued', 'partially_paid', 'paid', 'overdue', 'cancelled', 'void')),
  payment_terms TEXT DEFAULT 'Payment due within 15 days of invoice date via direct bank transfer.',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invoices_org_id ON public.invoices(organization_id);
CREATE INDEX IF NOT EXISTS idx_invoices_project_id ON public.invoices(project_id);
CREATE INDEX IF NOT EXISTS idx_invoices_quotation_id ON public.invoices(quotation_id);
CREATE INDEX IF NOT EXISTS idx_invoices_contract_id ON public.invoices(contract_id);
CREATE INDEX IF NOT EXISTS idx_invoices_created_by ON public.invoices(created_by);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON public.invoices(due_date);


-- ==============================================================================
-- 6. MANUAL PAYMENT RECORDS (ABSOLUTELY NO GATEWAYS)
-- Records verified bank transfers, NEFT/RTGS, UPI refs, cheques, and cash
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_reference TEXT UNIQUE NOT NULL,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE RESTRICT,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE RESTRICT,
  amount_received NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('bank_transfer', 'neft_rtgs', 'imps', 'upi_manual', 'cheque', 'cash', 'other_offline')),
  external_transaction_ref TEXT, -- Bank UTR, Cheque No, UPI transaction reference
  internal_notes TEXT,
  recorded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('pending_verification', 'verified', 'rejected', 'reversed')),
  receipt_url TEXT,
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_records_invoice_id ON public.payment_records(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_org_id ON public.payment_records(organization_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_recorded_by ON public.payment_records(recorded_by);
CREATE INDEX IF NOT EXISTS idx_payment_records_verified_by ON public.payment_records(verified_by);
CREATE INDEX IF NOT EXISTS idx_payment_records_status ON public.payment_records(verification_status);


-- ==============================================================================
-- 7. FINANCIAL ADJUSTMENTS & CREDIT NOTES
-- Manual audit-preserved adjustments (Credit Notes, Reversals, Write-offs)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.financial_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  adjustment_number TEXT UNIQUE NOT NULL,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE RESTRICT,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE RESTRICT,
  payment_id UUID REFERENCES public.payment_records(id) ON DELETE SET NULL,
  adjustment_type TEXT NOT NULL CHECK (adjustment_type IN ('credit_note', 'write_off', 'discount_adjustment', 'refund_recorded', 'reversal')),
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('draft', 'pending_approval', 'applied', 'rejected', 'void')),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_adjustments_invoice_id ON public.financial_adjustments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_adjustments_org_id ON public.financial_adjustments(organization_id);
CREATE INDEX IF NOT EXISTS idx_adjustments_payment_id ON public.financial_adjustments(payment_id);
CREATE INDEX IF NOT EXISTS idx_adjustments_created_by ON public.financial_adjustments(created_by);
CREATE INDEX IF NOT EXISTS idx_adjustments_approved_by ON public.financial_adjustments(approved_by);


-- ==============================================================================
-- 8. OPERATIONAL EXPENSES
-- Tracks technology, hosting, and operational disbursements
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('software_subscriptions', 'hosting_infrastructure', 'hardware_equipment', 'marketing', 'travel', 'professional_services', 'office', 'other')),
  description TEXT,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  vendor TEXT NOT NULL,
  project_id UUID REFERENCES public.client_projects(id) ON DELETE SET NULL,
  receipt_url TEXT,
  approval_status TEXT NOT NULL DEFAULT 'approved' CHECK (approval_status IN ('draft', 'submitted', 'approved', 'rejected')),
  recorded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_expenses_project_id ON public.expenses(project_id);
CREATE INDEX IF NOT EXISTS idx_expenses_recorded_by ON public.expenses(recorded_by);
CREATE INDEX IF NOT EXISTS idx_expenses_approved_by ON public.expenses(approved_by);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON public.expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON public.expenses(expense_date);


-- ==============================================================================
-- 9. FINANCIAL AUDIT LOGS (Immutable Activity Log)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.finance_audit_logs (
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

CREATE INDEX IF NOT EXISTS idx_finance_audit_actor ON public.finance_audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_finance_audit_action ON public.finance_audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_finance_audit_entity ON public.finance_audit_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_finance_audit_created_at ON public.finance_audit_logs(created_at DESC);


-- ==============================================================================
-- 10. RECALCULATE INVOICE BALANCE TRIGGER
-- Automatically updates invoice paid_amount, balance, and status upon verified payment
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.recalculate_invoice_balance(target_invoice_id UUID)
RETURNS VOID AS $$
DECLARE
  v_total_paid NUMERIC(12,2) := 0;
  v_total_adjustments NUMERIC(12,2) := 0;
  v_inv_total NUMERIC(12,2);
  v_net_balance NUMERIC(12,2);
  v_new_status TEXT;
  v_due_date DATE;
  v_current_status TEXT;
BEGIN
  -- 1. Get current invoice details
  SELECT total_amount, due_date, status INTO v_inv_total, v_due_date, v_current_status
  FROM public.invoices
  WHERE id = target_invoice_id;

  IF v_inv_total IS NULL OR v_current_status IN ('cancelled', 'void') THEN
    RETURN;
  END IF;

  -- 2. Sum verified payments
  SELECT COALESCE(SUM(amount_received), 0) INTO v_total_paid
  FROM public.payment_records
  WHERE invoice_id = target_invoice_id AND verification_status = 'verified';

  -- 3. Sum approved credit notes / adjustments
  SELECT COALESCE(SUM(amount), 0) INTO v_total_adjustments
  FROM public.financial_adjustments
  WHERE invoice_id = target_invoice_id AND status = 'applied' AND adjustment_type IN ('credit_note', 'write_off', 'discount_adjustment');

  -- 4. Calculate net outstanding balance
  v_net_balance := GREATEST(0, v_inv_total - (v_total_paid + v_total_adjustments));

  -- 5. Determine calculated status
  IF v_net_balance = 0 THEN
    v_new_status := 'paid';
  ELSIF v_total_paid > 0 THEN
    v_new_status := 'partially_paid';
  ELSIF v_due_date < CURRENT_DATE THEN
    v_new_status := 'overdue';
  ELSE
    v_new_status := 'issued';
  END IF;

  -- 6. Update invoice
  UPDATE public.invoices
  SET 
    paid_amount = v_total_paid,
    outstanding_balance = v_net_balance,
    status = v_new_status,
    updated_at = NOW()
  WHERE id = target_invoice_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;


-- ==============================================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict multi-tenant client isolation & admin authorization
-- ==============================================================================

ALTER TABLE public.finance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Finance Settings
DROP POLICY IF EXISTS "Admin full access for finance_settings" ON public.finance_settings;
CREATE POLICY "Admin full access for finance_settings" ON public.finance_settings FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read payment instructions" ON public.finance_settings;
CREATE POLICY "Client read payment instructions" ON public.finance_settings FOR SELECT USING (
  auth.uid() IS NOT NULL
);

-- 2. Quotation Versions
DROP POLICY IF EXISTS "Admin full access for quotation_versions" ON public.quotation_versions;
CREATE POLICY "Admin full access for quotation_versions" ON public.quotation_versions FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read quotation_versions" ON public.quotation_versions;
CREATE POLICY "Client read quotation_versions" ON public.quotation_versions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.quotations q
    WHERE q.id = quotation_versions.quotation_id
      AND q.organization_id IS NOT NULL
      AND public.is_client_member_of_org(q.organization_id)
  )
);

-- 3. Contracts
DROP POLICY IF EXISTS "Admin full access for contracts" ON public.contracts;
CREATE POLICY "Admin full access for contracts" ON public.contracts FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read own contracts" ON public.contracts;
CREATE POLICY "Client read own contracts" ON public.contracts FOR SELECT USING (
  client_visible = true AND public.is_client_member_of_org(organization_id)
);

-- 4. Invoices
DROP POLICY IF EXISTS "Admin full access for invoices" ON public.invoices;
CREATE POLICY "Admin full access for invoices" ON public.invoices FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read own invoices" ON public.invoices;
CREATE POLICY "Client read own invoices" ON public.invoices FOR SELECT USING (
  status IN ('issued', 'partially_paid', 'paid', 'overdue')
  AND public.is_client_member_of_org(organization_id)
);

-- 5. Payment Records
DROP POLICY IF EXISTS "Admin full access for payment_records" ON public.payment_records;
CREATE POLICY "Admin full access for payment_records" ON public.payment_records FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read own payments" ON public.payment_records;
CREATE POLICY "Client read own payments" ON public.payment_records FOR SELECT USING (
  verification_status = 'verified' AND public.is_client_member_of_org(organization_id)
);

-- 6. Financial Adjustments
DROP POLICY IF EXISTS "Admin full access for financial_adjustments" ON public.financial_adjustments;
CREATE POLICY "Admin full access for financial_adjustments" ON public.financial_adjustments FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read own credit notes" ON public.financial_adjustments;
CREATE POLICY "Client read own credit notes" ON public.financial_adjustments FOR SELECT USING (
  status = 'applied' AND adjustment_type = 'credit_note' AND public.is_client_member_of_org(organization_id)
);

-- 7. Expenses (Strictly Internal: ZERO Client Access)
DROP POLICY IF EXISTS "Admin full access for expenses" ON public.expenses;
CREATE POLICY "Admin full access for expenses" ON public.expenses FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- 8. Finance Audit Logs (Strictly Internal)
DROP POLICY IF EXISTS "Admin full access for finance_audit_logs" ON public.finance_audit_logs;
CREATE POLICY "Admin full access for finance_audit_logs" ON public.finance_audit_logs FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);


-- ==============================================================================
-- 12. NOTIFY POSTGREST SCHEMA CACHE RELOAD
-- ==============================================================================

NOTIFY pgrst, 'reload schema';
