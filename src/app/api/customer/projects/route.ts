import { NextRequest, NextResponse } from 'next/server';
import { requireClientMember, ClientAuthError } from '@/lib/auth/customer';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const verified = await requireClientMember();
    const adminClient = createAdminClient();

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (projectId) {
      // 1. Fetch single project details with organization ownership verification
      const { data: project, error: pError } = await adminClient
        .from('client_projects')
        .select('*')
        .eq('id', projectId)
        .eq('organization_id', verified.organizationId)
        .single();

      if (pError || !project) {
        return NextResponse.json(
          { error: 'Project not found or access denied.' },
          { status: 404 }
        );
      }

      // Fetch client-visible milestones
      const { data: milestones } = await adminClient
        .from('project_milestones')
        .select('*')
        .eq('project_id', projectId)
        .eq('client_visible', true)
        .order('stage_order', { ascending: true });

      // Fetch client-visible tasks
      const { data: tasks } = await adminClient
        .from('client_tasks')
        .select('*')
        .eq('project_id', projectId)
        .eq('client_visible', true)
        .order('created_at', { ascending: false });

      // Fetch client-visible updates
      const { data: updates } = await adminClient
        .from('project_updates')
        .select('*')
        .eq('project_id', projectId)
        .eq('client_visible', true)
        .order('published_at', { ascending: false });

      return NextResponse.json({
        project,
        milestones: milestones || [],
        tasks: tasks || [],
        updates: updates || [],
      });
    }

    // 2. Fetch all projects belonging to client's organization
    const { data: projects, error } = await adminClient
      .from('client_projects')
      .select('id, project_code, solution_title, division, stage, total_cost, target_delivery, created_at')
      .eq('organization_id', verified.organizationId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ projects: projects || [] });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
