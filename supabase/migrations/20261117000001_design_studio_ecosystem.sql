-- ==============================================================================
-- STARX DESIGN STUDIO — Google Stitch Design Generation Ecosystem
-- Migration: 20261117000001_design_studio_ecosystem.sql
-- ==============================================================================
-- Enables full database persistence for AI-powered design generation,
-- Stitch project artifact snapshots, collaborative revisions, and quotation handoff.
-- Target Database: https://qznrkailsceimepcscmx.supabase.co
-- ==============================================================================

-- 1. DESIGN STUDIO PROJECTS
CREATE TABLE IF NOT EXISTS public.design_studio_projects (
    id TEXT PRIMARY KEY,
    project_code TEXT NOT NULL UNIQUE,
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES public.client_organizations(id) ON DELETE SET NULL,
    session_id TEXT,
    title TEXT NOT NULL,
    industry_slug TEXT NOT NULL,
    division_slug TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (
        status IN (
            'draft',
            'generating',
            'generated',
            'revision_requested',
            'approved',
            'quoted',
            'archived'
        )
    ),
    target_platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
    feature_requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
    theme_preference TEXT NOT NULL DEFAULT 'cosmic-dark',
    raw_description TEXT,
    structured_brief JSONB NOT NULL DEFAULT '{}'::jsonb,
    active_artifact_id TEXT,
    contact_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    quote_request_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_design_studio_projects_code ON public.design_studio_projects(project_code);
CREATE INDEX IF NOT EXISTS idx_design_studio_projects_status ON public.design_studio_projects(status);
CREATE INDEX IF NOT EXISTS idx_design_studio_projects_industry ON public.design_studio_projects(industry_slug);
CREATE INDEX IF NOT EXISTS idx_design_studio_projects_org ON public.design_studio_projects(organization_id);

-- 2. DESIGN GENERATION JOBS
CREATE TABLE IF NOT EXISTS public.design_generation_jobs (
    id TEXT PRIMARY KEY,
    job_code TEXT NOT NULL UNIQUE,
    project_id TEXT NOT NULL REFERENCES public.design_studio_projects(id) ON DELETE CASCADE,
    provider TEXT NOT NULL DEFAULT 'stitch',
    model_id TEXT NOT NULL DEFAULT 'GEMINI_3_8_FLASH',
    device_type TEXT NOT NULL DEFAULT 'DESKTOP',
    status TEXT NOT NULL DEFAULT 'queued' CHECK (
        status IN ('queued', 'processing', 'completed', 'failed', 'cancelled')
    ),
    stage TEXT NOT NULL DEFAULT 'queued',
    progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    prompt TEXT NOT NULL,
    input_parameters JSONB NOT NULL DEFAULT '{}'::jsonb,
    provider_project_id TEXT,
    provider_screen_id TEXT,
    error_message TEXT,
    execution_logs JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_design_generation_jobs_project ON public.design_generation_jobs(project_id);
CREATE INDEX IF NOT EXISTS idx_design_generation_jobs_status ON public.design_generation_jobs(status);

-- 3. DESIGN ARTIFACTS
CREATE TABLE IF NOT EXISTS public.design_artifacts (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES public.design_studio_projects(id) ON DELETE CASCADE,
    job_id TEXT REFERENCES public.design_generation_jobs(id) ON DELETE SET NULL,
    version_number INTEGER NOT NULL DEFAULT 1,
    provider TEXT NOT NULL DEFAULT 'stitch',
    provider_project_id TEXT NOT NULL,
    provider_screen_id TEXT,
    title TEXT NOT NULL,
    device_type TEXT NOT NULL DEFAULT 'DESKTOP',
    design_theme JSONB NOT NULL DEFAULT '{}'::jsonb,
    design_md TEXT,
    thumbnail_url TEXT,
    download_url TEXT,
    html_code TEXT,
    palette JSONB NOT NULL DEFAULT '[]'::jsonb,
    key_features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_design_artifacts_project ON public.design_artifacts(project_id);
CREATE INDEX IF NOT EXISTS idx_design_artifacts_provider_project ON public.design_artifacts(provider_project_id);

-- 4. DESIGN REVISIONS
CREATE TABLE IF NOT EXISTS public.design_revisions (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES public.design_studio_projects(id) ON DELETE CASCADE,
    artifact_id TEXT NOT NULL REFERENCES public.design_artifacts(id) ON DELETE CASCADE,
    revision_number INTEGER NOT NULL DEFAULT 1,
    notes TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'applied' CHECK (
        status IN ('pending', 'processing', 'applied', 'rejected')
    ),
    applied_job_id TEXT REFERENCES public.design_generation_jobs(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_design_revisions_project ON public.design_revisions(project_id);
CREATE INDEX IF NOT EXISTS idx_design_revisions_artifact ON public.design_revisions(artifact_id);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.design_studio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_generation_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_revisions ENABLE ROW LEVEL SECURITY;

-- Idempotent RLS Policies: Projects
DROP POLICY IF EXISTS "Public read design studio projects" ON public.design_studio_projects;
CREATE POLICY "Public read design studio projects"
    ON public.design_studio_projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert design studio projects" ON public.design_studio_projects;
CREATE POLICY "Public insert design studio projects"
    ON public.design_studio_projects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public update design studio projects" ON public.design_studio_projects;
CREATE POLICY "Public update design studio projects"
    ON public.design_studio_projects FOR UPDATE USING (true);

-- Idempotent RLS Policies: Jobs
DROP POLICY IF EXISTS "Public read design generation jobs" ON public.design_generation_jobs;
CREATE POLICY "Public read design generation jobs"
    ON public.design_generation_jobs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert design generation jobs" ON public.design_generation_jobs;
CREATE POLICY "Public insert design generation jobs"
    ON public.design_generation_jobs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public update design generation jobs" ON public.design_generation_jobs;
CREATE POLICY "Public update design generation jobs"
    ON public.design_generation_jobs FOR UPDATE USING (true);

-- Idempotent RLS Policies: Artifacts
DROP POLICY IF EXISTS "Public read design artifacts" ON public.design_artifacts;
CREATE POLICY "Public read design artifacts"
    ON public.design_artifacts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert design artifacts" ON public.design_artifacts;
CREATE POLICY "Public insert design artifacts"
    ON public.design_artifacts FOR INSERT WITH CHECK (true);

-- Idempotent RLS Policies: Revisions
DROP POLICY IF EXISTS "Public read design revisions" ON public.design_revisions;
CREATE POLICY "Public read design revisions"
    ON public.design_revisions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert design revisions" ON public.design_revisions;
CREATE POLICY "Public insert design revisions"
    ON public.design_revisions FOR INSERT WITH CHECK (true);
