import express from 'express';
import {
  getAdmissions,
  updateAdmissionStatus,
  deleteAdmission,
  createAdmission,
  exportAdmissions
} from '../controllers/admissions.js';

const router = express.Router();

import { protect, authorize } from '../middleware/auth.js';

// Public route
router.post('/', createAdmission);

// Protected routes
router.use(protect);
router.use(authorize('admin', 'staff'));

router.get('/', getAdmissions);
router.get('/export', exportAdmissions);
router.route('/:id').put(updateAdmissionStatus).delete(deleteAdmission);

export default router;
