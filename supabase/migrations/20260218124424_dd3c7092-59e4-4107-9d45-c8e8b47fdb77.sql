
-- Fix security definer view - recreate with security_invoker
DROP VIEW IF EXISTS public.coaching_centers_public;
CREATE VIEW public.coaching_centers_public
WITH (security_invoker = true)
AS SELECT id, coaching_id, name, district, state, created_at
FROM public.coaching_centers;

-- Grant select on the view to anon and authenticated
GRANT SELECT ON public.coaching_centers_public TO anon, authenticated;
