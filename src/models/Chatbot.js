import mongoose from 'mongoose';

const chatbotSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  message: { type: String, required: true },
  response: { type: String, required: true },
  context: { type: String, required: false },
  intent: { type: String, required: false },
  session_id: { type: String, required: true },
  is_auto_response: { type: Boolean, default: true },
  feedback: { type: String, enum: ['like', 'dislike'], required: false }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.model('Chatbot', chatbotSchema);
