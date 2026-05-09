import { useNavigate } from "react-router-dom";
import { programs } from "../data/programs";
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

  // Group programs by level
  const groupedPrograms = programs.reduce((acc, program) => {
    if (!acc[program.level]) {
      acc[program.level] = [];
    }
    acc[program.level].push(program);
    return acc;
  }, {});

  const getIcon = (domain) => {
    switch (domain) {
      case "Artificial Intelligence": return <Cpu className="w-8 h-8" />;
      case "Web Development": return <Code2 className="w-8 h-8" />;
      case "Programming": return <Terminal className="w-8 h-8" />;
      case "Cyber Security": return <ShieldCheck className="w-8 h-8" />;
      case "Digital Marketing": return <TrendingUp className="w-8 h-8" />;
      case "Design": return <Palette className="w-8 h-8" />;
      default: return <FileCode className="w-8 h-8" />;
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Our <span className="text-gradient">Specialized Tracks</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600">
            100% Free 3-Months Advanced IT Courses with International Certification. 
            Choose the track that matches your educational background.
          </p>
        </div>

        {Object.entries(groupedPrograms).map(([level, items], groupIndex) => (
          <div key={level} className="mb-20 animate-fade-in-up" style={{ animationDelay: `${groupIndex * 0.1}s` }}>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-bold text-slate-900">{level}</h2>
              <div className="h-px grow bg-slate-200"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((program) => (
                <div 
                  key={program.id}
                  className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    {getIcon(program.domain)}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {program.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm">
                        <img 
                          src={`/src/assets/instructors/${program.instructor.image}`} 
                          alt={program.instructor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(program.instructor.name) + "&background=6366f1&color=fff";
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Instructor</span>
                        <span className="text-sm font-bold text-slate-700">{program.instructor.name}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                        <Clock className="w-4 h-4" />
                        {program.duration}
                      </div>
                      <button 
                        onClick={() => navigate("/contact", { state: { program: program.title } })}
                        className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-2 group/btn transition-all text-sm"
                      >
                        Enroll Now 
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Info Banner */}
        <div className="mt-20 p-10 md:p-16 rounded-[3rem] bg-indigo-600 relative overflow-hidden text-center text-white shadow-2xl shadow-indigo-600/20">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 py-2 px-4 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md">
              <UserCheck className="w-5 h-5 text-indigo-300" />
              <span className="text-sm font-bold uppercase tracking-widest text-indigo-100">Age Limit: 18-40 Years</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to start your journey?</h2>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-2 text-indigo-100 font-medium">
                <Calendar className="w-5 h-5" />
                Batch 2026 Now Open
              </div>
              <div className="flex items-center gap-2 text-indigo-100 font-medium">
                <Clock className="w-5 h-5" />
                Flexible Shifts Available
              </div>
            </div>

            <button 
              onClick={() => navigate("/contact")}
              className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all shadow-xl flex items-center gap-3 mx-auto transform hover:-translate-y-1"
            >
              Secure Your Seat Now <ArrowRight className="w-6 h-6" />
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