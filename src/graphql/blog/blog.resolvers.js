import BlogService from '../../services/BlogService.js';
import authenticate from '../../utils/middleware/auth.js';
import {
  uploadFileToGCS,
  deleteFileFromGCS
} from '../../utils/middleware/uploadFile.js';

const resolvers = {
  Query: {
    blogs: async (_parent, { filter }) => {
      return await BlogService.getAllBlogs(filter);
    },
    blog: async (_, { id }) => {
      return await BlogService.getBlogById(id);
    }
  },
  Mutation: {
    createBlog: async (_, { input }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }
      return await BlogService.createBlog(input);
    },
    uploadImage: async (_, { image }) => {
      if (image) {
        const { createReadStream, filename } = await image;
        const fileUrl = await uploadFileToGCS({
          createReadStream,
          folder: 'blogs',
          filename
        });
        return { url: fileUrl, filename: filename };
      }
    },
    updateBlog: async (_, { id, input }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }
      return await BlogService.updateBlog(id, input);
    },
    deleteBlog: async (_, { id }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can create properties');
      }
      return await BlogService.deleteBlog(id);
    },
    incrementBlogViews: async (_, { id }, context) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      const blog = await BlogService.getBlogById(id);
      if (!blog) throw new Error('Blog not found');

      blog.views += 1;
      await blog.save();

      return blog;
    }
  }
};

export default resolvers;
