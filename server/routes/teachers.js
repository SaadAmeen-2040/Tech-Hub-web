import express from 'express';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from '../controllers/teachers.js';

const router = express.Router();

import { protect, authorize } from '../middleware/auth.js';

router.route('/').get(getTeachers).post(protect, authorize('admin'), createTeacher);
router.route('/:id').put(protect, authorize('admin'), updateTeacher).delete(protect, authorize('admin'), deleteTeacher);

export default router;
