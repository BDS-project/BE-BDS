export default `
scalar Upload

type Property {
  id: ID!
  type: String! 
  title: String!
  name: String!
  description: String!
  bedrooms: Int!
  bathrooms: Int!
  size: Float!
  orientation: String
  block: String
  price: Float!
  location: Location!
  project: Project!
  internal_facilities: [String]
  furnitures: [String]
  status: String
  property_images: [PropertyImage!]!
  is_featured: Boolean
  created_at: String
  updated_at: String
}

input CreatePropertyInput {
  type: String!
  title: String!
  name: String!
  description: String!
  bedrooms: Int!
  bathrooms: Int!
  size: Float!
  internal_facilities: [String]
  furnitures: [String]
  orientation: String
  block: String
  price: Float!
  location: LocationInput!
  project: ID!
  status: String
  is_featured: Boolean
}

input UpdatePropertyInput {
  type: String
  title: String
  name: String
  description: String
  bedrooms: Int
  bathrooms: Int
  internal_facilities: [String]
  furnitures: [String]
  size: Float
  orientation: String
  block: String
  price: Float
  location: LocationInput
  project: ID
  status: String
  is_featured: Boolean
}

type Project {
  id: ID!
  name: String!
  location_advantages: [String!]
  project_information: [String!]
  image: String!
  address: String!
  province: String!
  district: String!
  ward: String!
  total_floors: Int!
  total_area: Float!
  blocks: [Block!]
  total_blocks: Int!
  total_apartments: Int!
  developer: String
  launch_year: Int
  status: String
  property_types: String
  is_featured: Boolean
  created_at: String
  updated_at: String
}

type PropertyImage {
  id: ID!
  url: String!
  title: String!
  is_primary: Boolean!
  created_at: String
  updated_at: String
}

type Location {
  address: String!
  city: String!
  district: String
}

input LocationInput {
  address: String!
  city: String!
  district: String
}

type Block {
  name: String
  total_apartments: Int
}

input BlockInput {
  name: String
  total_apartments: Int
}

type Query {
  properties: [Property!]!
  property(id: ID!): Property
}

type Mutation {
  createProperty(input: CreatePropertyInput!, images: [Upload!]): Property

  updateProperty(id: ID!, input: UpdatePropertyInput!, images: [Upload!]): Property

  deleteProperty(id: ID!): String
}
`;
