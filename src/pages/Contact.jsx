import LeadForm from "../components/forms/LeadForm";

export default function Contact() {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Have questions about our programs or the enrollment process? 
              Our team is here to help you start your tech journey.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">📍</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Visit Us</h4>
                <p className="text-slate-500 text-sm">
                  123 Tech Avenue, Innovation City, Lahore, Pakistan
                </p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">✉️</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Email Us</h4>
                <p className="text-slate-500 text-sm">
                  admissions@techhub.edu.pk<br />
                  info@techhub.edu.pk
                </p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">📞</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Call Us</h4>
                <p className="text-slate-500 text-sm">
                  +92 300 1234567<br />
                  +92 42 35123456
                </p>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">⏰</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Office Hours</h4>
                <p className="text-slate-500 text-sm">
                  Mon - Fri: 9 AM - 6 PM<br />
                  Sat: 10 AM - 2 PM
                </p>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className="w-full h-64 bg-slate-200 rounded-[2.5rem] overflow-hidden relative group">
              <div className="absolute inset-0 bg-linear-to-tr from-slate-900/20 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
                MAP VIEW
              </div>
            </div>
          </div>

          {/* Form Section */}
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
