import React, { useState } from 'react';
import { Save, ShieldCheck, Globe, Image, Phone, Mail, MapPin, Database, RefreshCw, CheckCircle2, AlertCircle, Copy, Code, ExternalLink } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { Modal } from '../../components/Modal';
import { store } from '../../services/store';
import { useToast } from '../../components/Toast';
import { WebsiteSettings } from '../../types';
import {
  testSupabaseConnection,
  syncUserToSupabase,
  syncEnrollmentToSupabase,
  syncEventRegistrationToSupabase,
  syncEnquiryToSupabase,
  syncPaymentToSupabase,
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_FULL_SQL,
} from '../../services/supabase';

export const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const currentSettings = store.getSettings();
  const [form, setForm] = useState<WebsiteSettings>({ ...currentSettings });
  const [testingDb, setTestingDb] = useState(false);
  const [dbStatus, setDbStatus] = useState<{ tested: boolean; connected: boolean; message: string }>({
    tested: false,
    connected: false,
    message: '',
  });
  const [syncingAll, setSyncingAll] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);

  const [saving, setSaving] = useState(false);

  const handleTestSupabase = async () => {
    setTestingDb(true);
    const result = await testSupabaseConnection();
    setTestingDb(false);
    setDbStatus({ tested: true, connected: result.connected, message: result.message });
    if (result.connected) {
      showToast('Connected to Supabase project successfully!', 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleSyncAllToSupabase = async () => {
    setSyncingAll(true);
    try {
      const users = store.getUsers();
      const enrollments = store.getEnrollments();
      const eventRegs = store.getEventRegistrations();
      const enquiries = store.getEnquiries();
      const payments = store.getPayments();

      for (const u of users) await syncUserToSupabase(u);
      for (const enr of enrollments) await syncEnrollmentToSupabase(enr);
      for (const reg of eventRegs) await syncEventRegistrationToSupabase(reg);
      for (const enq of enquiries) await syncEnquiryToSupabase(enq);
      for (const pay of payments) await syncPaymentToSupabase(pay);

      // Also push all site content (settings, programs, events, articles, etc.) to cloud
      await store.syncAllToCloud();

      showToast(`Successfully synchronized all website settings, ${users.length} users, ${enrollments.length} bookings, and programs to Supabase!`, 'success');
    } catch (err: any) {
      showToast('Error during Supabase synchronization: ' + err.message, 'error');
    } finally {
      setSyncingAll(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    store.updateSettings(form);
    await store.syncAllToCloud();
    setSaving(false);
    showToast('Website settings saved and published live to public website across all devices.', 'success');
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSave} className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#153D32]">Website & Brand Settings</h1>
            <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
              Customize brand name, logo copy, bilingual text, contact info, and payment modes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSyncAllToSupabase}
              disabled={syncingAll}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#153D32]/40 text-[#153D32] text-xs font-semibold hover:bg-[#F8F6F0] transition-colors shadow-2xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingAll ? 'animate-spin' : ''}`} />
              <span>{syncingAll ? 'Syncing...' : 'Push Everything to Cloud'}</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-sm disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Publishing...' : 'Save All Settings'}</span>
            </button>
          </div>
        </div>

        {/* 1. Brand Identity */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#153D32] border-b border-[#A8BDA5]/20 pb-3">
            Brand Identity & Taglines
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Brand Name (English)</label>
              <input
                type="text"
                required
                value={form.brandName}
                onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Brand Name (বাংলা)</label>
              <input
                type="text"
                value={form.brandNameBn}
                onChange={(e) => setForm({ ...form, brandNameBn: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Tagline (English)</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Tagline (বাংলা)</label>
              <input
                type="text"
                value={form.taglineBn}
                onChange={(e) => setForm({ ...form, taglineBn: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Philosophy Statement (English)</label>
              <textarea
                rows={2}
                value={form.philosophy}
                onChange={(e) => setForm({ ...form, philosophy: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Philosophy Statement (বাংলা)</label>
              <textarea
                rows={2}
                value={form.philosophyBn}
                onChange={(e) => setForm({ ...form, philosophyBn: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>
        </div>

        {/* 2. Homepage Hero Config */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#153D32] border-b border-[#A8BDA5]/20 pb-3">
            Homepage Hero Configuration
          </h3>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Hero Background Image URL</label>
            <input
              type="url"
              value={form.heroBgUrl}
              onChange={(e) => setForm({ ...form, heroBgUrl: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Hero Main Heading (English)</label>
              <input
                type="text"
                value={form.heroTitle}
                onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Hero Main Heading (বাংলা)</label>
              <input
                type="text"
                value={form.heroTitleBn}
                onChange={(e) => setForm({ ...form, heroTitleBn: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Hero Subtitle (English)</label>
              <textarea
                rows={2}
                value={form.heroSubtitle}
                onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Hero Subtitle (বাংলা)</label>
              <textarea
                rows={2}
                value={form.heroSubtitleBn}
                onChange={(e) => setForm({ ...form, heroSubtitleBn: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>
        </div>

        {/* 3. Contact & WhatsApp Coordinates */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#153D32] border-b border-[#A8BDA5]/20 pb-3">
            Communication & Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Contact Email</label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Contact Phone</label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">WhatsApp Number (with country code)</label>
              <input
                type="text"
                value={form.whatsAppNumber}
                onChange={(e) => setForm({ ...form, whatsAppNumber: e.target.value })}
                placeholder="919830012345"
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Sanctuary Address (English)</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Sanctuary Address (বাংলা)</label>
              <input
                type="text"
                value={form.addressBn}
                onChange={(e) => setForm({ ...form, addressBn: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>
        </div>

        {/* 4. Payment Gateway Settings */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#153D32] border-b border-[#A8BDA5]/20 pb-3">
            Payment Gateway & Razorpay Infrastructure
          </h3>

          <div className="flex items-center gap-3 p-4 bg-[#F8F6F0] rounded-2xl border border-[#A8BDA5]/30">
            <input
              type="checkbox"
              id="testPay"
              checked={form.testPaymentModeEnabled}
              onChange={(e) => setForm({ ...form, testPaymentModeEnabled: e.target.checked })}
              className="rounded-sm text-[#153D32]"
            />
            <label htmlFor="testPay" className="text-xs font-semibold text-[#153D32] cursor-pointer">
              Enable Safe Test Payment Mode (Simulates instant approval & official receipt generation for prototyping)
            </label>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Razorpay Key ID</label>
            <input
              type="text"
              value={form.razorpayKeyId}
              onChange={(e) => setForm({ ...form, razorpayKeyId: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            />
          </div>
        </div>

        {/* 5. Supabase Database Storage & Sync Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#A8BDA5]/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#153D32] text-[#DFCA9B] flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#153D32]">
                  Supabase Cloud Database Connection
                </h3>
                <p className="text-xs text-[#252A27]/60">
                  Real-time cloud synchronization for bookings, appointment registrations, and member accounts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTestSupabase}
                disabled={testingDb}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#153D32] text-[#153D32] text-xs font-semibold hover:bg-[#153D32] hover:text-white transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingDb ? 'animate-spin' : ''}`} />
                <span>{testingDb ? 'Testing...' : 'Test Connection'}</span>
              </button>
              <button
                type="button"
                onClick={handleSyncAllToSupabase}
                disabled={syncingAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-xs"
              >
                <Database className="w-3.5 h-3.5 text-[#DFCA9B]" />
                <span>{syncingAll ? 'Syncing...' : 'Sync All Records'}</span>
              </button>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#A8BDA5]/30 space-y-1">
              <span className="text-[#252A27]/60 block font-semibold">Supabase Project ID</span>
              <p className="font-mono font-bold text-[#153D32] text-sm">{SUPABASE_PROJECT_ID}</p>
            </div>
            <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#A8BDA5]/30 space-y-1">
              <span className="text-[#252A27]/60 block font-semibold">Supabase API Endpoint</span>
              <p className="font-mono text-[#153D32] truncate">{SUPABASE_URL}</p>
            </div>
          </div>

          {/* Live Status indicator */}
          {dbStatus.tested && (
            <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
              dbStatus.connected ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-red-50 border-red-300 text-red-950'
            }`}>
              {dbStatus.connected ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <span className="font-bold">{dbStatus.connected ? 'Connection Verified' : 'Connection Note'}</span>
                <p className="leading-relaxed">{dbStatus.message}</p>
              </div>
            </div>
          )}

          {/* Tables Sync Status Info */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold">Automatic Real-Time Sync Active for:</span>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
              <li className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>website_settings</strong> (Public Copy)</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>programs</strong> (Offerings)</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>events & articles</strong> (Public)</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>users</strong> (Sign-ups & Logins)</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>enrollments</strong> (Bookings)</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>event_registrations</strong> (Sessions)</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>enquiries</strong> (Consultations)</span>
              </li>
              <li className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span><strong>payments & habits</strong></span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs border-t border-[#A8BDA5]/20">
            <span className="text-[11px] text-[#252A27]/60">Schema script available in project root: <code>/supabase_schema.sql</code></span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSqlModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#A8BDA5]/60 text-[#153D32] hover:bg-[#F8F6F0] font-medium text-xs transition-colors"
              >
                <Code className="w-3.5 h-3.5" />
                <span>View SQL Query</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(SUPABASE_FULL_SQL);
                  showToast('Full Supabase SQL schema copied to clipboard! Paste it into your Supabase SQL Editor.', 'success');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#153D32] text-white hover:bg-[#0E2922] font-medium text-xs transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Complete SQL Script</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* SQL Script Viewer Modal */}
      <Modal
        isOpen={showSqlModal}
        onClose={() => setShowSqlModal(false)}
        title="Supabase Database SQL Setup Query"
        maxWidth="2xl"
      >
        <div className="space-y-4 text-xs">
          <p className="text-[#252A27]/70 leading-relaxed">
            Copy and run this SQL script in your{' '}
            <a
              href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
              target="_blank"
              rel="noreferrer"
              className="text-[#153D32] font-semibold underline inline-flex items-center gap-0.5"
            >
              Supabase SQL Editor <ExternalLink className="w-3 h-3" />
            </a>{' '}
            to initialize all tables, indexes, and security policies for bookings, appointments, and member logins.
          </p>

          <div className="relative">
            <pre className="bg-[#153D32] text-[#F8F6F0] p-4 rounded-2xl overflow-x-auto text-[11px] font-mono leading-relaxed max-h-[360px] select-all">
              {SUPABASE_FULL_SQL}
            </pre>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(SUPABASE_FULL_SQL);
                showToast('SQL script copied to clipboard!', 'success');
              }}
              className="absolute top-3 right-3 px-3 py-1.5 bg-[#DFCA9B] hover:bg-[#C6A66A] text-[#153D32] font-semibold text-[11px] rounded-lg shadow-sm flex items-center gap-1 transition-colors"
            >
              <Copy className="w-3 h-3" />
              <span>Copy SQL</span>
            </button>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#A8BDA5]/20">
            <button
              type="button"
              onClick={() => setShowSqlModal(false)}
              className="px-4 py-2 rounded-xl border border-[#A8BDA5]/50 text-[#252A27] text-xs font-medium hover:bg-[#F8F6F0]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(SUPABASE_FULL_SQL);
                showToast('SQL script copied! Now paste into Supabase SQL Editor.', 'success');
                setShowSqlModal(false);
              }}
              className="px-5 py-2 rounded-xl bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922]"
            >
              Copy & Close
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};
