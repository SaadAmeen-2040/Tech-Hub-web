import Contact from '../models/Contact.js';
import { createNotification } from '../utils/notifications.js';

// @desc    Get all inquiries
// @route   GET /api/contacts
// @access  Private/Admin
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update inquiry status
// @route   PUT /api/contacts/:id
// @access  Private/Admin
export const updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new inquiry
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    // Create notification
    const isQuote = contact.type === 'Quote Request';
    await createNotification({
      title: isQuote ? 'New Project Quote Request' : 'New Inquiry Received',
      message: `${contact.name} sent a ${isQuote ? 'project quote request' : 'message'}: ${contact.subject || contact.projectType || 'No Subject'}`,
      type: isQuote ? 'quote' : 'inquiry',
      link: isQuote ? '/admin/quotes' : '/admin/inquiries'
    });

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};
// @route   GET /api/contacts/export
// @access  Private/Admin
export const exportContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    
    let csv = 'Created At,Name,Email,Phone,Type,Subject,Message,Company,Project Type,Category,Budget,AI,Country,Status\n';
    
    contacts.forEach(c => {
      csv += `${c.createdAt},"${c.name}","${c.email}","${c.phone || ''}","${c.type}","${c.subject || ''}","${c.message.replace(/"/g, '""')}","${c.company || ''}","${c.projectType || ''}","${c.businessCategory || ''}","${c.budget || ''}","${c.includeAI ? 'Yes' : 'No'}","${c.country || ''}","${c.status}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=inquiries.csv');
    res.status(200).send(csv);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
