-- Run this in Nhost Dashboard → Database → SQL Editor
-- This creates a function that updates password hash directly in auth.users

CREATE OR REPLACE FUNCTION public.reset_user_password(user_id uuid, new_password text)
RETURNS void AS $$
BEGIN
  UPDATE auth.users
  SET password_hash = crypt(new_password, gen_salt('bf'))
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to public role so it can be called via GraphQL
GRANT EXECUTE ON FUNCTION public.reset_user_password(uuid, text) TO PUBLIC;
