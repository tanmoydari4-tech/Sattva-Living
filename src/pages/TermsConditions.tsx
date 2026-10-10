import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { store } from '../services/store';

export const TermsConditions: React.FC = () => {
  const { isBengali } = useLanguage();
  const settings = store.getSettings();
  const brandName = isBengali ? (settings.brandNameBn || settings.brandName) : settings.brandName;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#153D32] hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return Home</span>
      </Link>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-6">
        <div className="border-b border-[#A8BDA5]/20 pb-4">
          <div className="flex items-center gap-2 text-[#153D32]">
            <FileText className="w-6 h-6 text-[#C6A66A]" />
            <h1 className="font-serif text-3xl font-bold">
              {isBengali ? 'ব্যবহারের নিয়মাবলী (Terms & Conditions)' : 'Terms & Conditions'}
            </h1>
          </div>
          <p className="text-xs text-[#252A27]/60 mt-1">Effective Date: October 2026</p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#252A27]/80 leading-relaxed font-sans">
          <p>
            Welcome to <strong>{brandName}</strong>. By accessing our platform, joining online circles, or registering as a member, you agree to these Terms and Conditions.
          </p>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">1. Educational & Non-Medical Scope</h3>
          <p>
            All content, routines, suggestions, morning stretches, and nutrition education provided across {brandName} are intended solely for general informational and healthy lifestyle enrichment purposes. We are not a medical facility, clinic, or physical therapy clinic. Nothing on our platform constitutes medical diagnosis, treatment, or clinical intervention. Always consult a qualified medical physician before initiating major dietary or physical shifts.
          </p>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">2. Respectful Community Culture</h3>
          <p>
            Our community thrives on psychological safety and kindness. We do not tolerate body shaming, bullying, harassment, hate speech, or unsolicited commercial promotion in member forums or live sessions.
          </p>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">3. Intellectual Property</h3>
          <p>
            All curriculum materials, articles, and guided meditations produced by {brandName} remain our intellectual property and are for personal, non-commercial member use only.
          </p>
        </div>
      </div>
    </div>
  );
};
