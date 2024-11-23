export default `
scalar Upload

type User {
  id: ID!
  avatar: String
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

input CreateUserInput {
  first_name: String!
  last_name: String!
  email: String!
  password: String!
  role: String
  status: String
}

input UpdateUserInput {
  first_name: String
  last_name: String
  email: String
  password: String
  role: String
  status: String
}

type Query {
  users: [User!]!
  user(id: ID!): User
  profile: User
}

type Mutation {
  register(input: CreateUserInput!): AuthResponse
  login(email: String!, password: String!): AuthResponse
  refreshToken: AuthResponse
  createUser(input: CreateUserInput!, avatar: Upload): User
  updateUser(id: ID!, input: UpdateUserInput!, avatar: Upload): User
  deleteUser(id: ID!): String
}
`;
