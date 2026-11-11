-- ==============================================================================
-- STARX ALPHA LABS — VIDEO STATION, DEMO REQUESTS & AGENCY PARTNERSHIPS
-- ==============================================================================

-- 1. VIDEO CATEGORIES (12 Core Verified Industries)
CREATE TABLE IF NOT EXISTS public.video_categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. VIDEOS TABLE
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

-- 3. PERSONALIZED DEMO REQUESTS TABLE
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

-- 4. AGENCY PARTNERSHIPS TABLE
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

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.video_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_partnerships ENABLE ROW LEVEL SECURITY;

-- Video Categories: Public Read
CREATE POLICY "Public read for video categories"
  ON public.video_categories FOR SELECT
  USING (true);

-- Videos: Public Read Published
CREATE POLICY "Public read for published videos"
  ON public.videos FOR SELECT
  USING (published = true);

-- Demo Requests: Public Insert
CREATE POLICY "Public insert for demo requests"
  ON public.demo_requests FOR INSERT
  WITH CHECK (true);

-- Agency Partnerships: Public Insert
CREATE POLICY "Public insert for agency partnerships"
  ON public.agency_partnerships FOR INSERT
  WITH CHECK (true);

-- Admin Full Access Policies
CREATE POLICY "Admin full access for video categories"
  ON public.video_categories FOR ALL
  USING (
    auth.role() = 'service_role' OR
    EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Admin full access for videos"
  ON public.videos FOR ALL
  USING (
    auth.role() = 'service_role' OR
    EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Admin full access for demo requests"
  ON public.demo_requests FOR ALL
  USING (
    auth.role() = 'service_role' OR
    EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Admin full access for agency partnerships"
  ON public.agency_partnerships FOR ALL
  USING (
    auth.role() = 'service_role' OR
    EXISTS (SELECT 1 FROM public.admin_members WHERE user_id = auth.uid() AND is_active = true)
  );
