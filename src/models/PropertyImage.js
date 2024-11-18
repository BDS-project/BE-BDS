import mongoose from 'mongoose';

const PropertyImageSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  url: { type: String, required: true },
  is_primary: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
export default mongoose.model('PropertyImage', PropertyImageSchema);
