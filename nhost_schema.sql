-- ============================================================
-- NHOST SCHEMA - Run this in Nhost Hasura Console > SQL
-- Subdomain: rfgzsblvrlekjkerhjrr | Region: eu-central-1
-- ============================================================

-- ============================================================
-- RENAME users → profiles (fixes Hasura conflict with auth.users)
-- Run this if you already have the users table
-- ============================================================
ALTER TABLE IF EXISTS public.users RENAME TO profiles;
ALTER TABLE IF EXISTS public.followers RENAME COLUMN follower_id TO follower_id;  -- no-op, just checking
ALTER TABLE IF EXISTS public.followers DROP CONSTRAINT IF EXISTS followers_follower_id_fkey;
ALTER TABLE IF EXISTS public.followers DROP CONSTRAINT IF EXISTS followers_following_id_fkey;
ALTER TABLE IF EXISTS public.followers ADD CONSTRAINT followers_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS public.followers ADD CONSTRAINT followers_following_id_fkey FOREIGN KEY (following_id) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS public.groups DROP CONSTRAINT IF EXISTS groups_created_by_fkey;
ALTER TABLE IF EXISTS public.groups ADD CONSTRAINT groups_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS public.group_members DROP CONSTRAINT IF EXISTS group_members_user_id_fkey;
ALTER TABLE IF EXISTS public.group_members DROP CONSTRAINT IF EXISTS group_members_added_by_fkey;
ALTER TABLE IF EXISTS public.group_members ADD CONSTRAINT group_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS public.group_members ADD CONSTRAINT group_members_added_by_fkey FOREIGN KEY (added_by) REFERENCES profiles(id);
ALTER TABLE IF EXISTS public.channels DROP CONSTRAINT IF EXISTS channels_created_by_fkey;
ALTER TABLE IF EXISTS public.channels ADD CONSTRAINT channels_created_by_fkey FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS public.channel_members DROP CONSTRAINT IF EXISTS channel_members_user_id_fkey;
ALTER TABLE IF EXISTS public.channel_members ADD CONSTRAINT channel_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Fix triggers
DROP TRIGGER IF EXISTS users_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- FRESH INSTALL (if starting from scratch)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
    id                      UUID PRIMARY KEY,           -- matches Nhost Auth user id
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

CREATE TABLE IF NOT EXISTS followers (
    id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    follower_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (follower_id, following_id)
);

CREATE INDEX IF NOT EXISTS idx_followers_follower  ON followers (follower_id);
CREATE INDEX IF NOT EXISTS idx_followers_following ON followers (following_id);

CREATE TABLE IF NOT EXISTS groups (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT,
    photo_url   TEXT,
    created_by  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS group_members (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id   UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role       TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    added_by   UUID REFERENCES profiles(id),
    joined_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (group_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_group_members_group ON group_members (group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user  ON group_members (user_id);

CREATE TABLE IF NOT EXISTS channels (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT,
    photo_url   TEXT,
    created_by  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    is_private  BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS channel_members (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role       TEXT DEFAULT 'subscriber' CHECK (role IN ('owner', 'subscriber')),
    joined_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (channel_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_channel_members_channel ON channel_members (channel_id);
CREATE INDEX IF NOT EXISTS idx_channel_members_user    ON channel_members (user_id);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at  ON profiles;
DROP TRIGGER IF EXISTS groups_updated_at    ON groups;
DROP TRIGGER IF EXISTS channels_updated_at  ON channels;

CREATE TRIGGER profiles_updated_at  BEFORE UPDATE ON profiles  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER groups_updated_at    BEFORE UPDATE ON groups    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER channels_updated_at  BEFORE UPDATE ON channels  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
