import { NextResponse, type NextRequest } from 'next/server';
import { NewsletterFormSchema } from '@/lib/validation/forms';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const result = NewsletterFormSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, website_hp } = result.data;

    // Honeypot check
    if (website_hp && website_hp.length > 0) {
      return NextResponse.json({ success: true, message: 'Subscribed.' });
    }

    // Check for development/placeholder environment or offline resilience
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    if (supabaseUrl.includes('placeholder')) {
      console.log('[MOCK NEWSLETTER SUBSCRIBED]', { email });
      return NextResponse.json({
        success: true,
        message: 'You have been successfully subscribed to StarX Alpha Labs Engineering Insights.',
      });
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('newsletter_subscribers')
      .upsert(
        {
          email: email.toLowerCase(),
          status: 'subscribed',
          consent_timestamp: new Date().toISOString(),
        },
        { onConflict: 'email' }
      );

    if (error) {
      console.error('[NEWSLETTER SUBMISSION ERROR]', error);
      return NextResponse.json(
        { success: false, message: 'Subscription request could not be completed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'You have been successfully subscribed to StarX Alpha Labs Engineering Insights.',
    });
  } catch (err) {
    console.error('[NEWSLETTER EXCEPTION]', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
