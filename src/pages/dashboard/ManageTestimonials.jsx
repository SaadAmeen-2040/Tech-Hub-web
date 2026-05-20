import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Video, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../../api/api';

const EMPTY_FORM = {
  studentName: '',
  courseName: '',
  review: '',
  youtubeLink: '',
  rating: 5,
  isFeatured: false
};

const TestimonialModal = ({ item, onClose, onSaved }) => {
  const [form, setForm] = useState(item || EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (item?._id) {
        await api.put(`/testimonials/${item._id}`, form);
        toast.success('Testimonial updated!');
      } else {
        await api.post('/testimonials', form);
        toast.success('Testimonial created!');
      }
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save testimonial');
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
        className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-xl shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{item?._id ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Student Name *</label>
            <input name="studentName" value={form.studentName} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Course Name</label>
            <input name="courseName" value={form.courseName} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">YouTube Video Link</label>
            <input name="youtubeLink" value={form.youtubeLink} onChange={handleChange}
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Review / Quote</label>
            <textarea name="review" value={form.review} onChange={handleChange} rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
              <input type="number" name="rating" value={form.rating} onChange={handleChange} min={1} max={5}
                className="w-24 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer mt-6">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">Feature on Homepage</span>
            </label>
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

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error('Could not load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success('Deleted');
      setTestimonials(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showModal && (
          <TestimonialModal 
            item={currentItem} 
            onClose={() => setShowModal(false)} 
            onSaved={fetchTestimonials} 
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Video Testimonials</h1>
          <p className="text-gray-400">Manage student feedback and YouTube videos.</p>
        </div>
        <button onClick={() => { setCurrentItem(null); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all text-white">
          <Plus size={20} /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-gray-500">Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500">No testimonials found.</div>
        ) : (
          testimonials.map(item => (
            <div key={item._id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group">
              {item.youtubeLink ? (
                <div className="aspect-video bg-black relative">
                  <img 
                    src={`https://img.youtube.com/vi/${getYoutubeId(item.youtubeLink)}/hqdefault.jpg`} 
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">
                      <Video size={20} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-white/5 flex items-center justify-center">
                  <span className="text-gray-500">No Video</span>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.studentName}</h3>
                    <p className="text-sm text-indigo-400">{item.courseName}</p>
                  </div>
                  {item.isFeatured && (
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded border border-yellow-500/20">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 line-clamp-3 mb-4 italic">"{item.review}"</p>
                
                <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                  <button onClick={() => { setCurrentItem(item); setShowModal(true); }} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg">
                    <Trash2 size={18} />
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
