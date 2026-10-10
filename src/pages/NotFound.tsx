import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const NotFound: React.FC = () => {
  const { isBengali } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-3xl border border-[#A8BDA5]/40 shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#F8F6F0] text-[#153D32] flex items-center justify-center mx-auto border border-[#A8BDA5]/30">
          <Compass className="w-8 h-8 text-[#C6A66A]" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C6A66A] font-bold">
            404 • Page Not Found
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#153D32]">
            {isBengali ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Lost in Tranquility?'}
          </h1>
          <p className="text-xs sm:text-sm text-[#252A27]/70 leading-relaxed">
            {isBengali
              ? 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা বিদ্যমান নেই।'
              : 'The path you requested seems to have gently wandered away. Let us guide you back to our peaceful sanctuary.'}
          </p>
        </div>

        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBengali ? 'হোমপেজে ফিরে যান' : 'Return to Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
