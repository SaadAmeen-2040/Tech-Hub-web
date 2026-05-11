import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  duration: {
    type: String,
    required: [true, 'Please add duration']
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  thumbnail: {
    type: String,
    default: 'no-photo.jpg'
  },
  isGovernmentFunded: {
    type: Boolean,
    default: false
  },
  instructor: {
    type: String,
    required: [true, 'Please add an instructor name']
  },
  price: {
    type: Number,
    default: 0
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Course', CourseSchema);
