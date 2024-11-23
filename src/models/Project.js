import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    location_advantages: [String],
    project_information: [String],
    image: { type: String },
    address: { type: String, required: true },
    province: {
      type: String,
      required: true,
      description: 'Tỉnh/thành phố nơi dự án tọa lạc'
    },
    district: {
      type: String,
      required: true,
      description: 'Quận/huyện nơi dự án tọa lạc'
    },
    ward: {
      type: String,
      required: true,
      description: 'Phường/xã nơi dự án tọa lạc'
    },
    total_floors: { type: Number, required: true },
    total_area: {
      type: Number,
      required: true,
      description: 'Tổng diện tích dự án (m²)'
    },
    blocks: [{ name: { type: String }, total_apartments: { type: Number } }],
    total_blocks: { type: Number, required: true },
    total_apartments: { type: Number, required: true },
    developer: { type: String },
    launch_year: { type: Number },
    status: {
      type: String,
      enum: ['planning', 'under_construction', 'pre-launch', 'completed']
    },
    property_types: [
      {
        type: String,
        enum: ['apartment', 'villa', 'land', 'office'],
        default: 'apartment'
      }
    ],
    is_featured: { type: Boolean, default: false }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

ProjectSchema.virtual('properties', {
  ref: 'Property',
  localField: '_id',
  foreignField: 'project',
  justOne: false,
  options: { sort: { created_at: -1 } }
});

ProjectSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.populate('properties');
});

export default mongoose.model('Project', ProjectSchema);
