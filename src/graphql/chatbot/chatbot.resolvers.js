import ChatbotService from '../../services/ChatbotService.js';

const resolvers = {
  Query: {
    chatbotMessages: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await ChatbotService.getAllMessages(user._id);
    },
    chatbotMessage: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await ChatbotService.getMessageById(id);
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
