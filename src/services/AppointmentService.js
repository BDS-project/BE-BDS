import Appointment from '../models/Appointment.js';

const AppointmentService = {
  createAppointment: async (appointmentData) => {
    try {
      const appointment = new Appointment(appointmentData);
      await appointment.save();
      return appointment;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllAppointments: async (userId) => {
    try {
      const appointments = await Appointment.find({ user: userId }).populate('property');
      return appointments;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAppointmentById: async (appointmentId) => {
    try {
      const appointment = await Appointment.findById(appointmentId).populate('property');
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      return appointment;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateAppointment: async (appointmentId, appointmentData) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(appointmentId, appointmentData, { new: true });
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      return appointment;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteAppointment: async (appointmentId) => {
    try {
      const appointment = await Appointment.findByIdAndDelete(appointmentId);
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      return { message: 'Appointment deleted' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default AppointmentService;
