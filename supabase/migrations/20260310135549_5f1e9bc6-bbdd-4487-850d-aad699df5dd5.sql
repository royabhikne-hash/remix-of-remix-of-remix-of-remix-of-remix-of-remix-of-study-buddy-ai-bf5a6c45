
CREATE TABLE public.custom_boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  state text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_boards ENABLE ROW LEVEL SECURITY;

-- Public can read active boards
CREATE POLICY "Anyone can view active boards"
ON public.custom_boards
FOR SELECT
TO public
USING (is_active = true);

-- Deny all write from client (admin uses service role via edge function)
CREATE POLICY "Deny client write on custom_boards"
ON public.custom_boards
FOR ALL
TO public
USING (false)
WITH CHECK (false);
