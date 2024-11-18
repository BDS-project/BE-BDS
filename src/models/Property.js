import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  type: { type: String, enum: ['rent', 'sale'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  size: { type: Number, required: true },
  orientation: { type: String },
  block: { type: String },
  price: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String }
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  furniture: { type: mongoose.Schema.Types.ObjectId, ref: 'Furniture', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Property', PropertySchema);
