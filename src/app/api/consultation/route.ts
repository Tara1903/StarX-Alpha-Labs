import { NextResponse, type NextRequest } from 'next/server';
import { ConsultationFormSchema } from '@/lib/validation/forms';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const result = ConsultationFormSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, phone, company, preferredDate, preferredTime, topic, notes, website_hp } = result.data;

    // Honeypot check
    if (website_hp && website_hp.length > 0) {
      return NextResponse.json({ success: true, message: 'Consultation request received.' });
    }

    // Check for development/placeholder environment or offline resilience
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    if (supabaseUrl.includes('placeholder')) {
      console.log('[MOCK CONSULTATION LOGGED]', { fullName, email, topic });
      return NextResponse.json({
        success: true,
        message: 'Consultation request received. A calendar invite and Google Meet link will be dispatched following architect availability verification.',
        consultationId: `local-${Date.now()}`,
      });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('consultation_requests')
      .insert({
        name: fullName,
        email: email.toLowerCase(),
        phone: phone || null,
        company: company || null,
        preferred_date: preferredDate || null,
        preferred_time: preferredTime || null,
        topic: topic || null,
        notes: notes || null,
        status: 'pending',
        metadata: {
          submittedAt: new Date().toISOString(),
          ip: request.headers.get('x-forwarded-for') || 'direct',
          userAgent: request.headers.get('user-agent') || 'unknown',
        },
      })
      .select('id')
      .single();

    if (error) {
      console.error('[CONSULTATION SUBMISSION ERROR]', error);
      return NextResponse.json(
        { success: false, message: 'Unable to schedule consultation request at this time. Please try again shortly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation request received. A calendar invite and Google Meet link will be dispatched following architect availability verification.',
      consultationId: data.id,
    });
  } catch (err) {
    console.error('[CONSULTATION EXCEPTION]', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please contact us directly.' },
      { status: 500 }
    );
  }
}
