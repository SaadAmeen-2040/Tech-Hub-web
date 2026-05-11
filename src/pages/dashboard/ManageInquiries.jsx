import React, { useState, useEffect } from 'react';
import {
  Search, Trash2, CheckCircle, Clock, Mail, User,
  MessageSquare, Tag, Download, ChevronDown, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../../api/api';

// Export inquiries to CSV (Server-side)
const handleExport = async () => {
  try {
    const response = await api.get('/contacts/export', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'inquiries.csv');
    document.body.appendChild(link);
    link.click();
    toast.success('Exported successfully!');
  } catch {
    toast.error('Export failed');
  }
};

const DetailModal = ({ item, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Inquiry Details</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white"><X size={20} /></button>
      </div>
      <div className="space-y-4">
        {[
          ['Name', item.name],
          ['Email', item.email],
          ['Phone', item.phone],
          ['Type', item.type],
          ['Subject', item.subject],
          ['Company', item.company],
          ['Project', item.projectType],
          ['Category', item.businessCategory],
          ['Budget', item.budget],
          ['AI Included', item.includeAI ? 'Yes' : 'No'],
          ['Country', item.country],
          ['Status', item.status],
        ].filter(([_, v]) => v !== undefined && v !== '').map(([label, value]) => (
          <div key={label} className="flex gap-4 border-b border-white/5 pb-2">
            <span className="text-gray-500 text-sm w-24 shrink-0">{label}</span>
            <span className="text-white text-sm font-medium">{value || '—'}</span>
          </div>
        ))}
        <div className="bg-white/5 rounded-2xl p-4 mt-4">
          <p className="text-xs text-gray-500 mb-2">Message</p>
          <p className="text-sm text-gray-300">{item.message}</p>
        </div>
      </div>
      <button onClick={onClose} className="mt-6 w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl border border-white/10 transition-all">Close</button>
    </motion.div>
  </div>
);

const ManageInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => { fetchInquiries(); }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await api.get('/contacts');
      const filteredInquiries = res.data.data.filter(i => i.type === 'General Inquire');
      setInquiries(filteredInquiries);
    } catch {
      toast.error('Could not load inquiries');
      setInquiries([]);
    } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.put(`/contacts/${id}`, { status });
      toast.success(`Marked as ${status}`);
      setInquiries(prev => prev.map(i => i._id === id ? { ...i, status } : i));
    } catch { toast.error('Update failed'); }
    finally { setUpdatingId(null); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      toast.success('Deleted');
      setInquiries(prev => prev.filter(i => i._id !== id));
    } catch { toast.error('Delete failed'); }
  };

  const statusColor = (s) => ({
    New: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'In Progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Resolved: 'bg-green-500/10 text-green-500 border-green-500/20',
  }[s] || 'bg-gray-500/10 text-gray-400 border-white/10');

  const filtered = inquiries
    .filter(i => filterStatus === 'All' || i.status === filterStatus)
    .filter(i => (i.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                 (i.email || '').toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-gray-400">View and respond to general inquiries from the website.</p>
        </div>
        <button onClick={handleExport}
          className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-all text-white">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'New', value: inquiries.filter(i => i.status === 'New').length, color: 'text-orange-500' },
          { label: 'In Progress', value: inquiries.filter(i => i.status === 'In Progress').length, color: 'text-blue-500' },
          { label: 'Resolved', value: inquiries.filter(i => i.status === 'Resolved').length, color: 'text-green-500' },
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
          <input type="text" placeholder="Search by name or email..." value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <div className="relative">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-10 text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer">
            {['All', 'New', 'In Progress', 'Resolved'].map(s => (
              <option key={s} value={s} className="bg-[#111]">{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-gray-500">Loading inquiries...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-500">No inquiries found.</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filtered.map(item => (
            <motion.div key={item._id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl group">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                    <User size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><Mail size={11} /> {item.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColor(item.status)}`}>
                    {item.status || 'New'}
                  </span>
                  {item.type && (
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {item.type}
                    </span>
                  )}
                </div>
              </div>

              {item.subject && (
                <p className="text-sm text-gray-300 font-semibold flex items-center gap-2 mb-3">
                  <Tag size={14} className="text-gray-500" />{item.subject}
                </p>
              )}
              <p className="text-sm text-gray-400 line-clamp-2 bg-white/5 p-3 rounded-xl">{item.message}</p>

              <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-2">
                  {item.status !== 'In Progress' && (
                    <button onClick={() => updateStatus(item._id, 'In Progress')} disabled={updatingId === item._id}
                      className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg transition-all disabled:opacity-50">
                      In Progress
                    </button>
                  )}
                  {item.status !== 'Resolved' && (
                    <button onClick={() => updateStatus(item._id, 'Resolved')} disabled={updatingId === item._id}
                      className="text-xs bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-1.5 rounded-lg transition-all disabled:opacity-50">
                      Resolve
                    </button>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setSelectedItem(item)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="View full message">
                    <MessageSquare size={16} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageInquiries;
