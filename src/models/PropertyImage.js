import mongoose from 'mongoose';

const PropertyImageSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Image title is required']
    },
    url: { type: String, required: true },
    is_primary: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
export default mongoose.model('PropertyImage', PropertyImageSchema);
