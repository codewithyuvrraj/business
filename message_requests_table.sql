-- Message Requests Table for Private Account Feature
-- This table stores message requests sent to private accounts

CREATE TABLE IF NOT EXISTS message_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    message TEXT, -- Optional message with the request
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one request per sender-receiver pair
    UNIQUE(sender_id, receiver_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_message_requests_receiver ON message_requests(receiver_id, status);
CREATE INDEX IF NOT EXISTS idx_message_requests_sender ON message_requests(sender_id, status);
CREATE INDEX IF NOT EXISTS idx_message_requests_created_at ON message_requests(created_at DESC);

-- Add profile_visibility column to profiles table if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_visibility VARCHAR(20) DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private', 'connections'));

-- Add profile_picture_url column if it doesn't exist (for uploaded profile pictures)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;

-- Add dashboard_image_url column if it doesn't exist (for dashboard backgrounds)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS dashboard_image_url TEXT;

-- Update trigger for updated_at (reuse existing function)
CREATE TRIGGER update_message_requests_updated_at 
    BEFORE UPDATE ON message_requests 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();