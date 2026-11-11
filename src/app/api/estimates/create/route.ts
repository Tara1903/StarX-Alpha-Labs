import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      businessName,
      division,
      packageCode,
      packageName,
      basePrice,
      selectedAddons,
      addonsTotal,
      hostingCost,
      maintenanceCost,
      subtotal,
      gstAmount,
      grandTotal,
      notes,
      preferredContact,
      preferredMeetingTime,
      consentAccepted
    } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Please provide a valid full name.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json({ success: false, message: 'Please provide a valid phone or WhatsApp number.' }, { status: 400 });
    }

    if (!consentAccepted) {
      return NextResponse.json({ success: false, message: 'You must agree to allow STARX ALPHA LABS to contact you regarding this estimate.' }, { status: 400 });
    }

    const year = new Date().getFullYear();
    const randomCounter = Math.floor(100000 + Math.random() * 900000);
    const estimateNumber = `STARX-EST-${year}-${randomCounter}`;
    const now = new Date();
    const validUntil = new Date(now.getTime() + 30 * 86400000).toISOString();

    const snapshot = {
      estimateNumber,
      clientName: fullName.trim(),
      clientBusiness: (businessName || 'Individual / Startup').trim(),
      clientEmail: email.toLowerCase().trim(),
      clientPhone: phone.trim(),
      preferredContact: preferredContact || 'WhatsApp',
      preferredMeetingTime: preferredMeetingTime || '',
      division: division || 'website',
      packageCode: packageCode || 'W1',
      packageName: packageName || 'Standard Package',
      basePrice: Number(basePrice) || 0,
      selectedAddons: Array.isArray(selectedAddons) ? selectedAddons : [],
      addonsTotal: Number(addonsTotal) || 0,
      hostingCost: Number(hostingCost) || 0,
      maintenanceCost: Number(maintenanceCost) || 0,
      subtotal: Number(subtotal) || 0,
      taxRate: 0.18,
      gstAmount: Number(gstAmount) || 0,
      grandTotal: Number(grandTotal) || 0,
      notes: notes || '',
      consentAccepted: true,
      status: 'Submitted',
      createdAt: now.toISOString(),
      validUntil,
      updatedAt: now.toISOString(),
      history: [
        {
          timestamp: now.toISOString(),
          status: 'Submitted',
          actor: 'Customer (Online Calculator)',
          note: 'Estimate generated and locked via StarX Alpha Labs interactive calculator'
        }
      ]
    };

    // Attempt persistence to Supabase customer_estimates table
    try {
      const adminClient = createAdminClient();
      await adminClient.from('customer_estimates').insert({
        client_name: snapshot.clientName,
        client_email: snapshot.clientEmail,
        client_phone: snapshot.clientPhone,
        client_company: snapshot.clientBusiness,
        division: snapshot.division,
        package_id: snapshot.packageCode,
        package_name: snapshot.packageName,
        platforms: ['Web Responsive'],
        selected_addons: snapshot.selectedAddons,
        base_price: snapshot.basePrice,
        addons_total: snapshot.addonsTotal,
        estimated_total: snapshot.grandTotal,
        project_notes: snapshot.notes,
        status: 'new'
      });
    } catch (dbErr) {
      // Non-blocking fallback to keep customer journey uninterrupted
      console.warn('[ESTIMATE_DB_INSERT_WARN]', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Your project estimate request has been received!',
      estimate: snapshot
    });
  } catch (err: any) {
    console.error('[ESTIMATE_API_ERROR]', err);
    return NextResponse.json(
      { success: false, message: 'Unable to process estimate. Please try again or reach out on WhatsApp at 9630937033.' },
      { status: 500 }
    );
  }
}
