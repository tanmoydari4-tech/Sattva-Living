import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Sun,
  Heart,
  Droplets,
  Moon,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Compass,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { store, useStoreVersion } from '../services/store';
import { EventCountdown } from '../components/EventCountdown';

export const Home: React.FC = () => {
  useStoreVersion();
  const { t, isBengali } = useLanguage();
  const settings = store.getSettings();
  const programs = store.getPrograms().filter(p => p.published).slice(0, 3);
  const events = store.getEvents().slice(0, 2);
  const articles = store.getArticles().filter(a => a.published).slice(0, 3);
  const testimonials = store.getTestimonials(true).slice(0, 3);

  const heroTitle = isBengali ? (settings.heroTitleBn || settings.heroTitle) : settings.heroTitle;
  const heroSubtitle = isBengali ? (settings.heroSubtitleBn || settings.heroSubtitle) : settings.heroSubtitle;
  const philosophyQuote = isBengali ? (settings.philosophyBn || settings.philosophy || t.philosophy.quote) : (settings.philosophy || t.philosophy.quote);
  const philosophyTagline = isBengali ? (settings.taglineBn || settings.tagline || t.philosophy.tagline) : (settings.tagline || t.philosophy.tagline);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: isBengali ? 'সত্ত্ব লিভিং কি কোনো জিম বা বডিবিল্ডিং কেন্দ্র?' : 'Is Sattva Living a gym or bodybuilding center?',
      a: isBengali
        ? 'না, একেবারেই নয়। আমরা কোনো জিম সরঞ্জাম, ভারী ওজন তোলা বা অতিরিক্ত কঠোর ব্যায়ামের চর্চা করি না। আমরা দৈনন্দিন সহজ হাঁটাচলা, সুষম খাদ্যাভ্যাস, সঠিক ঘুম ও মানসিক প্রশান্তির মাধ্যমে স্বাভাবিক ও টেকসই সুস্থতায় বিশ্বাসী।'
        : 'No, absolutely not. We do not use gym equipment, heavy lifting, or punishing workout cultures. We focus exclusively on gentle daily movement, walking, balanced whole-food nutrition, restorative sleep, and mindfulness.',
    },
    {
      q: isBengali ? 'অনলাইন সেশনগুলোতে কীভাবে যুক্ত হব?' : 'How do online wellness sessions work?',
      a: isBengali
        ? 'আমাদের সকালের স্নিগ্ধ স্ট্রেচিং এবং সন্ধ্যার রিল্যাক্সেশন সার্কেলগুলো সরাসরি গুগল মিট বা জুমে পরিচালিত হয়। মেম্বার একাউন্ট থাকলে সরাসরি ড্যাশবোর্ড থেকে এক ক্লিকে যুক্ত হতে পারবেন।'
        : 'Our morning awakening and evening relaxation circles take place live via interactive Google Meet/Zoom video rooms. Registered members access direct private links from their dashboard.',
    },
    {
      q: isBengali ? 'আমার কি কোনো পূর্ব অভিজ্ঞতার প্রয়োজন আছে?' : 'Do I need any prior fitness background?',
      a: isBengali
        ? 'না, কোনো পূর্ব অভিজ্ঞতার প্রয়োজন নেই। আমাদের সকল পরামর্শ ও সেশন সাধারণ মানুষের জন্য উপযোগী—ব্যস্ত কর্মজীবী, শিক্ষার্থী ও সিনিয়র সিটিজেন সবার জন্যই উন্মুক্ত।'
        : 'None at all. Our programs are designed specifically for beginners, busy professionals, and anyone seeking sustainable, low-stress wellness without intimidation.',
    },
    {
      q: isBengali ? 'দৈনিক অভ্যাস ট্র্যাকার কীভাবে কাজ করে?' : 'How does the daily habit checklist help?',
      a: isBengali
        ? 'আপনার মেম্বার ড্যাশবোর্ডে প্রতিদিনের ৬টি সহজ অভ্যাস (যেমন: ২০ মিনিট হাঁটা, পর্যাপ্ত পানি পান, শান্ত ঘুম) টিক দিয়ে আপনার ধারাবাহিকতা ট্র্যাক করতে পারবেন।'
        : 'Your private dashboard allows you to record simple non-negotiable wellness habits (walking, wholesome meals, mindfulness, hydration). It celebrates consistency rather than perfection.',
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* 1. HERO SECTION (85-90vh) */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center bg-[#153D32] text-white px-4 sm:px-6 lg:px-8 py-20">
        {/* Background photo with nature/sunlight overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={settings.heroBgUrl}
            alt="Mindful Peaceful Morning Wellness"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Multi-layered luxury forest overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#153D32]/95 via-[#153D32]/80 to-[#153D32]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0E2922]/50 to-[#0E2922]/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-in fade-in duration-700">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A8BDA5]/25 border border-[#A8BDA5]/40 text-[#DFCA9B] text-xs font-semibold tracking-widest uppercase backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8F6F0] leading-[1.15] max-w-3xl mx-auto">
            {heroTitle}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-[#F8F6F0]/85 font-light leading-relaxed max-w-2xl mx-auto">
            {heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/programs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C6A66A] text-[#153D32] font-semibold text-sm hover:bg-[#DFCA9B] transition-all hover:scale-105 shadow-lg active:scale-95"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/25 backdrop-blur-xs transition-colors"
            >
              <span>{t.hero.ctaSecondary}</span>
            </Link>
          </div>

          {/* Trust Pillars Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-10 border-t border-white/15 max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-2.5 p-2 bg-black/15 rounded-xl border border-white/10">
              <Sun className="w-5 h-5 text-[#DFCA9B] shrink-0" />
              <span className="text-xs font-medium text-white/90 leading-tight">
                {t.hero.trustBadges.habits}
              </span>
            </div>
            <div className="flex items-center gap-2.5 p-2 bg-black/15 rounded-xl border border-white/10">
              <Heart className="w-5 h-5 text-[#DFCA9B] shrink-0" />
              <span className="text-xs font-medium text-white/90 leading-tight">
                {t.hero.trustBadges.nutrition}
              </span>
            </div>
            <div className="flex items-center gap-2.5 p-2 bg-black/15 rounded-xl border border-white/10">
              <Moon className="w-5 h-5 text-[#DFCA9B] shrink-0" />
              <span className="text-xs font-medium text-white/90 leading-tight">
                {t.hero.trustBadges.sessions}
              </span>
            </div>
            <div className="flex items-center gap-2.5 p-2 bg-black/15 rounded-xl border border-white/10">
              <Users className="w-5 h-5 text-[#DFCA9B] shrink-0" />
              <span className="text-xs font-medium text-white/90 leading-tight">
                {t.hero.trustBadges.community}
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 text-[11px] uppercase tracking-wider animate-bounce pointer-events-none">
          <span>{t.hero.scrollDown}</span>
          <ChevronDown className="w-4 h-4 mt-1 text-[#DFCA9B]" />
        </div>
      </section>

      {/* 2. PHILOSOPHY QUOTE BANNER */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C6A66A] font-semibold">
            {philosophyTagline}
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#153D32] font-medium leading-snug">
            {philosophyQuote}
          </blockquote>
          <p className="text-sm text-[#252A27]/70 max-w-xl mx-auto leading-relaxed">
            {isBengali
              ? 'আমরা বিশ্বাস করি দীর্ঘস্থায়ী সুস্বাস্থ্য কোনো একদিনের চরম সিদ্ধান্ত নয়। প্রতিদিনের ছোট ছোট সদর্থক অভ্যাসেই লুকানো রয়েছে সুস্থ জীবনের চাবিকাঠি।'
              : 'Sustainable vitality isn’t built on intense guilt or temporary challenges. It is rooted in how kindly you treat your morning, your plate, your breath, and your sleep.'}
          </p>
        </div>
      </section>

      {/* 3. ABOUT TEASER: Wellness Is More Than Fitness */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80"
                alt="Gentle Morning Mobility and Mindful Walking"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating nature badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-[#153D32] text-white p-4 rounded-2xl shadow-xl border border-[#A8BDA5]/30">
              <ShieldCheck className="w-6 h-6 text-[#DFCA9B]" />
              <div>
                <p className="text-xs font-semibold">{isBengali ? 'প্রাকৃতিক সুস্থতা' : 'Zero Gym Culture'}</p>
                <p className="text-[11px] text-[#A8BDA5]">{isBengali ? 'সহজ ও আনন্দময় অভ্যাস' : 'Gentle, Sustainable Living'}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#153D32] font-semibold bg-[#A8BDA5]/30 px-3 py-1 rounded-full">
              {t.nav.about}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153D32] leading-tight">
              {t.about.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#252A27]/80 leading-relaxed">
              {t.about.p1}
            </p>
            <p className="text-sm sm:text-base text-[#252A27]/80 leading-relaxed">
              {t.about.p2}
            </p>

            {/* Key benefits list */}
            <div className="space-y-3 pt-2">
              {t.about.whyPoints.slice(0, 3).map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#153D32] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#252A27]/85 font-medium">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#153D32] hover:text-[#0E2922] group"
              >
                <span>{t.common.learnMore}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED WELLNESS PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#153D32] font-semibold bg-[#A8BDA5]/30 px-3 py-1 rounded-full">
              {t.programs.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153D32] mt-2">
              {t.programs.heading}
            </h2>
            <p className="text-sm text-[#252A27]/70 mt-1 max-w-xl">
              {t.programs.subheading}
            </p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-[#153D32] text-[#153D32] hover:bg-[#153D32] hover:text-white transition-colors shrink-0"
          >
            <span>{t.common.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog) => {
            const title = isBengali ? (prog.titleBn || prog.title) : prog.title;
            const desc = isBengali ? (prog.shortDescriptionBn || prog.shortDescription) : prog.shortDescription;
            const audience = isBengali ? (prog.suitableAudienceBn || prog.suitableAudience) : prog.suitableAudience;
            const duration = isBengali ? (prog.durationBn || prog.duration) : prog.duration;

            return (
              <div
                key={prog.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#A8BDA5]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-black/10">
                  <img
                    src={prog.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-[#153D32]/90 text-white backdrop-blur-xs">
                      {t.programs.categories[prog.category]}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-[#153D32] group-hover:text-[#C6A66A] transition-colors leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#252A27]/75 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#A8BDA5]/20 text-xs text-[#252A27]/70">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#153D32]">{t.programs.duration}:</span>
                      <span>{duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#153D32]">{t.programs.audience}:</span>
                      <span className="truncate max-w-[180px]" title={audience}>{audience}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#A8BDA5]/20">
                    <div>
                      <span className="text-[10px] text-[#252A27]/60 uppercase tracking-wider block">
                        {t.programs.price}
                      </span>
                      <span className="font-serif text-lg font-bold text-[#153D32]">
                        {prog.price > 0 ? `₹${prog.price.toLocaleString('en-IN')}` : t.programs.freeOrContact}
                      </span>
                    </div>

                    <Link
                      to={`/programs/${prog.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#153D32] text-white hover:bg-[#0E2922] transition-colors shadow-xs"
                    >
                      <span>{t.programs.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. LIVE SESSIONS & WORKSHOPS HIGHLIGHT */}
      <section className="bg-[#153D32] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                {t.events.badge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F6F0] mt-2">
                {t.events.heading}
              </h2>
              <p className="text-sm text-[#A8BDA5] mt-1 max-w-xl">
                {t.events.subheading}
              </p>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-[#A8BDA5] text-white hover:bg-white hover:text-[#153D32] transition-colors shrink-0"
            >
              <span>{t.common.viewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((evt) => {
              const title = isBengali ? (evt.titleBn || evt.title) : evt.title;
              const desc = isBengali ? (evt.descriptionBn || evt.description) : evt.description;

              return (
                <div
                  key={evt.id}
                  className="bg-[#0E2922]/80 rounded-3xl p-6 sm:p-8 border border-[#A8BDA5]/25 flex flex-col justify-between space-y-6 hover:border-[#DFCA9B]/50 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-[#C6A66A]/20 text-[#DFCA9B] border border-[#C6A66A]/30 capitalize">
                        {evt.format === 'online' ? t.events.online : t.events.offline}
                      </span>
                      <EventCountdown targetDate={evt.startAt} />
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A8BDA5] leading-relaxed line-clamp-2">
                      {desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#DFCA9B]" />
                      <span>
                        {new Date(evt.startAt).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#DFCA9B]" />
                      <span>
                        {new Date(evt.startAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        ({evt.timezone})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#A8BDA5]">
                      {t.events.host}: <strong className="text-white">{evt.hostName}</strong>
                    </span>
                    <Link
                      to={`/events/${evt.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#C6A66A] text-[#153D32] hover:bg-[#DFCA9B] transition-colors"
                    >
                      <span>{t.events.registerForEvent}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. NUTRITION & LIFESTYLE ARTICLES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#153D32] font-semibold bg-[#A8BDA5]/30 px-3 py-1 rounded-full">
              {t.nutrition.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153D32] mt-2">
              {t.nutrition.heading}
            </h2>
            <p className="text-sm text-[#252A27]/70 mt-1 max-w-xl">
              {t.nutrition.subheading}
            </p>
          </div>
          <Link
            to="/nutrition"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-[#153D32] text-[#153D32] hover:bg-[#153D32] hover:text-white transition-colors shrink-0"
          >
            <span>{t.common.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => {
            const title = isBengali ? (art.titleBn || art.title) : art.title;
            const summary = isBengali ? (art.summaryBn || art.summary) : art.summary;
            const readTime = isBengali ? (art.readTimeBn || art.readTime) : art.readTime;

            return (
              <div
                key={art.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#A8BDA5]/30 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-black/10">
                    <img
                      src={art.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#252A27]/60">
                      <span className="uppercase tracking-wider font-semibold text-[#153D32]">
                        {art.category}
                      </span>
                      <span>{readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#153D32] leading-snug group-hover:text-[#C6A66A] transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-[#252A27]/75 line-clamp-3 leading-relaxed">
                      {summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-[#A8BDA5]/20 mt-4 text-xs">
                  <span className="text-[#252A27]/60">
                    {t.nutrition.author} <strong className="text-[#153D32]">{art.author}</strong>
                  </span>
                  <Link
                    to={`/nutrition/${art.id}`}
                    className="font-semibold text-[#153D32] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{t.nutrition.readMore}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. COMMUNITY STORIES & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#153D32] font-semibold bg-[#A8BDA5]/30 px-3 py-1 rounded-full">
            {t.community.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#153D32]">
            {t.community.testimonialsHeading}
          </h2>
          <p className="text-sm text-[#252A27]/70">
            {t.community.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => {
            const content = isBengali ? (test.contentBn || test.content) : test.content;
            const highlight = isBengali ? (test.journeyHighlightBn || test.journeyHighlight) : test.journeyHighlight;

            return (
              <div
                key={test.id}
                className="bg-white p-7 rounded-3xl border border-[#A8BDA5]/40 shadow-xs flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  {/* Stars */}
                  <div className="flex gap-1 text-[#C6A66A]">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#153D32] leading-snug">
                    “{highlight}”
                  </h4>
                  <p className="text-xs sm:text-sm text-[#252A27]/80 leading-relaxed italic">
                    {content}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#A8BDA5]/20">
                  {test.authorAvatar ? (
                    <img
                      src={test.authorAvatar}
                      alt={test.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-[#A8BDA5]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#153D32] text-white flex items-center justify-center font-serif text-sm font-bold">
                      {test.authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h5 className="text-xs font-bold text-[#153D32]">{test.authorName}</h5>
                    <p className="text-[11px] text-[#252A27]/60">{test.authorLocation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-[#153D32] text-white hover:bg-[#0E2922] transition-colors"
          >
            <span>{isBengali ? 'আরও অভিজ্ঞতা দেখুন ও আপনার গল্প জমা দিন' : 'Read More Stories & Share Your Experience'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153D32]">
            {t.community.faqHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#252A27]/70">
            {isBengali ? 'সাধারণ কিছু জিজ্ঞাসার সহজ উত্তর' : 'Clear answers to common questions about our community and philosophy.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#A8BDA5]/40 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#153D32]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C6A66A] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#252A27]/80 leading-relaxed border-t border-[#A8BDA5]/20 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. BOTTOM INVITATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#153D32] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl border border-[#A8BDA5]/30">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold">
              {isBengali ? 'আজ থেকেই শুরু হোক পথচলা' : 'Begin Your Mindful Evolution'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {isBengali
                ? 'একসাথে গড়ে তুলি এক সুস্থ ও শান্ত জীবন।'
                : 'Ready to Experience True Daily Well-Being?'}
            </h2>
            <p className="text-sm sm:text-base text-[#A8BDA5] leading-relaxed">
              {isBengali
                ? 'কোনো কঠোরতা বা কৃত্রিম চাপ নেই। আমাদের মুক্ত কমিউনিটিতে যুক্ত হোন এবং অনুভব করুন প্রতিদিনের ইতিবাচক পরিবর্তন।'
                : 'Join hundreds of kindred spirits discovering practical nutrition, peaceful morning circles, and daily encouragement.'}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/member/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C6A66A] text-[#153D32] font-semibold text-xs sm:text-sm hover:bg-[#DFCA9B] transition-transform hover:scale-105 shadow-md"
              >
                {t.nav.joinCommunity}
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold text-xs sm:text-sm hover:bg-white/10 transition-colors"
              >
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
