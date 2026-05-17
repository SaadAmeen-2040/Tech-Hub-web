import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  Calendar, 
  GraduationCap, 
  BookOpen, 
  MapPin, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import api from "../api/api";
import { toast } from "react-hot-toast";

export default function Registration() {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    whatsapp: "",
    email: "",
    cnic: "",
    dob: "",
    qualification: "",
    fieldOfStudy: "",
    course: location.state?.program || "",
    address: "",
    guardianPhone: ""
  });

  useEffect(() => {
    if (location.state?.program) {
      setFormData(prev => ({ ...prev, course: location.state.program }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/admissions", formData);
      setSubmitted(true);
      toast.success("Registration submitted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-[2rem] p-8 sm:p-12 text-center shadow-2xl border border-slate-100"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 sm:mb-6">Registration Successful!</h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-12 leading-relaxed">
            Thank you for applying to Tech Hub Innovation Center. Our admissions team will 
            review your profile and contact you on WhatsApp within 48 hours for the next steps.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-8 py-3 sm:px-10 sm:py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm sm:text-base hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-linear-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 shadow-xs mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-100 shadow-xs">
               <img src="/assets/logo/navttcofficial_logo.jpg" alt="NAVTTC" className="w-full h-full object-contain" />
            </div>
            <span className="text-indigo-600 font-black text-sm uppercase tracking-wide">NAVTTC & PM Youth Program</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.15] mb-6 tracking-tight">
            100% Free Training with Free International Certification <br />
            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Under NAVTTC</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Secure your future in tech. Fill out the official admission form below 
            to apply for the 2026 Batch.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-indigo-500/5 border border-slate-100 p-6 sm:p-10 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Section 1: Personal Info */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Personal Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name (As per CNIC)</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Father Name (As per CNIC)</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required 
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="Enter father's name" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Contact Number (WhatsApp)</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required 
                      type="tel" 
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="03012345678" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">CNIC Number</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required 
                      name="cnic"
                      value={formData.cnic}
                      onChange={handleChange}
                      placeholder="3220401234567" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Date of Birth</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required 
                      type="date" 
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 2: Education */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Academic Background</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Highest Qualification</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
                    <select 
                      required 
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 appearance-none relative"
                    >
                      <option value="">Select Qualification</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="ADP">ADP / 4th Semester</option>
                      <option value="Bachelor">Bachelor</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Field of Study</label>
                  <div className="relative group">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required 
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleChange}
                      placeholder="e.g. BS Computer Science" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Select Course for Training</label>
                  <div className="relative group">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
                    <select 
                      required 
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 appearance-none relative"
                    >
                      <option value="">Select a Program</option>
                      <option value="AI">Artificial Intelligence (ML/DL)</option>
                      <option value="Web">Full-Stack Web Development</option>
                      <option value="Cyber">Cyber Security & Ethical Hacking</option>
                      <option value="Design">UI/UX & Graphic Design</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 3: Location & Guardian */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Contact Details</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Residential Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <textarea 
                      required 
                      rows="3"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete home address" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900 resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Guardian Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      required 
                      type="tel" 
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      placeholder="030XXXXXXXX" 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-indigo-50 p-8 rounded-3xl flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <div className="text-sm text-indigo-900 font-medium leading-relaxed">
                By submitting this form, I confirm that all information provided is accurate as per my CNIC. 
                I understand that this is a 100% free government-funded program and admission is 
                subject to eligibility and merit criteria.
              </div>
            </div>

            {/* Submit */}
            <button 
              type="submit"
              className="w-full py-3.5 sm:py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-sm sm:text-base hover:shadow-2xl hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Submit Admission Form <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        </motion.div>

        {/* Footer Info */}
        <div className="mt-16 text-center space-y-6">
           <div className="flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
             <img src="/assets/logo/navttcofficial_logo.jpg" alt="NAVTTC" className="h-12 object-contain" />
             <div className="w-px h-8 bg-slate-300"></div>
             <span className="font-bold text-slate-600">Tech Hub Innovation Center</span>
           </div>
           <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
             <AlertCircle className="w-4 h-4" />
             Applications are open for a limited time. Priority for 2026 Batch.
           </p>
        </div>
      </div>
    </div>
  );
}
