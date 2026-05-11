import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async (userId, action, resource, resourceId, details, ip) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      resource,
      resourceId,
      details,
      ipAddress: ip
    });
  } catch (err) {
    console.error('Error logging activity:', err.message);
  }
};
