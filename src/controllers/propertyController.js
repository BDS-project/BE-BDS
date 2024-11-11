import Property from '../models/Property.js';
import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode/httpStatusCode.js';

const propertyController = {
  getAllProperties: async (req, res) => {
    try {
      const properties = await Property.find();
      res.json(properties);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  createProperty: async (req, res) => {
    console.log('req.body:', req.body);

    const property = new Property(req.body);
    try {
      await property.save();
      res.status(StatusCodes.CREATED).json(property);
    } catch (error) {
      console.log('error:', error);
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  getPropertyById: async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
      }
      res.json(property);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  updateProperty: async (req, res) => {
    try {
      const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteProperty: async (req, res) => {
    try {
      const property = await Property.findByIdAndDelete(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json({ message: 'Property deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default propertyController;
