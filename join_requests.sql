-- Join Requests for private groups and channels
CREATE TABLE IF NOT EXISTS join_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('group', 'channel')),
    target_id UUID NOT NULL,        -- group_id or channel_id
    requester_id UUID NOT NULL,     -- user who wants to join
    owner_id UUID NOT NULL,         -- owner who needs to approve
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    UNIQUE(type, target_id, requester_id)   -- prevent duplicate requests
);

-- Index for fast owner lookup (notifications)
CREATE INDEX IF NOT EXISTS idx_join_requests_owner ON join_requests(owner_id, status);
-- Index for fast requester lookup (check pending status)
CREATE INDEX IF NOT EXISTS idx_join_requests_requester ON join_requests(requester_id, target_id);

-- Enable RLS
ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;

-- Requester can insert their own request
CREATE POLICY "requester_insert" ON join_requests
    FOR INSERT WITH CHECK (auth.uid() = requester_id);

-- Owner can read requests for their groups/channels
CREATE POLICY "owner_read" ON join_requests
    FOR SELECT USING (auth.uid() = owner_id OR auth.uid() = requester_id);

-- Owner can update (approve/reject)
CREATE POLICY "owner_update" ON join_requests
    FOR UPDATE USING (auth.uid() = owner_id);
