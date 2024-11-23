import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import PropertyService from '../../services/PropertyService.js';
import PropertyImageService from '../../services/PropertyImageService.js';
import {
  uploadFileToGCS,
  deleteFileFromGCS
} from '../../utils/middleware/uploadFile.js';
const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    properties: async () => {
      return await PropertyService.getAllProperties();
    },
    property: async (_, { id }) => {
      return await PropertyService.getPropertyById(id);
    }
  },

  Mutation: {
    createProperty: async (_parent, { input, images }, user) => {
      if (!user) {
        throw new Error('Unauthorized');
      }

      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }

      try {
        const property = await PropertyService.createProperty({ input });

        if (!images?.length) {
          return property;
        }

        const uploadPromises = images.map(async (image, index) => {
          const { createReadStream } = await image;
          const filename = `${input.title}_${index}`;

          return uploadFileToGCS({
            createReadStream,
            folder: 'properties',
            filename
          });
        });

        const cloudImageUrls = await Promise.all(uploadPromises);

        const propertyImagePromises = cloudImageUrls.map((imageUrl, index) =>
          PropertyImageService.createPropertyImage({
            property: property._id,
            url: imageUrl,
            title: imageUrl,
            is_primary: index === 1 ? true : false
          })
        );

        const propertyImages = await Promise.all(propertyImagePromises);

        try {
          const updatedProperty = await PropertyService.updateProperty(
            property._id,
            { images: propertyImages.map((img) => img._id) }
          );

          return updatedProperty;
        } catch (dbError) {
          await Promise.all(
            propertyImages.map((img) =>
              PropertyImageService.deletePropertyImage(img._id)
            )
          );

          await Promise.all(
            cloudImageUrls.map((url) =>
              deleteFileFromGCS({
                folder: 'properties',
                filename: url
              })
            )
          );

          await PropertyService.deleteProperty(property._id);

          throw dbError;
        }
      } catch (error) {
        throw new Error(`Property creation failed: ${error.message}`);
      }
    },
    updateProperty: async (_parent, { id, input, images }, user) => {
      if (!user) {
        throw new Error('Unauthorized');
      }

      if (user.role !== 'admin') {
        throw new Error('Only admin can update properties');
      }

      if (images?.length) {
        const oldProperty = await PropertyService.getPropertyById(id);
        const oldImageIds = oldProperty.propertyImageIds || [];

        try {
          const uploadPromises = images.map((image, index) => {
            const { createReadStream } = image;
            const filename = `${input.title}_${index}_updated`;

            return uploadFileToGCS({
              createReadStream,
              folder: 'properties',
              filename
            });
          });

          const cloudImageUrls = await Promise.all(uploadPromises);

          const propertyImagePromises = cloudImageUrls.map((imageUrl) =>
            PropertyImageService.createPropertyImage({
              url: imageUrl,
              title: input.title,
              description: input.description || ''
            })
          );

          const propertyImages = await Promise.all(propertyImagePromises);
          const newImageIds = propertyImages.map((img) => img.id);

          try {
            const updatedProperty = await PropertyService.updateProperty(id, {
              ...input,
              propertyImageIds: newImageIds
            });

            await Promise.all(
              oldImageIds.map(async (oldId) => {
                const oldImage =
                  await PropertyImageService.getPropertyImageById(oldId);
                await deleteFileFromGCS({
                  folder: 'properties',
                  filename: oldImage.url
                });
                await PropertyImageService.deletePropertyImage(oldId);
              })
            );

            return updatedProperty;
          } catch (dbError) {
            await Promise.all(
              newImageIds.map((id) =>
                PropertyImageService.deletePropertyImage(id)
              )
            );

            await Promise.all(
              cloudImageUrls.map((url) =>
                deleteFileFromGCS({
                  folder: 'properties',
                  filename: url
                })
              )
            );

            throw dbError;
          }
        } catch (error) {
          throw new Error(`Property update failed: ${error.message}`);
        }
      }

      return await PropertyService.updateProperty(id, input);
    },

    deleteProperty: async (_parent, { id }, user) => {
      if (!user) {
        throw new Error('Unauthorized');
      }

      if (user.role !== 'admin') {
        throw new Error('Only admin can delete properties');
      }

      try {
        const property = await PropertyService.getPropertyById(id);
        const imageIds = property.propertyImageIds || [];

        await Promise.all(
          imageIds.map(async (imageId) => {
            const image =
              await PropertyImageService.getPropertyImageById(imageId);
            await deleteFileFromGCS({
              folder: 'properties',
              filename: image.url
            });
            await PropertyImageService.deletePropertyImage(imageId);
          })
        );

        return await PropertyService.deleteProperty(id);
      } catch (error) {
        throw new Error(`Property deletion failed: ${error.message}`);
      }
    }
  }
};
export default resolvers;
