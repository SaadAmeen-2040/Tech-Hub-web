import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { programs } from "../../data/programs";
import { User, Phone, Mail, GraduationCap, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function LeadForm() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: location.state?.program || "",
    city: "",
  });

  useEffect(() => {
    if (location.state?.program) {
      setFormData((prev) => ({ ...prev, program: location.state.program }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data:", formData);
    alert("Application Submitted Successfully! Our team will contact you soon.");
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#6366f1", transition: { duration: 0.2 } },
    initial: { scale: 1, borderColor: "#e2e8f0" }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-100"
    >
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-slate-900 mb-2"
        >
          Apply for <span className="text-gradient">Batch 2026</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-500"
        >
          Secure your seat in our 100% FREE government-funded courses.
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <User className="w-4 h-4 text-indigo-500" /> Full Name
            </label>
            <motion.input
              whileFocus="focus"
              variants={inputVariants}
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <Phone className="w-4 h-4 text-indigo-500" /> Phone Number
            </label>
            <motion.input
              whileFocus="focus"
              variants={inputVariants}
              type="text"
              name="phone"
              placeholder="+92 3XX XXXXXXX"
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <Mail className="w-4 h-4 text-indigo-500" /> Email Address
          </label>
          <motion.input
            whileFocus="focus"
            variants={inputVariants}
            type="email"
            name="email"
            placeholder="yourname@example.com"
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <GraduationCap className="w-4 h-4 text-indigo-500" /> Selected Track
            </label>
            <div className="relative">
              <motion.select
                whileFocus={{ scale: 1.02, borderColor: "#6366f1" }}
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Select a Course</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.title}>{p.title}</option>
                ))}
              </motion.select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
              <MapPin className="w-4 h-4 text-indigo-500" /> City
            </label>
            <motion.input
              whileFocus="focus"
              variants={inputVariants}
              type="text"
              name="city"
              placeholder="e.g. Bahawalpur"
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all"
            />
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 mt-4 flex items-center justify-center gap-2"
        >
          Submit Application <Send className="w-5 h-5" />
        </motion.button>
        
        <p className="text-center text-xs text-slate-400 leading-relaxed mt-6">
          By submitting this form, you acknowledge that all information provided is accurate and you agree to follow the NAVTTC admission guidelines.
        </p>
      </form>
    </motion.div>
  );
}