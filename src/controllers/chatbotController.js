import ChatbotService from '../services/ChatbotService.js';
import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode/httpStatusCode.js';

const ChatbotController = {
  handleMessage: async (req, res) => {
    try {
      const chatbot = await ChatbotService.handleMessage({
        message: req.body.message,
        response: req.body.response
      });
      res.status(StatusCodes.CREATED).json(chatbot);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  getConversation: async (req, res) => {
    try {
      const chatbotMessages = await ChatbotService.getConversation();
      res.json(chatbotMessages);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  getConversationById: async (req, res) => {
    try {
      const chatbotMessage = await ChatbotService.getConversationById(req.params.id);
      res.json(chatbotMessage);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
    }
  },

  updateConversation: async (req, res) => {
    try {
      const chatbotMessages = await ChatbotService.updateConversation();
      res.json(chatbotMessages);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  deleteConversation: async (req, res) => {
    try {
      const result = await ChatbotService.deleteConversation(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export default ChatbotController;
