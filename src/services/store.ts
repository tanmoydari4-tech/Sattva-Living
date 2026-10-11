import { useState, useEffect } from 'react';
import {
  User,
  Program,
  Enrollment,
  WellnessEvent,
  EventRegistration,
  Article,
  Testimonial,
  GalleryItem,
  Enquiry,
  HabitLog,
  Announcement,
  PaymentRecord,
  WebsiteSettings,
} from '../types';
import {
  syncUserToSupabase,
  syncEnrollmentToSupabase,
  syncEventRegistrationToSupabase,
  syncEnquiryToSupabase,
  syncHabitLogToSupabase,
  syncPaymentToSupabase,
  syncContentItemToSupabase,
  fetchAllCloudSyncFromSupabase,
  fetchEnquiriesFromSupabase,
} from './supabase';

// Default Website Settings
export const initialSettings: WebsiteSettings = {
  brandName: 'Sattva Living',
  brandNameBn: 'সত্ত্ব লিভিং',
  tagline: 'Feel Better. Live Healthier. Grow Together.',
  taglineBn: 'সুস্থ অনুভব করুন। উন্নত জীবনযাপন করুন। একসাথে এগিয়ে চলুন।',
  philosophy: 'Small daily habits. Better lifestyle. A healthier future.',
  philosophyBn: 'ছোট ছোট দৈনন্দিন অভ্যাস। উন্নত জীবনধারা। একটি সুস্থ আগামী।',
  contactEmail: 'tanmoydari4@gmail.com',
  contactPhone: '+91 94335 23525',
  whatsAppNumber: '919433523525',
  address: '14/B Harmony Lane, Green Park, Kolkata 700029, West Bengal, India',
  addressBn: '১৪/বি হারমনি লেন, গ্রিন পার্ক, কলকাতা ৭০০০২৯, পশ্চিমবঙ্গ, ভারত',
  socialLinks: {
    instagram: 'https://instagram.com/sattvaliving',
    facebook: 'https://facebook.com/sattvaliving',
    youtube: 'https://youtube.com/@sattvaliving',
    telegram: 'https://t.me/sattvacommunity',
  },
  heroTitle: 'Build a Healthier Life, One Habit at a Time.',
  heroTitleBn: 'ছোট ছোট অভ্যাসের মাধ্যমে গড়ে তুলুন সুস্থ ও সুন্দর জীবন।',
  heroSubtitle: 'Discover a more balanced lifestyle through nutrition education, daily wellness habits, expert guidance, and a supportive community.',
  heroSubtitleBn: 'সঠিক পুষ্টি শিক্ষা, স্বাস্থ্যকর দৈনন্দিন অভ্যাস, বিশেষজ্ঞ দিকনির্দেশনা এবং একটি ইতিবাচক কমিউনিটির সাথে আবিষ্কার করুন মানসিক ও শারীরিক ভারসাম্য।',
  heroBgUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=80',
  testPaymentModeEnabled: true,
  razorpayKeyId: 'rzp_test_sattvaWellness2026',
  defaultLanguage: 'en',
};

