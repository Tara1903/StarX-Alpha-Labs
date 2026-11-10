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
      .from('portfolio_projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, portfolio: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch portfolio.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin', 'editor']);
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('portfolio_projects')
      .insert({
        title: body.title,
        slug: body.slug.toLowerCase().trim(),
        project_type: body.project_type || 'Architectural Demo',
        category: body.category || 'web',
        category_label: body.category_label || 'Web & Corporate Portal',
        tagline: body.tagline || '',
        description: body.description || '',
        features: body.features || [],
        tech_stack: body.tech_stack || [],
        architecture_highlights: body.architecture_highlights || [],
        demo_url: body.demo_url || null,
        github_url: body.github_url || null,
        verification_badge: body.verification_badge || 'StarX Alpha Architecture Demo',
        status: body.status || 'draft',
        featured: Boolean(body.featured),
        display_order: body.display_order || 0,
        seo_title: body.seo_title || null,
        seo_description: body.seo_description || null,
      })
      .select()
      .single();

    if (error) throw error;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'PORTFOLIO_PROJECT_CREATED',
      entityType: 'portfolio_projects',
      entityId: data.id,
      metadata: { slug: data.slug, title: data.title },
    });

    revalidatePath('/portfolio');
    revalidatePath(`/portfolio/${data.slug}`);

    return NextResponse.json({ success: true, project: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to create portfolio project.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin', 'editor']);
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('portfolio_projects')
      .update({
        title: body.title,
        slug: body.slug ? body.slug.toLowerCase().trim() : undefined,
        project_type: body.project_type,
        category: body.category,
        category_label: body.category_label,
        tagline: body.tagline,
        description: body.description,
        features: body.features,
        tech_stack: body.tech_stack,
        architecture_highlights: body.architecture_highlights,
        demo_url: body.demo_url,
        github_url: body.github_url,
        verification_badge: body.verification_badge,
        status: body.status,
        featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
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
      action: 'PORTFOLIO_PROJECT_UPDATED',
      entityType: 'portfolio_projects',
      entityId: data.id,
      metadata: { slug: data.slug, status: data.status },
    });

    revalidatePath('/portfolio');
    revalidatePath(`/portfolio/${data.slug}`);

    return NextResponse.json({ success: true, project: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to update portfolio project.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin']);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data: existing } = await adminClient.from('portfolio_projects').select('slug, title').eq('id', id).single();
    const { error } = await adminClient.from('portfolio_projects').delete().eq('id', id);

    if (error) throw error;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'PORTFOLIO_PROJECT_DELETED',
      entityType: 'portfolio_projects',
      entityId: id,
      metadata: { deletedSlug: existing?.slug, title: existing?.title },
    });

    revalidatePath('/portfolio');

    return NextResponse.json({ success: true, message: 'Portfolio project deleted successfully.' });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to delete portfolio project.' }, { status: 500 });
  }
}
