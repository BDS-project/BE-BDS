import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type ChatResponse {
    response: String
    intent: String
  }

  type Mutation {
    chatWithBot(message: String!, sessionId: String): ChatResponse
  }
`;

export default typeDefs;
