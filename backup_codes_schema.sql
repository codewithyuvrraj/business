-- ============================================================
-- Backup Codes Schema for Nhost (Hasura / PostgreSQL)
-- Run this in Nhost Dashboard → Database → SQL Editor
-- ============================================================

-- 1. backup_codes table — one row per user, stores array of 6 codes
CREATE TABLE IF NOT EXISTS public.backup_codes (
    user_id    UUID        NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    codes      JSONB       NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT backup_codes_user_id_key UNIQUE (user_id)
);

-- index for fast lookup
CREATE INDEX IF NOT EXISTS idx_backup_codes_user_id ON public.backup_codes(user_id);

-- 2. Track which profile email field to query (add email to profiles if missing)
-- Skip if your profiles table already has email column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- 3. Hasura permissions — expose to Hasura
-- Run in Nhost → Hasura Console → Data → backup_codes → Permissions
-- OR just track the table in Hasura Console after running this SQL

-- 4. password_resets table — fallback if direct password update not available
CREATE TABLE IF NOT EXISTS public.password_resets (
    user_id      UUID        NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    new_password TEXT        NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT password_resets_user_id_key UNIQUE (user_id)
);

-- ============================================================
-- HASURA PERMISSIONS TO SET IN CONSOLE:
-- backup_codes:
--   SELECT  → user role → filter: {user_id: {_eq: X-Hasura-User-Id}}
--   INSERT  → user role → check: {user_id: {_eq: X-Hasura-User-Id}}
--   UPDATE  → user role → filter: {user_id: {_eq: X-Hasura-User-Id}}, columns: [codes, created_at]
--
-- For forgot password (unauthenticated lookup), allow SELECT on profiles
-- with no row filter for the 'public' role (already done if search works)
-- ============================================================
