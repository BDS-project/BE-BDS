import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import PropertyService from '../../services/PropertyService.js';
import PropertyImageService from '../../services/PropertyImageService.js';
import {
  uploadFileToGCS,
  deleteFileFromGCS
} from '../../utils/middleware/uploadFile.js';
import authenticate from '../../utils/middleware/auth.js';
const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    properties: async (_parent, { filter }, context) => {
      return await PropertyService.getAllProperties(filter);
    },
    property: async (_, { id }) => {
      return await PropertyService.getPropertyById(id);
    },
    myProperties: async (_, { filter }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await PropertyService.getAllProperties(filter);
      }
      return await PropertyService.getAllMyProperties(filter, user);
    }
  },

  Mutation: {
    createProperty: async (_parent, { input, images }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      input.user = user.id;
      let property;
      let propertyImages = [];
      let cloudImageUrls = [];

      try {
        property = await PropertyService.createProperty({ input });

        if (!images?.length) {
          return property;
        }

        const filesname = [];
        const uploadPromises = images.map(async (image, index) => {
          const { createReadStream } = await image;
          const filename = `${input.title}_${index}`;
          filesname.push(filename);
          return uploadFileToGCS({
            createReadStream,
            folder: 'properties',
            filename
          });
        });

        cloudImageUrls = await Promise.all(uploadPromises);

        const propertyImagePromises = cloudImageUrls.map((imageUrl, index) =>
          PropertyImageService.createPropertyImage({
            property: property._id,
            url: imageUrl,
            title: filesname[index],
            is_primary: index === 0
          })
        );
        propertyImages = await Promise.all(propertyImagePromises);

        return property;
      } catch (error) {
        if (propertyImages.length > 0) {
          await Promise.all(
            propertyImages.map((img) =>
              PropertyImageService.deletePropertyImage(img._id)
            )
          );
        }

        if (cloudImageUrls.length > 0) {
          await Promise.all(
            cloudImageUrls.map((url) =>
              deleteFileFromGCS({
                folder: 'properties',
                filename: url
              })
            )
          );
        }

        if (property) {
          await PropertyService.deleteProperty(property._id);
        }

        throw new Error(`Property creation failed: ${error.message}`);
      }
    },

    updateProperty: async (_parent, { id, input, images }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin' && user.role !== 'customer') {
        throw new Error('Failed');
      }

      let oldProperty;
      let cloudImageUrls = [];
      let propertyImages = [];

      try {
        oldProperty = await PropertyService.getPropertyById(id);

        if (user.role !== 'admin' && oldProperty.user.toString() !== user.id) {
          throw new Error('You can only update your own properties');
        }

        if (images?.length) {
          const oldImages = oldProperty?.property_images || [];

          const filesname = [];
          const uploadPromises = images.map(async (image, index) => {
            const { createReadStream } = await image;
            const filename = `${input.title}_${index}_updated`;
            filesname.push(filename);

            return uploadFileToGCS({
              createReadStream,
              folder: 'properties',
              filename
            });
          });

          cloudImageUrls = await Promise.all(uploadPromises);

          const propertyImagePromises = cloudImageUrls.map((imageUrl, index) =>
            PropertyImageService.createPropertyImage({
              property: oldProperty._id,
              url: imageUrl,
              title: filesname[index],
              is_primary: index === 0
            })
          );

          propertyImages = await Promise.all(propertyImagePromises);

          const updatedProperty = await PropertyService.updateProperty(
            id,
            input
          );

          await Promise.all(
            oldImages.map(async (oldImage) => {
              await deleteFileFromGCS({
                folder: 'properties',
                filename: oldImage.title
              });
              await PropertyImageService.deletePropertyImage(oldImage.id);
            })
          );

          return updatedProperty;
        }

        return await PropertyService.updateProperty(id, input);
      } catch (error) {
        if (propertyImages.length > 0) {
          await Promise.all(
            propertyImages.map((img) =>
              PropertyImageService.deletePropertyImage(img.id)
            )
          );
        }

        if (cloudImageUrls.length > 0) {
          await Promise.all(
            cloudImageUrls.map((url) =>
              deleteFileFromGCS({
                folder: 'properties',
                filename: url
              })
            )
          );
        }

        if (oldProperty && !images?.length) {
          throw new Error(
            `Failed to update property without images: ${error.message}`
          );
        }

        throw new Error(`Property update failed: ${error.message}`);
      }
    },

    deleteProperty: async (_parent, { id }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin' && user.role !== 'customer') {
        throw new Error('Failed');
      }

      try {
        const property = await PropertyService.getPropertyById(id);
        if (user.role !== 'admin' && property.user.toString() !== user.id) {
          throw new Error('You can only update your own properties');
        }
        const propertyImages = property.property_images || [];

        await Promise.all(
          propertyImages.map(async (propertyImage) => {
            const image = await PropertyImageService.getPropertyImageById(
              propertyImage.id
            );
            await deleteFileFromGCS({
              folder: 'properties',
              filename: image.title
            });
            await PropertyImageService.deletePropertyImage(image.id);
          })
        );

        await PropertyService.deleteProperty(id);
        return 'Property deleted successfully';
      } catch (error) {
        throw new Error(`Property deletion failed: ${error.message}`);
      }
    }
  }
};
export default resolvers;
