import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../../api/api';
import ImageUpload from '../../components/dashboard/ImageUpload';

const EMPTY_FORM = {
  title: '',
  student: '',
  course: '',
  image: '',
  description: '',
  tags: '',
  type: 'AI & ML'
};

const ProjectModal = ({ item, onClose, onSaved }) => {
  const [form, setForm] = useState(item ? { ...item, tags: item.tags?.join(', ') || '' } : EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      };

      if (item?._id) {
        await api.put(`/projects/${item._id}`, payload);
        toast.success('Project updated!');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created!');
      }
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0e0e14]/95 border border-white/[0.08] rounded-[2rem] p-8 w-full max-w-xl shadow-2xl overflow-y-auto max-h-[90vh] backdrop-blur-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">{item?._id ? 'Edit Project' : 'Add Project'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Project Title *</label>
            <input 
              name="title" 
              value={form.title} 
              onChange={handleChange} 
              required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm font-semibold" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Student Name *</label>
              <input 
                name="student" 
                value={form.student} 
                onChange={handleChange} 
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm font-semibold" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Course *</label>
              <input 
                name="course" 
                value={form.course} 
                onChange={handleChange} 
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm font-semibold" 
              />
            </div>
          </div>
          <ImageUpload
            value={form.image}
            onChange={(url) => setForm(prev => ({ ...prev, image: url }))}
            onUploading={setUploading}
            label="Project Image"
          />
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category / Type *</label>
            <select 
              name="type" 
              value={form.type} 
              onChange={handleChange} 
              required
              className="w-full bg-[#14141b] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm font-semibold"
            >
              <option value="AI & ML">AI & ML</option>
              <option value="Web Design">Web Design</option>
              <option value="Design">Design</option>
              <option value="Security">Security</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tags (comma separated)</label>
            <input 
              name="tags" 
              value={form.tags} 
              onChange={handleChange}
              placeholder="React, Node.js, Design..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm font-semibold" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description *</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              required 
              rows={3}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm font-semibold resize-none" 
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/[0.06]">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold py-3 rounded-xl border border-white/[0.08] transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving || uploading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/10 disabled:opacity-50 text-sm"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      setProjects(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error('Could not load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Deleted');
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <AnimatePresence>
        {showModal && (
          <ProjectModal 
            item={currentItem} 
            onClose={() => setShowModal(false)} 
            onSaved={fetchProjects} 
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Student Projects</h1>
          <p className="text-gray-400 text-sm font-medium">Manage student showcase portfolio.</p>
        </div>
        <button 
          onClick={() => { setCurrentItem(null); setShowModal(true); }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/10 transition-all text-white"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-500">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            Loading showcase projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 text-sm font-semibold bg-white/[0.02] border border-white/[0.06] rounded-[2.5rem]">
            No projects found.
          </div>
        ) : (
          projects.map(item => (
            <div key={item._id} className="bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 rounded-[2rem] overflow-hidden group transition-all duration-300 shadow-md">
              <div className="aspect-video bg-black/40 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to placeholder image or custom icon box if src fails
                    e.target.onerror = null; 
                    e.target.src = '/assets/placeholder-project.jpg';
                  }}
                />
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mt-1">by {item.student} - {item.type}</p>
                </div>
                
                <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">{item.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags?.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] text-gray-300 rounded-lg text-[10px] font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-white/[0.04] flex justify-end gap-1">
                  <button 
                    onClick={() => { setCurrentItem(item); setShowModal(true); }} 
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)} 
                    className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
