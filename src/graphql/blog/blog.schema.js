export default `
  type Blog {
    id: ID!
    title: String!
    content: String!
    author: User!
    created_at: String
    updated_at: String
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
  }

  type Mutation {
    createBlog(title: String!, content: String!, authorId: ID!): Blog
    updateBlog(id: ID!, title: String, content: String): Blog
    deleteBlog(id: ID!): String
  }
`;
