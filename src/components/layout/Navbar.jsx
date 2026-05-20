import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, 
  X, 
  ChevronRight, 
  LayoutDashboard, 
  BookOpen, 
  MessageCircle, 
  Home, 
  Info, 
  Calendar, 
  Newspaper, 
  Trophy,
  ChevronDown,
  Sparkles,
  Users,
  Code2,
  Video,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleHashClick = (e, path) => {
    e.preventDefault();
    const [targetPath, id] = path.split("#");
    const normalizedTarget = targetPath === "" ? "/" : targetPath;
    const isSamePage = normalizedTarget === location.pathname;
    
    if (isSamePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const menuItems = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { 
      name: "About", 
      path: "/about", 
      icon: <Info className="w-4 h-4" />,
      submenu: [
        { name: "About Tech Hub", path: "/about#story", icon: <Sparkles className="w-4 h-4" /> },
        { name: "Expert Instructors", path: "/about#instructors", icon: <Users className="w-4 h-4" /> },
        { name: "Campus Gallery", path: "/about#gallery", icon: <Camera className="w-4 h-4" /> },
      ]
    },
    { 
      name: "Services", 
      path: "/services", 
      icon: <LayoutDashboard className="w-4 h-4" />,
      submenu: [
        { name: "Software Dev", path: "/software-development", icon: <Code2 className="w-4 h-4" /> },
        { name: "Vocational Training", path: "/services", icon: <BookOpen className="w-4 h-4" /> },
      ]
    },
    { name: "Programs", path: "/programs", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Testimonials", path: "/#testimonials", icon: <Video className="w-4 h-4" /> },
    { 
      name: "Showcase", 
      path: "/projects", 
      icon: <Trophy className="w-4 h-4" />,
      submenu: [
        { name: "Student Projects", path: "/projects", icon: <Trophy className="w-4 h-4" /> },
        { name: "Latest Events", path: "/events", icon: <Calendar className="w-4 h-4" /> },
        { name: "Tech Blog", path: "/blog", icon: <Newspaper className="w-4 h-4" /> },
      ]
    },
    { name: "Contact", path: "/contact", icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const isHomePage = location.pathname === "/";
  const showSolidNav = scrolled || !isHomePage;

  const handleLogoClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* Top Announcement Ticker Bar */}
      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs sm:text-sm font-bold py-2 px-4 shadow-lg flex items-center justify-center gap-2 text-center">
        <Sparkles className="w-4 h-4 animate-spin shrink-0 text-yellow-300" />
        <span>🚀 𝐀𝐝𝐦𝐢𝐬𝐬𝐢𝐨𝐧𝐬 𝐎𝐩𝐞𝐧 𝐚𝐭 𝐓𝐞𝐜𝐡-𝐇𝐮𝐛: 100% FREE NAVTTC Courses & Int. Certification (Age 18-40)</span>
        <Link to="/registration" className="hover:text-yellow-200 ml-1 font-black">Apply Now</Link>
      </div>

      <nav className={`transition-all duration-500 ${showSolidNav ? "py-2" : "py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            animate={{
              backgroundColor: showSolidNav ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
              backdropFilter: showSolidNav ? "blur(20px)" : "blur(0px)",
              borderColor: showSolidNav ? "rgba(226, 232, 240, 1)" : "rgba(255, 255, 255, 0)",
            }}
            className={`relative flex items-center justify-between px-6 py-2.5 rounded-[2rem] transition-all duration-500 ${
              showSolidNav
                ? "shadow-2xl shadow-indigo-500/10 border"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Logo */}
            <Link to="/" onClick={handleLogoClick} className="flex items-center space-x-3 group">
              <motion.div 
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-indigo-500/40 overflow-hidden"
              >
                <img src="/assets/logo/logo.png" alt="Tech Hub Logo" className="w-full h-full object-cover" />
              </motion.div>
              <div className="flex flex-col">
                <span className={`text-lg sm:text-xl font-black tracking-tighter transition-colors duration-300 leading-none ${
                  showSolidNav ? "text-slate-900" : "text-white"
                }`}>
                  TECH HUB
                </span>
                <span className={`text-[8px] sm:text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                  showSolidNav ? "text-indigo-600" : "text-indigo-300"
                }`}>
                  Innovation Center
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden min-[1150px]:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    to={item.path} 
                    onClick={(e) => {
                      if (item.path.includes("#")) {
                        handleHashClick(e, item.path);
                      } else if (item.path === "/") {
                        handleLogoClick();
                      }
                    }}
                  >
                    <motion.div
                      className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                        location.pathname === item.path || (item.submenu && item.submenu.some(s => s.path === location.pathname))
                          ? showSolidNav 
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                            : "bg-white text-indigo-600 shadow-xl"
                          : showSolidNav
                          ? "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                      {item.submenu && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : ""}`} />}
                    </motion.div>
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden"
                      >
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={(e) => {
                              if (sub.path.includes("#")) {
                                handleHashClick(e, sub.path);
                              }
                            }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all group/sub"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover/sub:bg-indigo-50 group-hover/sub:text-indigo-600 transition-all">
                              {sub.icon}
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover/sub:text-slate-900">
                              {sub.name}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              <div className={`w-px h-6 mx-4 transition-colors ${showSolidNav ? "bg-slate-200" : "bg-white/20"}`}></div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/registration"
                  className="px-4 xl:px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-indigo-500/25 transition-all shadow-lg"
                >
                  Apply Now
                </Link>
              </motion.div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`min-[1150px]:hidden p-2.5 rounded-xl transition-colors ${
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
              className="fixed inset-0 z-50 min-[1150px]:hidden"
            >
              <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
              ></div>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 h-screen w-full max-w-sm bg-white shadow-2xl p-8 pt-24 min-[1150px]:hidden"
              >
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <Link
                        to={item.path}
                        onClick={(e) => {
                          if (item.path.includes("#")) {
                            handleHashClick(e, item.path);
                          } else {
                            if (item.path === "/") handleLogoClick();
                            if (!item.submenu) setIsOpen(false);
                          }
                        }}
                        className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                          location.pathname === item.path
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {item.icon}
                          {item.name}
                        </div>
                        {item.submenu && <ChevronRight className="w-5 h-5 text-slate-300" />}
                      </Link>
                      
                      {item.submenu && (
                        <div className="pl-8 space-y-1 border-l-2 border-slate-100 ml-6">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={(e) => {
                                if (sub.path.includes("#")) {
                                  handleHashClick(e, sub.path);
                                } else {
                                  setIsOpen(false);
                                }
                              }}
                              className={`flex items-center gap-3 p-3 rounded-xl font-bold text-sm transition-all ${
                                location.pathname === sub.path ? "text-indigo-600 bg-indigo-50" : "text-slate-500 hover:text-indigo-600 hover:bg-slate-50"
                              }`}
                            >
                              {sub.icon}
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-8 mt-8 border-t border-slate-100">
                    <Link
                      to="/registration"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center p-5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-500/30"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
