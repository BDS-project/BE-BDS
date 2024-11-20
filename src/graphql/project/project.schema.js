export default `
type Project {
  id: ID!
  name: String!
  location_advantages: [String!]
  project_information: [String!]
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
}


type Block {
  name: String
  total_apartments: Int
}

type Query {
  projects: [Project!]!
  project(id: ID!): Project
}

type Mutation {
  createProject(input: CreateProjectInput!): Project

  updateProject(id: ID!, input: UpdateProjectInput!): Project

  deleteProject(id: ID!): String
}

input BlockInput {
  name: String
  total_apartments: Int
}
`;
