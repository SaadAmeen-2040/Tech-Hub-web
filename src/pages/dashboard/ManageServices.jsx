import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../../api/api';

const EMPTY_FORM = {
  title: '',
  description: '',
  icon: 'Code2',
  features: '',
  color: 'bg-indigo-600',
  highlight: false
};

const ICONS = [
  'Code2', 'LineChart', 'Users', 'Lightbulb', 'Rocket', 
  'Smartphone', 'Database', 'Layers', 'GraduationCap', 'Award', 'Cpu'
];

const ServiceModal = ({ item, onClose, onSaved }) => {
  const [form, setForm] = useState(item ? { ...item, features: item.features?.join(', ') || '' } : EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        features: form.features.split(',').map(f => f.trim()).filter(Boolean)
      };

      if (item?._id) {
        await api.put(`/services/${item._id}`, payload);
        toast.success('Service updated!');
      } else {
        await api.post('/services', payload);
        toast.success('Service created!');
      }
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save service');
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
        className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-xl shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{item?._id ? 'Edit Service' : 'Add Service'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Service Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Icon Name</label>
            <select name="icon" value={form.icon} onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all">
              {ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Features (comma separated)</label>
            <input name="features" value={form.features} onChange={handleChange}
              placeholder="NAVTTC Certified, Hands-on Projects..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Color Class</label>
              <select name="color" value={form.color} onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all">
                <option value="bg-indigo-600">Indigo (Highlight)</option>
                <option value="bg-slate-900">Slate (Dark)</option>
                <option value="bg-purple-600">Purple</option>
                <option value="bg-emerald-600">Emerald</option>
              </select>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-6">
              <input type="checkbox" name="highlight" checked={form.highlight} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">Highlight Service</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none" />
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services');
      setServices(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error('Could not load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      toast.success('Deleted');
      setServices(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showModal && (
          <ServiceModal 
            item={currentItem} 
            onClose={() => setShowModal(false)} 
            onSaved={fetchServices} 
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Services</h1>
          <p className="text-gray-400">Add, edit, or remove services offered by Tech Hub.</p>
        </div>
        <button onClick={() => { setCurrentItem(null); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all text-white">
          <Plus size={20} /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-500">Loading...</div>
        ) : services.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500">No services found.</div>
        ) : (
          services.map(item => (
            <div key={item._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white`}>
                    <span className="text-xs">{item.icon}</span>
                  </div>
                  {item.highlight && (
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded border border-yellow-500/20">
                      Highlighted
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.features?.map((f, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs">{f}</span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-end gap-2 mt-auto">
                <button onClick={() => { setCurrentItem(item); setShowModal(true); }} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
