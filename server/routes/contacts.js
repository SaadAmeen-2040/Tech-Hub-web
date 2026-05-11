import express from 'express';
import {
  getContacts,
  createContact,
  updateContactStatus,
  deleteContact,
  exportContacts
} from '../controllers/contacts.js';

const router = express.Router();

router.route('/').post(createContact);

import { protect, authorize } from '../middleware/auth.js';

router.use(protect);
router.use(authorize('admin', 'staff'));

router.get('/', getContacts);
router.get('/export', exportContacts);
router.route('/:id').put(updateContactStatus).delete(deleteContact);

export default router;
