import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateAdjustmentNumber, roundCurrency } from '@/lib/finance/calculator';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const invoiceId = searchParams.get('invoiceId');
    const orgId = searchParams.get('organizationId');

    let query = adminClient
      .from('financial_adjustments')
      .select('*')
      .order('created_at', { ascending: false });

    if (invoiceId) {
      query = query.eq('invoice_id', invoiceId);
    }
    if (orgId) {
      query = query.eq('organization_id', orgId);
    }

    const { data: adjustments, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ adjustments: adjustments || [] });
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
      paymentId,
      adjustmentType,
      amount,
      currency,
      reason,
      status,
    } = body;

    if (!invoiceId || !organizationId || !adjustmentType || !amount || !reason) {
      return NextResponse.json(
        { error: 'Invoice ID, organization ID, adjustment type, amount, and reason are required.' },
        { status: 400 }
      );
    }

    const adjAmount = roundCurrency(Number(amount));
    const adjustmentNumber = body.adjustmentNumber || await generateAdjustmentNumber(adminClient, adjustmentType);

    const { data: adjustment, error } = await adminClient
      .from('financial_adjustments')
      .insert({
        adjustment_number: adjustmentNumber,
        invoice_id: invoiceId,
        organization_id: organizationId,
        payment_id: paymentId || null,
        adjustment_type: adjustmentType,
        amount: adjAmount,
        currency: currency || 'INR',
        reason,
        status: status || 'applied',
        created_by: verified.userId,
        approved_by: verified.userId,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Recalculate invoice balance
    await adminClient.rpc('recalculate_invoice_balance' as any, { target_invoice_id: invoiceId });

    // Audit log
    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'CREATE_FINANCIAL_ADJUSTMENT',
      entity_type: 'financial_adjustment',
      entity_id: adjustment.id,
      metadata: { adjustmentNumber, adjustmentType, amount: adjAmount, reason },
    });

    return NextResponse.json({ success: true, adjustment });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
