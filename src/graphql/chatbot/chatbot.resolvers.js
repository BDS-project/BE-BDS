import ChatbotService from '../../services/ChatbotService.js';
import sendMessageToDialogflow from '../../services/DialogflowService.js';

const resolvers = {
  Query: {
    chatWithBot: async (_, { message, sessionId }) => {
      try {
        const result = await sendMessageToDialogflow(message, sessionId);
        return {
          response: result.fulfillmentText,
          intent: result.intent.displayName
        };
      } catch (error) {
        console.error('Lỗi kết nối với Dialogflow:', error);
        throw new Error('Không thể kết nối với Chatbot');
      }
    }
  },
  Mutation: {
    createChatbotMessage: async (_, { message, response }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await ChatbotService.createMessage({ message, response });
    },
    deleteChatbotMessage: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await ChatbotService.deleteMessage(id);
    }
  }
};

export default resolvers;
