import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, FileText, ArrowRight, Layers } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { store } from '../services/store';
import { ReceiptModal } from '../components/ReceiptModal';
import { PaymentRecord } from '../types';

export const MyPrograms: React.FC = () => {
  const { t, isBengali } = useLanguage();
  const { currentUser } = useAuth();
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

  if (!currentUser) return null;

  const enrollments = store.getEnrollments(currentUser.uid);
  const userPayments = store.getPayments(currentUser.uid);

  const handleViewReceipt = (programId: string) => {
    const payment = userPayments.find(p => p.itemId === programId);
    if (payment) {
      setSelectedPayment(payment);
      setReceiptOpen(true);
    }
  };

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
          {t.dashboard.enrolledPrograms}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-3xl font-bold text-[#153D32]">
          {isBengali ? 'আমার নিবন্ধিত ওয়েলনেস প্রোগ্রামসমূহ' : 'My Enrolled Wellness Programs'}
        </h1>
        <p className="text-xs sm:text-sm text-[#252A27]/70">
          {isBengali
            ? 'আপনার সক্রিয় কর্মসূচির সময়সূচি এবং পেমেন্ট সংক্রান্ত তথ্য।'
            : 'Access program schedules, session guidelines, and official receipts.'}
        </p>
      </div>

      {enrollments.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#A8BDA5]/30 p-8 space-y-3">
          <Layers className="w-12 h-12 text-[#A8BDA5] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#153D32]">{t.dashboard.noEnrolledPrograms}</h3>
          <p className="text-xs text-[#252A27]/60 max-w-md mx-auto">
            {isBengali ? 'সুস্থ জীবনযাত্রার জন্য আমাদের নিয়মিত প্রোগ্রামগুলো ঘুরে দেখুন।' : 'Discover our gentle coaching, morning circles, and nutrition programs.'}
          </p>
          <div className="pt-2">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#153D32] text-white text-xs font-semibold"
            >
              <span>{t.dashboard.explorePrograms}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrollments.map((enr) => {
            const prog = store.getProgramById(enr.programId);
            const title = prog ? (isBengali ? (prog.titleBn || prog.title) : prog.title) : enr.programTitle;
            const hasPayment = userPayments.some(p => p.itemId === enr.programId);

            return (
              <div
                key={enr.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#A8BDA5]/40 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {prog?.imageUrl && (
                    <img src={prog.imageUrl} alt={title} className="w-full h-44 object-cover" />
                  )}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {enr.status}
                      </span>
                      <span className="text-[#252A27]/60">{new Date(enr.enrolledAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#153D32]">{title}</h3>
                    {prog && (
                      <p className="text-xs text-[#252A27]/75 line-clamp-2 leading-relaxed">
                        {isBengali ? (prog.shortDescriptionBn || prog.shortDescription) : prog.shortDescription}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#A8BDA5]/20 mt-4 flex items-center justify-between text-xs">
                  {hasPayment ? (
                    <button
                      type="button"
                      onClick={() => handleViewReceipt(enr.programId)}
                      className="inline-flex items-center gap-1.5 text-[#153D32] hover:underline font-semibold"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{t.common.printReceipt}</span>
                    </button>
                  ) : (
                    <span className="text-[#252A27]/50 italic">Complimentary</span>
                  )}

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

      <ReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        payment={selectedPayment}
      />
    </div>
  );
};
