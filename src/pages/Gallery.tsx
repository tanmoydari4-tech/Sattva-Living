import React, { useState } from 'react';
import { Camera, Calendar, Maximize2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { store, useStoreVersion } from '../services/store';
import { GalleryItem } from '../types';
import { ImageLightbox } from '../components/ImageLightbox';

export const Gallery: React.FC = () => {
  useStoreVersion();
  const { isBengali } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const galleryItems = store.getGallery();

  const categories = [
    { key: 'all', label: isBengali ? 'সকল ছবি' : 'All Moments' },
    { key: 'nature_walks', label: isBengali ? 'প্রাকৃতিক হাঁটা' : 'Nature Walks' },
    { key: 'cooking', label: isBengali ? 'সুষম পুষ্টিকর রান্না' : 'Whole-Food Cooking' },
    { key: 'morning_routines', label: isBengali ? 'সকালের স্ট্রেচিং' : 'Gentle Movement' },
    { key: 'community', label: isBengali ? 'কমিউনিটি আড্ডা' : 'Community Circles' },
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-[#153D32] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {isBengali ? 'দৃশ্যপট ও মুহূর্ত' : 'Visual Sanctuary'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6F0]">
            {isBengali ? 'আমাদের সুস্থ জীবনযাত্রার গ্যালারি' : 'Living Well in Harmony'}
          </h1>
          <p className="text-base sm:text-lg text-[#A8BDA5] leading-relaxed">
            {isBengali
              ? 'প্রকৃতির মাঝে মুক্ত বাতাসে হাঁটা, সুষম ভেষজ রান্না ও শান্ত মননশীল মুহূর্তের কিছু দৃশ্যপট।'
              : 'Glimpses of peaceful morning walks, seasonal culinary exploration, and community reflection.'}
          </p>
        </div>
      </section>

      {/* 2. Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-[#153D32] text-white shadow-xs'
                  : 'bg-white text-[#252A27]/80 border border-[#A8BDA5]/40 hover:bg-[#F8F6F0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const title = isBengali ? (item.titleBn || item.title) : item.title;
            const caption = isBengali ? (item.captionBn || item.caption) : item.caption;

            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#A8BDA5]/30 shadow-xs hover:shadow-xl transition-all cursor-pointer aspect-4/3"
              >
                <img
                  src={item.imageUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#153D32]/95 via-[#153D32]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center justify-between text-xs text-[#DFCA9B] mb-1">
                    <span className="capitalize font-medium">{item.category.replace('_', ' ')}</span>
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-lg font-bold">{title}</h4>
                  <p className="text-xs text-[#F8F6F0]/80 line-clamp-2 mt-1">{caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      <ImageLightbox item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
};
