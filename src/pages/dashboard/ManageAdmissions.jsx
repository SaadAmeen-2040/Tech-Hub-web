import React, { useState, useEffect } from 'react';
import {
  Search, Trash2, Check, X, Eye, Download, Mail, Phone, Calendar, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../../api/api';

// â”€â”€â”€ Detail Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”// â”€â”€â”€ Detail Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DetailModal = ({ item, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-xl shadow-2xl overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Application Details</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white"><X size={20} /></button>
      </div>
      <div className="space-y-4">
        {[
          ['Student Name', item.fullName],
          ['Father Name', item.fatherName],
          ['Email', item.email],
          ['WhatsApp', item.whatsapp],
          ['Phone', item.phone],
          ['CNIC', item.cnic],
          ['DOB', item.dob ? new Date(item.dob).toLocaleDateString() : 'â€”'],
          ['Course Applied', item.course],
          ['Qualification', item.qualification],
          ['Field of Study', item.fieldOfStudy],
          ['Address', item.address],
          ['Guardian Phone', item.guardianPhone],
          ['Applied At', new Date(item.appliedAt).toLocaleString()],
          ['Status', item.status],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-4 border-b border-white/5 pb-2">
            <span className="text-gray-500 text-xs w-32 shrink-0">{label}</span>
            <span className="text-white text-sm font-medium">{value || 'â€”'}</span>
          </div>
        ))}
      </div>
      <button onClick={onClose} className="mt-8 w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl border border-white/10 transition-all">Close</button>
    </motion.div>
  </div>
);

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ManageAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admissions');
      setAdmissions(res.data.data);
    } catch (err) {
      console.error('Could not load admissions', err);
      toast.error('Could not load admissions');
      setAdmissions([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAdmissions(); }, []);

  const handleExport = async () => {
    try {
      const response = await api.get('/admissions/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'admissions.csv');
      document.body.appendChild(link);
      link.click();
      toast.success('Exported successfully!');
    } catch {
      toast.error('Export failed');
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.put(`/admissions/${id}`, { status });
      toast.success(`Marked as ${status}`);
      setAdmissions(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    } catch {
      toast.error('Failed to update status');
    } finally { setUpdatingId(null); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application permanently?')) return;
    try {
      await api.delete(`/admissions/${id}`);
      toast.success('Deleted');
      setAdmissions(prev => prev.filter(a => a._id !== id));
    } catch { toast.error('Delete failed'); }
  };

  const statusColor = (s) => ({
    Accepted: 'bg-green-500/10 text-green-500 border-green-500/20',
    Rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
    Reviewed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Pending:  'bg-orange-500/10 text-orange-500 border-orange-500/20',
  }[s] || 'bg-gray-500/10 text-gray-400 border-white/10');

  const filtered = admissions
    .filter(a => filterStatus === 'All' || a.status === filterStatus)
    .filter(a => (a.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admissions</h1>
          <p className="text-gray-400">Review and manage student applications.</p>
        </div>
        <button onClick={handleExport}
          className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-all text-white">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: admissions.length, color: 'text-white' },
          { label: 'Pending', value: admissions.filter(a => a.status === 'Pending').length, color: 'text-orange-500' },
          { label: 'Accepted', value: admissions.filter(a => a.status === 'Accepted').length, color: 'text-green-500' },
          { label: 'Rejected', value: admissions.filter(a => a.status === 'Rejected').length, color: 'text-red-500' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <p className="text-gray-500 text-xs mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input type="text" placeholder="Search by student name..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div className="relative">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer">
            {['All', 'Pending', 'Reviewed', 'Accepted', 'Rejected'].map(s => (
              <option key={s} value={s} className="bg-[#111]">{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Applied</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="py-16 text-center text-gray-500">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-16 text-center text-gray-500">No admissions found.</td></tr>
              ) : filtered.map(item => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-white font-semibold">{item.fullName}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Mail size={11} />{item.email}</span>
                      <span className="flex items-center gap-1"><Phone size={11} />{item.whatsapp}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{item.course || 'â€”'}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1.5"><Calendar size={13} />{new Date(item.appliedAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setSelectedItem(item)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => updateStatus(item._id, 'Accepted')} disabled={updatingId === item._id || item.status === 'Accepted'}
                        className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-all disabled:opacity-30" title="Accept">
                        <Check size={16} />
                      </button>
                      <button onClick={() => updateStatus(item._id, 'Rejected')} disabled={updatingId === item._id || item.status === 'Rejected'}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-30" title="Reject">
                        <X size={16} />
                      </button>
                      <button onClick={() => handleDelete(item._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmissions;
