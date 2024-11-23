import Appointment from '../../models/Appointment.js';
import AppointmentService from '../../services/AppointmentService.js';

const resolvers = {
  Query: {
    appointments: async (_, __, user) => {
      if (!user) {
        throw new Error('Unauthorized');
      }

      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }
      return await AppointmentService.getAllAppointments();
    },

    appointment: async (_, { id }, user) => {
      if (!user) {
        throw new Error('Unauthorized');
      }

      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }
      const appointment = await AppointmentService.getAppointmentById(id);
      if (!appointment) throw new Error('Appointment not found');

      return appointment;
    },

    myAppointments: async (_, __, user) => {
      if (!user) throw new Error('Unauthorized');
      return await Appointment.find({ customer: user._id });
    }
  },

  Mutation: {
    createAppointment: async (_, { input }, user) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      input.customer = user.id;
      return await AppointmentService.createAppointment(input);
    },

    updateAppointment: async (_, { id, input }, user) => {
      if (!user) {
        throw new Error('Unauthorized');
      }

      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }
      return await AppointmentService.updateAppointment(id, input);
    }
  }
};

export default resolvers;
