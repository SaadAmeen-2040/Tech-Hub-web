import { motion } from "framer-motion";
import { Mail, Linkedin, GraduationCap, Award } from "lucide-react";
import { programs } from "../../data/programs";

export default function Instructors() {
  // Get unique instructors
  const uniqueInstructors = Array.from(
    new Map(programs.map((p) => [p.instructor.name, p.instructor])).values()
  );

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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {uniqueInstructors.map((instructor, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={`/src/assets/instructors/${instructor.image}`} 
                alt={instructor.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                onError={(e) => {
                  e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(instructor.name) + "&background=6366f1&color=fff&size=512";
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {instructor.name}
              </h3>
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-4">
                {instructor.role}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>{instructor.specialty}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>Expert IT Mentor</span>
                </div>
              </div>

              {/* Socials Placeholder */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
