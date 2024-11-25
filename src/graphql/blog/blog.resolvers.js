import BlogService from '../../services/BlogService.js';

const resolvers = {
  Query: {
    blogs: async () => {
      return await BlogService.getAllBlogs();
    },
    blog: async (_, { id }) => {
      return await BlogService.getBlogById(id);
    }
  },
  Mutation: {
    createBlog: async (_, { title, content, author }, user) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      return await BlogService.createBlog({ title, content, author });
    },
    updateBlog: async (_, { id, input }, user) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      return await BlogService.updateBlog(id, {
        title: input.title,
        content: input.content
      });
    },
    deleteBlog: async (_, { id }, user) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      return await BlogService.deleteBlog(id);
    },
    incrementBlogViews: async (_, { id }, user) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      const blog = await BlogService.getBlogById(id);
      if (!blog) throw new Error('Blog not found');

      blog.views += 1;
      await blog.save();

      return blog;
    },
    publishBlog: async (_, { id }, user) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }

      const blog = await BlogService.getBlogById(id);
      if (!blog) throw new Error('Blog not found');

      if (blog.author.toString() !== user._id.toString()) {
        throw new Error('Not authorized to publish this blog');
      }

      blog.status = 'published';
      await blog.save();

      return blog;
    },
    unpublishBlog: async (_, { id }, user) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }

      const blog = await BlogService.getBlogById(id);
      if (!blog) throw new Error('Blog not found');

      if (blog.author.toString() !== user._id.toString()) {
        throw new Error('Not authorized to unpublish this blog');
      }

      blog.status = 'draft';
      await blog.save();

      return blog;
    }
  }
};

export default resolvers;
