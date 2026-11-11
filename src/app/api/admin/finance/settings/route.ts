import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    const { data: settings, error } = await adminClient
      .from('finance_settings')
      .select('*')
      .limit(1)
      .single();

    if (error || !settings) {
      return NextResponse.json({
        settings: {
          default_currency: 'INR',
          supported_currencies: ['INR', 'USD', 'EUR', 'AED', 'GBP'],
          invoice_prefix: 'INV',
          quotation_prefix: 'QTN',
          contract_prefix: 'CNT',
          fiscal_year_start_month: 4,
          default_payment_terms_days: 15,
          default_quotation_validity_days: 30,
          tax_name: 'GST',
          default_tax_rate: 18.00,
          company_legal_name: 'StarX Alpha Labs',
          company_billing_address: 'Bangalore, Karnataka, India',
          bank_payment_instructions: {
            beneficiary_name: 'StarX Alpha Labs',
            bank_name: 'HDFC Bank',
            account_number: '50200088991122',
            ifsc_code: 'HDFC0001234',
            account_type: 'Current Account',
            upi_id: 'starxalphalabs@okhdfcbank',
            notes: 'Please mention your Invoice Number in the transfer remarks.',
          },
        },
      });
    }

    return NextResponse.json({ settings });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();
    const body = await req.json();

    const {
      defaultCurrency,
      invoicePrefix,
      quotationPrefix,
      contractPrefix,
      taxName,
      defaultTaxRate,
      taxIdNumber,
      companyLegalName,
      companyBillingAddress,
      bankPaymentInstructions,
      defaultPaymentTermsDays,
      defaultQuotationValidityDays,
    } = body;

    const { data: existing } = await adminClient
      .from('finance_settings')
      .select('id')
      .limit(1)
      .single();

    let result;
    if (existing?.id) {
      const { data, error } = await adminClient
        .from('finance_settings')
        .update({
          default_currency: defaultCurrency || 'INR',
          invoice_prefix: invoicePrefix || 'INV',
          quotation_prefix: quotationPrefix || 'QTN',
          contract_prefix: contractPrefix || 'CNT',
          tax_name: taxName || 'GST',
          default_tax_rate: Number(defaultTaxRate ?? 18),
          tax_id_number: taxIdNumber || null,
          company_legal_name: companyLegalName || 'StarX Alpha Labs',
          company_billing_address: companyBillingAddress || null,
          bank_payment_instructions: bankPaymentInstructions || {},
          default_payment_terms_days: Number(defaultPaymentTermsDays || 15),
          default_quotation_validity_days: Number(defaultQuotationValidityDays || 30),
          updated_by: verified.userId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await adminClient
        .from('finance_settings')
        .insert({
          default_currency: defaultCurrency || 'INR',
          invoice_prefix: invoicePrefix || 'INV',
          quotation_prefix: quotationPrefix || 'QTN',
          contract_prefix: contractPrefix || 'CNT',
          tax_name: taxName || 'GST',
          default_tax_rate: Number(defaultTaxRate ?? 18),
          tax_id_number: taxIdNumber || null,
          company_legal_name: companyLegalName || 'StarX Alpha Labs',
          company_billing_address: companyBillingAddress || null,
          bank_payment_instructions: bankPaymentInstructions || {},
          updated_by: verified.userId,
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'UPDATE_FINANCE_SETTINGS',
      entity_type: 'finance_settings',
      entity_id: result.id,
      metadata: { defaultCurrency, companyLegalName },
    });

    return NextResponse.json({ success: true, settings: result });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
