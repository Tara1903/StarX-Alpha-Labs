import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { generatePaymentReference, roundCurrency } from '@/lib/finance/calculator';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const invoiceId = searchParams.get('invoiceId');
    const orgId = searchParams.get('organizationId');

    let query = adminClient
      .from('payment_records')
      .select('*')
      .order('payment_date', { ascending: false });

    if (invoiceId) {
      query = query.eq('invoice_id', invoiceId);
    }
    if (orgId) {
      query = query.eq('organization_id', orgId);
    }

    const { data: payments, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ payments: payments || [] });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();
    const body = await req.json();

    const {
      invoiceId,
      organizationId,
      amountReceived,
      currency,
      paymentDate,
      paymentMethod,
      externalTransactionRef,
      internalNotes,
      verificationStatus,
      receiptUrl,
    } = body;

    if (!invoiceId || !organizationId || !amountReceived || !paymentMethod) {
      return NextResponse.json(
        { error: 'Invoice ID, organization ID, amount, and payment method are required.' },
        { status: 400 }
      );
    }

    // 1. Fetch current invoice
    const { data: invoice, error: invErr } = await adminClient
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();

    if (invErr || !invoice) {
      return NextResponse.json({ error: 'Invoice not found.' }, { status: 404 });
    }

    const paymentAmount = roundCurrency(Number(amountReceived));

    if (paymentAmount <= 0) {
      return NextResponse.json({ error: 'Payment amount must be greater than zero.' }, { status: 400 });
    }

    // Overpayment check
    const currentOutstanding = Number(invoice.outstanding_balance);
    if (paymentAmount > currentOutstanding) {
      return NextResponse.json(
        { error: `Payment amount (₹${paymentAmount}) exceeds current outstanding balance (₹${currentOutstanding}).` },
        { status: 400 }
      );
    }

    const paymentRef = body.paymentReference || await generatePaymentReference(adminClient);
    const isVerified = verificationStatus !== 'pending_verification';

    // 2. Insert payment record
    const { data: payment, error: payErr } = await adminClient
      .from('payment_records')
      .insert({
        payment_reference: paymentRef,
        invoice_id: invoiceId,
        organization_id: organizationId,
        amount_received: paymentAmount,
        currency: currency || invoice.currency || 'INR',
        payment_date: paymentDate || new Date().toISOString().split('T')[0],
        payment_method: paymentMethod,
        external_transaction_ref: externalTransactionRef || null,
        internal_notes: internalNotes || null,
        recorded_by: verified.userId,
        verified_by: isVerified ? verified.userId : null,
        verification_status: isVerified ? 'verified' : 'pending_verification',
        verified_at: isVerified ? new Date().toISOString() : null,
        receipt_url: receiptUrl || null,
      })
      .select()
      .single();

    if (payErr) {
      return NextResponse.json({ error: payErr.message }, { status: 500 });
    }

    // 3. Recalculate invoice balance
    if (isVerified) {
      await adminClient.rpc('recalculate_invoice_balance' as any, { target_invoice_id: invoiceId });
    }

    // 4. Finance audit log
    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'RECORD_OFFLINE_PAYMENT',
      entity_type: 'payment_record',
      entity_id: payment.id,
      metadata: {
        paymentRef,
        invoiceNumber: invoice.invoice_number,
        amount: paymentAmount,
        method: paymentMethod,
        externalRef: externalTransactionRef,
      },
    });

    return NextResponse.json({ success: true, payment });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();
    const body = await req.json();
    const { id, verificationStatus, internalNotes } = body;

    if (!id || !verificationStatus) {
      return NextResponse.json({ error: 'Payment ID and verification status are required.' }, { status: 400 });
    }

    const { data: payment, error: fetchErr } = await adminClient
      .from('payment_records')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchErr || !payment) {
      return NextResponse.json({ error: 'Payment record not found.' }, { status: 404 });
    }

    const { data: updated, error: updateErr } = await adminClient
      .from('payment_records')
      .update({
        verification_status: verificationStatus,
        verified_by: verificationStatus === 'verified' ? verified.userId : payment.verified_by,
        verified_at: verificationStatus === 'verified' ? new Date().toISOString() : payment.verified_at,
        ...(internalNotes ? { internal_notes: internalNotes } : {}),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    // Recalculate invoice balance
    await adminClient.rpc('recalculate_invoice_balance' as any, { target_invoice_id: payment.invoice_id });

    // Audit log
    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'UPDATE_PAYMENT_VERIFICATION',
      entity_type: 'payment_record',
      entity_id: id,
      metadata: { verificationStatus, paymentReference: payment.payment_reference },
    });

    return NextResponse.json({ success: true, payment: updated });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
