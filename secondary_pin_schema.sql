-- Secondary PIN table for password reset
CREATE TABLE IF NOT EXISTS public.secondary_pins (
    user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    pin_hash text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Function to set/update secondary PIN (hashed with bcrypt)
CREATE OR REPLACE FUNCTION public.set_secondary_pin(p_user_id uuid, p_pin text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO public.secondary_pins (user_id, pin_hash)
    VALUES (p_user_id, crypt(p_pin, gen_salt('bf')))
    ON CONFLICT (user_id) DO UPDATE
        SET pin_hash = crypt(p_pin, gen_salt('bf')), updated_at = now();
END;
$$;

-- Function to verify secondary PIN (returns true/false)
CREATE OR REPLACE FUNCTION public.verify_secondary_pin(p_user_id uuid, p_pin text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    stored_hash text;
BEGIN
    SELECT pin_hash INTO stored_hash FROM public.secondary_pins WHERE user_id = p_user_id;
    IF stored_hash IS NULL THEN RETURN false; END IF;
    RETURN stored_hash = crypt(p_pin, stored_hash);
END;
$$;

-- Hasura permissions: user role SELECT/INSERT/UPDATE on secondary_pins
-- (tick user_id column only, with check: user_id = X-Hasura-User-Id)
