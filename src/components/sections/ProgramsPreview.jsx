import { useNavigate, Link } from "react-router-dom";
import { programs } from "../../data/programs";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Code2, 
  ShieldCheck, 
  TrendingUp, 
  Palette, 
  Terminal,
  ArrowRight,
  Clock
} from "lucide-react";

export default function ProgramsPreview() {
  const navigate = useNavigate();
  // Show first 6 programs as a preview
  const previewPrograms = programs.slice(0, 6);

  const getIcon = (domain) => {
    switch (domain) {
      case "Artificial Intelligence": return <Cpu className="w-6 h-6" />;
      case "Web Development": return <Code2 className="w-6 h-6" />;
      case "Programming": return <Terminal className="w-6 h-6" />;
      case "Cyber Security": return <ShieldCheck className="w-6 h-6" />;
      case "Digital Marketing": return <TrendingUp className="w-6 h-6" />;
      case "Design": return <Palette className="w-6 h-6" />;
      default: return <Code2 className="w-6 h-6" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Featured <span className="text-gradient">Programs</span>
            </h2>
            <p className="text-lg text-slate-600">
              Explore our 100% FREE advanced IT courses designed for 16-years education and intermediate students. Get international certification and kickstart your career.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/programs" 
              className="group px-6 py-3 sm:px-8 sm:py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-900/10 flex items-center gap-2"
            >
              View All Tracks
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {previewPrograms.map((program) => (
            <motion.div 
              key={program.id}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-8">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500"
                >
                  {getIcon(program.domain)}
                </motion.div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  {program.duration}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                {program.title}
              </h3>
              
              <p className="text-slate-500 mb-8 line-clamp-2 leading-relaxed">
                {program.description}
              </p>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact", { state: { program: program.title } })}
                className="w-full py-3 sm:py-4 bg-slate-50 text-slate-900 rounded-xl font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                Enroll Now <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}