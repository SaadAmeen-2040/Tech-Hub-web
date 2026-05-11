import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  subject: String,
  message: {
    type: String,
    required: [true, 'Please add a message']
  },
  phone: String,
  company: String,
  projectType: String,
  businessCategory: String,
  budget: String,
  includeAI: {
    type: Boolean,
    default: false
  },
  country: {
    type: String,
    default: 'Pakistan'
  },
  type: {
    type: String,
    enum: ['General Inquiry', 'Quote Request'],
    default: 'General Inquiry'
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Contact', ContactSchema);
