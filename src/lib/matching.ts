import { getServerSupabaseClient } from './supabase';
import type { Emergency, Volunteer, Business, Match } from '@/types';

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate match score between emergency and volunteer
 * Higher score = better match
 */
function calculateVolunteerScore(
  emergency: Emergency,
  volunteer: Volunteer
): number {
  let score = 0;

  // Distance scoring (50 points max)
  // Closer = higher score
  if (emergency.location_lat && emergency.location_lng && volunteer.location_lat && volunteer.location_lng) {
    const distance = calculateDistance(
      emergency.location_lat,
      emergency.location_lng,
      volunteer.location_lat,
      volunteer.location_lng
    );

    if (distance <= 5) score += 50; // Within 5km
    else if (distance <= 10) score += 40; // Within 10km
    else if (distance <= 25) score += 30; // Within 25km
    else if (distance <= 50) score += 20; // Within 50km
    else if (distance <= 100) score += 10; // Within 100km
  }

  // Skills matching (30 points max)
  const skills = volunteer.skills as Record<string, boolean>;
  if (emergency.emergency_type === 'medical' && skills.medical) score += 30;
  else if (emergency.emergency_type === 'fire' && skills.shelter) score += 20;
  else if (emergency.emergency_type === 'flood' && (skills.cleanup || skills.shelter)) score += 20;
  else if (emergency.emergency_type === 'earthquake' && (skills.medical || skills.rescue)) score += 25;

  // General helpful skills
  if (skills.first_aid) score += 5;
  if (skills.cpr) score += 5;
  if (skills.transportation) score += 5;

  // Urgency and availability (10 points max)
  if (volunteer.availability === 'immediate' && emergency.urgency === 'critical') score += 10;
  else if (volunteer.availability === 'today') score += 7;
  else if (volunteer.availability === 'this_week') score += 5;

  // Capacity (5 points max)
  if (volunteer.max_concurrent_missions && volunteer.current_missions !== null) {
    const capacityLeft = volunteer.max_concurrent_missions - volunteer.current_missions;
    if (capacityLeft > 0) score += 5;
  }

  // Special needs matching (5 points max)
  if (emergency.has_children && skills.childcare) score += 3;
  if (emergency.has_elderly && skills.elderly_care) score += 3;
  if (emergency.has_disabilities && skills.medical) score += 3;

  return score;
}

/**
 * Calculate match score between emergency and business
 */
function calculateBusinessScore(
  emergency: Emergency,
  business: Business
): number {
  let score = 0;

  // Distance scoring (40 points max)
  if (emergency.location_lat && emergency.location_lng && business.location_lat && business.location_lng) {
    const distance = calculateDistance(
      emergency.location_lat,
      emergency.location_lng,
      business.location_lat,
      business.location_lng
    );

    if (distance <= 10) score += 40;
    else if (distance <= 25) score += 30;
    else if (distance <= 50) score += 20;
    else if (distance <= 100) score += 10;
  }

  // Services matching (40 points max)
  const services = business.services_offered as Record<string, boolean>;
  const needs = emergency.specific_needs || [];

  if (needs.includes('shelter') && services.shelter) score += 40;
  if (needs.includes('food') && services.food) score += 35;
  if (needs.includes('medical') && services.medical) score += 40;
  if (needs.includes('transportation') && services.transportation) score += 30;
  if (needs.includes('clothing') && services.clothing) score += 25;
  if (needs.includes('financial') && services.financial_aid) score += 30;

  // Capacity (10 points max)
  if (business.capacity && business.current_load !== null) {
    const capacityLeft = business.capacity - business.current_load;
    const capacityPercentage = capacityLeft / business.capacity;
    score += Math.floor(capacityPercentage * 10);
  }

  // Urgency matching (10 points max)
  if (emergency.urgency === 'critical' && business.can_handle_critical) score += 10;
  else if (emergency.urgency === 'high') score += 7;

  return score;
}

/**
 * Find best matches for an emergency
 */
