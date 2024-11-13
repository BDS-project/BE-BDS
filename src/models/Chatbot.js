import mongoose from 'mongoose';

const chatbotSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  message: { type: String, required: true },
  response: { type: String, required: true },
  context: { type: String, required: false },
  intent: { type: String, required: false },
  is_auto_response: { type: Boolean, default: true },
  feedback: { type: String, enum: ['like', 'dislike'], required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Chatbot', chatbotSchema);
