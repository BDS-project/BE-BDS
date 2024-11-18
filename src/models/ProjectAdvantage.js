import mongoose from 'mongoose';

const ProjectAdvantageSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  internal_utilities: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
export default mongoose.model('ProjectAdvantage', ProjectAdvantageSchema);
