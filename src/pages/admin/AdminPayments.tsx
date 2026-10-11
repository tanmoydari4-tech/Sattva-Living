import React, { useState } from 'react';
import { CreditCard, CheckCircle, ShieldCheck, Download, FileText } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { store, useStoreVersion } from '../../services/store';
import { useToast } from '../../components/Toast';
import { ReceiptModal } from '../../components/ReceiptModal';
import { PaymentRecord } from '../../types';

export const AdminPayments: React.FC = () => {
  useStoreVersion();
  const { showToast } = useToast();
  const payments = store.getPayments();
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

  const handleVerify = (id: string) => {
    store.verifyPayment(id);
    showToast('Payment verified successfully.', 'success');
  };

  const totalCollected = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#153D32]">Payment Management</h1>
            <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
              Track program registrations, transaction references, Razorpay test records, and receipts.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#A8BDA5]/40 shadow-xs flex items-center gap-4">
            <span className="text-xs text-[#252A27]/70 font-medium">Total Logged Fees:</span>
            <span className="font-serif text-xl font-bold text-[#153D32]">₹{totalCollected.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-3xl border border-[#A8BDA5]/40 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6F0] border-b border-[#A8BDA5]/20 text-[#153D32] font-semibold">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Billed Member</th>
                  <th className="p-4">Item</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A8BDA5]/20 text-[#252A27]/85">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F8F6F0]/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#153D32]">{p.transactionReference}</td>
                    <td className="p-4">
                      <p className="font-semibold text-[#153D32]">{p.userName}</p>
                      <p className="text-[11px] text-[#252A27]/60">{p.userEmail}</p>
                    </td>
                    <td className="p-4 font-medium">{p.itemTitle}</td>
                    <td className="p-4 uppercase text-[11px] font-mono">{p.paymentMethod.replace('_', ' ')}</td>
                    <td className="p-4 font-bold text-[#153D32]">₹{p.amount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-[#252A27]/60">{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPayment(p);
                          setReceiptOpen(true);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#153D32] hover:underline"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </button>
                      {!p.verifiedByAdmin && (
                        <button
                          type="button"
                          onClick={() => handleVerify(p.id)}
                          className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-semibold hover:bg-emerald-800"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        payment={selectedPayment}
      />
    </AdminLayout>
  );
};
