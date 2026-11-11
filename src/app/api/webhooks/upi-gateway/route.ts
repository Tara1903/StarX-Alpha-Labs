import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getGatewayConfig, verifyWebhookSignature } from "@/lib/payment-gateway/client";
import type { GatewayWebhookPayload } from "@/types/paymentGateway";

// Webhook endpoint runs with service role admin rights to reconcile transactions
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signatureHeader = req.headers.get("x-signature") || req.headers.get("X-Signature");
  const eventHeader = req.headers.get("x-event") || req.headers.get("X-Event");
  const eventIdHeader = req.headers.get("x-event-id") || req.headers.get("X-Event-Id");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  let payload: GatewayWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const eventId = payload.event_id || eventIdHeader;
  const eventType = payload.event || eventHeader;
  const environment = payload.data?.environment || "sandbox";

  if (!eventId) {
    return NextResponse.json({ error: "Missing event_id in webhook" }, { status: 400 });
  }

  // 1. Verify HMAC-SHA256 signature
  const config = getGatewayConfig();
  const secretToUse = environment === "sandbox"
    ? process.env.UPI_GATEWAY_SANDBOX_WEBHOOK_SECRET || config.webhookSecret
    : process.env.UPI_GATEWAY_WEBHOOK_SECRET || config.webhookSecret;

  const verification = verifyWebhookSignature({
    rawBody,
    signatureHeader,
    secret: secretToUse,
    toleranceSeconds: 300,
  });

  // Record webhook delivery in gateway_webhook_events table
  const { data: existingEvent, error: dedupCheckError } = await supabase
    .from("gateway_webhook_events")
    .select("id, processed")
    .eq("event_id", eventId)
    .single();

  if (existingEvent) {
    // Idempotent acknowledgement for duplicate delivery
    return NextResponse.json({
      received: true,
      message: "Event already acknowledged (duplicate delivery ignored)",
      event_id: eventId,
    });
  }

  // Insert event record
  const { error: insertEventError } = await supabase
    .from("gateway_webhook_events")
    .insert({
      event_id: eventId,
      event_type: eventType,
      event_sequence: payload.event_sequence || null,
      environment,
      gateway_order_no: payload.data?.order_id || null,
      payload,
      signature_header: signatureHeader,
      signature_valid: verification.valid,
      processed: false,
    });

  if (!verification.valid) {
    // Record rejection reason
    await supabase
      .from("gateway_webhook_events")
      .update({ processing_error: verification.reason || "Invalid signature" })
      .eq("event_id", eventId);

    return NextResponse.json(
      { error: "Invalid webhook signature", reason: verification.reason },
      { status: 401 }
    );
  }

  // 2. Process Business Transaction
  const orderData = payload.data;
  if (!orderData?.order_id) {
    return NextResponse.json({ received: true, note: "Non-order event acknowledged" });
  }

  // Lookup corresponding transaction
  const { data: transaction, error: txError } = await supabase
    .from("gateway_transactions")
    .select("*, invoices(*)")
    .or(`gateway_order_no.eq.${orderData.order_id},client_order_id.eq.${orderData.client_order_id}`)
    .single();

  if (!transaction) {
    await supabase
      .from("gateway_webhook_events")
      .update({ processing_error: "No matching internal gateway transaction found" })
      .eq("event_id", eventId);

    // Return 200 to acknowledge delivery even if unrecognized to prevent perpetual retries
    return NextResponse.json({ received: true, warning: "Transaction not found" });
  }

  try {
    if (eventType === "order.paid") {
      const paidAmount = parseFloat(orderData.amount) || transaction.amount;
      const utrNumber = orderData.utr || `UPI-${orderData.order_id}`;
      const paidDate = orderData.paid_at || new Date().toISOString();

      // Update gateway transaction
      await supabase
        .from("gateway_transactions")
        .update({
          status: "paid",
          utr: utrNumber,
          paid_at: paidDate,
          updated_at: new Date().toISOString(),
        })
        .eq("id", transaction.id);

      // Create verified payment record in StarX Alpha Labs finance ledger
      const { data: paymentRecord } = await supabase
        .from("payment_records")
        .insert({
          invoice_id: transaction.invoice_id,
          organization_id: transaction.organization_id,
          amount: paidAmount,
          currency: transaction.currency || "INR",
          payment_method: "upi",
          reference_number: utrNumber,
          notes: `Verified via Standalone UPI Gateway (Order: ${orderData.order_id})`,
          payment_date: paidDate.split("T")[0],
          verification_status: "verified",
          verified_at: new Date().toISOString(),
        })
        .select()
        .single();

      // Trigger automatic recalculation of invoice balance
      try {
        await supabase.rpc("recalculate_invoice_balance", {
          target_invoice_id: transaction.invoice_id,
        });
      } catch {
        // Fallback calculation in JS if RPC is not yet created
        const { data: currentInv } = await supabase
          .from("invoices")
          .select("total_amount, paid_amount")
          .eq("id", transaction.invoice_id)
          .single();

        if (currentInv) {
          const newPaid = Number(currentInv.paid_amount || 0) + paidAmount;
          const newBal = Math.max(0, Number(currentInv.total_amount) - newPaid);
          const newStatus = newBal <= 0 ? "paid" : "partially_paid";
          await supabase
            .from("invoices")
            .update({
              paid_amount: newPaid,
              outstanding_balance: newBal,
              status: newStatus,
              updated_at: new Date().toISOString(),
            })
            .eq("id", transaction.invoice_id);
        }
      }
    } else if (eventType === "order.expired") {
      await supabase
        .from("gateway_transactions")
        .update({
          status: "expired",
          updated_at: new Date().toISOString(),
        })
        .eq("id", transaction.id);
    } else if (eventType === "order.under_review") {
      await supabase
        .from("gateway_transactions")
        .update({
          status: "under_review",
          utr: orderData.utr || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", transaction.id);
    }

    // Mark webhook event as successfully processed
    await supabase
      .from("gateway_webhook_events")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("event_id", eventId);

    return NextResponse.json({
      received: true,
      processed: true,
      event: eventType,
      order_id: orderData.order_id,
    });
  } catch (procErr: any) {
    await supabase
      .from("gateway_webhook_events")
      .update({ processing_error: procErr.message })
      .eq("event_id", eventId);

    return NextResponse.json(
      { error: "Webhook processing failure", details: procErr.message },
      { status: 500 }
    );
  }
}
