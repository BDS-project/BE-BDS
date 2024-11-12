import Chatbot from '../models/Chatbot.js';

const ChatbotService = {
  handleMessage: async (messageData) => {
    try {
      const chatbot = new Chatbot(messageData);
      await chatbot.save();
      return chatbot;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getConversation: async () => {
    try {
      const chatbotMessages = await Chatbot.find();
      return chatbotMessages;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getConversationById: async (messageId) => {
    try {
      const chatbotMessage = await Chatbot.findById(messageId);
      if (!chatbotMessage) {
        throw new Error('Chatbot message not found');
      }
      return chatbotMessage;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateConversation: async () => {
    try {
      const chatbotMessages = await Chatbot.find();
      return chatbotMessages;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteConversation: async (messageId) => {
    try {
      const chatbotMessage = await Chatbot.findByIdAndDelete(messageId);
      if (!chatbotMessage) {
        throw new Error('Chatbot message not found');
      }
      return { message: 'Chatbot message deleted' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default ChatbotService;
