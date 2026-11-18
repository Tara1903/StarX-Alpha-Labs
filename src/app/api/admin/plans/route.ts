import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth/admin';
import { createAdminClient } from '@/lib/supabase/admin';
import { logAdminAction } from '@/lib/audit';
import {
  CANONICAL_PLANS,
  CANONICAL_SOLUTIONS,
  CANONICAL_ADDONS,
  CANONICAL_FEATURES,
  RECOMMENDATION_RULES,
  getPlanById,
} from '@/data/plans';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(['owner', 'admin', 'editor']);
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view') || 'plans';

    const adminClient = createAdminClient();

    if (view === 'summary') {
      return NextResponse.json({
        success: true,
        stats: {
          totalDivisions: 6,
          totalSolutions: CANONICAL_SOLUTIONS.length,
          totalPlanFamilies: 28,
          totalPlans: CANONICAL_PLANS.length,
          totalFeatures: CANONICAL_FEATURES.length,
          totalAddons: CANONICAL_ADDONS.length,
          totalRules: RECOMMENDATION_RULES.length,
          publishedPlans: CANONICAL_PLANS.filter(p => p.status === 'PUBLISHED').length,
          draftPricingCount: 0,
        },
        solutions: CANONICAL_SOLUTIONS,
        addons: CANONICAL_ADDONS,
      });
    }

    try {
      const { data: dbPlans, error } = await adminClient
        .from('canonical_plans')
        .select('*')
        .order('price_inr', { ascending: true });

      if (error || !dbPlans || dbPlans.length === 0) {
        return NextResponse.json({
          success: true,
          plans: CANONICAL_PLANS,
          solutions: CANONICAL_SOLUTIONS,
          addons: CANONICAL_ADDONS,
          features: CANONICAL_FEATURES,
          rules: RECOMMENDATION_RULES,
          isFallback: true,
        });
      }

      return NextResponse.json({
        success: true,
        plans: dbPlans,
        solutions: CANONICAL_SOLUTIONS,
        addons: CANONICAL_ADDONS,
        features: CANONICAL_FEATURES,
        rules: RECOMMENDATION_RULES,
        isFallback: false,
      });
    } catch {
      return NextResponse.json({
        success: true,
        plans: CANONICAL_PLANS,
        solutions: CANONICAL_SOLUTIONS,
        addons: CANONICAL_ADDONS,
        features: CANONICAL_FEATURES,
        rules: RECOMMENDATION_RULES,
        isFallback: true,
      });
    }
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to fetch commercial catalogue.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await requireAdmin(['owner', 'admin']);
    const body = await request.json();
    const { id, price_inr, price_usd, timeline_weeks, is_active, name, description, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Plan ID is required.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (price_inr !== undefined) updatePayload.price_inr = price_inr;
    if (price_usd !== undefined) updatePayload.price_usd = price_usd;
    if (timeline_weeks !== undefined) updatePayload.timeline_weeks = timeline_weeks;
    if (is_active !== undefined) updatePayload.is_active = is_active;
    if (name !== undefined) updatePayload.name = name;
    if (description !== undefined) updatePayload.description = description;
    if (status !== undefined) updatePayload.status = status;

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

    const fallbackPlan = getPlanById(id);

    return NextResponse.json({
      success: true,
      plan: data || { ...(fallbackPlan || {}), ...updatePayload, id },
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Failed to update plan.' }, { status: 500 });
  }
}
