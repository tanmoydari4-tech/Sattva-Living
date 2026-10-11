import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Clock, Users, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { store, useStoreVersion } from '../services/store';
import { ProgramCategory } from '../types';

export const Programs: React.FC = () => {
  useStoreVersion();
  const { t, isBengali } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = (searchParams.get('category') || 'all') as string;
  const [searchTerm, setSearchTerm] = useState('');

  const programs = store.getPrograms().filter(p => p.published);

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: t.programs.allCategories },
    { key: 'lifestyle', label: t.programs.categories.lifestyle },
    { key: 'nutrition', label: t.programs.categories.nutrition },
    { key: 'morning', label: t.programs.categories.morning },
    { key: 'evening', label: t.programs.categories.evening },
    { key: 'consultation', label: t.programs.categories.consultation },
    { key: 'community', label: t.programs.categories.community },
  ];

  const handleCategoryChange = (cat: string) => {
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const title = isBengali ? (p.titleBn || p.title) : p.title;
      const desc = isBengali ? (p.shortDescriptionBn || p.shortDescription) : p.shortDescription;
      const matchesSearch =
        searchTerm === '' ||
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [programs, selectedCategory, searchTerm, isBengali]);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-[#153D32] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.programs.badge}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6F0]">
            {t.programs.heading}
          </h1>
          <p className="text-base sm:text-lg text-[#A8BDA5] leading-relaxed">
            {t.programs.subheading}
          </p>
        </div>
      </section>

      {/* 2. Controls: Search & Category Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategoryChange(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-[#153D32] text-white shadow-xs'
                    : 'bg-white text-[#252A27]/80 border border-[#A8BDA5]/40 hover:bg-[#F8F6F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#252A27]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.common.search}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#A8BDA5]/40 text-xs text-[#252A27] focus:outline-hidden focus:border-[#153D32]"
            />
          </div>
        </div>

        {/* 3. Programs Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#A8BDA5]/30 p-8 space-y-3">
            <p className="text-base font-serif text-[#153D32] font-semibold">
              {isBengali ? 'কোনো প্রোগ্রাম খুঁজে পাওয়া যায়নি' : 'No wellness programs found'}
            </p>
            <p className="text-xs text-[#252A27]/60">
              {isBengali ? 'অন্য কোনো ক্যাটাগরি বা শব্দ দিয়ে চেষ্টা করুন।' : 'Try resetting your search query or selecting a different category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((prog) => {
              const title = isBengali ? (prog.titleBn || prog.title) : prog.title;
              const desc = isBengali ? (prog.shortDescriptionBn || prog.shortDescription) : prog.shortDescription;
              const audience = isBengali ? (prog.suitableAudienceBn || prog.suitableAudience) : prog.suitableAudience;
              const duration = isBengali ? (prog.durationBn || prog.duration) : prog.duration;
              const features = isBengali ? (prog.featuresBn || prog.features) : prog.features;

              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#A8BDA5]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-16/10 overflow-hidden bg-black/10">
                      <img
                        src={prog.imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-[#153D32]/90 text-white backdrop-blur-xs">
                          {t.programs.categories[prog.category]}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#153D32] group-hover:text-[#C6A66A] transition-colors leading-snug">
                          {title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#252A27]/75 line-clamp-3 mt-2 leading-relaxed">
                          {desc}
                        </p>
                      </div>

                      {/* Key features bullets */}
                      <div className="space-y-1.5 pt-2 border-t border-[#A8BDA5]/20">
                        {features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#252A27]/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#153D32] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="space-y-1.5 pt-2 border-t border-[#A8BDA5]/20 text-xs text-[#252A27]/70">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#153D32] shrink-0" />
                          <span className="truncate"><strong>{t.programs.duration}:</strong> {duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-[#153D32] shrink-0" />
                          <span className="truncate"><strong>{t.programs.audience}:</strong> {audience}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="p-6 pt-0 border-t border-[#A8BDA5]/20 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#252A27]/60 uppercase tracking-wider block">
                        {t.programs.price}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#153D32]">
                        {prog.price > 0 ? `₹${prog.price.toLocaleString('en-IN')}` : t.programs.freeOrContact}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/programs/${prog.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#153D32] text-white hover:bg-[#0E2922] transition-colors shadow-xs"
                      >
                        <span>{t.programs.viewDetails}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
