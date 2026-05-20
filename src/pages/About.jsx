import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, BookOpen, Rocket, ShieldCheck, Zap } from "lucide-react";
import Instructors from "../components/sections/Instructors";
import CampusGallery from "../components/sections/CampusGallery";
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
  const location = useLocation();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [location]);

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
      <section id="story" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 text-indigo-600 font-bold text-sm mb-6 shadow-xs">
              <Rocket className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span className="tracking-wide">About Tech Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.15] mb-6 tracking-tight">
              Empowering the Next <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Tech Generation</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 font-normal max-w-xl">
              For over two decades, our mission has been to provide excellent technical education 
              standards through modern forms of instruction. We create an environment that grooms 
              the perception and technical intellect of individuals.
            </p>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {siteStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-xs shrink-0">
                      {getIcon(stat.icon, "w-6 h-6")}
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{stat.value}</span>
                  </div>
                  <span className="text-slate-500 font-medium text-sm sm:text-base">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:max-w-lg lg:mx-auto w-full mt-8 lg:mt-0"
          >
            {/* Ambient glowing backdrops */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl -z-10 animate-pulse"></div>

            {/* Main Showcase Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-slate-800 group hover:border-slate-700 transition-all duration-500">
              {/* Internal decorative background elements */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/30 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl group-hover:bg-purple-600/30 transition-all duration-500"></div>
              
              {/* Centerpiece Content */}
              <div className="relative z-10 flex flex-col items-center text-center py-4 sm:py-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-white/20 overflow-hidden shadow-2xl p-4 group-hover:scale-105 transition-transform duration-500 bg-linear-to-b from-white to-slate-50">
                  <img src="/assets/logo/logo.png" alt="Tech Hub" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-white text-3xl sm:text-4xl font-black tracking-tight mb-2">Tech Hub</h3>
                <p className="text-indigo-400 font-semibold tracking-wide text-xs sm:text-sm uppercase bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20 mb-8 shadow-inner">
                  Innovation Center Bahawalpur
                </p>

                {/* Decorative feature pills inside card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left shadow-sm hover:bg-white/10 transition-colors">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0 shadow-lg shadow-emerald-400"></div>
                    <span className="text-xs text-slate-300 font-semibold leading-tight">100% Free NAVTTC Courses</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left shadow-sm hover:bg-white/10 transition-colors">
                    <Award className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-semibold leading-tight">Int. Certifications</span>
                  </div>
                </div>
              </div>

              {/* Floating External Badge 1 - Top Right */}
              <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl shadow-xl hidden sm:flex items-center gap-2 animate-float z-20">
                <span className="text-xl">🚀</span>
                <span className="text-xs font-bold text-white tracking-wide">Future Ready</span>
              </div>

              {/* Floating External Badge 2 - Bottom Left */}
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl shadow-xl hidden sm:flex items-center gap-2 animate-float z-20" style={{ animationDelay: '1.5s' }}>
                <span className="text-xl">💡</span>
                <span className="text-xs font-bold text-white tracking-wide">Tech Leaders</span>
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
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
              className="relative lg:col-span-5 w-full max-w-sm mx-auto lg:max-w-none lg:w-11/12"
            >
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl relative group max-w-sm mx-auto">
                <img 
                  src={principal.image?.startsWith('http') || principal.image?.startsWith('/') ? principal.image : `/assets/instructors/${principal.image}`} 
                  alt={principal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(principal.name) + "&background=6366f1&color=fff&size=512";
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-2 sm:-bottom-6 sm:-right-4 lg:-bottom-6 lg:-right-2 bg-white p-6 rounded-3xl shadow-2xl hidden sm:block border border-slate-100 max-w-xs z-10 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-600/30 shrink-0">
                    "
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">{principal.name}</h4>
                    <p className="text-xs sm:text-sm text-indigo-600 font-medium mt-0.5">{principal.designation}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              className="text-white lg:col-span-7 lg:pl-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-300 font-bold text-sm mb-8 backdrop-blur-md shadow-inner">
                <Award className="w-4 h-4" />
                <span>Leadership Excellence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                Message from the <span className="text-indigo-400">Principal</span>
              </h2>
              <div className="space-y-6 text-base sm:text-lg text-slate-300 leading-relaxed italic font-light">
                {principal.message?.map((para, i) => (
                  <p key={i} className="relative pl-4 border-l-2 border-indigo-500/30">
                    "{para}"
                  </p>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white tracking-tight">{principal.name}</h4>
                  <p className="text-indigo-400 font-medium text-sm sm:text-base mt-1">{principal.visionaryTitle}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-bold text-xl shadow-inner">
                  TH
                </div>
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

      <CampusGallery />
      <Instructors />
    </div>
  );
}
