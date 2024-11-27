import Property from '../models/Property.js';

const PropertyService = {
  getAllProperties: async (filter) => {
    console.log('filter:', filter);
    try {
      const query = {};

      if (filter?.name) {
        query.name = { $regex: filter.name, $options: 'i' };
      }
      if (filter?.bedrooms) {
        query.bedrooms = filter.bedrooms;
      }
      if (filter?.bathrooms) {
        query.bathrooms = filter.bathrooms;
      }
      if (filter?.min_price || filter?.max_price) {
        query.price = {};
        if (filter.min_price) {
          query.price.$gte = filter.min_price;
        }
        if (filter.max_price) {
          query.price.$lte = filter.max_price;
        }
        if (Object.keys(query.price).length === 0) {
          delete query.price;
        }
      }
      if (filter?.start_date || filter?.end_date) {
        query.created_at = {};

        if (filter.start_date)
          query.created_at.$gte = new Date(filter.start_date);
        if (filter.end_date) query.created_at.$lte = new Date(filter.end_date);
      }

      if (filter?.type) {
        query.type = filter.type;
      }

      if (filter?.location) {
        if (filter.location.city) {
          query['location.city'] = {
            $regex: `^${filter.location.city}$`,
            $options: 'i'
          };
        }
        if (filter.location.district) {
          query['location.district'] = {
            $regex: `^${filter.location.district}$`,
            $options: 'i'
          };
        }
        if (filter.location.address) {
          query['location.address'] = {
            $regex: filter.location.address,
            $options: 'i'
          };
        }
      }

      const page = filter?.page || 1;
      const limit = filter?.limit || 10;
      const skip = (page - 1) * limit;

      const properties = await Property.find(query).skip(skip).limit(limit);
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
