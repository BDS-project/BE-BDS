import PropertyService from '../services/PropertyService.js';

const PropertyController = {
  getAllProperties: async (req, res) => {
    try {
      const properties = await PropertyService.getAllProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
      res.status(201).json(property);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getPropertyById: async (req, res) => {
    try {
      const property = await PropertyService.getPropertyById(req.params.id);
      res.json(property);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateProperty: async (req, res) => {
    try {
      const property = await PropertyService.updateProperty(req.params.id, req.body);
      res.json(property);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteProperty: async (req, res) => {
    try {
      const result = await PropertyService.deleteProperty(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default PropertyController;
