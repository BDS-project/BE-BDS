import mongoose from 'mongoose';

const ProjectAdvantageSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  internal_utilities: [String]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
export default mongoose.model('ProjectAdvantage', ProjectAdvantageSchema);
