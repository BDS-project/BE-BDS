export default `
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    role: String!
    status: String! 
    created_at: String
    updated_at: String
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
    register(first_name: String!, last_name: String!, email: String!, password: String!): AuthResponse
    login(email: String!, password: String!): AuthResponse
    refreshToken: AuthResponse
    createUser(first_name: String!, last_name: String!, email: String!, password: String!, role: String!): User
    updateUser(id: ID!, first_name: String, last_name: String, email: String, isActive: Boolean): User
    deleteUser(id: ID!): String
  }
`;
