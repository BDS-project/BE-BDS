import UserService from '../../services/UserService.js';
import authenticate from '../../utils/middleware/auth.js';

const resolvers = {
  Query: {
    users: async (_parent, { filter }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can');
      }
      return await UserService.getAllUsers(filter);
    },
    user: async (_, { id }, context) => {
      return await UserService.getUserById(id);
    },
    profile: async (_, __, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      return await UserService.getUserById(user.id);
    }
  },
  Mutation: {
    register: async (_, args) => await UserService.registerUser(args),
    login: async (_, args) => await UserService.loginUser(args),
    createUser: async (_, { input, avatar }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can');
      }
      return await UserService.createUser(input);
    },
    updateUser: async (_, { id, input }, context) => {
      return await UserService.updateUser(id, input);
    },
    changePassword: async (_, { input }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');

      return await UserService.changePassword(user.id, input);
    },
    deleteUser: async (_, { id }, context) => {
      const { req } = context;
      const user = await authenticate(req);
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') {
        throw new Error('Only admin can');
      }
      return await UserService.deleteUser(id);
    }
  }
};

export default resolvers;
