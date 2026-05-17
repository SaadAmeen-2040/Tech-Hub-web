import { Users, Rocket, Building2, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const stats = [
  { label: "Graduated Students", value: 5000, suffix: "+", icon: <Users className="w-10 h-10" /> },
  { label: "Success Rate", value: 95, suffix: "%", icon: <Rocket className="w-10 h-10" /> },
  { label: "Partner Companies", value: 120, suffix: "+", icon: <Building2 className="w-10 h-10" /> },
  { label: "Expert Instructors", value: 50, suffix: "+", icon: <UserCheck className="w-10 h-10" /> },
];

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);

  return (
    <motion.span
      whileInView={{
        count: value,
      }}
      initial={{ count: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        let start = 0;
        const end = value;
        const duration = 1500;
        const increment = end / (duration / 32);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 32);
        return () => clearInterval(timer);
      }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
}

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-700 via-indigo-600 to-purple-700"></div>
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-white mb-6 border border-white/20 shadow-xl shrink-0"
              >
                {stat.icon}
              </motion.div>
              <div className="space-y-1">
                <div className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-lg">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base font-bold text-indigo-100 uppercase tracking-widest opacity-80">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Curve/Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>
    </section>
  );
}
