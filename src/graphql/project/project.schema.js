export default `
scalar Upload

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
  properties:[Property!]
  property_types: String
  is_featured: Boolean
  created_at: String
  updated_at: String
}

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
  furnitures: [String]
  property_images: [PropertyImage!]!
  status: String
  is_featured: Boolean
  created_at: String
  updated_at: String
}

enum TypeProperty {
    rent
    sale
}

input ProjectFilterInput {
  name: String
  province: String
  district: String
  ward: String
  is_featured: Boolean
  launch_year: Int
}

type PropertyImage {
  id: ID!
  url: String!
  title: String!
  is_primary: Boolean!
  created_at: String
  updated_at: String
}

input CreateProjectInput {
  name: String!
  location_advantages: [String]
  project_information: [String]
  address: String!
  province: String!
  district: String!
  ward: String!
  total_floors: Int!
  total_area: Float!
  blocks: [BlockInput]
  total_blocks: Int!
  total_apartments: Int!
  developer: String
  launch_year: Int
  status: String
  property_types: String
  is_featured: Boolean
}

input UpdateProjectInput {
  name: String
  location_advantages: [String]
  project_information: [String]
  address: String
  province: String
  district: String
  ward: String
  total_floors: Int
  total_area: Float
  blocks: [BlockInput]
  total_blocks: Int
  total_apartments: Int
  developer: String
  launch_year: Int
  status: String
  property_types: String
  is_featured: Boolean
}


type Block {
  name: String
  total_apartments: Int
}

type Query {
  projects(filter: ProjectFilterInput): [Project!]!
  project(id: ID!): Project
}

type Mutation {
  createProject(input: CreateProjectInput!, image: Upload!): Project

  updateProject(id: ID!, input: UpdateProjectInput!, image: Upload): Project

  deleteProject(id: ID!): String
}

input BlockInput {
  name: String
  total_apartments: Int
}
`;
