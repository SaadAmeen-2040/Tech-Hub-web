import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
    alert("Form Submitted Successfully! Our team will contact you soon.");
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-100 animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Apply Now
        </h2>
        <p className="text-slate-500">Fill out the form below to secure your seat.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="+92 300 0000000"
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

<<<<<<< HEAD
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Selected Program</label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none"
            >
              <option value="">Select a Program</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Freelancing">Freelancing</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">City</label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Lahore"
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
=======
          {/* Auto-filled Program */}
        <select
  name="program"
  value={formData.program}
  onChange={handleChange}
  className="w-full p-3 border rounded bg-gray-100"
>
  <option value="">Select Program of Interest</option>
  <option value="cs">Computer Science</option>
  <option value="ai">Artificial Intelligence</option>
  <option value="it">Information Technology</option>
  <option value="business">Business Administration</option>
</select>
>>>>>>> 7c828453ebd51e50765c3141e533a71465b9a3bf

        <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1 mt-4">
          Submit Application
        </button>
        
        <p className="text-center text-xs text-slate-400">
          By submitting, you agree to our terms and privacy policy.
        </p>
      </form>
    </div>
  );
}