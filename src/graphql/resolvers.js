import User from '../models/User.js';
import Property from '../models/Property.js';
import Appointment from '../models/Appointment.js';
import Blog from '../models/Blog.js';
import Chatbot from '../models/Chatbot.js';

const resolvers = {
  Query: {
    getUsers: async () => User.find(),
    getUser: async (_, { id }) => User.findById(id),

    getProperties: async () => Property.find(),
    getProperty: async (_, { id }) => Property.findById(id),

    getAppointments: async () => Appointment.find().populate('user property'),
    getAppointment: async (_, { id }) => Appointment.findById(id).populate('user property'),

    getBlogs: async () => Blog.find().populate('author'),
    getBlog: async (_, { id }) => Blog.findById(id).populate('author'),

    getChatbots: async () => Chatbot.find(),
    getChatbot: async (_, { id }) => Chatbot.findById(id)
  },
  Mutation: {
    createUser: async (_, args) => {
      const user = new User(args);
      return user.save();
    },
    createProperty: async (_, args) => {
      const property = new Property(args);
      return property.save();
    },
    createAppointment: async (_, { userId, propertyId, dateTime, status }) => {
      const appointment = new Appointment({ user: userId, property: propertyId, dateTime, status });
      return appointment.save();
    },
    createBlog: async (_, { title, content, authorId, category }) => {
      const blog = new Blog({ title, content, author: authorId, category });
      return blog.save();
    },
    createChatbot: async (_, { message, response }) => {
      const chatbot = new Chatbot({ message, response });
      return chatbot.save();
    }
  }
};

export default resolvers;
