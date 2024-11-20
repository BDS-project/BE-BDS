import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location_advantages: [String],
  project_information: [String],
  address: { type: String, required: true },
  province: { type: String, required: true, description: 'Tỉnh/thành phố nơi dự án tọa lạc' },
  district: { type: String, required: true, description: 'Quận/huyện nơi dự án tọa lạc' },
  ward: { type: String, required: true, description: 'Phường/xã nơi dự án tọa lạc' },
  total_floors: { type: Number, required: true },
  total_area: { type: Number, required: true, description: 'Tổng diện tích dự án (m²)' },
  blocks: [{ name: { type: String }, total_apartments: { type: Number } }],
  total_blocks: { type: Number, required: true },
  total_apartments: { type: Number, required: true },
  developer: { type: String },
  launch_year: { type: Number },
  status: { type: String, enum: ['planning', 'under_construction', 'completed'] }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model('Project', ProjectSchema);