// Initial Programs (Strictly wellness, nutrition, gentle habits - NOT GYM)
export const initialPrograms: Program[] = [
  {
    id: 'prog-1',
    title: 'Daily Lifestyle & Habit Coaching',
    titleBn: 'দৈনন্দিন লাইফস্টাইল ও অভ্যাস কোচিং',
    slug: 'daily-lifestyle-habit-coaching',
    category: 'lifestyle',
    shortDescription: 'Build lasting daily habits for sustained energy, stress resilience, and mindful living.',
    shortDescriptionBn: 'দীর্ঘমেয়াদী সুস্থ অভ্যাস গড়ে তুলুন যা সারা দিন সতেজ শক্তি ও মানসিক স্থায়িত্ব বজায় রাখবে।',
    fullDescription: 'A comprehensive 8-week structured journey designed to help you gently reshape your daily flow. Learn micro-habits, boundary setting around work and rest, mindful hydration, and restorative evening transitions without burnout or rigid rules.',
    fullDescriptionBn: '৮ সপ্তাহের একটি পূর্ণাঙ্গ কর্মসূচি যা আপনার প্রাত্যহিক জীবনযাত্রাকে সহজে পরিবর্তন করতে সাহায্য করবে। কোনো কঠোর নিয়ম ছাড়াই প্রতিদিনের সহজ অভ্যাস ও মানসিক শান্তির চর্চা শিখুন।',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80',
    suitableAudience: 'Working professionals, students, and anyone feeling drained by modern lifestyle chaos.',
    suitableAudienceBn: 'ব্যস্ত কর্মজীবী, শিক্ষার্থী এবং যারা আধুনিক জীবনের ক্লান্তিতে ভুগছেন।',
    duration: '8 Weeks (Self-paced + weekly group circle)',
    durationBn: '৮ সপ্তাহ (সাপ্তাহিক অনলাইন সার্কেল সহ)',
    price: 2499,
    isPaid: true,
    published: true,
    features: [
      'Personalized habit blueprint',
      'Weekly live community reflection call',
      'Digital printable habit journaling prompts',
      'Direct mentor messaging support',
    ],
    featuresBn: [
      'ব্যক্তিগত অভ্যাস পরিকল্পনা গাইড',
      'সাপ্তাহিক লাইভ গ্রুপ আলোচনা সেশন',
      'দৈনিক জার্নালিং ও ট্র্যাকার শিট',
      'ওয়েলনেস কোচের সাথে সরাসরি পরামর্শ',
    ],
    scheduleDetails: 'Sundays 6:30 PM IST (Online Zoom Circle)',
    scheduleDetailsBn: 'প্রতি রবিবার সন্ধ্যা ৬:৩০ IST (অনলাইন জুম সার্কেল)',
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-01T10:00:00Z',
  },
  {
    id: 'prog-2',
    title: 'Whole-Food Nutrition & Plate Balancing',
    titleBn: 'সুষম পুষ্টি ও স্বাস্থ্যকর খাদ্য শিক্ষা',
    slug: 'whole-food-nutrition-education',
    category: 'nutrition',
    shortDescription: 'Learn practical, evidence-informed plate balancing without calorie counting or extreme diets.',
    shortDescriptionBn: 'কোনো কঠোর ডায়েট বা খাবারের সীমাবদ্ধতা ছাড়াই সুষম ও পুষ্টিকর খাবার গ্রহণের বিজ্ঞানসম্মত শিক্ষা।',
    fullDescription: 'Understand how real ingredients work with your digestion, natural circadian rhythms, and mood. We cover local seasonal produce, decoding food labels, mindful eating practices, and family-friendly meal ideas that honor tradition and health.',
    fullDescriptionBn: 'কীভাবে আমাদের স্থানীয় শাকসবজি, ফলমূল ও প্রাকৃতিক খাদ্য শরীর ও মনের ওপর ইতিবাচক প্রভাব ফেলে তা জানুন। খাবারের মোড়কের লেবেল পড়া এবং পরিবারের জন্য পুষ্টিকর খাবার তৈরির ব্যবহারিক নির্দেশনা।',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
    suitableAudience: 'Anyone seeking food freedom, better digestion, and sustainable nutrition awareness.',
    suitableAudienceBn: 'যারা সুষম খাদ্যাভ্যাস ও স্বাস্থ্যকর খাবার পছন্দ করেন কিন্তু জটিল ডায়েট চান না।',
    duration: '6 Weeks (Comprehensive Video Modules + QA)',
    durationBn: '৬ সপ্তাহ (ভিডিও মডিউল ও প্রশ্নোত্তর)',
    price: 1999,
    isPaid: true,
    published: true,
    features: [
      'Evidence-based plate balancing guides',
      'Seasonal vegetable & fruit diversity charts',
      'Mindful eating audio practices',
      'Q&A sessions with certified nutritionists',
    ],
    featuresBn: [
      'সুষম খাদ্য থালার ব্যবহারিক নির্দেশিকা',
      'মৌসুমি ফল ও শাকসবজির পুষ্টি তালিকা',
      'মনোযোগ দিয়ে খাবার খাওয়ার নির্দেশিকা',
      'সার্টিফাইড পুষ্টিবিদের সাথে প্রশ্নোত্তর',
    ],
    scheduleDetails: 'Thursdays 7:30 PM IST (Recorded + Live QA)',
    scheduleDetailsBn: 'প্রতি বৃহস্পতিবার সন্ধ্যা ৭:৩০ IST',
    createdAt: '2026-09-05T10:00:00Z',
    updatedAt: '2026-09-05T10:00:00Z',
  },
  {
    id: 'prog-3',
    title: 'Gentle Morning Wellness & Awakening Circles',
    titleBn: 'সকালের স্নিগ্ধ ওয়েলনেস ও স্ট্রেচিং সার্কেল',
    slug: 'morning-wellness-sessions',
    category: 'morning',
    shortDescription: 'Start your morning with calm breathwork, gentle mobility stretches, and peaceful intention.',
    shortDescriptionBn: 'শান্ত শ্বাসপ্রশ্বাস, হালকা স্ট্রেচিং এবং ইতিবাচক মনোভাব নিয়ে দিনের শুরু করুন।',
    fullDescription: 'Begin your day with tranquility before the rush of notifications. 30 minutes of gentle joint mobility, peaceful diaphragmatic breathing, spinal awakening stretches, and an uplifting thought to carry throughout the day.',
    fullDescriptionBn: 'দিনের ব্যস্ততা শুরু হওয়ার আগেই মাত্র ৩০ মিনিটে নিজেকে সতেজ করে তুলুন। হালকা অঙ্গ সঞ্চালন, শ্বাস-প্রশ্বাসের ব্যায়াম ও মন শান্ত করার চর্চা।',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    suitableAudience: 'Early risers or those wanting to establish a peaceful morning routine.',
    suitableAudienceBn: 'যারা সকালে শান্তভাবে দিন শুরু করতে চান এবং সারাদিন সতেজ থাকতে চান।',
    duration: 'Monthly Pass (Monday to Friday Live)',
    durationBn: 'মাসিক পাস (সোম থেকে শুক্র লাইভ)',
    price: 1299,
    isPaid: true,
    published: true,
    features: [
      'Daily 30-min live virtual awakening circle',
      'Gentle stretches accessible for any mobility level',
      'Guided breathwork for calm nervous system',
      'On-demand session recording archive',
    ],
    featuresBn: [
      'প্রতিদিন ৩০ মিনিটের লাইভ ভার্চুয়াল সেশন',
      'যে কোনো বয়সের মানুষের জন্য উপযোগী হালকা স্ট্রেচিং',
      'স্নায়ু শান্ত করার জন্য শ্বাস-প্রশ্বাসের ব্যায়াম',
      'রেকর্ডেড ভিডিও আর্কাইভ সুবিধা',
    ],
    scheduleDetails: 'Mon-Fri 6:30 AM - 7:00 AM IST',
    scheduleDetailsBn: 'সোম-শুক্র সকাল ৬:৩০ - ৭:০০ IST',
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-10T10:00:00Z',
  },
  {
    id: 'prog-4',
    title: 'Evening Wind-Down & Restorative Sleep Sanctuary',
    titleBn: 'সন্ধ্যার প্রশান্তি ও গভীর ঘুমের প্রস্তুতি সেশন',
    slug: 'evening-wind-down-sleep',
    category: 'evening',
    shortDescription: 'Release workplace stress, quiet an overactive mind, and prepare for deep regenerative sleep.',
    shortDescriptionBn: 'সারা দিনের মানসিক চাপ মুক্ত করে শান্ত গভীর ঘুমের জন্য শরীর ও মনকে প্রস্তুত করুন।',
    fullDescription: 'Combat modern screen fatigue and sleep disruption. We guide you through gentle somatic relaxation, nervous system down-regulation, evening reflection, and science-backed sleep hygiene habits to restore restorative rest.',
    fullDescriptionBn: 'মোবাইল বা কম্পিউটারের নীল আলোর ক্লান্তি দূর করে শরীরকে শিথিল করুন। মৃদু রিল্যাক্সেশন টেকনিক ও মানসিক চাপ কমানোর সহজ কৌশল।',
    imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
    suitableAudience: 'Anyone experiencing sleep difficulties, high anxiety, or bedtime restlessness.',
    suitableAudienceBn: 'যাদের রাতে ঘুমাতে সমস্যা হয় বা অতিরিক্ত দুশ্চিন্তায় ভোগেন।',
    duration: 'Monthly Pass (Tuesday & Thursday Evenings)',
    durationBn: 'মাসিক পাস (মঙ্গল ও বৃহস্পতি রাত)',
    price: 1199,
    isPaid: true,
    published: true,
    features: [
      'Guided Yoga Nidra and body scan relaxation',
      'Practical digital detox protocols',
      'Herbal infusion and evening routine guides',
      'Soothing audio tracks for sleep',
    ],
    featuresBn: [
      'যোগ নিদ্রা ও গভীর শিথিলকরণ মেডিটেশন',
      'ডিজিটাল স্ক্রিন থেকে মন সরিয়ে আনার সহজ উপায়',
      'রাতে ঘুমানোর অনুকূল পরিবেশ তৈরির টিপস',
      'শান্তিদায়ক অডিও ট্র্যাক সংগ্রহ',
    ],
    scheduleDetails: 'Tue & Thu 9:15 PM - 9:45 PM IST',
    scheduleDetailsBn: 'মঙ্গল ও বৃহস্পতি রাত ৯:১৫ - ৯:৪৫ IST',
    createdAt: '2026-09-12T10:00:00Z',
    updatedAt: '2026-09-12T10:00:00Z',
  },
  {
    id: 'prog-5',
    title: '1-on-1 Personal Wellness & Routine Consultation',
    titleBn: '১-অন-১ ব্যক্তিগত ওয়েলনেস পরামর্শ ও মূল্যায়ন',
    slug: 'personal-wellness-consultation',
    category: 'consultation',
    shortDescription: 'A private 60-minute deep-dive consultation to craft a compassionate, personalized lifestyle plan.',
    shortDescriptionBn: 'আপনার ব্যক্তিগত জীবনযাত্রা ও লক্ষ্য অনুযায়ী ৬০ মিনিটের একক পরামর্শ সেশন।',
    fullDescription: 'Sit down virtually with our senior lifestyle mentor. We explore your daily schedule, stress triggers, dietary habits, walking frequency, and sleep patterns to co-create a gentle, achievable plan that fits your exact life situation.',
    fullDescriptionBn: 'আমাদের অভিজ্ঞ ওয়েলনেস মেন্টরের সাথে ব্যক্তিগত সেশনে আপনার দৈনন্দিন রুটিন, কাজের চাপ ও খাদ্যাভ্যাস বিশ্লেষণ করে আপনার উপযোগী একটি পরিকল্পনা তৈরি করুন।',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    suitableAudience: 'Individuals seeking bespoke guidance tailored to their specific career, family, and energy needs.',
    suitableAudienceBn: 'যাদের নির্দিষ্ট জীবনযাত্রার জন্য ব্যক্তিগত দিকনির্দেশনা প্রয়োজন।',
    duration: '60 Min Live Session + 2 Weeks Follow-up Check',
    durationBn: '৬০ মিনিট লাইভ সেশন + ২ সপ্তাহের ফলো-আপ',
    price: 2999,
    isPaid: true,
    published: true,
    features: [
      'Comprehensive lifestyle assessment intake',
      '1-on-1 private video consultation (60 mins)',
      'Customized PDF lifestyle & routine roadmap',
      'Two-week progress email check-in',
    ],
    featuresBn: [
      'জীবনধারা মূল্যায়ন বিশ্লেষণ',
      '৬০ মিনিটের ওয়ান-অন-ওয়ান ভিডিও মিটিং',
      'ব্যক্তিগত লাইফস্টাইল রোডম্যাপ পিডিএফ',
      '২ সপ্তাহ পর অগ্রগতি পর্যালোচনা',
    ],
    scheduleDetails: 'Flexible slot booking via calendar',
    scheduleDetailsBn: 'সুবিধাজনক সময়ে স্লট নির্বাচন',
    createdAt: '2026-09-15T10:00:00Z',
    updatedAt: '2026-09-15T10:00:00Z',
  },
  {
    id: 'prog-6',
    title: 'Sattva Community Circle Membership',
    titleBn: 'সত্ত্ব কমিউনিটি সার্কেল সদস্যপদ',
    slug: 'sattva-community-circle',
    category: 'community',
    shortDescription: 'Continuous motivation, monthly habit challenges, educational workshops, and warm accountability.',
    shortDescriptionBn: 'ধারাবাহিক প্রেরণা, মাসিক কমিউনিটি চ্যালেঞ্জ এবং সমমনা মানুষের বন্ধুত্বপূর্ণ সঙ্গ।',
    fullDescription: 'Belonging to a positive group makes healthy living enjoyable. Gain ongoing access to our private community forums, member-only workshops, seasonal health challenges, resource vault, and monthly book & wisdom circles.',
    fullDescriptionBn: 'একটি ইতিবাচক বন্ধুসুলভ দলের সাথে থাকলে সুস্থ থাকা অনেক সহজ ও আনন্দের হয়। নিয়মিত ওয়ার্কশপ, মাসিক অভ্যাস চ্যালেঞ্জ এবং আলোচনায় যুক্ত থাকুন।',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    suitableAudience: 'Anyone who values peer encouragement, shared learning, and a non-judgmental space.',
    suitableAudienceBn: 'যারা পারস্পরিক অনুপ্রেরণা ও একটি ইতিবাচক সমাজ ভালোবাসেন।',
    duration: 'Annual Membership',
    durationBn: 'বার্ষিক সদস্যপদ',
    price: 3499,
    isPaid: true,
    published: true,
    features: [
      'Access to all monthly live community workshops',
      'Participation in 21-day guided seasonal habit challenges',
      'Complete library of past masterclass recordings',
      'Private moderated member discussion forum',
    ],
    featuresBn: [
      'মাসিক সব কমিউনিটি ওয়ার্কশপে অংশগ্রহণ',
      '২১ দিনের স্বাস্থ্যকর অভ্যাস চ্যালেঞ্জ',
      'পূর্বের সকল মাস্টারক্লাস ভিডিওর উন্মুক্ত প্রবেশাধিকার',
      'সদস্যদের জন্য ব্যক্তিগত মুক্ত আলোচনার প্ল্যাটফর্ম',
    ],
    scheduleDetails: 'Monthly masterclasses & ongoing community circle',
    scheduleDetailsBn: 'মাসিক মাস্টারক্লাস ও সার্বক্ষণিক ফোরাম',
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
  },
];

