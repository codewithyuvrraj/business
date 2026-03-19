-- ============================================================
-- USERNAME LOGIN ENHANCEMENT
-- Additional optimizations for username/email login functionality
-- ============================================================

-- Add index on username for faster lookups during login
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles (username);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles (email);

-- Add composite index for username/email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username_email ON profiles (username, email);

-- Add function to validate username format
CREATE OR REPLACE FUNCTION validate_username(username_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if username is at least 3 characters
    IF LENGTH(username_input) < 3 THEN
        RETURN FALSE;
    END IF;
    
    -- Check if username contains only allowed characters (letters, numbers, underscores)
    IF username_input !~ '^[a-zA-Z0-9_]+$' THEN
        RETURN FALSE;
    END IF;
    
    -- Check if username doesn't contain @ symbol (to avoid confusion with email)
    IF username_input LIKE '%@%' THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Drop existing constraint if it exists
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_username_format_check;

-- Add constraint to ensure username follows proper format
ALTER TABLE profiles ADD CONSTRAINT profiles_username_format_check 
    CHECK (username IS NULL OR validate_username(username));

-- Add constraint to ensure username is lowercase for consistency
CREATE OR REPLACE FUNCTION lowercase_username()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.username IS NOT NULL THEN
        NEW.username = LOWER(NEW.username);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS profiles_lowercase_username ON profiles;

-- Create trigger to automatically lowercase usernames
CREATE TRIGGER profiles_lowercase_username
    BEFORE INSERT OR UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION lowercase_username();

-- Verify the setup
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'profiles' 
    AND (indexname LIKE '%username%' OR indexname LIKE '%email%')
ORDER BY indexname;

-- Test the validation function
SELECT 
    'valid_user' as test_username,
    validate_username('valid_user') as is_valid
UNION ALL
SELECT 
    'ab' as test_username,
    validate_username('ab') as is_valid
UNION ALL
SELECT 
    'user@domain' as test_username,
    validate_username('user@domain') as is_valid
UNION ALL
SELECT 
    'user-name' as test_username,
    validate_username('user-name') as is_valid;