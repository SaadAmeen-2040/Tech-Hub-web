import { programs } from "../../data/programs";
import { useNavigate } from "react-router-dom";

export default function ProgramsPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Popular <span className="text-gradient">Programs</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from our industry-leading courses designed to help you start your career in technology and creative fields.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((p, index) => (
            <div
              key={p.id}
              className="group bg-slate-50 border border-slate-100 rounded-3xl p-8 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {/* Simple icon representation */}
                  <span className="text-2xl">
                    {p.title.includes("Web") ? "💻" : p.title.includes("Graphic") ? "🎨" : "🚀"}
                  </span>
                </div>
                <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-wider">
                  Free Enrollment
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {p.title}
              </h3>

              <p className="text-slate-600 mb-6 line-clamp-2">
                {p.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-slate-500 mb-8 font-medium">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {p.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {p.level}
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/contact", { state: { program: p.title } })
                }
                className="w-full py-4 bg-white text-indigo-600 border border-indigo-100 rounded-2xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/20"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}