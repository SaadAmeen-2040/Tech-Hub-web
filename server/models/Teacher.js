import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add teacher name']
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    unique: true
  },
  designation: {
    type: String,
    required: [true, 'Please add designation']
  },
  bio: String,
  image: {
    type: String,
    default: 'no-avatar.jpg'
  },
  specialization: [String],
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Teacher', TeacherSchema);
