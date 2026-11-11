import { NextRequest, NextResponse } from 'next/server';
import { requireClientMember, ClientAuthError } from '@/lib/auth/customer';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireClientMember();
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    // Verify project belongs to organization
    const { data: project } = await adminClient
      .from('client_projects')
      .select('id')
      .eq('id', projectId)
      .eq('organization_id', verified.organizationId)
      .single();

    if (!project) {
      return NextResponse.json({ error: 'Project not found or access denied.' }, { status: 404 });
    }

    const { data: messages, error } = await adminClient
      .from('project_discussions')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ messages: messages || [] });
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

    const { projectId, message, attachments } = body;

    if (!projectId || !message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
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

    const { data: discussion, error } = await adminClient
      .from('project_discussions')
      .insert({
        project_id: projectId,
        sender_user_id: verified.userId,
        sender_name: verified.fullName,
        sender_type: 'client',
        message: message.trim(),
        attachments: attachments || [],
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, discussion });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
