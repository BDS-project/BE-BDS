import BlogService from '../../services/BlogService.js';
import {
  uploadFileToGCS,
  deleteFileFromGCS
} from '../../utils/middleware/uploadFile.js';

const resolvers = {
  Query: {
    blogs: async (_parent, { filter }) => {
      console.log("filterblogs:", filter)
      return await BlogService.getAllBlogs(filter);
    },
    blog: async (_, { id }) => {
      return await BlogService.getBlogById(id);
    }
  },
  Mutation: {
    createBlog: async (_, { input }, user) => {
      console.log("input:", input)
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      return await BlogService.createBlog(input);
    },
    uploadImage: async (_, { image }) => {
      console.log("image:", image)
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
    updateBlog: async (_, { id, input }, user) => {
      // if (user.role !== 'admin') {
      //   throw new Error('Only admin can create properties');
      // }
      return await BlogService.updateBlog(id, input);
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

      blog.status = 'draft';
      await blog.save();

      return blog;
    }
  }
};

export default resolvers;
