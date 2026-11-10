import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { logAdminAction } from '@/lib/audit';

export async function POST(request: NextRequest) {
  try {
    const configuredSecret = process.env.STARX_BOOTSTRAP_SECRET;
    if (!configuredSecret || configuredSecret.length < 16) {
      return NextResponse.json(
        { error: 'Bootstrap disabled. STARX_BOOTSTRAP_SECRET is not configured or too short.' },
        { status: 503 }
      );
    }

    const authHeader = request.headers.get('x-bootstrap-secret');
    if (!authHeader || authHeader !== configuredSecret) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid bootstrap secret.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, password, fullName } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();

    // 1. Check if ANY owner already exists
    const { data: existingOwners, error: checkError } = await adminClient
      .from('admin_members')
      .select('id, email, role')
      .eq('role', 'owner')
      .limit(1);

    if (checkError) {
      console.error('[BOOTSTRAP] Error checking existing owners:', checkError);
      return NextResponse.json({ error: 'Database check failed.' }, { status: 500 });
    }

    if (existingOwners && existingOwners.length > 0) {
      return NextResponse.json(
        { error: 'Security Exception: An Owner account is already configured. Repeat bootstrap is permanently prohibited.' },
        { status: 403 }
      );
    }

    // 2. Find or create the user in Supabase Auth
    let userId: string;
    const { data: userList } = await adminClient.auth.admin.listUsers();
    const existingAuthUser = userList.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (existingAuthUser) {
      userId = existingAuthUser.id;
    } else {
      if (!password || password.length < 8) {
        return NextResponse.json(
          { error: 'Password of at least 8 characters is required to create initial owner user.' },
          { status: 400 }
        );
      }
      const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName || 'Initial System Owner' },
      });

      if (createError || !newUser.user) {
        return NextResponse.json(
          { error: `Failed to create auth user: ${createError?.message || 'Unknown error'}` },
          { status: 500 }
        );
      }
      userId = newUser.user.id;
    }

    // 3. Register as Owner in admin_members
    const { data: newMember, error: insertError } = await adminClient
      .from('admin_members')
      .insert({
        user_id: userId,
        email: email.toLowerCase(),
        role: 'owner',
        status: 'active',
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: `Failed to assign owner role: ${insertError.message}` },
        { status: 500 }
      );
    }

    // 4. Log the bootstrap event
    await logAdminAction({
      actorUserId: userId,
      actorEmail: email.toLowerCase(),
      actorRole: 'owner',
      action: 'SYSTEM_BOOTSTRAP_OWNER_CREATED',
      entityType: 'admin_members',
      entityId: newMember.id,
      metadata: { initializedAt: new Date().toISOString() },
    });

    return NextResponse.json({
      success: true,
      message: 'Initial StarX Alpha Labs Owner account successfully bootstrapped.',
      owner: {
        id: newMember.id,
        email: newMember.email,
        role: newMember.role,
      },
    });
  } catch (err) {
    console.error('[BOOTSTRAP EXCEPTION]', err);
    return NextResponse.json({ error: 'Internal server error during bootstrap.' }, { status: 500 });
  }
}
