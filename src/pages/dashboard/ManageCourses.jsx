import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Filter, CheckCircle, XCircle, Clock, BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ImageUpload from '../../components/dashboard/ImageUpload';
import api from '../../api/api';

const EMPTY_FORM = {
  title: '', description: '', category: '', instructor: '',
  duration: '', level: 'Beginner', price: 0, isGovernmentFunded: false,
  thumbnail: ''
};

const CourseModal = ({ course, onClose, onSaved }) => {
  const [form, setForm] = useState(course || EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (course?._id) {
        await api.put(`/courses/${course._id}`, form);
        toast.success('Course updated!');
      } else {
        await api.post('/courses', form);
        toast.success('Course created!');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save course');
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
        className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">{course?._id ? 'Edit Course' : 'Create New Course'}</h2>
            <p className="text-gray-500 text-sm mt-1">Fill in the details below</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <ImageUpload 
            value={form.thumbnail} 
            onChange={(val) => setForm(prev => ({ ...prev, thumbnail: val }))}
            label="Course Thumbnail"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Course Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g. Full Stack Web Development" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
                placeholder="Describe what students will learn..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all">
                <option value="">Select Category</option>
                {['Programming', 'Design', 'AI & ML', 'Cybersecurity', 'Business', 'Networking', 'Database'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Instructor *</label>
              <input name="instructor" value={form.instructor} onChange={handleChange} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="Instructor full name" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Duration *</label>
              <input name="duration" value={form.duration} onChange={handleChange} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g. 3 Months" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Level</label>
              <select name="level" value={form.level} onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all">
                {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Price (PKR)</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} min={0}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="0 for free/government funded" />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isGovernmentFunded" checked={form.isGovernmentFunded} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-300">Government / NAVTTC Funded</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50">
              {saving ? 'Saving...' : course?._id ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/courses');
      setCourses(res.data.data);
    } catch (err) {
      toast.error('Could not load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success('Course deleted');
      setCourses(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  const openCreate = () => { setCurrentCourse(null); setShowModal(true); };
  const openEdit = (course) => { setCurrentCourse(course); setShowModal(true); };

  const filtered = courses.filter(c => (c.title || '').toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showModal && (
          <CourseModal
            course={currentCourse}
            onClose={() => setShowModal(false)}
            onSaved={fetchCourses}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Courses</h1>
          <p className="text-gray-400">Add, edit or remove courses from the platform.</p>
        </div>
        <button onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 text-white">
          <Plus size={20} /> Create New Course
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input type="text" placeholder="Search courses..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm uppercase tracking-wider border-b border-white/10">
                <th className="px-8 py-5 font-semibold">Course Details</th>
                <th className="px-8 py-5 font-semibold">Instructor</th>
                <th className="px-8 py-5 font-semibold">Duration & Level</th>
                <th className="px-8 py-5 font-semibold">Status</th>
                <th className="px-8 py-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-8 py-16 text-center text-gray-500">Loading courses...</td></tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                      <BookOpen size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
                    <p className="text-gray-500">Click "Create New Course" to get started.</p>
                  </td>
                </tr>
              ) : filtered.map((course) => (
                <tr key={course._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold text-lg shrink-0 overflow-hidden border border-white/10">
                        {course.thumbnail ? (
                          <img 
                            src={course.thumbnail.startsWith('http') || course.thumbnail.startsWith('/') ? course.thumbnail : `/assets/courses/${course.thumbnail}`} 
                            alt={course.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          (course.title || 'C').charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="text-white font-bold group-hover:text-blue-400 transition-colors">{course.title || 'Untitled'}</p>
                        <p className="text-xs text-gray-500">{course.category || 'General'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-gray-300 font-medium">{course.instructor}</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock size={14} /> {course.duration}
                      </div>
                      <span className="text-xs font-semibold text-blue-400">{course.level}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {course.isGovernmentFunded ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-green-500/10 text-green-500 border border-green-500/20">
                        <CheckCircle size={12} /> Gov Funded
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-500/10 text-gray-400 border border-white/5">
                        <XCircle size={12} /> Standard
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button onClick={() => openEdit(course)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(course._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={18} />
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

export default ManageCourses;
