import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { store, useStoreVersion } from '../services/store';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'cream';
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  className = '',
  showTagline = false,
}) => {
  useStoreVersion();
  const { isBengali } = useLanguage();
  const settings = store.getSettings();

  const brandName = isBengali ? (settings.brandNameBn || settings.brandName) : settings.brandName;
  const tagline = isBengali ? (settings.taglineBn || settings.tagline) : settings.tagline;

  const textColor = variant === 'light' ? 'text-white' : 'text-[#153D32]';
  const taglineColor = variant === 'light' ? 'text-[#A8BDA5]' : 'text-[#4B554F]';
  const iconRingColor = variant === 'light' ? 'border-[#A8BDA5]/40 text-[#DFCA9B]' : 'border-[#153D32]/20 text-[#153D32]';
  const leafColor = variant === 'light' ? '#C6A66A' : '#153D32';

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group transition-opacity ${className}`}>
      {/* Nature / Wellness Emblem SVG */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${iconRingColor} bg-[#F8F6F0]/20 shadow-xs`}
        title={brandName}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          {/* Subtle sun aura circle */}
          <circle cx="12" cy="12" r="9" stroke={leafColor} strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
          {/* Elegant botanical leaf sprout */}
          <path
            d="M12 21C12 21 11.5 14 15.5 10C19.5 6 19.5 3 19.5 3C19.5 3 16.5 3 12.5 7C8.5 11 12 21 12 21Z"
            fill={leafColor}
            fillOpacity="0.25"
            stroke={leafColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Gentle secondary bud leaf */}
          <path
            d="M12 14.5C10 13 8 11.5 7 9C6.3 7.3 6.8 5 6.8 5C6.8 5 9 5.5 10.5 7C12 8.5 12 11.5 12 14.5Z"
            fill={leafColor}
            fillOpacity="0.4"
            stroke={leafColor}
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight leading-none ${textColor}`}>
          {brandName}
        </span>
        {showTagline && (
          <span className={`text-[10px] sm:text-xs tracking-wider uppercase font-medium mt-1 ${taglineColor}`}>
            {tagline}
          </span>
        )}
      </div>
    </Link>
  );
};
