import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please add student name']
  },
  courseName: String,
  review: {
    type: String
  },
  youtubeLink: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  image: String,
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Testimonial', TestimonialSchema);
