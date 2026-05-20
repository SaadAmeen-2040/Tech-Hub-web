import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonials.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(getTestimonials)
  .post(protect, authorize('admin', 'superadmin'), createTestimonial);

router
  .route('/:id')
  .put(protect, authorize('admin', 'superadmin'), updateTestimonial)
  .delete(protect, authorize('admin', 'superadmin'), deleteTestimonial);

export default router;
