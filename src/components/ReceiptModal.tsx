import React from 'react';
import { Download, Printer, CheckCircle, ShieldCheck } from 'lucide-react';
import { Modal } from './Modal';
import { PaymentRecord } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { store } from '../services/store';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: PaymentRecord | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  payment,
}) => {
  const { t, isBengali } = useLanguage();
  const settings = store.getSettings();

  if (!payment) return null;

  const brandName = isBengali ? (settings.brandNameBn || settings.brandName) : settings.brandName;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isBengali ? 'পেমেন্ট রসিদ' : 'Official Payment Receipt'} maxWidth="lg">
      <div className="space-y-6 print:p-0" id="receipt-printable-area">
        {/* Receipt Header */}
        <div className="flex items-start justify-between border-b border-[#A8BDA5]/30 pb-4">
          <div>
            <h4 className="font-serif text-xl font-bold text-[#153D32]">{brandName}</h4>
            <p className="text-xs text-[#252A27]/70 mt-0.5">{settings.tagline}</p>
            <p className="text-[11px] text-[#252A27]/60 mt-1 max-w-xs">{settings.address}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isBengali ? 'পরিশোধিত' : 'PAID'}</span>
            </span>
            <p className="font-mono text-xs font-bold text-[#153D32] mt-2">
              {payment.transactionReference}
            </p>
            <p className="text-[11px] text-[#252A27]/60">
              {new Date(payment.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Member Details */}
        <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#A8BDA5]/30 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#252A27]/60 block">{isBengali ? 'সদস্যের নাম' : 'Billed To'}:</span>
            <span className="font-semibold text-[#153D32]">{payment.userName}</span>
            <span className="text-[#252A27]/70 block mt-0.5">{payment.userEmail}</span>
          </div>
          <div>
            <span className="text-[#252A27]/60 block">{isBengali ? 'পেমেন্ট মাধ্যম' : 'Payment Method'}:</span>
            <span className="font-semibold text-[#153D32] uppercase">{payment.paymentMethod.replace('_', ' ')}</span>
            <span className="text-[#252A27]/70 block mt-0.5 font-mono text-[10px]">
              Ref: {payment.gatewayTransactionId}
            </span>
          </div>
        </div>

        {/* Item Details Table */}
        <div className="border border-[#A8BDA5]/30 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#153D32] text-white">
              <tr>
                <th className="p-3 font-semibold">{isBengali ? 'বিবরণ' : 'Description'}</th>
                <th className="p-3 font-semibold text-right">{isBengali ? 'পরিমাণ' : 'Amount'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A8BDA5]/20">
              <tr>
                <td className="p-3">
                  <span className="font-medium text-[#153D32] block">{payment.itemTitle}</span>
                  <span className="text-[11px] text-[#252A27]/60 capitalize">
                    {payment.itemType} Registration
                  </span>
                </td>
                <td className="p-3 text-right font-semibold text-[#153D32]">
                  ₹{payment.amount.toLocaleString('en-IN')}
                </td>
              </tr>
              <tr className="bg-[#F8F6F0]/60 font-bold text-sm">
                <td className="p-3 text-[#153D32]">{isBengali ? 'সর্বমোট' : 'Total Amount Paid'}</td>
                <td className="p-3 text-right text-[#153D32]">
                  ₹{payment.amount.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verification Note */}
        <div className="flex items-center gap-2 p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {isBengali
              ? 'এটি একটি কম্পিউটার জেনারেটেড ডিজিটাল রসিদ। কোনো স্বাক্ষরের প্রয়োজন নেই।'
              : 'This is a computer-generated digital receipt and requires no physical signature.'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#A8BDA5] text-xs font-medium text-[#153D32] hover:bg-[#F8F6F0] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.common.printReceipt}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#153D32] text-xs font-medium text-white hover:bg-[#0E2922] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.common.downloadReceipt}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
