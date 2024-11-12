import express from 'express';
import appointmentController from '../controllers/appointmentController.js';
import authenticate from '../utils/middleware/auth.js';

const router = express.Router();

// GET
router.get('/', authenticate, appointmentController.getAllAppointments);
router.get('/:id', authenticate, appointmentController.getAppointmentById);
// POST
router.post('/', authenticate, appointmentController.createAppointment);
// PUT
router.put('/:id', authenticate, appointmentController.updateAppointment);
// DELETE
router.delete('/:id', authenticate, appointmentController.deleteAppointment);

export default router;
