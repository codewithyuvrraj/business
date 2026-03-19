-- ============================================================
-- Lock columns migration — run this in Nhost SQL Editor
-- (Hasura Console → Data → SQL)
-- ============================================================

-- Step 1: Add columns to profiles table
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS messages_locked  BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS groups_locked    BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS channels_locked  BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS lock_password    TEXT;

-- Step 2: After running the SQL above, go to:
--   Hasura Console → Data → public → profiles → Modify
--   Scroll down and click "Reload table" or "Track" on the new columns
--
-- OR run this in the Hasura Metadata API (optional, auto-tracks):
--   POST /v1/metadata
--   { "type": "pg_track_table", "args": { "source": "default", "table": { "schema": "public", "name": "profiles" } } }

-- Step 3: Grant permissions in Hasura Console:
--   Data → public → profiles → Permissions → user role
--   Select: add messages_locked, groups_locked, channels_locked, lock_password
--   Update: add messages_locked, groups_locked, channels_locked, lock_password
