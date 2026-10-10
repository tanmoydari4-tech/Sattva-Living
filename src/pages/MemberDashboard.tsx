import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Calendar,
  CheckCircle2,
  BookOpen,
  MessageCircle,
  Bell,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Video,
  User,
  Clock,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { store } from '../services/store';
import { HabitTracker } from '../components/HabitTracker';

export const MemberDashboard: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'habits' | 'programs' | 'events' | 'resources'>('habits');
  const [coachMessageOpen, setCoachMessageOpen] = useState(false);
  const [coachMessageText, setCoachMessageText] = useState('');

  if (!currentUser) return null;

  const enrollments = store.getEnrollments(currentUser.uid);
  const eventRegistrations = store.getEventRegistrations(currentUser.uid);
  const announcements = store.getAnnouncements().filter(a => a.active);
  const articles = store.getArticles().filter(a => a.published).slice(0, 3);

  const handleSendCoachMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachMessageText.trim()) return;

    store.submitEnquiry({
      name: currentUser.fullName,
      email: currentUser.email,
      mobile: currentUser.mobile,
      category: 'consultation',
      message: `[MEMBER DASHBOARD QUERY]: ${coachMessageText.trim()}`,
      consentGiven: true,
    });

    setCoachMessageText('');
    setCoachMessageOpen(false);
    showToast(isBengali ? 'আপনার বার্তা কোচের কাছে প্রেরিত হয়েছে।' : 'Message sent to your wellness mentor. They will reply via email shortly.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Member Welcome Banner */}
      <div className="bg-gradient-to-r from-[#153D32] to-[#0E2922] text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#A8BDA5]/25">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#DFCA9B]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBengali ? 'সদস্য ড্যাশবোর্ড' : 'Member Sanctuary'}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold">
            {t.dashboard.welcome}, {currentUser.fullName.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-[#A8BDA5] max-w-xl leading-relaxed">
            {t.dashboard.subtitle}
          </p>
          {currentUser.wellnessGoals && (
            <div className="pt-2 flex items-center gap-2 text-xs text-[#F8F6F0]/90">
              <span className="font-semibold text-[#DFCA9B]">{isBengali ? 'আমার লক্ষ্য:' : 'My Focus:'}</span>
              <span className="italic">{currentUser.wellnessGoals}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setCoachMessageOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#C6A66A] text-[#153D32] text-xs font-semibold hover:bg-[#DFCA9B] transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{t.dashboard.contactCoachBtn}</span>
          </button>
          <Link
            to="/member/profile"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold border border-white/20 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>{t.dashboard.tabProfile}</span>
          </Link>
        </div>
      </div>

      {/* 2. Community Announcements if any */}
      {announcements.length > 0 && (
        <div className="p-4 sm:p-5 bg-amber-50/90 border border-amber-300 rounded-2xl flex items-start gap-3.5 shadow-2xs">
          <Bell className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-200 px-2 py-0.5 rounded-full text-amber-900">
                {t.dashboard.announcements}
              </span>
              <span className="font-semibold text-sm font-serif">
                {isBengali ? announcements[0].titleBn : announcements[0].title}
              </span>
            </div>
            <p className="leading-relaxed">
              {isBengali ? announcements[0].contentBn : announcements[0].content}
            </p>
          </div>
        </div>
      )}

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#A8BDA5]/30 pb-3 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('habits')}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'habits'
              ? 'bg-[#153D32] text-white shadow-xs'
              : 'bg-white text-[#252A27]/70 hover:bg-[#F8F6F0] border border-[#A8BDA5]/30'
          }`}
        >
          {t.dashboard.tabOverview}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('programs')}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'programs'
              ? 'bg-[#153D32] text-white shadow-xs'
              : 'bg-white text-[#252A27]/70 hover:bg-[#F8F6F0] border border-[#A8BDA5]/30'
          }`}
        >
          {t.dashboard.tabPrograms} ({enrollments.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('events')}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'events'
              ? 'bg-[#153D32] text-white shadow-xs'
              : 'bg-white text-[#252A27]/70 hover:bg-[#F8F6F0] border border-[#A8BDA5]/30'
          }`}
        >
          {t.dashboard.tabEvents} ({eventRegistrations.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('resources')}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'resources'
              ? 'bg-[#153D32] text-white shadow-xs'
              : 'bg-white text-[#252A27]/70 hover:bg-[#F8F6F0] border border-[#A8BDA5]/30'
          }`}
        >
          {t.dashboard.tabResources}
        </button>
      </div>

      {/* 4. Tab Contents */}

      {/* TAB A: Habits & Overview */}
      {activeTab === 'habits' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <HabitTracker userId={currentUser.uid} />

          {/* Quick Enrolled & Registered Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {/* My Active Programs */}
            <div className="bg-white p-6 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#153D32]">
                  {t.dashboard.enrolledPrograms}
                </h3>
                <Link to="/member/my-programs" className="text-xs text-[#153D32] font-semibold hover:underline">
                  {t.common.viewAll}
                </Link>
              </div>

              {enrollments.length === 0 ? (
                <div className="text-center py-8 space-y-3 bg-[#F8F6F0] rounded-2xl p-4">
                  <p className="text-xs text-[#252A27]/70">{t.dashboard.noEnrolledPrograms}</p>
                  <Link
                    to="/programs"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922]"
                  >
                    <span>{t.dashboard.explorePrograms}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrollments.map((enr) => (
                    <div
                      key={enr.id}
                      className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#A8BDA5]/25 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#153D32]">{enr.programTitle}</h4>
                        <span className="text-[11px] text-[#252A27]/60 block mt-0.5">
                          Enrolled: {new Date(enr.enrolledAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {enr.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Upcoming Sessions */}
            <div className="bg-white p-6 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#153D32]">
                  {t.dashboard.upcomingSessions}
                </h3>
                <Link to="/member/my-events" className="text-xs text-[#153D32] font-semibold hover:underline">
                  {t.common.viewAll}
                </Link>
              </div>

              {eventRegistrations.length === 0 ? (
                <div className="text-center py-8 space-y-3 bg-[#F8F6F0] rounded-2xl p-4">
                  <p className="text-xs text-[#252A27]/70">{t.dashboard.noEvents}</p>
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922]"
                  >
                    <span>{t.dashboard.exploreEvents}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {eventRegistrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="p-4 rounded-2xl bg-[#F8F6F0] border border-[#A8BDA5]/25 flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h4 className="font-serif text-sm font-bold text-[#153D32]">{reg.eventTitle}</h4>
                        <span className="text-[11px] text-[#252A27]/60 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#153D32]" />
                          {new Date(reg.eventStartAt).toLocaleDateString()}
                        </span>
                      </div>
                      {reg.meetingUrl && (
                        <a
                          href={reg.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB B: My Programs Full List */}
      {activeTab === 'programs' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-[#153D32]">{t.dashboard.enrolledPrograms}</h3>
            <Link to="/programs" className="text-xs font-semibold text-[#153D32] hover:underline">
              {t.dashboard.explorePrograms} &rarr;
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#A8BDA5]/30 p-8 space-y-3">
              <Layers className="w-10 h-10 text-[#A8BDA5] mx-auto" />
              <p className="text-sm font-semibold text-[#153D32]">{t.dashboard.noEnrolledPrograms}</p>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold"
              >
                {t.dashboard.explorePrograms}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.map((enr) => {
                const programData = store.getProgramById(enr.programId);
                return (
                  <div key={enr.id} className="bg-white p-6 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#153D32]">{enr.programTitle}</h4>
                        <span className="text-xs text-[#252A27]/60 block mt-1">
                          Enrolled: {new Date(enr.enrolledAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {enr.status}
                      </span>
                    </div>

                    {programData && (
                      <p className="text-xs text-[#252A27]/75 line-clamp-2 leading-relaxed">
                        {isBengali ? (programData.shortDescriptionBn || programData.shortDescription) : programData.shortDescription}
                      </p>
                    )}

                    <div className="pt-2 flex items-center justify-between border-t border-[#A8BDA5]/20 text-xs">
                      <span className="text-[#252A27]/70">Amount Paid: ₹{enr.amountPaid}</span>
                      <Link
                        to={`/programs/${enr.programId}`}
                        className="font-semibold text-[#153D32] hover:underline"
                      >
                        {t.programs.viewDetails} &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB C: My Events Full List */}
      {activeTab === 'events' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-[#153D32]">{t.dashboard.upcomingSessions}</h3>
            <Link to="/events" className="text-xs font-semibold text-[#153D32] hover:underline">
              {t.dashboard.exploreEvents} &rarr;
            </Link>
          </div>

          {eventRegistrations.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#A8BDA5]/30 p-8 space-y-3">
              <Calendar className="w-10 h-10 text-[#A8BDA5] mx-auto" />
              <p className="text-sm font-semibold text-[#153D32]">{t.dashboard.noEvents}</p>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold"
              >
                {t.dashboard.exploreEvents}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventRegistrations.map((reg) => (
                <div key={reg.id} className="bg-white p-6 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-[#153D32]">{reg.eventTitle}</h4>
                    <span className="text-xs text-[#252A27]/70 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#153D32]" />
                      {new Date(reg.eventStartAt).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>

                  {reg.meetingUrl && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                      <span className="text-[11px] font-semibold text-emerald-950 block">Live Meeting Room Access:</span>
                      <a
                        href={reg.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors w-full justify-center"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Session Room</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB D: Wellness Library Resources */}
      {activeTab === 'resources' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <h3 className="font-serif text-xl font-bold text-[#153D32]">{t.dashboard.tabResources}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div key={art.id} className="bg-white rounded-3xl overflow-hidden border border-[#A8BDA5]/30 shadow-xs p-5 space-y-3">
                <img src={art.imageUrl} alt={art.title} className="w-full h-36 object-cover rounded-xl" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#153D32]">{art.category}</span>
                <h4 className="font-serif font-bold text-sm text-[#153D32]">{isBengali ? art.titleBn : art.title}</h4>
                <Link
                  to={`/nutrition/${art.id}`}
                  className="text-xs font-semibold text-[#153D32] hover:underline inline-flex items-center gap-1"
                >
                  <span>{t.nutrition.readMore}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coach Contact Modal */}
      {coachMessageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-4 border border-[#A8BDA5]/40 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-[#153D32]">
              {t.dashboard.coachMessage}
            </h3>
            <p className="text-xs text-[#252A27]/70">
              {isBengali
                ? 'আপনার প্রশ্ন বা রুটিন সংক্রান্ত দ্বিধা লিখুন। আমাদের পরামর্শক ২৪ ঘণ্টার মধ্যে জবাব দেবেন।'
                : 'Share any questions about your daily habits, energy levels, or sessions. Our coach will reply personally.'}
            </p>
            <form onSubmit={handleSendCoachMessage} className="space-y-4">
              <textarea
                required
                rows={5}
                value={coachMessageText}
                onChange={(e) => setCoachMessageText(e.target.value)}
                placeholder={isBengali ? 'আপনার বার্তা এখানে লিখুন...' : 'Write your wellness question here...'}
                className="w-full text-xs p-3.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCoachMessageOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#A8BDA5] text-xs font-medium text-[#252A27]"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922]"
                >
                  {isBengali ? 'বার্তা পাঠান' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
