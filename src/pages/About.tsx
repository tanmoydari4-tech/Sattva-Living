import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Heart, Compass, Sparkles, Sun, Moon, Users, Shield } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { store } from '../services/store';

export const About: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const settings = store.getSettings();

  const brandName = isBengali ? (settings.brandNameBn || settings.brandName) : settings.brandName;

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-[#153D32] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.nav.about}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6F0]">
            {t.about.heading}
          </h1>
          <p className="text-base sm:text-lg text-[#A8BDA5] leading-relaxed">
            {t.about.subheading}
          </p>
        </div>
      </section>

      {/* 2. Core Philosophy & Welcome */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153D32] leading-snug">
              {isBengali ? 'কেন আমরা কঠোর শরীরচর্চা ও জিমের পক্ষপাতী নই?' : 'Why We Step Away from Modern Gym Culture'}
            </h2>
            <p className="text-sm sm:text-base text-[#252A27]/80 leading-relaxed">
              {t.about.p1}
            </p>
            <p className="text-sm sm:text-base text-[#252A27]/80 leading-relaxed">
              {t.about.p2}
            </p>
            <div className="p-6 bg-white rounded-2xl border border-[#A8BDA5]/40 shadow-2xs space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#C6A66A] font-semibold">
                {t.about.philosophyTitle}
              </span>
              <p className="font-serif text-lg text-[#153D32] font-semibold">
                {t.about.philosophyDesc}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
                alt="Peaceful mindfulness and gentle walking in nature"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#153D32] text-[#DFCA9B] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#153D32]">
              {t.about.missionTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#252A27]/80 leading-relaxed">
              {t.about.missionDesc}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C6A66A] text-[#153D32] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#153D32]">
              {t.about.visionTitle}
            </h3>
            <p className="text-sm sm:text-base text-[#252A27]/80 leading-relaxed">
              {t.about.visionDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Four-Pillar Approach */}
      <section className="bg-[#153D32] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold">
              {isBengali ? 'সুস্থতার সামগ্রিক কাঠামো' : 'Holistic Foundation'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              {t.about.approachTitle}
            </h2>
            <p className="text-sm text-[#A8BDA5]">
              {isBengali
                ? 'শারীরিক, মানসিক ও পুষ্টির মেলবন্ধনে তৈরি আমাদের ৪টি মৌলিক স্তম্ভ।'
                : 'Balanced living relies on interdependent rhythms that nurture mind, digestion, movement, and community.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.pillars.map((pillar, idx) => {
              const icons = [
                <Sun className="w-6 h-6 text-[#DFCA9B]" key={1} />,
                <Heart className="w-6 h-6 text-[#DFCA9B]" key={2} />,
                <Moon className="w-6 h-6 text-[#DFCA9B]" key={3} />,
                <Users className="w-6 h-6 text-[#DFCA9B]" key={4} />,
              ];

              return (
                <div
                  key={idx}
                  className="bg-[#0E2922] p-6 rounded-2xl border border-[#A8BDA5]/20 space-y-4 hover:border-[#DFCA9B]/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">{pillar.title}</h4>
                  <p className="text-xs sm:text-sm text-[#A8BDA5] leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-8">
          <div className="max-w-xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C6A66A] font-semibold">
              {isBengali ? 'সততা ও সেবা' : 'Integrity & Compassion'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153D32]">
              {t.about.whyChooseUs}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.about.whyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#F8F6F0] border border-[#A8BDA5]/20">
                <CheckCircle2 className="w-5 h-5 text-[#153D32] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm font-medium text-[#252A27]/85 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#A8BDA5]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#252A27]/70 italic">
              {isBengali
                ? `© ${brandName} — প্রতিটি মানুষের ভেতর শান্ত ও সুস্থ থাকার সম্ভাবনা রয়েছে।`
                : `© ${brandName} — Dedicated to mindful daily living without judgment.`}
            </span>
            <Link
              to="/programs"
              className="px-6 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
