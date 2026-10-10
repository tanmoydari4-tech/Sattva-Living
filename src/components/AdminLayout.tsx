import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Layers,
  Calendar,
  BookOpen,
  Image,
  MessageSquareHeart,
  Inbox,
  CreditCard,
  Settings,
  ExternalLink,
  Shield,
  LogOut,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { t, isBengali } = useLanguage();

  const navItems = [
    { label: t.admin.nav.overview, path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: t.admin.nav.members, path: '/admin/members', icon: <Users className="w-4 h-4" /> },
    { label: t.admin.nav.programs, path: '/admin/programs', icon: <Layers className="w-4 h-4" /> },
    { label: t.admin.nav.events, path: '/admin/events', icon: <Calendar className="w-4 h-4" /> },
    { label: t.admin.nav.articles, path: '/admin/articles', icon: <BookOpen className="w-4 h-4" /> },
    { label: t.admin.nav.gallery, path: '/admin/gallery', icon: <Image className="w-4 h-4" /> },
    { label: t.admin.nav.testimonials, path: '/admin/testimonials', icon: <MessageSquareHeart className="w-4 h-4" /> },
    { label: t.admin.nav.enquiries, path: '/admin/enquiries', icon: <Inbox className="w-4 h-4" /> },
    { label: t.admin.nav.payments, path: '/admin/payments', icon: <CreditCard className="w-4 h-4" /> },
    { label: t.admin.nav.settings, path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F1ECE0] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#153D32] text-white shrink-0 flex flex-col justify-between border-r border-[#1E5042]">
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <BrandLogo variant="light" />
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DFCA9B]/20 text-[#DFCA9B] text-[10px] font-bold tracking-wider uppercase mt-2">
              <Shield className="w-3 h-3" />
              <span>{t.admin.badge}</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#C6A66A] text-[#153D32] shadow-sm font-bold'
                    : 'text-[#F8F6F0]/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-[#A8BDA5]/20 space-y-4">
          <div className="flex items-center gap-3 text-xs">
            <div className="w-8 h-8 rounded-full bg-[#C6A66A] text-[#153D32] flex items-center justify-center font-bold">
              {currentUser?.fullName.charAt(0) || 'A'}
            </div>
            <div className="truncate">
              <p className="font-semibold text-white truncate">{currentUser?.fullName}</p>
              <p className="text-[10px] text-[#A8BDA5] truncate">{currentUser?.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-[11px] text-[#A8BDA5] hover:text-white transition-colors"
            >
              <span>{t.admin.nav.viewSite}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-[11px] text-red-300 hover:text-red-200"
            >
              <LogOut className="w-3 h-3" />
              <span>{t.nav.logout}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
