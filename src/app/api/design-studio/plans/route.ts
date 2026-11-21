import { NextResponse, type NextRequest } from 'next/server';
import {
  CANONICAL_PLANS,
  GLOBAL_PLAN_ADDONS,
  getPlansByDivision,
  normalizeDivisionSlug,
  getAllPlans,
  getSolutionsByDivision,
  getPlanById,
} from '@/data/plans';
import { recommendPlan } from '@/lib/plans/recommendationEngine';

export const dynamic = 'force-dynamic';

/**
 * Public Design Studio Plans API
 * GET /api/design-studio/plans?division=starx-web&solution=ecommerce-websites&industry=retail-commerce&complexity=5
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawDivision = searchParams.get('division');
    const solution = searchParams.get('solution') || undefined;
    const industry = searchParams.get('industry') || 'general';
    const complexityParam = searchParams.get('complexity');
    const complexityScore = complexityParam ? parseInt(complexityParam, 10) : 4;
    const planTypePreference = (searchParams.get('planType') as 'subscription' | 'bespoke_project' | null) || undefined;
    const rawFeatures = searchParams.get('features');
    const rawFeatureNames = searchParams.get('featureNames');
    const designStyle = searchParams.get('designStyle') || '';
    const selectedFeatures: string[] = [];
    if (rawFeatures) {
      selectedFeatures.push(...rawFeatures.split(',').filter(Boolean));
    }
    if (rawFeatureNames) {
      selectedFeatures.push(...rawFeatureNames.split(',').filter(Boolean));
    }
    if (designStyle) {
      selectedFeatures.push(designStyle);
    }
    const rawDescription = searchParams.get('description') || '';
    const pageCountParam = searchParams.get('pages');
    const pageCount = pageCountParam ? parseInt(pageCountParam, 10) : undefined;

    if (!rawDivision) {
      return NextResponse.json({
        success: true,
        plans: getAllPlans(),
        addons: GLOBAL_PLAN_ADDONS,
      });
    }

    const division = normalizeDivisionSlug(rawDivision);
    const availableSolutions = getSolutionsByDivision(division);
    const plans = getPlansByDivision(division, solution);

    const recommendation = recommendPlan({
      divisionSlug: division,
      solutionSlugOrId: solution,
      industrySlug: industry,
      platforms: ['Web Desktop', 'Mobile Responsive'],
      selectedFeatures,
      rawDescription,
      pageCount,
      planTypePreference,
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
      solution,
      availableSolutions,
      plans,
      recommendedPlan: recommendation.recommendedPlan,
      alternativePlans: recommendation.alternativePlans,
      recommendationData: recommendation,
      addons: recommendation.suggestedAddons.length > 0 ? recommendation.suggestedAddons : GLOBAL_PLAN_ADDONS,
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
