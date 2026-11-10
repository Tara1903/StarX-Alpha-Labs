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
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, posts: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch blog posts.' }, { status: 500 });
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
      .from('blog_posts')
      .insert({
        title: body.title,
        slug: body.slug.toLowerCase().trim(),
        excerpt: body.excerpt || '',
        content: body.content || '',
        featured_image: body.featured_image || null,
        author_name: body.author_name || 'StarX Alpha Engineering Team',
        author_role: body.author_role || 'Platform Architecture',
        read_time: body.read_time || '5 min read',
        category: body.category || 'Engineering',
        tags: body.tags || [],
        status: body.status || 'draft',
        published_at: body.status === 'published' ? new Date().toISOString() : null,
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
      action: 'BLOG_POST_CREATED',
      entityType: 'blog_posts',
      entityId: data.id,
      metadata: { slug: data.slug, title: data.title },
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${data.slug}`);

    return NextResponse.json({ success: true, post: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to create blog post.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin', 'editor']);
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: 'Post ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('blog_posts')
      .update({
        title: body.title,
        slug: body.slug ? body.slug.toLowerCase().trim() : undefined,
        excerpt: body.excerpt,
        content: body.content,
        featured_image: body.featured_image,
        author_name: body.author_name,
        author_role: body.author_role,
        read_time: body.read_time,
        category: body.category,
        tags: body.tags,
        status: body.status,
        published_at: body.status === 'published' ? (body.published_at || new Date().toISOString()) : null,
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
      action: 'BLOG_POST_UPDATED',
      entityType: 'blog_posts',
      entityId: data.id,
      metadata: { slug: data.slug, status: data.status },
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${data.slug}`);

    return NextResponse.json({ success: true, post: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to update blog post.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin']);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data: existing } = await adminClient.from('blog_posts').select('slug, title').eq('id', id).single();
    const { error } = await adminClient.from('blog_posts').delete().eq('id', id);

    if (error) throw error;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'BLOG_POST_DELETED',
      entityType: 'blog_posts',
      entityId: id,
      metadata: { deletedSlug: existing?.slug, title: existing?.title },
    });

    revalidatePath('/blog');

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully.' });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to delete blog post.' }, { status: 500 });
  }
}
