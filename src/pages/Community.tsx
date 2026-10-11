import React, { useState } from 'react';
import {
  Users,
  Star,
  Sparkles,
  Send,
  Heart,
  Footprints,
  ShieldCheck,
  ChevronDown,
  MessageSquareHeart,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from '../components/Toast';
import { store, useStoreVersion } from '../services/store';

export const Community: React.FC = () => {
  useStoreVersion();
  const { t, isBengali } = useLanguage();
  const { showToast } = useToast();

  const testimonials = store.getTestimonials(true);

  const [form, setForm] = useState({
    authorName: '',
    authorLocation: '',
    rating: 5,
    journeyHighlight: '',
    content: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.authorName.trim() || !form.content.trim()) {
      showToast(isBengali ? 'দয়া করে নাম এবং আপনার অভিজ্ঞতার বিবরণ পূরণ করুন।' : 'Please provide your name and story content.', 'error');
      return;
    }

    store.submitTestimonial({
      authorName: form.authorName.trim(),
      authorLocation: form.authorLocation.trim() || 'Community Member',
      rating: form.rating,
      journeyHighlight: form.journeyHighlight.trim() || 'Mindful habit transformation',
      journeyHighlightBn: form.journeyHighlight.trim() || 'স্বাস্থ্যকর অভ্যাসের পরিবর্তন',
      content: form.content.trim(),
      contentBn: form.content.trim(),
    });

    setIsSubmitted(true);
    showToast(t.community.storyForm.submittedSuccess, 'success');
    setForm({
      authorName: '',
      authorLocation: '',
      rating: 5,
      journeyHighlight: '',
      content: '',
    });
  };

  const faqs = [
    {
      q: isBengali ? 'কমিউনিটি চ্যালেঞ্জে অংশগ্রহণ করতে কি কোনো ফি লাগে?' : 'Is there any fee to join community challenges?',
      a: isBengali
        ? 'না! আমাদের ২১ দিনের সকালের হাঁটা ও মাইন্ডফুলনেস চ্যালেঞ্জে যে কোনো মেম্বার ফ্রিতে অংশগ্রহণ করতে পারবেন।'
        : 'No fee! Our seasonal habit challenges (like the 21-Day Mindful Morning & Walking Circle) are open and complimentary for all registered members.',
    },
    {
      q: isBengali ? 'আমার রিভিউ কখন ওয়েবসাইটে প্রকাশিত হবে?' : 'When will my submitted story be visible?',
      a: isBengali
        ? 'আমাদের ওয়েলনেস টিম স্প্যাম ও সংবেদনশীলতা রোধে প্রতিটি রিভিউ খতিয়ে দেখে ২৪-৪৮ ঘণ্টার মধ্যে অনুমোদন করেন।'
        : 'To ensure a supportive and respectful space, submissions are reviewed by our wellness coordination team and published within 24–48 hours.',
    },
    {
      q: isBengali ? 'সত্ত্ব লিভিং কি কোনো ব্যক্তিগত তথ্য বা শারীরিক ছবি প্রকাশ করে?' : 'Does Sattva Living post before-and-after body pictures?',
      a: isBengali
        ? 'কখনোই নয়। আমরা মানুষের শারীরিক আকার বা ওজন নিয়ে কোনো তুলনা বা বডি শেমিং করি না। আমাদের লক্ষ্য শুধুমাত্র মানসিক শান্তি ও দৈনিক সুস্থ অভ্যাস।'
        : 'Never. We strictly avoid weight-loss comparisons, before-and-after body transformations, or physical ideals. Our focus is entirely on energy, mood, digestion, and routine consistency.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-[#153D32] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.community.badge}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6F0]">
            {t.community.heading}
          </h1>
          <p className="text-base sm:text-lg text-[#A8BDA5] leading-relaxed">
            {t.community.subheading}
          </p>
        </div>
      </section>

      {/* 2. Active 21-Day Habit Challenge Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#153D32] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-[#A8BDA5]/30">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C6A66A]/20 text-[#DFCA9B] border border-[#C6A66A]/30">
              <Footprints className="w-3.5 h-3.5 text-[#DFCA9B]" />
              <span>{t.community.challenges.heading}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              {t.community.challenges.title}
            </h2>
            <p className="text-sm text-[#A8BDA5] leading-relaxed">
              {t.community.challenges.desc}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => showToast(isBengali ? 'আপনি সক্রিয় চ্যালেঞ্জে যুক্ত হয়েছেন! আপনার ড্যাশবোর্ডে প্রতিদিন টিক দিন।' : 'You are participating in the active challenge! Track your progress on your dashboard.', 'success')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C6A66A] text-[#153D32] text-xs font-semibold hover:bg-[#DFCA9B] transition-transform active:scale-95 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.community.challenges.joinChallenge}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Member Stories & Testimonials List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="stories">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#153D32] font-semibold bg-[#A8BDA5]/30 px-3 py-1 rounded-full">
            {isBengali ? 'সদস্যদের অভিজ্ঞতা' : 'Real Member Voices'}
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#153D32]">
            {t.community.testimonialsHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test) => {
            const content = isBengali ? (test.contentBn || test.content) : test.content;
            const highlight = isBengali ? (test.journeyHighlightBn || test.journeyHighlight) : test.journeyHighlight;

            return (
              <div
                key={test.id}
                className="bg-white p-7 rounded-3xl border border-[#A8BDA5]/40 shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-[#C6A66A]">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#153D32] leading-snug">
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
      </section>

      {/* 4. Share Your Experience Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#A8BDA5]/40 shadow-md space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#153D32]">
              <MessageSquareHeart className="w-6 h-6 text-[#C6A66A]" />
              <h3 className="font-serif text-2xl font-bold">{t.community.shareYourStory}</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#252A27]/70 leading-relaxed">
              {t.community.shareNotice}
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-700 mx-auto" />
              <h4 className="font-serif font-bold text-base text-emerald-900">
                {t.community.storyForm.submittedSuccess}
              </h4>
              <p className="text-xs text-emerald-800">
                {isBengali
                  ? 'আমাদের টিম এটি পর্যালোচনা করবে। আপনার প্রেরণা অন্যদের সাহায্য করবে।'
                  : 'Your submission will appear once reviewed by the wellness administrator.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#153D32] block mb-1">
                    {t.community.storyForm.name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.authorName}
                    onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#153D32] block mb-1">
                    {t.community.storyForm.location}
                  </label>
                  <input
                    type="text"
                    value={form.authorLocation}
                    onChange={(e) => setForm({ ...form, authorLocation: e.target.value })}
                    placeholder="e.g., Kolkata / Dhaka"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#153D32] block mb-1">
                  {t.community.storyForm.highlight}
                </label>
                <input
                  type="text"
                  value={form.journeyHighlight}
                  onChange={(e) => setForm({ ...form, journeyHighlight: e.target.value })}
                  placeholder={isBengali ? 'যেমন: সকালের হাঁটা আমার রক্তচাপ ও মানসিক চাপ শান্ত করেছে...' : 'e.g., Daily gentle movement gave me sustained calm focus...'}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#153D32] block mb-1">
                  {t.community.storyForm.content} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder={isBengali ? 'আপনার প্রতিদিনের খাদ্যাভ্যাস, হাঁটা বা ঘুমের পরিবর্তনের অভিজ্ঞতা লিখুন...' : 'Share how gentle routines and community circles have improved your day-to-day well-being...'}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#252A27]/70 font-semibold">{t.community.storyForm.rating}:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="text-[#C6A66A] p-0.5"
                    >
                      <Star className={`w-4 h-4 ${form.rating >= star ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.community.storyForm.submit}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 5. FAQs Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153D32]">
            {t.community.faqHeading}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#A8BDA5]/40 overflow-hidden shadow-2xs"
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
    </div>
  );
};
