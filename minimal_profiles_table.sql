-- ============================================================
-- MINIMAL PROFILES TABLE FOR SUPABASE
-- Run this in Supabase SQL Editor
-- ============================================================

-- Create the profiles table with all business settings fields
CREATE TABLE IF NOT EXISTS profiles (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username                TEXT UNIQUE,
    full_name               TEXT,
    email                   TEXT UNIQUE NOT NULL,
    avatar_url              TEXT,
    profile_picture_url     TEXT,
    dashboard_image_url     TEXT,
    bio                     TEXT,
    job_title               TEXT,
    company                 TEXT,
    industry                TEXT,
    business_hours          TEXT DEFAULT '9 AM - 5 PM',
    timezone                TEXT DEFAULT 'UTC+0 (GMT)',
    auto_reply              TEXT DEFAULT 'Disabled',
    profile_visibility      TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private', 'connections')),
    message_requests        TEXT DEFAULT 'everyone' CHECK (message_requests IN ('everyone', 'connections', 'none')),
    read_receipts           TEXT DEFAULT 'enabled' CHECK (read_receipts IN ('enabled', 'disabled')),
    is_active               BOOLEAN DEFAULT TRUE,
    is_influencer_business  BOOLEAN DEFAULT FALSE,
    influencer_activated_at TIMESTAMPTZ,
    last_seen               TIMESTAMPTZ DEFAULT NOW(),
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- Create message_requests table for private account functionality
CREATE TABLE IF NOT EXISTS message_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (sender_id, receiver_id)
);

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER message_requests_updated_at 
    BEFORE UPDATE ON message_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles (email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles (username);
CREATE INDEX IF NOT EXISTS idx_profiles_visibility ON profiles (profile_visibility);
CREATE INDEX IF NOT EXISTS idx_profiles_active ON profiles (is_active);
CREATE INDEX IF NOT EXISTS idx_message_requests_sender ON message_requests (sender_id);
CREATE INDEX IF NOT EXISTS idx_message_requests_receiver ON message_requests (receiver_id);
CREATE INDEX IF NOT EXISTS idx_message_requests_status ON message_requests (status);