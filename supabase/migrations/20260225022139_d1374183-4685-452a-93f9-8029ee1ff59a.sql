
-- Performance indexes for 5k user scale

-- Students table - most queried
CREATE INDEX IF NOT EXISTS idx_students_user_id ON public.students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_school_id ON public.students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_coaching_center_id ON public.students(coaching_center_id);
CREATE INDEX IF NOT EXISTS idx_students_district ON public.students(district);
CREATE INDEX IF NOT EXISTS idx_students_is_approved ON public.students(is_approved);
CREATE INDEX IF NOT EXISTS idx_students_student_type ON public.students(student_type);

-- Study sessions - heavy reads
CREATE INDEX IF NOT EXISTS idx_study_sessions_student_id ON public.study_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_created_at ON public.study_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_study_sessions_student_created ON public.study_sessions(student_id, created_at DESC);

-- Chat messages - frequent lookups by session
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at DESC);

-- MCQ attempts
CREATE INDEX IF NOT EXISTS idx_mcq_attempts_student_id ON public.mcq_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_mcq_attempts_created_at ON public.mcq_attempts(created_at DESC);

-- Quiz attempts
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student_id ON public.quiz_attempts(student_id);

-- Weekly tests
CREATE INDEX IF NOT EXISTS idx_weekly_tests_student_id ON public.weekly_tests(student_id);
CREATE INDEX IF NOT EXISTS idx_weekly_tests_week ON public.weekly_tests(week_start, week_end);

-- Daily usage - queried daily
CREATE INDEX IF NOT EXISTS idx_daily_usage_student_date ON public.daily_usage(student_id, usage_date);

-- Chapter progress
CREATE INDEX IF NOT EXISTS idx_chapter_progress_student_id ON public.chapter_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_chapter_progress_lookup ON public.chapter_progress(student_id, board, class, subject);

-- Subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_student_id ON public.subscriptions(student_id);

-- Session tokens - auth lookups
CREATE INDEX IF NOT EXISTS idx_session_tokens_token ON public.session_tokens(token);
CREATE INDEX IF NOT EXISTS idx_session_tokens_user_id ON public.session_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_session_tokens_expires ON public.session_tokens(expires_at);

-- Ranking history
CREATE INDEX IF NOT EXISTS idx_ranking_history_student_week ON public.ranking_history(student_id, week_start);
CREATE INDEX IF NOT EXISTS idx_ranking_history_school_week ON public.ranking_history(school_id, week_start);

-- Rate limits
CREATE INDEX IF NOT EXISTS idx_ai_rate_limits_user_action ON public.ai_rate_limits(user_id, action);

-- Login attempts
CREATE INDEX IF NOT EXISTS idx_login_attempts_identifier ON public.login_attempts(identifier, created_at DESC);

-- Parent access tokens
CREATE INDEX IF NOT EXISTS idx_parent_access_tokens_token ON public.parent_access_tokens(token);
CREATE INDEX IF NOT EXISTS idx_parent_access_tokens_student ON public.parent_access_tokens(student_id);

-- Achievements
CREATE INDEX IF NOT EXISTS idx_achievements_student_id ON public.achievements(student_id);

-- Rank notifications
CREATE INDEX IF NOT EXISTS idx_rank_notifications_student ON public.rank_notifications(student_id, is_read);

-- Upgrade requests
CREATE INDEX IF NOT EXISTS idx_upgrade_requests_student ON public.upgrade_requests(student_id);
CREATE INDEX IF NOT EXISTS idx_upgrade_requests_status ON public.upgrade_requests(status);

-- Schools lookups
CREATE INDEX IF NOT EXISTS idx_schools_school_id ON public.schools(school_id);
CREATE INDEX IF NOT EXISTS idx_schools_district ON public.schools(district);

-- Coaching centers lookups
CREATE INDEX IF NOT EXISTS idx_coaching_centers_coaching_id ON public.coaching_centers(coaching_id);
CREATE INDEX IF NOT EXISTS idx_coaching_centers_district ON public.coaching_centers(district);
