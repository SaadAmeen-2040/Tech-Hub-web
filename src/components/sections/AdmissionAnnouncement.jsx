import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, CheckCircle2, Award, Users, BookOpen, Shield, Code2, Laptop, Search, ArrowRight, UserCheck } from 'lucide-react';

export default function AdmissionAnnouncement() {
  const navigate = useNavigate();

  const benefits = [
    "100% FREE Courses under NAVTTC",
    "Free International Certification",
    "Expert Faculty & Modern Labs",
    "Hands-on Training + Career Mentorship"
  ];

  const courses = [
    { name: "Advance Web App Development", icon: <Laptop className="w-5 h-5 text-indigo-400" /> },
    { name: "JavaScript Fullstack (MERN/MEAN)", icon: <Code2 className="w-5 h-5 text-purple-400" /> },
    { name: "Cyber Security (CEH, CHFI)", icon: <Shield className="w-5 h-5 text-emerald-400" /> },
    { name: "Google UX Design", icon: <Award className="w-5 h-5 text-pink-400" /> },
    { name: "Digital Forensics", icon: <Search className="w-5 h-5 text-cyan-400" /> }
  ];

  const eligibility = [
    { label: "Education", value: "Intermediate / Bachelor's (14 or 16 Years)", icon: <BookOpen className="w-5 h-5 text-indigo-400" /> },
    { label: "Age Limit", value: "Age 18 to 40 Years", icon: <Users className="w-5 h-5 text-purple-400" /> }
  ];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-sm mb-6 shadow-lg shadow-indigo-500/5"
          >
            <Rocket className="w-4 h-4 animate-bounce text-indigo-400" />
            <span>NAVTTC BATCH 2026 ANNOUNCEMENT</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight"
          >
            𝐀𝐝𝐦𝐢𝐬𝐬𝐢𝐨𝐧𝐬 𝐎𝐩𝐞𝐧 𝐚𝐭 <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">𝐓𝐞𝐜𝐡-𝐇𝐮𝐛 𝐈𝐧𝐧𝐨𝐯𝐚𝐭𝐢𝐨𝐧 𝐂𝐞𝐧𝐭𝐞𝐫</span> 𝐁𝐚𝐡𝐚𝐰𝐚𝐥𝐩𝐮𝐫
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 font-medium"
          >
            Secure your future with world-class, government-funded IT training and international certifications.
          </motion.p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 backdrop-blur-xl shadow-2xl hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-lg shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Why Join Tech Hub?</h3>
              </div>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base font-medium">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider text-center">
              100% Free Tuition & Certification
            </div>
          </motion.div>

          {/* Card 2: Courses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 backdrop-blur-xl shadow-2xl hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between lg:scale-105 bg-linear-to-b from-white/5 via-purple-500/5 to-transparent border-purple-500/20"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 shadow-lg shrink-0">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">💼 Choose From</h3>
              </div>
              <div className="space-y-3 mb-8">
                {courses.map((course, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 text-white font-semibold hover:bg-white/10 transition-colors">
                    <div className="p-2 rounded-xl bg-white/5 shadow-inner shrink-0">
                      {course.icon}
                    </div>
                    <span className="text-xs sm:text-sm">{course.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => navigate('/registration')}
              className="w-full py-3 sm:py-3.5 bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-sm sm:text-base hover:from-indigo-600 hover:to-purple-600 transition-all shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              Apply For NAVTTC Courses <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </motion.div>

          {/* Card 3: Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 backdrop-blur-xl shadow-2xl hover:border-pink-500/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 shadow-lg shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">📌 Eligibility</h3>
              </div>
              <div className="space-y-4 sm:space-y-6 mb-8">
                {eligibility.map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/5">
                    <div className="p-2.5 rounded-2xl bg-white/5 shadow-inner shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{item.label}</span>
                      <span className="text-sm sm:text-base font-bold text-white block">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider text-center">
              Limited Seats Available
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[2rem] p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">Don't Miss This Life-Changing Opportunity</h3>
            <p className="text-base sm:text-lg text-white/90 mb-6 font-medium">Classes are filling up fast. Submit your application online or visit Tech Hub Innovation Center Bahawalpur today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/registration')}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-white text-slate-900 rounded-2xl font-black text-sm sm:text-base hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                Start Registration <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-sm sm:text-base hover:bg-white/20 transition-all flex items-center justify-center"
              >
                Contact Admissions Office
              </button>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
