import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { 
  Cpu, 
  Code2, 
  ShieldCheck, 
  Globe, 
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
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Our <span className="text-gradient">Specialized Tracks</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600">
            100% Free 3-Months Advanced IT Courses with International Certification. 
            Choose the track that matches your educational background.
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
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{level}</h2>
              <div className="h-px grow bg-slate-200"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((program) => (
                <div 
                  key={program._id}
                  className="group bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm overflow-hidden border border-slate-100 shrink-0">
                      {program.thumbnail ? (
                        <img 
                          src={program.thumbnail.startsWith('http') || program.thumbnail.startsWith('/') ? program.thumbnail : `/assets/courses/${program.thumbnail}`} 
                          alt={program.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full text-indigo-600 group-hover:text-white">' + getIcon(program.title) + '</div>';
                          }}
                        />
                      ) : (
                        getIcon(program.title)
                      )}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-indigo-600 transition-colors">
                      {program.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed line-clamp-3">
                      {program.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto gap-4">
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
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        {program.duration}
                      </div>
                      <button 
                        onClick={() => navigate("/registration", { state: { program: program.title } })}
                        className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1.5 group/btn transition-all text-xs sm:text-sm"
                      >
                        Enroll Now 
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Info Banner */}
        <div className="mt-20 p-6 sm:p-10 md:p-12 rounded-[2rem] bg-indigo-600 relative overflow-hidden text-center text-white shadow-2xl shadow-indigo-600/20">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 py-2 px-4 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
              <UserCheck className="w-4 h-4 text-indigo-300" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-indigo-100">Age Limit: 18-40 Years</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8 sm:mb-10 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-indigo-100 font-medium">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                Batch 2026 Now Open
              </div>
              <div className="flex items-center gap-2 text-indigo-100 font-medium">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                Flexible Shifts Available
              </div>
            </div>

            <button 
              onClick={() => navigate("/registration")}
              className="px-6 py-3 sm:px-8 sm:py-3.5 bg-white text-indigo-600 rounded-2xl font-bold text-sm sm:text-base hover:bg-indigo-50 transition-all shadow-xl flex items-center gap-2 mx-auto transform hover:-translate-y-1"
            >
              Secure Your Seat Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
