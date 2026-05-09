import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, LayoutDashboard, BookOpen, MessageCircle, Home, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Programs", path: "/programs", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Contact", path: "/contact", icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const isHomePage = location.pathname === "/";
  // Always use solid/scrolled style on internal pages for visibility
  const showSolidNav = scrolled || !isHomePage;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        showSolidNav ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{
            backgroundColor: showSolidNav ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0)",
            backdropFilter: showSolidNav ? "blur(16px)" : "blur(0px)",
          }}
          className={`relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            showSolidNav
              ? "shadow-2xl shadow-indigo-500/10 border border-slate-100"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="w-10 h-10 bg-linear-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300"
            >
              <span className="text-white font-bold text-xl">T</span>
            </motion.div>
            <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              showSolidNav ? "text-slate-900" : "text-white"
            }`}>
              Tech Hub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative"
              >
                <motion.div
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    location.pathname === link.path
                      ? showSolidNav 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                        : "bg-white text-indigo-600 shadow-xl"
                      : showSolidNav
                      ? "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </motion.div>
                {location.pathname === link.path && !showSolidNav && (
                  <motion.div 
                    layoutId="navUnderline"
                  
                  />
                )}
              </Link>
            ))}
            <div className={`w-px h-6 mx-4 transition-colors ${showSolidNav ? "bg-slate-200" : "bg-white/20"}`}></div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="px-4 py-2 sm:px-6 sm:py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-indigo-500/25 transition-all"
              >
                Apply Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              showSolidNav ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            ></div>
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-4 top-24 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6"
            >
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                      location.pathname === link.path
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      {link.name}
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      location.pathname === link.path ? "translate-x-1" : "text-slate-300"
                    }`} />
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center p-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/20"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}