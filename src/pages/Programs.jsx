import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { 
  Cpu, 
  Code2, 
  ShieldCheck, 
  Palette, 
  TrendingUp, 
  FileCode, 
  Terminal,
  Calendar,
  ArrowRight,
  Clock,
  UserCheck
} from "lucide-react";

export default function Programs() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.get('/courses');
        setPrograms(res.data.data);
      } catch (err) {
        console.error("Failed to fetch programs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // Group programs by level
  const groupedPrograms = programs.reduce((acc, program) => {
    const level = program.level || 'Beginner';
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(program);
    return acc;
  }, {});

  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes("ai") || t.includes("machine learning")) return <Cpu className="w-8 h-8" />;
    if (t.includes("fullstack") || t.includes("web development")) return <Code2 className="w-8 h-8" />;
    if (t.includes("python") || t.includes("programming")) return <Terminal className="w-8 h-8" />;
    if (t.includes("security")) return <ShieldCheck className="w-8 h-8" />;
    if (t.includes("marketing")) return <TrendingUp className="w-8 h-8" />;
    if (t.includes("design")) return <Palette className="w-8 h-8" />;
    return <FileCode className="w-8 h-8" />;
  };

  const getInstructorImage = (instructor) => {
    if (!instructor) return `https://ui-avatars.com/api/?name=Instructor&background=6366f1&color=fff`;
    if (typeof instructor === 'object') {
      if (instructor.image) {
        return instructor.image.startsWith('http') || instructor.image.startsWith('/') 
          ? instructor.image 
          : `/assets/instructors/${instructor.image}`;
      }
      return getInstructorImage(instructor.name);
    }
    const n = instructor.toLowerCase();
    if (n.includes("asad") || n.includes("ullah")) return "/assets/instructors/instructor_web_1778326811927.png";
    if (n.includes("farhan") || n.includes("ahmed")) return "/assets/instructors/instructor_cyber_1778326831507.png";
    if (n.includes("zoya") || n.includes("qureshi")) return "/assets/instructors/instructor_design_1778326854007.png";
    if (n.includes("arshad") || n.includes("mehmood")) return "/assets/instructors/instructor_ai_1778326782354.png";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor)}&background=6366f1&color=fff`;
  };

  const getInstructorName = (instructor) => {
    if (!instructor) return 'Expert Instructor';
    if (typeof instructor === 'object') return instructor.name || 'Expert Instructor';
    return instructor;
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-linear-to-tr from-pink-500/5 via-indigo-500/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 text-indigo-600 font-bold text-sm mb-6 shadow-xs">
            <Cpu className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span className="tracking-wide">100% Free NAVTTC IT Courses</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.15]">
            Our <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Specialized Tracks</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            100% Free 3-Months Advanced IT Courses with International Certification. 
            Choose the track that matches your educational background and career goals.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : Object.entries(groupedPrograms).length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-medium">
            No courses available at the moment. Please check back later.
          </div>
        ) : Object.entries(groupedPrograms).map(([level, items], groupIndex) => (
          <div key={level} className="mb-20 animate-fade-in-up" style={{ animationDelay: `${groupIndex * 0.1}s` }}>
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{level}</h2>
              <div className="h-px grow bg-slate-200/80"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((program) => (
                <div 
                  key={program._id}
                  className="group bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 border border-slate-100/80 hover:border-indigo-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/15 transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-50/80 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-linear-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white text-indigo-600 transition-all duration-500 shadow-xs overflow-hidden border border-indigo-100/50 shrink-0">
                      {program.thumbnail && !imageErrors[program._id] ? (
                        <img 
                          src={program.thumbnail.startsWith('http') || program.thumbnail.startsWith('/') ? program.thumbnail : `/assets/courses/${program.thumbnail}`} 
                          alt={program.title} 
                          className="w-full h-full object-cover"
                          onError={() => {
                            setImageErrors(prev => ({ ...prev, [program._id]: true }));
                          }}
                        />
                      ) : (
                        getIcon(program.title)
                      )}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
                      {program.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed line-clamp-3">
                      {program.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100/60 mt-auto gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm bg-indigo-50 shrink-0">
                        <img 
                          src={getInstructorImage(program.instructor)} 
                          alt={getInstructorName(program.instructor)}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getInstructorName(program.instructor))}&background=6366f1&color=fff`;
                          }}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Instructor</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-700 truncate">{getInstructorName(program.instructor)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        {program.duration}
                      </div>
                      <button 
                        onClick={() => navigate("/registration", { state: { program: program.title } })}
                        className="px-4 py-2 bg-indigo-50 text-indigo-600 group-hover:bg-linear-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white rounded-xl font-bold flex items-center gap-1.5 transition-all duration-300 text-xs sm:text-sm shadow-xs"
                      >
                        Enroll Now 
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Info Banner */}
        <div className="mt-20 p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden text-center text-white shadow-2xl shadow-indigo-500/25 border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md shadow-lg">
              <UserCheck className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-white">Age Limit: 18-40 Years</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">Ready to start your tech journey?</h2>
            
            <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm sm:text-base font-bold">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                <Calendar className="w-5 h-5 text-yellow-300" />
                Batch 2026 Now Open
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                <Clock className="w-5 h-5 text-yellow-300" />
                Flexible Shifts Available
              </div>
            </div>

            <button 
              onClick={() => navigate("/registration")}
              className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm sm:text-base hover:bg-yellow-300 hover:text-slate-950 transition-all duration-300 shadow-2xl flex items-center gap-2 mx-auto transform hover:-translate-y-1"
            >
              Secure Your Seat Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
