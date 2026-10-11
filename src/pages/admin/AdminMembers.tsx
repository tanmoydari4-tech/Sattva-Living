import React, { useState } from 'react';
import { Search, Download, CheckCircle, XCircle, Shield, User } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { store, useStoreVersion } from '../../services/store';
import { useToast } from '../../components/Toast';

export const AdminMembers: React.FC = () => {
  useStoreVersion();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const members = store.getUsers();

  const filteredMembers = members.filter(
    (m) =>
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (uid: string) => {
    store.toggleUserStatus(uid);
    showToast('Member status updated.', 'success');
  };

  const handleExportCSV = () => {
    const headers = ['Full Name', 'Email', 'Mobile', 'Role', 'Status', 'Preferred Language', 'Joined Date'];
    const rows = filteredMembers.map(m => [
      `"${m.fullName}"`,
      `"${m.email}"`,
      `"${m.mobile}"`,
      `"${m.role}"`,
      `"${m.membershipStatus}"`,
      `"${m.preferredLanguage}"`,
      `"${new Date(m.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sattva_members_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Members exported to CSV.', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#153D32]">Member Management</h1>
            <p className="text-xs sm:text-sm text-[#252A27]/70 mt-1">
              View registered community participants, membership statuses, and export permitted data.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#153D32] text-white text-xs font-semibold hover:bg-[#0E2922] transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#252A27]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-full border border-[#A8BDA5]/40 bg-white focus:outline-hidden focus:ring-1 focus:ring-[#153D32]"
          />
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-3xl border border-[#A8BDA5]/40 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6F0] border-b border-[#A8BDA5]/20 text-[#153D32] font-semibold">
                <tr>
                  <th className="p-4">Member</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Language</th>
                  <th className="p-4">Joined</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A8BDA5]/20 text-[#252A27]/85">
                {filteredMembers.map((m) => (
                  <tr key={m.uid} className="hover:bg-[#F8F6F0]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#153D32] text-white flex items-center justify-center font-bold text-xs">
                          {m.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#153D32]">{m.fullName}</p>
                          <p className="text-[11px] text-[#252A27]/60">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-mono">{m.mobile || '—'}</td>
                    <td className="p-4 capitalize">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.role === 'admin' ? 'bg-[#DFCA9B]/30 text-amber-900' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {m.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        m.membershipStatus === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {m.membershipStatus}
                      </span>
                    </td>
                    <td className="p-4 uppercase font-semibold text-[11px] text-[#153D32]">{m.preferredLanguage}</td>
                    <td className="p-4 text-[#252A27]/60">{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      {m.role !== 'admin' && (
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(m.uid)}
                          className="text-[11px] font-semibold text-[#153D32] hover:underline"
                        >
                          {m.membershipStatus === 'active' ? 'Deactivate' : 'Activate'}
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
    </AdminLayout>
  );
};
