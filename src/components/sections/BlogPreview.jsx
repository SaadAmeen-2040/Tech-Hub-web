import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function BlogPreview() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blogs');
        // Only show latest 3 published blogs
        const published = res.data.data.filter(b => b.isPublished).slice(0, 3);
        setBlogs(published);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6">
            <Newspaper className="w-4 h-4" />
            <span>Latest Updates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            News & <span className="text-gradient">Insights</span> from Tech Hub
          </h2>
        </div>
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-indigo-600 font-black hover:gap-4 transition-all text-sm sm:text-base"
        >
          View All Posts <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-96 bg-slate-50 animate-pulse rounded-[2rem]"></div>
          ))
        ) : (
          blogs.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate('/blog')}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col h-full">
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img src={post.image || "/assets/blog/success.png"} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl font-bold text-xs text-indigo-600 shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-4 text-slate-400 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <User size={14} />
                      {post.author || "Admin"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-2 font-black text-xs text-indigo-600 uppercase tracking-widest">
                    Read More <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
