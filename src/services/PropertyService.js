import Property from '../models/Property.js';

const PropertyService = {
  getAllProperties: async () => {
    try {
      const properties = await Property.find();
      return properties;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createProperty: async (propertyData) => {
    try {
      const property = new Property(propertyData);
      await property.save();
      return property;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getPropertyById: async (propertyId) => {
    try {
      const property = await Property.findById(propertyId);
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
      const property = await Property.findByIdAndUpdate(propertyId, propertyData, { new: true });
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
