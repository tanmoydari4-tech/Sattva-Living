import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { store } from '../services/store';

export const RefundPolicy: React.FC = () => {
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
            <RefreshCw className="w-6 h-6 text-[#C6A66A]" />
            <h1 className="font-serif text-3xl font-bold">
              {isBengali ? 'বাতিলকরণ ও রিফান্ড নীতি' : 'Cancellation & Refund Policy'}
            </h1>
          </div>
          <p className="text-xs text-[#252A27]/60 mt-1">Effective: October 2026</p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#252A27]/80 leading-relaxed font-sans">
          <p>
            At <strong>{brandName}</strong>, we strive to make your wellness experience pleasant and transparent.
          </p>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">1. Wellness Circles & Coaching Programs</h3>
          <p>
            Members who enroll in any paid structured program (such as Lifestyle Coaching or Nutrition Education) may request a 100% full refund within <strong>7 days</strong> of their initial enrollment if they feel the curriculum does not align with their daily lifestyle.
          </p>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">2. Single Online Masterclasses & Workshops</h3>
          <p>
            Registrations for individual live webinars or masterclasses may be cancelled up to 24 hours prior to the session start time for a full credit or refund.
          </p>

          <h3 className="font-serif text-base font-bold text-[#153D32] pt-2">3. Refund Processing</h3>
          <p>
            Approved refunds are credited to the original payment source (Razorpay, UPI, or card) within 5 to 7 business days. For support, please contact <strong>{settings.contactEmail}</strong> with your transaction reference number.
          </p>
        </div>
      </div>
    </div>
  );
};
