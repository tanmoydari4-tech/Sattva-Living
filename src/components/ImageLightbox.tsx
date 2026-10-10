import React, { useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { GalleryItem } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ImageLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ item, onClose }) => {
  const { isBengali } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  const title = isBengali ? (item.titleBn || item.title) : item.title;
  const caption = isBengali ? (item.captionBn || item.caption) : item.caption;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="max-w-4xl w-full bg-[#153D32] rounded-2xl overflow-hidden border border-[#A8BDA5]/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-16/10 sm:aspect-16/9 bg-black/40">
          <img
            src={item.imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 text-white bg-[#153D32]">
          <div className="flex items-center justify-between text-xs text-[#A8BDA5] mb-1">
            <span className="uppercase tracking-wider font-semibold capitalize">
              {item.category.replace('_', ' ')}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {item.date}
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-[#F8F6F0]/80 leading-relaxed">{caption}</p>
        </div>
      </div>
    </div>
  );
};
