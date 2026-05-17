import { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import { toast } from "react-hot-toast";
import { 
  Code2, 
  Send, 
  Smartphone, 
  Globe, 
  Database, 
  Layers, 
  Building2, 
  Mail, 
  User, 
  FileText,
  CheckCircle2,
  ChevronRight,
  Phone,
  Cpu,
  UserCheck,
  GraduationCap,
  Sparkles
} from "lucide-react";

export default function SoftwareDevelopment() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    country: "Pakistan",
    company: "",
    projectType: "",
    businessCategory: "",
    budget: "",
    description: "",
    includeAI: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      name: formData.clientName,
      email: formData.email,
      phone: formData.phone,
      message: formData.description,
      subject: `Project Quote: ${formData.projectType}`,
      type: 'Quote Request',
      company: formData.company,
      projectType: formData.projectType,
      businessCategory: formData.businessCategory,
      budget: formData.budget,
      includeAI: formData.includeAI,
      country: formData.country
    };

    try {
      await api.post("/contacts", payload);
      setSubmitted(true);
      toast.success("Quote request sent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit request");
    }
  };

  const projectTypes = [
    { name: "E-commerce Platform", icon: <Globe className="w-4 h-4" /> },
    { name: "Custom ERP System", icon: <Layers className="w-4 h-4" /> },
    { name: "Mobile Application", icon: <Smartphone className="w-4 h-4" /> },
    { name: "AI & Automation Bot", icon: <Cpu className="w-4 h-4" /> },
    { name: "Final Year Project (FYP)", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Personal Use Software", icon: <UserCheck className="w-4 h-4" /> },
    { name: "Cloud Solution", icon: <Database className="w-4 h-4" /> }
  ];

  const businessCategories = [
    "Startup / Small Business",
    "Enterprise / Corporate",
    "Educational Institution",
    "Personal / Individual",
    "E-commerce Retailer"
  ];

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[2rem] p-8 sm:p-12 text-center shadow-2xl border border-slate-100"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Request Received!</h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 leading-relaxed">
            Thank you, {formData.clientName}! Our technical consultants are reviewing your 
            requirements for {formData.projectType}. Expect a callback or email within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 sm:px-10 sm:py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm sm:text-base hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/[0.03] rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/[0.03] rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Side: Dynamic Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white text-indigo-600 font-bold text-sm mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Next-Gen Software Development</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Code the <br />
              <span className="text-gradient">Future</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed max-w-xl font-medium">
              We don't just build software; we engineer competitive advantages. 
              From E-commerce giants to AI-integrated automation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                { title: "E-commerce Experts", icon: <Globe />, color: "bg-blue-600" },
                { title: "AI Automation", icon: <Cpu />, color: "bg-purple-600" },
                { title: "Student FYP Support", icon: <GraduationCap />, color: "bg-emerald-600" },
                { title: "Scalable ERPs", icon: <Layers />, color: "bg-indigo-600" }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4 p-5 bg-white/80 backdrop-blur-md rounded-[2rem] border border-white shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${item.color} shadow-lg`}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                </motion.div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl group mb-8">
              <div className="relative z-10 flex items-start gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-600 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 transition-transform">
                  <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold mb-3">AI First Approach</h4>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                    We specialize in integrating intelligent LLMs and predictive 
                    algorithms to make your software think, learn, and grow.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
            </div>
          </motion.div>

          {/* Right Side: Enhanced Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-6 sm:p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-white relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>
            
            <div className="mb-10 sm:mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">Request a <span className="text-gradient">Quote</span></h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Let's build something extraordinary</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Personal Info Row */}
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="Enter your name" 
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 text-sm placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com" 
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 text-sm placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Country Row */}
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0300 1234567" 
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 text-sm placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 ml-1">Country</label>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 appearance-none relative text-sm"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Oman">Oman</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="United States">United States (USA)</option>
                      <option value="United Kingdom">United Kingdom (UK)</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Turkey">Turkey</option>
                      <option value="China">China</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Project Details Row */}
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 ml-1">Project Type</label>
                  <div className="relative group">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
                    <select 
                      required
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 appearance-none relative text-sm"
                    >
                      <option value="">What are we building?</option>
                      {projectTypes.map((type) => (
                        <option key={type.name} value={type.name}>{type.name}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 ml-1">Business Category</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
                    <select 
                      required
                      name="businessCategory"
                      value={formData.businessCategory}
                      onChange={handleChange}
                      className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 appearance-none relative text-sm"
                    >
                      <option value="">Select Category</option>
                      {businessCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* AI Toggle */}
              <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-600/20">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-indigo-900 leading-none mb-1">Include AI Automation?</p>
                    <p className="text-[10px] sm:text-xs text-indigo-600/80 font-semibold">Smart bots & analytics</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="includeAI"
                    checked={formData.includeAI}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-10 h-5 sm:w-11 sm:h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="space-y-3">
                <label className="text-xs sm:text-sm font-bold text-slate-900 ml-1">Estimated Budget</label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {["<$1k", "$1k-$5k", "$5k-$10k", "$10k+", "Not Decided"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black border transition-all ${
                        formData.budget === b 
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105" 
                          : "bg-slate-50 border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900 ml-1">Project Brief</label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <textarea 
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Briefly describe your requirements..." 
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 text-sm resize-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-3.5 sm:py-4 bg-indigo-600 text-white rounded-xl font-black text-sm sm:text-base shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-95"
              >
                Send Request <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
