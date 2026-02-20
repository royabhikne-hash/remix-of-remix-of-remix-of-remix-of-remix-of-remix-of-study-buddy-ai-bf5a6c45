
-- Add stream column to students table
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS stream text;

-- Create MCQ practice attempts table
CREATE TABLE public.mcq_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject text NOT NULL,
  board text NOT NULL,
  class text NOT NULL,
  total_questions integer NOT NULL,
  correct_count integer NOT NULL DEFAULT 0,
  wrong_count integer NOT NULL DEFAULT 0,
  accuracy_percentage numeric NOT NULL DEFAULT 0,
  time_taken_seconds integer NOT NULL DEFAULT 0,
  performance_remark text,
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create weekly tests table
CREATE TABLE public.weekly_tests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subjects_tested text[] NOT NULL DEFAULT '{}',
  total_questions integer NOT NULL,
  correct_count integer NOT NULL DEFAULT 0,
  wrong_count integer NOT NULL DEFAULT 0,
  accuracy_percentage numeric NOT NULL DEFAULT 0,
  time_taken_seconds integer NOT NULL DEFAULT 0,
  strong_subjects text[] DEFAULT '{}',
  weak_subjects text[] DEFAULT '{}',
  improvement_suggestion text,
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  week_start date NOT NULL,
  week_end date NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.mcq_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_tests ENABLE ROW LEVEL SECURITY;

-- MCQ Attempts RLS policies
CREATE POLICY "Deny anonymous access to mcq_attempts"
  ON public.mcq_attempts FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Students can view own mcq_attempts"
  ON public.mcq_attempts FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own mcq_attempts"
  ON public.mcq_attempts FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Deny student update on mcq_attempts"
  ON public.mcq_attempts FOR UPDATE
  USING (false);

CREATE POLICY "Deny student delete on mcq_attempts"
  ON public.mcq_attempts FOR DELETE
  USING (false);

-- Weekly Tests RLS policies
CREATE POLICY "Deny anonymous access to weekly_tests"
  ON public.weekly_tests FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Students can view own weekly_tests"
  ON public.weekly_tests FOR SELECT
  USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students can insert own weekly_tests"
  ON public.weekly_tests FOR INSERT
  WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Deny student update on weekly_tests"
  ON public.weekly_tests FOR UPDATE
  USING (false);

CREATE POLICY "Deny student delete on weekly_tests"
  ON public.weekly_tests FOR DELETE
  USING (false);
