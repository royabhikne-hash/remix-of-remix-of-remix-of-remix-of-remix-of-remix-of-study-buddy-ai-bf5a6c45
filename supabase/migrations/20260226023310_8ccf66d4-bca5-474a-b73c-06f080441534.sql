-- Update existing pro subscriptions to have 90k limit
UPDATE public.subscriptions SET tts_limit = 90000 WHERE plan = 'pro' AND tts_limit = 150000;

-- Normalize existing school/coaching district and state data (trim whitespace)
UPDATE public.schools SET 
  district = TRIM(district),
  state = TRIM(state)
WHERE district IS NOT NULL OR state IS NOT NULL;

UPDATE public.coaching_centers SET 
  district = TRIM(district),
  state = TRIM(state)
WHERE district IS NOT NULL OR state IS NOT NULL;

UPDATE public.students SET 
  district = TRIM(district),
  state = TRIM(state);