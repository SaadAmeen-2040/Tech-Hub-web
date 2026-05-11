import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Calendar, MapPin, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../../api/api';
import ImageUpload from '../../components/dashboard/ImageUpload';

const EMPTY = { title: '', description: '', date: '', time: '', venue: '', category: 'Other', registrationLink: '', isFeatured: false, thumbnail: '' };

const EventModal = ({ event, onClose, onSaved }) => {
  const [form, setForm] = useState(event
    ? { ...event, date: event.date ? new Date(event.date).toISOString().split('T')[0] : '' }
    : EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (event?._id) {
        await api.put(`/events/${event._id}`, form);
        toast.success('Event updated!');
      } else {
        await api.post('/events', form);
        toast.success('Event created!');
      }
      onSaved(); onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save event');
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">{event?._id ? 'Edit Event' : 'Create Event'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white"><X size={22} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <ImageUpload 
            value={form.thumbnail} 
            onChange={(val) => setForm(prev => ({ ...prev, thumbnail: val }))}
            onUploading={setUploading}
            label="Event Thumbnail"
          />
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Event Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="e.g. Tech Summit 2026" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
              placeholder="Describe the event..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Date *</label>
              <input name="date" type="date" value={form.date} onChange={handleChange} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Time</label>
              <input name="time" value={form.time} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g. 10:00 AM" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Venue</label>
              <input name="venue" value={form.venue} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="Hall / Online" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all">
                {['Seminar', 'Workshop', 'Webinar', 'Graduation', 'Competition', 'Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Registration Link</label>
            <input name="registrationLink" value={form.registrationLink} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="https://..." />
          </div>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">Feature on Homepage</span>
            </label>
          </div>
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-all">Cancel</button>
            <button type="submit" disabled={saving || uploading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50">
              {saving ? 'Saving...' : event?._id ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/events');
      setEvents(res.data.data);
    } catch { toast.error('Could not load events'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success('Event deleted');
      setEvents(prev => prev.filter(e => e._id !== id));
    } catch { toast.error('Delete failed'); }
  };

  const filtered = events.filter(e => (e.title || '').toLowerCase().includes(search.toLowerCase()));

  const catColor = (cat) => ({
    Seminar: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Workshop: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    Webinar: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    Graduation: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Competition: 'bg-red-500/10 text-red-500 border-red-500/20',
  }[cat] || 'bg-gray-500/10 text-gray-400 border-white/10');

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showModal && <EventModal event={current} onClose={() => setShowModal(false)} onSaved={fetchEvents} />}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Event Management</h1>
          <p className="text-gray-400">Schedule and manage Tech Hub events.</p>
        </div>
        <button onClick={() => { setCurrent(null); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 text-white">
          <Plus size={20} /> Create Event
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input type="text" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-500">
              No events found. Click "Create Event" to schedule one!
            </div>
          ) : filtered.map(event => (
            <motion.div key={event._id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl group relative">
              {event.isFeatured && (
                <span className="absolute top-4 right-4 text-[10px] font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-1 rounded-full">Featured</span>
              )}
              <div className="mb-5">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border uppercase ${catColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-4">{event.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-5">{event.description}</p>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2"><Calendar size={14} />{new Date(event.date).toLocaleDateString()}{event.time && ` · ${event.time}`}</div>
                {event.venue && <div className="flex items-center gap-2"><MapPin size={14} />{event.venue}</div>}
              </div>
              <div className="mt-5 pt-5 border-t border-white/5 flex justify-end gap-2">
                <button onClick={() => { setCurrent(event); setShowModal(true); }} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(event._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
