-- ============================================================
-- MESSAGE REQUESTS TABLE FOR SUPABASE
-- Run this in Supabase SQL Editor
-- ============================================================

-- Create message requests table
CREATE TABLE IF NOT EXISTS message_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one request per sender-receiver pair
    UNIQUE(sender_id, receiver_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_message_requests_receiver ON message_requests(receiver_id, status);
CREATE INDEX IF NOT EXISTS idx_message_requests_sender ON message_requests(sender_id, status);
CREATE INDEX IF NOT EXISTS idx_message_requests_created_at ON message_requests(created_at DESC);

-- Create update trigger function
CREATE OR REPLACE FUNCTION update_message_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_message_requests_updated_at
    BEFORE UPDATE ON message_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_message_requests_updated_at();

-- Enable Row Level Security
ALTER TABLE message_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can view requests they sent or received
CREATE POLICY "Users can view their own message requests" ON message_requests
    FOR SELECT USING (
        auth.uid() = sender_id OR auth.uid() = receiver_id
    );

-- Users can send message requests
CREATE POLICY "Users can send message requests" ON message_requests
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id
    );

-- Users can update requests they received (approve/reject)
CREATE POLICY "Users can update requests they received" ON message_requests
    FOR UPDATE USING (
        auth.uid() = receiver_id
    );

-- Users can delete requests they sent
CREATE POLICY "Users can delete requests they sent" ON message_requests
    FOR DELETE USING (
        auth.uid() = sender_id
    );

-- Admin policy (if you have admin users)
-- CREATE POLICY "Admins can do everything" ON message_requests
--     FOR ALL USING (
--         EXISTS (
--             SELECT 1 FROM profiles 
--             WHERE id = auth.uid() 
--             AND role = 'admin'
--         )
--     );

-- Success message
SELECT 'Message requests table created in Supabase!' as result;