import BlogService from '../services/BlogService.js';
import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode/httpStatusCode.js';

const BlogController = {
  createBlog: async (req, res) => {
    try {
      const blog = await BlogService.createBlog({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
        category: req.body.categoryId
      });
      res.status(StatusCodes.CREATED).json(blog);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  getAllBlogs: async (req, res) => {
    try {
      const blogs = await BlogService.getAllBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const blog = await BlogService.getBlogById(req.params.id);
      res.json(blog);
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const blog = await BlogService.updateBlog(req.params.id, req.body);
      res.json(blog);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const result = await BlogService.deleteBlog(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export default BlogController;
