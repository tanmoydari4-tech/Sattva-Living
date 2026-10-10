import React, { useState } from 'react';
import { Plus, Edit2, Trash2, BookOpen, Save } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { store } from '../../services/store';
import { useToast } from '../../components/Toast';
import { Article } from '../../types';
import { Modal } from '../../components/Modal';

export const AdminArticles: React.FC = () => {
  const { showToast } = useToast();
  const articles = store.getArticles();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [form, setForm] = useState<Partial<Article>>({
    title: '',
    titleBn: '',
    summary: '',
    summaryBn: '',
    content: '',
    contentBn: '',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    author: 'Dr. Ananya Roy',
    authorRole: 'Lifestyle Medicine Educator',
    readTime: '4 min read',
    readTimeBn: '৪ মিনিট পড়ার সময়',
    category: 'nutrition',
    published: true,
    tags: ['Nutrition', 'Habits'],
  });

  const handleOpenCreate = () => {
    setEditingArticle(null);
    setForm({
      title: '',
      titleBn: '',
      summary: '',
      summaryBn: '',
      content: '',
      contentBn: '',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
      author: 'Dr. Ananya Roy',
      authorRole: 'Lifestyle Medicine Educator',
      readTime: '4 min read',
      readTimeBn: '৪ মিনিট পড়ার সময়',
      category: 'nutrition',
      published: true,
      tags: ['Nutrition', 'Habits'],
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setForm({ ...art });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim() || !form.content?.trim()) {
      showToast('Please provide article title and content.', 'error');
      return;
    }

    const articleToSave: Article = {
      id: editingArticle ? editingArticle.id : `art-${Date.now()}`,
      slug: (form.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: form.title || '',
      titleBn: form.titleBn || form.title || '',
      summary: form.summary || '',
      summaryBn: form.summaryBn || form.summary || '',
      content: form.content || '',
      contentBn: form.contentBn || form.content || '',
      imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
      author: form.author || 'Wellness Team',
      authorRole: form.authorRole || 'Contributor',
      publishedDate: editingArticle ? editingArticle.publishedDate : new Date().toISOString().split('T')[0],
      readTime: form.readTime || '4 min read',
      readTimeBn: form.readTimeBn || '৪ মিনিট',
      category: (form.category as any) || 'nutrition',
      published: form.published ?? true,
      tags: form.tags || ['Wellness'],
    };

    store.saveArticle(articleToSave);
    setModalOpen(false);
    showToast('Article saved.', 'success');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      store.deleteArticle(id);
      showToast('Article deleted.', 'success');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#153D32]">Article Management</h1>
            <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
              Publish evidence-informed guides on plate balancing, morning movement, and restorative sleep.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write New Article</span>
          </button>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-3xl border border-[#A8BDA5]/40 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6F0] border-b border-[#A8BDA5]/20 text-[#153D32] font-semibold">
                <tr>
                  <th className="p-4">Article</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A8BDA5]/20 text-[#252A27]/85">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-[#F8F6F0]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={art.imageUrl} alt={art.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-[#153D32]">{art.title}</p>
                          <p className="text-[11px] text-[#252A27]/60 line-clamp-1">{art.summary}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 capitalize font-medium">{art.category}</td>
                    <td className="p-4">{art.author}</td>
                    <td className="p-4 text-[#252A27]/60">{art.publishedDate}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(art)}
                        className="p-1.5 rounded-lg text-[#252A27]/60 hover:text-[#153D32] hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(art.id)}
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
        title={editingArticle ? 'Edit Article' : 'Write New Article'}
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
                <option value="nutrition">Nutrition</option>
                <option value="movement">Movement</option>
                <option value="sleep">Sleep</option>
                <option value="mindfulness">Mindfulness</option>
                <option value="habits">Habits</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Author Name</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#153D32] block mb-1">Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
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
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Summary (English) *</label>
            <textarea
              rows={2}
              required
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#153D32] block mb-1">Article Body Content *</label>
            <textarea
              rows={6}
              required
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#A8BDA5]/40 bg-[#F8F6F0] font-mono text-[11px]"
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
              Save Article
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};
