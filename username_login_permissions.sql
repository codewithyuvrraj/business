-- ============================================================
-- USERNAME LOGIN PERMISSIONS
-- Set up permissions for username lookup during login
-- ============================================================

-- Enable RLS on profiles table if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public username lookup for login" ON profiles;

-- Allow public read access to username and email fields for login lookup
-- This is needed because username lookup happens before authentication
CREATE POLICY "Allow public username lookup for login" ON profiles
    FOR SELECT
    TO public
    USING (true);

-- Grant necessary permissions to public role for username lookup
GRANT SELECT ON profiles TO public;

-- Create a view for public username lookup (optional, more secure approach)
DROP VIEW IF EXISTS public_username_lookup;
CREATE VIEW public_username_lookup AS
SELECT 
    id,
    username,
    email,
    full_name
FROM profiles
WHERE username IS NOT NULL;

-- Grant access to the view
GRANT SELECT ON public_username_lookup TO public;

-- Verify the setup
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'profiles' 
    AND policyname LIKE '%username%'
ORDER BY policyname;