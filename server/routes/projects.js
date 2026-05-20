import express from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projects.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(getProjects)
  .post(protect, authorize('admin', 'superadmin'), createProject);

router
  .route('/:id')
  .put(protect, authorize('admin', 'superadmin'), updateProject)
  .delete(protect, authorize('admin', 'superadmin'), deleteProject);

export default router;
