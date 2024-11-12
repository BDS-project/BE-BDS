import express from 'express';
import userController from '../controllers/userController.js';
import authenticate from '../utils/middleware/auth.js';

const router = express.Router();
// GET
router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.get('/profile', authenticate, userController.getProfile);
// POST
router.post('/', authenticate, userController.createUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// PUT
router.put('/:id', authenticate, userController.updateUser);
// DELETE
router.delete('/:id', authenticate, userController.deleteUser);

export default router;
