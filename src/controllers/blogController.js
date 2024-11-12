import BlogService from '../services/BlogService.js';

const BlogController = {
  createBlog: async (req, res) => {
    try {
      const blog = await BlogService.createBlog({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
        category: req.body.categoryId
      });
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllBlogs: async (req, res) => {
    try {
      const blogs = await BlogService.getAllBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const blog = await BlogService.getBlogById(req.params.id);
      res.json(blog);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const blog = await BlogService.updateBlog(req.params.id, req.body);
      res.json(blog);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const result = await BlogService.deleteBlog(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default BlogController;
