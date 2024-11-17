export default `
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

  type Query {
    properties: [Property!]!
    property(id: ID!): Property
  }

  type Mutation {
    createProperty(title: String!, description: String!, price: Float!, category: String!, location: String!): Property
    updateProperty(id: ID!, title: String, description: String, price: Float, category: String, location: String, status: String): Property
    deleteProperty(id: ID!): String
  }
`;
