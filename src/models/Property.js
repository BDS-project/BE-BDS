import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['rent', 'sale'], required: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
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
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true
    },
    internal_facilities: [{ type: String }],
    furnitures: [{ type: String }],
    status: {
      type: String,
      enum: ['available', 'sold', 'pending'],
      default: 'available'
    },
    is_featured: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

PropertySchema.index({ project: 1, status: 1 });
PropertySchema.virtual('property_images', {
  ref: 'PropertyImage',
  localField: '_id',
  foreignField: 'property',
  justOne: false,
  options: { sort: { created_at: -1 } }
});

PropertySchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.populate('property_images');
});

export default mongoose.model('Property', PropertySchema);
