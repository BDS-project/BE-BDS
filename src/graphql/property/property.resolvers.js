import PropertyService from '../../services/PropertyService.js';

const resolvers = {
  Query: {
    properties: async () => await PropertyService.getAllProperties(),

    property: async (_, { id }) => await PropertyService.getPropertyById(id)
  },

  Mutation: {
    createProperty: async (_, { type, title, description, bedrooms, bathrooms, size, orientation, block, price, location, project }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        const propertyData = { type, title, description, bedrooms, bathrooms, size, orientation, block, price, location, project };
        return await PropertyService.createProperty(propertyData);
      }
    },

    updateProperty: async (_, { id, ...args }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await PropertyService.updateProperty(id, args);
      }
    },

    deleteProperty: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await PropertyService.deleteProperty(id);
      }
    }
  }
};

export default resolvers;
