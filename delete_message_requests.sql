-- ============================================================
-- DELETE MESSAGE REQUESTS TABLE - Run in NHOST Hasura Console
-- ============================================================

-- Drop the table (this will also remove it from Hasura tracking)
DROP TABLE IF EXISTS message_requests CASCADE;

-- Drop indexes if they exist separately
DROP INDEX IF EXISTS idx_message_requests_receiver;
DROP INDEX IF EXISTS idx_message_requests_sender;
DROP INDEX IF EXISTS idx_message_requests_created_at;

-- Remove the profile_visibility column if you don't want it
-- ALTER TABLE profiles DROP COLUMN IF EXISTS profile_visibility;

-- Success message
SELECT 'message_requests table deleted successfully!' as result;