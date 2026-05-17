import { CheckCircle2, ShieldCheck, Zap, Laptop, Trophy, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Laptop className="w-8 h-8" />,
    title: "100% Free Courses",
    desc: "Fully funded government initiative with no hidden charges or fees."
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Int. Certification",
    desc: "Earn certificates recognized globally by top industry leaders."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Advanced Tracks",
    desc: "Specialized curriculum for both 16-year and Intermediate students."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-linear-to-bl from-indigo-500/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-linear-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-indigo-600 font-bold uppercase tracking-widest text-sm bg-indigo-50 px-4 py-2 rounded-full inline-block mb-6"
              >
                Our Competitive Edge
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Why Choose <span className="text-gradient">Tech Hub?</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                We bridge the gap between traditional education and industry requirements through state-of-the-art training and international standards.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/20 to-purple-500/20 rounded-[2rem] sm:rounded-[3rem] blur-2xl transform rotate-3"></div>
            <div className="relative bg-indigo-600 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 lg:p-10 text-white overflow-hidden shadow-2xl">
              {/* Pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-2 shadow-xl overflow-hidden shrink-0">
                    <img src="/assets/logo/navttcofficial_logo.jpg" alt="NAVTTC Official Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-indigo-200 font-bold uppercase tracking-widest text-[10px]">Strategic Partner</p>
                    <p className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">NAVTTC & PM YOUTH<br/>PROGRAM</p>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                  Join the Next Generation of Tech Leaders in Bahawalpur.
                </h3>

                <div className="space-y-4">
                  {[
                    "100% Free Courses for Eligible Youth",
                    "International Certification Opportunities",
                    "Expert Mentors from the Industry",
                    "Hands-on Project Based Learning"
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center gap-3 sm:gap-4"
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="font-bold text-sm sm:text-base text-indigo-50">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 sm:gap-4 bg-white p-2 rounded-2xl pr-6 sm:pr-8 group cursor-pointer shadow-xl shadow-black/10"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white transition-transform shrink-0">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-slate-900 text-base sm:text-lg font-bold">Registration Open</p>
                      <p className="text-indigo-600 text-xs sm:text-sm font-bold">Apply for Batch 2026 Today</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
