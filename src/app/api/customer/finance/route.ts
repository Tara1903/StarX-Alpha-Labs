import { NextRequest, NextResponse } from 'next/server';
import { requireClientMember, ClientAuthError } from '@/lib/auth/customer';
import { createAdminClient } from '@/lib/supabase/admin';
import { generatePaymentReference, roundCurrency } from '@/lib/finance/calculator';

export async function GET() {
  try {
    const verified = await requireClientMember();
    const adminClient = createAdminClient();

    // 1. Fetch organization's sent/approved quotations
    const { data: quotations } = await adminClient
      .from('quotations')
      .select('*')
      .eq('organization_id', verified.organizationId)
      .in('status', ['sent', 'accepted', 'rejected', 'expired'])
      .order('created_at', { ascending: false });

    // 2. Fetch organization's issued invoices
    const { data: invoices } = await adminClient
      .from('invoices')
      .select('*')
      .eq('organization_id', verified.organizationId)
      .in('status', ['issued', 'partially_paid', 'paid', 'overdue'])
      .order('issue_date', { ascending: false });

    // 3. Fetch verified payments
    const { data: payments } = await adminClient
      .from('payment_records')
      .select('*')
      .eq('organization_id', verified.organizationId)
      .eq('verification_status', 'verified')
      .order('payment_date', { ascending: false });

    // 4. Fetch shared contracts
    const { data: contracts } = await adminClient
      .from('contracts')
      .select('*')
      .eq('organization_id', verified.organizationId)
      .eq('client_visible', true)
      .order('created_at', { ascending: false });

    // 5. Fetch bank payment instructions
    const { data: settings } = await adminClient
      .from('finance_settings')
      .select('bank_payment_instructions, company_legal_name, company_billing_address, tax_name, tax_id_number')
      .limit(1)
      .single();

    return NextResponse.json({
      quotations: quotations || [],
      invoices: invoices || [],
      payments: payments || [],
      contracts: contracts || [],
      paymentInstructions: settings?.bank_payment_instructions || null,
      companyDetails: {
        legalName: settings?.company_legal_name || 'StarX Alpha Labs',
        billingAddress: settings?.company_billing_address || 'Bangalore, Karnataka, India',
        taxName: settings?.tax_name || 'GST',
        taxIdNumber: settings?.tax_id_number || null,
      },
    });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const verified = await requireClientMember();
    const adminClient = createAdminClient();
    const body = await req.json();
    const { action } = body;

    // Action 1: Client Accept or Reject Quotation
    if (action === 'respond_quotation') {
      const { quotationId, decision, rejectionReason } = body;

      if (!quotationId || !['accepted', 'rejected'].includes(decision)) {
        return NextResponse.json({ error: 'Quotation ID and valid decision (accepted/rejected) are required.' }, { status: 400 });
      }

      // Verify quotation belongs to client's organization
      const { data: quote, error: fetchErr } = await adminClient
        .from('quotations')
        .select('*')
        .eq('id', quotationId)
        .eq('organization_id', verified.organizationId)
        .single();

      if (fetchErr || !quote) {
        return NextResponse.json({ error: 'Unauthorized or non-existent quotation.' }, { status: 403 });
      }

      if (quote.status === 'accepted') {
        return NextResponse.json({ error: 'Quotation has already been accepted.' }, { status: 400 });
      }

      const { data: updated, error: updateErr } = await adminClient
        .from('quotations')
        .update({
          status: decision,
          accepted_by: decision === 'accepted' ? verified.userId : null,
          accepted_at: decision === 'accepted' ? new Date().toISOString() : null,
          rejection_reason: decision === 'rejected' ? (rejectionReason || 'Declined by client') : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', quotationId)
        .select()
        .single();

      if (updateErr) throw updateErr;

      // Log to finance audit
      await adminClient.from('finance_audit_logs').insert({
        actor_user_id: verified.userId,
        actor_email: verified.email,
        actor_role: 'client',
        action: decision === 'accepted' ? 'CLIENT_ACCEPT_QUOTATION' : 'CLIENT_REJECT_QUOTATION',
        entity_type: 'quotation',
        entity_id: quotationId,
        metadata: { quoteNumber: quote.quote_number, decision },
      });

      return NextResponse.json({ success: true, quotation: updated });
    }

    // Action 2: Client Submit External Payment Acknowledgment
    if (action === 'submit_payment_ref') {
      const { invoiceId, amount, paymentMethod, externalTransactionRef, notes } = body;

      if (!invoiceId || !amount || !externalTransactionRef) {
        return NextResponse.json({ error: 'Invoice ID, payment amount, and bank transfer reference (UTR/Transaction ID) are required.' }, { status: 400 });
      }

      // Verify invoice belongs to organization
      const { data: invoice, error: invErr } = await adminClient
        .from('invoices')
        .select('*')
        .eq('id', invoiceId)
        .eq('organization_id', verified.organizationId)
        .single();

      if (invErr || !invoice) {
        return NextResponse.json({ error: 'Unauthorized or non-existent invoice.' }, { status: 403 });
      }

      const paymentRef = await generatePaymentReference(adminClient);
      const paymentAmount = roundCurrency(Number(amount));

      // Record with verification_status = 'pending_verification'
      // NEVER automatically marks invoice as paid!
      const { data: paymentRecord, error: payErr } = await adminClient
        .from('payment_records')
        .insert({
          payment_reference: paymentRef,
          invoice_id: invoiceId,
          organization_id: verified.organizationId,
          amount_received: paymentAmount,
          currency: invoice.currency,
          payment_date: new Date().toISOString().split('T')[0],
          payment_method: paymentMethod || 'bank_transfer',
          external_transaction_ref: externalTransactionRef,
          internal_notes: `Submitted by client member ${verified.fullName} (${verified.email}): ${notes || 'External transfer'}`,
          recorded_by: verified.userId,
          verification_status: 'pending_verification',
        })
        .select()
        .single();

      if (payErr) throw payErr;

      // Log to audit
      await adminClient.from('finance_audit_logs').insert({
        actor_user_id: verified.userId,
        actor_email: verified.email,
        actor_role: 'client',
        action: 'CLIENT_SUBMIT_PAYMENT_REF',
        entity_type: 'payment_record',
        entity_id: paymentRecord.id,
        metadata: {
          invoiceNumber: invoice.invoice_number,
          amount: paymentAmount,
          externalRef: externalTransactionRef,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Your payment acknowledgment reference has been recorded and submitted for administrator verification.',
        payment: paymentRecord,
      });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
