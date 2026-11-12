-- ==============================================================================
-- STARX ALPHA LABS — PHASE 3A: COMPLETE DEMO CATALOGUE REPLACEMENT
-- Migration: 20261112000002_phase3a_canonical_catalogue_replace.sql
-- ==============================================================================
-- Safely archives old placeholder catalogue rows (catalog_id IS NOT NULL) into
-- forge_demos_legacy_backup_phase3a, removes old placeholder catalogue entries,
-- preserves the restaurant-management-pilot (catalog_id IS NULL) and all its
-- jobs/versions/sandboxes/audit logs untouched, and adds generation_enabled lock
-- on forge_settings (DEFAULT FALSE until Phase 3B approval).
-- ==============================================================================

-- 1. Backup table for reversible archival of the removed Phase 1/2 legacy catalogue
CREATE TABLE IF NOT EXISTS public.forge_demos_legacy_backup_phase3a (
    id UUID PRIMARY KEY,
    catalog_id INTEGER,
    slug TEXT NOT NULL,
    business_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    description TEXT NOT NULL,
    target_audience TEXT,
    design_direction TEXT,
    feature_requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
    workflows JSONB NOT NULL DEFAULT '[]'::jsonb,
    archetype TEXT NOT NULL,
    brand_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    seed_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    generation_status TEXT NOT NULL,
    qa_status TEXT NOT NULL,
    publishing_status TEXT NOT NULL,
    preview_url TEXT,
    published_version INTEGER NOT NULL DEFAULT 0,
    active_version_id UUID,
    created_by TEXT,
    updated_by TEXT,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    archived_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Archive old catalog_id IS NOT NULL rows before deleting them (idempotent)
INSERT INTO public.forge_demos_legacy_backup_phase3a (
    id, catalog_id, slug, business_name, industry, category_slug,
    description, target_audience, design_direction, feature_requirements,
    workflows, archetype, brand_config, seed_data, generation_status,
    qa_status, publishing_status, preview_url, published_version,
    active_version_id, created_by, updated_by, created_at, updated_at
)
SELECT
    id, catalog_id, slug, business_name, industry, category_slug,
    description, target_audience, design_direction, feature_requirements,
    workflows, archetype, brand_config, seed_data, generation_status,
    qa_status, publishing_status, preview_url, published_version,
    active_version_id, created_by, updated_by, created_at, updated_at
FROM public.forge_demos
WHERE catalog_id IS NOT NULL
  AND slug <> 'restaurant-management-pilot'
  AND created_by = 'catalog-registry'
ON CONFLICT (id) DO NOTHING;

-- 2. Remove old placeholder catalogue entries while preserving pilot & canonical Phase 3A records
DELETE FROM public.forge_demos
WHERE catalog_id IS NOT NULL
  AND slug <> 'restaurant-management-pilot'
  AND created_by = 'catalog-registry';

-- 3. Add generation_enabled gate to forge_settings (locked FALSE during Phase 3A)
ALTER TABLE public.forge_settings
    ADD COLUMN IF NOT EXISTS generation_enabled BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE public.forge_settings
SET generation_enabled = FALSE,
    updated_at = NOW(),
    updated_by = 'phase3a-catalogue-replacement'
WHERE id = 'default';

CREATE INDEX IF NOT EXISTS idx_forge_demos_catalog_id ON public.forge_demos(catalog_id);
