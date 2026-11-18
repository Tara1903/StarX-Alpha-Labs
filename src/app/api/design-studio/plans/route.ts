import { NextResponse, type NextRequest } from 'next/server';
import {
  CANONICAL_PLANS,
  GLOBAL_PLAN_ADDONS,
  getPlansByDivision,
  normalizeDivisionSlug,
  getAllPlans,
} from '@/data/plans';
import { recommendPlan, calculateComplexityScore } from '@/lib/plans/recommendationEngine';

export const dynamic = 'force-dynamic';

/**
 * Public Design Studio Plans API
 * GET /api/design-studio/plans?division=starx-web&industry=retail-commerce
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawDivision = searchParams.get('division');
    const industry = searchParams.get('industry') || 'general';
    const complexityParam = searchParams.get('complexity');
    const complexityScore = complexityParam ? parseInt(complexityParam, 10) : 4;

    if (!rawDivision) {
      return NextResponse.json({
        success: true,
        plans: getAllPlans(),
        addons: GLOBAL_PLAN_ADDONS,
      });
    }

    const division = normalizeDivisionSlug(rawDivision);
    const plans = getPlansByDivision(division);

    const recommendation = recommendPlan({
      divisionSlug: division,
      industrySlug: industry,
      platforms: ['Web Desktop', 'Mobile Responsive'],
      selectedFeatures: [],
      complexityScore: isNaN(complexityScore) ? 4 : Math.min(10, Math.max(1, complexityScore)),
      complexityFactors: {
        integrations: 3,
        realTime: 2,
        security: 3,
        platforms: 3,
        scale: 3,
      },
    });

    return NextResponse.json({
      success: true,
      division,
      plans,
      recommendedPlan: recommendation.recommendedPlan,
      alternativePlans: recommendation.alternativePlans,
      recommendationData: recommendation,
      addons: GLOBAL_PLAN_ADDONS,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve plans' },
      { status: 500 }
    );
  }
}
