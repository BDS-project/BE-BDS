import express from 'express';
import blogController from '../controllers/blogController.js';
import authenticate from '../utils/middleware/auth.js';

const router = express.Router();

// GET
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
// POST
router.post('/', authenticate, blogController.createBlog);
// PUT
router.put('/:id', authenticate, blogController.updateBlog);
// DELETE
router.delete('/:id', authenticate, blogController.deleteBlog);

export default router;
