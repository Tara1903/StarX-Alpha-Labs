-- ==============================================================================
-- STARX FORGE — AI-Powered Demo Creation & Orchestration Platform
-- Migration: 20261112000001_starx_forge_platform.sql
-- ==============================================================================
-- Preserves existing 160 demos & architecture while adding full database-backed
-- orchestration, versioning, automated QA, isolated sandboxes, batch queues,
-- integration settings, and audit logging.
-- ==============================================================================

-- 1. FORGE DEMOS REGISTRY (Extends & tracks both 160 catalogue demos & custom demos)
CREATE TABLE IF NOT EXISTS public.forge_demos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    catalog_id INTEGER UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    business_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    description TEXT NOT NULL,
    target_audience TEXT,
    design_direction TEXT,
    feature_requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
    workflows JSONB NOT NULL DEFAULT '[]'::jsonb,
    archetype TEXT NOT NULL DEFAULT 'pos-terminal',
    brand_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    seed_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    generation_status TEXT NOT NULL DEFAULT 'draft' CHECK (
        generation_status IN (
            'draft',
            'queued',
            'designing',
            'implementing',
            'testing',
            'qa_failed',
            'ready_for_review',
            'changes_requested',
            'approved',
            'published',
            'archived'
        )
    ),
    qa_status TEXT NOT NULL DEFAULT 'not_run' CHECK (
        qa_status IN ('not_run', 'running', 'passed', 'failed', 'warnings')
    ),
    publishing_status TEXT NOT NULL DEFAULT 'unpublished' CHECK (
        publishing_status IN ('unpublished', 'published', 'archived', 'rolled_back')
    ),
    preview_url TEXT,
    published_version INTEGER NOT NULL DEFAULT 0,
    active_version_id UUID,
    created_by TEXT,
    updated_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_forge_demos_slug ON public.forge_demos(slug);
CREATE INDEX IF NOT EXISTS idx_forge_demos_category ON public.forge_demos(category_slug);
CREATE INDEX IF NOT EXISTS idx_forge_demos_gen_status ON public.forge_demos(generation_status);
CREATE INDEX IF NOT EXISTS idx_forge_demos_pub_status ON public.forge_demos(publishing_status);

-- 2. FORGE DEMO VERSIONS (Immutable release snapshots & rollback history)
CREATE TABLE IF NOT EXISTS public.forge_demo_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demo_id UUID NOT NULL REFERENCES public.forge_demos(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    job_id UUID,
    design_references JSONB NOT NULL DEFAULT '{}'::jsonb,
    implementation_spec JSONB NOT NULL DEFAULT '{}'::jsonb,
    qa_report JSONB NOT NULL DEFAULT '{}'::jsonb,
    preview_url TEXT,
    approved_by TEXT,
    approved_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(demo_id, version_number)
);

CREATE INDEX IF NOT EXISTS idx_forge_demo_versions_demo_id ON public.forge_demo_versions(demo_id);

-- 3. FORGE BATCHES (Controlled concurrent batch execution)
CREATE TABLE IF NOT EXISTS public.forge_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    demo_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    max_concurrency INTEGER NOT NULL DEFAULT 2 CHECK (max_concurrency >= 1 AND max_concurrency <= 10),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (
        status IN ('draft', 'running', 'paused', 'completed', 'cancelled', 'partial_failure')
    ),
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    total_count INTEGER NOT NULL DEFAULT 0,
    completed_count INTEGER NOT NULL DEFAULT 0,
    failed_count INTEGER NOT NULL DEFAULT 0,
    created_by TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_forge_batches_status ON public.forge_batches(status);

-- 4. FORGE JOBS (13-Stage Orchestration Pipeline)
CREATE TABLE IF NOT EXISTS public.forge_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_code TEXT NOT NULL UNIQUE,
    demo_id UUID NOT NULL REFERENCES public.forge_demos(id) ON DELETE CASCADE,
    batch_id UUID REFERENCES public.forge_batches(id) ON DELETE SET NULL,
    current_stage TEXT NOT NULL DEFAULT 'Analysing business requirements',
    stage_index INTEGER NOT NULL DEFAULT 1 CHECK (stage_index >= 1 AND stage_index <= 13),
    status TEXT NOT NULL DEFAULT 'queued' CHECK (
        status IN ('queued', 'running', 'completed', 'failed', 'cancelled')
    ),
    input_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    design_brief TEXT,
    stitch_request_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    stitch_response_assets JSONB NOT NULL DEFAULT '{}'::jsonb,
    output_references JSONB NOT NULL DEFAULT '{}'::jsonb,
    qa_results JSONB NOT NULL DEFAULT '{}'::jsonb,
    logs JSONB NOT NULL DEFAULT '[]'::jsonb,
    errors JSONB NOT NULL DEFAULT '[]'::jsonb,
    retry_count INTEGER NOT NULL DEFAULT 0,
    max_retries INTEGER NOT NULL DEFAULT 2,
    duration_ms INTEGER,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_forge_jobs_demo_id ON public.forge_jobs(demo_id);
