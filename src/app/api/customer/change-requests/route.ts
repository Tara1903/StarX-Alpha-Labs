import { NextRequest, NextResponse } from 'next/server';
import { requireClientMember, ClientAuthError } from '@/lib/auth/customer';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireClientMember();
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    let query = adminClient
      .from('client_change_requests')
      .select('*')
      .eq('organization_id', verified.organizationId)
      .order('created_at', { ascending: false });

    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data: requests, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ changeRequests: requests || [] });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const verified = await requireClientMember(['owner', 'member']);
    const body = await req.json();

    const { projectId, title, description, justification, priority } = body;

    if (!projectId || !title || !description) {
      return NextResponse.json(
        { error: 'Missing required change request information.' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // Verify project belongs to organization
    const { data: project } = await adminClient
      .from('client_projects')
      .select('id')
      .eq('id', projectId)
      .eq('organization_id', verified.organizationId)
      .single();

    if (!project) {
      return NextResponse.json({ error: 'Unauthorized project.' }, { status: 403 });
    }

    const { data: changeRequest, error } = await adminClient
      .from('client_change_requests')
      .insert({
        project_id: projectId,
        organization_id: verified.organizationId,
        title,
        description,
        justification: justification || null,
        priority: priority || 'medium',
        status: 'new',
        submitted_by: verified.userId,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, changeRequest });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
