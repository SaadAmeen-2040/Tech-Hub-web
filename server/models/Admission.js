import mongoose from 'mongoose';

const AdmissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add student name']
  },
  fatherName: String,
  email: {
    type: String,
    required: [true, 'Please add email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: String,
  whatsapp: {
    type: String,
    required: [true, 'Please add a whatsapp number']
  },
  cnic: String,
  dob: Date,
  qualification: String,
  fieldOfStudy: String,
  course: {
    type: String,
    required: [true, 'Please select a course']
  },
  address: String,
  guardianPhone: String,
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Admission', AdmissionSchema);