CREATE INDEX IF NOT EXISTS idx_forge_jobs_batch_id ON public.forge_jobs(batch_id);
CREATE INDEX IF NOT EXISTS idx_forge_jobs_status ON public.forge_jobs(status);

-- 5. ISOLATED DEMO SANDBOX STATE (Database-backed persistent demo state & reset)
CREATE TABLE IF NOT EXISTS public.forge_demo_sandboxes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demo_slug TEXT NOT NULL,
    session_key TEXT NOT NULL DEFAULT 'default',
    state_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_seed_snapshot BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(demo_slug, session_key)
);

CREATE INDEX IF NOT EXISTS idx_forge_sandboxes_slug ON public.forge_demo_sandboxes(demo_slug);

-- 6. FORGE SETTINGS (Singleton configuration)
CREATE TABLE IF NOT EXISTS public.forge_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    max_concurrent_jobs INTEGER NOT NULL DEFAULT 2 CHECK (max_concurrent_jobs >= 1 AND max_concurrent_jobs <= 10),
    retry_limit INTEGER NOT NULL DEFAULT 2 CHECK (retry_limit >= 0 AND retry_limit <= 5),
    job_timeout_seconds INTEGER NOT NULL DEFAULT 300,
    default_generation_instructions TEXT NOT NULL DEFAULT 'Follow StarX Alpha Labs quality standards: craft an authentic, domain-specific application with realistic regional workflows, WCAG AA contrast, responsive mobile-first layouts, and isolated sandbox data.',
    default_qa_requirements JSONB NOT NULL DEFAULT '{"requireVisualCheck":true,"requireFunctionalCheck":true,"requireTechnicalCheck":true,"requirePerformanceCheck":true,"blockPublishOnCriticalFail":true}'::jsonb,
    stitch_mcp_endpoint TEXT,
    antigravity_worker_mode TEXT NOT NULL DEFAULT 'local-bridge',
    updated_by TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.forge_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;

-- 7. FORGE AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.forge_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_forge_audit_logs_created_at ON public.forge_audit_logs(created_at DESC);

-- 8. UPDATED_AT TRIGGERS
DO $$
DECLARE
    t TEXT;
BEGIN
    FOREACH t IN ARRAY ARRAY['forge_demos', 'forge_batches', 'forge_jobs', 'forge_demo_sandboxes'] LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS trg_%I_updated_at ON public.%I;', t, t);
        EXECUTE format(
            'CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();',
            t, t
        );
    END LOOP;
END $$;

-- 9. ROW LEVEL SECURITY POLICIES (Strict Admin Isolation + Public Published Read Only)
ALTER TABLE public.forge_demos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forge_demo_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forge_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forge_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forge_demo_sandboxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forge_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forge_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published forge demos" ON public.forge_demos;
DROP POLICY IF EXISTS "Admin full access forge_demos" ON public.forge_demos;
CREATE POLICY "Public read published forge demos"
    ON public.forge_demos FOR SELECT
    USING (publishing_status = 'published');
CREATE POLICY "Admin full access forge_demos"
    ON public.forge_demos FOR ALL
    USING ((SELECT auth.role()) = 'service_role' OR public.is_admin());

DROP POLICY IF EXISTS "Admin full access forge_demo_versions" ON public.forge_demo_versions;
CREATE POLICY "Admin full access forge_demo_versions"
    ON public.forge_demo_versions FOR ALL
    USING ((SELECT auth.role()) = 'service_role' OR public.is_admin());

DROP POLICY IF EXISTS "Admin full access forge_batches" ON public.forge_batches;
CREATE POLICY "Admin full access forge_batches"
    ON public.forge_batches FOR ALL
    USING ((SELECT auth.role()) = 'service_role' OR public.is_admin());

DROP POLICY IF EXISTS "Admin full access forge_jobs" ON public.forge_jobs;
CREATE POLICY "Admin full access forge_jobs"
    ON public.forge_jobs FOR ALL
    USING ((SELECT auth.role()) = 'service_role' OR public.is_admin());

DROP POLICY IF EXISTS "Service and Admin access forge_demo_sandboxes" ON public.forge_demo_sandboxes;
CREATE POLICY "Service and Admin access forge_demo_sandboxes"
    ON public.forge_demo_sandboxes FOR ALL
    USING ((SELECT auth.role()) = 'service_role' OR public.is_admin());

DROP POLICY IF EXISTS "Admin full access forge_settings" ON public.forge_settings;
CREATE POLICY "Admin full access forge_settings"
    ON public.forge_settings FOR ALL
    USING ((SELECT auth.role()) = 'service_role' OR public.is_admin());

DROP POLICY IF EXISTS "Admin full access forge_audit_logs" ON public.forge_audit_logs;
CREATE POLICY "Admin full access forge_audit_logs"
    ON public.forge_audit_logs FOR ALL
    USING ((SELECT auth.role()) = 'service_role' OR public.is_admin());

NOTIFY pgrst, 'reload schema';
