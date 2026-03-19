-- ============================================================
-- Hasura Row-Level Permissions for BusinessConnect
-- Run this in Hasura Console → Data → SQL
-- OR apply via Hasura metadata (recommended)
-- ============================================================

-- NOTE: Hasura permissions are metadata-driven, not SQL-driven.
-- The SQL below creates helper functions/policies at the Postgres
-- level. The actual Hasura role permissions must be set in the
-- Hasura Console under each table → Permissions tab.
-- ============================================================

-- 1. PROFILES TABLE
-- Allow authenticated users to SELECT all profiles
-- In Hasura Console → profiles → Permissions → user role → select:
--   Row permission: { "id": { "_is_null": false } }   (i.e. all rows)
--   Columns: id, username, full_name, email, avatar_url, bio, is_active,
--            created_at, updated_at, is_influencer_business, influencer_activated_at

-- Allow users to UPDATE only their own profile
-- In Hasura Console → profiles → Permissions → user role → update:
--   Row permission: { "id": { "_eq": "X-Hasura-User-Id" } }
--   Columns: username, full_name, avatar_url, bio (NOT id/email/created_at)

-- Allow INSERT only for own row (trigger handles this, but just in case)
-- In Hasura Console → profiles → Permissions → user role → insert:
--   Row permission: { "id": { "_eq": "X-Hasura-User-Id" } }
--   Columns: id, email, username, full_name, avatar_url, bio

-- 2. FOLLOWERS TABLE
-- SELECT: authenticated users can see all follows
--   Row permission: {}  (no restriction)
--   Columns: id, follower_id, following_id, created_at

-- INSERT: users can only insert their own follow
--   Row permission: { "follower_id": { "_eq": "X-Hasura-User-Id" } }
--   Columns: follower_id, following_id

-- DELETE: users can only delete their own follow
--   Row permission: { "follower_id": { "_eq": "X-Hasura-User-Id" } }

-- 3. GROUPS TABLE
-- SELECT: all authenticated users
--   Row permission: {}
--   Columns: id, name, description, created_by, created_at, avatar_url, is_private

-- INSERT: any authenticated user can create a group
--   Row permission: { "created_by": { "_eq": "X-Hasura-User-Id" } }

-- UPDATE: only group creator
--   Row permission: { "created_by": { "_eq": "X-Hasura-User-Id" } }

-- 4. GROUP_MEMBERS TABLE
-- SELECT: all authenticated users
--   Row permission: {}

-- INSERT: authenticated users (joining groups)
--   Row permission: { "user_id": { "_eq": "X-Hasura-User-Id" } }

-- DELETE: own membership or group admin
--   Row permission: { "user_id": { "_eq": "X-Hasura-User-Id" } }

-- 5. CHANNELS TABLE
-- SELECT: all authenticated users
--   Row permission: {}

-- INSERT: any authenticated user
--   Row permission: { "created_by": { "_eq": "X-Hasura-User-Id" } }

-- 6. CHANNEL_MEMBERS TABLE
-- SELECT: all authenticated users
--   Row permission: {}

-- INSERT: own membership
--   Row permission: { "user_id": { "_eq": "X-Hasura-User-Id" } }

-- ============================================================
-- QUICK FIX: If you just want everything to work immediately,
-- set the "public" role (unauthenticated) SELECT permission on
-- profiles with no row filter. This lets search.html work even
-- before the user session is fully established.
-- ============================================================

-- Verify profiles table exists and has data:
SELECT id, username, full_name, email, is_active
FROM public.profiles
LIMIT 10;

-- Verify followers table:
SELECT * FROM public.followers LIMIT 5;

-- Check if any profiles are missing (auth users without profiles):
SELECT au.id, au.email
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL;

-- Fix: create missing profiles for any auth users that don't have one
INSERT INTO public.profiles (id, email, username, full_name, is_active)
SELECT
    au.id,
    au.email,
    split_part(au.email, '@', 1),  -- username from email prefix
    split_part(au.email, '@', 1),  -- full_name fallback
    true
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;
