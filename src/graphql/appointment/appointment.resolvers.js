import Appointment from '../../models/Appointment.js';
import AppointmentService from '../../services/AppointmentService.js';
import authenticate from '../../utils/middleware/auth.js';

const resolvers = {
  Query: {
    appointments: async (_, { filter }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can');
      }
      return await AppointmentService.getAllAppointments(filter);
    },

    appointment: async (_, { id }, context) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      const appointment = await AppointmentService.getAppointmentById(id);
      if (!appointment) throw new Error('Appointment not found');

      return appointment;
    },

    myAppointments: async (_, __, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      return await Appointment.find({ customer: user._id });
    }
  },

  Mutation: {
    createAppointment: async (_, { input }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      input.customer = user.id ? user.id : '674475497504fb0dada4e2be';
      return await AppointmentService.createAppointment(input);
    },

    updateAppointment: async (_, { id, input }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }
      return await AppointmentService.updateAppointment(id, input);
    }
  }
};

export default resolvers;
