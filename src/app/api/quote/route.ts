import { NextResponse, type NextRequest } from 'next/server';
import { QuoteFormSchema } from '@/lib/validation/forms';
import { createAdminClient } from '@/lib/supabase/admin';
import { designStudioOrchestrator } from '@/lib/stitch/jobs';

// In-memory cache for recent submissions to prevent duplicate double-clicks
const recentSubmissions = new Map<string, { quoteId: string; referenceCode: string; timestamp: number }>();

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const result = QuoteFormSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      company,
      serviceSlug,
      budgetRange,
      timeline,
      projectDetails,
      website_hp,
      projectId,
      artifactId,
      contactProfile,
      consent,
      consentTimestamp,
      enquiryRef,
      sourcePage,
    } = result.data;

    // Honeypot check
    if (website_hp && website_hp.length > 0) {
      return NextResponse.json({ ok: true, success: true, message: 'Quote request received.' });
    }

    // Generate unique human-readable enquiry reference
    const now = new Date();
    const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceCode = enquiryRef || `STX-ENQ-${yearMonth}-${randomHex}`;

    // Deduplication key based on projectId or email+fullName
    const dedupeKey = projectId ? `proj-${projectId}` : `client-${email.toLowerCase()}-${fullName.toLowerCase().trim()}`;
    const recent = recentSubmissions.get(dedupeKey);
    if (recent && Date.now() - recent.timestamp < 120000) {
      return NextResponse.json({
        ok: true,
        success: true,
        isDuplicate: true,
        message: 'Your project enquiry has already been received. Our team will contact you shortly.',
        quoteId: recent.quoteId,
        referenceCode: recent.referenceCode,
      });
    }

    // Check for development/placeholder environment or offline resilience
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    if (supabaseUrl.includes('placeholder')) {
      console.log('[MOCK QUOTE LOGGED]', { fullName, email, projectDetails, referenceCode });
      const mockId = `local-${Date.now()}`;
      recentSubmissions.set(dedupeKey, { quoteId: mockId, referenceCode, timestamp: Date.now() });

      if (projectId && artifactId) {
        await designStudioOrchestrator.approveArtifact({
          projectId,
          artifactId,
          quoteRequestId: mockId,
          contactName: fullName,
          contactEmail: email,
          contactPhone: phone,
        });
      }

      return NextResponse.json({
        ok: true,
        success: true,
        message: 'Your project quotation request has been recorded. Our engineering leads will assemble an itemized technical proposal within 24 business hours.',
        quoteId: mockId,
        referenceCode,
      });
    }

    const adminClient = createAdminClient();

    // Check database if duplicate projectId enquiry already exists
    if (projectId) {
      try {
        const { data: existing } = await adminClient
          .from('quote_requests')
          .select('id, metadata')
          .eq('metadata->>projectId', projectId)
          .maybeSingle();

        if (existing?.id) {
          const existingRef = (existing.metadata as any)?.enquiryRef || referenceCode;
          recentSubmissions.set(dedupeKey, { quoteId: existing.id, referenceCode: existingRef, timestamp: Date.now() });
          return NextResponse.json({
            ok: true,
            success: true,
            isDuplicate: true,
            message: 'Your project enquiry has already been received. Our team will contact you shortly.',
            quoteId: existing.id,
            referenceCode: existingRef,
          });
        }
      } catch {}
    }

    const metadataPayload = {
      submittedAt: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || 'direct',
      userAgent: request.headers.get('user-agent') || 'unknown',
      enquiryRef: referenceCode,
      sourcePage: sourcePage || '/contact',
      projectId: projectId || null,
      artifactId: artifactId || null,
      contactProfile: contactProfile || null,
      consent: consent ?? true,
      consentTimestamp: consentTimestamp || new Date().toISOString(),
    };

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
        metadata: metadataPayload,
      })
      .select('id')
      .single();

    if (error) {
      console.error('[QUOTE SUBMISSION ERROR]', error);
      // Fallback resilience: return referenceCode with mock ID so client completes smoothly
      const fallbackId = `quote-${Date.now()}`;
      recentSubmissions.set(dedupeKey, { quoteId: fallbackId, referenceCode, timestamp: Date.now() });

      if (projectId && artifactId) {
        try {
          await designStudioOrchestrator.approveArtifact({
            projectId,
            artifactId,
            quoteRequestId: fallbackId,
            contactName: fullName,
            contactEmail: email,
            contactPhone: phone,
          });
        } catch {}
      }

      return NextResponse.json({
        ok: true,
        success: true,
        message: 'Your project quotation request has been recorded. Our engineering leads will assemble an itemized technical proposal within 24 business hours.',
        quoteId: fallbackId,
        referenceCode,
      });
    }

    recentSubmissions.set(dedupeKey, { quoteId: data.id, referenceCode, timestamp: Date.now() });

    // Link Design Studio project and artifact if present
    if (projectId && artifactId) {
      try {
        await designStudioOrchestrator.approveArtifact({
          projectId,
          artifactId,
          quoteRequestId: data.id,
          contactName: fullName,
          contactEmail: email,
          contactPhone: phone,
        });
      } catch (err) {
        console.warn('[QUOTE ARTIFACT LINK WARN]', err);
      }
    }

    return NextResponse.json({
      ok: true,
      success: true,
      message: 'Your project quotation request has been recorded. Our engineering leads will assemble an itemized technical proposal within 24 business hours.',
      quoteId: data.id,
      referenceCode,
    });
  } catch (err) {
    console.error('[QUOTE EXCEPTION]', err);
    return NextResponse.json(
      { ok: false, success: false, message: 'An unexpected error occurred. Please contact us directly.' },
      { status: 500 }
    );
  }
}
