-- Privacy and Security Features Schema
-- Add privacy columns to existing profiles table

-- Add privacy settings columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS profile_visibility VARCHAR(20) DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private', 'connections')),
ADD COLUMN IF NOT EXISTS message_requests VARCHAR(20) DEFAULT 'everyone' CHECK (message_requests IN ('everyone', 'connections', 'none')),
ADD COLUMN IF NOT EXISTS read_receipts VARCHAR(20) DEFAULT 'enabled' CHECK (read_receipts IN ('enabled', 'disabled'));

-- Create profile view requests table
CREATE TABLE IF NOT EXISTS profile_view_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    target_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(requester_id, target_id)
);

-- Create message requests table
CREATE TABLE IF NOT EXISTS message_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    target_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(requester_id, target_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profile_view_requests_target ON profile_view_requests(target_id);
CREATE INDEX IF NOT EXISTS idx_profile_view_requests_requester ON profile_view_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_profile_view_requests_status ON profile_view_requests(status);

CREATE INDEX IF NOT EXISTS idx_message_requests_target ON message_requests(target_id);
CREATE INDEX IF NOT EXISTS idx_message_requests_requester ON message_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_message_requests_status ON message_requests(status);

-- Create indexes on privacy columns
CREATE INDEX IF NOT EXISTS idx_profiles_visibility ON profiles(profile_visibility);
CREATE INDEX IF NOT EXISTS idx_profiles_message_requests ON profiles(message_requests);
CREATE INDEX IF NOT EXISTS idx_profiles_read_receipts ON profiles(read_receipts);

-- Update triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profile_view_requests_updated_at 
    BEFORE UPDATE ON profile_view_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_message_requests_updated_at 
    BEFORE UPDATE ON message_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) policies for privacy tables
ALTER TABLE profile_view_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_requests ENABLE ROW LEVEL SECURITY;

-- Profile view requests policies
CREATE POLICY "Users can view their own profile view requests" ON profile_view_requests
    FOR SELECT USING (requester_id = auth.uid() OR target_id = auth.uid());

CREATE POLICY "Users can create profile view requests" ON profile_view_requests
    FOR INSERT WITH CHECK (requester_id = auth.uid());

CREATE POLICY "Users can update requests they received" ON profile_view_requests
    FOR UPDATE USING (target_id = auth.uid());

-- Message requests policies
CREATE POLICY "Users can view their own message requests" ON message_requests
    FOR SELECT USING (requester_id = auth.uid() OR target_id = auth.uid());

CREATE POLICY "Users can create message requests" ON message_requests
    FOR INSERT WITH CHECK (requester_id = auth.uid());

CREATE POLICY "Users can update requests they received" ON message_requests
    FOR UPDATE USING (target_id = auth.uid());

-- Grant permissions
GRANT ALL ON profile_view_requests TO authenticated;
GRANT ALL ON message_requests TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;