-- Simple username login setup without IF NOT EXISTS
-- Run these commands one by one in Hasura console

-- 1. Add indexes for performance (skip if already exists)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profiles_username') THEN
        CREATE INDEX idx_profiles_username ON profiles (username);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_profiles_email') THEN
        CREATE INDEX idx_profiles_email ON profiles (email);
    END IF;
END $$;

-- 2. Enable row level security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read for username lookup
DROP POLICY IF EXISTS "public_username_lookup" ON profiles;
CREATE POLICY "public_username_lookup" ON profiles
    FOR SELECT TO public USING (true);

-- 4. Grant select permission
GRANT SELECT ON profiles TO public;