// Initial Events
export const initialEvents: WellnessEvent[] = [
  {
    id: 'evt-1',
    title: 'The Art of Mindful Walking & Outdoor Presence',
    titleBn: 'মাইন্ডফুল হাঁটা ও প্রকৃতির মাঝে সচেতন উপস্থিতির কর্মশালা',
    description: 'Learn how simple 20-minute daily walking can reset your nervous system, stimulate gentle lymph circulation, and restore calm focus without intense exhaustion.',
    descriptionBn: 'কীভাবে প্রতিদিন মাত্র ২০ মিনিট সচেতনভাবে হাঁটার মাধ্যমে মানসিক চাপ কমিয়ে মনকে শান্ত করা যায় তা শিখুন।',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80',
    startAt: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    endAt: new Date(Date.now() + 86400000 * 2 + 3600000 * 1.5).toISOString(),
    timezone: 'Asia/Kolkata (IST)',
    format: 'online',
    meetingUrl: 'https://meet.google.com/stv-wnss-2026',
    hostName: 'Dr. Ananya Roy',
    hostBio: 'Holistic Lifestyle Educator & Mindful Movement Advocate with 12+ years experience.',
    hostBioBn: 'হোলিস্টিক লাইফস্টাইল শিক্ষিকা এবং সচেতন শরীরচর্চার গবেষক।',
    capacity: 100,
    registeredCount: 42,
    registrationDeadline: new Date(Date.now() + 86400000 * 1.8).toISOString(),
    status: 'upcoming',
    price: 0,
    category: 'workshop',
    createdAt: '2026-09-18T10:00:00Z',
  },
  {
    id: 'evt-2',
    title: 'Seasonal Gut Harmony & Nourishing Warm Meals',
    titleBn: 'মৌসুমি হজম স্বাস্থ্য ও পুষ্টিকর উষ্ণ খাবারের মাস্টারক্লাস',
    description: 'Explore natural kitchen wisdom, spices for gentle digestion, and how to create balanced seasonal bowls that soothe your gut and sustain long-term immunity.',
    descriptionBn: 'সহজ ঘরোয়া মসলা, সঠিক খাদ্যাভ্যাস ও পরিপাকতন্ত্র সুস্থ রাখার প্রাকৃতিক উপায় নিয়ে একটি বিশেষ সেশন।',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    startAt: new Date(Date.now() + 86400000 * 5).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 5 + 3600000 * 1.5).toISOString(),
    timezone: 'Asia/Kolkata (IST)',
    format: 'online',
    meetingUrl: 'https://meet.google.com/stv-gut-harmon',
    hostName: 'Chef Rahul Sen & Nutritionist Ritu Das',
    hostBio: 'Specialists in whole food culinary medicine and practical balanced meal formulation.',
    hostBioBn: 'সুষম খাদ্য রান্না ও পুষ্টি বিজ্ঞানের অভিজ্ঞ পরামর্শক।',
    capacity: 75,
    registeredCount: 31,
    registrationDeadline: new Date(Date.now() + 86400000 * 4.5).toISOString(),
    status: 'upcoming',
    price: 299,
    category: 'discussion',
    createdAt: '2026-09-20T10:00:00Z',
  },
  {
    id: 'evt-3',
    title: 'Full Moon Sound & Breath Relaxation Circle',
    titleBn: 'পূর্ণিমা স্নিগ্ধ শব্দ ও শ্বাসপ্রশ্বাস রিল্যাক্সেশন সার্কেল',
    description: 'An immersive virtual evening circle featuring singing bowls, guided body unwinding, and deep coherent breathwork to melt away built-up tension.',
    descriptionBn: 'মধুর সুর ও শান্ত শ্বাসপ্রশ্বাসের মাধ্যমে সারা সপ্তাহের ক্লান্তি দূর করার এক আনন্দময় সন্ধ্যা।',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80',
    startAt: new Date(Date.now() + 86400000 * 9).toISOString(),
    endAt: new Date(Date.now() + 86400000 * 9 + 3600000).toISOString(),
    timezone: 'Asia/Kolkata (IST)',
    format: 'online',
    meetingUrl: 'https://meet.google.com/stv-moon-relax',
    hostName: 'Devika Mukherjee',
    hostBio: 'Sound therapy practitioner and meditation guide.',
    hostBioBn: 'মেডিটেশন গাইড ও সাউন্ড থেরাপি প্র্যাকটিশনার।',
    capacity: 150,
    registeredCount: 88,
    registrationDeadline: new Date(Date.now() + 86400000 * 8.5).toISOString(),
    status: 'upcoming',
    price: 0,
    category: 'meditation',
    createdAt: '2026-09-22T10:00:00Z',
  },
];

