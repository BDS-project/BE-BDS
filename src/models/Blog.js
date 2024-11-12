import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Blog', blogSchema);
