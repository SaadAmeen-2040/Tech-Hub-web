import React, { useState, useEffect } from 'react';
import {
  Users, BookOpen, GraduationCap, MessageSquare,
  RefreshCw,
  UserCheck, CalendarDays, FileText, Briefcase, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../api/api';

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ title, value, icon: Icon, iconColor, bgColor, linkTo, loading }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }} 
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={() => linkTo && navigate(linkTo)}
      className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-indigo-500/30 p-6 rounded-[2rem] cursor-pointer relative overflow-hidden transition-all duration-300 group shadow-md"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/0 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className={`p-3 rounded-2xl ${bgColor} ${iconColor} shadow-inner`}>
          <Icon size={20} />
        </div>
        <ChevronRight size={16} className="text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
      </div>
      <div className="relative z-10">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
        {loading ? (
          <div className="h-9 w-20 bg-white/10 animate-pulse rounded-xl" />
        ) : (
          <p className="text-3xl font-black text-white tracking-tight">{value}</p>
        )}
      </div>
    </motion.div>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const statusColors = {
  Accepted: 'bg-green-500/10 text-green-400 border-green-500/20',
  Pending:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Reviewed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

// ─── PIE custom label ─────────────────────────────────────────────────────────
const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">{`${(percent * 100).toFixed(0)}%`}</text>;
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAnalytics = async (showLoading = false) => {
    if (showLoading) {
      setLoading(true);
    }
    try {
      const res = await api.get('/analytics');
      setData(res.data.data);
    } catch (err) {
      console.error('Could not load analytics data', err);
      toast.error('Could not load analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Custom trigger to safely set data without breaking state
    const fetchOnMount = async () => {
      try {
        const res = await api.get('/analytics');
        setData(res.data.data);
      } catch (err) {
        console.error('Could not load analytics data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOnMount();
  }, []);

  const stats = data?.stats || {};

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm font-medium">Real-time indicators & system operations</p>
        </div>
        <button 
          onClick={() => fetchAnalytics(true)}
          className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] px-5 py-2.5 rounded-2xl text-sm font-semibold hover:border-white/20 transition-all text-white shadow-sm"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh Console
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Admissions" value={stats.totalAdmissions ?? '—'} icon={GraduationCap} iconColor="text-blue-400" bgColor="bg-blue-500/10" linkTo="/admin/admissions" loading={loading} />
        <StatCard title="Enrolled Students" value={stats.acceptedStudents ?? '—'} icon={UserCheck} iconColor="text-green-400" bgColor="bg-green-500/10" linkTo="/admin/students" loading={loading} />
        <StatCard title="Active Courses" value={stats.totalCourses ?? '—'} icon={BookOpen} iconColor="text-purple-400" bgColor="bg-purple-500/10" linkTo="/admin/courses" loading={loading} />
        <StatCard title="Pending Reviews" value={stats.pendingAdmissions ?? '—'} icon={Users} iconColor="text-amber-400" bgColor="bg-amber-500/10" linkTo="/admin/admissions" loading={loading} />
        <StatCard title="Instructors" value={stats.totalTeachers ?? '—'} icon={Briefcase} iconColor="text-cyan-400" bgColor="bg-cyan-500/10" linkTo="/admin/teachers" loading={loading} />
        <StatCard title="Published Posts" value={stats.totalBlogs ?? '—'} icon={FileText} iconColor="text-pink-400" bgColor="bg-pink-500/10" linkTo="/admin/blog" loading={loading} />
        <StatCard title="Events Scheduled" value={stats.totalEvents ?? '—'} icon={CalendarDays} iconColor="text-yellow-400" bgColor="bg-yellow-500/10" linkTo="/admin/events" loading={loading} />
        <StatCard title="New Inquiries" value={stats.newInquiries ?? '—'} icon={MessageSquare} iconColor="text-rose-400" bgColor="bg-rose-500/10" linkTo="/admin/inquiries" loading={loading} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Admission Trend */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-lg font-bold text-white mb-6 tracking-tight">Admission Trend (Last 6 Months)</h3>
          {loading ? (
            <div className="h-64 bg-white/5 animate-pulse rounded-3xl" />
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.monthlyData || []}>
                  <defs>
                    <linearGradient id="gradAdmit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradStudent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0e0e14', border: '1px solid #ffffff10', borderRadius: '16px', color: '#fff' }} />
                  <Area type="monotone" dataKey="admissions" name="Applications" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#gradAdmit)" />
                  <Area type="monotone" dataKey="students" name="Enrolled" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#gradStudent)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Status Breakdown Pie */}
        <div className="bg-white/[0.02] border border-white/[0.06] p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-lg font-bold text-white mb-6 tracking-tight">Application Status</h3>
          {loading ? (
            <div className="h-64 bg-white/5 animate-pulse rounded-3xl" />
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data?.statusBreakdown?.filter(s => s.value > 0) || []}
                    cx="50%" cy="50%" outerRadius={85} innerRadius={55}
                    dataKey="value" nameKey="name"
                    labelLine={false} label={renderCustomLabel}>
                    {(data?.statusBreakdown || []).map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" iconSize={6}
                    formatter={(value) => <span className="text-gray-400 text-xs font-semibold ml-1">{value}</span>} />
                  <Tooltip contentStyle={{ backgroundColor: '#0e0e14', border: '1px solid #ffffff10', borderRadius: '16px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Course Categories Bar Chart */}
      {data?.courseCategories?.length > 0 && (
        <div className="bg-white/[0.02] border border-white/[0.06] p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="text-lg font-bold text-white mb-6 tracking-tight">Courses by Category</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.courseCategories} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0e0e14', border: '1px solid #ffffff10', borderRadius: '16px', color: '#fff' }} />
                <Bar dataKey="value" name="Courses" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Admissions Table */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-white/[0.06] flex justify-between items-center">
          <h3 className="text-lg font-bold text-white tracking-tight">Recent Applications</h3>
          <button 
            onClick={() => navigate('/admin/admissions')} 
            className="text-blue-400 text-xs font-bold uppercase tracking-wider hover:text-blue-300 transition-colors"
          >
            View Register
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-[10px] font-bold uppercase tracking-widest border-b border-white/[0.04]">
                <th className="px-8 py-4">Student</th>
                <th className="px-8 py-4">Course</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-8 py-5">
                      <div className="h-5 bg-white/5 animate-pulse rounded-lg" />
                    </td>
                  </tr>
                ))
              ) : data?.recentAdmissions?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-500 text-sm font-medium">
                    No applications received yet. Share your registration link to get started!
                  </td>
                </tr>
              ) : (data?.recentAdmissions || []).map((item) => (
                <tr 
                  key={item._id} 
                  className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  onClick={() => navigate('/admin/admissions')}
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
                        {(item.fullName || 'S').charAt(0)}
                      </div>
                      <span className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">{item.fullName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-gray-300 text-sm font-medium">{item.course || '—'}</td>
                  <td className="px-8 py-4 text-gray-400 text-xs font-medium">{new Date(item.appliedAt).toLocaleDateString()}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase border tracking-wider ${statusColors[item.status] || 'bg-gray-500/10 text-gray-400 border-white/10'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
