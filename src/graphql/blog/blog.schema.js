export default `
  type Blog {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String
    updatedAt: String
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
