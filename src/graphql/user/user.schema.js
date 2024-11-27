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
  customer_appointments: [Appointment]
  advisor_appointments: [Appointment]
  created_at: String
  updated_at: String
}
  
type Appointment {
    id: ID!
    full_name: String!
    email: String!
    phone: String!
    appointment_date: String!
    property: String!
    status: AppointmentStatus!
  }

enum AppointmentStatus {
    pending
    confirmed  
    cancelled
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

input UserFilterInput {
  role: String
  status: String
  email: String
  first_name: String
  last_name: String
  page: Int 
  limit: Int
}

type Query {
  users(filter: UserFilterInput): [User!]!
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
