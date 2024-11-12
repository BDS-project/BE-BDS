import AppointmentService from '../services/AppointmentService.js';
import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode/httpStatusCode.js';

const AppointmentController = {
  createAppointment: async (req, res) => {
    try {
      const appointment = await AppointmentService.createAppointment({
        user: req.user._id,
        property: req.body.propertyId,
        dateTime: req.body.dateTime,
        status: 'pending'
      });
      res.status(StatusCodes.CREATED).json(appointment);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  getAllAppointments: async (req, res) => {
    try {
      const appointments = await AppointmentService.getAllAppointments(req.user._id);
      res.json(appointments);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  getAppointmentById: async (req, res) => {
    try {
      const appointment = await AppointmentService.getAppointmentById(req.params.id);
      res.json(appointment);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const appointment = await AppointmentService.updateAppointment(req.params.id, req.body);
      res.json(appointment);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const result = await AppointmentService.deleteAppointment(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export default AppointmentController;
