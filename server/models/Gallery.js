import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: String,
  imageUrl: {
    type: String,
    required: true
  },
  publicId: String, // For Cloudinary management
  category: {
    type: String,
    enum: ['Event', 'Campus', 'Student Projects', 'Awards'],
    default: 'Campus'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Gallery', GallerySchema);
