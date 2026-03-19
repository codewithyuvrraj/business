-- ============================================================
-- SUPABASE SCHEMA - Run this in Supabase SQL Editor
-- Project: mbvdirbpobgcclkmqvvg
-- ============================================================

-- Messages table (handles direct + group + channel messages)
CREATE TABLE IF NOT EXISTS messages (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id       UUID NOT NULL,
    receiver_id     UUID,                          -- null for group/channel
    group_id        UUID,                          -- null for direct/channel
    channel_id      UUID,                          -- null for direct/group
    type            TEXT NOT NULL DEFAULT 'direct' CHECK (type IN ('direct', 'group', 'channel')),
    content         TEXT,                          -- text message
    file_url        TEXT,                          -- Nhost storage URL
    file_type       TEXT,                          -- image/video/document/audio
    file_name       TEXT,                          -- original file name
    file_size       BIGINT,                        -- file size in bytes
    is_read         BOOLEAN DEFAULT FALSE,
    is_deleted      BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast conversation loading
CREATE INDEX IF NOT EXISTS idx_messages_direct      ON messages (sender_id, receiver_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_group       ON messages (group_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_channel     ON messages (channel_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_receiver    ON messages (receiver_id, is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at  ON messages (created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone with anon key to read/insert (auth handled by Nhost)
-- Adjust these policies based on your security needs

CREATE POLICY "Allow read messages" ON messages
    FOR SELECT USING (true);

CREATE POLICY "Allow insert messages" ON messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update messages" ON messages
    FOR UPDATE USING (true);

CREATE POLICY "Allow delete messages" ON messages
    FOR DELETE USING (true);

-- ============================================================
-- REALTIME - Enable realtime for messages table
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
