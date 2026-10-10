import React, { useState } from 'react';
import { CheckCircle, XCircle, Trash2, Star, Clock } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { store } from '../../services/store';
import { useToast } from '../../components/Toast';

export const AdminTestimonials: React.FC = () => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const testimonials = store.getTestimonials(false);

  const filtered = testimonials.filter(t => filter === 'all' || t.status === filter);

  const handleStatusChange = (id: string, status: 'approved' | 'rejected') => {
    store.updateTestimonialStatus(id, status);
    showToast(`Testimonial ${status}.`, 'success');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this testimonial record?')) {
      store.deleteTestimonial(id);
      showToast('Testimonial deleted.', 'success');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#153D32]">Testimonial Moderation</h1>
            <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
              Review and approve genuine community stories before displaying them on public pages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['all', 'pending', 'approved'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  filter === tab
                    ? 'bg-[#153D32] text-white shadow-xs'
                    : 'bg-white text-[#252A27]/70 border border-[#A8BDA5]/40 hover:bg-[#F8F6F0]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-[#A8BDA5]/40 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#153D32] text-sm">{t.authorName}</h4>
                    <p className="text-[11px] text-[#252A27]/60">{t.authorLocation} • {new Date(t.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    t.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    t.status === 'pending' ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-800'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <div className="flex text-[#C6A66A]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs font-semibold text-[#153D32]">
                  “{t.journeyHighlight}”
                </p>

                <p className="text-xs text-[#252A27]/80 leading-relaxed italic">
                  {t.content}
                </p>
              </div>

              <div className="pt-3 border-t border-[#A8BDA5]/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <div className="flex items-center gap-2">
                  {t.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(t.id, 'approved')}
                      className="px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>Approve</span>
                    </button>
                  )}
                  {t.status !== 'rejected' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(t.id, 'rejected')}
                      className="px-3 py-1 rounded-full border border-red-300 text-red-700 text-xs font-semibold hover:bg-red-50 flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" />
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
