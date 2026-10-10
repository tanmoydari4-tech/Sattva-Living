import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { store } from '../services/store';

export const PrivacyPolicy: React.FC = () => {
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
            <Shield className="w-6 h-6 text-[#C6A66A]" />
            <h1 className="font-serif text-3xl font-bold">
              {isBengali ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
            </h1>
          </div>
          <p className="text-xs text-[#252A27]/60 mt-1">Last Updated: October 2026</p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#252A27]/80 leading-relaxed font-sans">
          <p>
            At <strong>{brandName}</strong>, we honor and respect your privacy. This Privacy Policy outlines our transparent practices regarding data collection, storage, and member confidentiality.
          </p>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">1. Information We Collect</h3>
          <p>
            We collect personal details necessary to create your community account and deliver gentle lifestyle coaching:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full Name, Email Address, and Phone Number for account verification.</li>
            <li>Language preferences and general wellness interest categories.</li>
            <li>Daily habit checklist records (strictly private to your own account).</li>
            <li>Transaction reference data for paid wellness circles.</li>
          </ul>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">2. What We Strictly Never Collect</h3>
          <p>
            In accordance with our anti-clinical ethos and security principles:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do NOT collect Aadhaar numbers or government identification cards.</li>
            <li>We do NOT collect invasive medical records or clinical lab files.</li>
            <li>We never store plain-text passwords or full debit/credit card numbers on our servers.</li>
          </ul>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">3. Habit Data Isolation</h3>
          <p>
            Your recorded daily walks, mindfulness practices, and sleep logs are tied to your unique member ID and are strictly confidential. We do not sell or share personal habit telemetry to third-party advertisers.
          </p>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">4. Contact Care</h3>
          <p>
            If you have any questions or wish to request data erasure, reach out to our privacy coordinator at <strong>{settings.contactEmail}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
