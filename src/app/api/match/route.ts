import { NextRequest, NextResponse } from 'next/server';
import { findMatches, autoMatch, createMatch } from '@/lib/matching';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/match
 * Find or create matches for an emergency
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emergencyId, action, volunteerId, businessId } = body;

    if (!emergencyId) {
      return NextResponse.json(
        { error: 'emergencyId is required' },
        { status: 400 }
      );
    }

    // Auto-match: automatically find and create best matches
    if (action === 'auto') {
      const result = await autoMatch(emergencyId);
      return NextResponse.json({
        success: result.success,
        matchIds: result.matchIds,
        message: result.message,
      });
    }

    // Manual match: create specific match with volunteer or business
    if (action === 'create') {
      if (!volunteerId && !businessId) {
        return NextResponse.json(
          { error: 'Either volunteerId or businessId is required for manual matching' },
          { status: 400 }
        );
      }

      const matchId = await createMatch(emergencyId, volunteerId, businessId);
      return NextResponse.json({
        success: true,
        matchId,
        message: 'Match created successfully',
      });
    }

    // Find matches: return potential matches without creating them
    if (action === 'find' || !action) {
      const matches = await findMatches(emergencyId);
      return NextResponse.json({
        success: true,
        volunteers: matches.volunteers.map((m) => ({
          id: m.volunteer.id,
          name: m.volunteer.name,
          email: m.volunteer.email,
          phone: m.volunteer.phone,
          skills: m.volunteer.skills,
          availability: m.volunteer.availability,
          score: m.score,
          distance: m.distance ? Math.round(m.distance * 10) / 10 : null, // Round to 1 decimal
        })),
        businesses: matches.businesses.map((m) => ({
          id: m.business.id,
          name: m.business.business_name,
          email: m.business.email,
          phone: m.business.phone,
          resources: m.business.resources,
          score: m.score,
          distance: m.distance ? Math.round(m.distance * 10) / 10 : null,
        })),
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "find", "create", or "auto"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Match API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process match request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/match?emergencyId=xxx
 * Get matches for a specific emergency
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const emergencyId = searchParams.get('emergencyId');

    if (!emergencyId) {
      return NextResponse.json(
        { error: 'emergencyId parameter is required' },
        { status: 400 }
      );
    }

    const matches = await findMatches(emergencyId);

    return NextResponse.json({
      success: true,
      volunteers: matches.volunteers.map((m) => ({
        id: m.volunteer.id,
        name: m.volunteer.name,
        email: m.volunteer.email,
        phone: m.volunteer.phone,
        skills: m.volunteer.skills,
        availability: m.volunteer.availability,
        score: m.score,
        distance: m.distance ? Math.round(m.distance * 10) / 10 : null,
      })),
      businesses: matches.businesses.map((m) => ({
        id: m.business.id,
        name: m.business.business_name,
        email: m.business.email,
        phone: m.business.phone,
        resources: m.business.resources,
        score: m.score,
        distance: m.distance ? Math.round(m.distance * 10) / 10 : null,
      })),
    });
  } catch (error) {
    console.error('Match GET API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve matches',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
