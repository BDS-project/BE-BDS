import Furniture from '../models/Furniture.js';

const FurnitureService = {
  getAllFurnitures: async () => {
    try {
      const Furnitures = await Furniture.find();
      return Furnitures;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  createFurniture: async (furnitureData) => {
    try {
      const furniture = new Furniture(furnitureData);
      await furniture.save();
      return furniture;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Furniture with this name already exists');
      }
      throw new Error(error.message);
    }
  },

  getFurnitureById: async (FurnitureId) => {
    try {
      const furniture = await Furniture.findById(FurnitureId);
      if (!furniture) {
        throw new Error('Furniture not found');
      }
      return furniture;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateFurniture: async (furnitureId, furnitureData) => {
    try {
      const furniture = await Furniture.findByIdAndUpdate(furnitureId, furnitureData, { new: true });
      if (!furniture) {
        throw new Error('Furniture not found');
      }
      return furniture;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteFurniture: async (furnitureId) => {
    try {
      const furniture = await Furniture.findByIdAndDelete(furnitureId);
      if (!furniture) {
        throw new Error('Furniture not found');
      }
      return { message: 'Furniture deleted' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default FurnitureService;
