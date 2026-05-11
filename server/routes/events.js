import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events.js';
import { protect, authorize } from '../middleware/auth.js';
const router = express.Router();
router.route('/').get(getEvents).post(protect, authorize('admin'), createEvent);
router.route('/:id').put(protect, authorize('admin'), updateEvent).delete(protect, authorize('admin'), deleteEvent);
export default router;
