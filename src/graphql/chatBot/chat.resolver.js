import sendMessageToDialogflow from '../../services/DialogflowService.js';

const resolvers = {
  Mutation: {
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
  }
};

export default resolvers;
