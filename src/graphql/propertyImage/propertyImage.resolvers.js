import PropertyService from '../../services/PropertyService.js';

const resolvers = {
  Query: {
    properties: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await PropertyService.getAllProperties(user._id);
    },
    property: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await PropertyService.getPropertyById(id);
    }
  },
  Mutation: {
    createProperty: async (_, { title, description, price, category, location, status }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await PropertyService.createProperty({ title, description, price, category, location, status });
    },
    updateProperty: async (_, { id, ...args }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await PropertyService.updateProperty(id, args);
    },
    deleteProperty: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await PropertyService.deleteProperty(id);
    }
  }
};

export default resolvers;
