import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden p-12 md:p-20 text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Start Your <br />
              <span className="text-indigo-400">Tech Journey?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Don't miss this opportunity to gain world-class IT skills for free. 
              Limited seats available for the upcoming session.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1"
              >
                Apply Now for Free
              </Link>
              <Link
                to="/programs"
                className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all transform hover:-translate-y-1"
              >
                View Courses
              </Link>
            </div>
            
            <p className="mt-8 text-slate-400 text-sm font-medium">
              Join 1,200+ applicants for the current batch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
