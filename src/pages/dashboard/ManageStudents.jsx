import React, { useState, useEffect } from 'react';
import { Search, Mail, BookOpen, Calendar, Download, Trash2, Phone, GraduationCap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../api/api';

// Export students list to CSV
const exportCSV = (students) => {
  const headers = ['Name', 'Email', 'WhatsApp', 'Course', 'Enrolled Date'];
  const rows = students.map(s => [
    s.fullName, s.email, s.whatsapp || s.phone || '', s.course || '', new Date(s.appliedAt).toLocaleDateString()
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'students.csv'; a.click();
  URL.revokeObjectURL(url);
  toast.success('Student list exported!');
};

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admissions');
      // Students = all accepted admissions
      setStudents(res.data.data.filter(a => a.status === 'Accepted'));
    } catch (err) {
      console.error('Could not load students', err);
      toast.error('Could not load students');
      setStudents([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleRevoke = async (id) => {
    if (!window.confirm('Revoke this student\'s enrollment? This will change their status back to Pending.')) return;
    try {
      await api.put(`/admissions/${id}`, { status: 'Pending' });
      toast.success('Enrollment revoked');
      setStudents(prev => prev.filter(s => s._id !== id));
    } catch { toast.error('Failed to revoke enrollment'); }
  };

  const filtered = students.filter(s =>
    (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Directory</h1>
          <p className="text-gray-400">{students.length} enrolled students</p>
        </div>
        <button onClick={() => exportCSV(filtered)}
          className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-all text-white">
          <Download size={18} /> Export List
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-2xl">
          <GraduationCap className="text-blue-500 mb-2" size={24} />
          <p className="text-gray-400 text-xs mb-1">Total Enrolled</p>
          <p className="text-2xl font-bold text-white">{students.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <BookOpen className="text-purple-500 mb-2" size={24} />
          <p className="text-gray-400 text-xs mb-1">Active Courses</p>
          <p className="text-2xl font-bold text-white">
            {[...new Set(students.map(s => s.course).filter(Boolean))].length}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <Calendar className="text-green-500 mb-2" size={24} />
          <p className="text-gray-400 text-xs mb-1">Enrolled This Month</p>
          <p className="text-2xl font-bold text-white">
            {students.filter(s => new Date(s.appliedAt).getMonth() === new Date().getMonth()).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input type="text" placeholder="Search by name or email..." value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-50 transition-all" />
      </div>

      {/* Student Table */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Enrolled</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="py-16 text-center text-gray-500">Loading students...</td></tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <GraduationCap size={40} className="mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-500">No enrolled students yet.</p>
                    <p className="text-gray-600 text-sm mt-1">Accept applications from the Admissions page.</p>
                  </td>
                </tr>
              ) : filtered.map(item => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0 uppercase">
                        {(item.fullName || 'S').charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{item.fullName}</p>
                        <p className="text-xs text-gray-500">Enrolled Student</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{item.course || '—'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center gap-1.5"><Mail size={11} />{item.email}</div>
                      {(item.whatsapp || item.phone) && <div className="flex items-center gap-1.5"><Phone size={11} />{item.whatsapp || item.phone}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-1.5"><Calendar size={13} />{new Date(item.appliedAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleRevoke(item._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Revoke Enrollment">
                      <Trash2 size={16} />
                    </button>
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

export default ManageStudents;
