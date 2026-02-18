
-- 1. Add student_type enum
CREATE TYPE public.student_type AS ENUM ('school_student', 'coaching_student');

-- 2. Add student_type column to students (default school_student for existing students)
ALTER TABLE public.students ADD COLUMN student_type public.student_type NOT NULL DEFAULT 'school_student';

-- 3. Add coaching_center_id to students (nullable - only for coaching students)
ALTER TABLE public.students ADD COLUMN coaching_center_id uuid;

-- 4. Create coaching_centers table (similar structure to schools)
CREATE TABLE public.coaching_centers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coaching_id text NOT NULL UNIQUE,
  name text NOT NULL,
  district text,
  state text,
  email text,
  contact_whatsapp text,
  password_hash text NOT NULL,
  is_banned boolean DEFAULT false,
  fee_paid boolean DEFAULT true,
  password_reset_required boolean DEFAULT false,
  password_updated_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- 5. Enable RLS on coaching_centers
ALTER TABLE public.coaching_centers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny all direct access to coaching_centers"
  ON public.coaching_centers
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- 6. Create coaching_centers_public view (like schools_public)
CREATE VIEW public.coaching_centers_public AS
  SELECT id, coaching_id, name, district, state, created_at
  FROM public.coaching_centers;

-- 7. Add foreign key for coaching_center_id
ALTER TABLE public.students
  ADD CONSTRAINT students_coaching_center_id_fkey
  FOREIGN KEY (coaching_center_id) REFERENCES public.coaching_centers(id);

-- 8. Add 'starter' to subscription_plan enum
ALTER TYPE public.subscription_plan ADD VALUE 'starter';

-- 9. Create daily_usage table for tracking chat/image limits
CREATE TABLE public.daily_usage (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  usage_date date NOT NULL DEFAULT CURRENT_DATE,
  chats_used integer NOT NULL DEFAULT 0,
  images_used integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (student_id, usage_date)
);

-- 10. Enable RLS on daily_usage
ALTER TABLE public.daily_usage ENABLE ROW LEVEL SECURITY;

-- Students can view own usage
CREATE POLICY "Students can view own daily usage"
  ON public.daily_usage
  FOR SELECT
  USING (student_id IN (
    SELECT students.id FROM students WHERE students.user_id = auth.uid()
  ));

-- Deny anonymous access
CREATE POLICY "Deny anonymous access to daily_usage"
  ON public.daily_usage
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- 11. Update create_basic_subscription trigger to handle student_type
CREATE OR REPLACE FUNCTION public.create_basic_subscription()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.student_type = 'coaching_student' THEN
    INSERT INTO public.subscriptions (student_id, plan, start_date, is_active, tts_limit)
    VALUES (NEW.id, 'starter', now(), true, 0);
  ELSE
    INSERT INTO public.subscriptions (student_id, plan, start_date, is_active, tts_limit)
    VALUES (NEW.id, 'basic', now(), true, 0);
  END IF;
  RETURN NEW;
END;
$$;

-- 12. Add index for daily_usage lookups
CREATE INDEX idx_daily_usage_student_date ON public.daily_usage (student_id, usage_date);

-- 13. Add index for coaching_center_id lookups
CREATE INDEX idx_students_coaching_center ON public.students (coaching_center_id);
