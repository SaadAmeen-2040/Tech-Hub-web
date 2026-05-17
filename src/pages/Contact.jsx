import ContactForm from "../components/forms/ContactForm";
import { MapPin, Mail, Phone, Building2, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 text-indigo-600 font-bold text-sm mb-6 shadow-xs">
              <MessageSquare className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span className="tracking-wide">Contact Tech Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.15] mb-6 tracking-tight">
              Get in <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-12 leading-relaxed font-normal">
              Have questions about our courses, software services, or partnerships? 
              Reach out to our team at Tech Hub Innovation Center Bahawalpur.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
              <div className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Visit Us</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Opp. Moon College and Sir Sadiq Banquet Hall, Ring Road Near Saddar Pulli, Bahawalpur
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Email Us</h4>
                <p className="text-slate-500 text-xs sm:text-sm">
                  info@techhubinstitute.pk<br />
                  admissions@techhubinstitute.pk
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Call Us</h4>
                <p className="text-slate-500 text-xs sm:text-sm">
                  +92 308 0620868<br />
                  Mon - Sat: 9 AM - 5 PM
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Partnership</h4>
                <p className="text-slate-500 text-xs sm:text-sm">
                  NAVTTC & Prime Minister's Youth Programme
                </p>
              </div>
            </div>

            {/* Quick Stats Overlay */}
            <div className="bg-indigo-600 rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-600/20 mb-8 lg:mb-0">
              <div className="relative z-10 flex items-center gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold">Need Fast Help?</h4>
                  <p className="text-indigo-100 text-xs sm:text-sm">Our support team is available during office hours.</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            </div>
          </div>

          {/* Form Section */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
