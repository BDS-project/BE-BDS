import User from '../../models/User.js';
import UserService from '../../services/UserService.js';

const resolvers = {
  Query: {
    users: async (_parent, _args, user, _info) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await User.find({}, {
          _id: 1,
          first_name: 1,
          last_name: 1,
          email: 1,
          role: 1,
          status: 1,
          created_at: 1,
          updated_at: 1
        });
      }
    },
    profile: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await UserService.getProfile(user._id);
    }
  },
  Mutation: {
    register: async (_, args) => await UserService.registerUser(args),
    login: async (_, args) => await UserService.loginUser(args),
    createUser: async (_, args, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await UserService.createUser(args);
    },
    updateUser: async (_, { id, ...args }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await UserService.updateUser(id, args, user);
    },
    deleteUser: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await UserService.deleteUser(id, user);
    }
  }
};

export default resolvers;
