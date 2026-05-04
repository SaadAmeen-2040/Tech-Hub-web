import { programs } from "../data/programs";
import { useNavigate } from "react-router-dom";

export default function Programs() {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            All <span className="text-gradient">Programs</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our comprehensive list of free IT courses. Each program is designed 
            to provide you with the skills needed to succeed in the modern digital economy.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {programs.map((p, index) => (
            <div
              key={p.id}
              className="group bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:row justify-between items-start gap-6 mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                    {p.title.includes("Web") ? "💻" : p.title.includes("Graphic") ? "🎨" : "🚀"}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-wider">
                        Free Course
                      </span>
                      <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-wider">
                        Certified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {p.description} Our {p.title} program covers everything from fundamentals to advanced techniques, 
                ensuring you gain a competitive edge in the industry.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 p-6 bg-slate-50 rounded-3xl">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Duration</p>
                  <p className="font-bold text-slate-900">{p.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Level</p>
                  <p className="font-bold text-slate-900">{p.level}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Mode</p>
                  <p className="font-bold text-slate-900">In-Person</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    navigate("/contact", { state: { program: p.title } })
                  }
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1"
                >
                  Apply Now
                </button>
                <button
                  className="flex-1 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all transform hover:-translate-y-1"
                >
                  Download Syllabus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Banner */}
        <div className="mt-24 bg-linear-to-r from-indigo-600 to-purple-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-3xl font-bold mb-4">Don't see what you're looking for?</h2>
             <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
               We are constantly adding new programs. Suggest a course or sign up for our newsletter to get notified about new openings.
             </p>
             <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all">
               Get Notified
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}