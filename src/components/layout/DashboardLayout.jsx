import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  FileText, 
  Calendar, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight,
  Layers,
  Video,
  Cpu,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const notificationRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.data);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const markAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read', err);
    }
  };

  const menuGroups = [
    {
      title: "Overview",
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: "Academic Core",
      items: [
        { name: 'Courses', path: '/admin/courses', icon: BookOpen },
        { name: 'Admissions', path: '/admin/admissions', icon: FileText },
        { name: 'Students', path: '/admin/students', icon: Users },
        { name: 'Teachers', path: '/admin/teachers', icon: Users }
      ]
    },
    {
      title: "Media & Blog",
      items: [
        { name: 'Events', path: '/admin/events', icon: Calendar },
        { name: 'Blog', path: '/admin/blog', icon: BookOpen },
        { name: 'Testimonials', path: '/admin/testimonials', icon: Video },
        { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon }
      ]
    },
    {
      title: "Services & Inquiries",
      items: [
        { name: 'Projects', path: '/admin/projects', icon: Cpu },
        { name: 'Services', path: '/admin/services', icon: Briefcase },
        { name: 'Contact Messages', path: '/admin/inquiries', icon: MessageSquare },
        { name: 'Project Quotes', path: '/admin/quotes', icon: Layers }
      ]
    },
    {
      title: "System Config",
      items: [
        { name: 'Site Content', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#050508] text-gray-200 flex overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-[#09090e]/80 backdrop-blur-2xl border-r border-white/[0.06] flex flex-col lg:relative shadow-2xl shadow-[#000]/50"
          >
            {/* Sidebar Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/[0.04]">
              <Link to="/admin/dashboard" className="flex items-center gap-3 group">
                {!logoError ? (
                  <img 
                    src="/assets/logo/logo.png" 
                    alt="Tech Hub Logo" 
                    className="w-10 h-10 object-contain " 
                    onError={() => setLogoError(true)} 
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                    <span>T</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-black text-white text-lg leading-tight tracking-tight">TECH HUB</span>
                  <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Admin Center</span>
                </div>
              </Link>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="lg:hidden text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar Navigation - Grouped */}
            <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto custom-scrollbar">
              {menuGroups.map((group) => (
                <div key={group.title} className="space-y-2">
                  <h4 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{group.title}</h4>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group ${
                            isActive 
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/10' 
                              : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon size={18} className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-white transition-colors'} />
                            <span className="text-sm font-semibold">{item.name}</span>
                          </div>
                          {isActive && <ChevronRight size={14} />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-20 bg-[#09090e]/60 backdrop-blur-2xl border-b border-white/[0.06] flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-xl transition-all"
              >
                <Menu size={22} />
              </button>
            )}
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Quick search..." 
                className="bg-white/[0.04] border border-white/[0.06] rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notification Center */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-xl transition-all"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold border border-[#09090e]">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 bg-[#0e0e14]/95 border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl"
                  >
                    <div className="p-4 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.02]">
                      <h3 className="font-bold text-sm text-white">Activity Alerts</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllRead}
                          className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider transition-colors"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar divide-y divide-white/[0.04]">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          Everything is quiet. No new alerts.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div 
                            key={n._id}
                            onClick={() => !n.isRead && markAsRead(n._id)}
                            className={`p-4 hover:bg-white/[0.03] transition-colors cursor-pointer relative ${!n.isRead ? 'bg-blue-500/[0.03]' : ''}`}
                          >
                            {!n.isRead && (
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500" />
                            )}
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-bold text-white line-clamp-1">{n.title}</span>
                                <span className="text-[9px] text-gray-500">{new Date(n.createdAt).toLocaleDateString()}</span>
                              </div>
                              <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{n.message}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 bg-white/[0.02] border-t border-white/[0.06] text-center">
                        <Link 
                          to="/admin/dashboard" 
                          onClick={() => setShowNotifications(false)}
                          className="text-[10px] text-gray-500 hover:text-white transition-colors font-bold uppercase tracking-wider"
                        >
                          View Activity Dashboard
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 pl-6 border-l border-white/[0.08]">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">{user?.name || 'Admin User'}</p>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{user?.role || 'Administrator'}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/10 cursor-pointer hover:scale-105 transition-transform">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all ml-1"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Area */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
