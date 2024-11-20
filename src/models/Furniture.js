import mongoose from 'mongoose';

const FurnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  category: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model('Furniture', FurnitureSchema);
