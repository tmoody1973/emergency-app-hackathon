import { NextRequest, NextResponse } from 'next/server';
import { getDetailedStats } from '@/lib/rateLimiter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/security
 * Get security and rate limiting statistics
 *
 * This endpoint provides detailed information about:
 * - Active IPs and their request patterns
 * - Rate limit violations
 * - Blocked IPs
 * - Session statistics
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication middleware here
    // For now, this is unsecured for development purposes
    // In production, verify admin credentials or API key

    const stats = getDetailedStats();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...stats,
    });
  } catch (error) {
    console.error('Admin security stats error:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve security statistics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
