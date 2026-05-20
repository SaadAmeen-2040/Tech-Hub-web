import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'main_content'
  },
  principal: {
    name: { type: String, default: 'Muhammad Salman' },
    designation: { type: String, default: 'Principal, Tech Hub' },
    message: [{ type: String }],
    image: { type: String, default: 'principal_salman.png' },
    visionaryTitle: { type: String, default: 'Principal & IT Visionary' }
  },
  mission: { type: String },
  vision: { type: String },
  coreValues: [{
    title: String,
    description: String,
    icon: String, // lucide icon name
    color: String // tailwind class
  }],
  stats: [{
    label: String,
    value: String,
    icon: String
  }],
  contact: {
    address: { type: String, default: 'Opp. Moon College and Sir Sadiq Banquet Hall, Ring Road Near Saddar Pulli, Bahawalpur' },
    phone: { type: String, default: '+92 308 0620868' },
    email: { type: String, default: 'info@techhubinstitute.pk' }
  },
  socials: {
    facebook: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
    instagram: { type: String, default: '#' },
    linkedin: { type: String, default: '#' },
    whatsapp: { type: String, default: '923080620868' }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Settings', SettingsSchema);
