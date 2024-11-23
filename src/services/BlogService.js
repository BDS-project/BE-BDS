import Blog from '../models/Blog.js';

const BlogService = {
  createBlog: async (blogData) => {
    try {
      const blog = new Blog(blogData);
      await blog.save();
      return blog;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllBlogs: async () => {
    try {
      const blogs = await Blog.find()
        .populate('author', 'firstName lastName')
        .populate('category', 'name');
      return blogs;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getBlogById: async (blogId) => {
    try {
      const blog = await Blog.findById(blogId)
        .populate('author', 'firstName lastName')
        .populate('category', 'name');
      if (!blog) {
        throw new Error('Blog post not found');
      }
      return blog;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateBlog: async (blogId, blogData) => {
    try {
      const blog = await Blog.findByIdAndUpdate(blogId, blogData, {
        new: true
      });
      if (!blog) {
        throw new Error('Blog post not found');
      }
      return blog;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteBlog: async (blogId) => {
    try {
      const blog = await Blog.findByIdAndDelete(blogId);
      if (!blog) {
        throw new Error('Blog post not found');
      }
      return { message: 'Blog post deleted' };
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default BlogService;
