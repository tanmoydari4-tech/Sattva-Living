import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { store } from '../../services/store';
import { useToast } from '../../components/Toast';
import { GalleryItem } from '../../types';
import { Modal } from '../../components/Modal';

export const AdminGallery: React.FC = () => {
  const { showToast } = useToast();
  const gallery = store.getGallery();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<GalleryItem>>({
    title: '',
    titleBn: '',
    caption: '',
    captionBn: '',
    imageUrl: '',
    category: 'nature_walks',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim() || !form.imageUrl?.trim()) {
      showToast('Please provide a title and image URL.', 'error');
      return;
    }

    store.saveGalleryItem({
      id: `gal-${Date.now()}`,
      title: form.title || '',
      titleBn: form.titleBn || form.title || '',
      caption: form.caption || '',
      captionBn: form.captionBn || form.caption || '',
      imageUrl: form.imageUrl || '',
      category: (form.category as any) || 'nature_walks',
      date: new Date().toISOString().split('T')[0],
    });

    setModalOpen(false);
    showToast('Photo added to gallery.', 'success');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this gallery photo?')) {
      store.deleteGalleryItem(id);
      showToast('Photo deleted.', 'success');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#153D32]">Gallery Management</h1>
            <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
              Curate calming images of community walks, cooking, and mindfulness moments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setForm({
                title: '',
                titleBn: '',
                caption: '',
                captionBn: '',
                imageUrl: '',
                category: 'nature_walks',
              });
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-[#A8BDA5]/40 shadow-xs flex flex-col justify-between">
              <div>
                <img src={item.imageUrl} alt={item.title} className="w-full h-44 object-cover" />
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#153D32]">{item.category}</span>
                  <h4 className="font-serif font-bold text-sm text-[#153D32]">{item.title}</h4>
                  <p className="text-xs text-[#252A27]/70 line-clamp-2">{item.caption}</p>
                </div>
              </div>
              <div className="p-4 pt-0 border-t border-[#A8BDA5]/20 mt-2 flex justify-between items-center text-xs">
                <span className="text-[#252A27]/50">{item.date}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Gallery Photograph">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Image URL *</label>
            <input
              type="url"
              required
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            />
          </div>

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

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as any })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            >
              <option value="nature_walks">Nature Walks</option>
              <option value="cooking">Whole-Food Cooking</option>
              <option value="morning_routines">Gentle Movement</option>
              <option value="community">Community Circles</option>
              <option value="workshops">Workshops</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Caption</label>
            <textarea
              rows={2}
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            />
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
              Save to Gallery
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
