-- Add dashboard_image_url column to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS dashboard_image_url TEXT DEFAULT NULL;

-- Supabase storage: create dashboard-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'dashboard-images',
  'dashboard-images',
  true,
  10485760,  -- 10MB
  ARRAY['image/jpeg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Open RLS policies (Nhost auth, not Supabase auth)
CREATE POLICY "dashboard_images_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'dashboard-images');

CREATE POLICY "dashboard_images_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'dashboard-images');

CREATE POLICY "dashboard_images_update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'dashboard-images');

CREATE POLICY "dashboard_images_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'dashboard-images');
