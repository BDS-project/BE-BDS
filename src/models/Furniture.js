import mongoose from 'mongoose';

const FurnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  category: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Furniture', FurnitureSchema);
