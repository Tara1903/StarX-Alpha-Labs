import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { logAdminAction } from '@/lib/audit';
import type { Database } from '@/types/database.types';

type EnquiryRow = Database['public']['Tables']['enquiries']['Row'];
type QuoteRow = Database['public']['Tables']['quote_requests']['Row'];
type ConsultationRow = Database['public']['Tables']['consultation_requests']['Row'];

// GET: Retrieve enquiries, quote_requests, consultation_requests
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(['owner', 'admin', 'editor']);
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // 'enquiry' | 'quote' | 'consultation' | 'all'

    const adminClient = createAdminClient();

    let enquiries: EnquiryRow[] = [];
    let quotes: QuoteRow[] = [];
    let consultations: ConsultationRow[] = [];

    if (type === 'all' || type === 'enquiry') {
      const { data } = await adminClient.from('enquiries').select('*').order('created_at', { ascending: false });
      enquiries = data || [];
    }

    if (type === 'all' || type === 'quote') {
      const { data } = await adminClient.from('quote_requests').select('*').order('created_at', { ascending: false });
      quotes = data || [];
    }

    if (type === 'all' || type === 'consultation') {
      const { data } = await adminClient.from('consultation_requests').select('*').order('created_at', { ascending: false });
      consultations = data || [];
    }

    return NextResponse.json({
      success: true,
      enquiries,
      quotes,
      consultations,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch inquiries.' }, { status: 500 });
  }
}

// PUT: Update inquiry status
export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin', 'editor']);
    const body = await request.json();
    const { table, id, status, notes } = body;

    if (!table || !id || !status) {
      return NextResponse.json({ error: 'Table, ID, and status are required.' }, { status: 400 });
    }

    if (!['enquiries', 'quote_requests', 'consultation_requests'].includes(table)) {
      return NextResponse.json({ error: 'Invalid target table.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const updatePayload: Record<string, unknown> = { status };
    if (notes) {
      updatePayload.metadata = { adminNotes: notes, updatedBy: admin.email, updatedAt: new Date().toISOString() };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (adminClient.from(table as any) as any)
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'INQUIRY_STATUS_UPDATED',
      entityType: table,
      entityId: id,
      metadata: { newStatus: status },
    });

    return NextResponse.json({ success: true, record: data });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to update inquiry.' }, { status: 500 });
  }
}
