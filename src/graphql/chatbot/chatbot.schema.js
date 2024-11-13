export default `
  type ChatbotMessage {
    id: ID!
    message: String!
    response: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    chatbotMessages: [ChatbotMessage!]!
    chatbotMessage(id: ID!): ChatbotMessage
  }

  type Mutation {
    createChatbotMessage(message: String!, response: String!): ChatbotMessage
    updateChatbotMessage(id: ID!, message: String, response: String): ChatbotMessage
    deleteChatbotMessage(id: ID!): String
  }
`;
