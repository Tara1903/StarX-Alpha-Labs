-- STARX FORGE — PORTFOLIO AUDIT & RESTRUCTURING MIGRATION
-- Records authoritative audit findings, quality scores (0-100), and classification decisions
-- for Batch 01 (1-14) and Batch 02 (15-28).

CREATE TABLE IF NOT EXISTS forge_demo_audits (
  id SERIAL PRIMARY KEY,
  catalog_id INT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  batch TEXT NOT NULL,
  original_category_slug TEXT NOT NULL,
  target_category_slug TEXT NOT NULL,
  product_type TEXT NOT NULL,
  score_design INT NOT NULL,
  score_functionality INT NOT NULL,
  score_completeness INT NOT NULL,
  score_originality INT NOT NULL,
  score_commercial INT NOT NULL,
  score_total INT NOT NULL,
  decision TEXT NOT NULL CHECK (decision IN ('KEEP', 'RECLASSIFY', 'REBUILD', 'SCRAP')),
  analysis_reasoning TEXT NOT NULL,
  salvageable_assets JSONB NOT NULL DEFAULT '[]'::jsonb,
  issues_found JSONB NOT NULL DEFAULT '[]'::jsonb,
  recommended_action TEXT NOT NULL,
  audited_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for rapid query by batch and decision
CREATE INDEX IF NOT EXISTS idx_forge_demo_audits_batch ON forge_demo_audits(batch);
CREATE INDEX IF NOT EXISTS idx_forge_demo_audits_decision ON forge_demo_audits(decision);
CREATE INDEX IF NOT EXISTS idx_forge_demo_audits_target_category ON forge_demo_audits(target_category_slug);

-- Enable RLS and grant read access to authenticated/anon
ALTER TABLE forge_demo_audits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on forge_demo_audits" ON forge_demo_audits FOR SELECT USING (true);
CREATE POLICY "Allow service role full access on forge_demo_audits" ON forge_demo_audits FOR ALL USING (true);