// Initial Articles
export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Why Gentle Daily Walking Outperforms High-Intensity Burnout',
    titleBn: 'কেন অতিরিক্ত ক্লান্তিকর ব্যায়ামের চেয়ে নিয়মিত হাঁটা শরীর ও মনের জন্য অধিক উপকারী',
    slug: 'why-gentle-walking-outperforms-burnout',
    summary: 'Discover how daily 20 to 30-minute steady-state walking optimizes mitochondrial health, reduces cortisol, and supports deep metabolic longevity without body strain.',
    summaryBn: 'নিয়মিত ২০-৩০ মিনিট হাঁটা কীভাবে শরীরের স্ট্রেস হরমোন কমায় এবং দীর্ঘমেয়াদী সুস্থতা প্রদান করে তা জানুন।',
    content: `For decades, popular culture convinced millions that unless exercise leaves you drenched in pain and exhaustion, it doesn't count. Modern exercise physiology paints a vastly different picture.

### The Power of Low-Intensity Movement (NEAT)
Non-Exercise Activity Thermogenesis (NEAT)—the energy spent walking, stretching, taking stairs, and moving naturally throughout the day—comprises up to 15-20% of your daily energy expenditure, whereas a 30-minute frantic gym session accounts for less than 5%.

### Lowering Cortisol and Protecting Digestion
Intense, punishing workouts trigger the sympathetic nervous system, driving up cortisol and inflammation when a person is already overwhelmed with work stress. Conversely, walking in natural daylight:
1. Lowers resting pulse and blood pressure.
2. Stimulates the lymphatic pump, which relies entirely on muscular movement.
3. Enhances insulin sensitivity gently and safely without stressing your joints.

### How to Start Today
Start with two 15-minute walks: one after lunch to support blood sugar regulation, and one in the gentle early morning or sunset air. No equipment needed—just your comfortable shoes and presence.`,
    contentBn: `বহু বছর ধরে প্রচলিত একটি ভুল ধারণা ছিল যে শরীরচর্চা মানেই ক্লান্তিকর ভারী ওজন তোলা বা কষ্টকর পরিশ্রম। আধুনিক চিকিৎসাবিজ্ঞান কিন্তু সম্পূর্ণ ভিন্ন কথা বলে।

### দৈনন্দিন স্বাভাবিক চলাফেরার শক্তি
সারা দিন স্বাভাবিকভাবে হাঁটাচলা ও অঙ্গ সঞ্চালন আপনার শরীরের মেটাবলিজম সক্রিয় রাখতে সবচেয়ে বেশি কার্যকর।

### মানসিক চাপ হ্রাস ও পরিপাকতন্ত্রের সুরক্ষা
কাজের চাপের মধ্যে অতিরিক্ত ভারী ব্যায়াম করলে শরীরে কর্টিসল নামক স্ট্রেস হরমোন বেড়ে যেতে পারে। পক্ষান্তরে, মুক্ত বাতাসে প্রতিদিন ২০-৩০ মিনিট সাধারণ গতিতে হাঁটলে:
১. রক্তচাপ ও হৃদস্পন্দন স্বাভাবিক থাকে।
২. রক্তে শর্করার মাত্রা নিয়ন্ত্রণে থাকে।
৩. রাতে চমৎকার ঘুম হয়।

আজ থেকেই শুরু করুন—খাবারের পর ১০-১৫ মিনিট হাঁটুন এবং সকালের মিষ্টি রোদে কিছুক্ষণ শ্বাস নিন।`,
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1000&q=80',
    author: 'Dr. Ananya Roy',
    authorRole: 'Lifestyle Medicine Educator',
    publishedDate: '2026-09-15',
    readTime: '4 min read',
    readTimeBn: '৪ মিনিট পড়ার সময়',
    category: 'movement',
    published: true,
    tags: ['Walking', 'Gentle Movement', 'Cortisol Balance', 'Habits'],
  },
  {
    id: 'art-2',
    title: 'The Balanced Plate: Eating for Calm Focus Rather Than Restriction',
    titleBn: 'সুষম খাদ্য থালা: খাবার বন্ধ না করে সঠিক খাবার চেনার সহজ উপায়',
    slug: 'the-balanced-plate-calm-focus',
    summary: 'A simple visual framework to build satisfying, colorful meals with fiber, healthy fats, and quality proteins that keep your energy steady for 4-5 hours.',
    summaryBn: 'কোনো চরম ডায়েট ছাড়াই প্রাকৃতিক শাকসবজি, প্রোটিন ও স্বাস্থ্যকর তেলের সমন্বয়ে সুষম থালা তৈরির ব্যবহারিক নিয়ম।',
    content: `Restrictive diets invariably lead to guilt, binge cycles, and nutritional deficiencies. True nourishment is about abundance of vibrant whole foods.

### The 3-Part Plate Framework
- **Half the Plate (Vibrant Fiber):** Colorful seasonal greens, crunchy local vegetables, carrots, bell peppers, or steamed greens.
- **One Quarter (Sustained Protein):** Lentils, sprouted legumes, paneer, tofu, boiled eggs, or nuts.
- **One Quarter (Complex Carbohydrates):** Brown rice, red rice, millets, sweet potatoes, or whole-grain flatbreads.

### The Role of Healthy Fats
Never fear natural fats: cold-pressed mustard or coconut oil, a drizzle of pure ghee, soaked almonds, or flaxseeds slow down gastric emptying, ensuring you don't experience sharp glucose crashes at 3 PM.`,
    contentBn: `খাবার খাওয়া বন্ধ করে রোগা হওয়া কখনোই সুস্থতার পথ নয়। সঠিক পুষ্টি হলো পুষ্টিকর উপাদানের পর্যাপ্ত উপস্থিতি।

### সুষম থালার সহজ তিন ভাগ
- **অর্ধেক থালা (শাকসবজি ও ফাইবার):** মৌসুমি শাক, রঙিন শাকসবজি ও সালাদ।
- **এক চতুর্থাংশ (প্রোটিন):** ডাল, ছোলা, পনির, টোফু, ডিম বা বাদাম।
- **এক চতুর্থাংশ (শর্করা):** লাল চালের ভাত, বাজরা, মিষ্টি আলু বা আটার রুটি।

খাবারের সাথে সামান্য খাঁটি ঘি বা সরিষার তেলের মতো প্রাকৃতিক ফ্যাট যুক্ত রাখলে সারা দিন পেট ভরা থাকে এবং শরীরে শক্তি বজায় থাকে।`,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    author: 'Ritu Das',
    authorRole: 'Clinical Nutritionist',
    publishedDate: '2026-09-22',
    readTime: '5 min read',
    readTimeBn: '৫ মিনিট পড়ার সময়',
    category: 'nutrition',
    published: true,
    tags: ['Nutrition', 'Gut Health', 'Whole Foods', 'Energy'],
  },
  {
    id: 'art-3',
    title: 'Evening Digital Sundown: Reclaiming Deep, Restorative Sleep',
    titleBn: 'ডিজিটাল সানডাউন: কীভাবে রাতের প্রশান্ত ও গভীর ঘুম ফিরিয়ে আনবেন',
    slug: 'evening-digital-sundown-sleep',
    summary: 'Practical non-negotiable steps to transition from work screens to melatonin release, quietening bedtime racing thoughts.',
    summaryBn: 'ঘুমানোর অন্তত এক ঘণ্টা আগে স্ক্রিন থেকে দূরে সরে কীভাবে মনকে শান্ত করবেন এবং গভীর ঘুম নিশ্চিত করবেন।',
    content: `Sleep is not a passive shutdown; it is the brain's most aggressive maintenance and neuro-cleaning phase. When blue light penetrates our retinas past 9 PM, it tricks the suprachiasmatic nucleus into delaying melatonin synthesis by up to 2 hours.

### The 60-Minute Digital Curfew
Create a buffer zone between the digital world and your bedroom:
1. Turn off high-overhead fluorescent lighting; use warm floor lamps or beeswax candles.
2. Sip a warm cup of chamomile, tulsi, or warm spiced milk.
3. Keep the bedroom slightly cool and dark.
4. Replace late-night scrolling with 5 minutes of mindful breath counting.`,
    contentBn: `ঘুম শুধু বিশ্রাম নয়, শরীরের অভ্যন্তরীণ নিরাময় ও পুনর্গঠন প্রক্রিয়া। রাতে ঘুমানোর আগে মোবাইল বা ল্যাপটপের আলো মস্তিষ্ককে বিভ্রান্ত করে মেলাটোনিন হরমোনের নিঃসরণ কমিয়ে দেয়।

### ডিজিটাল কারফিউ এর ৩টি সহজ নিয়ম
১. ঘুমানোর এক ঘণ্টা আগে মোবাইল অন্য রুমে বা দূরে রাখুন।
২. ঘরে মৃদু ও উষ্ণ আলো ব্যবহার করুন।
৩. এক কাপ উষ্ণ তুলসী চা বা ভেষজ পানীয় পান করুন এবং ৫ মিনিট গভীর শ্বাস নিন।`,
    imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
    author: 'Kunal Sen',
    authorRole: 'Sleep Hygiene Specialist',
    publishedDate: '2026-09-28',
    readTime: '4 min read',
    readTimeBn: '৪ মিনিট পড়ার সময়',
    category: 'sleep',
    published: true,
    tags: ['Sleep Hygiene', 'Nervous System', 'Evening Routine'],
  },
];

