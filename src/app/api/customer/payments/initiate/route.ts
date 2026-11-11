import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createGatewayOrder, getGatewayConfig } from "@/lib/payment-gateway/client";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { invoiceId, redirectUrl } = body;

    if (!invoiceId) {
      return NextResponse.json({ error: "invoiceId is required" }, { status: 400 });
    }

    // 1. Fetch invoice and verify organization ownership
    const { data: invoice, error: invError } = await supabase
      .from("invoices")
      .select("*, client_organizations(id, name, primary_contact_name, primary_contact_email, phone)")
      .eq("id", invoiceId)
      .single();

    if (invError || !invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Verify user membership in this organization
    const { data: membership } = await supabase
      .from("client_members")
      .select("id")
      .eq("user_id", user.id)
      .eq("organization_id", invoice.organization_id)
      .eq("status", "active")
      .single();

    if (!membership) {
      return NextResponse.json(
        { error: "Forbidden: You do not belong to the billing organization for this invoice" },
        { status: 403 }
      );
    }

    const outstandingBalance = Number(invoice.outstanding_balance) || 0;
    if (outstandingBalance <= 0 || invoice.status === "paid") {
      return NextResponse.json(
        { error: "Invoice has already been fully settled. No payment required." },
        { status: 400 }
      );
    }

    // 2. Generate unique client order ID (e.g. INV-2026-0001-TIMESTAMP)
    const clientOrderId = `${invoice.invoice_number}-${Date.now().toString(36)}`;
    const gatewayConfig = getGatewayConfig();

    // 3. Request order creation on the standalone UPI Gateway
    const orderResponse = await createGatewayOrder({
      amount: outstandingBalance,
      clientOrderId,
      customerName: invoice.client_name || invoice.client_organizations?.name,
      customerEmail: invoice.client_email || invoice.client_organizations?.primary_contact_email,
      customerMobile: invoice.client_organizations?.phone || undefined,
      note: `Payment for Invoice ${invoice.invoice_number}`,
      redirectUrl: redirectUrl || undefined,
    });

    if (!orderResponse.success || !orderResponse.data) {
      return NextResponse.json(
        { error: orderResponse.message || "Failed to initialize payment gateway order" },
        { status: 502 }
      );
    }

    const orderData = orderResponse.data;

    // 4. Save gateway transaction in database
    const { data: transactionRecord, error: txError } = await supabase
      .from("gateway_transactions")
      .insert({
        invoice_id: invoice.id,
        organization_id: invoice.organization_id,
        gateway_order_no: orderData.order_id,
        client_order_id: clientOrderId,
        amount: outstandingBalance,
        currency: "INR",
        status: orderData.status || "pending",
        environment: gatewayConfig.environment,
        payment_url: orderData.payment_url,
        upi_intent: orderData.upi_intent,
        expires_at: orderData.expires_at || null,
        raw_order_response: orderData,
      })
      .select()
      .single();

    return NextResponse.json({
      success: true,
      data: {
        transactionId: transactionRecord?.id || orderData.order_id,
        orderId: orderData.order_id,
        clientOrderId,
        amount: outstandingBalance,
        paymentUrl: orderData.payment_url,
        upiIntent: orderData.upi_intent,
        expiresAt: orderData.expires_at,
        environment: gatewayConfig.environment,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error initiating payment" },
      { status: 500 }
    );
  }
}
