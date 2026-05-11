import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Media from '../models/Media.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Disk Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// @desc    Upload image
// @route   POST /api/uploads
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    // Return a relative URL that works with the Vite proxy
    const imageUrl = `/api/uploads/image/${req.file.filename}`;

    res.status(200).json({
      success: true,
      data: imageUrl
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @desc    Smart Image Getter (Checks Disk then DB)
// @route   GET /api/uploads/image/:idOrFilename
router.get('/image/:idOrFilename', async (req, res) => {
  try {
    const { idOrFilename } = req.params;
    const diskPath = path.join(__dirname, '../uploads', idOrFilename);

    // 1. Try Disk First
    if (fs.existsSync(diskPath)) {
      return res.sendFile(diskPath);
    }

    // 2. Try Database Fallback (for older images)
    if (idOrFilename.match(/^[0-9a-fA-F]{24}$/)) {
      const media = await Media.findById(idOrFilename);
      if (media) {
        res.set('Content-Type', media.contentType);
        return res.send(media.data);
      }
    }

    res.status(404).json({ success: false, message: 'Image not found' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
