-- ============================================================
-- FIX: profile_visibility error on messages INSERT
-- Run this in Supabase SQL Editor
-- Project: mbvdirbpobgcclkmqvvg
-- ============================================================

-- STEP 1: Check what columns messages table actually has
-- (run this first to diagnose)
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'messages'
ORDER BY ordinal_position;

-- STEP 2: Check what triggers exist on messages table
SELECT trigger_name, event_manipulation, action_statement
FROM information_schema.triggers
WHERE event_object_table = 'messages';

-- STEP 3: Check RLS policies on messages table
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'messages';

-- ============================================================
-- FIXES (run after diagnosing above)
-- ============================================================

-- FIX A: If messages table has a profile_visibility column that shouldn't be there
-- ALTER TABLE messages DROP COLUMN IF EXISTS profile_visibility;

-- FIX B: Add profile_visibility to profiles table (most likely fix)
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS profile_visibility VARCHAR(20) DEFAULT 'public'
    CHECK (profile_visibility IN ('public', 'private', 'connections'));

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS message_requests VARCHAR(20) DEFAULT 'everyone';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS read_receipts    VARCHAR(20) DEFAULT 'enabled';

UPDATE profiles SET profile_visibility = 'public' WHERE profile_visibility IS NULL;

-- FIX C: Drop and recreate clean RLS policies on messages (no profile references)
DROP POLICY IF EXISTS "Allow read messages"   ON messages;
DROP POLICY IF EXISTS "Allow insert messages" ON messages;
DROP POLICY IF EXISTS "Allow update messages" ON messages;
DROP POLICY IF EXISTS "Allow delete messages" ON messages;

-- Drop any other policies that might reference profile_visibility
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT policyname FROM pg_policies WHERE tablename = 'messages'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON messages', pol.policyname);
    END LOOP;
END $$;

-- Recreate clean policies with no profile joins
CREATE POLICY "Allow read messages"   ON messages FOR SELECT USING (true);
CREATE POLICY "Allow insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update messages" ON messages FOR UPDATE USING (true);
CREATE POLICY "Allow delete messages" ON messages FOR DELETE USING (true);

-- FIX D: Drop any triggers on messages that reference profile_visibility
-- First check what triggers exist (from STEP 2 above), then drop bad ones:
-- DROP TRIGGER IF EXISTS <trigger_name> ON messages;

-- Verify everything is clean
SELECT 'messages columns:' as info;
SELECT column_name FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'messages';

SELECT 'messages policies:' as info;
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'messages';