// Initial Testimonials (Genuine-toned community stories, no fake bodybuilder before/after)
export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    authorName: 'Sneha Banerjee',
    authorLocation: 'Kolkata, India',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    journeyHighlight: 'Regained steady afternoon energy and peace of mind without any gym anxiety.',
    journeyHighlightBn: 'কোনো জিমের ভীতি ছাড়াই প্রতিদিন বিকেলে সতেজ শক্তি ও মানসিক প্রশান্তি ফিরে পেয়েছি।',
    content: 'I used to feel guilty for not going to loud, crowded gyms. Joining Sattva Living changed my entire perspective. Their morning walking circles and balanced plate guidelines taught me that small, kind daily habits are infinitely more sustainable. My digestion has never felt better.',
    contentBn: 'আগে জিমে না যাওয়ার জন্য এক ধরণের অপরাধবোধ কাজ করত। সত্ত্বা লিভিং আমার পুরো ধারণাই বদলে দিয়েছে। তাদের সকালের হাঁটার সেশন ও সুষম খাবারের সহজ টিপস আমাকে নতুন জীবন দিয়েছে।',
    status: 'approved',
    submittedAt: '2026-09-10T12:00:00Z',
    isFeatured: true,
  },
  {
    id: 'test-2',
    authorName: 'Arunav Ghosh',
    authorLocation: 'Bengaluru, India',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    journeyHighlight: 'The evening wind-down circles cured 3 years of chronic screen insomnia.',
    journeyHighlightBn: 'সন্ধ্যার রিল্যাক্সেশন সেশন আমার ৩ বছরের অনিদ্রার সমস্যা দূর করেছে।',
    content: 'As a software architect, I was glued to monitors 12 hours a day. My sleep was fractured and anxious. The evening breathing techniques and bedtime routines shared here gave me back 7 hours of undisturbed, deep sleep. Truly grateful to the mentors.',
    contentBn: 'একজন সফটওয়্যার প্রকৌশলী হিসেবে সারাদিন কম্পিউটারের সামনে থাকতে হতো। রাতে ঘুম হতো না। সত্ত্বার সন্ধ্যার শ্বাস-প্রশ্বাসের অনুশীলন আমাকে শান্ত ও গভীর ঘুম এনে দিয়েছে।',
    status: 'approved',
    submittedAt: '2026-09-18T14:30:00Z',
    isFeatured: true,
  },
  {
    id: 'test-3',
    authorName: 'Priyanka Sen',
    authorLocation: 'Dhaka, Bangladesh',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    journeyHighlight: 'A warm, uplifting community where nobody judges your pace or body.',
    journeyHighlightBn: 'একটি আন্তরিক কমিউনিটি যেখানে কেউ কাউকে বিচার করে না, বরং সবাই সবাইকে উৎসাহিত করে।',
    content: 'The 21-day mindful walking challenge helped me build a consistent morning ritual. Being surrounded by people who celebrate small wins—like drinking enough water or cooking a nourishing soup—makes all the difference.',
    contentBn: '২১ দিনের হাঁটার চ্যালেঞ্জের মাধ্যমে আমার সকালের এক সুন্দর অভ্যাস গড়ে উঠেছে। এখানে সবাই ছোট ছোট ভালো কাজকে উৎসাহিত করে।',
    status: 'approved',
    submittedAt: '2026-09-25T09:15:00Z',
    isFeatured: true,
  },
];

// Initial Gallery Items
export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Peaceful Morning Sunlight Walk',
    titleBn: 'ভোরের মিষ্টি রোদে আনন্দময় হাঁটা',
    caption: 'Community members enjoying gentle morning steps in the botanical park.',
    captionBn: 'বোটানিক্যাল পার্কে সকালের স্নিগ্ধ রোদে সদস্যদের যৌথ হাঁটার মুহূর্ত।',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
    category: 'nature_walks',
    date: '2026-09-12',
  },
  {
    id: 'gal-2',
    title: 'Wholesome Seasonal Cooking Workshop',
    titleBn: 'মৌসুমি সুষম রান্না ও পুষ্টি কর্মশালা',
    caption: 'Preparing nourishing bowls with fresh vegetables and aromatic herbs.',
    captionBn: 'তাজা শাকসবজি ও প্রাকৃতিক উপাদান দিয়ে সুষম খাবার প্রস্তুত করার ওয়ার্কশপ।',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    category: 'cooking',
    date: '2026-09-15',
  },
  {
    id: 'gal-3',
    title: 'Sunset Gentle Stretch & Breath Circle',
    titleBn: 'গোধূলিবেলায় হালকা স্ট্রেচিং ও শ্বাসপ্রশ্বাস সেশন',
    caption: 'Releasing spine stiffness with gentle mindful movements.',
    captionBn: 'হালকা স্ট্রেচিংয়ের মাধ্যমে দিনের ক্লান্তি দূর করার দৃশ্য।',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    category: 'morning_routines',
    date: '2026-09-18',
  },
  {
    id: 'gal-4',
    title: 'Community Wellness Tea & Reflection',
    titleBn: 'কমিউনিটি ভেষজ চা ও আড্ডা বৈঠক',
    caption: 'Gathering to discuss daily habit insights and share mutual support.',
    captionBn: 'ভেষজ চায়ের সাথে খোলামেলা আলোচনা ও পারস্পরিক অনুপ্রেরণা বিনিময়।',
    imageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80',
    category: 'community',
    date: '2026-09-22',
  },
  {
    id: 'gal-5',
    title: 'Mindful Outdoor Herbal Exploration',
    titleBn: 'প্রাকৃতিক ভেষজ উদ্ভিদের পরিচিতি ও হাঁটা',
    caption: 'Learning about local medicinal plants and trees during a nature trail.',
    captionBn: 'প্রকৃতির মাঝে বিভিন্ন ভেষজ উদ্ভিদের গুণাগুণ জানার ভ্রমণ।',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    category: 'nature_walks',
    date: '2026-09-26',
  },
  {
    id: 'gal-6',
    title: 'Calm Restorative Breathing Session',
    titleBn: 'শান্ত ও গভীর শ্বাসপ্রশ্বাসের অনলাইন ভার্চুয়াল সার্কেল',
    caption: 'Participants in peaceful diaphragmatic relaxation.',
    captionBn: 'মন শান্ত করার জন্য নিয়ন্ত্রিত শ্বাসপ্রশ্বাস চর্চা।',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    category: 'workshops',
    date: '2026-09-29',
  },
];

