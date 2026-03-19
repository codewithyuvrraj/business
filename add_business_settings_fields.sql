-- ============================================================
-- ADD BUSINESS SETTINGS FIELDS TO PROFILES TABLE
-- Run this in Supabase SQL Editor or Nhost Hasura Console > SQL
-- ============================================================

-- Add missing business settings fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private', 'connections')),
ADD COLUMN IF NOT EXISTS message_requests TEXT DEFAULT 'everyone' CHECK (message_requests IN ('everyone', 'connections', 'none')),
ADD COLUMN IF NOT EXISTS read_receipts TEXT DEFAULT 'enabled' CHECK (read_receipts IN ('enabled', 'disabled')),
ADD COLUMN IF NOT EXISTS profile_picture_url TEXT,
ADD COLUMN IF NOT EXISTS dashboard_image_url TEXT;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_visibility ON profiles (profile_visibility);
CREATE INDEX IF NOT EXISTS idx_profiles_active ON profiles (is_active);

-- Update existing users to have default values
UPDATE profiles 
SET 
    profile_visibility = COALESCE(profile_visibility, 'public'),
    message_requests = COALESCE(message_requests, 'everyone'),
    read_receipts = COALESCE(read_receipts, 'enabled')
WHERE 
    profile_visibility IS NULL 
    OR message_requests IS NULL 
    OR read_receipts IS NULL;

-- Add message_requests table for private account functionality
CREATE TABLE IF NOT EXISTS message_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (sender_id, receiver_id)
);

-- Create indexes for message requests
CREATE INDEX IF NOT EXISTS idx_message_requests_sender ON message_requests (sender_id);
CREATE INDEX IF NOT EXISTS idx_message_requests_receiver ON message_requests (receiver_id);
CREATE INDEX IF NOT EXISTS idx_message_requests_status ON message_requests (status);

-- Add trigger for message_requests updated_at
CREATE TRIGGER message_requests_updated_at 
    BEFORE UPDATE ON message_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Grant permissions (adjust as needed for your setup)
-- For Supabase, you might need to set up RLS policies instead
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON message_requests TO authenticated;