export default `
type Property {
  id: ID!
  type: String!
  title: String!
  description: String!
  bedrooms: Int!
  bathrooms: Int!
  size: Float!
  orientation: String
  block: String
  price: Float!
  location: Location!
  project: Project!
  created_at: String
  updated_at: String
}

type Location {
  address: String!
  city: String!
  district: String
}

type Block {
  name: String
  total_apartments: Int
}
  
type Project {
  id: ID!
  name: String!
  location_advantages: [String!]
  project_information: [String!]
  address: String!
  total_floors: Int!
  total_area: Float! 
  blocks: [Block!]
  total_blocks: Int!
  total_apartments: Int!
  developer: String
  launch_year: Int
  status: String
  created_at: String
  updated_at: String
}

type Query {
  properties: [Property!]!
  property(id: ID!): Property
}

type Mutation {
  createProperty(
    type: String!,
    title: String!,
    description: String!,
    bedrooms: Int!,
    bathrooms: Int!,
    size: Float!,
    orientation: String,
    block: String,
    price: Float!,
    location: LocationInput!,
    project: ID!
  ): Property

  updateProperty(
    id: ID!,
    type: String,
    title: String,
    description: String,
    bedrooms: Int,
    bathrooms: Int,
    size: Float,
    orientation: String,
    block: String,
    price: Float,
    location: LocationInput,
    project: ID
  ): Property

  deleteProperty(id: ID!): String
}

input LocationInput {
  address: String!
  city: String!
  district: String
}
`;
