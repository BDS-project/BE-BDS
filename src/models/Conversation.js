import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  response: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model('Conversation', conversationSchema);
