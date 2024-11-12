import PropertyService from '../services/PropertyService.js';
import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode/httpStatusCode.js';

const PropertyController = {
  getAllProperties: async (req, res) => {
    try {
      const properties = await PropertyService.getAllProperties();
      res.json(properties);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  createProperty: async (req, res) => {
    try {
      const property = await PropertyService.createProperty({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        location: req.body.location,
        status: req.body.status
      });
      res.status(StatusCodes.CREATED).json(property);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  getPropertyById: async (req, res) => {
    try {
      const property = await PropertyService.getPropertyById(req.params.id);
      res.json(property);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
    }
  },

  updateProperty: async (req, res) => {
    try {
      const property = await PropertyService.updateProperty(req.params.id, req.body);
      res.json(property);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  deleteProperty: async (req, res) => {
    try {
      const result = await PropertyService.deleteProperty(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export default PropertyController;
