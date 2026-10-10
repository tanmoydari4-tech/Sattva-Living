import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Heart, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../i18n/LanguageContext';
import { store } from '../services/store';

export const Footer: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const settings = store.getSettings();

  const brandName = isBengali ? (settings.brandNameBn || settings.brandName) : settings.brandName;
  const philosophy = isBengali ? (settings.philosophyBn || settings.philosophy) : settings.philosophy;
  const address = isBengali ? (settings.addressBn || settings.address) : settings.address;

  return (
    <footer className="bg-[#153D32] text-[#F8F6F0] pt-16 pb-12 border-t border-[#1E5042]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#A8BDA5]/20">
          {/* Brand Info (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" showTagline={true} />
            <p className="text-sm text-[#A8BDA5] leading-relaxed max-w-sm pt-2">
              {philosophy}
            </p>
            <p className="text-xs text-[#A8BDA5]/80 italic">
              {isBengali
                ? 'একটি শান্ত, সহমর্মী এবং অহিংস সুস্থ জীবনধারা আন্দোলন—কোনো চরম নিয়ম বা কৃত্রিম জিম সংস্কৃতি ছাড়াই।'
                : 'A gentle, compassionate wellness community dedicated to daily habits, natural movement, and peace of mind.'}
            </p>

            {/* WhatsApp Direct Connect */}
            {settings.whatsAppNumber && (
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsAppNumber}?text=Hello%20${encodeURIComponent(brandName)},%20I%20would%20like%20to%20know%20more%20about%20your%20wellness%20community`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A8BDA5]/20 hover:bg-[#A8BDA5]/30 text-white text-xs font-medium border border-[#A8BDA5]/30 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{isBengali ? 'হোয়াটসঅ্যাপে যোগাযোগ করুন' : 'Chat on WhatsApp'}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A8BDA5]" />
                </a>
              </div>
            )}
          </div>

          {/* Quick Links (Cols 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#DFCA9B] font-serif">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm text-[#F8F6F0]/80">
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white hover:underline transition-colors">
                  {t.nav.programs}
                </Link>
              </li>
              <li>
                <Link to="/nutrition" className="hover:text-white hover:underline transition-colors">
                  {t.nav.nutrition}
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white hover:underline transition-colors">
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-white hover:underline transition-colors">
                  {t.nav.community}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white hover:underline transition-colors">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Program Categories (Cols 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#DFCA9B] font-serif">
              {t.footer.programsLinks}
            </h4>
            <ul className="space-y-2 text-sm text-[#F8F6F0]/80">
              <li>
                <Link to="/programs?category=lifestyle" className="hover:text-white transition-colors">
                  {t.programs.categories.lifestyle}
                </Link>
              </li>
              <li>
                <Link to="/programs?category=nutrition" className="hover:text-white transition-colors">
                  {t.programs.categories.nutrition}
                </Link>
              </li>
              <li>
                <Link to="/programs?category=morning" className="hover:text-white transition-colors">
                  {t.programs.categories.morning}
                </Link>
              </li>
              <li>
                <Link to="/programs?category=evening" className="hover:text-white transition-colors">
                  {t.programs.categories.evening}
                </Link>
              </li>
              <li>
                <Link to="/programs?category=consultation" className="hover:text-white transition-colors">
                  {t.programs.categories.consultation}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#DFCA9B] font-serif">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-2.5 text-sm text-[#F8F6F0]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A8BDA5] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A8BDA5] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="text-xs hover:text-white">
                  {settings.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A8BDA5] shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="text-xs hover:text-white">
                  {settings.contactPhone}
                </a>
              </div>

              {/* Admin Portal Gateway */}
              <div className="pt-3">
                <Link
                  to="/admin"
                  className="text-[11px] text-[#A8BDA5]/70 hover:text-[#DFCA9B] transition-colors inline-flex items-center gap-1"
                >
                  <span>{t.nav.adminPortal}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Medical & Lifestyle Disclaimer */}
        <div className="py-6 border-b border-[#A8BDA5]/20">
          <p className="text-[11px] leading-relaxed text-[#A8BDA5]/70 text-center max-w-4xl mx-auto">
            {t.footer.disclaimer}
          </p>
        </div>

        {/* Bottom Bar: Copyright & Legal Policies */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8BDA5]/80 gap-4">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {brandName}. {t.footer.rights}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
            <Link to="/refunds" className="hover:text-white transition-colors">
              {t.footer.refunds}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
