import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import FurnitureService from '../../services/FurnitureService.js';
import uploadFileToGCS from '../../utils/middleware/uploadFile.js';

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    furnitures: async () => await FurnitureService.getAllFurnitures(),
    furniture: async (_, { id }) => await FurnitureService.getFurnitureById(id)
  },
  Mutation: {
    createFurniture: async (_parent, { name, icon, category }, user, _info) => {
      console.log('category:', category);
      console.log('icon:', icon);
      console.log('name:', name);
      console.log('user:', user);

      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        let iconUrl = null;

        if (icon) {
          const { createReadStream, filename } = await icon;
          const fileUrl = await uploadFileToGCS({ createReadStream, filename });
          iconUrl = fileUrl;
        }

        return await FurnitureService.createFurniture({
          name,
          icon: iconUrl,
          category
        });
      }
      throw new Error('You must be an admin to create furniture');
    },

    updateFurniture: async (_parent, { id, input }, user, _info) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        let iconUrl = null;

        if (input.icon) {
          const { createReadStream, filename } = await input.icon;
          const fileUrl = await uploadFileToGCS({ createReadStream, filename });
          iconUrl = fileUrl;
        }

        return await FurnitureService.updateFurniture(id, {
          ...input,
          icon: iconUrl
        });
      }
      throw new Error('You must be an admin to update furniture');
    },
    deleteFurniture: async (_parent, _args, user, _info) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await FurnitureService.deleteFurniture(_args.id);
      }
    }
  }
};

export default resolvers;
