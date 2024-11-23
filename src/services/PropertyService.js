import Property from '../models/Property.js';

const PropertyService = {
  getAllProperties: async () => {
    try {
      const properties = await Property.find().populate(
        'project',
        'name address developer'
      );
      return properties;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createProperty: async ({ input }) => {
    try {
      const property = new Property(input);
      await property.save();
      await property.populate('project', 'name address developer');

      return property;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getPropertyById: async (propertyId) => {
    try {
      const property = await Property.findById(propertyId).populate(
        'project',
        'name address developer'
      );
      if (!property) {
        throw new Error('Property not found');
      }
      return property;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateProperty: async (propertyId, propertyData) => {
    try {
      const property = await Property.findByIdAndUpdate(
        propertyId,
        propertyData,
        { new: true }
      ).populate('project', 'name address developer');
      if (!property) {
        throw new Error('Property not found');
      }
      return property;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteProperty: async (propertyId) => {
    try {
      const property = await Property.findByIdAndDelete(propertyId);
      if (!property) {
        throw new Error('Property not found');
      }
      return { message: 'Property deleted' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default PropertyService;
