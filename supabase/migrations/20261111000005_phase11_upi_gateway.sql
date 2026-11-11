-- ==============================================================================
-- STARX ALPHA LABS — PHASE 11: UPI PAYMENT GATEWAY INTEGRATION
-- Dedicated Integration with Standalone UPI Gateway (Laravel 12 / MySQL 8.0)
-- Zero Shared DB / Secure Authenticated REST API & Signed Webhooks
-- Safe, Idempotent, Additive Migration
-- ==============================================================================

-- 1. GATEWAY SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.gateway_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gateway_url TEXT NOT NULL DEFAULT 'https://payments.starx-alpha-labs.com',
  environment TEXT NOT NULL CHECK (environment IN ('sandbox', 'live')) DEFAULT 'sandbox',
  webhook_url TEXT NOT NULL DEFAULT 'https://starx-alpha-labs.vercel.app/api/webhooks/upi-gateway',
  auto_expiry_minutes INT NOT NULL DEFAULT 30,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  active_provider TEXT NOT NULL CHECK (active_provider IN ('generic_upi', 'paytm_pg', 'phonepe_pg')) DEFAULT 'generic_upi',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed default gateway configuration if empty
INSERT INTO public.gateway_settings (gateway_url, environment, webhook_url, auto_expiry_minutes, is_enabled, active_provider)
SELECT 'https://payments.starx-alpha-labs.com', 'sandbox', 'https://starx-alpha-labs.vercel.app/api/webhooks/upi-gateway', 30, true, 'generic_upi'
WHERE NOT EXISTS (SELECT 1 FROM public.gateway_settings);

-- 2. GATEWAY TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.gateway_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.client_organizations(id) ON DELETE CASCADE,
  gateway_order_no TEXT NOT NULL UNIQUE,
  client_order_id TEXT NOT NULL UNIQUE,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL CHECK (status IN ('created', 'pending', 'paid', 'expired', 'failed', 'under_review')) DEFAULT 'created',
  environment TEXT NOT NULL CHECK (environment IN ('sandbox', 'live')) DEFAULT 'sandbox',
  payment_url TEXT,
  upi_intent TEXT,
  utr TEXT,
  payment_provider TEXT,
  paid_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  raw_order_response JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. GATEWAY WEBHOOK EVENTS TABLE (Deduplication, Sequence & Replay Defense)
CREATE TABLE IF NOT EXISTS public.gateway_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT NOT NULL UNIQUE, -- Crucial for exact idempotency
  event_type TEXT NOT NULL,
  event_sequence INT,
  environment TEXT NOT NULL CHECK (environment IN ('sandbox', 'live')),
  gateway_order_no TEXT,
  payload JSONB NOT NULL,
  signature_header TEXT,
  signature_valid BOOLEAN NOT NULL DEFAULT false,
  processed BOOLEAN NOT NULL DEFAULT false,
  processing_error TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- 4. PERFORMANCE & LOOKUP INDEXES
CREATE INDEX IF NOT EXISTS idx_gt_invoice_id ON public.gateway_transactions(invoice_id);
CREATE INDEX IF NOT EXISTS idx_gt_org_id ON public.gateway_transactions(organization_id);
CREATE INDEX IF NOT EXISTS idx_gt_order_no ON public.gateway_transactions(gateway_order_no);
CREATE INDEX IF NOT EXISTS idx_gt_status ON public.gateway_transactions(status);
CREATE INDEX IF NOT EXISTS idx_gt_environment ON public.gateway_transactions(environment);
CREATE INDEX IF NOT EXISTS idx_gwe_event_id ON public.gateway_webhook_events(event_id);
CREATE INDEX IF NOT EXISTS idx_gwe_order_no ON public.gateway_webhook_events(gateway_order_no);
CREATE INDEX IF NOT EXISTS idx_gwe_processed ON public.gateway_webhook_events(processed);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.gateway_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gateway_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gateway_webhook_events ENABLE ROW LEVEL SECURITY;

-- A. Gateway Settings
DROP POLICY IF EXISTS "Admin full access gateway_settings" ON public.gateway_settings;
CREATE POLICY "Admin full access gateway_settings" ON public.gateway_settings FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

-- B. Gateway Transactions
DROP POLICY IF EXISTS "Admin full access gateway_transactions" ON public.gateway_transactions;
CREATE POLICY "Admin full access gateway_transactions" ON public.gateway_transactions FOR ALL USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Client read own gateway_transactions" ON public.gateway_transactions;
CREATE POLICY "Client read own gateway_transactions" ON public.gateway_transactions FOR SELECT USING (
  public.is_client_member_of_org(organization_id)
);

-- C. Gateway Webhook Events (Internal & Service Role only)
DROP POLICY IF EXISTS "Admin read gateway_webhook_events" ON public.gateway_webhook_events;
CREATE POLICY "Admin read gateway_webhook_events" ON public.gateway_webhook_events FOR SELECT USING (
  auth.role() = 'service_role' OR public.is_admin()
);

DROP POLICY IF EXISTS "Service role manage gateway_webhook_events" ON public.gateway_webhook_events;
CREATE POLICY "Service role manage gateway_webhook_events" ON public.gateway_webhook_events FOR ALL USING (
  auth.role() = 'service_role'
);

-- Flush PostgREST schema cache
NOTIFY pgrst, 'reload schema';
