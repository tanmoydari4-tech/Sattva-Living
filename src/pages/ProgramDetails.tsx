import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Users,
  Calendar,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Check,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { store, useStoreVersion } from '../services/store';
import { Modal } from '../components/Modal';
import { ReceiptModal } from '../components/ReceiptModal';
import { PaymentRecord } from '../types';

export const ProgramDetails: React.FC = () => {
  useStoreVersion();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, isBengali } = useLanguage();
  const { currentUser, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const settings = store.getSettings();

  const program = store.getProgramById(id || '');

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'razorpay_test' | 'upi' | 'card'>('razorpay_test');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<PaymentRecord | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  if (!program) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#153D32]">Program Not Found</h2>
        <p className="text-sm text-[#252A27]/70">The program you are looking for does not exist or has been archived.</p>
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.back}</span>
        </Link>
      </div>
    );
  }

  const title = isBengali ? (program.titleBn || program.title) : program.title;
  const desc = isBengali ? (program.fullDescriptionBn || program.fullDescription) : program.fullDescription;
  const audience = isBengali ? (program.suitableAudienceBn || program.suitableAudience) : program.suitableAudience;
  const duration = isBengali ? (program.durationBn || program.duration) : program.duration;
  const schedule = isBengali ? (program.scheduleDetailsBn || program.scheduleDetails) : program.scheduleDetails;
  const features = isBengali ? (program.featuresBn || program.features) : program.features;

  const userEnrollments = currentUser ? store.getEnrollments(currentUser.uid) : [];
  const isAlreadyEnrolled = userEnrollments.some(e => e.programId === program.id);

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      showToast(isBengali ? 'নিবন্ধন করতে প্রথমে সাইন ইন বা অ্যাকাউন্ট তৈরি করুন।' : 'Please sign in or create an account to enroll.', 'info');
      navigate('/member/login', { state: { from: `/programs/${program.id}` } });
      return;
    }

    if (isAlreadyEnrolled) {
      navigate('/member/dashboard');
      return;
    }

    setCheckoutModalOpen(true);
  };

  const handleCompletePaymentAndEnroll = () => {
    if (!currentUser) return;
    setIsProcessing(true);

    setTimeout(() => {
      const txRef = `PAY-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const gatewayTx = `rzp_${Math.random().toString(36).substring(2, 12)}`;

      // Record payment
      const payment = store.recordPayment({
        transactionReference: txRef,
        userId: currentUser.uid,
        userName: currentUser.fullName,
        userEmail: currentUser.email,
        itemType: 'program',
        itemId: program.id,
        itemTitle: program.title,
        amount: program.price,
        currency: 'INR',
        paymentMethod: selectedPaymentMethod,
        status: 'completed',
        gatewayTransactionId: gatewayTx,
        verifiedByAdmin: true,
      });

      // Enroll member
      store.enrollInProgram({
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.fullName,
        programId: program.id,
        programTitle: program.title,
        status: 'active',
        paymentId: payment.id,
        amountPaid: program.price,
      });

      setIsProcessing(false);
      setCheckoutModalOpen(false);
      setReceiptData(payment);
      setReceiptModalOpen(true);
      showToast(isBengali ? 'অভিনন্দন! আপনি সফলভাবে এই প্রোগ্রামে যুক্ত হয়েছেন।' : 'Enrollment confirmed! Welcome to the program circle.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Back button link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#153D32] hover:text-[#0E2922] group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{isBengali ? 'সকল প্রোগ্রামে ফিরে যান' : 'Back to All Programs'}</span>
        </Link>
      </div>

      {/* Main Program Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image, Description, Features */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-16/9 bg-black/10 border border-[#A8BDA5]/30">
              <img src={program.imageUrl} alt={title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#153D32]/90 text-white backdrop-blur-xs">
                  {t.programs.categories[program.category]}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#153D32] leading-tight">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-[#252A27]/80 leading-relaxed font-normal whitespace-pre-line">
                {desc}
              </p>
            </div>

            {/* Included Curriculum Features */}
            <div className="bg-white p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#153D32]">
                {t.programs.includedFeatures}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F6F0] border border-[#A8BDA5]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#153D32] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-[#252A27]/85">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule & Timing */}
            <div className="bg-white p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#153D32]">
                {t.programs.schedule}
              </h3>
              <div className="flex items-center gap-3 text-sm text-[#252A27]/80">
                <Calendar className="w-5 h-5 text-[#C6A66A] shrink-0" />
                <span>{schedule}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Enrollment Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-6 sm:p-8 rounded-3xl border border-[#A8BDA5]/40 shadow-lg space-y-6">
              <div>
                <span className="text-[11px] text-[#252A27]/60 uppercase tracking-wider block font-semibold">
                  {t.programs.price}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-3xl font-bold text-[#153D32]">
                    {program.price > 0 ? `₹${program.price.toLocaleString('en-IN')}` : t.programs.freeOrContact}
                  </span>
                  {program.price > 0 && (
                    <span className="text-xs text-[#252A27]/60">{isBengali ? 'এককালীন ফি' : 'One-time'}</span>
                  )}
                </div>
              </div>

              {/* Quick Meta List */}
              <div className="space-y-3 py-4 border-y border-[#A8BDA5]/20 text-xs text-[#252A27]/75">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#153D32] shrink-0" />
                  <span><strong>{t.programs.duration}:</strong> {duration}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-[#153D32] shrink-0 mt-0.5" />
                  <span><strong>{t.programs.audience}:</strong> {audience}</span>
                </div>
              </div>

              {/* Enrollment CTA Button */}
              <div>
                {isAlreadyEnrolled ? (
                  <button
                    type="button"
                    onClick={() => navigate('/member/dashboard')}
                    className="w-full py-3.5 rounded-full bg-emerald-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isBengali ? 'আপনি নিবন্ধিত (ড্যাশবোর্ড দেখুন)' : 'Enrolled (View Dashboard)'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleEnrollClick}
                    className="w-full py-3.5 rounded-full bg-[#153D32] text-white hover:bg-[#0E2922] transition-transform hover:scale-[1.02] active:scale-98 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
                    <span>{t.programs.registerNow}</span>
                  </button>
                )}
              </div>

              {/* Reassurance */}
              <div className="flex items-center gap-2 text-[11px] text-[#252A27]/60 text-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#153D32]" />
                <span>{isBengali ? 'সহজ ও নিরাপদ এনরোলমেন্ট' : 'Safe & verified wellness community'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal (India Payment / Razorpay Test Mode) */}
      <Modal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        title={isBengali ? 'নিবন্ধন ও পেমেন্ট নিশ্চিতকরণ' : 'Confirm Registration & Payment'}
      >
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="p-4 bg-[#F8F6F0] rounded-xl border border-[#A8BDA5]/30 space-y-2">
            <span className="text-[11px] text-[#252A27]/60 uppercase tracking-wider block font-semibold">
              {isBengali ? 'নির্বাচিত প্রোগ্রাম' : 'Selected Program'}
            </span>
            <div className="flex justify-between items-center">
              <h4 className="font-serif font-bold text-sm text-[#153D32]">{title}</h4>
              <span className="font-serif font-bold text-base text-[#153D32]">
                ₹{program.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Test Mode Label */}
          {settings.testPaymentModeEnabled && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>{t.common.testMode}:</strong> Razorpay Sandbox / Direct Test Processing simulated with instant official receipt.
              </span>
            </div>
          )}

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#153D32] block">
              {isBengali ? 'পেমেন্ট মাধ্যম বেছে নিন' : 'Select Payment Method'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('razorpay_test')}
                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                  selectedPaymentMethod === 'razorpay_test'
                    ? 'border-[#153D32] bg-[#153D32] text-white shadow-xs'
                    : 'border-[#A8BDA5]/40 bg-white text-[#252A27]/80 hover:bg-[#F8F6F0]'
                }`}
              >
                Razorpay
              </button>
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                  selectedPaymentMethod === 'upi'
                    ? 'border-[#153D32] bg-[#153D32] text-white shadow-xs'
                    : 'border-[#A8BDA5]/40 bg-white text-[#252A27]/80 hover:bg-[#F8F6F0]'
                }`}
              >
                UPI / QR
              </button>
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                  selectedPaymentMethod === 'card'
                    ? 'border-[#153D32] bg-[#153D32] text-white shadow-xs'
                    : 'border-[#A8BDA5]/40 bg-white text-[#252A27]/80 hover:bg-[#F8F6F0]'
                }`}
              >
                Card / NetBanking
              </button>
            </div>
          </div>

          {/* Member Confirmation Info */}
          {currentUser && (
            <div className="text-xs text-[#252A27]/70 space-y-1 border-t border-[#A8BDA5]/20 pt-3">
              <p><strong>Member:</strong> {currentUser.fullName}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
            </div>
          )}

          {/* Pay Button */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#A8BDA5] text-xs font-medium text-[#252A27]"
            >
              {t.common.cancel}
            </button>
            <button
              type="button"
              onClick={handleCompletePaymentAndEnroll}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <span>{t.common.loading}</span>
              ) : (
                <>
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>
                    {isBengali ? `₹${program.price} পরিশোধ করে এনরোল করুন` : `Pay ₹${program.price} & Complete Enrollment`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Official Receipt Modal */}
      <ReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        payment={receiptData}
      />
    </div>
  );
};
