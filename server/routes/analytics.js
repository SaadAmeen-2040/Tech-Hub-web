import express from 'express';
import { getAnalytics } from '../controllers/analytics.js';
import { protect, authorize } from '../middleware/auth.js';
const router = express.Router();
router.get('/', protect, authorize('admin'), getAnalytics);
export default router;
