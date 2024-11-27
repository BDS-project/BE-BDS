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

  getAllBlogs: async (filter) => {
    try {
      const query = {};

      if (filter?.status) query.status = filter.status;
      if (filter?.category)
        query.category = { $regex: filter.category, $options: 'i' };
      if (filter?.title) query.title = { $regex: filter.title, $options: 'i' };
      if (filter?.slug) query.slug = { $regex: filter.slug, $options: 'i' };
      if (filter?.meta_title)
        query.meta_title = { $regex: filter.meta_title, $options: 'i' };
      if (filter?.meta_description)
        query.meta_description = {
          $regex: filter.meta_description,
          $options: 'i'
        };
      if (filter?.description)
        query.description = { $regex: filter.description, $options: 'i' };
      if (filter?.start_date || filter?.end_date) {
        query.created_at = {};
        if (filter.start_date)
          query.created_at.$gte = new Date(filter.start_date);
        if (filter.end_date) query.created_at.$lte = new Date(filter.end_date);
      }
      const page = filter?.page || 1;
      const limit = filter?.limit || 10;
      const skip = (page - 1) * limit;

      const blogs = await Blog.find(query).skip(skip).limit(limit);
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
