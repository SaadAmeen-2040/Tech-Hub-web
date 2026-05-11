import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User, Mail, MessageSquare, Send, Book, Tag } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../api/api";
import { toast } from "react-hot-toast";

export default function ContactForm() {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "General Inquiry",
    subject: location.state?.subject || "",
    message: ""
  });

  useEffect(() => {
    if (location.state?.subject) {
      setFormData(prev => ({ ...prev, subject: location.state.subject }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/contacts", formData);
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send message");
    } finally {
      setSaving(false);
    }
  };

  const inputVariants = {
    focus: { borderColor: "#6366f1", boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.2)", transition: { duration: 0.2 } },
    initial: { borderColor: "#e2e8f0", boxShadow: "0 0 0 0px rgba(99, 102, 241, 0)" }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center border border-slate-100"
      >
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Send className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h3>
        <p className="text-slate-600 mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-indigo-500/10 border border-slate-100"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Send a <span className="text-gradient">Message</span></h2>
        <p className="text-slate-500">Have a question? We'd love to hear from you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <User className="w-4 h-4 text-indigo-500" /> Full Name
          </label>
          <motion.input
            whileFocus="focus"
            variants={inputVariants}
            required
            name="name"
            value={formData.name}
            placeholder="John Doe"
            onChange={handleChange}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <Mail className="w-4 h-4 text-indigo-500" /> Email Address
          </label>
          <motion.input
            whileFocus="focus"
            variants={inputVariants}
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder="john@example.com"
            onChange={handleChange}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <Tag className="w-4 h-4 text-indigo-500" /> Inquiry Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium appearance-none cursor-pointer focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Quote Request">Quote Request</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <Book className="w-4 h-4 text-indigo-500" /> Subject
          </label>
          <motion.input
            whileFocus="focus"
            variants={inputVariants}
            required
            name="subject"
            value={formData.subject}
            placeholder="How can we help?"
            onChange={handleChange}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <MessageSquare className="w-4 h-4 text-indigo-500" /> Message
          </label>
          <motion.textarea
            whileFocus="focus"
            variants={inputVariants}
            required
            name="message"
            value={formData.message}
            rows="4"
            placeholder="Your message here..."
            onChange={handleChange}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium resize-none"
          />
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, translateY: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all"
        >
          Send Message <Send className="w-5 h-5" />
        </motion.button>
      </form>
    </motion.div>
  );
}
