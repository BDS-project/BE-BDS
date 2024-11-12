import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Type cho User
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    role: String!
    created_at: String
    updated_at: String
  }

  # Type cho Property
  type Property {
    id: ID!
    title: String!
    description: String!
    price: Float!
    category: String!
    location: String!
    status: String!
    created_at: String
    updated_at: String
  }

  # Type cho Appointment
  type Appointment {
    id: ID!
    user: User!
    property: Property!
    dateTime: String!
    status: String!
    created_at: String
    updated_at: String
  }

  # Type cho Blog
  type Blog {
    id: ID!
    title: String!
    content: String!
    author: User!
    category: String!
    created_at: String
    updated_at: String
  }

  # Type cho Chatbot
  type Chatbot {
    id: ID!
    message: String!
    response: String!
    created_at: String
    updated_at: String
  }

  # Các Query
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getProperties: [Property]
    getProperty(id: ID!): Property
    getAppointments: [Appointment]
    getAppointment(id: ID!): Appointment
    getBlogs: [Blog]
    getBlog(id: ID!): Blog
    getChatbots: [Chatbot]
    getChatbot(id: ID!): Chatbot
  }

  # Các Mutation
  type Mutation {
    createUser(
      first_name: String!,
      last_name: String!,
      email: String!,
      password: String!,
      role: String!
    ): User

    createProperty(
      title: String!,
      description: String!,
      price: Float!,
      category: String!,
      location: String!,
      status: String!
    ): Property

    createAppointment(
      userId: ID!,
      propertyId: ID!,
      dateTime: String!,
      status: String!
    ): Appointment

    createBlog(
      title: String!,
      content: String!,
      authorId: ID!,
      category: String!
    ): Blog

    createChatbot(
      message: String!,
      response: String!
    ): Chatbot
  }
`;
export default typeDefs;
