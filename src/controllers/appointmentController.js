import AppointmentService from '../services/AppointmentService.js';

const AppointmentController = {
  createAppointment: async (req, res) => {
    try {
      const appointment = await AppointmentService.createAppointment({
        user: req.user._id,
        property: req.body.propertyId,
        dateTime: req.body.dateTime,
        status: 'pending'
      });
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllAppointments: async (req, res) => {
    try {
      const appointments = await AppointmentService.getAllAppointments(req.user._id);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAppointmentById: async (req, res) => {
    try {
      const appointment = await AppointmentService.getAppointmentById(req.params.id);
      res.json(appointment);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const appointment = await AppointmentService.updateAppointment(req.params.id, req.body);
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const result = await AppointmentService.deleteAppointment(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default AppointmentController;
