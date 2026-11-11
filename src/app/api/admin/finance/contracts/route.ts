import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateContractNumber } from '@/lib/finance/calculator';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get('organizationId');
    const status = searchParams.get('status');

    let query = adminClient
      .from('contracts')
      .select('*')
      .order('created_at', { ascending: false });

    if (orgId) {
      query = query.eq('organization_id', orgId);
    }
    if (status) {
      query = query.eq('status', status);
    }

    const { data: contracts, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ contracts: contracts || [] });
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
      title,
      contractType,
      effectiveDate,
      expiryDate,
      contractValue,
      currency,
      status,
      documentUrl,
      termsSummary,
      clientVisible,
    } = body;

    if (!organizationId || !title || !contractType || !effectiveDate) {
      return NextResponse.json(
        { error: 'Organization ID, title, contract type, and effective date are required.' },
        { status: 400 }
      );
    }

    const contractNumber = body.contractNumber || await generateContractNumber(adminClient);

    const { data: contract, error } = await adminClient
      .from('contracts')
      .insert({
        contract_number: contractNumber,
        organization_id: organizationId,
        project_id: projectId || null,
        quotation_id: quotationId || null,
        title,
        contract_type: contractType,
        effective_date: effectiveDate,
        expiry_date: expiryDate || null,
        contract_value: Number(contractValue || 0),
        currency: currency || 'INR',
        status: status || 'draft',
        document_url: documentUrl || null,
        terms_summary: termsSummary || null,
        client_visible: clientVisible !== false,
        created_by: verified.userId,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'CREATE_CONTRACT',
      entity_type: 'contract',
      entity_id: contract.id,
      metadata: { contractNumber, title, contractValue },
    });

    return NextResponse.json({ success: true, contract });
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
    const { id, status, signedOfflineAt, documentUrl } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Contract ID and status are required.' }, { status: 400 });
    }

    const { data: updated, error } = await adminClient
      .from('contracts')
      .update({
        status,
        ...(signedOfflineAt ? { signed_offline_at: signedOfflineAt } : {}),
        ...(documentUrl ? { document_url: documentUrl } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await adminClient.from('finance_audit_logs').insert({
      actor_user_id: verified.userId,
      actor_email: verified.email,
      actor_role: verified.role,
      action: 'UPDATE_CONTRACT_STATUS',
      entity_type: 'contract',
      entity_id: id,
      metadata: { status, contractNumber: updated.contract_number },
    });

    return NextResponse.json({ success: true, contract: updated });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
