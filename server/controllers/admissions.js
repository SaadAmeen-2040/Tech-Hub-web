import Admission from '../models/Admission.js';
import { logActivity } from '../utils/logger.js';
import { createNotification } from '../utils/notifications.js';

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Private/Admin
export const getAdmissions = async (req, res, next) => {
  try {
    const admissions = await Admission.find().sort('-appliedAt');
    res.status(200).json({ success: true, count: admissions.length, data: admissions });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new admission
// @route   POST /api/admissions
// @access  Public
export const createAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.create(req.body);
    
    // Create notification
    await createNotification({
      title: 'New Admission Application',
      message: `${admission.fullName} has applied for ${admission.course}`,
      type: 'admission',
      link: '/admin/admissions'
    });

    res.status(201).json({ success: true, data: admission });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Export admissions to CSV
// @route   GET /api/admissions/export
// @access  Private/Admin
export const exportAdmissions = async (req, res, next) => {
  try {
    const admissions = await Admission.find().sort('-appliedAt');
    
    let csv = 'Applied At,Student Name,Father Name,Email,WhatsApp,CNIC,Course,Qualification,Status\n';
    
    admissions.forEach(adm => {
      csv += `${adm.appliedAt},"${adm.fullName}","${adm.fatherName || ''}","${adm.email}","${adm.whatsapp}","${adm.cnic || ''}","${adm.course}","${adm.qualification}","${adm.status}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=admissions.csv');
    res.status(200).send(csv);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update admission status
// @route   PUT /api/admissions/:id
// @access  Private/Admin
export const updateAdmissionStatus = async (req, res, next) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!admission) {
      return res.status(404).json({ success: false, message: 'Admission not found' });
    }

    await logActivity(
      req.user.id,
      'UPDATE_STATUS',
      'Admission',
      admission._id,
      `Changed status to ${req.body.status}`,
      req.ip
    );

    res.status(200).json({ success: true, data: admission });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete admission
// @route   DELETE /api/admissions/:id
// @access  Private/Admin
export const deleteAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) {
      return res.status(404).json({ success: false, message: 'Admission not found' });
    }

    await logActivity(
      req.user.id,
      'DELETE',
      'Admission',
      admission._id,
      `Deleted application from ${admission.fullName}`,
      req.ip
    );

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
