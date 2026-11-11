import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const adminClient = createAdminClient();
    let query = adminClient.from('customer_estimates').select('*').order('created_at', { ascending: false });

    if (email) {
      query = query.eq('client_email', email.toLowerCase());
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ success: true, estimates: [] });
    }

    return NextResponse.json({ success: true, estimates: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: true, estimates: [] });
  }
}
