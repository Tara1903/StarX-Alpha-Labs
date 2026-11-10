-- ==============================================================================
-- STARX ALPHA LABS — BUSINESS SYSTEM, PRICING & THEME SCHEMA MIGRATION
-- ==============================================================================

-- 1. THEME SETTINGS (Persistent live customization)
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

-- 2. DEVELOPMENT PACKAGES
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

-- 6. CLIENT PROJECTS & WORKFLOW MANAGEMENT
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

-- Enable Row Level Security on all new tables
ALTER TABLE public.theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;

-- Public can read active packages and add-ons
CREATE POLICY "Public read development_packages" ON public.development_packages FOR SELECT USING (true);
CREATE POLICY "Public read development_addons" ON public.development_addons FOR SELECT USING (true);
CREATE POLICY "Public read theme_settings" ON public.theme_settings FOR SELECT USING (is_published = true);

-- Public can insert customer estimates via calculator
CREATE POLICY "Public insert customer_estimates" ON public.customer_estimates FOR INSERT WITH CHECK (true);

-- Admins have full access
CREATE POLICY "Admin full development_packages" ON public.development_packages FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full development_addons" ON public.development_addons FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full theme_settings" ON public.theme_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full customer_estimates" ON public.customer_estimates FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full quotations" ON public.quotations FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full client_projects" ON public.client_projects FOR ALL USING (public.is_admin());
