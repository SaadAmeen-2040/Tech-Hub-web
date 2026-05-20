import express from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService
} from '../controllers/services.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(getServices)
  .post(protect, authorize('admin', 'superadmin'), createService);

router
  .route('/:id')
  .put(protect, authorize('admin', 'superadmin'), updateService)
  .delete(protect, authorize('admin', 'superadmin'), deleteService);

export default router;
