import { NextRequest, NextResponse } from 'next/server';
import { requireClientMember, ClientAuthError } from '@/lib/auth/customer';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const verified = await requireClientMember();
    const adminClient = createAdminClient();

    const { data: tickets, error } = await adminClient
      .from('client_support_requests')
      .select('*')
      .eq('organization_id', verified.organizationId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ tickets: tickets || [] });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const verified = await requireClientMember();
    const body = await req.json();

    const { subject, description, priority, projectId } = body;

    if (!subject || !description) {
      return NextResponse.json(
        { error: 'Subject and description are required.' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();
    const ticketNumber = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;

    const { data: ticket, error } = await adminClient
      .from('client_support_requests')
      .insert({
        ticket_number: ticketNumber,
        organization_id: verified.organizationId,
        project_id: projectId || null,
        subject,
        description,
        priority: priority || 'medium',
        status: 'open',
        created_by: verified.userId,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, ticket });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
