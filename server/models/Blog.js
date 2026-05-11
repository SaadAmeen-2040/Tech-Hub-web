import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please add a title'], trim: true },
  slug: String,
  excerpt: { type: String, required: [true, 'Please add an excerpt'] },
  content: { type: String, required: [true, 'Please add content'] },
  author: { type: String, default: 'Tech Hub Team' },
  image: String,
  category: { type: String, default: 'General' },
  tags: [String],
  isPublished: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Blog', BlogSchema);
