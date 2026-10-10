import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { Language } from '../types';

export const MemberRegister: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    preferredLanguage: (isBengali ? 'bn' : 'en') as Language,
    interests: [] as string[],
  });

  const [loading, setLoading] = useState(false);

  const interestOptions = [
    { key: 'lifestyle', label: isBengali ? 'দৈনন্দিন অভ্যাস কোচিং' : 'Lifestyle & Habit Coaching' },
    { key: 'nutrition', label: isBengali ? 'সুষম পুষ্টি শিক্ষা' : 'Whole-Food Nutrition' },
    { key: 'morning', label: isBengali ? 'সকালের স্ট্রেচিং ও হাঁটা' : 'Morning Awakening Circles' },
    { key: 'evening', label: isBengali ? 'সন্ধ্যার রিল্যাক্সেশন ও ঘুম' : 'Evening Sleep Sanctuary' },
    { key: 'mindfulness', label: isBengali ? 'মাইন্ডফুলনেস ও মেডিটেশন' : 'Breathwork & Mindfulness' },
  ];

  const toggleInterest = (key: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(key)
        ? prev.interests.filter(i => i !== key)
        : [...prev.interests, key],
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.password.trim()) {
      showToast(isBengali ? 'দয়া করে নাম, ইমেইল এবং পাসওয়ার্ড পূরণ করুন।' : 'Please fill in your name, email, and password.', 'error');
      return;
    }

    if (form.password.length < 6) {
      showToast(isBengali ? 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters.', 'error');
      return;
    }

    setLoading(true);
    const res = await register({
      fullName: form.fullName,
      email: form.email,
      mobile: form.mobile,
      preferredLanguage: form.preferredLanguage,
      interests: form.interests,
      password: form.password,
    });
    setLoading(false);

    if (res.success) {
      showToast(isBengali ? 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! স্বাগতম।' : 'Account successfully created! Welcome to our sanctuary.', 'success');
      navigate('/member/dashboard');
    } else {
      showToast(res.error || t.common.error, 'error');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#A8BDA5]/40 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C6A66A] font-semibold">
            {t.nav.joinCommunity}
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#153D32]">
            {t.member.registerTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#252A27]/70">
            {t.member.registerSubtitle}
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">
              {t.member.fullName} *
            </label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">
                {t.member.email} *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">
                {t.member.mobile} *
              </label>
              <input
                type="tel"
                required
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                placeholder="+91..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">
                {t.member.password} *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min 6 characters"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">
                {t.member.preferredLang}
              </label>
              <select
                value={form.preferredLanguage}
                onChange={(e) => setForm({ ...form, preferredLanguage: e.target.value as Language })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>
          </div>

          {/* Wellness Interests */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-[#153D32] block">
              {t.member.interests}
            </label>
            <p className="text-[11px] text-[#252A27]/60">{t.member.interestsHelp}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {interestOptions.map((opt) => {
                const selected = form.interests.includes(opt.key);
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => toggleInterest(opt.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      selected
                        ? 'bg-[#153D32] text-white border-[#153D32]'
                        : 'bg-[#F8F6F0] text-[#252A27]/80 border-[#A8BDA5]/40 hover:bg-white'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-[#DFCA9B]" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? t.common.loading : t.member.registerBtn}
            </button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-[#A8BDA5]/20 text-xs text-[#252A27]/70">
          <span>{t.member.haveAccount} </span>
          <Link to="/member/login" className="font-semibold text-[#153D32] hover:underline">
            {t.member.loginBtn}
          </Link>
        </div>
      </div>
    </div>
  );
};
