export default `
scalar Upload

  type Blog {
    id: ID!
    title: String!
    slug: String!
    content: String!
    author: User!
    thumbnail: String
    status: BlogStatus!
    description: String
    meta_title: String
    meta_description: String
    category: String
    tags: [String]
    views: Int
    created_at: String
    updated_at: String
  }

  enum BlogStatus {
    published
    draft
  }
type User {
  id: ID!
  avatar: String
  first_name: String!
  last_name: String!
  email: String!
  status: String!
  created_at: String
  updated_at: String
}
  input CreateBlogInput {
    title: String!
    content: String!
    slug: String!
    authorId: ID!
    status: BlogStatus
    description: String
    meta_title: String
    meta_description: String
    category: String
    tags: [String]
  }

  input UpdateBlogInput {
    title: String
    content: String
    slug: String
    status: BlogStatus
    description: String
    meta_title: String
    meta_description: String
    category: String
    tags: [String]
  }

  type BlogPagination {
    items: [Blog!]!
    total: Int!
    page: Int!
    limit: Int!
    hasMore: Boolean!
  }

  type Query {
    blogs(page: Int, limit: Int, status: BlogStatus): BlogPagination!
    blog(id: ID!): Blog
    blogBySlug(slug: String!): Blog
    searchBlogs(query: String!): [Blog!]!
  }

  type Mutation {
    createBlog(input: CreateBlogInput!, thumbnail: Upload): Blog!
    updateBlog(id: ID!, input: UpdateBlogInput!, thumbnail: Upload): Blog!
    deleteBlog(id: ID!): Boolean!
    incrementBlogViews(id: ID!): Blog!
    publishBlog(id: ID!): Blog!
    unpublishBlog(id: ID!): Blog!
  }
`;
