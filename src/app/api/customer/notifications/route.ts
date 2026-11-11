import { NextRequest, NextResponse } from 'next/server';
import { requireClientMember, ClientAuthError } from '@/lib/auth/customer';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const verified = await requireClientMember();
    const adminClient = createAdminClient();

    const { data: notifications, error } = await adminClient
      .from('client_notifications')
      .select('*')
      .eq('user_id', verified.userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ notifications: notifications || [] });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const verified = await requireClientMember();
    const body = await req.json();
    const { notificationId } = body;

    const adminClient = createAdminClient();

    if (notificationId) {
      await adminClient
        .from('client_notifications')
        .update({ read: true })
        .eq('id', notificationId)
        .eq('user_id', verified.userId);
    } else {
      // Mark all as read
      await adminClient
        .from('client_notifications')
        .update({ read: true })
        .eq('user_id', verified.userId);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
