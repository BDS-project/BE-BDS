import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    thumbnail: {
      type: String,
      required: false
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'draft'
    },
    description: {
      type: String,
      maxLength: 300
    },
    meta_title: { type: String },
    meta_description: { type: String },
    category: { type: String },
    tags: [{ type: String }],
    views: { type: Number, default: 0 }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

blogSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Blog', blogSchema);
