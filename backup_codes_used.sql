-- Run in Nhost SQL Editor
ALTER TABLE public.backup_codes ADD COLUMN IF NOT EXISTS used_codes JSONB NOT NULL DEFAULT '[]';
