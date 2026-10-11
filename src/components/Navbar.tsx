import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User as UserIcon, Shield, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useStoreVersion } from '../services/store';

export const Navbar: React.FC = () => {
  useStoreVersion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.programs, path: '/programs' },
    { label: t.nav.nutrition, path: '/nutrition' },
    { label: t.nav.events, path: '/events' },
    { label: t.nav.community, path: '/community' },
    { label: t.nav.stories, path: '/community#stories' },
    { label: t.nav.gallery, path: '/gallery' },
    { label: t.nav.contact, path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F6F0]/95 backdrop-blur-md shadow-xs border-b border-[#A8BDA5]/30 py-3'
            : 'bg-[#F8F6F0] border-b border-[#A8BDA5]/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <BrandLogo />

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isActive(link.path)
                      ? 'text-[#153D32] bg-[#A8BDA5]/25 font-semibold'
                      : 'text-[#252A27]/80 hover:text-[#153D32] hover:bg-[#A8BDA5]/15'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Action Cluster: Language Switcher + Member Portal + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center bg-white/80 border border-[#A8BDA5]/40 rounded-full p-1 shadow-xs">
                <Globe className="w-3.5 h-3.5 text-[#153D32] ml-2 mr-1" />
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full transition-all ${
                    language === 'en'
                      ? 'bg-[#153D32] text-white shadow-xs'
                      : 'text-[#252A27]/70 hover:text-[#153D32]'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('bn')}
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full transition-all ${
                    language === 'bn'
                      ? 'bg-[#153D32] text-white shadow-xs font-semibold'
                      : 'text-[#252A27]/70 hover:text-[#153D32]'
                  }`}
                >
                  বাংলা
                </button>
              </div>

              {/* Admin Quick Link if admin */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-[#153D32]/10 text-[#153D32] border border-[#153D32]/20 hover:bg-[#153D32] hover:text-white transition-colors"
                  title="Admin Dashboard"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              )}

              {/* Member Auth State */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/member/dashboard"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#153D32] bg-white border border-[#A8BDA5]/50 rounded-full hover:border-[#153D32] shadow-xs transition-colors"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>{currentUser?.fullName.split(' ')[0] || t.nav.memberDashboard}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="text-xs text-[#252A27]/60 hover:text-red-700 font-medium px-2 py-1"
                  >
                    {t.nav.logout}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/member/login"
                    className="text-xs font-semibold text-[#153D32] px-3 py-2 rounded-full hover:bg-[#A8BDA5]/20 transition-colors"
                  >
                    {t.nav.memberLogin}
                  </Link>
                  <Link
                    to="/member/register"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#153D32] rounded-full hover:bg-[#0E2922] transition-transform duration-200 hover:scale-[1.02] shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C6A66A]" />
                    <span>{t.nav.joinCommunity}</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              {/* Compact Language Toggle for mobile header */}
              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="px-2.5 py-1 text-xs font-medium rounded-full border border-[#A8BDA5]/60 bg-white text-[#153D32]"
                title="Switch Language"
              >
                {language === 'en' ? 'বাংলা' : 'EN'}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#153D32] hover:bg-[#A8BDA5]/20 focus:outline-hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#F8F6F0] border-b border-[#A8BDA5]/30 px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-4">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'text-[#153D32] bg-[#A8BDA5]/25 font-bold'
                      : 'text-[#252A27] hover:bg-[#A8BDA5]/15'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[#A8BDA5]/30 flex flex-col gap-3">
              {/* Language Selector in Mobile Drawer */}
              <div className="flex items-center justify-between py-2 px-3 bg-white/70 rounded-lg">
                <span className="text-sm font-medium text-[#252A27]">Language / ভাষা:</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-xs rounded-full ${
                      language === 'en' ? 'bg-[#153D32] text-white font-semibold' : 'text-[#252A27]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('bn')}
                    className={`px-3 py-1 text-xs rounded-full ${
                      language === 'bn' ? 'bg-[#153D32] text-white font-semibold' : 'text-[#252A27]'
                    }`}
                  >
                    বাংলা
                  </button>
                </div>
              </div>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/member/dashboard"
                    className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#153D32] rounded-full"
                  >
                    {t.nav.memberDashboard} ({currentUser?.fullName.split(' ')[0]})
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="w-full text-center py-2 text-sm font-semibold text-[#153D32] bg-[#A8BDA5]/30 rounded-full"
                    >
                      {t.nav.adminPortal}
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full text-center py-2 text-sm text-red-700 font-medium"
                  >
                    {t.nav.logout}
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/member/login"
                    className="text-center py-2.5 text-sm font-semibold text-[#153D32] bg-white border border-[#A8BDA5] rounded-full"
                  >
                    {t.nav.memberLogin}
                  </Link>
                  <Link
                    to="/member/register"
                    className="text-center py-2.5 text-sm font-semibold text-white bg-[#153D32] rounded-full"
                  >
                    {t.nav.joinCommunity}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
