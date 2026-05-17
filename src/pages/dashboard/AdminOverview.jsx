import React, { useState, useEffect } from 'react';
import {
  Users, BookOpen, GraduationCap, MessageSquare,
  ArrowUpRight, ArrowDownRight, RefreshCw,
  UserCheck, CalendarDays, FileText, Briefcase, Link
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
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}
      onClick={() => linkTo && navigate(linkTo)}
      className={`${bgColor} border border-white/10 p-6 rounded-3xl cursor-pointer relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-5">
        <div className={`p-3 rounded-2xl bg-white/10 ${iconColor}`}>
          <Icon size={22} />
        </div>
        <Link size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
      </div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      {loading ? (
        <div className="h-9 w-20 bg-white/10 animate-pulse rounded-xl" />
      ) : (
        <p className="text-4xl font-bold text-white">{value}</p>
      )}
    </motion.div>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const statusColors = {
  Accepted: 'bg-green-500/10 text-green-500 border-green-500/20',
  Pending:  'bg-orange-500/10 text-orange-500 border-orange-500/20',
  Reviewed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
};

// ─── PIE custom label ─────────────────────────────────────────────────────────
const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">{`${(percent * 100).toFixed(0)}%`}</text>;
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await api.get('/analytics');
      setData(res.data.data);
    } catch (err) {
      toast.error('Could not load analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnalytics(); }, []);

  const stats = data?.stats || {};

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm">Live data from your MongoDB database</p>
        </div>
        <button onClick={fetchAnalytics}
          className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-white/10 transition-all text-white">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Grid — all from DB */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Admissions" value={stats.totalAdmissions ?? '—'} icon={GraduationCap} iconColor="text-blue-400" bgColor="bg-blue-600/10" linkTo="/admin/admissions" loading={loading} />
        <StatCard title="Enrolled Students" value={stats.acceptedStudents ?? '—'} icon={UserCheck} iconColor="text-green-400" bgColor="bg-green-600/10" linkTo="/admin/students" loading={loading} />
        <StatCard title="Active Courses" value={stats.totalCourses ?? '—'} icon={BookOpen} iconColor="text-purple-400" bgColor="bg-purple-600/10" linkTo="/admin/courses" loading={loading} />
        <StatCard title="Pending Reviews" value={stats.pendingAdmissions ?? '—'} icon={Users} iconColor="text-orange-400" bgColor="bg-orange-600/10" linkTo="/admin/admissions" loading={loading} />
        <StatCard title="Instructors" value={stats.totalTeachers ?? '—'} icon={Briefcase} iconColor="text-cyan-400" bgColor="bg-cyan-600/10" linkTo="/admin/teachers" loading={loading} />
        <StatCard title="Published Posts" value={stats.totalBlogs ?? '—'} icon={FileText} iconColor="text-pink-400" bgColor="bg-pink-600/10" linkTo="/admin/blog" loading={loading} />
        <StatCard title="Events Scheduled" value={stats.totalEvents ?? '—'} icon={CalendarDays} iconColor="text-yellow-400" bgColor="bg-yellow-600/10" linkTo="/admin/events" loading={loading} />
        <StatCard title="New Inquiries" value={stats.newInquiries ?? '—'} icon={MessageSquare} iconColor="text-red-400" bgColor="bg-red-600/10" linkTo="/admin/inquiries" loading={loading} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Admission Trend — last 6 months from DB */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-6">Admission Trend (Last 6 Months)</h3>
          {loading ? (
            <div className="h-64 bg-white/5 animate-pulse rounded-2xl" />
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
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff15', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="admissions" name="Applications" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#gradAdmit)" />
                  <Area type="monotone" dataKey="students" name="Enrolled" stroke="#22c55e" strokeWidth={2.5} fillOpacity={1} fill="url(#gradStudent)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Status Breakdown Pie — from DB */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-6">Application Status</h3>
          {loading ? (
            <div className="h-64 bg-white/5 animate-pulse rounded-2xl" />
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data?.statusBreakdown?.filter(s => s.value > 0) || []}
                    cx="50%" cy="50%" outerRadius={90} innerRadius={50}
                    dataKey="value" nameKey="name"
                    labelLine={false} label={renderCustomLabel}>
                    {(data?.statusBreakdown || []).map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" iconSize={8}
                    formatter={(value) => <span style={{ color: '#9ca3af', fontSize: 12 }}>{value}</span>} />
                  <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff15', borderRadius: '12px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Course Categories Bar Chart */}
      {data?.courseCategories?.length > 0 && (
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-6">Courses by Category</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.courseCategories} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff15', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="value" name="Courses" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Admissions — LIVE from DB */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Recent Applications</h3>
          <button onClick={() => navigate('/admin/admissions')} className="text-blue-500 text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="px-8 py-4">Student</th>
                <th className="px-8 py-4">Course</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-8 py-4">
                      <div className="h-5 bg-white/5 animate-pulse rounded-lg" />
                    </td>
                  </tr>
                ))
              ) : data?.recentAdmissions?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-500">
                    No admissions yet. Share your registration page to get started!
                  </td>
                </tr>
              ) : (data?.recentAdmissions || []).map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors group cursor-pointer"
                  onClick={() => navigate('/admin/admissions')}>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                        {(item.fullName || 'S').charAt(0)}
                      </div>
                      <span className="text-white font-medium group-hover:text-blue-400 transition-colors">{item.fullName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-gray-300 text-sm">{item.course || '—'}</td>
                  <td className="px-8 py-4 text-gray-400 text-sm">{new Date(item.appliedAt).toLocaleDateString()}</td>
                  <td className="px-8 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColors[item.status] || 'bg-gray-500/10 text-gray-400 border-white/10'}`}>
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
