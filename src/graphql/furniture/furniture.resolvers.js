import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import FurnitureService from '../../services/FurnitureService.js';
import {
  uploadFileToGCS,
  deleteFileFromGCS
} from '../../utils/middleware/uploadFile.js';

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    furnitures: async () => await FurnitureService.getAllFurnitures(),
    furniture: async (_, { id }) => await FurnitureService.getFurnitureById(id)
  },
  Mutation: {
    createFurniture: async (_parent, { name, icon, category }, user) => {
      if (!user) throw new Error('Unauthorized');

      if (user.role === 'admin') {
        if (icon) {
          try {
            const { createReadStream } = await icon;
            const updatedFilename = name;
            const folder = 'icons';

            const fileUrl = await uploadFileToGCS({
              createReadStream,
              folder,
              filename: updatedFilename
            });

            try {
              const furniture = await FurnitureService.createFurniture({
                name,
                icon: fileUrl,
                category
              });
              return furniture;
            } catch (dbError) {
              await deleteFileFromGCS({ folder, filename: updatedFilename });
              throw dbError;
            }
          } catch (uploadError) {
            throw new Error(`File upload failed: ${uploadError.message}`);
          }
        }
      }
      throw new Error('You must be an admin to create furniture');
    },
    updateFurniture: async (_parent, { id, input }, user) => {
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
    deleteFurniture: async (_parent, _args, user) => {
      if (!user) throw new Error('Unauthorized');

      if (user.role === 'admin') {
        const furniture = await FurnitureService.getFurnitureById(_args.id);
        if (furniture) {
          const folder = 'icons';
          const filename = furniture.name;

          const [deleteFileResult, deleteFurnitureResult] = await Promise.all([
            deleteFileFromGCS({ folder, filename }),
            FurnitureService.deleteFurniture(_args.id)
          ]);

          return deleteFurnitureResult;
        }
      }
    }
  }
};

export default resolvers;
