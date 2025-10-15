import { NextRequest, NextResponse } from 'next/server';
import { extractEmergencyData, generateAIResponse } from '@/lib/gemini';
import { getServerSupabaseClient } from '@/lib/supabase';
import type { ChatMessage, EmergencyIntakeData } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface IntakeRequestBody {
  messages: ChatMessage[];
  sessionId?: string;
}

/**
 * POST /api/intake
 * Process conversational emergency intake using Gemini AI
 */
export async function POST(request: NextRequest) {
  try {
    const body: IntakeRequestBody = await request.json();
    const { messages, sessionId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Extract emergency data from conversation using Gemini AI
    const extractedData = await extractEmergencyData(messages);

    // Generate AI response
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const aiResponse = await generateAIResponse(extractedData, lastUserMessage);

    // If extraction is complete and confident, save to database
    let emergencyId: string | null = null;
    if (
      extractedData.is_complete &&
      extractedData.confidence !== 'low' &&
      extractedData.location_city &&
      extractedData.requester_name &&
      extractedData.requester_phone
    ) {
      try {
        const supabase = getServerSupabaseClient();

        // Insert emergency record
        const { data: emergency, error: insertError } = await supabase
          .from('emergencies')
          .insert({
            emergency_type: extractedData.emergency_type,
            urgency: extractedData.urgency,
            description: extractedData.additional_context || '',
            location_address: extractedData.location_address || extractedData.location_city,
            location_lat: null, // TODO: Geocode address to get lat/lng
            location_lng: null,
            requester_name: extractedData.requester_name,
            requester_phone: extractedData.requester_phone,
            requester_email: extractedData.requester_email || null,
            people_affected: extractedData.people_affected || null,
            has_children: extractedData.has_children,
            has_elderly: extractedData.has_elderly,
            has_disabilities: extractedData.has_disabilities,
            specific_needs: extractedData.specific_needs,
            status: 'pending',
            session_id: sessionId || null,
          })
          .select('id')
          .single();

        if (insertError) {
          console.error('Database insert error:', insertError);
        } else if (emergency) {
          emergencyId = emergency.id;
          console.log('Emergency saved with ID:', emergencyId);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Don't fail the request if database save fails
      }
    }

    // Return response
    return NextResponse.json({
      success: true,
      extractedData,
      aiResponse,
      emergencyId,
      isComplete: extractedData.is_complete,
    });
  } catch (error) {
    console.error('Intake API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process emergency intake',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/intake?sessionId=xxx
 * Retrieve emergency by session ID
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId parameter is required' },
        { status: 400 }
      );
    }

    const supabase = getServerSupabaseClient();

    const { data: emergency, error } = await supabase
      .from('emergencies')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        return NextResponse.json(
          { error: 'No emergency found for this session' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      emergency,
    });
  } catch (error) {
    console.error('Intake GET API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve emergency',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
