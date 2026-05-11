import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, GraduationCap, Award, Github, Twitter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/api";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await api.get('/teachers');
        console.log("INSTRUCTORS DATA:", res.data.data);
        setInstructors(res.data.data);
      } catch (err) {
        console.error("Failed to fetch instructors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  const InstructorDetail = ({ instructor, onClose }) => {
    if (!instructor) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/90 backdrop-blur-md overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-[3rem] w-full max-w-4xl overflow-hidden shadow-2xl relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-900 transition-all shadow-sm"
          >
            <X size={24} />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image Section */}
            <div className="aspect-square md:aspect-auto bg-slate-100 overflow-hidden relative">
              <img 
                src={instructor.image?.startsWith('http') || instructor.image?.startsWith('/') ? instructor.image : `/assets/instructors/${instructor.image}`} 
                alt={instructor.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(instructor.name) + "&background=6366f1&color=fff&size=512";
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent md:hidden"></div>
              <div className="absolute bottom-6 left-6 text-white md:hidden">
                <h2 className="text-3xl font-black">{instructor.name}</h2>
                <p className="font-bold text-indigo-300 uppercase tracking-widest">{instructor.designation}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col h-full max-h-[80vh] overflow-y-auto hide-scrollbar">
              <div className="hidden md:block mb-8">
                <h2 className="text-4xl font-black text-slate-900 mb-2">{instructor.name}</h2>
                <p className="text-xl font-bold text-indigo-600 uppercase tracking-widest">{instructor.designation}</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-100 pb-2">About Instructor</h4>
                  <p className="text-lg text-slate-600 leading-relaxed italic">
                    {instructor.bio || "No biography available."}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-100 pb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialization?.map((spec, i) => (
                      <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-100 pb-2">Connect</h4>
                  <div className="flex gap-4">
                    {instructor.socialLinks?.linkedin && (
                      <a href={instructor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-2xl flex items-center justify-center text-slate-400 transition-all shadow-sm">
                        <Linkedin size={24} />
                      </a>
                    )}
                    {instructor.socialLinks?.whatsapp && (
                      <a href={`https://wa.me/${instructor.socialLinks.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-slate-50 hover:bg-green-500 hover:text-white rounded-2xl flex items-center justify-center text-slate-400 transition-all shadow-sm">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      </a>
                    )}
                    <a href={`mailto:${instructor.email}`} className="w-14 h-14 bg-slate-50 hover:bg-rose-500 hover:text-white rounded-2xl flex items-center justify-center text-slate-400 transition-all shadow-sm">
                      <Mail size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Meet Our <span className="text-gradient">Expert Instructors</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Learn from industry veterans with decades of experience in global technology markets.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor._id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedInstructor(instructor)}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={instructor.image?.startsWith('http') || instructor.image?.startsWith('/') ? instructor.image : `/assets/instructors/${instructor.image}`} 
                  alt={instructor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(instructor.name) + "&background=6366f1&color=fff&size=512";
                  }}
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {instructor.name}
                </h3>
                <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-4">
                  {instructor.designation}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <span>{instructor.specialization?.[0] || 'Expert Instructor'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <span>Expert IT Mentor</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">View Profile</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Linkedin size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedInstructor && (
          <InstructorDetail 
            instructor={selectedInstructor} 
            onClose={() => setSelectedInstructor(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
