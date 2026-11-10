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
      .from('industries')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, industries: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch industries.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin', 'editor']);
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: 'Industry ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('industries')
      .update({
        name: body.name,
        badge: body.badge,
        tagline: body.tagline,
        overview: body.overview,
        challenges: body.challenges,
        solutions: body.solutions,
        featured_capabilities: body.featured_capabilities,
        recommended_services: body.recommended_services,
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
      action: 'INDUSTRY_UPDATED',
      entityType: 'industries',
      entityId: data.id,
      metadata: { slug: data.slug, name: data.name },
    });

    revalidatePath('/industries');
    revalidatePath(`/industries/${data.slug}`);

    return NextResponse.json({ success: true, industry: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to update industry.' }, { status: 500 });
  }
}
