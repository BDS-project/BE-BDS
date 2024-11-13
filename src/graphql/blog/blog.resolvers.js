import BlogService from '../../services/BlogService.js';

const resolvers = {
  Query: {
    blogs: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await BlogService.getAllBlogs(user._id);
    },
    blog: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await BlogService.getBlogById(id);
    }
  },
  Mutation: {
    createBlog: async (_, { title, content, author }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await BlogService.createBlog({ title, content, author });
    },
    updateBlog: async (_, { id, title, content }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await BlogService.updateBlog(id, { title, content });
    },
    deleteBlog: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await BlogService.deleteBlog(id);
    }
  }
};

export default resolvers;
