-- ============================================================
-- COMPLETE SETUP FOR PRIVATE ACCOUNTS & MESSAGE REQUESTS
-- Run this in NHOST Hasura Console > Data > SQL
-- ============================================================

-- First ensure the base schema exists
CREATE TABLE IF NOT EXISTS profiles (
    id                      UUID PRIMARY KEY,
    username                TEXT UNIQUE,
    full_name               TEXT,
    email                   TEXT UNIQUE NOT NULL,
    avatar_url              TEXT,
    bio                     TEXT,
    job_title               TEXT,
    company                 TEXT,
    industry                TEXT,
    business_hours          TEXT DEFAULT '9 AM - 5 PM',
    timezone                TEXT DEFAULT 'UTC+0 (GMT)',
    auto_reply              TEXT DEFAULT 'Disabled',
    is_active               BOOLEAN DEFAULT TRUE,
    is_influencer_business  BOOLEAN DEFAULT FALSE,
    influencer_activated_at TIMESTAMPTZ,
    last_seen               TIMESTAMPTZ DEFAULT NOW(),
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_visibility VARCHAR(20) DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private', 'connections'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS dashboard_image_url TEXT;

-- Create update function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create message requests table
CREATE TABLE IF NOT EXISTS message_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(sender_id, receiver_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_message_requests_receiver ON message_requests(receiver_id, status);
CREATE INDEX IF NOT EXISTS idx_message_requests_sender ON message_requests(sender_id, status);
CREATE INDEX IF NOT EXISTS idx_message_requests_created_at ON message_requests(created_at DESC);

-- Add trigger for updated_at
DROP TRIGGER IF EXISTS update_message_requests_updated_at ON message_requests;
CREATE TRIGGER update_message_requests_updated_at 
    BEFORE UPDATE ON message_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();

-- Success message
SELECT 'Private accounts and message requests setup completed!' as result;