import AppointmentService from '../../services/AppointmentService.js';

const resolvers = {
  Query: {
    appointments: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await AppointmentService.getAllAppointments(user._id);
    },
    appointment: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await AppointmentService.getAppointmentById(id);
    }
  },
  Mutation: {
    createAppointment: async (_, { propertyId, dateTime }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await AppointmentService.createAppointment({
        user: user._id,
        property: propertyId,
        dateTime,
        status: 'pending'
      });
    },
    updateAppointment: async (_, { id, dateTime, status }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await AppointmentService.updateAppointment(id, { dateTime, status });
    },
    deleteAppointment: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await AppointmentService.deleteAppointment(id);
    }
  }
};

export default resolvers;
