import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Apple,
  Droplets,
  Footprints,
  Moon,
  Sun,
  Heart,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { store } from '../services/store';

export const Nutrition: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const articles = store.getArticles().filter(a => a.published);

  const categories = [
    { key: 'all', label: isBengali ? 'সকল বিষয়' : 'All Topics' },
    { key: 'nutrition', label: isBengali ? 'সুষম খাদ্য ও পুষ্টি' : 'Balanced Nutrition' },
    { key: 'movement', label: isBengali ? 'হাঁটা ও স্বাভাবিক চলন' : 'Gentle Movement' },
    { key: 'sleep', label: isBengali ? 'ঘুম ও বিশ্রাম' : 'Restorative Sleep' },
    { key: 'mindfulness', label: isBengali ? 'মাইন্ডফুলনেস' : 'Mindfulness' },
  ];

  const filteredArticles = articles.filter(
    a => selectedCategory === 'all' || a.category === selectedCategory
  );

  const principles = [
    {
      icon: <Apple className="w-6 h-6 text-emerald-800" />,
      title: t.nutrition.topics.balancedMeals,
      desc: isBengali
        ? 'থালায় অর্ধেক শাকসবজি, এক চতুর্থাংশ প্রোটিন এবং এক চতুর্থাংশ জটিল শর্করা রাখুন। কোনো চরম ডায়েট বা ক্ষুধা চেপে রাখার প্রয়োজন নেই।'
        : 'Aim for a 50% fiber, 25% protein, 25% whole carbohydrate plate. Abundance of colorful seasonal produce over guilt.',
    },
    {
      icon: <Droplets className="w-6 h-6 text-sky-800" />,
      title: t.nutrition.topics.hydration,
      desc: isBengali
        ? 'প্রতিদিন সকালে এক গ্লাস উষ্ণ পানি এবং সারা দিন পর্যাপ্ত বিশুদ্ধ পানি পান করুন যা হজম ও ত্বকের লাবণ্য রক্ষা করে।'
        : 'Begin mornings with warm water. Consistent cellular hydration supports cognitive focus, digestion, and natural lymph clearance.',
    },
    {
      icon: <Footprints className="w-6 h-6 text-amber-800" />,
      title: t.nutrition.topics.walking,
      desc: isBengali
        ? 'ভারী ব্যায়ামের চেয়ে নিয়মিত ২০-৩০ মিনিট সাধারণ গতিতে মুক্ত বাতাসে হাঁটা শরীরের স্ট্রেস হরমোন কমাতে সবচেয়ে বেশি কার্যকর।'
        : 'Steady-state natural walking lowers cortisol, balances post-prandial blood sugar, and protects joints for decades to come.',
    },
    {
      icon: <Moon className="w-6 h-6 text-indigo-800" />,
      title: t.nutrition.topics.sleep,
      desc: isBengali
        ? 'ঘুমানোর অন্তত এক ঘণ্টা আগে মোবাইল ও ডিজিটাল পর্দা থেকে দূরে থাকুন। শান্ত অন্ধকার ঘরে ৭-৮ ঘণ্টা শান্তির ঘুম নিশ্চিত করুন।'
        : 'A 60-minute digital curfew restores natural melatonin. Deep sleep is your nervous system’s cellular repair sanctuary.',
    },
    {
      icon: <Sun className="w-6 h-6 text-teal-800" />,
      title: t.nutrition.topics.mindfulness,
      desc: isBengali
        ? 'প্রতিদিন অন্তত ৫ মিনিট গভীর শ্বাস নিন বা নিরিবিলিতে বসুন। শান্ত মন শারীরিক হজম ও ইমিউনিটি বাড়ায়।'
        : 'Diaphragmatic breathing and quiet gratitude signal safety to your vagus nerve, supporting optimal metabolic digestion.',
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-800" />,
      title: t.nutrition.topics.fruitsVeg,
      desc: isBengali
        ? 'প্রতি সপ্তাহে অন্তত ২০-২৫ ধরণের বিভিন্ন শাকসবজি, ফলমূল ও মসলা গ্রহণ করুন যা অন্ত্রের ব্যাকটেরিয়ার ভারসাম্য রক্ষা করে।'
        : 'Aim for botanical plant diversity across your week. Colorful phytochemicals nurture a thriving gut microbiome.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-[#153D32] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.nutrition.badge}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6F0]">
            {t.nutrition.heading}
          </h1>
          <p className="text-base sm:text-lg text-[#A8BDA5] leading-relaxed">
            {t.nutrition.subheading}
          </p>
        </div>
      </section>

      {/* 2. Visual Principles of Gentle Living */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C6A66A] font-semibold">
            {isBengali ? 'সহজ ও কার্যকর ভিত্তি' : 'Foundational Wisdom'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153D32]">
            {isBengali ? 'সুস্থ জীবনযাত্রার ৬টি মূল নিয়ম' : 'The Six Rhythms of Gentle Living'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((pr, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F8F6F0] flex items-center justify-center border border-[#A8BDA5]/30">
                {pr.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#153D32]">{pr.title}</h3>
              <p className="text-xs sm:text-sm text-[#252A27]/80 leading-relaxed">{pr.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Articles & Educational Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#153D32] font-semibold bg-[#A8BDA5]/30 px-3 py-1 rounded-full">
              {isBengali ? 'জ্ঞান ও দিকনির্দেশনা' : 'Evidence-Informed Reading'}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#153D32] mt-2">
              {t.nutrition.articlesHeading}
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCategory(c.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === c.key
                    ? 'bg-[#153D32] text-white shadow-xs'
                    : 'bg-white text-[#252A27]/80 border border-[#A8BDA5]/40 hover:bg-[#F8F6F0]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((art) => {
            const title = isBengali ? (art.titleBn || art.title) : art.title;
            const summary = isBengali ? (art.summaryBn || art.summary) : art.summary;
            const readTime = isBengali ? (art.readTimeBn || art.readTime) : art.readTime;

            return (
              <div
                key={art.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#A8BDA5]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-black/10">
                    <img
                      src={art.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-[#153D32]/90 text-white backdrop-blur-xs capitalize">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#252A27]/60">
                      <span>{art.publishedDate}</span>
                      <span>{readTime}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#153D32] leading-snug group-hover:text-[#C6A66A] transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#252A27]/75 line-clamp-3 leading-relaxed">
                      {summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#A8BDA5]/20 mt-4 flex items-center justify-between text-xs">
                  <span className="text-[#252A27]/60">
                    {t.nutrition.author} <strong className="text-[#153D32]">{art.author}</strong>
                  </span>
                  <Link
                    to={`/nutrition/${art.id}`}
                    className="inline-flex items-center gap-1 font-semibold text-[#153D32] hover:underline"
                  >
                    <span>{t.nutrition.readMore}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
