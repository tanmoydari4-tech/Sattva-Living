import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from '../components/Toast';
import { store, useStoreVersion } from '../services/store';

export const Contact: React.FC = () => {
  useStoreVersion();
  const { t, isBengali } = useLanguage();
  const { showToast } = useToast();
  const settings = store.getSettings();

  const brandName = isBengali ? (settings.brandNameBn || settings.brandName) : settings.brandName;
  const address = isBengali ? (settings.addressBn || settings.address) : settings.address;

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    category: 'general' as const,
    message: '',
    consentGiven: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consentGiven) {
      showToast(isBengali ? 'দয়া করে গোপনীয়তা সম্মতির বক্সে টিক দিন।' : 'Please accept the privacy consent checkbox.', 'error');
      return;
    }

    store.submitEnquiry({
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      category: form.category,
      message: form.message.trim(),
      consentGiven: true,
    });

    setSubmitted(true);
    showToast(isBengali ? 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।' : 'Enquiry sent! Our wellness coordinator will reach out shortly.', 'success');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-[#153D32] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.nav.contact}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F6F0]">
            {isBengali ? 'আমাদের সাথে যোগাযোগ করুন' : 'Connect with Our Wellness Sanctuary'}
          </h1>
          <p className="text-base sm:text-lg text-[#A8BDA5] leading-relaxed">
            {isBengali
              ? 'যেকোনো জিজ্ঞাসা, পরামর্শ বা ব্যক্তিগত ওয়েলনেস গাইডেন্সের জন্য নির্দ্বিধায় বার্তা পাঠান।'
              : 'Have a question about gentle routines, nutrition, or joining our community? We are here to guide you.'}
          </p>
        </div>
      </section>

      {/* 2. Contact Grid: Details + Interactive Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Details & WhatsApp (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153D32]">
                {isBengali ? 'আমরা শুনছি আপনার কথা' : 'We Welcome Your Inquiries'}
              </h2>
              <p className="text-xs sm:text-sm text-[#252A27]/75 leading-relaxed">
                {isBengali
                  ? 'আমাদের টিম সদস্যদের প্রতিটি বার্তার প্রতি যত্নশীল। আমাদের সাথে সরাসরি ফোনে, ইমেইলে অথবা হোয়াটসঅ্যাপে যুক্ত হতে পারেন।'
                  : 'Our certified mentors and coordinators respond to inquiries with kindness and clarity. No aggressive sales, no unsolicited pressure.'}
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-2xl border border-[#A8BDA5]/40 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#153D32] text-[#DFCA9B] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#153D32] uppercase tracking-wider">{isBengali ? 'ঠিকানা' : 'Physical Sanctuary'}</h4>
                  <p className="text-xs text-[#252A27]/80 mt-1 leading-relaxed">{address}</p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#A8BDA5]/40 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#153D32] text-[#DFCA9B] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#153D32] uppercase tracking-wider">{isBengali ? 'ইমেইল' : 'Email Care'}</h4>
                  <a href={`mailto:${settings.contactEmail}`} className="text-xs text-[#153D32] font-semibold hover:underline mt-1 block">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#A8BDA5]/40 shadow-2xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#153D32] text-[#DFCA9B] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#153D32] uppercase tracking-wider">{isBengali ? 'টেলিফোন' : 'Phone Line'}</h4>
                  <a href={`tel:${settings.contactPhone}`} className="text-xs text-[#153D32] font-semibold hover:underline mt-1 block">
                    {settings.contactPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Action Button */}
            {settings.whatsAppNumber && (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-700" />
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    {isBengali ? 'হোয়াটসঅ্যাপে দ্রুত কথোপকথন' : 'Instant WhatsApp Guidance'}
                  </h4>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {isBengali
                    ? 'প্রোগ্রামের সময়সূচি বা যেকোনো প্রশ্ন জানতে আমাদের কো-অর্ডিনেটরকে সরাসরি হোয়াটসঅ্যাপে বার্তা পাঠান।'
                    : 'Chat directly with our care coordinator on WhatsApp for quick scheduling questions.'}
                </p>
                <a
                  href={`https://wa.me/${settings.whatsAppNumber}?text=Hello%20${encodeURIComponent(brandName)},%20I%20have%20an%20inquiry%20regarding%20your%20programs.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  <span>{isBengali ? 'হোয়াটসঅ্যাপ শুরু করুন' : 'Start WhatsApp Chat'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Form (Cols 6-12) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#A8BDA5]/40 shadow-lg space-y-6">
              {submitted ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#153D32]">
                    {isBengali ? 'বার্তা সফলভাবে প্রেরিত হয়েছে' : 'Thank You for Reaching Out'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#252A27]/75 max-w-md mx-auto leading-relaxed">
                    {isBengali
                      ? 'আমরা আপনার বার্তা পেয়েছি। আমাদের একজন ওয়েলনেস গাইড দ্রুত আপনার ইমেইলে উত্তর প্রদান করবেন।'
                      : 'We have received your enquiry and will respond within 24 hours. May your day be peaceful and nourishing.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        email: '',
                        mobile: '',
                        category: 'general',
                        message: '',
                        consentGiven: false,
                      });
                    }}
                    className="mt-4 px-6 py-2 rounded-full border border-[#153D32] text-[#153D32] text-xs font-semibold hover:bg-[#153D32] hover:text-white transition-colors"
                  >
                    {isBengali ? 'অন্য বার্তা পাঠান' : 'Send Another Note'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#153D32]">
                    {isBengali ? 'আমাদের একটি বার্তা পাঠান' : 'Send Us a Message'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#153D32] block mb-1">
                        {isBengali ? 'আপনার সম্পূর্ণ নাম' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#153D32] block mb-1">
                        {isBengali ? 'ইমেইল অ্যাড্রেস' : 'Email Address'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#153D32] block mb-1">
                        {isBengali ? 'মোবাইল নম্বর (ঐচ্ছিক)' : 'Mobile Phone (Optional)'}
                      </label>
                      <input
                        type="tel"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        placeholder="+91..."
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#153D32] block mb-1">
                        {isBengali ? 'জিজ্ঞাসার ধরণ' : 'Inquiry Category'}
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                      >
                        <option value="general">{isBengali ? 'সাধারণ জিজ্ঞাসা' : 'General Question'}</option>
                        <option value="programs">{isBengali ? 'প্রোগ্রাম সংক্রান্ত' : 'Wellness Programs'}</option>
                        <option value="consultation">{isBengali ? 'ব্যক্তিগত পরামর্শ' : 'Personal 1-on-1 Consultation'}</option>
                        <option value="community">{isBengali ? 'কমিউনিটি যুক্ত হওয়া' : 'Community & Challenges'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#153D32] block mb-1">
                      {isBengali ? 'আপনার বার্তা বা বিস্তারিত' : 'Your Note or Question'} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={isBengali ? 'কীভাবে আমরা আপনাকে সহযোগিতা করতে পারি?' : 'How can we support your daily wellness journey?'}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={form.consentGiven}
                      onChange={(e) => setForm({ ...form, consentGiven: e.target.checked })}
                      className="mt-0.5 rounded-sm border-gray-300 text-[#153D32] focus:ring-[#153D32]"
                    />
                    <label htmlFor="consent" className="text-[11px] text-[#252A27]/70 leading-relaxed cursor-pointer">
                      {isBengali
                        ? 'আমি সম্মতি দিচ্ছি যে আমার প্রদত্ত তথ্য এই বার্তার উত্তর দেওয়ার উদ্দেশ্যে সংরক্ষিত হতে পারে।'
                        : 'I consent to having Sattva Living store and process my submitted contact details to respond to this inquiry.'}
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isBengali ? 'বার্তা পাঠান' : 'Submit Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
