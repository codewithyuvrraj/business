-- Run this in Nhost Hasura Console → Data → SQL
-- Check "Track this" checkbox before running

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
