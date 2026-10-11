import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MapPin,
  Users,
  CheckCircle2,
  Lock,
  ExternalLink,
  ShieldCheck,
  User,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { store, useStoreVersion } from '../services/store';
import { EventCountdown } from '../components/EventCountdown';

export const EventDetails: React.FC = () => {
  useStoreVersion();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, isBengali } = useLanguage();
  const { currentUser, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const event = store.getEventById(id || '');

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#153D32]">Event Not Found</h2>
        <p className="text-sm text-[#252A27]/70">The event circle requested could not be located.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.back}</span>
        </Link>
      </div>
    );
  }

  const title = isBengali ? (event.titleBn || event.title) : event.title;
  const desc = isBengali ? (event.descriptionBn || event.description) : event.description;
  const hostBio = isBengali ? (event.hostBioBn || event.hostBio) : event.hostBio;

  const userRegistrations = currentUser ? store.getEventRegistrations(currentUser.uid) : [];
  const isRegistered = userRegistrations.some(r => r.eventId === event.id);

  const handleRegister = () => {
    if (!isAuthenticated || !currentUser) {
      showToast(isBengali ? 'ইভেন্টে নিবন্ধন করতে প্রথমে সাইন ইন করুন।' : 'Please sign in to register for wellness circles.', 'info');
      navigate('/member/login', { state: { from: `/events/${event.id}` } });
      return;
    }

    store.registerForEvent({
      userId: currentUser.uid,
      userName: currentUser.fullName,
      userEmail: currentUser.email,
      eventId: event.id,
      eventTitle: event.title,
      eventStartAt: event.startAt,
      meetingUrl: event.meetingUrl,
      status: 'confirmed',
    });

    showToast(isBengali ? 'অভিনন্দন! আপনি সফলভাবে এই সেশনে নিবন্ধিত হয়েছেন।' : 'Registration confirmed! We look forward to seeing you.', 'success');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Back button link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#153D32] hover:text-[#0E2922] group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{isBengali ? 'সকল সেশনে ফিরে যান' : 'Back to All Events'}</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-16/9 bg-black/10 border border-[#A8BDA5]/30">
              <img src={event.imageUrl} alt={title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#153D32]/90 text-white backdrop-blur-xs flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-[#DFCA9B]" />
                  <span>{event.format === 'online' ? t.events.online : t.events.offline}</span>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-4 text-xs text-[#252A27]/70 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#153D32]" />
                    {new Date(event.startAt).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#153D32]" />
                    {new Date(event.startAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    ({event.timezone})
                  </span>
                </div>
                <EventCountdown targetDate={event.startAt} />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#153D32] leading-tight">
                {title}
              </h1>

              <p className="text-base sm:text-lg text-[#252A27]/80 leading-relaxed font-normal whitespace-pre-line">
                {desc}
              </p>
            </div>

            {/* Host Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#153D32]">
                {t.events.host}
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#153D32] text-[#DFCA9B] flex items-center justify-center font-bold text-xl shrink-0">
                  <User className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-[#153D32]">{event.hostName}</h4>
                  <p className="text-xs sm:text-sm text-[#252A27]/75 leading-relaxed">{hostBio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-6 sm:p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-lg space-y-6">
              <div>
                <span className="text-[11px] text-[#252A27]/60 uppercase tracking-wider block font-semibold">
                  {t.programs.price}
                </span>
                <span className="font-serif text-3xl font-bold text-[#153D32] mt-1 block">
                  {event.price > 0 ? `₹${event.price}` : (isBengali ? 'বিনামূল্যে উন্মুক্ত' : 'Complimentary Circle')}
                </span>
              </div>

              <div className="space-y-3 py-4 border-y border-[#A8BDA5]/20 text-xs text-[#252A27]/75">
                <div className="flex justify-between items-center">
                  <span>{t.events.format}:</span>
                  <strong className="text-[#153D32] capitalize">{event.format}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t.events.seatsLeft}:</span>
                  <strong className="text-[#153D32]">{Math.max(0, event.capacity - (event.registeredCount || 0))}</strong>
                </div>
              </div>

              {isRegistered ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{t.events.alreadyRegistered}</span>
                  </div>
                  {event.meetingUrl && (
                    <a
                      href={event.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors w-full justify-center shadow-xs"
                    >
                      <Video className="w-4 h-4" />
                      <span>{t.events.viewMeetingLink}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full py-3.5 rounded-full bg-[#153D32] text-white hover:bg-[#0E2922] transition-transform hover:scale-[1.02] active:scale-98 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                  <span>{t.events.registerForEvent}</span>
                </button>
              )}

              <div className="p-3 bg-[#F8F6F0] rounded-xl border border-[#A8BDA5]/20 flex items-center gap-2 text-[11px] text-[#252A27]/60">
                <ShieldCheck className="w-4 h-4 text-[#153D32] shrink-0" />
                <span>
                  {isBengali
                    ? 'নিবন্ধনের পর আপনার ইমেইলে ক্যালেন্ডার ইনভাইট যুক্ত হবে।'
                    : 'Calendar invitations and reminders will be emailed before session start.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
