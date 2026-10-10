import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Globe, Heart, Save } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { Language } from '../types';

export const MemberProfile: React.FC = () => {
  const { t, isBengali, setLanguage } = useLanguage();
  const { currentUser, updateProfile } = useAuth();
  const { showToast } = useToast();

  if (!currentUser) return null;

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [mobile, setMobile] = useState(currentUser.mobile);
  const [wellnessGoals, setWellnessGoals] = useState(currentUser.wellnessGoals || '');
  const [preferredLang, setPreferredLang] = useState<Language>(currentUser.preferredLanguage);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      wellnessGoals: wellnessGoals.trim(),
      preferredLanguage: preferredLang,
    });
    setLanguage(preferredLang);
    showToast(isBengali ? 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে।' : 'Profile updated successfully.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          to="/member/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#153D32] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBengali ? 'ড্যাশবোর্ডে ফিরে যান' : 'Back to Dashboard'}</span>
        </Link>
        <span className="text-xs uppercase tracking-wider font-semibold text-[#C6A66A]">
          {isBengali ? 'সদস্য সেটিংস' : 'Member Profile'}
        </span>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#A8BDA5]/40 shadow-xl space-y-6">
        <div className="flex items-center gap-4 border-b border-[#A8BDA5]/20 pb-6">
          <div className="w-16 h-16 rounded-full bg-[#153D32] text-[#DFCA9B] flex items-center justify-center font-bold text-2xl font-serif">
            {currentUser.fullName.charAt(0)}
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#153D32]">{currentUser.fullName}</h2>
            <p className="text-xs text-[#252A27]/60 mt-0.5">{currentUser.email}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              {currentUser.role} • {currentUser.membershipStatus}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">
                {t.member.fullName}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">
                {t.member.email} ({isBengali ? 'অপরিবর্তনীয়' : 'Read Only'})
              </label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/30 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">
                {t.member.mobile}
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">
                {t.member.preferredLang}
              </label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value as Language)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">
              {isBengali ? 'আমার ব্যক্তিগত ওয়েলনেস লক্ষ্য' : 'Personal Wellness Goals'}
            </label>
            <textarea
              rows={3}
              value={wellnessGoals}
              onChange={(e) => setWellnessGoals(e.target.value)}
              placeholder={isBengali ? 'যেমন: প্রতিদিন ৩০ মিনিট হাঁটা এবং শান্ত ঘুম...' : 'e.g., Maintain 30-min morning walking streak and better sleep...'}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{t.common.save}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
