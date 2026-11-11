import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Invitation token is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();

    const { data: invite, error } = await adminClient
      .from('client_invitations')
      .select('id, organization_id, email, full_name, role, expires_at, accepted_at')
      .eq('token', token)
      .single();

    if (error || !invite) {
      return NextResponse.json({ error: 'Invalid or non-existent invitation token.' }, { status: 404 });
    }

    if (invite.accepted_at) {
      return NextResponse.json({ error: 'This invitation has already been accepted.' }, { status: 400 });
    }

    if (new Date(invite.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This invitation token has expired.' }, { status: 410 });
    }

    // Get organization name
    const { data: org } = await adminClient
      .from('client_organizations')
      .select('name')
      .eq('id', invite.organization_id)
      .single();

    return NextResponse.json({
      valid: true,
      email: invite.email,
      fullName: invite.full_name,
      role: invite.role,
      organizationName: org?.name || 'StarX Client Organization',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password || password.length < 8) {
      return NextResponse.json(
        { error: 'Token and secure password (min 8 characters) are required.' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // 1. Verify invitation token
    const { data: invite, error: invErr } = await adminClient
      .from('client_invitations')
      .select('*')
      .eq('token', token)
      .single();

    if (invErr || !invite || invite.accepted_at || new Date(invite.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Invitation token is invalid, expired, or already used.' },
        { status: 400 }
      );
    }

    // 2. Create or link user in Supabase auth
    let userId: string;
    const { data: newUser, error: createErr } = await adminClient.auth.admin.createUser({
      email: invite.email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: invite.full_name,
        is_client: true,
      },
    });

    if (createErr) {
      // User may already exist in auth, let's find user
      const { data: existingUsers } = await adminClient.auth.admin.listUsers();
      const existing = existingUsers.users.find((u) => u.email === invite.email);
      if (existing) {
        userId = existing.id;
        // Update password
        await adminClient.auth.admin.updateUserById(userId, { password });
      } else {
        return NextResponse.json({ error: createErr.message }, { status: 400 });
      }
    } else {
      userId = newUser.user.id;
    }

    // 3. Create or update client_members record
    await adminClient.from('client_members').upsert({
      organization_id: invite.organization_id,
      user_id: userId,
      role: invite.role,
      status: 'active',
      full_name: invite.full_name,
      email: invite.email,
    }, { onConflict: 'organization_id,user_id' });

    // 4. Mark invitation accepted
    await adminClient
      .from('client_invitations')
      .update({ accepted_at: new Date().toISOString() })
      .eq('id', invite.id);

    return NextResponse.json({
      success: true,
      message: 'Invitation accepted! You may now sign in to your workspace.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
