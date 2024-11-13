import UserService from '../../services/UserService.js';

const resolvers = {
  Query: {
    users: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await UserService.getAllUsers(user);
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
