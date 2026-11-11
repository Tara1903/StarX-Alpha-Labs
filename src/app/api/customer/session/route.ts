import { NextResponse } from 'next/server';
import { getClientSessionContext, ClientAuthError } from '@/lib/auth/customer';

export async function GET() {
  try {
    const session = await getClientSessionContext();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthenticated or unauthorized client session.' },
        { status: 401 }
      );
    }
    return NextResponse.json({ session });
  } catch (err: any) {
    if (err instanceof ClientAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
