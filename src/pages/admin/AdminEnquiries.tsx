import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, CheckCircle, Clock, Archive } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { store, useStoreVersion } from '../../services/store';
import { useToast } from '../../components/Toast';

export const AdminEnquiries: React.FC = () => {
  useStoreVersion();
  const { showToast } = useToast();
  const enquiries = store.getEnquiries();

  const handleUpdateStatus = (id: string, status: 'new' | 'in_progress' | 'replied' | 'archived') => {
    store.updateEnquiryStatus(id, status);
    showToast(`Enquiry marked as ${status}.`, 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#153D32]">Contact Enquiries</h1>
          <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
            Incoming member questions, 1-on-1 consultation requests, and community notes.
          </p>
        </div>

        {enquiries.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#A8BDA5]/30 text-center text-xs text-[#252A27]/60">
            No inquiries recorded.
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white p-6 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#A8BDA5]/20 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#153D32] text-sm">{enq.name}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-700">
                        {enq.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#252A27]/60 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${enq.email}`} className="hover:underline">{enq.email}</a>
                      </span>
                      {enq.mobile && (
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="w-3 h-3" />
                          <a href={`tel:${enq.mobile}`} className="hover:underline">{enq.mobile}</a>
                        </span>
                      )}
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    enq.status === 'new' ? 'bg-amber-100 text-amber-900' :
                    enq.status === 'replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {enq.status.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-[#252A27]/85 leading-relaxed bg-[#F8F6F0] p-4 rounded-xl">
                  {enq.message}
                </p>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#252A27]/50">{new Date(enq.createdAt).toLocaleString()}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(enq.id, 'in_progress')}
                      className="px-3 py-1 rounded-full border border-gray-300 text-gray-700 text-[11px] font-semibold hover:bg-gray-50"
                    >
                      In Progress
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(enq.id, 'replied')}
                      className="px-3 py-1 rounded-full bg-[#153D32] text-white text-[11px] font-semibold hover:bg-[#0E2922]"
                    >
                      Mark Replied
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(enq.id, 'archived')}
                      className="px-3 py-1 rounded-full border border-gray-200 text-gray-500 text-[11px] hover:bg-gray-50"
                    >
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
