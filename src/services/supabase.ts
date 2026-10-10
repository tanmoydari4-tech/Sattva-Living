import { createClient } from '@supabase/supabase-js';
import { User, Enrollment, EventRegistration, Enquiry, HabitLog, PaymentRecord } from '../types';

export const SUPABASE_PROJECT_ID = 'atmnwxgvnfsrinqrzvij';
export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'sb_publishable_15I7OtmTepRBdcB8mEUG8A_t_65x7Ls';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Test connectivity with Supabase project
 */
export async function testSupabaseConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    // Attempt a light ping or select from users
    const { error } = await supabase.from('users').select('uid').limit(1);
    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, it's still reachable
      if (error.message?.includes('relation "users" does not exist') || error.code === '42P01') {
        return {
          connected: true,
          message: 'Connected to Supabase project! (Tables need initial creation via SQL script).',
        };
      }
      return { connected: false, message: error.message };
    }
    return { connected: true, message: 'Successfully connected and synced with Supabase database.' };
  } catch (err: any) {
    return { connected: false, message: err?.message || 'Unable to connect to Supabase' };
  }
}

/**
 * Save / Sync User Information into Supabase
 */
export async function syncUserToSupabase(user: User): Promise<void> {
  try {
    const payload = {
      uid: user.uid,
      full_name: user.fullName,
      email: user.email.toLowerCase(),
      mobile: user.mobile,
      preferred_language: user.preferredLanguage,
      interests: user.interests,
      role: user.role,
      membership_status: user.membershipStatus,
      wellness_goals: user.wellnessGoals || null,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };

    const { error } = await supabase
      .from('users')
      .upsert(payload, { onConflict: 'uid' });

    if (error) {
      console.warn('Supabase User sync note:', error.message);
    } else {
      console.log('✅ User synchronized to Supabase:', user.email);
    }
  } catch (err) {
    console.warn('Supabase User sync caught exception:', err);
  }
}

/**
 * Save / Sync Booking & Program Enrollment into Supabase
 */
export async function syncEnrollmentToSupabase(enrollment: Enrollment): Promise<void> {
  try {
    const payload = {
      id: enrollment.id,
      user_id: enrollment.userId,
      user_email: enrollment.userEmail,
      user_name: enrollment.userName,
      program_id: enrollment.programId,
      program_title: enrollment.programTitle,
      status: enrollment.status,
      payment_id: enrollment.paymentId || null,
      amount_paid: enrollment.amountPaid,
      enrolled_at: enrollment.enrolledAt,
    };

    const { error } = await supabase
      .from('enrollments')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase Enrollment sync note:', error.message);
    } else {
      console.log('✅ Enrollment booking synchronized to Supabase:', enrollment.id);
    }
  } catch (err) {
    console.warn('Supabase Enrollment sync caught exception:', err);
  }
}

/**
 * Save / Sync Event / Appointment Registration into Supabase
 */
export async function syncEventRegistrationToSupabase(registration: EventRegistration): Promise<void> {
  try {
    const payload = {
      id: registration.id,
      user_id: registration.userId,
      user_name: registration.userName,
      user_email: registration.userEmail,
      event_id: registration.eventId,
      event_title: registration.eventTitle,
      event_start_at: registration.eventStartAt,
      meeting_url: registration.meetingUrl || null,
      registered_at: registration.registeredAt,
      status: registration.status,
    };

    const { error } = await supabase
      .from('event_registrations')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase Event Registration sync note:', error.message);
    } else {
      console.log('✅ Event Appointment synchronized to Supabase:', registration.id);
    }
  } catch (err) {
    console.warn('Supabase Event Registration sync caught exception:', err);
  }
}

/**
 * Save / Sync Contact Enquiry / Consultation Request into Supabase
 */
export async function syncEnquiryToSupabase(enquiry: Enquiry): Promise<void> {
  try {
    const payload = {
      id: enquiry.id,
      name: enquiry.name,
      email: enquiry.email,
      mobile: enquiry.mobile || null,
      category: enquiry.category,
      message: enquiry.message,
      consent_given: enquiry.consentGiven,
      status: enquiry.status,
      reply_notes: enquiry.replyNotes || null,
      created_at: enquiry.createdAt,
    };

    const { error } = await supabase
      .from('enquiries')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase Enquiry sync note:', error.message);
    } else {
      console.log('✅ Consultation enquiry synchronized to Supabase:', enquiry.id);
    }
  } catch (err) {
    console.warn('Supabase Enquiry sync caught exception:', err);
  }
}

/**
 * Save / Sync Habit Checklist Log into Supabase
 */
export async function syncHabitLogToSupabase(log: HabitLog): Promise<void> {
  try {
    const payload = {
      id: log.id,
      user_id: log.userId,
      date: log.date,
      habits: log.habits,
      energy_level: log.energyLevel,
      daily_note: log.dailyNote || null,
    };

    const { error } = await supabase
      .from('habit_logs')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase Habit Log sync note:', error.message);
    } else {
      console.log('✅ Habit log synchronized to Supabase for date:', log.date);
    }
  } catch (err) {
    console.warn('Supabase Habit Log sync caught exception:', err);
  }
}

/**
 * Save / Sync Payment Record into Supabase
 */
export async function syncPaymentToSupabase(payment: PaymentRecord): Promise<void> {
  try {
    const payload = {
      id: payment.id,
      transaction_reference: payment.transactionReference,
      user_id: payment.userId,
      user_name: payment.userName,
      user_email: payment.userEmail,
      item_type: payment.itemType,
      item_id: payment.itemId,
      item_title: payment.itemTitle,
      amount: payment.amount,
      currency: payment.currency,
      payment_method: payment.paymentMethod,
      status: payment.status,
      gateway_transaction_id: payment.gatewayTransactionId,
      verified_by_admin: payment.verifiedByAdmin ?? false,
      created_at: payment.createdAt,
    };

    const { error } = await supabase
      .from('payments')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase Payment sync note:', error.message);
    } else {
      console.log('✅ Payment transaction synchronized to Supabase:', payment.transactionReference);
    }
  } catch (err) {
    console.warn('Supabase Payment sync caught exception:', err);
  }
}

export const SUPABASE_FULL_SQL = `-- ============================================================================
-- SATTVA LIVING WELLNESS COMMUNITY - COMPLETE SUPABASE DATABASE SETUP
-- Project ID: atmnwxgvnfsrinqrzvij
-- URL: https://atmnwxgvnfsrinqrzvij.supabase.co
-- ============================================================================

-- 1. Users Table (Member & Admin Profiles, Logins & Contact Information)
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

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- 2. Program Booking / Enrollments Table (Lifestyle & Wellness Programs)
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

-- 3. Event Appointments / Session Registrations Table (Morning/Evening Sessions)
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

-- 4. Contact Enquiries & Consultation Requests Table
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

-- 5. Daily Habit Checklist Logs Table
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

-- 6. Payment & Fee Transactions Table
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

-- 7. Row Level Security (RLS) & Access Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

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

GRANT ALL ON TABLE public.users TO anon, authenticated;
GRANT ALL ON TABLE public.enrollments TO anon, authenticated;
GRANT ALL ON TABLE public.event_registrations TO anon, authenticated;
GRANT ALL ON TABLE public.enquiries TO anon, authenticated;
GRANT ALL ON TABLE public.habit_logs TO anon, authenticated;
GRANT ALL ON TABLE public.payments TO anon, authenticated;
`;

