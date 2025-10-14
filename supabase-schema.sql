-- RapidResponse AI Database Schema
-- Emergency Response Platform
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- EMERGENCIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS emergencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  emergency_type TEXT NOT NULL CHECK (emergency_type IN ('flood', 'fire', 'earthquake', 'hurricane', 'layoff', 'medical', 'other')),
  description TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  location_address TEXT,
  urgency TEXT NOT NULL CHECK (urgency IN ('critical', 'high', 'medium', 'low')),
  people_affected INTEGER,
  specific_needs JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'matched', 'in_progress', 'resolved', 'closed')),
  requester_contact TEXT,
  ai_extracted_data JSONB,
  has_children BOOLEAN DEFAULT false,
  has_elderly BOOLEAN DEFAULT false,
  has_disabilities BOOLEAN DEFAULT false
);

-- Indexes for emergencies
CREATE INDEX IF NOT EXISTS idx_emergencies_status ON emergencies(status);
CREATE INDEX IF NOT EXISTS idx_emergencies_urgency ON emergencies(urgency);
CREATE INDEX IF NOT EXISTS idx_emergencies_created_at ON emergencies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_emergencies_location ON emergencies(location_lat, location_lng);
CREATE INDEX IF NOT EXISTS idx_emergencies_composite ON emergencies(status, urgency, created_at DESC);

-- =====================================================
-- VOLUNTEERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  location_address TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  availability TEXT,
  max_distance_miles INTEGER DEFAULT 25,
  emergency_preferences JSONB DEFAULT '{}'::jsonb,
  total_missions INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  is_active BOOLEAN DEFAULT true
);

-- Indexes for volunteers
CREATE INDEX IF NOT EXISTS idx_volunteers_is_active ON volunteers(is_active);
CREATE INDEX IF NOT EXISTS idx_volunteers_location ON volunteers(location_lat, location_lng);
CREATE INDEX IF NOT EXISTS idx_volunteers_user_id ON volunteers(user_id);
CREATE INDEX IF NOT EXISTS idx_volunteers_active_location ON volunteers(is_active, location_lat, location_lng) WHERE is_active = true;

-- =====================================================
-- BUSINESSES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  business_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  location_address TEXT,
  resources JSONB DEFAULT '[]'::jsonb,
  resource_descriptions TEXT,
  availability_duration TEXT,
  auto_match BOOLEAN DEFAULT true
);

-- Indexes for businesses
CREATE INDEX IF NOT EXISTS idx_businesses_auto_match ON businesses(auto_match) WHERE auto_match = true;
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses(location_lat, location_lng);
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);

-- =====================================================
-- MATCHES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  emergency_id UUID NOT NULL REFERENCES emergencies(id) ON DELETE CASCADE,
  volunteer_id UUID REFERENCES volunteers(id) ON DELETE SET NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  match_score DECIMAL(5, 2) CHECK (match_score >= 0 AND match_score <= 100),
  match_reasoning TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'completed', 'cancelled')),
  accepted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
  feedback_notes TEXT,
  CONSTRAINT match_has_volunteer_or_business CHECK (
    volunteer_id IS NOT NULL OR business_id IS NOT NULL
  )
);

-- Indexes for matches
CREATE INDEX IF NOT EXISTS idx_matches_emergency_id ON matches(emergency_id);
CREATE INDEX IF NOT EXISTS idx_matches_volunteer_id ON matches(volunteer_id);
CREATE INDEX IF NOT EXISTS idx_matches_business_id ON matches(business_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_created_at ON matches(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_matches_composite ON matches(emergency_id, status, created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE emergencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Emergencies policies (read-only for now, create for authenticated users)
CREATE POLICY "Emergencies are viewable by everyone"
  ON emergencies FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create emergencies"
  ON emergencies FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own emergencies"
  ON emergencies FOR UPDATE
  USING (true);

-- Volunteers policies
CREATE POLICY "Volunteers are viewable by everyone"
  ON volunteers FOR SELECT
  USING (true);

CREATE POLICY "Users can create volunteer profiles"
  ON volunteers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own volunteer profile"
  ON volunteers FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Businesses policies
CREATE POLICY "Businesses are viewable by everyone"
  ON businesses FOR SELECT
  USING (true);

CREATE POLICY "Users can create business profiles"
  ON businesses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own business profile"
  ON businesses FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Matches policies
CREATE POLICY "Matches are viewable by everyone"
  ON matches FOR SELECT
  USING (true);

CREATE POLICY "Matches can be created by anyone"
  ON matches FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Matches can be updated by anyone"
  ON matches FOR UPDATE
  USING (true);

-- =====================================================
-- REALTIME SUBSCRIPTIONS
-- =====================================================

-- Enable Realtime for critical tables
ALTER PUBLICATION supabase_realtime ADD TABLE emergencies;
ALTER PUBLICATION supabase_realtime ADD TABLE matches;
ALTER PUBLICATION supabase_realtime ADD TABLE volunteers;

-- =====================================================
-- UTILITY FUNCTIONS
-- =====================================================

-- Function to update volunteer stats after match completion
CREATE OR REPLACE FUNCTION update_volunteer_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' AND NEW.volunteer_id IS NOT NULL THEN
    UPDATE volunteers
    SET total_missions = total_missions + 1
    WHERE id = NEW.volunteer_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update volunteer stats
DROP TRIGGER IF EXISTS trigger_update_volunteer_stats ON matches;
CREATE TRIGGER trigger_update_volunteer_stats
  AFTER UPDATE ON matches
  FOR EACH ROW
  EXECUTE FUNCTION update_volunteer_stats();

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE emergencies IS 'Stores emergency requests from people in need';
COMMENT ON TABLE volunteers IS 'Stores volunteer profiles and availability';
COMMENT ON TABLE businesses IS 'Stores business resource offerings';
COMMENT ON TABLE matches IS 'Stores matches between emergencies and volunteers/businesses';

COMMENT ON COLUMN emergencies.ai_extracted_data IS 'Raw JSON data extracted by AI during intake';
COMMENT ON COLUMN emergencies.specific_needs IS 'Array of specific needs (shelter, food, medical, etc.)';
COMMENT ON COLUMN volunteers.skills IS 'Array of volunteer skills';
COMMENT ON COLUMN volunteers.emergency_preferences IS 'Volunteer preferences for emergency types';
COMMENT ON COLUMN businesses.resources IS 'Array of available resources';
COMMENT ON COLUMN matches.match_score IS 'AI-generated match score (0-100)';
COMMENT ON COLUMN matches.match_reasoning IS 'Human-readable explanation of why this match was made';

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE 'Tables created: emergencies, volunteers, businesses, matches';
  RAISE NOTICE 'Indexes created for optimal query performance';
  RAISE NOTICE 'Row Level Security enabled on all tables';
  RAISE NOTICE 'Realtime subscriptions enabled on emergencies, matches, volunteers';
END $$;
