import PropertyImage from '../models/PropertyImage.js';

const PropertyImageService = {
  getAllPropertyImages: async () => {
    try {
      const propertyImages = await PropertyImage.find().populate(
        'property',
        'title description'
      );
      return propertyImages;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createPropertyImage: async (imageData) => {
    try {
      const propertyImage = new PropertyImage(imageData);
      await propertyImage.save();
      await propertyImage.populate('property', 'title');
      return propertyImage;
    } catch (error) {
      throw new Error(`Failed to create property image: ${error.message}`);
    }
  },

  getPropertyImageById: async (imageId) => {
    try {
      const propertyImage = await PropertyImage.findById(imageId).populate(
        'property',
        'title'
      );
      if (!propertyImage) {
        throw new Error('Property image not found');
      }
      return propertyImage;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getImagesByPropertyId: async (propertyId) => {
    try {
      const propertyImages = await PropertyImage.find({
        property: propertyId
      }).populate('property', 'title');
      return propertyImages;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updatePropertyImage: async (imageId, imageData) => {
    try {
      const propertyImage = await PropertyImage.findByIdAndUpdate(
        imageId,
        imageData,
        { new: true }
      ).populate('property', 'title');

      if (!propertyImage) {
        throw new Error('Property image not found');
      }
      return propertyImage;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deletePropertyImage: async (imageId) => {
    try {
      const propertyImage = await PropertyImage.findByIdAndDelete(imageId);
      if (!propertyImage) {
        throw new Error('Property image not found');
      }
      return { message: 'Property image deleted' };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createManyPropertyImages: async (imagesData) => {
    try {
      const propertyImages = await PropertyImage.insertMany(imagesData);
      await PropertyImage.populate(propertyImages, {
        path: 'property',
        select: 'title'
      });
      return propertyImages;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteManyPropertyImages: async (imageIds) => {
    try {
      const result = await PropertyImage.deleteMany({
        _id: { $in: imageIds }
      });
      return { message: `${result.deletedCount} property images deleted` };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default PropertyImageService;
