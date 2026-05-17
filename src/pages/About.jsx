import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, BookOpen, Rocket, ShieldCheck, Zap } from "lucide-react";
import Instructors from "../components/sections/Instructors";
import api from "../api/api";

const DEFAULT_VALUES = [
  {
    title: "Innovation",
    description: "Staying at the forefront of technological advancements to provide the most relevant training.",
    icon: <Zap className="w-8 h-8" />,
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "Excellence",
    description: "Committed to the highest standards of technical education and practical hands-on learning.",
    icon: <Award className="w-8 h-8" />,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Integrity",
    description: "Building trust through ethical practices and transparent communication with our students.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Student-Centric",
    description: "Focusing on the growth and perception of individuals to help them face the professional world.",
    icon: <Users className="w-8 h-8" />,
    color: "bg-blue-50 text-blue-600"
  }
];

const DEFAULT_STATS = [
  { label: "Years Experience", value: "20+", icon: <Award className="w-6 h-6" /> },
  { label: "Successful Graduates", value: "10,000+", icon: <Users className="w-6 h-6" /> },
  { label: "IT Courses", value: "25+", icon: <BookOpen className="w-6 h-6" /> },
  { label: "Expert Instructors", value: "50+", icon: <Rocket className="w-6 h-6" /> },
];

export default function About() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data.data);
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const getIcon = (name, className = "w-8 h-8") => {
    switch (name) {
      case 'Zap': return <Zap className={className} />;
      case 'Award': return <Award className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Users': return <Users className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Rocket': return <Rocket className={className} />;
      case 'Target': return <Target className={className} />;
      case 'Eye': return <Eye className={className} />;
      default: return <Award className={className} />;
    }
  };
  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const siteStats = settings?.stats || DEFAULT_STATS;
  const siteValues = settings?.coreValues || DEFAULT_VALUES;
  const principal = settings?.principal || { 
    name: 'Muhammad Salman', 
    designation: 'Principal, Tech Hub', 
    message: [], 
    visionaryTitle: 'Principal & IT Visionary' 
  };

  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6">
              <Rocket className="w-4 h-4" />
              <span>About Tech Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
              Empowering the Next <span className="text-gradient">Tech Generation</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              For over two decades, our mission has been to provide excellent technical education 
              standards through modern forms of instruction. We create an environment that grooms 
              the perception and technical intellect of individuals.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              {siteStats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-indigo-600 font-bold">
                    {getIcon(stat.icon, "w-6 h-6")}
                    <span className="text-2xl">{stat.value}</span>
                  </div>
                  <span className="text-slate-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-indigo-600/20 to-purple-600/20 rounded-[3rem] blur-3xl -z-10"></div>
            <div className="bg-slate-900 rounded-[3rem] p-8 aspect-square flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 text-center">
                <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 overflow-hidden shadow-2xl">
                  <img src="/assets/logo/logo.png" alt="Tech Hub" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white text-3xl font-bold">Tech Hub</h3>
                <p className="text-white/60 mt-2">Innovation Center Bahawalpur</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src={principal.image?.startsWith('http') || principal.image?.startsWith('/') ? principal.image : `/assets/instructors/${principal.image}`} 
                  alt={principal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(principal.name) + "&background=6366f1&color=fff&size=512";
                  }}
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-2xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    "
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{principal.name}</h4>
                    <p className="text-sm text-slate-500">{principal.designation}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 font-bold text-sm mb-8">
                <Award className="w-4 h-4" />
                <span>Leadership Excellence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Message from the <span className="text-indigo-400">Principal</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed italic">
                {principal.message?.map((para, i) => (
                  <p key={i}>"{para}"</p>
                ))}
              </div>
              <div className="mt-10 pt-10 border-t border-white/10">
                <h4 className="text-xl font-bold text-white">{principal.name}</h4>
                <p className="text-indigo-400 font-medium">{principal.visionaryTitle}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-indigo-500/5 border border-slate-100"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20 shrink-0">
              <Target className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed italic">
              "{settings?.mission}"
            </p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-indigo-500/5 border border-slate-100"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-600/20 shrink-0">
              <Eye className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed italic">
              "{settings?.vision}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Core Values</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            The principles that guide our education and student support every day.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteValues.map((value, index) => (
            <motion.div
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col items-center"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                {getIcon(value.icon, "w-6 h-6 sm:w-8 sm:h-8")}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{value.title}</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Instructors />
    </div>
  );
}
