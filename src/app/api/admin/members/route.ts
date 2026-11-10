import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { logAdminAction } from '@/lib/audit';
import type { Database } from '@/types/database.types';

// GET: List all administrative members
export async function GET() {
  try {
    await requireAdmin(['owner', 'admin']);
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('admin_members')
      .select('id, user_id, email, role, status, created_at, updated_at')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, members: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch admin members.' }, { status: 500 });
  }
}

// POST: Invite / register a new admin member
export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin']);
    const body = await request.json();
    const { email, role, password } = body;

    if (!email || !email.includes('@') || !role) {
      return NextResponse.json({ error: 'Valid email and role are required.' }, { status: 400 });
    }

    if (!['owner', 'admin', 'editor'].includes(role)) {
      return NextResponse.json({ error: 'Invalid administrative role.' }, { status: 400 });
    }

    // Admins cannot create owners or admins
    if (admin.role !== 'owner' && (role === 'owner' || role === 'admin')) {
      return NextResponse.json({ error: 'Only Owners can provision Owner or Admin accounts.' }, { status: 403 });
    }

    const adminClient = createAdminClient();

    // Check if member already exists
    const { data: existing } = await adminClient
      .from('admin_members')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json({ error: 'User is already registered as an administrator.' }, { status: 400 });
    }

    // Create or find Auth user
    let targetUserId: string;
    const { data: userList } = await adminClient.auth.admin.listUsers();
    const existingAuthUser = userList.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (existingAuthUser) {
      targetUserId = existingAuthUser.id;
    } else {
      const generatedPassword = password || `StarX-${Math.random().toString(36).slice(-8)}!A1`;
      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email: email.toLowerCase(),
        password: generatedPassword,
        email_confirm: true,
      });

      if (createError || !newUser.user) {
        return NextResponse.json({ error: `Auth creation failed: ${createError?.message}` }, { status: 500 });
      }
      targetUserId = newUser.user.id;
    }

    const { data: newMember, error: insertError } = await adminClient
      .from('admin_members')
      .insert({
        user_id: targetUserId,
        email: email.toLowerCase(),
        role,
        status: 'active',
        invited_by: admin.userId,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'ADMIN_MEMBER_INVITED',
      entityType: 'admin_members',
      entityId: newMember.id,
      metadata: { targetEmail: email, assignedRole: role },
    });

    return NextResponse.json({ success: true, member: newMember });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to provision admin member.' }, { status: 500 });
  }
}

// PUT: Update member role or status (active / suspended)
export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin']);
    const body = await request.json();
    const { id, role, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Member ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data: targetMember } = await adminClient
      .from('admin_members')
      .select('id, user_id, email, role, status')
      .eq('id', id)
      .single();

    if (!targetMember) {
      return NextResponse.json({ error: 'Member not found.' }, { status: 404 });
    }

    // Prevent privilege escalation: user cannot modify own role
    if (targetMember.user_id === admin.userId && role && role !== admin.role) {
      return NextResponse.json({ error: 'Self-modification of administrative role is forbidden.' }, { status: 403 });
    }

    // Admins cannot modify owners or promote to owner/admin
    if (admin.role !== 'owner') {
      if (targetMember.role === 'owner' || targetMember.role === 'admin') {
        return NextResponse.json({ error: 'Only Owners can modify Owner or Admin records.' }, { status: 403 });
      }
      if (role === 'owner' || role === 'admin') {
        return NextResponse.json({ error: 'Admins cannot grant Owner or Admin privileges.' }, { status: 403 });
      }
    }

    const updatePayload: Database['public']['Tables']['admin_members']['Update'] = {};
    if (role) updatePayload.role = role;
    if (status) updatePayload.status = status;

    const { data: updated, error: updateError } = await adminClient
      .from('admin_members')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'ADMIN_MEMBER_MODIFIED',
      entityType: 'admin_members',
      entityId: id,
      metadata: { targetEmail: targetMember.email, changes: updatePayload },
    });

    return NextResponse.json({ success: true, member: updated });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to update admin member.' }, { status: 500 });
  }
}

// DELETE: Remove an admin member
export async function DELETE(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner']);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Member ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { data: targetMember } = await adminClient
      .from('admin_members')
      .select('id, user_id, email, role')
      .eq('id', id)
      .single();

    if (!targetMember) {
      return NextResponse.json({ error: 'Member not found.' }, { status: 404 });
    }

    if (targetMember.role === 'owner') {
      const { count } = await adminClient
        .from('admin_members')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'owner');

      if ((count || 0) <= 1) {
        return NextResponse.json({ error: 'Security Exception: Cannot delete the sole Owner account.' }, { status: 403 });
      }
    }

    const { error } = await adminClient.from('admin_members').delete().eq('id', id);
    if (error) throw error;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'ADMIN_MEMBER_REMOVED',
      entityType: 'admin_members',
      entityId: id,
      metadata: { deletedEmail: targetMember.email, role: targetMember.role },
    });

    return NextResponse.json({ success: true, message: 'Member removed successfully.' });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to remove admin member.' }, { status: 500 });
  }
}
