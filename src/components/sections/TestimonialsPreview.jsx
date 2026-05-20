import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, X } from 'lucide-react';
import api from '../../api/api';

export default function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials');
        // Only show featured ones on homepage
        const featured = res.data.data.filter(t => t.isFeatured);
        setTestimonials(featured.length > 0 ? featured : res.data.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (loading || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 font-bold text-sm mb-6 shadow-inner"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="tracking-wide">Student Success Stories</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Hear From Our <span className="text-indigo-400">Graduates</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => {
            const videoId = getYoutubeId(testimonial.youtubeLink);
            return (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-indigo-500/50 transition-all duration-500 backdrop-blur-sm"
              >
                {testimonial.youtubeLink && videoId ? (
                  <div className="aspect-video relative overflow-hidden bg-black">
                    <img 
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                      alt={testimonial.studentName}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700"
                    />
                    <button 
                      onClick={() => setActiveVideoId(videoId)}
                      className="absolute inset-0 flex items-center justify-center w-full h-full"
                    >
                      <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center text-white shadow-xl shadow-red-600/20 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 ml-1 fill-white" />
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="h-32 bg-linear-to-r from-indigo-500/20 to-purple-500/20"></div>
                )}
                
                <div className="p-8 relative">
                  <div className="absolute -top-8 left-8">
                    <div className="w-16 h-16 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.studentName)}&background=4f46e5&color=fff`}
                        alt={testimonial.studentName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-6 mb-4">
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating || 5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white">{testimonial.studentName}</h3>
                    <p className="text-sm text-indigo-400 font-medium">{testimonial.courseName}</p>
                  </div>
                  
                  {testimonial.review && (
                    <p className="text-slate-300 italic text-sm leading-relaxed border-l-2 border-indigo-500/30 pl-4">
                      "{testimonial.review}"
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <div className="absolute top-6 right-6 z-55">
              <button 
                onClick={() => setActiveVideoId(null)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10 relative"
            >
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
