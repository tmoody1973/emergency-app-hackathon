import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage, EmergencyIntakeData } from '@/types';

// Validate API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// System prompt for emergency data extraction
const SYSTEM_PROMPT = `You are an empathetic AI assistant helping people in emergency situations. Your job is to extract structured information from conversational input to help match them with appropriate help.

Extract the following information:
- emergency_type: "flood", "fire", "earthquake", "hurricane", "layoff", "medical", or "other"
- urgency: "critical" (life-threatening), "high" (urgent), "medium" (soon), or "low" (non-urgent)
- location_address: full address if provided
- location_city: city name
- location_state: state abbreviation
- people_affected: number of people
- has_children: boolean (true if children are mentioned)
- has_elderly: boolean (true if elderly/seniors are mentioned)
- has_disabilities: boolean (true if disabilities or medical conditions mentioned)
- specific_needs: array of needs like ["shelter", "food", "medical", "clothing", "transportation", "financial", "cleanup", "repairs"]
- additional_context: any other important details
- confidence: "high", "medium", or "low" based on information completeness
- missing_info: array of critical missing information
- follow_up_question: string if you need more information, or null if complete
- is_complete: boolean (true if you have enough info to help)

CRITICAL RULES:
1. Return ONLY valid JSON, no markdown code blocks, no explanations
2. Be empathetic but concise in follow-up questions
3. If location is vague, ask for specific address or cross-streets
4. If urgency is unclear, ask about immediacy of danger
5. Mark is_complete as true only when you have: emergency_type, location (city minimum), urgency, and at least one specific_need
6. Keep follow_up_question to ONE question at a time
7. If someone mentions a specific number of people, set people_affected
8. Infer urgency from context (e.g., "house is flooding NOW" = critical, "lost job last week" = medium)

Example responses:

User: "My house is flooding and we need help!"
{
  "emergency_type": "flood",
  "urgency": "critical",
  "location_address": "",
  "location_city": "",
  "location_state": "",
  "people_affected": 0,
  "has_children": false,
  "has_elderly": false,
  "has_disabilities": false,
  "specific_needs": ["shelter"],
  "additional_context": "house flooding, immediate danger",
  "confidence": "low",
  "missing_info": ["location", "people_affected"],
  "follow_up_question": "Where are you located? Please provide your address or nearest cross-streets.",
  "is_complete": false
}

User: "I'm at 123 Oak Street in Springfield, family of 4 including 2 kids"
{
  "emergency_type": "flood",
  "urgency": "critical",
  "location_address": "123 Oak Street",
  "location_city": "Springfield",
  "location_state": "",
  "people_affected": 4,
  "has_children": true,
  "has_elderly": false,
  "has_disabilities": false,
  "specific_needs": ["shelter", "food"],
  "additional_context": "family of 4 with 2 children, house flooding",
  "confidence": "high",
  "missing_info": [],
  "follow_up_question": null,
  "is_complete": true
}`;

/**
 * Extract emergency data from conversational messages using Gemini AI
 */
export async function extractEmergencyData(
  conversationHistory: ChatMessage[]
): Promise<EmergencyIntakeData> {
  try {
    // Build conversation context
    const conversationText = conversationHistory
      .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const prompt = `${SYSTEM_PROMPT}

Conversation so far:
${conversationText}

Based on this conversation, extract the emergency information as JSON:`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up response (remove markdown code blocks if present)
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }

    // Parse JSON response
    const extractedData = JSON.parse(cleanText) as EmergencyIntakeData;

    // Validate required fields
    if (!extractedData.emergency_type) {
      extractedData.emergency_type = 'other';
    }
    if (!extractedData.urgency) {
      extractedData.urgency = 'medium';
    }
    if (!extractedData.confidence) {
      extractedData.confidence = 'low';
    }
    if (!Array.isArray(extractedData.specific_needs)) {
      extractedData.specific_needs = [];
    }
    if (!Array.isArray(extractedData.missing_info)) {
      extractedData.missing_info = [];
    }

    // Set defaults for boolean fields
    if (typeof extractedData.has_children !== 'boolean') {
      extractedData.has_children = false;
    }
    if (typeof extractedData.has_elderly !== 'boolean') {
      extractedData.has_elderly = false;
    }
    if (typeof extractedData.has_disabilities !== 'boolean') {
      extractedData.has_disabilities = false;
    }
    if (typeof extractedData.people_affected !== 'number') {
      extractedData.people_affected = 0;
    }
    if (typeof extractedData.is_complete !== 'boolean') {
      extractedData.is_complete = false;
    }

    return extractedData;
  } catch (error) {
    console.error('Gemini API error:', error);

    // Return a fallback response
    return {
      emergency_type: 'other',
      urgency: 'medium',
      location_address: '',
      location_city: '',
      location_state: '',
      people_affected: 0,
      has_children: false,
      has_elderly: false,
      has_disabilities: false,
      specific_needs: [],
      additional_context: 'Error processing request',
      confidence: 'low',
      missing_info: ['all_information'],
      follow_up_question:
        "I'm sorry, I'm having trouble processing your request. Could you please describe your emergency situation again? Include your location and what kind of help you need.",
      is_complete: false,
    };
  }
}

/**
 * Generate a conversational AI response based on extracted data
 */
export async function generateAIResponse(
  extractedData: EmergencyIntakeData,
  userMessage: string
): Promise<string> {
  // If we have a follow-up question from extraction, use it
  if (extractedData.follow_up_question) {
    return extractedData.follow_up_question;
  }

  // If extraction is complete, confirm and proceed
  if (extractedData.is_complete) {
    const urgencyText =
      extractedData.urgency === 'critical'
        ? 'This is a critical situation and we will prioritize your request.'
        : extractedData.urgency === 'high'
        ? 'This is urgent and we will find help for you quickly.'
        : 'We understand your situation.';

    return `${urgencyText} I've recorded that you need help with ${extractedData.emergency_type} at ${extractedData.location_address || extractedData.location_city}. We're now matching you with available volunteers and resources in your area. You should hear back very soon.`;
  }

  // Default fallback
  return "Thank you for that information. Can you tell me more about your situation and your location?";
}
