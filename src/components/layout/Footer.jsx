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

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Programs", path: "/programs" },
    { name: "Student Projects", path: "/projects" },
    { name: "Events", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const programs = [
    { name: "Web Development", path: "/programs" },
    { name: "Cyber Security", path: "/programs" },
    { name: "Artificial Intelligence", path: "/programs" },
    { name: "Graphic Design", path: "/programs" },
    { name: "Cloud Computing", path: "/programs" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden group-hover:rotate-6 transition-transform">
                <img src="/assets/logo/logo.png" alt="Tech Hub Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white leading-none">TECH HUB</span>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Innovation Center</span>
              </div>
            </Link>
            
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 group hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-lg overflow-hidden p-1">
                <img src="/assets/logo/navttcofficial_logo.jpg" alt="NAVTTC Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tight leading-tight">
                Official Partner Of<br/>
                <span className="text-white text-sm">NAVTTC & PM YOUTH PROGRAM</span>
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed text-sm">
              Empowering the youth of Bahawalpur with industry-relevant IT skills through fully funded government initiatives and expert-led certifications.
            </p>
            
            <div className="flex space-x-4">
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
                  className="w-11 h-11 rounded-xl bg-slate-900/50 backdrop-blur-md flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-white/5 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-xl mb-10 flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="flex items-center gap-2 hover:text-indigo-400 transition-all group py-1"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-800 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    <span className="font-bold text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-black text-xl mb-10 flex items-center gap-3">
              <span className="w-8 h-1 bg-purple-600 rounded-full"></span>
              Our Courses
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {programs.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="flex items-center gap-2 hover:text-purple-400 transition-all group py-1"
                  >
                    <Zap className="w-4 h-4 text-slate-800 group-hover:text-purple-400 transition-colors" />
                    <span className="font-bold text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-black text-xl mb-10 flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-600 rounded-full"></span>
              Get In Touch
            </h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/80 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/5 shadow-xl">
                  <MapPin className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Location</span>
                  <span className="text-sm leading-relaxed text-slate-300 font-medium">
                    Opp. Moon College and Sir Sadiq Banquet Hall, Ring Road, Bahawalpur
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/80 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/5 shadow-xl">
                  <Phone className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phone</span>
                  <span className="text-sm text-slate-300 font-medium">+92 308 0620868</span>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/80 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/5 shadow-xl">
                  <Mail className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</span>
                  <span className="text-sm text-slate-300 font-medium">info@techhubinstitute.pk</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-slate-500">
          <p className="font-bold">© {currentYear} Tech Hub Innovation Center Bahawalpur. All rights reserved.</p>
          <div className="flex gap-10 font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
