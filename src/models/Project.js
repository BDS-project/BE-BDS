import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location_advantages: [String],
  project_information: [String],
  address: { type: String, required: true },
  total_floors: { type: Number, required: true },
  total_area: { type: Number, required: true, description: 'Tổng diện tích dự án (m²)' },
  blocks: [{ name: { type: String }, total_apartments: { type: Number } }],
  total_blocks: { type: Number, required: true },
  total_apartments: { type: Number, required: true },
  developer: { type: String },
  launch_year: { type: Number },
  status: { type: String, enum: ['planning', 'under_construction', 'completed'] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Project', ProjectSchema);
