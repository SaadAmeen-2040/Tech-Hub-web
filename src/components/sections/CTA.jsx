import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-slate-950 rounded-[2.5rem] p-8 md:p-16 text-center overflow-hidden shadow-2xl shadow-indigo-500/10"
        >
          {/* Static Background Orbs for better performance */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] pointer-events-none opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[100px] pointer-events-none opacity-10"></div>

          <div className="relative z-10 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-bold text-indigo-200 uppercase tracking-widest">Enrollment is Live</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Ready to Transform Your <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-300">
                Future in Tech?
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Don't miss the opportunity to learn from the best. Join thousands of students who have already started their journey with Tech Hub Bahawalpur.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/registration")}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-sm sm:text-base hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                Apply Now For Batch 2026 <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/programs")}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-sm sm:text-base hover:bg-white/10 transition-all backdrop-blur-md"
              >
                View Courses
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
