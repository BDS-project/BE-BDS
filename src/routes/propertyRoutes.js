import express from 'express';
import propertyController from '../controllers/propertyController.js';
import authenticate from '../utils/middleware/auth.js';

const router = express.Router();

// GET
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
// POST
router.post('/', authenticate, propertyController.createProperty);
// PUT
router.put('/:id', authenticate, propertyController.updateProperty);
// DELETE
router.delete('/:id', authenticate, propertyController.deleteProperty);

export default router;
