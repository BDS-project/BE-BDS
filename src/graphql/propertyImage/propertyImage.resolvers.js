import PropertyImageService from '../../services/PropertyImageService.js';

const resolvers = {
  Query: {
    propertyimages: async () => {
      return await PropertyImageService.getAllPropertyImages();
    },
    propertyimage: async (_, { id }) => {
      return await PropertyImageService.getImagesByPropertyId(id);
    }
  },
  Mutation: {
    createPropertyImage: async (_parent, { input, images }, user) => {
      if (!user) throw new Error('Unauthorized');
      return await PropertyImageService.createPropertyImage(input);
    },
    updatePropertyImage: async (_parent, { input, images }, user) => {
      if (!user) throw new Error('Unauthorized');
      return await PropertyImageService.updatePropertyImage(id, input);
    },
    deletePropertyImage: async (_parent, { id }, user) => {
      if (!user) throw new Error('Unauthorized');
      return await PropertyImageService.deleteManyPropertyImages(id);
    }
  }
};

export default resolvers;
