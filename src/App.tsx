import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useStoreVersion, store } from './services/store';

// Public & Community Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { ProgramDetails } from './pages/ProgramDetails';
import { Nutrition } from './pages/Nutrition';
import { ArticleDetails } from './pages/ArticleDetails';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Community } from './pages/Community';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

// Auth Pages
import { MemberLogin } from './pages/MemberLogin';
import { MemberRegister } from './pages/MemberRegister';
import { ForgotPassword } from './pages/ForgotPassword';
import { AdminLogin } from './pages/AdminLogin';

// Member Portal Pages
import { MemberDashboard } from './pages/MemberDashboard';
import { MemberProfile } from './pages/MemberProfile';
import { MyPrograms } from './pages/MyPrograms';
import { MyEvents } from './pages/MyEvents';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminMembers } from './pages/admin/AdminMembers';
import { AdminPrograms } from './pages/admin/AdminPrograms';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminArticles } from './pages/admin/AdminArticles';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminPayments } from './pages/admin/AdminPayments';
import { AdminSettings } from './pages/admin/AdminSettings';

// Policy Pages
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { RefundPolicy } from './pages/RefundPolicy';
import { NotFound } from './pages/NotFound';

// Layout Controller: Hide public header & footer on Admin suite and reactively re-render on data store changes
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  const storeVersion = useStoreVersion();

  // Listen for storage events across open browser tabs so admin changes appear instantaneously
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('sattva_')) {
        store.reloadFromLocalStorage();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#252A27]">
      {!isAdminRoute && <Navbar key={`nav-${storeVersion}`} />}
      <div key={`content-${storeVersion}`} className="flex-1">{children}</div>
      {!isAdminRoute && <Footer key={`footer-${storeVersion}`} />}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <HashRouter>
            <LayoutWrapper>
              <Routes>
                {/* 1-11 Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:id" element={<ProgramDetails />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/nutrition/:id" element={<ArticleDetails />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/community" element={<Community />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />

                {/* 12-14 Member Auth */}
                <Route path="/member/login" element={<MemberLogin />} />
                <Route path="/member/register" element={<MemberRegister />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* 15-18 Member Dashboard & Protected Subpages */}
                <Route
                  path="/member/dashboard"
                  element={
                    <ProtectedRoute>
                      <MemberDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/member/profile"
                  element={
                    <ProtectedRoute>
                      <MemberProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/member/my-programs"
                  element={
                    <ProtectedRoute>
                      <MyPrograms />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/member/my-events"
                  element={
                    <ProtectedRoute>
                      <MyEvents />
                    </ProtectedRoute>
                  }
                />

                {/* 19 Admin Login */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* 20-29 Admin Management Suite (Protected Admin) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/members"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminMembers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/programs"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminPrograms />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/events"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminEvents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/articles"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminArticles />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/gallery"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminGallery />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/testimonials"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminTestimonials />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/enquiries"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminEnquiries />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/payments"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminPayments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminSettings />
                    </ProtectedRoute>
                  }
                />

                {/* 30-32 Policies */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/refunds" element={<RefundPolicy />} />

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LayoutWrapper>
          </HashRouter>
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
