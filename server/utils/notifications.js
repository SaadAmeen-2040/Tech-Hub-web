import Notification from '../models/Notification.js';

/**
 * Create a system notification
 * @param {Object} options Notification options
 * @param {string} options.title Notification title
 * @param {string} options.message Notification message
 * @param {string} options.type Notification type (admission, inquiry, system)
 * @param {string} [options.link] Optional link to the resource
 */
export const createNotification = async ({ title, message, type, link }) => {
  try {
    await Notification.create({
      title,
      message,
      type,
      link
    });
  } catch (err) {
    console.error('NOTIFICATION ERROR:', err.message);
  }
};
