-- ==============================================================================
-- STARX ALPHA LABS — CONSOLIDATED PENDING MIGRATIONS (PHASE 8 COMPLETE)
-- Safe, Idempotent Script to Run in Supabase SQL Editor
-- Target Database: https://qznrkailsceimepcscmx.supabase.co
-- ==============================================================================

-- ==============================================================================
-- PART 1: THEME & COMMERCIAL SYSTEM (PACKAGES, ESTIMATES, QUOTATIONS, PROJECTS)
-- ==============================================================================

-- 1. THEME SETTINGS
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

-- 2. DEVELOPMENT PACKAGES (W/A/C Tiers)
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

-- 3. DEVELOPMENT ADD-ONS
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

-- 4. CUSTOMER ESTIMATES & CALCULATOR SUBMISSIONS
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

-- 5. UNIFIED QUOTATIONS & PROPOSALS
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

-- 6. CLIENT PROJECTS & 13-STAGE WORKFLOW MANAGEMENT
CREATE TABLE IF NOT EXISTS public.client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_code TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_business TEXT,
  division TEXT NOT NULL,
  solution_title TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'new_request' CHECK (
    stage IN (
      'new_request',
      'requirement_gathering',
      'proposal',
      'quotation_approved',
      'advance_payment',
      'ui_ux_design',
      'development',
      'testing',
      'client_review',
      'deployment',
      'handover',
      'maintenance',
      'completed'
    )
  ),
  total_cost NUMERIC(10, 2) NOT NULL,
  paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  quotation_id UUID REFERENCES public.quotations(id) ON DELETE SET NULL,
  assigned_lead TEXT,
  target_delivery DATE,
  milestones JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: Commercial Tables
ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;

-- Idempotent Policies for Commercial Tables
DROP POLICY IF EXISTS "Public read development_packages" ON public.development_packages;
CREATE POLICY "Public read development_packages" ON public.development_packages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read development_addons" ON public.development_addons;
CREATE POLICY "Public read development_addons" ON public.development_addons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read theme_settings" ON public.theme_settings;
CREATE POLICY "Public read theme_settings" ON public.theme_settings FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Public insert customer_estimates" ON public.customer_estimates;
CREATE POLICY "Public insert customer_estimates" ON public.customer_estimates FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full development_packages" ON public.development_packages;
CREATE POLICY "Admin full development_packages" ON public.development_packages FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);

DROP POLICY IF EXISTS "Admin full development_addons" ON public.development_addons;
CREATE POLICY "Admin full development_addons" ON public.development_addons FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);

DROP POLICY IF EXISTS "Admin full theme_settings" ON public.theme_settings;
CREATE POLICY "Admin full theme_settings" ON public.theme_settings FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);

DROP POLICY IF EXISTS "Admin full customer_estimates" ON public.customer_estimates;
CREATE POLICY "Admin full customer_estimates" ON public.customer_estimates FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);

DROP POLICY IF EXISTS "Admin full quotations" ON public.quotations;
CREATE POLICY "Admin full quotations" ON public.quotations FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);

DROP POLICY IF EXISTS "Admin full client_projects" ON public.client_projects;
CREATE POLICY "Admin full client_projects" ON public.client_projects FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);


-- ==============================================================================
-- PART 2: VIDEO STATION, PERSONALIZED DEMO FUNNEL & AGENCY PARTNERSHIPS
-- ==============================================================================

-- 7. VIDEO CATEGORIES (12 Core Verified Industries)
CREATE TABLE IF NOT EXISTS public.video_categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. VIDEOS TABLE
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

-- 9. PERSONALIZED DEMO REQUESTS TABLE (DEMO-XXXXX)
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

-- 10. AGENCY PARTNERSHIPS TABLE (AGY-XXXXX)
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

-- RLS: Video, Demo & Agency Tables
ALTER TABLE public.video_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_partnerships ENABLE ROW LEVEL SECURITY;

-- Idempotent Policies
DROP POLICY IF EXISTS "Public read for video categories" ON public.video_categories;
CREATE POLICY "Public read for video categories" ON public.video_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read for published videos" ON public.videos;
CREATE POLICY "Public read for published videos" ON public.videos FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public insert for demo requests" ON public.demo_requests;
CREATE POLICY "Public insert for demo requests" ON public.demo_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert for agency partnerships" ON public.agency_partnerships;
CREATE POLICY "Public insert for agency partnerships" ON public.agency_partnerships FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access for video categories" ON public.video_categories;
CREATE POLICY "Admin full access for video categories" ON public.video_categories FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);

DROP POLICY IF EXISTS "Admin full access for videos" ON public.videos;
CREATE POLICY "Admin full access for videos" ON public.videos FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);

DROP POLICY IF EXISTS "Admin full access for demo requests" ON public.demo_requests;
CREATE POLICY "Admin full access for demo requests" ON public.demo_requests FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);

DROP POLICY IF EXISTS "Admin full access for agency partnerships" ON public.agency_partnerships;
CREATE POLICY "Admin full access for agency partnerships" ON public.agency_partnerships FOR ALL USING (
  auth.role() = 'service_role' OR EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
);
