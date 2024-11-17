export default `
  type ChatbotMessage {
    id: ID!
    message: String!
    response: String!
    session_id: String!
    created_at: String
    updated_at: String
  }

  type Query {
    chatWithBot(message: String!, session_id: String!): ChatbotResponse
  }  
  type ChatbotResponse {
    response: String
    intent: String
  }

  type Mutation {
    createChatbotMessage(message: String!, response: String!): ChatbotMessage
    updateChatbotMessage(id: ID!, message: String, response: String): ChatbotMessage
    deleteChatbotMessage(id: ID!): String
  }
`;
