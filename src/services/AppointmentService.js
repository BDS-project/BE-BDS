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

  getAllAppointments: async (filter) => {
    try {
      const query = {};

      if (filter) {
        if (filter.full_name)
          query.full_name = { $regex: filter.full_name, $options: 'i' };
        if (filter.phone) query.phone = { $regex: filter.phone, $options: 'i' };
        if (filter.email) query.email = { $regex: filter.email, $options: 'i' };
        if (filter.appointment_date)
          query.appointment_date = filter.appointment_date;
        if (filter.property)
          query.property = { $regex: filter.property, $options: 'i' };
        if (filter.status) query.status = filter.status;
        if (filter.advisor) query.advisor = filter.advisor;

        if (filter?.start_date || filter?.end_date) {
          query.created_at = {};
          if (filter.start_date)
            query.created_at.$gte = new Date(filter.start_date);
          if (filter.end_date)
            query.created_at.$lte = new Date(filter.end_date);
        }
      }
      const page = filter?.page || 1;
      const limit = filter?.limit || 10;
      const skip = (page - 1) * limit;

      const appointments = await Appointment.find(query)
        .skip(skip)
        .limit(limit);
      return appointments;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAppointmentById: async (appointmentId) => {
    try {
      const appointment =
        await Appointment.findById(appointmentId).populate('property');
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
      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        appointmentData,
        { new: true }
      );
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