// Initial Seed Users
export const initialUsers: User[] = [
  {
    uid: 'user-admin-1',
    fullName: 'Tanmoy Dari (Chief Wellness Director)',
    email: 'tanmoydari4@gmail.com',
    mobile: '+91 94335 23525',
    preferredLanguage: 'en',
    interests: ['lifestyle', 'nutrition', 'mindfulness'],
    role: 'admin',
    membershipStatus: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    wellnessGoals: 'Fostering accessible, non-gym holistic wellness for communities.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    uid: 'user-admin-default',
    fullName: 'Sattva Admin',
    email: 'tanmoydari4@gmail.com',
    mobile: '+91 94335 23525',
    preferredLanguage: 'en',
    interests: ['lifestyle', 'community'],
    role: 'admin',
    membershipStatus: 'active',
    wellnessGoals: 'Community administration and member care.',
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    uid: 'user-member-1',
    fullName: 'Debasish Sengupta',
    email: 'member@sattvaliving.com',
    mobile: '+91 98745 67890',
    preferredLanguage: 'bn',
    interests: ['walking', 'nutrition', 'morning_routine'],
    role: 'member',
    membershipStatus: 'active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    wellnessGoals: 'Maintain a 30-min morning walking streak and reduce late-night screen time.',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z',
  },
];

// Store Helper Class managing reactive state + localStorage persistence
class DataStore {
  private listeners: (() => void)[] = [];
  private isCloudSyncing = false;

  constructor() {
    this.init();
    // Fetch live data from Supabase cloud on initialization
    this.fetchFromCloud();

    if (typeof window !== 'undefined') {
      // Re-fetch on focus to ensure cross-device and cross-tab freshness
      window.addEventListener('focus', () => this.fetchFromCloud());
      setInterval(() => this.fetchFromCloud(), 45000);
    }
  }

