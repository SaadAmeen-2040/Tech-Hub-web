import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../../api/api';
import ImageUpload from '../../components/dashboard/ImageUpload';

const EMPTY_FORM = {
  title: '',
  imageUrl: '',
  category: 'Campus'
};

const GalleryModal = ({ onClose, onSaved }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.imageUrl) {
      toast.error('Please upload an image first');
      return;
    }
    setSaving(true);
    try {
      await api.post('/gallery', form);
      toast.success('Gallery item added!');
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add gallery item');
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
          <h2 className="text-xl font-bold text-white">Add Gallery Image</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Title (Optional)</label>
            <input name="title" value={form.title} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} required
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all">
              <option value="Campus">Campus</option>
              <option value="Event">Event</option>
              <option value="Student Projects">Student Projects</option>
              <option value="Awards">Awards</option>
            </select>
          </div>

          <ImageUpload
            value={form.imageUrl}
            onChange={(url) => setForm(prev => ({ ...prev, imageUrl: url }))}
            onUploading={setUploading}
            label="Upload Gallery Image *"
          />

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50">
              {saving ? 'Adding...' : 'Add to Gallery'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function ManageGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Campus', 'Event', 'Student Projects', 'Awards'];

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await api.get('/gallery');
      setItems(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error('Could not load gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Image removed');
      setItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  const filteredItems = activeTab === 'All' 
    ? items 
    : items.filter(item => item.category === activeTab);

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showModal && (
          <GalleryModal 
            onClose={() => setShowModal(false)} 
            onSaved={fetchGallery} 
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gallery Management</h1>
          <p className="text-gray-400">Upload and showcase photos of campus life, projects, and events.</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all text-white">
          <Plus size={20} /> Add Image
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeTab === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-500">Loading...</div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500">No images found in this category.</div>
        ) : (
          filteredItems.map(item => (
            <div key={item._id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group relative aspect-square shadow-md">
              <img 
                src={item.imageUrl} 
                alt={item.title || 'Gallery image'}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6">
                <span className="self-start px-3 py-1 bg-blue-600/90 text-white text-xs font-bold rounded-full">
                  {item.category}
                </span>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-white font-bold text-sm truncate max-w-[70%]">
                    {item.title || 'Untitled'}
                  </span>
                  <button 
                    onClick={() => handleDelete(item._id)} 
                    className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all shadow-lg"
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
