import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { logAdminAction } from '@/lib/audit';
import type { Database } from '@/types/database.types';

type EnquiryRow = Database['public']['Tables']['enquiries']['Row'];
type QuoteRow = Database['public']['Tables']['quote_requests']['Row'];
type ConsultationRow = Database['public']['Tables']['consultation_requests']['Row'];

// Database CHECK constraint mapping for legacy tables
const DB_QUOTE_STATUS_MAP: Record<string, string> = {
  new: 'new',
  assigned: 'reviewing',
  attempted_contact: 'reviewing',
  under_review: 'reviewing',
  contacted: 'reviewing',
  needs_assessment: 'reviewing',
  assessment_complete: 'reviewing',
  followup_required: 'reviewing',
  demo_scheduled: 'reviewing',
  demo_presented: 'reviewing',
  quote_prepared: 'quoted',
  quotation_sent: 'quoted',
  negotiation: 'quoted',
  converted: 'won',
  not_interested: 'declined',
  on_hold: 'declined',
  closed: 'declined',
};

// GET: Retrieve enquiries, quote_requests, customer_enquiries, and consultation_requests
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(['owner', 'admin', 'editor']);
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // 'enquiry' | 'quote' | 'consultation' | 'all'

    const adminClient = createAdminClient();

    let enquiries: EnquiryRow[] = [];
    let quotes: QuoteRow[] = [];
    let consultations: ConsultationRow[] = [];
    let customerEnquiries: Record<string, unknown>[] = [];

    if (type === 'all' || type === 'enquiry') {
      const { data } = await adminClient.from('enquiries').select('*').order('created_at', { ascending: false });
      enquiries = data || [];
    }

    if (type === 'all' || type === 'quote') {
      const { data } = await adminClient.from('quote_requests').select('*').order('created_at', { ascending: false });
      // Expose the granular leadStatus if recorded in metadata
      quotes = (data || []).map((q) => {
        const meta = (q.metadata as Record<string, any>) || {};
        return {
          ...q,
          status: meta.leadStatus || q.status,
        };
      });
    }

    if (type === 'all' || type === 'consultation') {
      const { data } = await adminClient.from('consultation_requests').select('*').order('created_at', { ascending: false });
      consultations = data || [];
    }

    try {
      // Query modern customer_enquiries if available
      const { data: custEnq } = await (adminClient.from('customer_enquiries' as any) as any)
        .select('*')
        .order('created_at', { ascending: false });
      if (custEnq) customerEnquiries = custEnq;
    } catch {
      // Graceful fallback if table is not yet populated
    }

    return NextResponse.json({
      success: true,
      enquiries,
      quotes,
      consultations,
      customerEnquiries,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch inquiries.' }, { status: 500 });
  }
}

// PUT: Update inquiry status, contact outcome, technical assessment, notes, or follow-up
export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin', 'editor']);
    const body = await request.json();
    const {
      table = 'quote_requests',
      id,
      status,
      notes,
      contactOutcome,
      technicalAssessment,
      assignedTo,
      followUpDate,
      lostReason,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required.' }, { status: 400 });
    }

    if (!['enquiries', 'quote_requests', 'consultation_requests', 'customer_enquiries'].includes(table)) {
      return NextResponse.json({ error: 'Invalid target table.' }, { status: 400 });
    }

    const adminClient = createAdminClient();

    // 1. Fetch current record to preserve and merge metadata
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: currentRecord, error: fetchError } = await (adminClient.from(table as any) as any)
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !currentRecord) {
      return NextResponse.json({ error: 'Target record not found.' }, { status: 404 });
    }

    const existingMeta = (currentRecord.metadata as Record<string, any>) || {};
    const updatedMeta: Record<string, any> = { ...existingMeta };

    // Update assignment
    if (assignedTo !== undefined) {
      updatedMeta.assignedTo = assignedTo;
    }

    // Update follow-up date
    if (followUpDate !== undefined) {
      updatedMeta.followUpDate = followUpDate;
    }

    // Update lost reason
    if (lostReason) {
      updatedMeta.lostReason = lostReason;
    }

    // Record granular 12-state leadStatus in metadata
    if (status) {
      updatedMeta.leadStatus = status;
    }

    // Append internal note
    if (notes && typeof notes === 'string' && notes.trim().length > 0) {
      const existingNotes = Array.isArray(updatedMeta.internalNotes) ? updatedMeta.internalNotes : [];
      const newNoteEntry = {
        id: `nt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        author: admin.email,
        text: notes.trim(),
        createdAt: new Date().toISOString(),
      };
      updatedMeta.internalNotes = [...existingNotes, newNoteEntry];
    }

    // Append contact history entry
    if (contactOutcome && typeof contactOutcome === 'object') {
      const existingHistory = Array.isArray(updatedMeta.contactHistory) ? updatedMeta.contactHistory : [];
      const newHistoryEntry = {
        id: `ct-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        date: new Date().toISOString(),
        method: contactOutcome.method || 'phone',
        outcome: contactOutcome.outcome || 'successfully_contacted_interested',
        notes: contactOutcome.notes || '',
        staffName: admin.email,
        nextFollowUpDate: contactOutcome.nextFollowUpDate || followUpDate || null,
      };
      updatedMeta.contactHistory = [...existingHistory, newHistoryEntry];
      if (contactOutcome.nextFollowUpDate) {
        updatedMeta.followUpDate = contactOutcome.nextFollowUpDate;
      }
    }

    // Update technical assessment
    if (technicalAssessment && typeof technicalAssessment === 'object') {
      updatedMeta.technicalAssessment = {
        ...technicalAssessment,
        assessedBy: admin.email,
        assessedAt: new Date().toISOString(),
      };
    }

    const updatePayload: Record<string, unknown> = {
      metadata: updatedMeta,
      updated_at: new Date().toISOString(),
    };

    if (status) {
      if (table === 'quote_requests') {
        // Map to DB CHECK constraint allowed values
        updatePayload.status = DB_QUOTE_STATUS_MAP[status] || 'reviewing';
      } else {
        updatePayload.status = status;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: updatedRecord, error: updateError } = await (adminClient.from(table as any) as any)
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('[INQUIRY UPDATE ERROR]', updateError);
      throw updateError;
    }

    // Log administrative audit action
    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'INQUIRY_STATUS_UPDATED',
      entityType: table,
      entityId: id,
      metadata: {
        newStatus: status || currentRecord.status,
        hasContactOutcome: !!contactOutcome,
        hasTechnicalAssessment: !!technicalAssessment,
      },
    });

    return NextResponse.json({
      success: true,
      record: {
        ...updatedRecord,
        status: updatedMeta.leadStatus || updatedRecord.status,
      },
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error('[INQUIRY UPDATE EXCEPTION]', err);
    return NextResponse.json({ error: 'Failed to update inquiry.' }, { status: 500 });
  }
}
