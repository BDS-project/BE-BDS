import mongoose from 'mongoose';

const chatbotSchema = new mongoose.Schema({
  message: { type: String, required: true },
  response: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Chatbot', chatbotSchema);
