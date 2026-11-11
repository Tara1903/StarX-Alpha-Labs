import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { calculateInvoiceTotals, generateInvoiceNumber } from '@/lib/finance/calculator';
import type { InvoiceItem } from '@/types/finance';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const orgId = searchParams.get('organizationId');

    let query = adminClient
      .from('invoices')
      .select('*')
      .order('issue_date', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (orgId) {
      query = query.eq('organization_id', orgId);
    }

    const { data: invoices, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ invoices: invoices || [] });
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
      organizationId,
      projectId,
      quotationId,
      contractId,
      clientName,
      clientEmail,
      clientBusiness,
      billingAddress,
      issueDate,
      dueDate,
      currency,
      items,
      discountAmount,
      taxRatePercent,
      taxName,
      paymentTerms,
      notes,
      status,
    } = body;

    if (!organizationId || !clientName || !clientEmail || !dueDate) {
      return NextResponse.json(
        { error: 'Organization ID, client name, client email, and due date are required.' },
        { status: 400 }
      );
    }

    const invoiceItems: InvoiceItem[] = Array.isArray(items) && items.length > 0
      ? items
      : [{
          id: '1',
          description: 'Engineering & Development Services',
          quantity: 1,
          unitPrice: Number(body.subtotal || 0),
          amount: Number(body.subtotal || 0),
        }];

    // Authoritative calculation
    const calc = calculateInvoiceTotals(
      invoiceItems,
      Number(discountAmount || 0),
      Number(taxRatePercent ?? 18),
      0
    );

    const invoiceNumber = body.invoiceNumber || await generateInvoiceNumber(adminClient);

    const { data: invoice, error } = await adminClient
      .from('invoices')
      .insert({
        invoice_number: invoiceNumber,
        organization_id: organizationId,
        project_id: projectId || null,
        quotation_id: quotationId || null,
        contract_id: contractId || null,
        client_name: clientName,
        client_email: clientEmail,
        client_business: clientBusiness || null,
        billing_address: billingAddress || null,
        issue_date: issueDate || new Date().toISOString().split('T')[0],
        due_date: dueDate,
        currency: currency || 'INR',
        items: invoiceItems as any,
        subtotal: calc.subtotal,
        discount_amount: calc.discountAmount,
        tax_name: taxName || 'GST',
        tax_rate_percent: Number(taxRatePercent ?? 18),
        tax_amount: calc.taxAmount,
        total_amount: calc.totalAmount,
        paid_amount: 0,
        outstanding_balance: calc.outstandingBalance,
        status: status || 'issued',
        payment_terms: paymentTerms || 'Payment due within 15 days of invoice date via direct bank transfer.',
        notes: notes || null,
        created_by: verified.userId,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Finance audit log
    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'ISSUE_INVOICE',
      entity_type: 'invoice',
      entity_id: invoice.id,
      metadata: { invoiceNumber, totalAmount: calc.totalAmount, clientEmail },
    });

    return NextResponse.json({ success: true, invoice });
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
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Invoice ID and status are required.' }, { status: 400 });
    }

    const { data: updated, error } = await adminClient
      .from('invoices')
      .update({
        status,
        ...(notes !== undefined ? { notes } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Finance audit log
    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'UPDATE_INVOICE_STATUS',
      entity_type: 'invoice',
      entity_id: id,
      metadata: { status, invoiceNumber: updated.invoice_number },
    });

    return NextResponse.json({ success: true, invoice: updated });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
