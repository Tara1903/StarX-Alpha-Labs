import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { calculateQuotationTotals, generateQuotationNumber } from '@/lib/finance/calculator';
import type { QuotationItem } from '@/types/finance';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const orgId = searchParams.get('organizationId');

    let query = adminClient
      .from('quotations')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }
    if (orgId) {
      query = query.eq('organization_id', orgId);
    }

    const { data: quotations, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ quotations: quotations || [] });
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
      clientName,
      clientEmail,
      clientPhone,
      clientBusiness,
      division,
      packageCode,
      packageName,
      scopeDescription,
      items,
      discountAmount,
      taxRatePercent,
      currency,
      validUntil,
      termsAndConditions,
      clientNotes,
      status,
    } = body;

    if (!clientName || !clientEmail || !division || !scopeDescription) {
      return NextResponse.json(
        { error: 'Client name, email, division, and scope description are required.' },
        { status: 400 }
      );
    }

    const quotationItems: QuotationItem[] = Array.isArray(items) && items.length > 0
      ? items
      : [{
          id: '1',
          description: scopeDescription,
          quantity: 1,
          unitPrice: Number(body.totalAmount || 0),
          discount: 0,
          amount: Number(body.totalAmount || 0),
        }];

    // Server-side authoritative calculation
    const calc = calculateQuotationTotals(
      quotationItems,
      Number(discountAmount || 0),
      Number(taxRatePercent ?? 18)
    );

    const quoteNumber = body.quoteNumber || await generateQuotationNumber(adminClient);

    const { data: quotation, error } = await adminClient
      .from('quotations')
      .insert({
        quote_number: quoteNumber,
        organization_id: organizationId || null,
        project_id: projectId || null,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone || null,
        client_business: clientBusiness || null,
        division,
        package_code: packageCode || null,
        package_name: packageName || null,
        scope_description: scopeDescription,
        items: quotationItems as any,
        subtotal: calc.subtotal,
        discount_amount: calc.discountAmount,
        tax_amount: calc.taxAmount,
        total_amount: calc.totalAmount,
        currency: currency || 'INR',
        status: status || 'draft',
        version: 1,
        valid_until: validUntil || null,
        terms_and_conditions: termsAndConditions || null,
        client_notes: clientNotes || null,
        created_by: verified.userId,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log to finance audit
    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'CREATE_QUOTATION',
      entity_type: 'quotation',
      entity_id: quotation.id,
      metadata: { quoteNumber, totalAmount: calc.totalAmount },
    });

    return NextResponse.json({ success: true, quotation });
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
    const { id, items, discountAmount, taxRatePercent, status, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: 'Quotation ID is required.' }, { status: 400 });
    }

    // 1. Fetch current quotation
    const { data: existing, error: fetchErr } = await adminClient
      .from('quotations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchErr || !existing) {
      return NextResponse.json({ error: 'Quotation not found.' }, { status: 404 });
    }

    // 2. Archive current version to quotation_versions
    await adminClient.from('quotation_versions').insert({
      quotation_id: id,
      version: existing.version || 1,
      snapshot: existing as any,
      created_by: verified.userId,
    });

    // 3. Recalculate totals
    const quotationItems = items || (existing.items as any) || [];
    const calc = calculateQuotationTotals(
      quotationItems,
      Number(discountAmount ?? existing.discount_amount),
      Number(taxRatePercent ?? 18)
    );

    const newVersion = (existing.version || 1) + 1;

    // 4. Update quotation
    const { data: updated, error: updateErr } = await adminClient
      .from('quotations')
      .update({
        ...rest,
        items: quotationItems,
        subtotal: calc.subtotal,
        discount_amount: calc.discountAmount,
        tax_amount: calc.taxAmount,
        total_amount: calc.totalAmount,
        status: status || existing.status,
        version: newVersion,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    // Audit log
    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'REVISE_QUOTATION',
      entity_type: 'quotation',
      entity_id: id,
      metadata: { newVersion, quoteNumber: existing.quote_number },
    });

    return NextResponse.json({ success: true, quotation: updated });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
