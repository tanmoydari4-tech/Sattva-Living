import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Sparkles, User, Shield } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export const MemberLogin: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const { login, quickLoginAsMember, quickLoginAsAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/member/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast(isBengali ? 'দয়া করে ইমেইল লিখুন।' : 'Please enter your email.', 'error');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      showToast(isBengali ? 'লগইন সফল হয়েছে! স্বাগতম।' : 'Signed in successfully. Welcome back.', 'success');
      navigate(from, { replace: true });
    } else {
      showToast(res.error || t.common.error, 'error');
    }
  };

  const handleQuickMember = () => {
    quickLoginAsMember();
    showToast(isBengali ? 'ডেমো মেম্বার হিসেবে লগইন করা হয়েছে।' : 'Signed in as Demo Member.', 'success');
    navigate('/member/dashboard', { replace: true });
  };

  const handleQuickAdmin = () => {
    quickLoginAsAdmin();
    showToast(isBengali ? 'অ্যাডমিন হিসেবে লগইন করা হয়েছে।' : 'Signed in as Chief Wellness Admin.', 'success');
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#A8BDA5]/40 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C6A66A] font-semibold">
            {t.nav.memberLogin}
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#153D32]">
            {t.member.loginTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#252A27]/70">
            {t.member.loginSubtitle}
          </p>
        </div>

        {/* Quick Demo Sign-in Helpers */}
        <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#A8BDA5]/30 space-y-2.5">
          <span className="text-[11px] font-semibold text-[#153D32] uppercase tracking-wider block text-center">
            {t.member.quickDemo}
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickMember}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-[#A8BDA5]/40 text-xs font-semibold text-[#153D32] hover:bg-[#153D32] hover:text-white transition-colors shadow-2xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.member.demoMember}</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-[#A8BDA5]/40 text-xs font-semibold text-[#153D32] hover:bg-[#153D32] hover:text-white transition-colors shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t.member.demoAdmin}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#153D32]">
                {t.member.password}
              </label>
              <Link to="/forgot-password" className="text-[11px] text-[#C6A66A] hover:underline font-medium">
                {t.member.forgotPassword}
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#252A27]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? t.common.loading : t.member.loginBtn}
            </button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-[#A8BDA5]/20 text-xs text-[#252A27]/70">
          <span>{t.member.noAccount} </span>
          <Link to="/member/register" className="font-semibold text-[#153D32] hover:underline">
            {t.member.registerBtn}
          </Link>
        </div>
      </div>
    </div>
  );
};
