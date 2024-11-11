import express from 'express';
import propertyController from '../controllers/propertyController.js';

const router = express.Router();

router.get('/', propertyController.getAllProperties);
router.post('/', propertyController.createProperty);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

export default router;
