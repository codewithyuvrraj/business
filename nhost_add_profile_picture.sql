-- Run in Nhost Hasura Console → Data → SQL
-- Check "Track this" checkbox before running

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_picture_url TEXT;
