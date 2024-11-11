import Conversation from '../models/Conversation.js';

async function handleChatbotMessage(message) {
  return `You said: ${message}`;
}

const conversationController = {
  handleMessage: async (req, res) => {
    try {
      const { message } = req.body;
      const response = await handleChatbotMessage(message);
      const conversation = new Conversation({
        message,
        response,
      });
      await conversation.save();
      res.json({ response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getConversation: async (req, res) => {
    try {
      const conversations = await Conversation.find();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default conversationController;
