// Database table types
export interface Emergency {
  id: string;
  created_at: string;
  emergency_type: 'flood' | 'fire' | 'earthquake' | 'hurricane' | 'layoff' | 'medical' | 'other';
  description: string | null;
  location_lat: number | null;
  location_lng: number | null;
  location_address: string | null;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  people_affected: number | null;
  specific_needs: Record<string, any> | null;
  status: 'open' | 'matched' | 'in_progress' | 'resolved' | 'closed';
  requester_contact: string | null;
  requester_name: string | null;
  requester_phone: string | null;
  requester_email: string | null;
  session_id: string | null;
  ai_extracted_data: Record<string, any> | null;
  has_children: boolean;
  has_elderly: boolean;
  has_disabilities: boolean;
}

export interface Volunteer {
  id: string;
  user_id: string | null;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  location_lat: number | null;
  location_lng: number | null;
  location_address: string | null;
  skills: Record<string, any> | null;
  availability: string | null;
  max_distance_miles: number;
  emergency_preferences: Record<string, any> | null;
  total_missions: number;
  rating: number;
  is_active: boolean;
}

export interface Business {
  id: string;
  user_id: string | null;
  created_at: string;
  business_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  location_lat: number | null;
  location_lng: number | null;
  location_address: string | null;
  resources: Record<string, any> | null;
  resource_descriptions: string | null;
  availability_duration: string | null;
  auto_match: boolean;
}

export interface Match {
  id: string;
  created_at: string;
  emergency_id: string;
  volunteer_id: string | null;
  business_id: string | null;
  match_score: number | null;
  match_reasoning: string | null;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  accepted_at: string | null;
  completed_at: string | null;
  feedback_rating: number | null;
  feedback_notes: string | null;
}

// API request/response types
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface EmergencyIntakeData {
  emergency_type: string;
  urgency: string;
  location_address: string;
  location_city?: string;
  location_state?: string;
  requester_name?: string;
  requester_phone?: string;
  requester_email?: string;
  people_affected: number;
  has_children: boolean;
  has_elderly: boolean;
  has_disabilities: boolean;
  specific_needs: string[];
  additional_context: string;
  confidence: 'high' | 'medium' | 'low';
  missing_info: string[];
  follow_up_question: string | null;
  is_complete: boolean;
}

export interface IntakeAPIResponse {
  type: 'follow_up' | 'success' | 'error';
  question?: string;
  emergency?: Emergency;
  extracted_data?: EmergencyIntakeData;
  message?: string;
}

export interface MatchResult {
  volunteer: Volunteer;
  match_score: number;
  match_reasoning: string;
  distance_miles: number;
}
