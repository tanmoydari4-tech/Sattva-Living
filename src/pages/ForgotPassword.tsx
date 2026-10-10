import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from '../components/Toast';

export const ForgotPassword: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitted(true);
    showToast(isBengali ? 'পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে।' : 'Password recovery instructions sent to your email.', 'success');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#A8BDA5]/40 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-serif text-2xl font-bold text-[#153D32]">
            {t.member.resetPasswordTitle}
          </h1>
          <p className="text-xs text-[#252A27]/70 leading-relaxed">
            {t.member.resetPasswordDesc}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
            <p className="text-xs text-emerald-900 font-medium">
              {isBengali
                ? 'আমরা একটি নিরাপদ পাসওয়ার্ড রিকভারি লিংক পাঠিয়েছি। ইনবক্স অথবা স্প্যাম ফোল্ডার চেক করুন।'
                : 'If an account exists with this email, recovery instructions have been delivered.'}
            </p>
            <Link
              to="/member/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.member.backToLogin}</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">
                {t.member.email} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#252A27]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-md"
            >
              {t.member.sendResetLink}
            </button>

            <div className="text-center pt-2">
              <Link to="/member/login" className="text-xs text-[#153D32] hover:underline font-semibold inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                <span>{t.member.backToLogin}</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
