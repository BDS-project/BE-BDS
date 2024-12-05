import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import ProjectService from '../../services/ProjectService.js';
import {
  uploadFileToGCS,
  deleteFileFromGCS
} from '../../utils/middleware/uploadFile.js';
import PropertyImageService from '../../services/PropertyImageService.js';
import PropertyService from '../../services/PropertyService.js';
import authenticate from '../../utils/middleware/auth.js';

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    projects: async (_parent, { filter }) => {
      return await ProjectService.getAllProjects(filter);
    },
    project: async (_, { id }) => {
      return await ProjectService.getProjectById(id);
    }
  },

  Mutation: {
    createProject: async (_parent, { input, image }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }
      try {
        let fileUrl = null;

        if (image) {
          const { createReadStream } = await image;
          const filename = input.name;
          fileUrl = await uploadFileToGCS({
            createReadStream,
            folder: 'projects',
            filename
          });
        }

        input.image = fileUrl;
        const newProject = await ProjectService.createProject(input);
        return newProject;
      } catch (error) {
        if (input.image) {
          await deleteFileFromGCS({
            folder: 'projects',
            filename: input.name
          });
        }
        throw new Error(`Project creation failed: ${error.message}`);
      }
    },

    updateProject: async (_parent, { id, input, image }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }

      try {
        const existingProject = await ProjectService.getProjectById(id);
        let fileUrl = existingProject.image;

        if (image) {
          if (fileUrl) {
            const filename = existingProject.name;
            await deleteFileFromGCS({ folder: 'projects', filename });
          }

          const { createReadStream } = await image;
          const newFilename = `${input.name}_updated`;
          fileUrl = await uploadFileToGCS({
            createReadStream,
            folder: 'projects',
            filename: newFilename
          });
        }

        input.image = fileUrl;
        const updatedProject = await ProjectService.updateProject(id, input);
        return updatedProject;
      } catch (error) {
        throw new Error(`Project update failed: ${error.message}`);
      }
    },

    deleteProject: async (_parent, { id }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }
      try {
        const project = await ProjectService.getProjectById(id);
        if (project.image) {
          const filename = project.name;
          await deleteFileFromGCS({ folder: 'projects', filename });
        }
        const properties = project.properties || [];

        await Promise.all(
          properties.map(async (property) => {
            const propertyImages = property.property_images || [];
            await Promise.all(
              propertyImages.map(async (image) => {
                await deleteFileFromGCS({
                  folder: 'properties',
                  filename: image.title
                });
                await PropertyImageService.deletePropertyImage(image.id);
              })
            );
            await PropertyService.deleteProperty(property.id);
          })
        );
        const deletedProject = await ProjectService.deleteProject(id);
        return `Project deleted successfully: ${deletedProject.name}`;
      } catch (error) {
        throw new Error(`Project deletion failed: ${error.message}`);
      }
    }
  }
};

export default resolvers;
