import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Mail, Briefcase, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ImageUpload from '../../components/dashboard/ImageUpload';
import api from '../../api/api';

const EMPTY_FORM = {
  name: '', email: '', designation: '', bio: '',
  specialization: '', socialLinks: { linkedin: '', github: '', whatsapp: '' },
  image: ''
};

const TeacherModal = ({ teacher, onClose, onSaved }) => {
  const [form, setForm] = useState(
    teacher
      ? { 
          ...teacher, 
          specialization: (teacher.specialization || []).join(', '),
          socialLinks: { ...EMPTY_FORM.socialLinks, ...teacher.socialLinks }
        }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const key = name.replace('social_', '');
      setForm(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      specialization: form.specialization.split(',').map(s => s.trim()).filter(Boolean)
    };
    try {
      if (teacher?._id) {
        await api.put(`/teachers/${teacher._id}`, payload);
        toast.success('Instructor updated!');
      } else {
        await api.post('/teachers', payload);
        toast.success('Instructor added!');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save instructor');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">{teacher?._id ? 'Edit Instructor' : 'Add Instructor'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <ImageUpload 
            value={form.image} 
            onChange={(val) => setForm(prev => ({ ...prev, image: val }))}
            label="Instructor Photo"
          />
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="e.g. Dr. Muhammad Saad" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="name@techhub.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Designation *</label>
              <input name="designation" value={form.designation} onChange={handleChange} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g. Senior Instructor" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
              placeholder="Brief bio about the instructor..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Specializations (comma separated)</label>
            <input name="specialization" value={form.specialization} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="React, Node.js, Python, AI" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
              <input name="social_linkedin" value={form.socialLinks?.linkedin || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp Number</label>
              <input name="social_whatsapp" value={form.socialLinks?.whatsapp || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g. +923001234567" />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50">
              {saving ? 'Saving...' : teacher?._id ? 'Update Instructor' : 'Add Instructor'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/teachers');
      setTeachers(res.data.data);
    } catch (err) {
      console.error('Could not load instructors', err);
      toast.error('Could not load instructors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this instructor?')) return;
    try {
      await api.delete(`/teachers/${id}`);
      toast.success('Instructor removed');
      setTeachers(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Delete failed');
    }
  };

  useEffect(() => { fetchTeachers(); }, []);

  const openCreate = () => { setCurrentTeacher(null); setShowModal(true); };
  const openEdit = (t) => { setCurrentTeacher(t); setShowModal(true); };

  const filtered = teachers.filter(t => (t.name || '').toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showModal && (
          <TeacherModal teacher={currentTeacher} onClose={() => setShowModal(false)} onSaved={fetchTeachers} />
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Instructors & Staff</h1>
          <p className="text-gray-400">Manage your expert teaching team.</p>
        </div>
        <button onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all text-white">
          <Plus size={20} /> Add Instructor
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input type="text" placeholder="Search by name, designation or email..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading instructors...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <motion.div key={item._id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl group relative">
              <div className="flex gap-5 items-start">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shrink-0 overflow-hidden border border-white/10">
                  {item.image ? (
                    <img 
                      src={item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/assets/instructors/${item.image}`} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    (item.name || 'I').charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">{item.name}</h3>
                  <p className="text-sm text-blue-500 flex items-center gap-1.5 mb-1"><Briefcase size={14} /> {item.designation}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 truncate"><Mail size={14} /> {item.email}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.specialization?.map((spec, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400">{spec}</span>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-3">
                  {item.socialLinks?.linkedin && (
                    <a href={item.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {item.socialLinks?.whatsapp && (
                    <a href={`https://wa.me/${item.socialLinks.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-500">
              No instructors found. Click "Add Instructor" to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageTeachers;
