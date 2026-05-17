import Course from '../models/Course.js';
import Admission from '../models/Admission.js';
import Contact from '../models/Contact.js';
import Teacher from '../models/Teacher.js';
import Blog from '../models/Blog.js';
import Event from '../models/Event.js';

// @desc    Get dashboard analytics summary
// @route   GET /api/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res) => {
  try {
    // ── Counts ──────────────────────────────────────────────────────────────
    const [
      totalCourses,
      totalAdmissions,
      acceptedStudents,
      pendingAdmissions,
      totalTeachers,
      totalBlogs,
      totalEvents,
      newInquiries,
      allAdmissions,
    ] = await Promise.all([
      Course.countDocuments(),
      Admission.countDocuments(),
      Admission.countDocuments({ status: 'Accepted' }),
      Admission.countDocuments({ status: 'Pending' }),
      Teacher.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Event.countDocuments(),
      Contact.countDocuments({ status: 'New' }),
      Admission.find().sort('-appliedAt').limit(8),
    ]);

    // ── Monthly admission trend (last 6 months) ─────────────────────────────
    const now = new Date();
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const count = await Admission.countDocuments({ appliedAt: { $gte: d, $lte: end } });
      monthlyData.push({
        name: d.toLocaleString('default', { month: 'short' }),
        admissions: count,
        students: await Admission.countDocuments({ status: 'Accepted', appliedAt: { $gte: d, $lte: end } }),
      });
    }

    // ── Status breakdown for pie-like chart ────────────────────────────────
    const statusBreakdown = [
      { name: 'Accepted', value: acceptedStudents, color: '#22c55e' },
      { name: 'Pending',  value: pendingAdmissions, color: '#f97316' },
      { name: 'Rejected', value: await Admission.countDocuments({ status: 'Rejected' }), color: '#ef4444' },
      { name: 'Reviewed', value: await Admission.countDocuments({ status: 'Reviewed' }), color: '#3b82f6' },
    ];

    // ── Course category distribution ─────────────────────────────────────────
    const categoryAgg = await Course.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalCourses,
          totalAdmissions,
          acceptedStudents,
          pendingAdmissions,
          totalTeachers,
          totalBlogs,
          totalEvents,
          newInquiries,
        },
        monthlyData,
        statusBreakdown,
        courseCategories: categoryAgg.map(c => ({ name: c._id || 'Other', value: c.count })),
        recentAdmissions: allAdmissions,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
