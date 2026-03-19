-- Notifications for join request outcomes (shown to the requester)
CREATE TABLE IF NOT EXISTS request_notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,          -- requester who receives this notification
    type TEXT NOT NULL,             -- 'group' or 'channel'
    target_id UUID NOT NULL,        -- group_id or channel_id
    target_name TEXT NOT NULL,      -- name of group/channel
    status TEXT NOT NULL,           -- 'approved' or 'rejected'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_req_notif_user ON request_notifications(user_id, is_read);

ALTER TABLE request_notifications DISABLE ROW LEVEL SECURITY;
