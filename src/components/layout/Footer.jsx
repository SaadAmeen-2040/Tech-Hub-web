import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold text-white">Tech Hub</span>
            </Link>
            
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 group hover:border-indigo-500/50 transition-colors">
              <ShieldCheck className="w-8 h-8 text-indigo-500 shrink-0" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter leading-tight">
                Official Partner Of<br/>
                <span className="text-white text-xs">NAVTTC & PM YOUTH PROGRAM</span>
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed text-sm">
              Empowering the youth of Bahawalpur with industry-relevant IT skills through fully funded government initiatives.
            </p>
            
            <div className="flex space-x-3">
              {[
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { icon: <Linkedin className="w-5 h-5" />, label: "Linkedin" }
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-white/5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "Programs", "Contact Us", "Admissions"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`} 
                    className="flex items-center gap-2 hover:text-indigo-400 transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Top Programs</h4>
            <ul className="space-y-4">
              {["Web Development", "Cyber Security", "Cloud Computing", "Google UX Design"].map((item) => (
                <li key={item}>
                  <Link 
                    to="/programs" 
                    className="flex items-center gap-2 hover:text-indigo-400 transition-colors group"
                  >
                    <Zap className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-white/5">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                </div>
                <span className="text-sm leading-relaxed">
                  Opp. Moon College and Sir Sadiq Banquet Hall, Ring Road, Bahawalpur
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-white/5">
                  <Phone className="w-5 h-5 text-indigo-500" />
                </div>
                <span className="text-sm">+92 308 0620868</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-white/5">
                  <Mail className="w-5 h-5 text-indigo-500" />
                </div>
                <span className="text-sm">info@techhubinstitute.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-600">
          <p>© {currentYear} Tech Hub Innovation Center Bahawalpur.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}