import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import ProjectService from '../../services/ProjectService.js';
import {
  uploadFileToGCS,
  deleteFileFromGCS
} from '../../utils/middleware/uploadFile.js';

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    projects: async () => await ProjectService.getAllProjects(),
    project: async (_, { id }) => await ProjectService.getProjectById(id)
  },

  Mutation: {
    createProject: async (_parent, { input, image }, user) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        if (image) {
          try {
            const { createReadStream } = await image;
            const updatedFilename = input.name;
            const folder = 'projects';

            const fileUrl = await uploadFileToGCS({
              createReadStream,
              folder,
              filename: updatedFilename
            });

            try {
              input.image = fileUrl;
              return await ProjectService.createProject(input);
            } catch (dbError) {
              await deleteFileFromGCS({ folder, filename: updatedFilename });
              throw dbError;
            }
          } catch (uploadError) {
            throw new Error(`File upload failed: ${uploadError.message}`);
          }
        }
      }
    },

    updateProject: async (_parent, _args, user) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await ProjectService.updateProject(_args.id, _args.input);
      }
    },

    deleteProject: async (_parent, _args, user) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        const furniture = await ProjectService.getFurnitureById(_args.id);
        if (furniture) {
          const folder = 'icons';
          const filename = furniture.name;

          const [deleteFileResult, deleteProject] = await Promise.all([
            deleteFileFromGCS({ folder, filename }),
            ProjectService.deleteProject(_args.id)
          ]);

          return deleteProject;
        }
      }
    }
  }
};

export default resolvers;
