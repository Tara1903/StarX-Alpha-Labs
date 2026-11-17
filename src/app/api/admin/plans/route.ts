import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { logAdminAction } from '@/lib/audit';

// Canonical fallback plans matching StarX tiers
const DEFAULT_CANONICAL_PLANS = [
  {
    id: 'plan_proto_v1',
    division_slug: 'starx-web',
    tier: 'starter',
    code: 'STX-PROTO',
    name: 'Interactive Prototype & Stitch Blueprint',
    tagline: 'Rapid interactive demo validation for visionary founders',
    description: '1–3 responsive screen design artifacts, Google Stitch AI generation, and click-through staging demo.',
    price_inr: 49999,
    price_usd: 699,
    is_custom_price: false,
    timeline_weeks: '1–2 Weeks',
    screen_scope: '1–3 Screens',
    sla_level: 'Standard Next-Day',
    warranty_days: 30,
    is_active: true,
  },
  {
    id: 'plan_mvp_v1',
    division_slug: 'starx-web',
    tier: 'growth',
    code: 'STX-MVP',
    name: 'Production MVP Launchpad',
    tagline: 'End-to-end full-stack platform built for immediate market launch',
    description: 'Complete Next.js 15 App Router architecture, Supabase auth/database, UPI/Razorpay payment gateway, and admin panel.',
    price_inr: 149999,
    price_usd: 1999,
    is_custom_price: false,
    timeline_weeks: '3–4 Weeks',
    screen_scope: '5–8 Core Views',
    sla_level: 'High Priority (4hr Response)',
    warranty_days: 60,
    is_active: true,
  },
  {
    id: 'plan_prod_v1',
    division_slug: 'starx-ai',
    tier: 'enterprise',
    code: 'STX-PROD',
    name: 'Enterprise Scale & Autonomous AI Systems',
    tagline: 'High-concurrency cloud architecture with integrated agent workflows',
    description: 'Multi-tenant database schema, real-time sync, custom LLM tool-calling orchestration, role-based access control, and defense-grade security.',
    price_inr: 349999,
    price_usd: 4499,
    is_custom_price: false,
    timeline_weeks: '6–8 Weeks',
    screen_scope: '12–18 Screens',
    sla_level: '24/7 Dedicated Slack Channel',
    warranty_days: 90,
    is_active: true,
  },
  {
    id: 'plan_custom_v1',
    division_slug: 'starx-systems',
    tier: 'custom',
    code: 'STX-CUSTOM',
    name: 'Bespoke Architecture & Frontier Engineering',
    tagline: 'Tailored technology systems for complex enterprise operations',
    description: 'Custom hardware-software bridging, offline-first edge sync, proprietary algorithm design, and dedicated engineering squad.',
    price_inr: 750000,
    price_usd: 9999,
    is_custom_price: true,
    timeline_weeks: 'Custom Scope',
    screen_scope: 'Unlimited Scope',
    sla_level: 'Dedicated Squad Lead',
    warranty_days: 180,
    is_active: true,
  },
];

export async function GET() {
  try {
    await requireAdmin(['owner', 'admin', 'editor']);
    const adminClient = createAdminClient();

    try {
      const { data: plans, error } = await adminClient
        .from('canonical_plans')
        .select('*')
        .order('price_inr', { ascending: true });

      if (error || !plans || plans.length === 0) {
        return NextResponse.json({ success: true, plans: DEFAULT_CANONICAL_PLANS });
      }

      return NextResponse.json({ success: true, plans });
    } catch {
      return NextResponse.json({ success: true, plans: DEFAULT_CANONICAL_PLANS });
    }
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch plans.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin']);
    const body = await request.json();
    const { id, price_inr, timeline_weeks, is_active, name, description } = body;

    if (!id) {
      return NextResponse.json({ error: 'Plan ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (price_inr !== undefined) updatePayload.price_inr = price_inr;
    if (timeline_weeks !== undefined) updatePayload.timeline_weeks = timeline_weeks;
    if (is_active !== undefined) updatePayload.is_active = is_active;
    if (name !== undefined) updatePayload.name = name;
    if (description !== undefined) updatePayload.description = description;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (adminClient.from('canonical_plans' as any) as any)
      .update(updatePayload)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.warn('[PLAN UPDATE DB WARN]', error);
    }

    await logAdminAction({
      actorUserId: admin.userId,
      actorEmail: admin.email,
      actorRole: admin.role,
      action: 'PRICING_PLAN_UPDATED',
      entityType: 'canonical_plans',
      entityId: id,
      metadata: updatePayload,
    });

    return NextResponse.json({ success: true, plan: data || { id, ...updatePayload } });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to update plan.' }, { status: 500 });
  }
}
