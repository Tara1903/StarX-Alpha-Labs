import { NextResponse } from "next/server";

export async function GET() {
  const uptime = process.uptime();
  return NextResponse.json({
    status: "ok",
    product: "STARX LABS",
    phase: "Phase 1 - Project Foundation",
    version: "0.1.0",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime)}s`,
    environment: process.env.NODE_ENV || "development",
    services: {
      next: "16.4.6",
      react: "19.0.0",
      supabaseConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      starxFlowLinkConfigured: Boolean(process.env.NEXT_PUBLIC_STARX_FLOW_URL),
    },
  });
}
