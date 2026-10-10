export type Language = 'en' | 'bn';

export type UserRole = 'member' | 'admin';

export interface User {
  uid: string;
  fullName: string;
  email: string;
  mobile: string;
  preferredLanguage: Language;
  interests: string[];
  role: UserRole;
  membershipStatus: 'active' | 'inactive' | 'pending';
  avatarUrl?: string;
  wellnessGoals?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProgramCategory = 
  | 'lifestyle'
  | 'nutrition'
  | 'morning'
  | 'evening'
  | 'consultation'
  | 'community';

export interface Program {
  id: string;
  title: string;
  titleBn: string;
  slug: string;
  category: ProgramCategory;
  shortDescription: string;
  shortDescriptionBn: string;
  fullDescription: string;
  fullDescriptionBn: string;
  imageUrl: string;
  suitableAudience: string;
  suitableAudienceBn: string;
  duration: string;
  durationBn: string;
  price: number; // 0 for free/contact or INR amount
  isPaid: boolean;
  published: boolean;
  features: string[];
  featuresBn: string[];
  scheduleDetails: string;
  scheduleDetailsBn: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  programId: string;
  programTitle: string;
  status: 'active' | 'completed' | 'cancelled' | 'pending_payment';
  paymentId?: string;
  amountPaid: number;
  enrolledAt: string;
  notes?: string;
}

export interface WellnessEvent {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  imageUrl: string;
  startAt: string; // ISO date string
  endAt: string;
  timezone: string;
  format: 'online' | 'offline';
  meetingUrl?: string;
  venue?: string;
  venueBn?: string;
  hostName: string;
  hostBio: string;
  hostBioBn: string;
  hostAvatar?: string;
  capacity: number;
  registeredCount: number;
  registrationDeadline: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  price: number;
  category: 'workshop' | 'meditation' | 'routine' | 'discussion';
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  eventId: string;
  eventTitle: string;
  eventStartAt: string;
  meetingUrl?: string;
  registeredAt: string;
  status: 'confirmed' | 'cancelled';
  notes?: string;
}

export interface Article {
  id: string;
  title: string;
  titleBn: string;
  slug: string;
  summary: string;
  summaryBn: string;
  content: string;
  contentBn: string;
  imageUrl: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  readTimeBn: string;
  category: 'nutrition' | 'habits' | 'mindfulness' | 'sleep' | 'movement';
  published: boolean;
  tags: string[];
}

export interface Testimonial {
  id: string;
  userId?: string;
  authorName: string;
  authorLocation: string;
  authorAvatar?: string;
  content: string;
  contentBn: string;
  rating: number; // 1-5
  journeyHighlight: string;
  journeyHighlightBn: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  isFeatured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleBn: string;
  caption: string;
  captionBn: string;
  imageUrl: string;
  category: 'workshops' | 'morning_routines' | 'cooking' | 'nature_walks' | 'community';
  date: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  category: 'general' | 'programs' | 'consultation' | 'community' | 'corporate';
  message: string;
  consentGiven: boolean;
  status: 'new' | 'in_progress' | 'replied' | 'archived';
  replyNotes?: string;
  createdAt: string;
}

export interface HabitLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  habits: {
    walk: boolean;              // Took a peaceful walk / gentle movement
    healthyMeals: boolean;       // Followed wholesome nourishing meals
    mindfulness: boolean;        // Dedicated mindfulness / relaxation
    sleepRoutine: boolean;       // Maintained restorative sleep schedule
    waterHydration: boolean;     // Mindful hydration
    gratitudeJournal: boolean;   // Evening reflection / gratitude
  };
  energyLevel: 1 | 2 | 3 | 4 | 5; // 1 to 5 stars
  dailyNote?: string;
}

export interface Announcement {
  id: string;
  title: string;
  titleBn: string;
  content: string;
  contentBn: string;
  priority: 'normal' | 'important';
  publishedAt: string;
  active: boolean;
}

export interface PaymentRecord {
  id: string;
  transactionReference: string;
  userId: string;
  userName: string;
  userEmail: string;
  itemType: 'program' | 'event' | 'membership';
  itemId: string;
  itemTitle: string;
  amount: number;
  currency: string;
  paymentMethod: 'razorpay_test' | 'upi' | 'card' | 'netbanking' | 'bank_transfer';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  gatewayTransactionId: string;
  createdAt: string;
  verifiedByAdmin?: boolean;
}

export interface WebsiteSettings {
  brandName: string;
  brandNameBn: string;
  tagline: string;
  taglineBn: string;
  philosophy: string;
  philosophyBn: string;
  contactEmail: string;
  contactPhone: string;
  whatsAppNumber: string;
  address: string;
  addressBn: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
    telegram: string;
  };
  heroTitle: string;
  heroTitleBn: string;
  heroSubtitle: string;
  heroSubtitleBn: string;
  heroBgUrl: string;
  testPaymentModeEnabled: boolean;
  razorpayKeyId?: string;
  defaultLanguage: Language;
}
