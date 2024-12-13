export default `
scalar Upload

type Property {
  id: ID!
  type: TypeProperty! 
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
  project: Project
  user: User
  internal_facilities: String
  furnitures: [String]
  status: String
  property_images: [PropertyImage!]!
  is_featured: Boolean
  created_at: String
  updated_at: String
}

enum TypeProperty {
    rent
    sale
}

input CreatePropertyInput {
  type: TypeProperty!
  title: String!
  name: String!
  description: String!
  bedrooms: Int!
  bathrooms: Int!
  size: Float!
  internal_facilities: String
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
  type: TypeProperty
  title: String
  name: String
  description: String
  bedrooms: Int
  bathrooms: Int
  internal_facilities: String
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
  
input PropertyFilterInput {
  name: String
  price: Float
  min_price: Float
  max_price: Float
  min_size: Float
  max_size: Float
  bedrooms: Int
  bathrooms: Int
  type: TypeProperty
  location: LocationFilterInput
  created_at: String
  start_date: String
  end_date: String
  page: Int 
  limit: Int
}

input LocationFilterInput {
  city: String
  district: String
  address: String
}

type Project {
  id: ID
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
  property_types: TypePropertyBusiness
  is_featured: Boolean
  created_at: String
  updated_at: String
}

type User {
  id: ID
  avatar: String
  first_name: String
  last_name: String
  email: String
  role: String
  status: String
  created_at: String
  updated_at: String
}

enum TypePropertyBusiness {
    apartment
    office
    land
    villa
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
  properties(filter: PropertyFilterInput): [Property!]!
  property(id: ID!): Property
  myProperties(filter: PropertyFilterInput): [Property!]!
}

type Mutation {
  createProperty(input: CreatePropertyInput!, images: [Upload!]): Property

  updateProperty(id: ID!, input: UpdatePropertyInput!, images: [Upload!]): Property

  deleteProperty(id: ID!): String
}
`;
