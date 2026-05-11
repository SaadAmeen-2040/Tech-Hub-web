import Settings from '../models/Settings.js';

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ key: 'main_content' });
    
    if (!settings) {
      // Create default settings if not found
      settings = await Settings.create({ key: 'main_content' });
    }
    
    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { key: 'main_content' },
      req.body,
      { new: true, runValidators: true, upsert: true }
    );
    
    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
