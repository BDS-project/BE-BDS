import Property from '../models/Property.js';

const PropertyService = {
  getAllProperties: async (filter) => {
    try {
      const query = {};

      if (filter?.name) {
        query.name = { $regex: filter.name, $options: 'i' };
      }

      if (filter?.min_price !== undefined || filter?.max_price !== undefined) {
        query.price = {};
        if (filter.min_price !== undefined) {
          query.price.$gte = filter.min_price;
        }
        if (filter.max_price !== undefined) {
          query.price.$lte = filter.max_price;
        }
      }

      if (filter?.type) {
        query.type = filter.type;
      }

      if (filter?.location) {
        if (filter.location.city) {
          query['location.city'] = filter.location.city;
        }
        if (filter.location.district) {
          query['location.district'] = filter.location.district;
        }
        if (filter.location.address) {
          query['location.address'] = {
            $regex: filter.location.address,
            $options: 'i'
          };
        }
      }

      const properties = await Property.find(query);
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
