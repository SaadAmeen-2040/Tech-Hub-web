import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Mail, Linkedin, GraduationCap, Award } from "lucide-react";
import api from "../../api/api";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await api.get('/teachers');
        setInstructors(res.data.data);
      } catch (err) {
        console.error("Failed to fetch instructors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

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
              className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={instructor.image?.startsWith('http') ? instructor.image : `/assets/instructors/${instructor.image}`} 
                  alt={instructor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(instructor.name) + "&background=6366f1&color=fff&size=512";
                  }}
                />
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

                {/* Socials Placeholder */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                  <a href={instructor.socialLinks?.linkedin || "#"} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={`mailto:${instructor.email}`} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
