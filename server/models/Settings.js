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
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Settings', SettingsSchema);
