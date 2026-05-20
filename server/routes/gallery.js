import express from 'express';
import {
  getGallery,
  createGalleryItem,
  deleteGalleryItem
} from '../controllers/gallery.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(getGallery)
  .post(protect, authorize('admin', 'superadmin'), createGalleryItem);

router
  .route('/:id')
  .delete(protect, authorize('admin', 'superadmin'), deleteGalleryItem);

export default router;
