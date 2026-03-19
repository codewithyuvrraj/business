-- ============================================================
-- SUPABASE - Groups & Channels Tables
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS public.groups (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT,
    photo_url   TEXT,
    creator_id  UUID NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.group_members (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id   UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL,
    role       TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    added_by   UUID,
    joined_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (group_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.channels (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT,
    photo_url   TEXT,
    creator_id  UUID NOT NULL,
    is_private  BOOLEAN DEFAULT FALSE,
    is_readonly BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Migration: add is_readonly if upgrading existing DB
ALTER TABLE public.channels ADD COLUMN IF NOT EXISTS is_readonly BOOLEAN DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS public.channel_members (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    channel_id UUID NOT NULL REFERENCES public.channels(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL,
    role       TEXT DEFAULT 'subscriber' CHECK (role IN ('owner', 'subscriber')),
    joined_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (channel_id, user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_groups_creator        ON public.groups (creator_id);
CREATE INDEX IF NOT EXISTS idx_group_members_group   ON public.group_members (group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user    ON public.group_members (user_id);
CREATE INDEX IF NOT EXISTS idx_channels_creator      ON public.channels (creator_id);
CREATE INDEX IF NOT EXISTS idx_channel_members_chan  ON public.channel_members (channel_id);
CREATE INDEX IF NOT EXISTS idx_channel_members_user  ON public.channel_members (user_id);

-- RLS
ALTER TABLE public.groups          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_members ENABLE ROW LEVEL SECURITY;

-- Open policies (auth handled by Nhost)
CREATE POLICY "groups_select"          ON public.groups          FOR SELECT USING (true);
CREATE POLICY "groups_insert"          ON public.groups          FOR INSERT WITH CHECK (true);
CREATE POLICY "groups_update"          ON public.groups          FOR UPDATE USING (true);
CREATE POLICY "groups_delete"          ON public.groups          FOR DELETE USING (true);

CREATE POLICY "group_members_select"   ON public.group_members   FOR SELECT USING (true);
CREATE POLICY "group_members_insert"   ON public.group_members   FOR INSERT WITH CHECK (true);
CREATE POLICY "group_members_update"   ON public.group_members   FOR UPDATE USING (true);
CREATE POLICY "group_members_delete"   ON public.group_members   FOR DELETE USING (true);

CREATE POLICY "channels_select"        ON public.channels        FOR SELECT USING (true);
CREATE POLICY "channels_insert"        ON public.channels        FOR INSERT WITH CHECK (true);
CREATE POLICY "channels_update"        ON public.channels        FOR UPDATE USING (true);
CREATE POLICY "channels_delete"        ON public.channels        FOR DELETE USING (true);

CREATE POLICY "channel_members_select" ON public.channel_members FOR SELECT USING (true);
CREATE POLICY "channel_members_insert" ON public.channel_members FOR INSERT WITH CHECK (true);
CREATE POLICY "channel_members_update" ON public.channel_members FOR UPDATE USING (true);
CREATE POLICY "channel_members_delete" ON public.channel_members FOR DELETE USING (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.groups;
ALTER PUBLICATION supabase_realtime ADD TABLE public.group_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.channels;
ALTER PUBLICATION supabase_realtime ADD TABLE public.channel_members;
