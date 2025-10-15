-- Add contact information fields to emergencies table
-- Run this in Supabase SQL Editor

ALTER TABLE emergencies
  ADD COLUMN IF NOT EXISTS requester_name TEXT,
  ADD COLUMN IF NOT EXISTS requester_phone TEXT,
  ADD COLUMN IF NOT EXISTS requester_email TEXT,
  ADD COLUMN IF NOT EXISTS session_id TEXT;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_emergencies_session_id ON emergencies(session_id);
CREATE INDEX IF NOT EXISTS idx_emergencies_phone ON emergencies(requester_phone);
CREATE INDEX IF NOT EXISTS idx_emergencies_email ON emergencies(requester_email);

-- Update comments
COMMENT ON COLUMN emergencies.requester_name IS 'Name of person requesting emergency help';
COMMENT ON COLUMN emergencies.requester_phone IS 'Contact phone number';
COMMENT ON COLUMN emergencies.requester_email IS 'Contact email address';
COMMENT ON COLUMN emergencies.session_id IS 'Chat session identifier for tracking conversation';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Contact fields added successfully!';
  RAISE NOTICE 'Added: requester_name, requester_phone, requester_email, session_id';
END $$;
