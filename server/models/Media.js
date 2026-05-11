import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer,
  size: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Media', MediaSchema);
