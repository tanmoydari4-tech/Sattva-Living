import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Layers,
  Calendar,
  CreditCard,
  Inbox,
  MessageSquareHeart,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { store, useStoreVersion } from '../../services/store';
import { useLanguage } from '../../i18n/LanguageContext';

export const AdminDashboard: React.FC = () => {
  useStoreVersion();
  const { t, isBengali } = useLanguage();

  const members = store.getUsers().filter(u => u.role === 'member');
  const programs = store.getPrograms();
  const events = store.getEvents();
  const enquiries = store.getEnquiries();
  const testimonials = store.getTestimonials(false);
  const pendingTestimonials = testimonials.filter(t => t.status === 'pending');
  const payments = store.getPayments();

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      label: t.admin.stats.totalMembers,
      val: members.length,
      icon: <Users className="w-5 h-5 text-emerald-800" />,
      link: '/admin/members',
      bg: 'bg-emerald-50 border-emerald-200',
    },
    {
      label: t.admin.stats.activePrograms,
      val: programs.filter(p => p.published).length,
      icon: <Layers className="w-5 h-5 text-teal-800" />,
      link: '/admin/programs',
      bg: 'bg-teal-50 border-teal-200',
    },
    {
      label: t.admin.stats.upcomingEvents,
      val: events.length,
      icon: <Calendar className="w-5 h-5 text-amber-800" />,
      link: '/admin/events',
      bg: 'bg-amber-50 border-amber-200',
    },
    {
      label: t.admin.stats.pendingRegistrations,
      val: enquiries.filter(e => e.status === 'new').length,
      icon: <Inbox className="w-5 h-5 text-sky-800" />,
      link: '/admin/enquiries',
      bg: 'bg-sky-50 border-sky-200',
    },
    {
      label: t.admin.stats.unapprovedReviews,
      val: pendingTestimonials.length,
      icon: <MessageSquareHeart className="w-5 h-5 text-rose-800" />,
      link: '/admin/testimonials',
      bg: 'bg-rose-50 border-rose-200',
    },
    {
      label: t.admin.stats.totalRevenue,
      val: `₹${totalRevenue.toLocaleString('en-IN')}`,
      icon: <CreditCard className="w-5 h-5 text-indigo-800" />,
      link: '/admin/payments',
      bg: 'bg-indigo-50 border-indigo-200',
    },
  ];

  const recentPayments = payments.slice(0, 5);
  const recentEnquiries = enquiries.slice(0, 4);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#153D32]">
              {t.admin.portalTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
              Overview of community members, active wellness programs, and daily operations.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Access Mode</span>
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, idx) => (
            <Link
              key={idx}
              to={s.link}
              className={`p-4 rounded-2xl border ${s.bg} shadow-xs hover:shadow-md transition-shadow space-y-2 block`}
            >
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-2xs">
                {s.icon}
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#153D32] block">
                  {s.val}
                </span>
                <span className="text-[11px] font-medium text-[#252A27]/70 block leading-tight mt-0.5">
                  {s.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Two-Column Activity Feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Payments & Enrollments */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#153D32]">Recent Transactions</h3>
              <Link to="/admin/payments" className="text-xs font-semibold text-[#153D32] hover:underline">
                View All &rarr;
              </Link>
            </div>

            {recentPayments.length === 0 ? (
              <p className="text-xs text-[#252A27]/60 py-6 text-center italic">No transactions recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {recentPayments.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#A8BDA5]/20 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#153D32]">{p.itemTitle}</p>
                      <p className="text-[11px] text-[#252A27]/60">{p.userName} • {p.transactionReference}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#153D32]">₹{p.amount}</p>
                      <span className="text-[10px] uppercase font-bold text-emerald-700">
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Incoming Contact Enquiries */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#153D32]">Incoming Member Enquiries</h3>
              <Link to="/admin/enquiries" className="text-xs font-semibold text-[#153D32] hover:underline">
                View All &rarr;
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <p className="text-xs text-[#252A27]/60 py-6 text-center italic">No enquiries received yet.</p>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-3.5 rounded-2xl bg-[#F8F6F0] border border-[#A8BDA5]/20 space-y-1 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#153D32]">{enq.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        enq.status === 'new' ? 'bg-amber-100 text-amber-900' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#252A27]/75 line-clamp-2 leading-relaxed">
                      {enq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pending Testimonials Banner if any */}
        {pendingTestimonials.length > 0 && (
          <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-base font-bold text-rose-950">
                {pendingTestimonials.length} Testimonial(s) Awaiting Review
              </h4>
              <p className="text-xs text-rose-800 mt-0.5">
                Community members have submitted their habit experiences. Review and approve them for public display.
              </p>
            </div>
            <Link
              to="/admin/testimonials"
              className="px-5 py-2 rounded-full bg-rose-800 text-white text-xs font-semibold hover:bg-rose-900 shrink-0"
            >
              Review Testimonials &rarr;
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
