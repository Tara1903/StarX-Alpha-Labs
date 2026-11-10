import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { logAdminAction } from '@/lib/audit';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    await requireAdmin(['owner', 'admin', 'editor']);
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('divisions')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, divisions: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch divisions.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin', 'editor']);
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: 'Division ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('divisions')
      .update({
        title: body.title,
        tagline: body.tagline,
        short_description: body.short_description,
        badge: body.badge,
        mission: body.mission,
        overview: body.overview,
        capabilities: body.capabilities,
        deliverables: body.deliverables,
        tech_stack: body.tech_stack,
        status: body.status,
        display_order: body.display_order,
        seo_title: body.seo_title,
        seo_description: body.seo_description,
      })
      .eq('id', body.id)
      .select()
      .single();

    if (error) throw error;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'DIVISION_UPDATED',
      entityType: 'divisions',
      entityId: data.id,
      metadata: { slug: data.slug, title: data.title },
    });

    revalidatePath('/divisions');
    revalidatePath(`/divisions/${data.slug}`);

    return NextResponse.json({ success: true, division: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to update division.' }, { status: 500 });
  }
}