export async function findMatches(emergencyId: string): Promise<{
  volunteers: Array<{ volunteer: Volunteer; score: number; distance: number | null }>;
  businesses: Array<{ business: Business; score: number; distance: number | null }>;
}> {
  const supabase = getServerSupabaseClient();

  // Get emergency details
  const { data: emergency, error: emergencyError } = await supabase
    .from('emergencies')
    .select('*')
    .eq('id', emergencyId)
    .single();

  if (emergencyError || !emergency) {
    throw new Error('Emergency not found');
  }

  // Get available volunteers
  const { data: volunteers, error: volunteersError } = await supabase
    .from('volunteers')
    .select('*')
    .eq('status', 'available')
    .gte('availability', 'this_week'); // Only get volunteers available this week or sooner

  if (volunteersError) {
    throw new Error('Failed to fetch volunteers');
  }

  // Get available businesses
  const { data: businesses, error: businessesError } = await supabase
    .from('businesses')
    .select('*')
    .eq('status', 'available');

  if (businessesError) {
    throw new Error('Failed to fetch businesses');
  }

  // Calculate scores for volunteers
  const volunteerMatches = (volunteers || [])
    .map((volunteer) => {
      const score = calculateVolunteerScore(emergency, volunteer);
      let distance: number | null = null;

      if (
        emergency.location_lat &&
        emergency.location_lng &&
        volunteer.location_lat &&
        volunteer.location_lng
      ) {
        distance = calculateDistance(
          emergency.location_lat,
          emergency.location_lng,
          volunteer.location_lat,
          volunteer.location_lng
        );
      }

      return { volunteer, score, distance };
    })
    .filter((match) => match.score > 20) // Minimum score threshold
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, 10); // Top 10 matches

  // Calculate scores for businesses
  const businessMatches = (businesses || [])
    .map((business) => {
      const score = calculateBusinessScore(emergency, business);
      let distance: number | null = null;

      if (
        emergency.location_lat &&
        emergency.location_lng &&
        business.location_lat &&
        business.location_lng
      ) {
        distance = calculateDistance(
          emergency.location_lat,
          emergency.location_lng,
          business.location_lat,
          business.location_lng
        );
      }

      return { business, score, distance };
    })
    .filter((match) => match.score > 20) // Minimum score threshold
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, 5); // Top 5 businesses

  return {
    volunteers: volunteerMatches,
    businesses: businessMatches,
  };
}

/**
 * Create a match between emergency and volunteer/business
 */
export async function createMatch(
  emergencyId: string,
  volunteerId?: string,
  businessId?: string
): Promise<string> {
  const supabase = getServerSupabaseClient();

  if (!volunteerId && !businessId) {
    throw new Error('Either volunteerId or businessId must be provided');
  }

  // Create match record
  const { data: match, error: matchError } = await supabase
    .from('matches')
    .insert({
      emergency_id: emergencyId,
      volunteer_id: volunteerId || null,
      business_id: businessId || null,
      status: 'pending',
      matched_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (matchError || !match) {
    throw new Error('Failed to create match');
  }

  // Update volunteer status if matched
  if (volunteerId) {
    await supabase
      .from('volunteers')
      .update({ status: 'busy' })
      .eq('id', volunteerId);
  }

  // Update business status if matched
  if (businessId) {
    await supabase
      .from('businesses')
      .update({ status: 'busy' })
      .eq('id', businessId);
  }

  // Update emergency status
  await supabase
    .from('emergencies')
    .update({ status: 'matched' })
    .eq('id', emergencyId);

  return match.id;
}

/**
 * Auto-match emergency with best available helpers
 */
export async function autoMatch(emergencyId: string): Promise<{
  success: boolean;
  matchIds: string[];
  message: string;
}> {
  try {
    const matches = await findMatches(emergencyId);
    const matchIds: string[] = [];

    // Match with top volunteer
    if (matches.volunteers.length > 0) {
      const topVolunteer = matches.volunteers[0];
      const matchId = await createMatch(emergencyId, topVolunteer.volunteer.id);
      matchIds.push(matchId);
    }

    // Match with top business if needed
    if (matches.businesses.length > 0) {
      const topBusiness = matches.businesses[0];
      const matchId = await createMatch(emergencyId, undefined, topBusiness.business.id);
      matchIds.push(matchId);
    }

    if (matchIds.length === 0) {
      return {
        success: false,
        matchIds: [],
        message: 'No suitable matches found',
      };
    }

    return {
      success: true,
      matchIds,
      message: `Successfully matched with ${matchIds.length} helper(s)`,
    };
  } catch (error) {
    console.error('Auto-match error:', error);
    return {
      success: false,
      matchIds: [],
      message: error instanceof Error ? error.message : 'Failed to auto-match',
    };
  }
}
