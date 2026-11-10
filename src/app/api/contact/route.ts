import { NextResponse, type NextRequest } from 'next/server';
import { ContactFormSchema } from '@/lib/validation/forms';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const result = ContactFormSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, phone, company, division, message, sourcePage, website_hp } = result.data;

    // Honeypot check
    if (website_hp && website_hp.length > 0) {
      // Silently accept bot submission without persisting
      return NextResponse.json({ success: true, message: 'Enquiry received.' });
    }

    // Check for development/placeholder environment or offline resilience
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    if (supabaseUrl.includes('placeholder')) {
      console.log('[MOCK ENQUIRY LOGGED]', { fullName, email, message });
      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been securely logged. Our solutions architects will review your requirements and respond within 24 business hours.',
        enquiryId: `local-${Date.now()}`,
      });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('enquiries')
      .insert({
        name: fullName,
        email: email.toLowerCase(),
        phone: phone || null,
        company: company || null,
        subject: division ? `Enquiry for ${division}` : 'General Enquiry',
        message,
        source_page: sourcePage,
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
      console.error('[CONTACT SUBMISSION ERROR]', error);
      return NextResponse.json(
        { success: false, message: 'We were unable to process your enquiry at this moment. Please try again shortly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been securely logged. Our solutions architects will review your requirements and respond within 24 business hours.',
      enquiryId: data.id,
    });
  } catch (err) {
    console.error('[CONTACT EXCEPTION]', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please contact us directly.' },
      { status: 500 }
    );
  }
}
