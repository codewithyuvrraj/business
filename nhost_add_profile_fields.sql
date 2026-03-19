-- Run in Nhost Hasura Console → Data → SQL
-- Check "Track this" checkbox before running

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS business_hours TEXT,
  ADD COLUMN IF NOT EXISTS timezone TEXT,
  ADD COLUMN IF NOT EXISTS auto_reply TEXT;
