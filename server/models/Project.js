import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add project title']
  },
  student: {
    type: String,
    required: [true, 'Please add student name']
  },
  course: {
    type: String,
    required: [true, 'Please add course name']
  },
  image: {
    type: String,
    required: [true, 'Please add an image']
  },
  description: {
    type: String,
    required: [true, 'Please add description']
  },
  tags: [String],
  type: {
    type: String,
    default: 'All Projects'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Project', ProjectSchema);
