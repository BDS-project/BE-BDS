import UserService from '../../services/UserService.js';

const resolvers = {
  Query: {
    users: async (_parent, _args, user) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await UserService.getAllUsers();
      }
    },
    user: async (_, __, { id }, user) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role === 'admin') {
        return await UserService.getUserById(id);
      }
    },
    profile: async (_, __, user) => {
      if (!user) throw new Error('Unauthorized');
      return await UserService.getUserById(user.id);
    }
  },
  Mutation: {
    register: async (_, args) => await UserService.registerUser(args),
    login: async (_, args) => await UserService.loginUser(args),
    createUser: async (_, { input, avatar }, user) => {
      console.log('user:', user);
      console.log('avatar:', avatar);
      console.log('input:', input);
      if (!user) throw new Error('Unauthorized');
      return await UserService.createUser(input);
    },
    updateUser: async (_, { id, ...args }, user) => {
      if (!user) throw new Error('Unauthorized');
      return await UserService.updateUser(id, args, user);
    },
    deleteUser: async (_, { id }, user) => {
      if (!user) throw new Error('Unauthorized');
      return await UserService.deleteUser(id, user);
    }
  }
};

export default resolvers;
