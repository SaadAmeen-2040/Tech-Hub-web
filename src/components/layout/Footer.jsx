import { Link } from "react-router-dom";

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
            <p className="text-slate-500 leading-relaxed">
              Empowering youth with industry-relevant IT skills through fully funded government initiatives. Join our community of learners today.
            </p>
            <div className="flex space-x-4">
              {/* Social Placeholders */}
              {["FB", "TW", "IG", "LI"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300"
                >
                  <span className="text-xs font-bold">{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/programs" className="hover:text-indigo-400 transition-colors">Programs</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">About Institute</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Programs</h4>
            <ul className="space-y-4">
              <li><Link to="/programs" className="hover:text-indigo-400 transition-colors">Web Development</Link></li>
              <li><Link to="/programs" className="hover:text-indigo-400 transition-colors">Graphic Design</Link></li>
              <li><Link to="/programs" className="hover:text-indigo-400 transition-colors">Freelancing</Link></li>
              <li><Link to="/programs" className="hover:text-indigo-400 transition-colors">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-indigo-400">📍</span>
                <span>123 Tech Hub, Innovation Bahawalpur, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-400">📞</span>
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-400">✉️</span>
                <span>info@techhub.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:row justify-between items-center gap-4 text-sm text-slate-600">
          <p>© {currentYear} Tech Hub Institute. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-400">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}