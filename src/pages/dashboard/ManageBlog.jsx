import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../../api/api';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, X, FileText, Image as ImageIcon } from 'lucide-react';

import ImageUpload from '../../components/dashboard/ImageUpload';

const EMPTY = { title: '', excerpt: '', content: '', author: 'Tech Hub Team', category: 'General', tags: '', isPublished: false, image: '' };

const BlogModal = ({ blog, onClose, onSaved }) => {
  const [form, setForm] = useState(blog ? { ...blog, tags: (blog.tags || []).join(', ') } : EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags };
    try {
      if (blog?._id) {
        await api.put(`/blogs/${blog._id}`, payload);
        toast.success('Post updated!');
      } else {
        await api.post('/blogs', payload);
        toast.success('Post created!');
      }
      onSaved(); onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save');
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">{blog?._id ? 'Edit Post' : 'New Blog Post'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white"><X size={22} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <ImageUpload 
            value={form.image} 
            onChange={(val) => setForm(prev => ({ ...prev, image: val }))}
            onUploading={setUploading}
            label="Cover Image"
          />

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Blog post title..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Author</label>
              <input name="author" value={form.author} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all">
                {['General', 'Tech News', 'Tutorial', 'Student Success', 'Events', 'Career Tips'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt *</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} required rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
              placeholder="Short summary shown in listings..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Content *</label>
            <textarea name="content" value={form.content} onChange={handleChange} required rows={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none font-mono text-sm"
              placeholder="Full blog post content..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              placeholder="react, javascript, web development" />
          </div>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">Publish immediately</span>
            </label>
          </div>
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 transition-all">Cancel</button>
            <button type="submit" disabled={saving || uploading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50">
              {saving ? 'Saving...' : blog?._id ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/blogs');
      setBlogs(res.data.data);
    } catch (err) {
      console.error('Could not load blog posts', err);
      toast.error('Could not load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success('Post deleted');
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch { toast.error('Delete failed'); }
  };

  const togglePublish = async (blog) => {
    try {
      await api.put(`/blogs/${blog._id}`, { isPublished: !blog.isPublished });
      toast.success(blog.isPublished ? 'Post unpublished' : 'Post published');
      fetchBlogs();
    } catch { toast.error('Failed to update status'); }
  };

  const filtered = blogs.filter(b => (b.title || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showModal && <BlogModal blog={current} onClose={() => setShowModal(false)} onSaved={fetchBlogs} />}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
          <p className="text-gray-400">Create and publish blog articles and news.</p>
        </div>
        <button onClick={() => { setCurrent(null); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 text-white">
          <Plus size={20} /> New Post
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all" />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm uppercase tracking-wider border-b border-white/10">
                <th className="px-8 py-5 font-semibold">Post</th>
                <th className="px-8 py-5 font-semibold">Category</th>
                <th className="px-8 py-5 font-semibold">Author</th>
                <th className="px-8 py-5 font-semibold">Status</th>
                <th className="px-8 py-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-8 py-16 text-center text-gray-500">Loading posts...</td></tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <FileText size={40} className="mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-500">No blog posts yet. Create your first one!</p>
                  </td>
                </tr>
              ) : filtered.map(blog => (
                <tr key={blog._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      {blog.image ? (
                        <img src={blog.image} className="w-12 h-8 rounded object-cover border border-white/10" alt="" />
                      ) : (
                        <div className="w-12 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                          <ImageIcon size={14} className="text-gray-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-bold group-hover:text-blue-400 transition-colors">{blog.title}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{blog.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-400 whitespace-nowrap">{blog.category}</span>
                  </td>
                  <td className="px-8 py-5 text-gray-300">{blog.author}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${blog.isPublished ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => togglePublish(blog)} className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-all" title={blog.isPublished ? 'Unpublish' : 'Publish'}>
                        {blog.isPublished ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button onClick={() => { setCurrent(blog); setShowModal(true); }} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
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

export default ManageBlog;
