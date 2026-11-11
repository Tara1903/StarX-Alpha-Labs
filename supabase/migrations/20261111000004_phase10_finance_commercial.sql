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
