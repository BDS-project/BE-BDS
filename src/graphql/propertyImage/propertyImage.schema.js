export default `
type PropertyImage {
  id: ID!
  property: Property!
  title: String!
  url: String!
  is_primary: Boolean!
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
  project: Project!
  furnitures: [String]
  status: String
  is_featured: Boolean
  created_at: String
  updated_at: String
}

enum TypeProperty {
    rent
    sale
}

type Query {
  propertyImages(propertyId: ID!): [PropertyImage!]! # Lấy tất cả hình ảnh của một Property
  propertyImage(id: ID!): PropertyImage # Lấy thông tin chi tiết của một hình ảnh
}

type Mutation {
  createPropertyImage(
    property: ID!,
    title: String!
    url: String!,
    is_primary: Boolean
  ): PropertyImage

  updatePropertyImage(
    id: ID!,
    url: String,
    is_primary: Boolean
  ): PropertyImage

  deletePropertyImage(id: ID!): String
}
`;
