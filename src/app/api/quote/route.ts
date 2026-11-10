import { NextResponse, type NextRequest } from 'next/server';
import { QuoteFormSchema } from '@/lib/validation/forms';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const result = QuoteFormSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, phone, company, serviceSlug, budgetRange, timeline, projectDetails, website_hp } = result.data;

    // Honeypot check
    if (website_hp && website_hp.length > 0) {
      return NextResponse.json({ success: true, message: 'Quote request received.' });
    }

    // Check for development/placeholder environment or offline resilience
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    if (supabaseUrl.includes('placeholder')) {
      console.log('[MOCK QUOTE LOGGED]', { fullName, email, projectDetails });
      return NextResponse.json({
        success: true,
        message: 'Your project quotation request has been recorded. Our engineering leads will assemble an itemized technical proposal within 24 business hours.',
        quoteId: `local-${Date.now()}`,
      });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('quote_requests')
      .insert({
        name: fullName,
        email: email.toLowerCase(),
        phone: phone || null,
        company: company || null,
        service_slug: serviceSlug || null,
        budget_range: budgetRange || null,
        timeline: timeline || null,
        project_details: projectDetails,
        status: 'new',
        metadata: {
          submittedAt: new Date().toISOString(),
          ip: request.headers.get('x-forwarded-for') || 'direct',
          userAgent: request.headers.get('user-agent') || 'unknown',
        },
      })
      .select('id')
      .single();

    if (error) {
      console.error('[QUOTE SUBMISSION ERROR]', error);
      return NextResponse.json(
        { success: false, message: 'We were unable to register your quote request. Please try again or reach out directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your project quotation request has been recorded. Our engineering leads will assemble an itemized technical proposal within 24 business hours.',
      quoteId: data.id,
    });
  } catch (err) {
    console.error('[QUOTE EXCEPTION]', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please contact us directly.' },
      { status: 500 }
    );
  }
}
