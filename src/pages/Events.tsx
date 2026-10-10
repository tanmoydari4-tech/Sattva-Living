import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { store } from '../services/store';
import { EventCountdown } from '../components/EventCountdown';

export const Events: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const { currentUser, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'live' | 'past' | 'myEvents'>('all');

  const allEvents = store.getEvents();
  const userRegistrations = currentUser ? store.getEventRegistrations(currentUser.uid) : [];

  const filteredEvents = allEvents.filter((evt) => {
    const isPast = new Date(evt.endAt).getTime() < Date.now();
    const isLive = new Date(evt.startAt).getTime() <= Date.now() && new Date(evt.endAt).getTime() >= Date.now();
    const isRegistered = userRegistrations.some(r => r.eventId === evt.id);

    if (activeTab === 'upcoming') return !isPast && !isLive;
    if (activeTab === 'live') return isLive;
    if (activeTab === 'past') return isPast;
    if (activeTab === 'myEvents') return isRegistered;
    return true;
  });

  const handleRegisterEvent = (eventId: string, eventTitle: string, eventStartAt: string, meetingUrl?: string) => {
    if (!isAuthenticated || !currentUser) {
      showToast(isBengali ? 'ইভেন্টে নিবন্ধন করতে প্রথমে লগইন করুন।' : 'Please sign in to register for wellness circles.', 'info');
      navigate('/member/login', { state: { from: '/events' } });
      return;
    }

    store.registerForEvent({
      userId: currentUser.uid,
      userName: currentUser.fullName,
      userEmail: currentUser.email,
      eventId,
      eventTitle,
      eventStartAt,
      meetingUrl,
      status: 'confirmed',
    });

    showToast(isBengali ? 'সফলভাবে নিবন্ধিত হয়েছে! মিটিং লিংক আনলক হয়েছে।' : 'Registered successfully! Your meeting room is now unlocked.', 'success');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-[#153D32] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.events.badge}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6F0]">
            {t.events.heading}
          </h1>
          <p className="text-base sm:text-lg text-[#A8BDA5] leading-relaxed">
            {t.events.subheading}
          </p>
        </div>
      </section>

      {/* 2. Filters & Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#A8BDA5]/20">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'all'
                ? 'bg-[#153D32] text-white shadow-xs'
                : 'bg-white text-[#252A27]/70 hover:bg-[#F8F6F0] border border-[#A8BDA5]/30'
            }`}
          >
            {t.events.filterAll}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'upcoming'
                ? 'bg-[#153D32] text-white shadow-xs'
                : 'bg-white text-[#252A27]/70 hover:bg-[#F8F6F0] border border-[#A8BDA5]/30'
            }`}
          >
            {t.events.filterUpcoming}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'live'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-white text-[#252A27]/70 hover:bg-[#F8F6F0] border border-[#A8BDA5]/30'
            }`}
          >
            {t.events.filterLive}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
              activeTab === 'past'
                ? 'bg-[#153D32] text-white shadow-xs'
                : 'bg-white text-[#252A27]/70 hover:bg-[#F8F6F0] border border-[#A8BDA5]/30'
            }`}
          >
            {t.events.filterPast}
          </button>
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => setActiveTab('myEvents')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === 'myEvents'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
              }`}
            >
              {t.events.filterMyEvents} ({userRegistrations.length})
            </button>
          )}
        </div>

        {/* 3. Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#A8BDA5]/30 p-8 space-y-3">
            <p className="text-base font-serif text-[#153D32] font-semibold">
              {isBengali ? 'কোনো ইভেন্ট পাওয়া যায়নি' : 'No wellness sessions match your filter'}
            </p>
            <p className="text-xs text-[#252A27]/60">
              {isBengali ? 'অন্য কোনো ট্যাব বেছে নিন।' : 'Please check back soon or browse all scheduled circles.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((evt) => {
              const title = isBengali ? (evt.titleBn || evt.title) : evt.title;
              const desc = isBengali ? (evt.descriptionBn || evt.description) : evt.description;
              const hostBio = isBengali ? (evt.hostBioBn || evt.hostBio) : evt.hostBio;

              const isRegistered = userRegistrations.some(r => r.eventId === evt.id);
              const seatsRemaining = Math.max(0, evt.capacity - (evt.registeredCount || 0));

              return (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#A8BDA5]/40 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative aspect-16/9 overflow-hidden bg-black/10">
                      <img src={evt.imageUrl} alt={title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#153D32]/90 text-white backdrop-blur-xs flex items-center gap-1.5">
                          {evt.format === 'online' ? <Video className="w-3.5 h-3.5 text-[#DFCA9B]" /> : <MapPin className="w-3.5 h-3.5" />}
                          <span>{evt.format === 'online' ? t.events.online : t.events.offline}</span>
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <EventCountdown targetDate={evt.startAt} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-center gap-4 text-xs text-[#252A27]/60 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#153D32]" />
                          {new Date(evt.startAt).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#153D32]" />
                          {new Date(evt.startAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          ({evt.timezone})
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-[#153D32] leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#252A27]/75 line-clamp-2 leading-relaxed">
                        {desc}
                      </p>

                      {/* Host Bio */}
                      <div className="p-3.5 bg-[#F8F6F0] rounded-xl border border-[#A8BDA5]/20 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[#252A27]/60 block">{t.events.host}:</span>
                          <strong className="text-[#153D32]">{evt.hostName}</strong>
                          <span className="block text-[11px] text-[#252A27]/70 mt-0.5">{hostBio}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-[#252A27]/60 block">{t.events.seatsLeft}:</span>
                          <span className="font-bold text-[#153D32]">{seatsRemaining}</span>
                        </div>
                      </div>

                      {/* Meeting Room Link if registered, or locked badge */}
                      {isRegistered ? (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              <span>{t.events.alreadyRegistered}</span>
                            </span>
                            <span className="text-[10px] bg-emerald-200 text-emerald-900 font-semibold px-2 py-0.5 rounded-full">
                              Confirmed
                            </span>
                          </div>
                          {evt.meetingUrl && (
                            <a
                              href={evt.meetingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors w-full justify-center"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>{t.events.viewMeetingLink}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-[#F8F6F0]/70 border border-[#A8BDA5]/20 flex items-center gap-2 text-xs text-[#252A27]/60">
                          <Lock className="w-4 h-4 text-[#C6A66A] shrink-0" />
                          <span>
                            {isBengali
                              ? 'অনলাইন গুগল মিট লিংকটি নিবন্ধিত সদস্যদের জন্য সেশনের পূর্বে দৃশ্যমান হবে।'
                              : 'Private meeting link is unlocked for registered members upon confirmation.'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 sm:p-8 pt-0 border-t border-[#A8BDA5]/20 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#252A27]/60 uppercase tracking-wider block">
                        {t.programs.price}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#153D32]">
                        {evt.price > 0 ? `₹${evt.price}` : (isBengali ? 'বিনামূল্যে' : 'Free Circle')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/events/${evt.id}`}
                        className="text-xs font-semibold text-[#153D32] hover:underline"
                      >
                        {t.programs.viewDetails}
                      </Link>

                      {!isRegistered && (
                        <button
                          type="button"
                          onClick={() => handleRegisterEvent(evt.id, evt.title, evt.startAt, evt.meetingUrl)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#153D32] text-white hover:bg-[#0E2922] transition-colors shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#DFCA9B]" />
                          <span>{t.events.registerForEvent}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
