-- Simple username login setup for BusinessConnect
-- Run these commands one by one in Hasura console or database admin

-- 1. Create indexes for better performance (run individually)
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles (username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles (email);

-- 2. Enable row level security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create policy for public username lookup (drop existing first if needed)
DROP POLICY IF EXISTS "public_username_lookup" ON profiles;
CREATE POLICY "public_username_lookup" ON profiles
    FOR SELECT TO public USING (true);

-- 4. Grant select permission to public role
GRANT SELECT ON profiles TO public;

-- 5. Alternative: If public role doesn't work, create a specific policy for anonymous users
DROP POLICY IF EXISTS "anonymous_username_lookup" ON profiles;
CREATE POLICY "anonymous_username_lookup" ON profiles
    FOR SELECT TO anon USING (true);

-- 6. Grant select to anonymous role as well
GRANT SELECT ON profiles TO anon;

-- Note: If you get permission errors, you may need to run these as a database admin
-- or adjust your Hasura permissions to allow public access to the profiles table