import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please add a title'] },
  description: { type: String, required: [true, 'Please add a description'] },
  date: { type: Date, required: [true, 'Please add event date'] },
  time: String,
  venue: String,
  thumbnail: String,
  category: {
    type: String,
    enum: ['Seminar', 'Workshop', 'Webinar', 'Graduation', 'Competition', 'Other'],
    default: 'Other'
  },
  registrationLink: String,
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', EventSchema);
