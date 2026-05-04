import LeadForm from "../components/forms/LeadForm";
import { MapPin, Mail, Phone, Building2, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Contact <span className="text-gradient">Bahawalpur Center</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Join the Tech Hub Innovation Center in Bahawalpur. We are here to help you 
              enroll in the Prime Minister's Youth Programme & NAVTTC courses.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Visit Us</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Opp. Moon College and Sir Sadiq Banquet Hall, Ring Road Near Saddar Pulli, Bahawalpur
                </p>
              </div>

              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Email Us</h4>
                <p className="text-slate-500 text-sm">
                  info@techhubinstitute.pk<br />
                  admissions@techhubinstitute.pk
                </p>
              </div>

              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Call Us</h4>
                <p className="text-slate-500 text-sm">
                  +92 308 0620868<br />
                  Mon - Sat: 9 AM - 5 PM
                </p>
              </div>

              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <Building2 className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Partnership</h4>
                <p className="text-slate-500 text-sm">
                  NAVTTC & Prime Minister's Youth Programme
                </p>
              </div>
            </div>

            {/* Quick Stats Overlay */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-600/20">
              <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Have Questions?</h4>
                  <p className="text-indigo-100">Our team is ready to guide you through the process.</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            </div>
          </div>

          {/* Form Section */}
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
