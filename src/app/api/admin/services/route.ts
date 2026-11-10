import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { logAdminAction } from '@/lib/audit';
import { revalidatePath } from 'next/cache';

// GET: List all services (drafts, published, archived)
export async function GET() {
  try {
    await requireAdmin(['owner', 'admin', 'editor']);
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, services: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch services.' }, { status: 500 });
  }
}

// POST: Create a new service
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin', 'editor']);
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('services')
      .insert({
        title: body.title,
        slug: body.slug.toLowerCase().trim(),
        short_description: body.short_description || null,
        description: body.description || '',
        content: body.content || {},
        category: body.category || 'digital',
        category_label: body.category_label || 'STARX DIGITAL',
        division_slug: body.division_slug || 'starx-digital',
        status: body.status || 'draft',
        display_order: body.display_order || 0,
        seo_title: body.seo_title || null,
        seo_description: body.seo_description || null,
        published_at: body.status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) throw error;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'SERVICE_CREATED',
      entityType: 'services',
      entityId: data.id,
      metadata: { slug: data.slug, title: data.title },
    });

    revalidatePath('/services');
    revalidatePath(`/services/${data.slug}`);

    return NextResponse.json({ success: true, service: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to create service.' }, { status: 500 });
  }
}

// PUT: Update an existing service
export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin', 'editor']);
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: 'Service ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('services')
      .update({
        title: body.title,
        slug: body.slug ? body.slug.toLowerCase().trim() : undefined,
        short_description: body.short_description,
        description: body.description,
        content: body.content,
        category: body.category,
        category_label: body.category_label,
        division_slug: body.division_slug,
        status: body.status,
        display_order: body.display_order,
        seo_title: body.seo_title,
        seo_description: body.seo_description,
        published_at: body.status === 'published' ? (body.published_at || new Date().toISOString()) : null,
      })
      .eq('id', body.id)
      .select()
      .single();

    if (error) throw error;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'SERVICE_UPDATED',
      entityType: 'services',
      entityId: data.id,
      metadata: { slug: data.slug, status: data.status },
    });

    revalidatePath('/services');
    revalidatePath(`/services/${data.slug}`);

    return NextResponse.json({ success: true, service: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to update service.' }, { status: 500 });
  }
}

// DELETE: Delete a service (Owner/Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin']);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data: existing } = await adminClient.from('services').select('slug, title').eq('id', id).single();
    const { error } = await adminClient.from('services').delete().eq('id', id);

    if (error) throw error;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'SERVICE_DELETED',
      entityType: 'services',
      entityId: id,
      metadata: { deletedSlug: existing?.slug, title: existing?.title },
    });

    revalidatePath('/services');

    return NextResponse.json({ success: true, message: 'Service deleted successfully.' });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to delete service.' }, { status: 500 });
  }
}
