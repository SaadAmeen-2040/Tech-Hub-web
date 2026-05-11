import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, (req, res, next) => {
  console.log('UPLOAD: Received request');
  next();
}, upload.single('image'), (req, res) => {
  console.log('UPLOAD: Multer processed');
  if (!req.file) {
    console.log('UPLOAD: No file found');
    return res.status(400).json({ success: false, message: 'Please upload a file' });
  }

  console.log('UPLOAD: Success, path:', req.file.path);
  res.status(200).json({
    success: true,
    data: req.file.path,
    publicId: req.file.filename
  });
});

export default router;
