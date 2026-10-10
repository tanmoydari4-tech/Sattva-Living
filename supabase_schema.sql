-- ============================================================================
-- SATTVA LIVING WELLNESS COMMUNITY - COMPLETE SUPABASE DATABASE SETUP
-- Project ID: atmnwxgvnfsrinqrzvij
-- URL: https://atmnwxgvnfsrinqrzvij.supabase.co
--
-- Instructions:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/atmnwxgvnfsrinqrzvij
-- 2. Click "SQL Editor" on the left sidebar
-- 3. Click "New query", paste this entire script, and click "RUN" (Ctrl + Enter)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Users Table (Member & Admin Profiles, Logins & Contact Information)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
  uid TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile TEXT,
  preferred_language TEXT DEFAULT 'en',
  interests JSONB DEFAULT '[]'::jsonb,
  role TEXT DEFAULT 'member',
  membership_status TEXT DEFAULT 'active',
  wellness_goals TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- ----------------------------------------------------------------------------
-- 2. Program Booking / Enrollments Table (Lifestyle & Wellness Programs)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  program_id TEXT NOT NULL,
  program_title TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  payment_id TEXT,
  amount_paid NUMERIC DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_email ON public.enrollments(user_email);
CREATE INDEX IF NOT EXISTS idx_enrollments_program_id ON public.enrollments(program_id);

-- ----------------------------------------------------------------------------
-- 3. Event Appointments / Session Registrations Table (Morning/Evening Sessions)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  event_id TEXT NOT NULL,
  event_title TEXT NOT NULL,
  event_start_at TIMESTAMPTZ,
  meeting_url TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'confirmed'
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON public.event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON public.event_registrations(event_id);

-- ----------------------------------------------------------------------------
-- 4. Contact Enquiries & Consultation Requests Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT,
  category TEXT DEFAULT 'general',
  message TEXT NOT NULL,
  consent_given BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'new',
  reply_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_email ON public.enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);

-- ----------------------------------------------------------------------------
-- 5. Daily Habit Checklist Logs Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.habit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  habits JSONB DEFAULT '{}'::jsonb,
  energy_level INT DEFAULT 4,
  daily_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_habit_logs_user_date ON public.habit_logs(user_id, date);

-- ----------------------------------------------------------------------------
-- 6. Payment & Fee Transactions Table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
  id TEXT PRIMARY KEY,
  transaction_reference TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  item_title TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  gateway_transaction_id TEXT,
  verified_by_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_tx_ref ON public.payments(transaction_reference);

-- ----------------------------------------------------------------------------
-- 7. Row Level Security (RLS) & Access Policies
-- ----------------------------------------------------------------------------
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Clean recreate policies to prevent duplicate policy errors if re-run
DROP POLICY IF EXISTS "Allow anon and auth all users" ON public.users;
CREATE POLICY "Allow anon and auth all users" ON public.users FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon and auth all enrollments" ON public.enrollments;
CREATE POLICY "Allow anon and auth all enrollments" ON public.enrollments FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon and auth all event_registrations" ON public.event_registrations;
CREATE POLICY "Allow anon and auth all event_registrations" ON public.event_registrations FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon and auth all enquiries" ON public.enquiries;
CREATE POLICY "Allow anon and auth all enquiries" ON public.enquiries FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon and auth all habit_logs" ON public.habit_logs;
CREATE POLICY "Allow anon and auth all habit_logs" ON public.habit_logs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon and auth all payments" ON public.payments;
CREATE POLICY "Allow anon and auth all payments" ON public.payments FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Grant privileges to anon and authenticated roles
GRANT ALL ON TABLE public.users TO anon, authenticated;
GRANT ALL ON TABLE public.enrollments TO anon, authenticated;
GRANT ALL ON TABLE public.event_registrations TO anon, authenticated;
GRANT ALL ON TABLE public.enquiries TO anon, authenticated;
GRANT ALL ON TABLE public.habit_logs TO anon, authenticated;
GRANT ALL ON TABLE public.payments TO anon, authenticated;

-- ============================================================================
-- VERIFICATION QUERIES (Optional - run these anytime to inspect your data)
-- ============================================================================
-- SELECT * FROM public.users ORDER BY created_at DESC;
-- SELECT * FROM public.enrollments ORDER BY enrolled_at DESC;
-- SELECT * FROM public.event_registrations ORDER BY registered_at DESC;
-- SELECT * FROM public.enquiries ORDER BY created_at DESC;
-- SELECT * FROM public.payments ORDER BY created_at DESC;
