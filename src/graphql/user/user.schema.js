export default `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    isActive: Boolean! 
    createdAt: String
    updatedAt: String
  }

  type AuthResponse {
    accessToken: String!
    refreshToken: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    profile: User
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!, role: String!): AuthResponse
    login(email: String!, password: String!): AuthResponse
    refreshToken: AuthResponse
    createUser(firstName: String!, lastName: String!, email: String!, password: String!, role: String!): User
    updateUser(id: ID!, firstName: String, lastName: String, email: String, isActive: Boolean): User
    deleteUser(id: ID!): String
  }
`;
