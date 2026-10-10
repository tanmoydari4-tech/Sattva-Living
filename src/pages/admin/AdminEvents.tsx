import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Video, Clock, Users } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { store } from '../../services/store';
import { useToast } from '../../components/Toast';
import { WellnessEvent } from '../../types';
import { Modal } from '../../components/Modal';

export const AdminEvents: React.FC = () => {
  const { showToast } = useToast();
  const events = store.getEvents();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<WellnessEvent | null>(null);

  const [form, setForm] = useState<Partial<WellnessEvent>>({
    title: '',
    titleBn: '',
    description: '',
    descriptionBn: '',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    startAt: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16),
    endAt: new Date(Date.now() + 86400000 * 3 + 3600000).toISOString().slice(0, 16),
    timezone: 'Asia/Kolkata (IST)',
    format: 'online',
    meetingUrl: 'https://meet.google.com/stv-new-session',
    hostName: 'Dr. Ananya Roy',
    hostBio: 'Holistic Lifestyle Educator',
    hostBioBn: 'হোলিস্টিক লাইফস্টাইল শিক্ষিকা',
    capacity: 100,
    price: 0,
    status: 'upcoming',
  });

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setForm({
      title: '',
      titleBn: '',
      description: '',
      descriptionBn: '',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
      startAt: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16),
      endAt: new Date(Date.now() + 86400000 * 3 + 3600000).toISOString().slice(0, 16),
      timezone: 'Asia/Kolkata (IST)',
      format: 'online',
      meetingUrl: 'https://meet.google.com/stv-new-session',
      hostName: 'Dr. Ananya Roy',
      hostBio: 'Holistic Lifestyle Educator',
      hostBioBn: 'হোলিস্টিক লাইফস্টাইল শিক্ষিকা',
      capacity: 100,
      price: 0,
      status: 'upcoming',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (evt: WellnessEvent) => {
    setEditingEvent(evt);
    setForm({
      ...evt,
      startAt: new Date(evt.startAt).toISOString().slice(0, 16),
      endAt: new Date(evt.endAt).toISOString().slice(0, 16),
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim()) {
      showToast('Please provide event title.', 'error');
      return;
    }

    const eventToSave: WellnessEvent = {
      id: editingEvent ? editingEvent.id : `evt-${Date.now()}`,
      title: form.title || '',
      titleBn: form.titleBn || form.title || '',
      description: form.description || '',
      descriptionBn: form.descriptionBn || form.description || '',
      imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
      startAt: form.startAt ? new Date(form.startAt).toISOString() : new Date().toISOString(),
      endAt: form.endAt ? new Date(form.endAt).toISOString() : new Date().toISOString(),
      timezone: form.timezone || 'Asia/Kolkata (IST)',
      format: (form.format as 'online' | 'offline') || 'online',
      meetingUrl: form.meetingUrl || 'https://meet.google.com/stv-demo',
      hostName: form.hostName || 'Senior Mentor',
      hostBio: form.hostBio || 'Holistic Practitioner',
      hostBioBn: form.hostBioBn || 'অভিজ্ঞ পরামর্শক',
      capacity: Number(form.capacity) || 100,
      registeredCount: editingEvent ? editingEvent.registeredCount : 0,
      registrationDeadline: form.startAt ? new Date(form.startAt).toISOString() : new Date().toISOString(),
      status: (form.status as any) || 'upcoming',
      price: Number(form.price) || 0,
      category: 'workshop',
      createdAt: editingEvent ? editingEvent.createdAt : new Date().toISOString(),
    };

    store.saveEvent(eventToSave);
    setModalOpen(false);
    showToast('Event saved successfully.', 'success');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      store.deleteEvent(id);
      showToast('Event removed.', 'success');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#153D32]">Event Management</h1>
            <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
              Organize morning awakenings, evening relaxations, and live masterclasses.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule New Event</span>
          </button>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-3xl border border-[#A8BDA5]/40 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6F0] border-b border-[#A8BDA5]/20 text-[#153D32] font-semibold">
                <tr>
                  <th className="p-4">Event Circle</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Format</th>
                  <th className="p-4">Attendees</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A8BDA5]/20 text-[#252A27]/85">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-[#F8F6F0]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={evt.imageUrl} alt={evt.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-[#153D32]">{evt.title}</p>
                          <p className="text-[11px] text-[#252A27]/60">Host: {evt.hostName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{new Date(evt.startAt).toLocaleDateString()}</p>
                      <p className="text-[11px] text-[#252A27]/60">{new Date(evt.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                    <td className="p-4 capitalize">{evt.format}</td>
                    <td className="p-4 font-semibold text-[#153D32]">
                      {evt.registeredCount || 0} / {evt.capacity}
                    </td>
                    <td className="p-4 font-bold text-[#153D32]">
                      {evt.price > 0 ? `₹${evt.price}` : 'Free'}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(evt)}
                        className="p-1.5 rounded-lg text-[#252A27]/60 hover:text-[#153D32] hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(evt.id)}
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

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingEvent ? 'Edit Event Circle' : 'Schedule Event Circle'}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                value={form.startAt}
                onChange={(e) => setForm({ ...form, startAt: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">End Date & Time</label>
              <input
                type="datetime-local"
                value={form.endAt}
                onChange={(e) => setForm({ ...form, endAt: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Host Name</label>
              <input
                type="text"
                value={form.hostName}
                onChange={(e) => setForm({ ...form, hostName: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Capacity</label>
              <input
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Price (₹)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Private Meeting URL (Google Meet / Zoom)</label>
            <input
              type="url"
              value={form.meetingUrl}
              onChange={(e) => setForm({ ...form, meetingUrl: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
              Save Event
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
