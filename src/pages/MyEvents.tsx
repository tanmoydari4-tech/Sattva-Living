import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Video, ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { store } from '../services/store';

export const MyEvents: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const registrations = store.getEventRegistrations(currentUser.uid);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          to="/member/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#153D32] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBengali ? 'ড্যাশবোর্ডে ফিরে যান' : 'Back to Dashboard'}</span>
        </Link>
        <span className="text-xs uppercase tracking-wider font-semibold text-[#C6A66A]">
          {t.dashboard.upcomingSessions}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[#153D32]">
          {isBengali ? 'আমার নিবন্ধিত অনলাইন সেশনসমূহ' : 'My Registered Wellness Circles'}
        </h1>
        <p className="text-xs sm:text-sm text-[#252A27]/70">
          {isBengali
            ? 'লাইভ সেশনে যোগদানের লিংক এবং আসন্ন ভার্চুয়াল সমাবেশের সময়সূচি।'
            : 'Access verified Google Meet/Zoom room links and dates for your circles.'}
        </p>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#A8BDA5]/30 p-8 space-y-3">
          <Calendar className="w-12 h-12 text-[#A8BDA5] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#153D32]">{t.dashboard.noEvents}</h3>
          <p className="text-xs text-[#252A27]/60 max-w-md mx-auto">
            {isBengali ? 'আসন্ন ভার্চুয়াল স্ট্রেচিং বা কর্মশালায় নাম লেখান।' : 'Join our upcoming interactive morning, evening, and nutrition circles.'}
          </p>
          <div className="pt-2">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold"
            >
              <span>{t.dashboard.exploreEvents}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registrations.map((reg) => {
            const eventData = store.getEventById(reg.eventId);
            return (
              <div
                key={reg.id}
                className="bg-white p-6 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#153D32]">{reg.eventTitle}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#252A27]/70">
                      <Clock className="w-3.5 h-3.5 text-[#153D32]" />
                      <span>{new Date(reg.eventStartAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    {reg.status}
                  </span>
                </div>

                {eventData && (
                  <p className="text-xs text-[#252A27]/75 line-clamp-2 leading-relaxed">
                    {isBengali ? (eventData.descriptionBn || eventData.description) : eventData.description}
                  </p>
                )}

                {reg.meetingUrl && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                    <span className="text-[11px] font-semibold text-emerald-950 block">Live Meeting Room Access:</span>
                    <a
                      href={reg.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors w-full justify-center shadow-xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{t.events.viewMeetingLink}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
