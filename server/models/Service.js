import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a service title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  icon: {
    type: String,
    default: 'Code2',
    required: [true, 'Please add an icon name']
  },
  features: [String],
  color: {
    type: String,
    default: 'bg-indigo-600'
  },
  highlight: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Service', ServiceSchema);
