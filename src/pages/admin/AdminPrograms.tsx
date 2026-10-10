import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Layers } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { store } from '../../services/store';
import { useToast } from '../../components/Toast';
import { Program, ProgramCategory } from '../../types';
import { Modal } from '../../components/Modal';

export const AdminPrograms: React.FC = () => {
  const { showToast } = useToast();
  const programs = store.getPrograms();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const [form, setForm] = useState<Partial<Program>>({
    title: '',
    titleBn: '',
    category: 'lifestyle',
    shortDescription: '',
    shortDescriptionBn: '',
    fullDescription: '',
    fullDescriptionBn: '',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80',
    suitableAudience: 'Everyone seeking sustainable wellness',
    suitableAudienceBn: 'সাধারণ মানুষ ও ব্যস্ত পেশাজীবী',
    duration: '6 Weeks',
    durationBn: '৬ সপ্তাহ',
    price: 1999,
    isPaid: true,
    published: true,
    features: ['Weekly interactive circle', 'Digital habit prompts'],
    featuresBn: ['সাপ্তাহিক লাইভ সেশন', 'দৈনিক অভ্যাস গাইড'],
    scheduleDetails: 'Sundays 6:30 PM IST',
    scheduleDetailsBn: 'প্রতি রবিবার সন্ধ্যা ৬:৩০ IST',
  });

  const handleOpenCreate = () => {
    setEditingProgram(null);
    setForm({
      title: '',
      titleBn: '',
      category: 'lifestyle',
      shortDescription: '',
      shortDescriptionBn: '',
      fullDescription: '',
      fullDescriptionBn: '',
      imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80',
      suitableAudience: 'Everyone seeking sustainable wellness',
      suitableAudienceBn: 'সাধারণ মানুষ ও ব্যস্ত পেশাজীবী',
      duration: '6 Weeks',
      durationBn: '৬ সপ্তাহ',
      price: 1999,
      isPaid: true,
      published: true,
      features: ['Weekly interactive circle', 'Digital habit prompts'],
      featuresBn: ['সাপ্তাহিক লাইভ সেশন', 'দৈনিক অভ্যাস গাইড'],
      scheduleDetails: 'Sundays 6:30 PM IST',
      scheduleDetailsBn: 'প্রতি রবিবার সন্ধ্যা ৬:৩০ IST',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Program) => {
    setEditingProgram(p);
    setForm({ ...p });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim() || !form.shortDescription?.trim()) {
      showToast('Please provide program title and short description.', 'error');
      return;
    }

    const programToSave: Program = {
      id: editingProgram ? editingProgram.id : `prog-${Date.now()}`,
      slug: (form.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: form.title || '',
      titleBn: form.titleBn || form.title || '',
      category: (form.category as ProgramCategory) || 'lifestyle',
      shortDescription: form.shortDescription || '',
      shortDescriptionBn: form.shortDescriptionBn || form.shortDescription || '',
      fullDescription: form.fullDescription || form.shortDescription || '',
      fullDescriptionBn: form.fullDescriptionBn || form.shortDescriptionBn || '',
      imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80',
      suitableAudience: form.suitableAudience || '',
      suitableAudienceBn: form.suitableAudienceBn || '',
      duration: form.duration || 'Flexible',
      durationBn: form.durationBn || 'সুবিধাজনক',
      price: Number(form.price) || 0,
      isPaid: Number(form.price) > 0,
      published: form.published ?? true,
      features: form.features || ['Weekly live session'],
      featuresBn: form.featuresBn || ['সাপ্তাহিক লাইভ সেশন'],
      scheduleDetails: form.scheduleDetails || 'Weekly circles',
      scheduleDetailsBn: form.scheduleDetailsBn || 'সাপ্তাহিক অনলাইন সার্কেল',
      createdAt: editingProgram ? editingProgram.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.saveProgram(programToSave);
    setModalOpen(false);
    showToast('Program saved successfully.', 'success');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      store.deleteProgram(id);
      showToast('Program removed.', 'success');
    }
  };

  const handleTogglePublish = (p: Program) => {
    store.saveProgram({ ...p, published: !p.published });
    showToast(`Program ${!p.published ? 'published' : 'hidden'}.`, 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#153D32]">Program Management</h1>
            <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
              Create and manage lifestyle coaching, nutrition, and online wellness circle offerings.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Program</span>
          </button>
        </div>

        {/* Programs Table */}
        <div className="bg-white rounded-3xl border border-[#A8BDA5]/40 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6F0] border-b border-[#A8BDA5]/20 text-[#153D32] font-semibold">
                <tr>
                  <th className="p-4">Program</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A8BDA5]/20 text-[#252A27]/85">
                {programs.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F8F6F0]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-[#153D32]">{p.title}</p>
                          <p className="text-[11px] text-[#252A27]/60 line-clamp-1">{p.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 capitalize font-medium">{p.category}</td>
                    <td className="p-4">{p.duration}</td>
                    <td className="p-4 font-bold text-[#153D32]">
                      {p.price > 0 ? `₹${p.price}` : 'Free/Contact'}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.published ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {p.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(p)}
                        className="p-1.5 rounded-lg text-[#252A27]/60 hover:text-[#153D32] hover:bg-gray-100"
                        title={p.published ? 'Unpublish' : 'Publish'}
                      >
                        {p.published ? <Eye className="w-4 h-4 text-emerald-700" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-[#252A27]/60 hover:text-[#153D32] hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Program Create / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProgram ? 'Edit Wellness Program' : 'Create Wellness Program'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Title (English) *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Title (বাংলা)</label>
              <input
                type="text"
                value={form.titleBn}
                onChange={(e) => setForm({ ...form, titleBn: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              >
                <option value="lifestyle">Lifestyle Coaching</option>
                <option value="nutrition">Nutrition Education</option>
                <option value="morning">Morning Sessions</option>
                <option value="evening">Evening Sessions</option>
                <option value="consultation">Personal Consultation</option>
                <option value="community">Community Circle</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Price (₹ INR)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Duration</label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g. 6 Weeks"
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Cover Image URL</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Short Description *</label>
            <textarea
              rows={2}
              required
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Full Curriculum Description</label>
            <textarea
              rows={4}
              value={form.fullDescription}
              onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="pub"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="rounded-sm text-[#153D32]"
            />
            <label htmlFor="pub" className="text-xs font-semibold text-[#153D32]">Publish immediately to live website</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#A8BDA5]/20">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#A8BDA5] text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922]"
            >
              Save Program
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
