import express from 'express';
import { getBlogs, createBlog, updateBlog, deleteBlog, getBlogById } from '../controllers/blogs.js';
import { protect, authorize } from '../middleware/auth.js';
const router = express.Router();
router.route('/').get(getBlogs).post(protect, authorize('admin'), createBlog);
router.route('/:id')
  .get(getBlogById)
  .put(protect, authorize('admin'), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);
export default router;
