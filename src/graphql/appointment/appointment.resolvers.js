import Appointment from '../../models/Appointment.js';
import AppointmentService from '../../services/AppointmentService.js';

const resolvers = {
  Query: {
    appointments: async (_, __, { filter }) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      return await AppointmentService.getAllAppointments(filter);
    },

    appointment: async (_, { id }, user) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      const appointment = await AppointmentService.getAppointmentById(id);
      if (!appointment) throw new Error('Appointment not found');

      return appointment;
    },

    myAppointments: async (_, __, user) => {
      return await Appointment.find({ customer: user._id });
    }
  },

  Mutation: {
    createAppointment: async (_, { input }, user) => {
      console.log('input:', input);
      input.customer = user.id ? user.id : '674475497504fb0dada4e2be';
      return await AppointmentService.createAppointment(input);
    },

    updateAppointment: async (_, { id, input }, user) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      return await AppointmentService.updateAppointment(id, input);
    }
  }
};

export default resolvers;
