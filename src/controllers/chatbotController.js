import ChatbotService from '../services/ChatbotService.js';

const ChatbotController = {
  handleMessage: async (req, res) => {
    try {
      const chatbot = await ChatbotService.handleMessage({
        message: req.body.message,
        response: req.body.response
      });
      res.status(201).json(chatbot);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getConversation: async (req, res) => {
    try {
      const chatbotMessages = await ChatbotService.getConversation();
      res.json(chatbotMessages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getConversationById: async (req, res) => {
    try {
      const chatbotMessage = await ChatbotService.getConversationById(req.params.id);
      res.json(chatbotMessage);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateConversation: async (req, res) => {
    try {
      const chatbotMessages = await ChatbotService.updateConversation();
      res.json(chatbotMessages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteConversation: async (req, res) => {
    try {
      const result = await ChatbotService.deleteConversation(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default ChatbotController;
