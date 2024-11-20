export default `
type PropertyImage {
  id: ID!
  property: Property!
  url: String!
  is_primary: Boolean!
  created_at: String
  updated_at: String
}

type Query {
  propertyImages(propertyId: ID!): [PropertyImage!]! # Lấy tất cả hình ảnh của một Property
  propertyImage(id: ID!): PropertyImage # Lấy thông tin chi tiết của một hình ảnh
}

type Mutation {
  createPropertyImage(
    property: ID!,
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
