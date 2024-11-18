export default `
type Furniture {
  id: ID!
  name: String!
  icon: String
  category: String
  created_at: String
  updated_at: String
}

type Query {
  furnitures: [Furniture!]!
  furniture(id: ID!): Furniture
}

type Mutation {
  createFurniture(
    name: String!,
    icon: String,
    category: String
  ): Furniture

  updateFurniture(
    id: ID!,
    name: String,
    icon: String,
    category: String
  ): Furniture

  deleteFurniture(id: ID!): String
}
`;
