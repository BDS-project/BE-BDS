import express from 'express';
import chatbotController from '../controllers/chatbotController.js';
import authenticate from '../utils/middleware/auth.js';

const router = express.Router();

// GET
router.get('/', authenticate, chatbotController.getConversation);
router.get('/:id', authenticate, chatbotController.getConversationById);
// POST
router.post('/', authenticate, chatbotController.handleMessage);
// PUT
router.put('/:id', chatbotController.updateConversation);
// DELETE
router.delete('/:id', chatbotController.deleteConversation);

export default router;
