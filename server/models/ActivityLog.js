import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  resource: String,
  resourceId: String,
  details: String,
  ipAddress: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ActivityLog', ActivityLogSchema);
