import { Clock, User, Award, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickInfo() {
  const infoItems = [
    { icon: <Clock className="w-5 h-5" />, text: "Morning | Evening | Weekend" },
    { icon: <User className="w-5 h-5" />, text: "Age: 18-40 Years" },
    { icon: <Award className="w-5 h-5" />, text: "Int. Certification" },
    { icon: <Phone className="w-5 h-5" />, text: "0308-0620868" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-20 w-full"
    >
      <div className="w-full bg-slate-900/95 backdrop-blur-2xl border-y border-white/10 py-2 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {infoItems.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                className="flex items-center gap-4 py-4 px-6 rounded-2xl transition-all duration-300 group cursor-default"
              >
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500"
                >
                  {item.icon}
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
                    {item.text.includes("|") ? "Batches" : item.text.includes("Age") ? "Eligibility" : item.text.includes("Int") ? "Benefit" : "Call Us"}
                  </span>
                  <span className="text-sm font-bold text-white tracking-tight">
                    {item.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
