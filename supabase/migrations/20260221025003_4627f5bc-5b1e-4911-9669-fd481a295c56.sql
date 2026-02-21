
-- Create parent access tokens table for shared link access
CREATE TABLE public.parent_access_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_accessed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.parent_access_tokens ENABLE ROW LEVEL SECURITY;

-- Students can manage their own tokens
CREATE POLICY "Students can view own tokens"
  ON public.parent_access_tokens FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own tokens"
  ON public.parent_access_tokens FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can update own tokens"
  ON public.parent_access_tokens FOR UPDATE
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can delete own tokens"
  ON public.parent_access_tokens FOR DELETE
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Deny anonymous access
CREATE POLICY "Deny anonymous access to parent tokens"
  ON public.parent_access_tokens FOR ALL
  USING (false)
  WITH CHECK (false);

-- Create index for fast token lookups
CREATE INDEX idx_parent_access_tokens_token ON public.parent_access_tokens(token);
