import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['residential', 'commercial', 'land'], required: true },
  type: { type: String, enum: ['apartment', 'house', 'villa', 'land', 'office'], required: true },
  size: { type: Number, required: false },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  location: { address: { type: String, required: true }, coordinates: { latitude: { type: Number, required: false }, longitude: { type: Number, required: false } } },
  images: [{ type: String }],
  features: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  status: { type: String, enum: ['available', 'sold', 'rented', 'pending'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Property', propertySchema);
