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
    author: ID!
    status: BlogStatus
    description: String
    meta_title: String
    meta_description: String
    category: String
    tags: [String]
    thumbnail: String
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
    thumbnail: String
  }

  input BlogFilterInput {
    status: BlogStatus
    description: String
    meta_title: String
    meta_description: String
    category: String
    created_at: String
    start_date: String
    end_date: String
    title: String
    slug: String
    page: Int
    limit: Int
  }

  type UploadResponse {
    url: String!
    filename: String!
  }

  type Query {
    blogs(filter: BlogFilterInput): [Blog!]!
    blog(id: ID!): Blog
    blogBySlug(slug: String!): Blog
    searchBlogs(query: String!): [Blog!]!
  }

  type Mutation {
    createBlog(input: CreateBlogInput!, thumbnail: Upload): Blog!
    uploadImage(image: Upload!): UploadResponse!
    updateBlog(id: ID!, input: UpdateBlogInput!, thumbnail: Upload): Blog!
    deleteBlog(id: ID!): Boolean!
    incrementBlogViews(id: ID!): Blog!
    publishBlog(id: ID!): Blog!
    unpublishBlog(id: ID!): Blog!
  }
`;