  private init() {
    const savedSettings = localStorage.getItem('sattva_settings');
    if (!savedSettings) {
      localStorage.setItem('sattva_settings', JSON.stringify(initialSettings));
    }
    if (!localStorage.getItem('sattva_programs')) {
      localStorage.setItem('sattva_programs', JSON.stringify(initialPrograms));
    }
    if (!localStorage.getItem('sattva_events')) {
      localStorage.setItem('sattva_events', JSON.stringify(initialEvents));
    }
    if (!localStorage.getItem('sattva_articles')) {
      localStorage.setItem('sattva_articles', JSON.stringify(initialArticles));
    }
    if (!localStorage.getItem('sattva_testimonials')) {
      localStorage.setItem('sattva_testimonials', JSON.stringify(initialTestimonials));
    }
    if (!localStorage.getItem('sattva_gallery')) {
      localStorage.setItem('sattva_gallery', JSON.stringify(initialGallery));
    }
    if (!localStorage.getItem('sattva_users')) {
      localStorage.setItem('sattva_users', JSON.stringify(initialUsers));
    }
    if (!localStorage.getItem('sattva_enrollments')) {
      const demoEnrollment: Enrollment = {
        id: 'enr-demo-1',
        userId: 'user-member-1',
        userEmail: 'member@sattvaliving.com',
        userName: 'Debasish Sengupta',
        programId: 'prog-1',
        programTitle: 'Daily Lifestyle & Habit Coaching',
        status: 'active',
        amountPaid: 2499,
        enrolledAt: '2026-09-15T10:00:00Z',
      };
      localStorage.setItem('sattva_enrollments', JSON.stringify([demoEnrollment]));
    }
    if (!localStorage.getItem('sattva_event_registrations')) {
      const demoEventReg: EventRegistration = {
        id: 'reg-demo-1',
        userId: 'user-member-1',
        userName: 'Debasish Sengupta',
        userEmail: 'member@sattvaliving.com',
        eventId: 'evt-1',
        eventTitle: 'The Art of Mindful Walking & Outdoor Presence',
        eventStartAt: initialEvents[0].startAt,
        meetingUrl: initialEvents[0].meetingUrl,
        registeredAt: '2026-09-20T10:00:00Z',
        status: 'confirmed',
      };
      localStorage.setItem('sattva_event_registrations', JSON.stringify([demoEventReg]));
    }
    if (!localStorage.getItem('sattva_habit_logs')) {
      // Seed habit logs for the last 6 days for the demo member
      const logs: HabitLog[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        logs.push({
          id: `habit-${dateStr}`,
          userId: 'user-member-1',
          date: dateStr,
          habits: {
            walk: true,
            healthyMeals: true,
            mindfulness: i % 2 === 0,
            sleepRoutine: true,
            waterHydration: true,
            gratitudeJournal: true,
          },
          energyLevel: 4,
          dailyNote: 'Felt calm and steady throughout the day.',
        });
      }
      localStorage.setItem('sattva_habit_logs', JSON.stringify(logs));
    }
    if (!localStorage.getItem('sattva_enquiries')) {
      const sampleEnquiries: Enquiry[] = [
        {
          id: 'enq-1',
          name: 'Meenakshi Iyer',
          email: 'meenakshi@example.com',
          mobile: '+91 98200 99887',
          category: 'programs',
          message: 'Hello, I wanted to understand if the Morning Wellness sessions are suitable for complete beginners with back stiffness? Looking forward to joining.',
          consentGiven: true,
          status: 'new',
          createdAt: '2026-09-28T11:20:00Z',
        },
      ];
      localStorage.setItem('sattva_enquiries', JSON.stringify(sampleEnquiries));
    }
    if (!localStorage.getItem('sattva_payments')) {
      const samplePayments: PaymentRecord[] = [
        {
          id: 'pay-1',
          transactionReference: 'PAY-2026-98124',
          userId: 'user-member-1',
          userName: 'Debasish Sengupta',
          userEmail: 'member@sattvaliving.com',
          itemType: 'program',
          itemId: 'prog-1',
          itemTitle: 'Daily Lifestyle & Habit Coaching',
          amount: 2499,
          currency: 'INR',
          paymentMethod: 'razorpay_test',
          status: 'completed',
          gatewayTransactionId: 'pay_test_0192837465',
          createdAt: '2026-09-15T10:00:00Z',
          verifiedByAdmin: true,
        },
      ];
      localStorage.setItem('sattva_payments', JSON.stringify(samplePayments));
    }
    if (!localStorage.getItem('sattva_announcements')) {
      const sampleAnnouncements: Announcement[] = [
        {
          id: 'ann-1',
          title: 'Welcome to the Autumn Mindful Walking Challenge!',
          titleBn: 'শরতের বিশেষ স্নিগ্ধ সকালের হাঁটা চ্যালেঞ্জে স্বাগতম!',
          content: 'We invite all members to commit to a 20-minute morning outdoor walk. Record your daily checklist on your dashboard to maintain your consistency streak.',
          contentBn: 'প্রতিদিন সকালের ২০ মিনিট মুক্ত বাতাসে হাঁটার সংকল্প নিন। আপনার ড্যাশবোর্ডে প্রতিদিনের তালিকা টিক দিয়ে আপনার ধারাবাহিকতা বজায় রাখুন।',
          priority: 'important',
          publishedAt: '2026-09-20',
          active: true,
        },
      ];
      localStorage.setItem('sattva_announcements', JSON.stringify(sampleAnnouncements));
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public reloadFromLocalStorage() {
    this.notify();
  }

  public async fetchFromCloud(forceNotify = false): Promise<boolean> {
    if (this.isCloudSyncing) return false;
    this.isCloudSyncing = true;
    try {
      const cloudData = await fetchAllCloudSyncFromSupabase();
      let changed = false;

      if (cloudData.settings) {
        localStorage.setItem('sattva_settings', JSON.stringify(cloudData.settings));
        changed = true;
      }
      if (cloudData.programs && cloudData.programs.length > 0) {
        localStorage.setItem('sattva_programs', JSON.stringify(cloudData.programs));
        changed = true;
      }
      if (cloudData.events && cloudData.events.length > 0) {
        localStorage.setItem('sattva_events', JSON.stringify(cloudData.events));
        changed = true;
      }
      if (cloudData.articles && cloudData.articles.length > 0) {
        localStorage.setItem('sattva_articles', JSON.stringify(cloudData.articles));
        changed = true;
      }
      if (cloudData.testimonials && cloudData.testimonials.length > 0) {
        localStorage.setItem('sattva_testimonials', JSON.stringify(cloudData.testimonials));
        changed = true;
      }
      if (cloudData.gallery && cloudData.gallery.length > 0) {
        localStorage.setItem('sattva_gallery', JSON.stringify(cloudData.gallery));
        changed = true;
      }
      if (cloudData.announcements && cloudData.announcements.length > 0) {
        localStorage.setItem('sattva_announcements', JSON.stringify(cloudData.announcements));
        changed = true;
      }

      // Merge remote contact enquiries
      const remoteEnquiries = await fetchEnquiriesFromSupabase();
      if (remoteEnquiries.length > 0) {
        const localEnquiries = this.getEnquiries();
        const existingIds = new Set(localEnquiries.map(e => e.id));
        let addedNew = false;
        for (const rem of remoteEnquiries) {
          if (!existingIds.has(rem.id)) {
            localEnquiries.unshift(rem);
            existingIds.add(rem.id);
            addedNew = true;
          }
        }
        if (addedNew) {
          localStorage.setItem('sattva_enquiries', JSON.stringify(localEnquiries));
          changed = true;
        }
      }

      if (changed || forceNotify) {
        this.notify();
      }
      return changed;
    } catch (err) {
      console.warn('Cloud fetch note:', err);
      return false;
    } finally {
      this.isCloudSyncing = false;
    }
  }

  public async syncAllToCloud(): Promise<boolean> {
    try {
      await Promise.all([
        syncContentItemToSupabase('sync_settings', this.getSettings()),
        syncContentItemToSupabase('sync_programs', this.getPrograms()),
        syncContentItemToSupabase('sync_events', this.getEvents()),
        syncContentItemToSupabase('sync_articles', this.getArticles()),
        syncContentItemToSupabase('sync_testimonials', this.getTestimonials(false)),
        syncContentItemToSupabase('sync_gallery', this.getGallery()),
        syncContentItemToSupabase('sync_announcements', this.getAnnouncements()),
      ]);
      return true;
    } catch (err) {
      console.error('Failed to sync all items to cloud:', err);
      return false;
    }
  }

  // --- GETTERS ---
  getSettings(): WebsiteSettings {
    const data = localStorage.getItem('sattva_settings');
    return data ? JSON.parse(data) : initialSettings;
  }

  getPrograms(): Program[] {
    const data = localStorage.getItem('sattva_programs');
    return data ? JSON.parse(data) : [];
  }

  getProgramById(id: string): Program | undefined {
    return this.getPrograms().find(p => p.id === id || p.slug === id);
  }

  getEvents(): WellnessEvent[] {
    const data = localStorage.getItem('sattva_events');
    return data ? JSON.parse(data) : [];
  }

  getEventById(id: string): WellnessEvent | undefined {
    return this.getEvents().find(e => e.id === id);
  }

  getArticles(): Article[] {
    const data = localStorage.getItem('sattva_articles');
    return data ? JSON.parse(data) : [];
  }

  getArticleById(id: string): Article | undefined {
    return this.getArticles().find(a => a.id === id || a.slug === id);
  }

  getTestimonials(onlyApproved = true): Testimonial[] {
    const data = localStorage.getItem('sattva_testimonials');
    const all: Testimonial[] = data ? JSON.parse(data) : [];
    return onlyApproved ? all.filter(t => t.status === 'approved') : all;
  }

  getGallery(): GalleryItem[] {
    const data = localStorage.getItem('sattva_gallery');
    return data ? JSON.parse(data) : [];
  }

  getUsers(): User[] {
    const data = localStorage.getItem('sattva_users');
    return data ? JSON.parse(data) : [];
  }

  getUserById(uid: string): User | undefined {
    return this.getUsers().find(u => u.uid === uid || u.email.toLowerCase() === uid.toLowerCase());
  }

  getEnrollments(userId?: string): Enrollment[] {
    const data = localStorage.getItem('sattva_enrollments');
    const all: Enrollment[] = data ? JSON.parse(data) : [];
    return userId ? all.filter(e => e.userId === userId) : all;
  }

  getEventRegistrations(userId?: string): EventRegistration[] {
    const data = localStorage.getItem('sattva_event_registrations');
    const all: EventRegistration[] = data ? JSON.parse(data) : [];
    return userId ? all.filter(r => r.userId === userId) : all;
  }

  getHabitLogs(userId: string): HabitLog[] {
    const data = localStorage.getItem('sattva_habit_logs');
    const all: HabitLog[] = data ? JSON.parse(data) : [];
    return all.filter(h => h.userId === userId).sort((a, b) => b.date.localeCompare(a.date));
  }

  getEnquiries(): Enquiry[] {
    const data = localStorage.getItem('sattva_enquiries');
    const all: Enquiry[] = data ? JSON.parse(data) : [];
    return all.filter(e => (e.category as string) !== 'system_sync' && (e.category as string) !== 'system_config');
  }

  getPayments(userId?: string): PaymentRecord[] {
    const data = localStorage.getItem('sattva_payments');
    const all: PaymentRecord[] = data ? JSON.parse(data) : [];
    return userId ? all.filter(p => p.userId === userId) : all;
  }

  getAnnouncements(): Announcement[] {
    const data = localStorage.getItem('sattva_announcements');
    return data ? JSON.parse(data) : [];
  }

  // --- SETTERS & MUTATIONS ---
  updateSettings(settings: WebsiteSettings) {
    localStorage.setItem('sattva_settings', JSON.stringify(settings));
    this.notify();
    syncContentItemToSupabase('sync_settings', settings);
  }

  // Programs CRUD
  saveProgram(program: Program) {
    const programs = this.getPrograms();
    const index = programs.findIndex(p => p.id === program.id);
    if (index >= 0) {
      programs[index] = { ...program, updatedAt: new Date().toISOString() };
    } else {
      programs.unshift({
        ...program,
        id: program.id || `prog-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    localStorage.setItem('sattva_programs', JSON.stringify(programs));
    this.notify();
    syncContentItemToSupabase('sync_programs', programs);
  }

  deleteProgram(id: string) {
    const programs = this.getPrograms().filter(p => p.id !== id);
    localStorage.setItem('sattva_programs', JSON.stringify(programs));
    this.notify();
    syncContentItemToSupabase('sync_programs', programs);
  }

  // Events CRUD
  saveEvent(event: WellnessEvent) {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index >= 0) {
      events[index] = event;
    } else {
      events.unshift({
        ...event,
        id: event.id || `evt-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
    }
    localStorage.setItem('sattva_events', JSON.stringify(events));
    this.notify();
    syncContentItemToSupabase('sync_events', events);
  }

  deleteEvent(id: string) {
    const events = this.getEvents().filter(e => e.id !== id);
    localStorage.setItem('sattva_events', JSON.stringify(events));
    this.notify();
    syncContentItemToSupabase('sync_events', events);
  }

  // Articles CRUD
  saveArticle(article: Article) {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === article.id);
    if (index >= 0) {
      articles[index] = article;
    } else {
      articles.unshift({
        ...article,
        id: article.id || `art-${Date.now()}`,
        publishedDate: new Date().toISOString().split('T')[0],
      });
    }
    localStorage.setItem('sattva_articles', JSON.stringify(articles));
    this.notify();
    syncContentItemToSupabase('sync_articles', articles);
  }

  deleteArticle(id: string) {
    const articles = this.getArticles().filter(a => a.id !== id);
    localStorage.setItem('sattva_articles', JSON.stringify(articles));
    this.notify();
    syncContentItemToSupabase('sync_articles', articles);
  }

  // Gallery CRUD
  saveGalleryItem(item: GalleryItem) {
    const gallery = this.getGallery();
    const index = gallery.findIndex(g => g.id === item.id);
    if (index >= 0) {
      gallery[index] = item;
    } else {
      gallery.unshift({
        ...item,
        id: item.id || `gal-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
      });
    }
    localStorage.setItem('sattva_gallery', JSON.stringify(gallery));
    this.notify();
    syncContentItemToSupabase('sync_gallery', gallery);
  }

  deleteGalleryItem(id: string) {
    const gallery = this.getGallery().filter(g => g.id !== id);
    localStorage.setItem('sattva_gallery', JSON.stringify(gallery));
    this.notify();
    syncContentItemToSupabase('sync_gallery', gallery);
  }

  // Announcements CRUD
  saveAnnouncement(announcement: Announcement) {
    const announcements = this.getAnnouncements();
    const index = announcements.findIndex(a => a.id === announcement.id);
    if (index >= 0) {
      announcements[index] = announcement;
    } else {
      announcements.unshift({
        ...announcement,
        id: announcement.id || `ann-${Date.now()}`,
        publishedAt: new Date().toISOString().split('T')[0],
      });
    }
    localStorage.setItem('sattva_announcements', JSON.stringify(announcements));
    this.notify();
    syncContentItemToSupabase('sync_announcements', announcements);
  }

  deleteAnnouncement(id: string) {
    const announcements = this.getAnnouncements().filter(a => a.id !== id);
    localStorage.setItem('sattva_announcements', JSON.stringify(announcements));
    this.notify();
    syncContentItemToSupabase('sync_announcements', announcements);
  }

  // Testimonials
  submitTestimonial(testimonial: Omit<Testimonial, 'id' | 'status' | 'submittedAt'>) {
    const testimonials = this.getTestimonials(false);
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: `test-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    testimonials.unshift(newTestimonial);
    localStorage.setItem('sattva_testimonials', JSON.stringify(testimonials));
    this.notify();
    syncContentItemToSupabase('sync_testimonials', testimonials);
    return newTestimonial;
  }

  updateTestimonialStatus(id: string, status: 'approved' | 'rejected') {
    const testimonials = this.getTestimonials(false);
    const item = testimonials.find(t => t.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem('sattva_testimonials', JSON.stringify(testimonials));
      this.notify();
      syncContentItemToSupabase('sync_testimonials', testimonials);
    }
  }

  deleteTestimonial(id: string) {
    const testimonials = this.getTestimonials(false).filter(t => t.id !== id);
    localStorage.setItem('sattva_testimonials', JSON.stringify(testimonials));
    this.notify();
    syncContentItemToSupabase('sync_testimonials', testimonials);
  }

  // Enquiries
  submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt'>) {
    const enquiries = this.getEnquiries();
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    enquiries.unshift(newEnquiry);
    localStorage.setItem('sattva_enquiries', JSON.stringify(enquiries));
    syncEnquiryToSupabase(newEnquiry);
    this.notify();
    return newEnquiry;
  }

  updateEnquiryStatus(id: string, status: 'new' | 'in_progress' | 'replied' | 'archived', notes?: string) {
    const enquiries = this.getEnquiries();
    const item = enquiries.find(e => e.id === id);
    if (item) {
      item.status = status;
      if (notes) item.replyNotes = notes;
      localStorage.setItem('sattva_enquiries', JSON.stringify(enquiries));
      syncEnquiryToSupabase(item);
      this.notify();
    }
  }

  // Users CRUD
  saveUser(user: User) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.uid === user.uid);
    let finalUser = user;
    if (index >= 0) {
      finalUser = { ...user, updatedAt: new Date().toISOString() };
      users[index] = finalUser;
    } else {
      users.push(user);
    }
    localStorage.setItem('sattva_users', JSON.stringify(users));
    syncUserToSupabase(finalUser);
    this.notify();
  }

  toggleUserStatus(uid: string) {
    const users = this.getUsers();
    const user = users.find(u => u.uid === uid);
    if (user) {
      user.membershipStatus = user.membershipStatus === 'active' ? 'inactive' : 'active';
      user.updatedAt = new Date().toISOString();
      localStorage.setItem('sattva_users', JSON.stringify(users));
      syncUserToSupabase(user);
      this.notify();
    }
  }

  // Enrollments & Event Registrations
  enrollInProgram(enrollment: Omit<Enrollment, 'id' | 'enrolledAt'>) {
    const enrollments = this.getEnrollments();
    const existing = enrollments.find(e => e.userId === enrollment.userId && e.programId === enrollment.programId);
    if (existing) {
      return existing;
    }
    const newEnrollment: Enrollment = {
      ...enrollment,
      id: `enr-${Date.now()}`,
      enrolledAt: new Date().toISOString(),
    };
    enrollments.unshift(newEnrollment);
    localStorage.setItem('sattva_enrollments', JSON.stringify(enrollments));
    syncEnrollmentToSupabase(newEnrollment);
    this.notify();
    return newEnrollment;
  }

  registerForEvent(registration: Omit<EventRegistration, 'id' | 'registeredAt'>) {
    const regs = this.getEventRegistrations();
    const existing = regs.find(r => r.userId === registration.userId && r.eventId === registration.eventId);
    if (existing) {
      return existing;
    }
    const newReg: EventRegistration = {
      ...registration,
      id: `reg-${Date.now()}`,
      registeredAt: new Date().toISOString(),
    };
    regs.unshift(newReg);
    localStorage.setItem('sattva_event_registrations', JSON.stringify(regs));

    // Increment event registeredCount
    const events = this.getEvents();
    const event = events.find(e => e.id === registration.eventId);
    if (event) {
      event.registeredCount = (event.registeredCount || 0) + 1;
      localStorage.setItem('sattva_events', JSON.stringify(events));
    }

    syncEventRegistrationToSupabase(newReg);
    this.notify();
    return newReg;
  }

  // Habit Logging
  logHabit(log: Omit<HabitLog, 'id'>) {
    const logs = this.getHabitLogs(log.userId);
    const existingIndex = logs.findIndex(l => l.date === log.date);
    let finalLog: HabitLog;
    if (existingIndex >= 0) {
      finalLog = { ...logs[existingIndex], ...log };
      logs[existingIndex] = finalLog;
    } else {
      finalLog = {
        ...log,
        id: `habit-${Date.now()}`,
      };
      logs.unshift(finalLog);
    }
    // Update all logs in storage
    const allData = localStorage.getItem('sattva_habit_logs');
    const all: HabitLog[] = allData ? JSON.parse(allData) : [];
    const otherUsersLogs = all.filter(l => l.userId !== log.userId);
    localStorage.setItem('sattva_habit_logs', JSON.stringify([...logs, ...otherUsersLogs]));
    syncHabitLogToSupabase(finalLog);
    this.notify();
  }

  // Payments
  recordPayment(payment: Omit<PaymentRecord, 'id' | 'createdAt'>) {
    const payments = this.getPayments();
    const newPayment: PaymentRecord = {
      ...payment,
      id: `pay-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    payments.unshift(newPayment);
    localStorage.setItem('sattva_payments', JSON.stringify(payments));
    syncPaymentToSupabase(newPayment);
    this.notify();
    return newPayment;
  }

  verifyPayment(paymentId: string) {
    const payments = this.getPayments();
    const payment = payments.find(p => p.id === paymentId);
    if (payment) {
      payment.verifiedByAdmin = true;
      payment.status = 'completed';
      localStorage.setItem('sattva_payments', JSON.stringify(payments));
      this.notify();
    }
  }
}

export const store = new DataStore();

/**
 * React hook to subscribe component to DataStore updates and re-render automatically
 */
export function useStoreVersion(): number {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    return store.subscribe(() => {
      setVersion(v => v + 1);
    });
  }, []);

  return version;
}
