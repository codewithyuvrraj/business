-- Grant user role permission to select and update lock columns
-- Run in Nhost Hasura Console → Data → SQL

-- Step 1: Allow user role to SELECT the new lock columns
-- (Hasura tracks this via metadata — this comment is for reference)
-- Go to: Hasura Console → Data → profiles → Permissions → user → select
-- Add these columns: messages_locked, groups_locked, channels_locked, lock_password

-- Step 2: Allow user role to UPDATE the new lock columns on their own row
-- Go to: Hasura Console → Data → profiles → Permissions → user → update
-- Add these columns: messages_locked, groups_locked, channels_locked, lock_password

-- Quick workaround: grant via Postgres directly (bypasses Hasura role check)
-- This makes the columns accessible to the authenticated role Hasura uses

-- Reload Hasura metadata to pick up new columns
-- (Run this as admin in Hasura SQL tab)
SELECT 1; -- test connection

-- The real fix is in Hasura Console UI:
-- 1. Go to Data → profiles → Permissions tab
-- 2. Click "user" role → "select" permission → check the 4 new columns
-- 3. Click "user" role → "update" permission → check the 4 new columns
-- 4. Save both
