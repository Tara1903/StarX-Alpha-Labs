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
      .from('client_documents')
      .select('*')
      .eq('organization_id', verified.organizationId)
      .eq('client_visible', true)
      .order('created_at', { ascending: false });

    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data: documents, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ documents: documents || [] });
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

    const { projectId, fileName, fileUrl, fileType, fileSizeBytes, documentCategory } = body;

    if (!projectId || !fileName || !fileUrl) {
      return NextResponse.json(
        { error: 'Missing required file information.' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // Verify project belongs to client's organization
    const { data: project } = await adminClient
      .from('client_projects')
      .select('id')
      .eq('id', projectId)
      .eq('organization_id', verified.organizationId)
      .single();

    if (!project) {
      return NextResponse.json(
        { error: 'Project does not belong to your organization.' },
        { status: 403 }
      );
    }

    const { data: document, error } = await adminClient
      .from('client_documents')
      .insert({
        project_id: projectId,
        organization_id: verified.organizationId,
        file_name: fileName,
        file_url: fileUrl,
        file_type: fileType || 'application/octet-stream',
        file_size_bytes: fileSizeBytes || 0,
        document_category: documentCategory || 'client_upload',
        version: 'v1.0',
        uploaded_by_type: 'client',
        uploaded_by_user: verified.userId,
        client_visible: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, document });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
