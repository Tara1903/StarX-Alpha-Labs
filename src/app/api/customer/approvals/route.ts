import { NextRequest, NextResponse } from 'next/server';
import { requireClientMember, ClientAuthError } from '@/lib/auth/customer';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const verified = await requireClientMember(['owner', 'member']);
    const body = await req.json();

    const { projectId, itemType, itemId, itemTitle, decision, notes } = body;

    if (!projectId || !itemType || !itemId || !decision) {
      return NextResponse.json(
        { error: 'Missing required approval fields.' },
        { status: 400 }
      );
    }

    if (!['approved', 'changes_requested'].includes(decision)) {
      return NextResponse.json(
        { error: 'Invalid decision type. Must be approved or changes_requested.' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // Verify project belongs to client's organization
    const { data: project } = await adminClient
      .from('client_projects')
      .select('id, organization_id')
      .eq('id', projectId)
      .eq('organization_id', verified.organizationId)
      .single();

    if (!project) {
      return NextResponse.json(
        { error: 'Unauthorized project reference.' },
        { status: 403 }
      );
    }

    // Insert approval record
    const { data: approval, error } = await adminClient
      .from('client_approvals')
      .insert({
        project_id: projectId,
        item_type: itemType,
        item_id: itemId,
        item_title: itemTitle || 'Deliverable Item',
        client_user_id: verified.userId,
        decision,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update milestone status if approving a milestone
    if (itemType === 'milestone') {
      const newStatus = decision === 'approved' ? 'completed' : 'awaiting_client';
      await adminClient
        .from('project_milestones')
        .update({
          status: newStatus,
          actual_completion_date: decision === 'approved' ? new Date().toISOString().slice(0, 10) : null,
        })
        .eq('id', itemId)
        .eq('project_id', projectId);
    }

    return NextResponse.json({ success: true, approval });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
