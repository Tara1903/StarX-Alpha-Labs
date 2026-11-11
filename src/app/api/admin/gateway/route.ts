import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getGatewayConfig, createGatewayOrder } from "@/lib/payment-gateway/client";

export async function GET(req: NextRequest) {
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

    // 1. Authenticate admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: adminMember } = await supabase
      .from("admin_members")
      .select("role, status")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (!adminMember) {
      return NextResponse.json({ error: "Forbidden: Admin privileges required" }, { status: 403 });
    }

    const config = getGatewayConfig();

    // 2. Fetch transactions with invoice & org details
    const { data: transactions } = await supabase
      .from("gateway_transactions")
      .select("*, invoices(invoice_number), client_organizations(name)")
      .order("created_at", { ascending: false })
      .limit(50);

    // 3. Fetch recent webhook audit logs
    const { data: webhooks } = await supabase
      .from("gateway_webhook_events")
      .select("*")
      .order("received_at", { ascending: false })
      .limit(30);

    // 4. Compute metrics
    const txList = transactions || [];
    const successfulCount = txList.filter((t) => t.status === "paid").length;
    const pendingCount = txList.filter((t) => t.status === "pending" || t.status === "created").length;
    const failedCount = txList.filter((t) => t.status === "failed" || t.status === "expired").length;
    const totalVolume = txList
      .filter((t) => t.status === "paid")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    return NextResponse.json({
      success: true,
      data: {
        config: {
          gatewayUrl: config.gatewayUrl,
          environment: config.environment,
          apiKeyConfigured: !!config.apiKey,
          apiSecretConfigured: !!config.apiSecret,
          webhookSecretConfigured: !!config.webhookSecret,
        },
        stats: {
          totalTransactions: txList.length,
          successfulPayments: successfulCount,
          pendingPayments: pendingCount,
          failedPayments: failedCount,
          totalVolumeInr: totalVolume,
          recentWebhooksCount: (webhooks || []).length,
        },
        transactions: txList.map((t) => ({
          ...t,
          invoiceNumber: t.invoices?.invoice_number,
          organizationName: t.client_organizations?.name,
        })),
        webhooks: webhooks || [],
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load gateway overview" },
      { status: 500 }
    );
  }
}

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

    const { data: adminMember } = await supabase
      .from("admin_members")
      .select("role, status")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (!adminMember) {
      return NextResponse.json({ error: "Forbidden: Admin privileges required" }, { status: 403 });
    }

    const body = await req.json();
    const { action } = body;

    if (action === "diagnostic_ping") {
      const config = getGatewayConfig();
      const testOrderId = `DIAG-${Date.now().toString(36).toUpperCase()}`;

      const res = await createGatewayOrder({
        amount: 1.0,
        clientOrderId: testOrderId,
        customerName: "StarX System Diagnostic",
        note: "Diagnostic Connectivity Probe",
      });

      return NextResponse.json({
        success: true,
        message: "Diagnostic probe successfully dispatched to gateway",
        data: res,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to execute gateway diagnostic" },
      { status: 500 }
    );
  }
}
