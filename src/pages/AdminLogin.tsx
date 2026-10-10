import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export const AdminLogin: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const { login, quickLoginAsAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('tanmoydari4@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      showToast(isBengali ? 'অ্যাডমিন প্যানেলে স্বাগতম!' : 'Welcome to the Wellness Administration Suite.', 'success');
      navigate('/admin');
    } else {
      showToast(res.error || t.common.error, 'error');
    }
  };

  const handleQuickDemoAdmin = () => {
    quickLoginAsAdmin();
    showToast(isBengali ? 'অ্যাডমিন হিসেবে দ্রুত লগইন করা হয়েছে।' : 'Logged in as Chief Wellness Admin.', 'success');
    navigate('/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#F1ECE0]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#A8BDA5]/40 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#153D32] text-[#DFCA9B] flex items-center justify-center mx-auto shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#153D32]">
            {t.admin.loginTitle}
          </h1>
          <p className="text-xs text-[#252A27]/70">
            {t.admin.loginSubtitle}
          </p>
        </div>

        {/* Quick Demo Admin Button */}
        <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#A8BDA5]/30 text-center space-y-2">
          <span className="text-[11px] font-semibold text-[#153D32] uppercase tracking-wider block">
            Instant Demo Administrator Access
          </span>
          <button
            type="button"
            onClick={handleQuickDemoAdmin}
            className="w-full py-2.5 px-4 rounded-xl bg-[#153D32] text-[#DFCA9B] text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-xs"
          >
            One-Click Sign In as Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">
              Admin Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#252A27]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#252A27]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? t.common.loading : 'Enter Administration Suite'}
            </button>
          </div>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-[#153D32] hover:underline font-semibold inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
